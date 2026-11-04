'use strict';
const $=id=>document.getElementById(id);
window.statusNames={QUEUED:'Đang chờ',PLANNING:'Khôi đang phân tích',CODING:'Đức đang viết mã',DESIGNING_TESTS:'Minh đang thiết kế bài thử',TESTING:'Chromium đang kiểm thử',PAUSED:'Đã tạm dừng',READY_REVIEW:'Bài thử đạt — chờ bạn dùng thử',APPROVED:'Bạn đã nghiệm thu',FAILED:'Chưa đạt sau 3 vòng',BLOCKED:'Bị chặn / chưa kiểm chứng',CANCELLED:'Đã hủy',INTERRUPTED:'Bị gián đoạn khi máy chủ dừng'};
let state=null,selected='',lastModelKey='',previousRender='';
window.currentJob=null;
window.showPanel=()=>$('panel').hidden=false;
$('openPanel').onclick=window.showPanel;$('btnZoomScreen').onclick=window.showPanel;$('closePanel').onclick=()=>$('panel').hidden=true;
document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{focus3DCamera(b.dataset.view);$('panel').hidden=true});
async function api(url,data){return OfficeTransport.json(url,data)}
function notice(e){$('notice').textContent=e.message||e}
function models(list){const k=list.join(',');if(k===lastModelKey)return;lastModelKey=k;for(const role of ['planner','coder','tester']){const sel=$(role),old=sel.value;sel.replaceChildren(...list.map(m=>new Option(m,m)));if(list.includes(old))sel.value=old;else{const preferred=list.find(m=>m==='gemini-2.5-pro')||list.find(m=>m.includes('pro')&&!m.includes('image'))||list[0];sel.value=preferred||''}}}
$('connect').onclick=async()=>{const b=$('connect');b.disabled=true;try{const key=$('key').value;$('key').value='';await api('/api/config',{key});notice('Đã xác thực danh sách model. Chọn model cho từng vai trò; lần tạo nội dung vẫn có thể bị giới hạn quota.');await refresh()}catch(e){notice(e)}finally{b.disabled=false}};
$('taskForm').onsubmit=async e=>{e.preventDefault();$('start').disabled=true;try{const j=await api('/api/jobs',{brief:$('brief').value,models:Object.fromEntries(['planner','coder','tester'].map(r=>[r,$(r).value]))});selected=j.id;notice('Đã nhận tác vụ. Kết quả được lưu trên máy; khóa không được lưu.');await refresh()}catch(e){notice(e)}finally{$('start').disabled=!!state?.active}};
$('example').onclick=()=>{$('brief').value='Tạo ứng dụng quản lý công việc tiếng Việt. Thêm công việc với tên bắt buộc; tên trống hiện lỗi và không thêm. Sửa tên, đánh dấu hoàn thành, xóa công việc, tìm kiếm theo tên. Lưu dữ liệu bằng localStorage và khôi phục đúng khi tải lại trang. Giao diện dễ đọc, có trạng thái danh sách trống.'};
$('history').onchange=()=>{selected=$('history').value;previousRender='';render()};
document.querySelectorAll('[data-control]').forEach(b=>b.onclick=async()=>{try{await api('/api/jobs/'+selected+'/control',{action:b.dataset.control});notice('Đã gửi lệnh '+b.textContent+'. Bước đang chạy có thể cần kết thúc trước khi dừng.');await refresh()}catch(e){notice(e)}});
$('approve').onclick=async()=>{try{await api('/api/jobs/'+selected+'/approve',{});await refresh()}catch(e){notice(e)}};
$('revise').onclick=()=>{if(window.currentJob){$('brief').value=window.currentJob.brief+'\n\nYêu cầu chỉnh sửa: ';$('brief').focus();$('brief').scrollIntoView({behavior:'smooth'})}};
function render(){
 if(!state)return;const j=state.jobs.find(j=>j.id===selected)||state.jobs[0]||null;if(j)selected=j.id;window.currentJob=j;
 $('connection').textContent=state.configured?'Gemini đã kết nối · PC đang trực tuyến':'PC trực tuyến · chưa kết nối Gemini';if(OfficeTransport.remote)$('pcStatus').textContent='Đã ghép nối với PC này · cổng '+OfficeTransport.port();$('start').disabled=!state.configured||!!state.active;
 $('config').open=!state.configured;models(state.models);
 const h=$('history');h.replaceChildren(...(state.jobs.length?state.jobs.map(j=>new Option(j.brief.slice(0,65)+' · '+statusNames[j.status],j.id)):[new Option('Chưa có dự án','')]));h.value=selected;
 $('job').hidden=!j;
 const key=JSON.stringify(j);if(key===previousRender)return;previousRender=key;
 for(const a of agents){a.status='STANDBY';a.statusText='chờ việc';a.currentTask=a.id>4?'Dự bị — chưa triển khai vai trò chuyên môn':'Chưa giao việc';a.speech=a.currentTask;}
 if(j){
 const roleId={Khôi:1,Đức:3,Minh:4,Linh:2}[j.role];if(roleId){const a=agents.find(a=>a.id===roleId);a.currentTask=statusNames[j.status];a.speech=j.events.at(-1)?.message||'';a.statusText=statusNames[j.status];if(['PLANNING','CODING','DESIGNING_TESTS','TESTING'].includes(j.status))a.status='WORKING';else if(j.status==='READY_REVIEW')a.status='REPORTING'}
 $('status').textContent=statusNames[j.status]||j.status;$('version').textContent=j.sourceHash?.slice(0,12)||'Chưa có mã nguồn';$('metrics').textContent=`Vòng ${j.round}/3 · ${j.calls}/9 lần gọi · ${j.tokens} token do API báo · Chi phí: chưa xác định`;
 document.querySelectorAll('[data-control]').forEach(b=>b.disabled=state.active!==j.id);
 $('requirements').replaceChildren(...(j.plan?.requirements||[]).map(r=>{const d=document.createElement('div');d.className='criterion';d.textContent=r.id+' · '+r.text;return d}));
 const results=$('testResults');results.replaceChildren();
 if(!j.report){results.textContent=j.error||j.gaps?.join('; ')||j.plan?.blockers?.join('; ')||'Chưa có kết quả chạy trình duyệt.'}
 else for(const t of j.report.tests){const d=document.createElement('div');d.className='test';d.dataset.status=t.status;d.textContent=(t.status==='passed'?'ĐẠT':'LỖI')+' · '+t.name+'\n'+(t.error||'');if(t.screenshot){const a=document.createElement('a');a.textContent='Ảnh kiểm thử';a.href='#';a.onclick=async e=>{e.preventDefault();try{await OfficeTransport.showImage('/api/jobs/'+j.id+'/screenshot?name='+encodeURIComponent(t.screenshot))}catch(err){notice(err)}};d.append(a)}results.append(d)}
 $('download').hidden=!j.sourceHash;$('download').href='#';$('download').onclick=async e=>{e.preventDefault();try{await OfficeTransport.download('/api/jobs/'+j.id+'/artifact','san-pham-v'+j.round+'.html')}catch(err){notice(err)}};$('download').textContent=['READY_REVIEW','APPROVED'].includes(j.status)?'Tải HTML để dùng thử':'Tải bản nháp — chưa đạt';$('reportLink').href='#';$('reportLink').removeAttribute('target');$('reportLink').onclick=async e=>{e.preventDefault();try{await OfficeTransport.download('/api/jobs/'+j.id+'/report','bao-cao-kiem-thu.json')}catch(err){notice(err)}};$('approve').hidden=j.status!=='READY_REVIEW';
 $('events').replaceChildren(...[...j.events].reverse().map(ev=>{const li=document.createElement('li');li.textContent=new Date(ev.time).toLocaleTimeString('vi-VN')+' · '+ev.role+' — '+ev.message;return li}));
 }
 drawGiant3DScreenCanvas();
}
let refreshing=false;
async function refresh(){
 if(refreshing||!OfficeTransport.ready())return;refreshing=true;
 try{state=await api('/api/state');render()}catch(e){$('connection').textContent='Mất kết nối PC — không suy diễn tiến độ';$('start').disabled=true;if(OfficeTransport.remote)$('pcStatus').textContent='Chưa liên lạc được PC. Kiểm tra bộ kết nối và quyền mạng cục bộ của trình duyệt.';notice(e)}finally{refreshing=false}
}
$('start').disabled=true;
if(OfficeTransport.remote){
 $('pcBridge').hidden=false;$('pcPort').value=OfficeTransport.port();$('connection').textContent='Chờ kết nối với PC';
 $('openPC').onclick=()=>{try{OfficeTransport.openPC($('pcPort').value)}catch(e){notice(e)}};
 $('retryPC').onclick=async()=>{try{await OfficeTransport.pair();await refresh()}catch(e){notice(e)}};
 $('forgetPC').onclick=()=>{OfficeTransport.forget();state=null;previousRender='';$('start').disabled=true;$('job').hidden=true;window.currentJob=null;agents.forEach(a=>{a.status='STANDBY';a.statusText='mất kết nối';a.currentTask='Không có dữ liệu từ PC'});drawGiant3DScreenCanvas();$('pcStatus').textContent='Đã ngắt ghép nối tab này.';$('connection').textContent='Chưa kết nối PC';};
 OfficeTransport.pair().then(refresh).catch(e=>notice('Chưa ghép nối: '+e.message));
}else refresh();
setInterval(refresh,2000);
