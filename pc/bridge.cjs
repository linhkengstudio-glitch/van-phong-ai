'use strict';
const crypto=require('node:crypto');
const WEBSITE='https://linhkengstudio-glitch.github.io/van-phong-ai/';
const WEB_ORIGIN=new URL(WEBSITE).origin;
function createBridge({now=Date.now}={}) {
 const tickets=new Map(),sessions=new Map();
 function prune(){for(const map of [tickets,sessions])for(const [key,expires] of map)if(expires<=now())map.delete(key)}
 function issue(port){prune();if(tickets.size>=5)tickets.delete(tickets.keys().next().value);const code=crypto.randomBytes(24).toString('base64url');tickets.set(code,now()+120000);return {url:WEBSITE+'#office_pair='+code+'&office_port='+port,expiresIn:120}}
 function redeem(code,origin){prune();if(origin!==WEB_ORIGIN||typeof code!=='string'||!tickets.has(code))return null;tickets.delete(code);if(sessions.size>=5)sessions.delete(sessions.keys().next().value);const token=crypto.randomBytes(32).toString('base64url');sessions.set(token,now()+12*60*60*1000);return {token,expiresIn:43200}}
 function authorized(req){prune();if(req.headers.origin!==WEB_ORIGIN)return false;const auth=req.headers.authorization||'';return auth.startsWith('Bearer ')&&sessions.has(auth.slice(7))}
 function cors(req,res){
  const origin=req.headers.origin;if(origin===WEB_ORIGIN){res.setHeader('Access-Control-Allow-Origin',WEB_ORIGIN);res.setHeader('Vary','Origin');res.setHeader('Access-Control-Expose-Headers','Content-Disposition');}
  if(req.method!=='OPTIONS')return false;
  if(origin!==WEB_ORIGIN){res.writeHead(403);res.end();return true}
  const method=req.headers['access-control-request-method'];const headers=(req.headers['access-control-request-headers']||'').toLowerCase().split(',').map(s=>s.trim()).filter(Boolean);
  if(!['GET','POST'].includes(method)||headers.some(h=>!['authorization','content-type','x-office-request'].includes(h))){res.writeHead(403);res.end();return true}
  res.setHeader('Access-Control-Allow-Methods','GET, POST');res.setHeader('Access-Control-Allow-Headers','Authorization, Content-Type, X-Office-Request');res.setHeader('Access-Control-Allow-Private-Network','true');res.setHeader('Access-Control-Max-Age','300');res.writeHead(204);res.end();return true;
 }
 return {issue,redeem,authorized,cors,revoke:()=>{tickets.clear();sessions.clear()}};
}
module.exports={createBridge,WEBSITE,WEB_ORIGIN};
