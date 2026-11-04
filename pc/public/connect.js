'use strict';
const message=document.getElementById('connectNotice');
async function post(url){const r=await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-Office-Request':'1'},body:'{}'});const b=await r.json();if(!r.ok)throw Error(b.error);return b}
document.getElementById('openOldWeb').onclick=async()=>{try{message.textContent='Đang tạo phiên kết nối…';const b=await post('/api/bridge-ticket');location.assign(b.url)}catch(e){message.textContent=e.message}};
document.getElementById('revoke').onclick=async()=>{try{await post('/api/bridge-revoke');message.textContent='Đã ngắt mọi phiên web. Công việc đang chạy trên PC không bị hủy.'}catch(e){message.textContent=e.message}};
