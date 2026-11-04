const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
test('Restart marks active jobs interrupted; pause waits at boundary and cancel never approves',async()=>{
 const temp=fs.mkdtempSync(path.join(os.tmpdir(),'office-life-'));process.env.OFFICE_DATA_DIR=temp;
 const id='11111111-1111-1111-1111-111111111111';fs.mkdirSync(path.join(temp,id));fs.writeFileSync(path.join(temp,id,'job.json'),JSON.stringify({id,createdAt:'2026-01-01',status:'TESTING',events:[],round:1}));
 const realFetch=global.fetch;let release;global.fetch=async(url,opts)=>{if(String(url).startsWith('https://generativelanguage.googleapis.com')){if(!String(url).includes(':generateContent'))return Response.json({models:[{name:'models/fixture',supportedGenerationMethods:['generateContent']}]});await new Promise(r=>release=r);return Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify({requirements:[{id:'R1',text:'Form'}],blockers:[]})}]}}]})}return realFetch(url,opts)};
 const {start,server}=require('../server.cjs');start(0);await new Promise(r=>server.once('listening',r));const origin='http://127.0.0.1:'+server.address().port;const r=await realFetch(origin),cookie=r.headers.get('set-cookie').split(';')[0];
 const req=async(p,b)=>{const r=await realFetch(origin+p,{method:b?'POST':'GET',headers:{Cookie:cookie,Origin:origin,'X-Office-Request':'1','Content-Type':'application/json'},body:b?JSON.stringify(b):undefined});return r.json()};
 try{
  const st=await req('/api/state');assert.equal(st.jobs[0].status,'INTERRUPTED');assert.equal(st.jobs[0].round,1);
  await req('/api/config',{key:'fixture'});const j=await req('/api/jobs',{brief:'Tạo form đơn giản',models:{planner:'fixture',coder:'fixture',tester:'fixture'}});
  while(!release)await new Promise(r=>setTimeout(r,10));await req('/api/jobs/'+j.id+'/control',{action:'pause'});release();await new Promise(r=>setTimeout(r,300));let current=(await req('/api/state')).jobs.find(x=>x.id===j.id);assert.equal(current.status,'PAUSED');assert.equal(current.calls,1);
  await req('/api/jobs/'+j.id+'/control',{action:'cancel'});await new Promise(r=>setTimeout(r,400));current=(await req('/api/state')).jobs.find(x=>x.id===j.id);assert.equal(current.status,'CANCELLED');assert.equal(current.report,null);
 }finally{global.fetch=realFetch;await new Promise(r=>server.close(r));fs.rmSync(temp,{recursive:true,force:true})}
});
