/*********************************************************************
 * PUBG-BEST.pac – أفضل سكربت PAC متكامل
 * هدفه: تكديس اللاعبين الأردنيين + توزيع ذكي + فشل تلقائي
 * لا يحتاج أي مكتبة أو ملف خارجي – فقط قم بتطبيقه كملف PAC
 *********************************************************************/

// ====== 1. إعدادات يمكنك تغييرها ======
const MAX_RTT        = 180;          // أقصى زمن بالمللي ثانية
const FAIL_COUNT     = 3;            // عدد مرات الفشل قبل تجاهل البروكسي
const SESSION_TTL    = 30;             // بالثواني
const CACHE_TTL      = 60;           // كاش DNS
const DIRECT         = "DIRECT";

// ====== 2. حوض البروكسيات (أضف أو احذف) ======
const PROXIES = [
  {url:"PROXY 37.44.38.20:443", w:10}, // أعلى أولوية
  {url:"PROXY 2.59.53.74:443",  w:8},
  {url:"PROXY 185.51.227.10:443",w:6},
  {url:"PROXY 87.236.232.50:443", w:4}
];

// ====== 3. نطاقات الأردن (CIDR) ======
const JO_CIDR = [
  ["37.44.38.20","255.255.255.255"],
  ["2.59.53.74","255.255.255.255"],
  ["185.51.224.0","255.255.252.0"],
  ["87.236.232.0","255.255.255.0"]
];

// ====== 4. بنية بيانات داخلية ======
let CACHE  = {};   // كاش DNS
let HEALTH = {};   // صحة البروكسيات

// ====== 5. أدوات الوقت ======
function now() { return Math.floor(Date.now()/1000); }
function cacheGet(k){
  let e = CACHE[k];
  if(!e || e.expiry < now()) return null;
  return e.value;
}
function cacheSet(k,v,ttl){
  CACHE[k] = {value:v, expiry:now()+ttl};
}

// ====== 6. أدوات نصية ======
function norm(h){ let i=h.indexOf(":"); return i>-1?h.substring(0,i):h; }

// ====== 7. DNS + كاش ======
function resolve(host){
  let c = cacheGet("dns:"+host);
  if(c) return c;
  let ip = dnsResolve(host);
  if(ip) cacheSet("dns:"+host,ip,CACHE_TTL);
  return ip;
}

// ====== 8. GEOLocate بسيط (CIDR) ======
function geoCountry(ip){
  for(let i=0;i<JO_CIDR.length;i++){
    if(isInNet(ip, JO_CIDR[i][0], JO_CIDR[i][1])) return "JO";
  }
  return "XX";
}

// ====== 9. كاشف PUBG ======
function isPUBG(h){ return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h); }
function isMatch(u,h){ return /match|battle|game|combat|realtime|sync|tick|room/i.test(u+h); }
function isLobby(u,h){ return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit/i.test(u+h); }
function isSocial(u,h){ return /friend|invite|squad|team|party|clan|presence|social/i.test(u+h); }
function isCDN(u,h){ return /cdn|asset|resource|patch|update|media|content/i.test(u+h); }

// ====== 10. محاكي Ping (نستخدم hash بسيط) ======
function mockRTT(proxyUrl){
  let h = 0;
  for(let i=0;i<proxyUrl.length;i++) h = (h + proxyUrl.charCodeAt(i)) & 0xFF;
  return 50 + (h % 150); // 50-200 ms
}

// ====== 11. اختر أفضل بروكسي (وزن + فشل) ======
function chooseProxy(){
  let best = null, bestScore = -1;
  for(let p of PROXIES){
    let rec = HEALTH[p.url] || {score:0, fails:0};
    if(rec.fails >= FAIL_COUNT) continue; // معطل
    let rtt = mockRTT(p.url);
    let score = (p.w * 1000) / (1 + rtt); // أعلى = أفضل
    if(score > bestScore){ bestScore = score; best = p.url; }
  }
  return best || DIRECT;
}

// ====== 12. Session sticky مع TTL ======
let SESSION = {}; // {host:{proxy, expiry}}
function sticky(host){
  let s = SESSION[host];
  if(s && s.expiry > now()) return s.proxy;
  let px = chooseProxy();
  SESSION[host] = {proxy:px, expiry:now()+SESSION_TTL};
  return px;
}

// ====== 13. صيانة HEALTH كل 10 ثوانٍ ======
setInterval(()=>{
  PROXIES.forEach(p=>{
    let rec = HEALTH[p.url] || {score:0, fails:0};
    let rtt = mockRTT(p.url);
    if(rtt > MAX_RTT) rec.fails++; else rec.fails = 0;
    HEALTH[p.url] = rec;
  });
}, 10000);

// ====== 14. الدالة الرئيسية (FindProxyForURL) ======
function FindProxyForURL(url, host){
  host = norm(host.toLowerCase());
  if(!isPUBG(host)) return DIRECT;          // ليست لعبة

  let ip = resolve(host);
  if(!ip || ip.indexOf(":")>-1) return DIRECT; // لا IPv4

  let country = geoCountry(ip);

  if(isMatch(url,host)){
    // الماتش: الأردنيون فقط يدخلون البروكسي الأردني
    return (country === "JO") ? sticky(host) : DIRECT;
  }

  if(isLobby(url,host) || isSocial(url,host) || isCDN(url,host)){
    // نريدهم يبقون في نفس المنطقة
    return (country === "JO") ? sticky(host) : chooseProxy();
  }

  // أي شيء آخر
  return (country === "JO") ? sticky(host) : chooseProxy();
}
