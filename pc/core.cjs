'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {spawn} = require('node:child_process');
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const actions = new Set(['fill','click','check','uncheck','select','press','reload','visible','hidden','text','value','count']);
function validatePlan(plan) {
  if (!plan || !Array.isArray(plan.requirements) || !plan.requirements.length || plan.requirements.length > 20) throw Error('Kế hoạch thiếu tiêu chí nghiệm thu (1–20 tiêu chí).');
  const ids = new Set();
  for (const r of plan.requirements) {
    if (!r || typeof r.id !== 'string' || !/^[A-Za-z0-9_-]{1,30}$/.test(r.id) || ids.has(r.id) || typeof r.text !== 'string' || !r.text.trim()) throw Error('Tiêu chí không hợp lệ hoặc trùng ID.');
    ids.add(r.id);
  }
  if (!Array.isArray(plan.blockers)) throw Error('Kế hoạch thiếu danh sách giới hạn.');
  return plan;
}
function validateSuite(suite, plan) {
  if (!suite || !Array.isArray(suite.tests) || !suite.tests.length || suite.tests.length > 40) throw Error('Bộ kiểm thử trống hoặc quá lớn.');
  const reqs = new Set(plan.requirements.map(r=>r.id)), covered = new Set(), ids = new Set();
  for (const test of suite.tests) {
    if (!test || typeof test.id !== 'string' || !/^[A-Za-z0-9_-]{1,30}$/.test(test.id) || ids.has(test.id) || !reqs.has(test.requirementId)) throw Error('Bài thử không gắn với tiêu chí hợp lệ.');
    ids.add(test.id); covered.add(test.requirementId);
    if (!Array.isArray(test.steps) || !test.steps.length || test.steps.length > 35) throw Error('Số bước kiểm thử không hợp lệ.');
    let assertions = 0;
    for (const s of test.steps) {
      if (!s || !actions.has(s.action)) throw Error('Hành động kiểm thử không được hỗ trợ.');
      if (s.action !== 'reload' && (typeof s.selector !== 'string' || !s.selector.trim() || s.selector.length > 500)) throw Error('Thiếu selector kiểm thử.');
      if (['text','value','fill','select','press'].includes(s.action) && typeof s.value !== 'string') throw Error('Thiếu giá trị kiểm thử.');
      if (s.action === 'count' && (!Number.isInteger(s.value) || s.value < 0)) throw Error('Count phải là số nguyên không âm.');
      if (['visible','hidden','text','value','count'].includes(s.action)) assertions++;
    }
    if (!assertions) throw Error('Bài thử phải có ít nhất một khẳng định kết quả.');
  }
  if ([...reqs].some(id=>!covered.has(id))) throw Error('Có tiêu chí chưa có bài kiểm thử.');
  return suite;
}
function canReview(plan, suite, report, html) {
  validateSuite(suite, plan);
  return plan.blockers.length === 0 && report.sourceHash === hash(html) && report.suiteHash === hash(JSON.stringify(suite)) &&
    report.tests.length === suite.tests.length && suite.tests.every(t=>report.tests.some(r=>r.id===t.id && r.status==='passed')) &&
    report.runtimeErrors.length === 0 && report.blockedRequests.length === 0;
}
function runBrowser(dir, html, suite) {
  fs.writeFileSync(path.join(dir,'index.html'),html);
  fs.writeFileSync(path.join(dir,'suite.json'),JSON.stringify(suite,null,2));
  return new Promise((resolve,reject)=>{
    const child = spawn(process.execPath,[path.join(__dirname,'runner.cjs'),dir], {cwd:__dirname, windowsHide:true, stdio:['ignore','ignore','pipe'], env: {OFFICE_CHROMIUM_PATH:process.env.OFFICE_CHROMIUM_PATH, PATH:process.env.PATH, SystemRoot:process.env.SystemRoot, HOME:process.env.HOME, USERPROFILE:process.env.USERPROFILE, TEMP:process.env.TEMP, TMP:process.env.TMP, NODE_PATH:process.env.NODE_PATH, PLAYWRIGHT_BROWSERS_PATH:process.env.PLAYWRIGHT_BROWSERS_PATH}});
    let error=''; child.stderr.on('data',d=>{error=(error+d).slice(-1200)});
    const timeout=setTimeout(()=>child.kill(),180000);
    child.on('error',e=>{clearTimeout(timeout); reject(e)});
    child.on('exit',code=>{
      clearTimeout(timeout);
      if(code!==0) return reject(Error('Không chạy được Chromium/Playwright. Chạy CAI_DAT.cmd. '+error));
      try {resolve(JSON.parse(fs.readFileSync(path.join(dir,'report.json'),'utf8')))} catch(e){reject(e)}
    });
  });
}
module.exports={hash,validatePlan,validateSuite,canReview,runBrowser};
