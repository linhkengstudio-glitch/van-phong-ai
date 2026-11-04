const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
test('Backend uses real browser evidence, repairs failure, rejects stale approval, protects API and does not persist key',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'office-server-'));process.env.OFFICE_DATA_DIR=temp;
 const realFetch=global.fetch;let calls=0,blockedMode=false;
 const plan={requirements:[{id:'R1',text:'Lưu tên qua reload'}],blockers:[],uiContract:'#name #save #result'};
 const good='<!doctype html><html><body><input id="name"><button id="save">Lưu</button><p id="result"></p><script>document.querySelector("#result").textContent=localStorage.getItem("name")||"";document.querySelector("#save").onclick=()=>localStorage.setItem("name",document.querySelector("#name").value);</script></body></html>';
 const bad=good.replace('localStorage.setItem("name",document.querySelector("#name").value)','document.querySelector("#result").textContent="Linh"');
 const qa={gaps:[],tests:[{id:'T1',requirementId:'R1',name:'Persistence',steps:[{action:'fill',selector:'#name',value:'Linh'},{action:'click',selector:'#save'},{action:'reload'},{action:'text',selector:'#result',value:'Linh'}]}]};
 global.fetch=async(url,options)=>{
  if(String(url).startsWith('https://generativelanguage.googleapis.com')){
   if(!String(url).includes(':generateContent'))return Response.json({models:[{name:'models/fixture-model',supportedGenerationMethods:['generateContent']}]});
   const payload=blockedMode?{...plan,blockers:['YouTube upload is unsupported']}:[plan,{html:bad},qa,{html:good}][calls++];
   return Response.json({usageMetadata:{totalTokenCount:100},candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(payload)}]}}]});
  }return realFetch(url,options);
 };
 const {start,server}=require('../server.cjs');start(0);await new Promise(r=>server.once('listening',r));const origin='http://127.0.0.1:'+server.address().port;
 let cookie='';const req=async(route,data,headers={})=>realFetch(origin+route,{method:data===undefined?'GET':'POST',headers:{Cookie:cookie,Origin:origin,'X-Office-Request':'1','Content-Type':'application/json',...headers},body:data===undefined?undefined:JSON.stringify(data)});
 try{
  assert.equal((await req('/api/state')).status,403);const root=await realFetch(origin);cookie=root.headers.get('set-cookie').split(';')[0];
  assert.equal((await req('/api/config',{key:'not-a-real-key'},{Origin:'https://evil.test'})).status,403);
  assert.equal((await req('/api/config',{key:'not-a-real-key'})).status,200);
  const response=await req('/api/jobs',{brief:'Tạo form lưu tên, giữ sau reload',models:{planner:'fixture-model',coder:'fixture-model',tester:'fixture-model'}});assert.equal(response.status,201);const job=await response.json();
  assert.equal((await req('/api/jobs/'+job.id+'/approve',{})).status,409);
  let result;const deadline=Date.now()+45000;
  while(Date.now()<deadline){result=(await(await req('/api/state')).json()).jobs.find(j=>j.id===job.id);if(['READY_REVIEW','FAILED','BLOCKED'].includes(result.status))break;await new Promise(r=>setTimeout(r,200))}
  assert.equal(result.status,'READY_REVIEW',JSON.stringify(result));assert.equal(result.round,2);assert.equal(result.calls,4);assert.equal(result.report.tests[0].status,'passed');assert.equal(result.tokens,400);
  const artifact=path.join(temp,job.id,'round-2/index.html');fs.appendFileSync(artifact,' ');assert.equal((await req('/api/jobs/'+job.id+'/approve',{})).status,409);fs.writeFileSync(artifact,good);assert.equal((await req('/api/jobs/'+job.id+'/approve',{})).status,200);
  assert.equal((await req('/api/jobs/'+job.id+'/screenshot?name=../../server.cjs')).status,404);
  assert.equal((await req('/api/jobs/'+job.id+'/artifact')).headers.get('content-disposition'),'attachment; filename="san-pham-v2.html"');
  assert.ok(!fs.readFileSync(path.join(temp,job.id,'job.json'),'utf8').includes('not-a-real-key'));
  blockedMode=true;const blocked=await(await req('/api/jobs',{brief:'Upload YouTube tự động',models:{planner:'fixture-model',coder:'fixture-model',tester:'fixture-model'}})).json();await new Promise(r=>setTimeout(r,100));const blockedJob=(await(await req('/api/state')).json()).jobs.find(j=>j.id===blocked.id);assert.equal(blockedJob.status,'BLOCKED');assert.equal(blockedJob.report,null);
 }finally{global.fetch=realFetch;await new Promise(r=>server.close(r));fs.rmSync(temp,{recursive:true,force:true});delete process.env.OFFICE_DATA_DIR}
});
