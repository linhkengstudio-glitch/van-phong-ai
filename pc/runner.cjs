'use strict';
const fs=require('node:fs'),path=require('node:path');
const {chromium,expect}=require('playwright/test');
const {hash}=require('./core.cjs');
async function run(dir) {
 const html=fs.readFileSync(path.join(dir,'index.html'),'utf8'),suite=JSON.parse(fs.readFileSync(path.join(dir,'suite.json'),'utf8'));
 const report={sourceHash:hash(html),suiteHash:hash(JSON.stringify(suite)),startedAt:new Date().toISOString(),tests:[],runtimeErrors:[],blockedRequests:[]};
 const browser=await chromium.launch({headless:true,...(process.env.OFFICE_CHROMIUM_PATH?{executablePath:process.env.OFFICE_CHROMIUM_PATH}:{} )});
 try {
  for(const t of suite.tests){
   const ctx=await browser.newContext({viewport:{width:1280,height:800},serviceWorkers:'block',acceptDownloads:false});
   const page=await ctx.newPage(); page.setDefaultTimeout(1800);
   const errors=[],blocked=[];
   await page.addInitScript(()=>{window.__cspViolations=[];document.addEventListener('securitypolicyviolation',e=>window.__cspViolations.push(e.violatedDirective));});
   page.on('pageerror',e=>errors.push(e.message));
   await ctx.route('**/*',route=>{
    if(route.request().url()==='http://artifact.test/') return route.fulfill({contentType:'text/html; charset=utf-8',body:html,headers:{'Content-Security-Policy':"default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'"}});
    blocked.push(route.request().url().split('?')[0]); return route.abort();
   });
   const result={id:t.id,requirementId:t.requirementId,name:t.name||t.id,status:'failed',steps:0};
   try {
    await page.goto('http://artifact.test/',{waitUntil:'load',timeout:8000});
    for(const s of t.steps){
     const l=s.selector?page.locator(s.selector):null;
     switch(s.action){
      case 'fill':await l.fill(s.value);break;
      case 'click':await l.click();break;
      case 'check':await l.check();break;
      case 'uncheck':await l.uncheck();break;
      case 'select':await l.selectOption(s.value);break;
      case 'press':await l.press(s.value);break;
      case 'reload':await page.reload({waitUntil:'load',timeout:8000});break;
      case 'visible':await expect(l).toBeVisible();break;
      case 'hidden':await expect(l).toBeHidden();break;
      case 'text':await expect(l).toHaveText(s.value);break;
      case 'value':await expect(l).toHaveValue(s.value);break;
      case 'count':await expect(l).toHaveCount(s.value);break;
      default:throw Error('Unsupported action');
     }
     result.steps++;
    }
    const violations=await page.evaluate(()=>window.__cspViolations||[]);
    if(violations.length) errors.push(...violations.map(v=>'CSP: '+v));
    if(errors.length||blocked.length) throw Error('Có lỗi runtime hoặc kết nối ngoài phạm vi.');
    result.status='passed';
   } catch(e){result.error=String(e.message).slice(0,1600)}
   try {await page.screenshot({path:path.join(dir,t.id+'.png'),timeout:3000});result.screenshot=t.id+'.png'}catch{}
   report.runtimeErrors.push(...errors);report.blockedRequests.push(...blocked);report.tests.push(result);
   await ctx.close();
  }
 } finally {await browser.close()}
 report.finishedAt=new Date().toISOString();fs.writeFileSync(path.join(dir,'report.json'),JSON.stringify(report,null,2));return report;
}
if(require.main===module) run(process.argv[2]).catch(()=>{console.error('Browser runner failed. Install Chromium and check test files.');process.exitCode=1});
module.exports={run};
