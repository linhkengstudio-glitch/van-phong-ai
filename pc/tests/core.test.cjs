const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {validatePlan,validateSuite,canReview,hash,runBrowser}=require('../core.cjs');
const plan={requirements:[{id:'R1',text:'Lưu tên và khôi phục sau reload'}],blockers:[]};
const suite={tests:[{id:'T1',requirementId:'R1',name:'Save and reload',steps:[{action:'fill',selector:'#name',value:'Linh'},{action:'click',selector:'#save'},{action:'reload'},{action:'text',selector:'#result',value:'Linh'}]}]};
const html='<!doctype html><html><body><input id="name"><button id="save">Lưu</button><p id="result"></p><script>document.querySelector("#result").textContent=localStorage.getItem("name")||"";document.querySelector("#save").onclick=()=>localStorage.setItem("name",document.querySelector("#name").value);</script></body></html>';
test('Reject empty, duplicate or uncovered criteria and assertion-free tests',()=>{
 assert.throws(()=>validatePlan({requirements:[],blockers:[]}));assert.throws(()=>validatePlan({...plan,requirements:[plan.requirements[0],plan.requirements[0]]}));
 assert.throws(()=>validateSuite({tests:[]},plan));assert.throws(()=>validateSuite({tests:[{...suite.tests[0],steps:[{action:'click',selector:'#save'}]}]},plan));
 assert.throws(()=>validateSuite(suite,{requirements:[{id:'R2',text:'missing'}]}));assert.throws(()=>validateSuite({tests:[{...suite.tests[0],steps:[{action:'evaluate',selector:'body'}]}]},plan));
});
test('Actual Chromium catches missing persistence and passes repaired artifact; hashes prevent stale approval',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'office-qa-'));
 try{
 const broken=html.replace('localStorage.setItem("name",document.querySelector("#name").value)','document.querySelector("#result").textContent="Linh"');
 const bad=await runBrowser(dir,broken,suite);assert.equal(bad.tests[0].status,'failed');assert.equal(canReview(plan,suite,bad,broken),false);
 const good=await runBrowser(dir,html,suite);assert.equal(good.tests[0].status,'passed');assert.equal(canReview(plan,suite,good,html),true);
 assert.equal(canReview(plan,suite,good,html+' '),false);assert.equal(canReview({...plan,blockers:['External API missing']},suite,good,html),false);
 assert.equal(canReview(plan,suite,{...good,suiteHash:'wrong'},html),false);assert.equal(canReview(plan,suite,{...good,tests:[]},html),false);
 assert.equal(canReview(plan,suite,{...good,runtimeErrors:['boom']},html),false);
 }finally{fs.rmSync(dir,{recursive:true,force:true})}
});
test('Runtime exception prevents ready status even when visible assertion passes',async()=>{
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'office-qa-'));try{const s={tests:[{id:'T2',requirementId:'R1',steps:[{action:'visible',selector:'body'}]}]};const report=await runBrowser(dir,'<html><body>UI<script>throw Error("real failure")</script></body></html>',s);assert.equal(report.tests[0].status,'failed');assert.ok(report.runtimeErrors.some(e=>e.includes('real failure')))}finally{fs.rmSync(dir,{recursive:true,force:true})}
});
module.exports={html,suite,plan};
