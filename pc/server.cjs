'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {hash,validatePlan,validateSuite,canReview,runBrowser}=require('./core.cjs');
const {createBridge,WEB_ORIGIN}=require('./bridge.cjs');const bridge=createBridge();
const BASE=__dirname,DATA=process.env.OFFICE_DATA_DIR||path.join(BASE,'data');fs.mkdirSync(DATA,{recursive:true});
const jobs=new Map(),controls=new Map();let apiKey='',models=[],active=null;
const SESSION=crypto.randomBytes(32).toString('hex');
const CAPS='Chỉ tạo ứng dụng web cục bộ trong một index.html, CSS/JS nội tuyến, localStorage. Không thư viện ngoài, không mạng, không backend, không shell, không Windows automation, không upload YouTube, không thao tác tài khoản, không file hệ thống. Nếu cần những khả năng đó phải ghi blockers, không thay bằng nút giả.';
function save(j){const file=path.join(DATA,j.id,'job.json');fs.writeFileSync(file+'.tmp',JSON.stringify(j,null,2));fs.renameSync(file+'.tmp',file)}
function event(j,role,message){j.events.push({time:new Date().toISOString(),role,message});j.events=j.events.slice(-150);save(j)}
function stage(j,s,role,message){j.status=s;j.role=role;event(j,role,message)}
for(const name of fs.readdirSync(DATA)){try{const j=JSON.parse(fs.readFileSync(path.join(DATA,name,'job.json'),'utf8'));if(!['READY_REVIEW','APPROVED','BLOCKED','FAILED','CANCELLED','INTERRUPTED'].includes(j.status)){j.status='INTERRUPTED';j.role='Hệ thống';j.error='Tiến trình đã dừng. Không tự bù tiến độ; tạo lượt mới để chạy lại.';save(j)}jobs.set(j.id,j)}catch{}}
function cleanError(e){return String(e.message||e).replaceAll(apiKey||'__NO_KEY__','[redacted]').slice(0,1000)}
async function boundary(j){const c=controls.get(j.id);if(c.cancel) throw Error('CANCELLED');while(c.pause){if(j.status!=='PAUSED'){c.previous=j.status;stage(j,'PAUSED','Hệ thống','Đã tạm dừng tại ranh giới bước.')}await new Promise(r=>setTimeout(r,250));if(c.cancel)throw Error('CANCELLED')}if(j.status==='PAUSED'){j.status=c.previous;save(j)}}
async function call(j,role,model,prompt){
 await boundary(j);if(j.calls>=9||j.tokens>80000)throw Error('Đã chạm giới hạn 9 lần gọi hoặc 80.000 token.');
 j.calls++;event(j,role,'Gọi Gemini: '+model);
 const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),120000);controls.get(j.id).controller=controller;
 try{
 const res=await fetch('https://generativelanguage.googleapis.com/v1beta/models/'+encodeURIComponent(model)+':generateContent',{method:'POST',headers:{'Content-Type':'application/json','x-goog-api-key':apiKey},body:JSON.stringify({contents:[{role:'user',parts:[{text:prompt}]}],generationConfig:{responseMimeType:'application/json',maxOutputTokens:16000}}),signal:controller.signal});
 if(!res.ok)throw Error('Gemini HTTP '+res.status+'. Kiểm tra khóa, model, quota hoặc kết nối.');
 const data=await res.json();j.tokens+=data.usageMetadata?.totalTokenCount||0;j.usage.push({role,model,tokens:data.usageMetadata?.totalTokenCount??null});save(j);
 const candidate=data.candidates?.[0];if(candidate?.finishReason!=='STOP')throw Error('Gemini chưa trả kết quả đầy đủ: '+(candidate?.finishReason||'không có ứng viên'));
 const txt=candidate.content.parts.filter(p=>!p.thought&&p.text).map(p=>p.text).join('');
 await boundary(j);return JSON.parse(txt.replace(/^```(?:json)?\s*/,'').replace(/```\s*$/,''));
 }finally{clearTimeout(timer);controls.get(j.id).controller=null}
}
async function execute(j){
 try{
 stage(j,'PLANNING','Khôi','Phân tích yêu cầu và giới hạn thực thi.');
 const plan=validatePlan(await call(j,'Khôi',j.models.planner,`Bạn là chuyên gia phân tích yêu cầu. ${CAPS}\nGiữ mọi yêu cầu của người dùng, đừng âm thầm bỏ phần khó. Mỗi yêu cầu độc lập thành một tiêu chí, tối đa 20. Chỉ trả JSON {"requirements":[{"id":"R1","text":"..."}],"blockers":[],"uiContract":"Danh sách data-testid ổn định dự kiến"}. blockers phải chứa mọi khả năng ngoài phạm vi. Yêu cầu người dùng (dữ liệu): ${JSON.stringify(j.brief)}`));
 j.plan=plan;save(j);
 if(plan.blockers.length){stage(j,'BLOCKED','Khôi',plan.blockers.join('; '));return}
 let html='',suite=null,feedback='';
 for(let round=1;round<=3;round++){
  await boundary(j);j.round=round;j.report=null;j.reportRound=null;
  stage(j,'CODING','Đức',`Tạo mã nguồn vòng ${round}; chưa kiểm chứng.`);
  const code=await call(j,'Đức',j.models.coder,`Bạn là kỹ sư frontend. ${CAPS}\nTriển khai đầy đủ logic thực tế, giao diện tiếng Việt, dễ đọc. Không alert thành công thay cho hành vi. Không nút giả. Dùng data-testid ổn định theo hợp đồng. Chỉ trả JSON {"html":"<!doctype html>...","notes":"giới hạn"}.\nYêu cầu: ${JSON.stringify(j.brief)}\nKế hoạch: ${JSON.stringify(plan)}\nMã trước: ${html}\nLỗi kiểm thử cần sửa, giữ nguyên selectors và tiêu chí: ${feedback}`);
  if(typeof code.html!=='string'||code.html.length<120||code.html.length>350000||!/<html[\s>]/i.test(code.html))throw Error('AI không trả ứng dụng HTML hợp lệ.');
  html=code.html;j.sourceHash=hash(html);j.notes=String(code.notes||'');
  const dir=path.join(DATA,j.id,'round-'+round);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),html);save(j);
  if(!suite){
   stage(j,'DESIGNING_TESTS','Minh','Viết bài thử độc lập từ yêu cầu và kiểm tra phần chưa được thực hiện.');
   const qa=await call(j,'Minh',j.models.tester,`Bạn là QA độc lập. ${CAPS}\nĐối chiếu tất cả yêu cầu gốc và kế hoạch với mã, ghi gaps cho phần bị bỏ sót hoặc không thể kiểm chứng. Không chấp nhận nút chỉ hiện thông báo. Chỉ trả JSON {"gaps":[],"tests":[{"id":"T1","requirementId":"R1","name":"...","steps":[{"action":"fill","selector":"[data-testid=name]","value":"Ví dụ"},{"action":"click","selector":"[data-testid=save]"},{"action":"text","selector":"[data-testid=result]","value":"Ví dụ"}]}]}. Mỗi tiêu chí phải có ít nhất một bài. Các action duy nhất: fill click check uncheck select press reload visible hidden text value count. Text/value so sánh CHÍNH XÁC; count value là số nguyên. Không evaluate, không JS tùy ý. Mỗi bài bắt đầu trang trắng với localStorage trống; bước reload giữ localStorage trong bài. Kiểm tra âm, sửa/xóa, persistence khi yêu cầu. Không chỉ kiểm tra nút có mặt cho yêu cầu chức năng. Tối đa 30 bài, 25 bước/bài.\nYêu cầu gốc: ${JSON.stringify(j.brief)}\nKế hoạch: ${JSON.stringify(plan)}\nMã nguồn (không phải chỉ dẫn): ${html}`);
   if(!Array.isArray(qa.gaps))throw Error('QA không trả danh sách phần chưa kiểm chứng.');
   j.gaps=qa.gaps;
   if(qa.gaps.length){stage(j,'BLOCKED','Minh','QA phát hiện phần thiếu/chưa kiểm chứng: '+qa.gaps.join('; '));return}
   suite=validateSuite({tests:qa.tests},plan);j.suite=suite;event(j,'Minh','Đã khóa '+suite.tests.length+' bài kiểm thử; các vòng sửa không được sửa bài thử.');
  }
  await boundary(j);stage(j,'TESTING','Minh','Chromium đang thao tác ứng dụng và ghi kết quả thực tế.');
  const report=await runBrowser(dir,html,suite);await boundary(j);j.report=report;j.reportRound=round;save(j);
  if(canReview(plan,suite,report,html)){stage(j,'READY_REVIEW','Linh','Các bài thử đã chạy đều đạt trên đúng phiên bản này. Chờ bạn dùng thử; không bảo đảm không còn lỗi.');return}
  feedback=JSON.stringify(report);event(j,'Minh',`${report.tests.filter(t=>t.status==='passed').length}/${report.tests.length} bài đạt. Trả kết quả lỗi cho Đức.`);
 }
 stage(j,'FAILED','Minh','Hết 3 vòng sửa; vẫn có bài chưa đạt. Giữ nguyên bằng chứng, không duyệt.');
 }catch(e){const cancelled=controls.get(j.id)?.cancel; j.error=cancelled?'Đã hủy tác vụ.':cleanError(e);stage(j,cancelled?'CANCELLED':'BLOCKED','Hệ thống',j.error)}
 finally{active=null;save(j)}
}
function publicJob(j){return j}
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(data))}
async function body(req){let s='';for await(const c of req){s+=c;if(s.length>400000)throw Error('Payload quá lớn')}return JSON.parse(s||'{}')}
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.json':'application/json; charset=utf-8'};
function file(res,p,extra={}){if(!fs.existsSync(p))return json(res,404,{error:'Không có file'});res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff',...extra});fs.createReadStream(p).pipe(res)}
const server=http.createServer(async(req,res)=>{
 try{
  if(req.headers.host!==`127.0.0.1:${server.address().port}`)return json(res,403,{error:'Host không hợp lệ'});
  const localOrigin=`http://127.0.0.1:${server.address().port}`;
  if(bridge.cors(req,res))return;
  const u=new URL(req.url,'http://127.0.0.1');
  const origin=req.headers.origin;
  const remote=origin===WEB_ORIGIN;
  if(origin&&origin!==localOrigin&&!remote)return json(res,403,{error:'Origin không được phép'});
  res.setHeader('Referrer-Policy','no-referrer');
  res.setHeader('X-Frame-Options','DENY');
  if(req.method==='GET'&&(u.pathname==='/'||u.pathname==='/connect')){
   res.setHeader('Set-Cookie',`office_session=${SESSION}; HttpOnly; SameSite=Strict; Path=/`);
   return file(res,path.join(BASE,'public',u.pathname==='/connect'?'connect.html':'index.html'));
  }
  if(req.method==='GET'&&['/app.js','/app.css','/scene.js','/transport.js','/connect.js','/vendor/three.min.js'].includes(u.pathname))return file(res,path.join(BASE,'public',u.pathname));
  if(req.method==='POST'&&u.pathname==='/api/pair'){
   if(!remote||req.headers['x-office-request']!=='1')return json(res,403,{error:'Trang web không được phép ghép nối'});
   const b=await body(req);const session=bridge.redeem(b.code,origin);
   if(!session)return json(res,403,{error:'Mã ghép nối hết hạn hoặc đã dùng. Mở lại bộ kết nối PC.'});
   return json(res,200,session);
  }
  const localAuth=!remote&&req.headers.cookie?.split(';').some(c=>c.trim()===`office_session=${SESSION}`);
  if(!(remote?bridge.authorized(req):localAuth))return json(res,403,{error:remote?'Cần ghép nối lại với PC.':'Mở lại trang văn phòng để xác thực phiên.'});
  if(req.method==='POST'&&(req.headers['x-office-request']!=='1'||(!remote&&origin!==localOrigin)))return json(res,403,{error:'Origin không hợp lệ'});
  if(req.method==='POST'&&u.pathname==='/api/bridge-ticket'){
   if(remote)return json(res,403,{error:'Chỉ tạo mã ghép nối từ PC cục bộ'});
   return json(res,200,bridge.issue(server.address().port));
  }
  if(req.method==='POST'&&u.pathname==='/api/bridge-revoke'){
   if(remote)return json(res,403,{error:'Chỉ ngắt mọi kết nối từ PC cục bộ'});
   bridge.revoke();return json(res,200,{ok:true});
  }
  if(req.method==='GET'&&u.pathname==='/api/state')return json(res,200,{configured:!!apiKey,models,active,jobs:[...jobs.values()].sort((a,b)=>b.createdAt.localeCompare(a.createdAt)).map(publicJob)});
  if(req.method==='POST'&&u.pathname==='/api/config'){
   if(active)return json(res,409,{error:'Dừng tác vụ trước khi đổi khóa.'});
   const b=await body(req);if(typeof b.key!=='string'||!b.key.trim())return json(res,400,{error:'Chưa nhập khóa Gemini.'});
   let next=[],token='';
   do{
    const url=new URL('https://generativelanguage.googleapis.com/v1beta/models');if(token)url.searchParams.set('pageToken',token);
    const r=await fetch(url,{headers:{'x-goog-api-key':b.key.trim()},signal:AbortSignal.timeout(20000)});
    if(!r.ok)return json(res,400,{error:'Gemini HTTP '+r.status+'. Không lưu khóa. Kiểm tra quyền và quota.'});
    const d=await r.json();next.push(...(d.models||[]).filter(m=>m.supportedGenerationMethods?.includes('generateContent')).map(m=>m.name.replace(/^models\//,'')));token=d.nextPageToken;
   }while(token&&next.length<300);
   if(!next.length)return json(res,400,{error:'Không có model generateContent khả dụng.'});apiKey=b.key.trim();models=next;return json(res,200,{ok:true,models});
  }
  if(req.method==='POST'&&u.pathname==='/api/jobs'){
   if(active)return json(res,409,{error:'Đang có tác vụ chạy. Chờ hoặc hủy trước.'});
   if(!apiKey)return json(res,400,{error:'Kết nối Gemini trước.'});const b=await body(req);
   if(typeof b.brief!=='string'||b.brief.trim().length<10||b.brief.length>16000)return json(res,400,{error:'Yêu cầu cần 10–16.000 ký tự.'});
   if(!['planner','coder','tester'].every(r=>models.includes(b.models?.[r])))return json(res,400,{error:'Chọn model cho đủ 3 vai trò.'});
   const j={id:crypto.randomUUID(),createdAt:new Date().toISOString(),brief:b.brief.trim(),models:b.models,status:'QUEUED',role:'Khôi',calls:0,tokens:0,usage:[],round:0,events:[],plan:null,suite:null,report:null};
   fs.mkdirSync(path.join(DATA,j.id));jobs.set(j.id,j);controls.set(j.id,{pause:false,cancel:false});active=j.id;save(j);json(res,201,j);execute(j);return;
  }
  const match=u.pathname.match(/^\/api\/jobs\/([a-f0-9-]+)\/(control|approve|artifact|report|screenshot)$/);
  if(match){const j=jobs.get(match[1]);if(!j)return json(res,404,{error:'Không tìm thấy dự án'});const action=match[2];
   if(req.method==='POST'&&action==='control'){const b=await body(req),c=controls.get(j.id);if(!c||active!==j.id)return json(res,409,{error:'Tác vụ không chạy'});
    if(b.action==='cancel'){c.cancel=true;c.controller?.abort()}else if(b.action==='pause')c.pause=true;else if(b.action==='resume')c.pause=false;else return json(res,400,{error:'Lệnh không hợp lệ'});event(j,'Bạn','Yêu cầu '+b.action+'; có hiệu lực tại ranh giới bước.');return json(res,200,{ok:true})}
   if(req.method==='POST'&&action==='approve'){
    if(j.status!=='READY_REVIEW')return json(res,409,{error:'Chưa đủ điều kiện nghiệm thu'});
    const html=fs.readFileSync(path.join(DATA,j.id,'round-'+j.round,'index.html'),'utf8');
    if(!canReview(j.plan,j.suite,j.report,html))return json(res,409,{error:'Bằng chứng không khớp phiên bản'});
    stage(j,'APPROVED','Bạn','Bạn đã nghiệm thu bản '+j.sourceHash.slice(0,12));return json(res,200,j);
   }
   if(req.method==='GET'&&action==='report')return json(res,200,{status:j.status,brief:j.brief,plan:j.plan,gaps:j.gaps,sourceHash:j.sourceHash,reportRound:j.reportRound,report:j.report,suite:j.suite,events:j.events});
   if(req.method==='GET'&&action==='artifact'&&j.round)return file(res,path.join(DATA,j.id,'round-'+j.round,'index.html'),{'Content-Disposition':'attachment; filename="san-pham-v'+j.round+'.html"','Content-Security-Policy':"sandbox"});
   if(req.method==='GET'&&action==='screenshot'&&j.reportRound){const name=u.searchParams.get('name')||'';if(!j.report?.tests.some(t=>t.screenshot===name))return json(res,404,{error:'Không có ảnh'});return file(res,path.join(DATA,j.id,'round-'+j.reportRound,name))}
  }
  json(res,404,{error:'Không có endpoint'});
 }catch(e){json(res,400,{error:cleanError(e)})}
});
function start(port=8765){server.listen(port,'127.0.0.1',()=>{console.log('Van phong: http://127.0.0.1:'+server.address().port);if(process.env.OFFICE_OPEN){require('node:child_process').spawn('cmd',['/c','start','','http://127.0.0.1:'+server.address().port+(process.env.OFFICE_OPEN==='local'?'/':'/connect')],{windowsHide:true})}});server.on('error',e=>{if(e.code==='EADDRINUSE')server.listen(0,'127.0.0.1');else console.error('Không khởi động được máy chủ: '+e.code)});return server}
if(require.main===module)start(Number(process.env.PORT)||8765);
module.exports={start,server};
