'use strict';
(() => {
 const WEB='https://linhkengstudio-glitch.github.io',KEY='office.pc.session.v1';
 const local=location.hostname==='127.0.0.1';
 const remote=!local,allowed=local||location.origin===WEB;let port='8765',token='',pending='';
 const params=new URLSearchParams(location.hash.slice(1));
 if(remote){

  try{const saved=JSON.parse(sessionStorage.getItem(KEY)||'null');if(saved){port=String(saved.port);token=String(saved.token)}}catch{}
  if(params.has('office_pair')){pending=params.get('office_pair');port=params.get('office_port')||'8765';token='';history.replaceState(null,'',location.pathname+location.search);}
 }
 function validPort(p){return /^\d{4,5}$/.test(p)&&Number(p)>=1024&&Number(p)<=65535}
 if(!validPort(port)){port='8765';token='';pending=''}
 const base=()=>remote?'http://127.0.0.1:'+port:'';
 function reset(){token='';pending='';try{sessionStorage.removeItem(KEY)}catch{}}
 async function response(route,data){
  if(!allowed)throw Error('Mở đúng địa chỉ văn phòng trên GitHub để ghép nối PC.');
  if(!route.startsWith('/api/'))throw Error('Đường dẫn API không hợp lệ');
  const headers={};if(data!==undefined){headers['Content-Type']='application/json';headers['X-Office-Request']='1'}
  if(remote){if(!token)throw Error('Mở bộ kết nối PC để ghép nối với web.');headers.Authorization='Bearer '+token;}
  const r=await fetch(base()+route,{method:data===undefined?'GET':'POST',headers,body:data===undefined?undefined:JSON.stringify(data),credentials:remote?'omit':'same-origin',...(remote?{targetAddressSpace:'loopback'}:{}),signal:AbortSignal.timeout(30000)});
  if(!r.ok){let b;try{b=await r.json()}catch{}if(remote&&r.status===403)reset();throw Error(b?.error||'Không đọc được kết quả từ PC (HTTP '+r.status+').');}return r;
 }
 async function pair(){
  if(!allowed)throw Error('Bản xem trước. Ghép nối PC chỉ hoạt động tại địa chỉ web chính thức.');
  if(!remote||!pending)return;
  const r=await fetch(base()+'/api/pair',{method:'POST',headers:{'Content-Type':'application/json','X-Office-Request':'1'},body:JSON.stringify({code:pending}),credentials:'omit',targetAddressSpace:'loopback',signal:AbortSignal.timeout(12000)});
  const b=await r.json();if(!r.ok)throw Error(b.error||'Ghép nối thất bại');token=b.token;pending='';try{sessionStorage.setItem(KEY,JSON.stringify({port,token}))}catch{}
 }
 async function download(route,name){const r=await response(route);const url=URL.createObjectURL(await r.blob());const a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),60000)}
 async function showImage(route){const r=await response(route),url=URL.createObjectURL(await r.blob());const dialog=document.createElement('dialog');dialog.className='evidence';const close=document.createElement('button');close.textContent='Đóng ảnh';const img=document.createElement('img');img.src=url;img.alt='Ảnh chụp từ lần kiểm thử';dialog.append(close,img);document.body.append(dialog);close.onclick=()=>dialog.close();dialog.onclose=()=>{URL.revokeObjectURL(url);dialog.remove()};dialog.showModal()}
 window.OfficeTransport={remote,ready:()=>allowed&&(!remote||!!token),pair,port:()=>port,openPC(p){if(!validPort(p))throw Error('Cổng phải từ 1024 đến 65535');window.open('http://127.0.0.1:'+p+'/connect','_blank','noopener')},forget:reset,async json(route,data){return (await response(route,data)).json()},download,showImage};
})();
