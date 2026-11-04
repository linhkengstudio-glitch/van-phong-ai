const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {createBridge,WEB_ORIGIN}=require('../bridge.cjs');
test('Pairing tickets expire, work once, bind origin, and sessions can be revoked',()=>{
 let time=0;const b=createBridge({now:()=>time}),ticket=()=>new URL(b.issue(8765).url).hash.slice(1),code=t=>new URLSearchParams(t).get('office_pair');
 const c=code(ticket());assert.equal(b.redeem(c,'https://evil.test'),null);const session=b.redeem(c,WEB_ORIGIN);assert.ok(session.token);assert.equal(b.redeem(c,WEB_ORIGIN),null);
 const req={headers:{origin:WEB_ORIGIN,authorization:'Bearer '+session.token}};assert.equal(b.authorized(req),true);assert.equal(b.authorized({headers:{...req.headers,origin:'https://evil.test'}}),false);b.revoke();assert.equal(b.authorized(req),false);
 const stale=code(ticket());time=120001;assert.equal(b.redeem(stale,WEB_ORIGIN),null);
 const s=b.redeem(code(ticket()),WEB_ORIGIN);time+=43200001;assert.equal(b.authorized({headers:{origin:WEB_ORIGIN,authorization:'Bearer '+s.token}}),false);
});
test('Web–PC HTTP flow rejects wrong origin and missing token; local UI stays compatible',async()=>{
 const tmp=fs.mkdtempSync(path.join(os.tmpdir(),'office-bridge-'));process.env.OFFICE_DATA_DIR=tmp;const {start,server}=require('../server.cjs');start(0);await new Promise(r=>server.once('listening',r));const base='http://127.0.0.1:'+server.address().port;
 const root=await fetch(base+'/connect'),cookie=root.headers.get('set-cookie').split(';')[0];const local={'Content-Type':'application/json','X-Office-Request':'1',Origin:base,Cookie:cookie};const remote={'Content-Type':'application/json','X-Office-Request':'1',Origin:WEB_ORIGIN};
 try{
  assert.equal(root.status,200);assert.match(await root.text(),/Mở văn phòng trên web cũ/);
  const options=await fetch(base+'/api/state',{method:'OPTIONS',headers:{Origin:WEB_ORIGIN,'Access-Control-Request-Method':'GET','Access-Control-Request-Headers':'authorization'}});assert.equal(options.status,204);assert.equal(options.headers.get('access-control-allow-origin'),WEB_ORIGIN);
  assert.equal((await fetch(base+'/api/state',{method:'OPTIONS',headers:{Origin:'https://evil.test','Access-Control-Request-Method':'GET'}})).status,403);
  assert.equal((await fetch(base+'/api/state',{headers:{Origin:WEB_ORIGIN,Cookie:cookie}})).status,403);
  const ticket=await(await fetch(base+'/api/bridge-ticket',{method:'POST',headers:local,body:'{}'})).json();const code=new URLSearchParams(new URL(ticket.url).hash.slice(1)).get('office_pair');
  const paired=await fetch(base+'/api/pair',{method:'POST',headers:remote,body:JSON.stringify({code})});assert.equal(paired.status,200);const session=await paired.json();const auth={...remote,Authorization:'Bearer '+session.token};
  assert.equal((await fetch(base+'/api/pair',{method:'POST',headers:remote,body:JSON.stringify({code})})).status,403);
  const state=await fetch(base+'/api/state',{headers:auth});assert.equal(state.status,200);assert.equal(state.headers.get('access-control-allow-origin'),WEB_ORIGIN);assert.equal((await state.json()).configured,false);
  assert.equal((await fetch(base+'/api/state',{headers:{...auth,Origin:'https://evil.test'}})).status,403);
  assert.equal((await fetch(base+'/api/state',{headers:{Cookie:cookie}})).status,200);
  assert.equal((await fetch(base+'/api/bridge-ticket',{method:'POST',headers:auth,body:'{}'})).status,403);
  assert.equal((await fetch(base+'/api/jobs',{method:'POST',headers:auth,body:JSON.stringify({brief:'Build a todo app'})})).status,400);
  await fetch(base+'/api/bridge-revoke',{method:'POST',headers:local,body:'{}'});assert.equal((await fetch(base+'/api/state',{headers:auth})).status,403);
 }finally{await new Promise(r=>server.close(r));fs.rmSync(tmp,{recursive:true,force:true})}
});
