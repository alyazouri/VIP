function FindProxyForURL(url, host) {

/* ========= CONFIG ========= */

var PROXIES = [
  "PROXY 46.185.131.218:20001",
  "PROXY 46.185.131.218:20002"
];

var FAIL_CLOSED = false;   // true = لا DIRECT fallback

function proxyChain(p){
  return FAIL_CLOSED ? p : p + "; DIRECT";
}

/* ========= LOAD BALANCER ========= */

function hash(s){
  var h=0;
  for(var i=0;i<s.length;i++)
    h=((h<<5)-h)+s.charCodeAt(i);
  return Math.abs(h);
}

function selectProxy(host){
  var idx = hash(host) % PROXIES.length;
  return proxyChain(PROXIES[idx]);
}

/* ========= GITHUB BYPASS (FAST DIRECT) ========= */

if (
  dnsDomainIs(host, "github.com") ||
  dnsDomainIs(host, "api.github.com") ||
  dnsDomainIs(host, "raw.githubusercontent.com") ||
  shExpMatch(host, "*.githubusercontent.com")
){
  return "DIRECT";
}

/* ========= LOCAL BYPASS ========= */

if (isPlainHostName(host) ||
    host === "localhost" ||
    shExpMatch(host, "*.local") ||
    shExpMatch(host, "*.corp") ||
    shExpMatch(host, "*.internal")) {
  return "DIRECT";
}

/* ========= IPv4 ========= */

function is4(h){
  var m=h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if(!m) return false;
  for(var i=1;i<=4;i++)
    if(parseInt(m[i],10)>255) return false;
  return true;
}

function l(ip){
  var p=ip.split(".");
  return ((p[0]<<24)>>>0)+((p[1]<<16)>>>0)+((p[2]<<8)>>>0)+(p[3]>>>0);
}

function in4(ip,n,m){
  return (l(ip)&l(m))===(l(n)&l(m));
}

var PRIVATE4=[
 ["10.0.0.0","255.0.0.0"],
 ["172.16.0.0","255.240.0.0"],
 ["192.168.0.0","255.255.0.0"],
 ["127.0.0.0","255.0.0.0"],
 ["169.254.0.0","255.255.0.0"]
];

var JO4=[
 ["46.185.128.0","255.255.128.0"],
 ["86.108.0.0","255.255.128.0"],
 ["92.253.0.0","255.255.128.0"],
 ["94.249.0.0","255.255.128.0"],
 ["149.200.128.0","255.255.128.0"]
];

if(is4(host)){
  for(var i=0;i<PRIVATE4.length;i++)
    if(in4(host,PRIVATE4[i][0],PRIVATE4[i][1]))
      return "DIRECT";

  for(var i=0;i<JO4.length;i++)
    if(in4(host,JO4[i][0],JO4[i][1]))
      return "DIRECT";

  return selectProxy(host);
}

/* ========= IPv6 ========= */

function is6(h){ return h.indexOf(":")!==-1; }

function ex6(a){
  if(a.indexOf("::")!==-1){
    var s=a.split("::");
    var l=s[0]?s[0].split(":"):[];
    var r=s[1]?s[1].split(":"):[];
    var f=8-(l.length+r.length);
    for(var i=0;i<f;i++) l.push("0");
    a=l.concat(r).join(":");
  }
  var p=a.split(":"),o=[];
  for(var i=0;i<8;i++)
    o[i]=parseInt(p[i]||"0",16);
  return o;
}

function in6(ip,c){
  var pr=c.split("/");
  var b=ex6(pr[0]),t=ex6(ip);
  var px=parseInt(pr[1]);
  var f=Math.floor(px/16),r=px%16;
  for(var i=0;i<f;i++)
    if(b[i]!==t[i]) return false;
  if(r>0){
    var m=0xFFFF<<(16-r);
    if((b[f]&m)!==(t[f]&m)) return false;
  }
  return true;
}

var PRIVATE6=[
 "::1/128",
 "fc00::/7",
 "fe80::/10"
];

var JO6=[
 "2001:32c0::/29",
 "2a03:6b00::/29"
];

if(is6(host)){
  for(var i=0;i<PRIVATE6.length;i++)
    if(in6(host,PRIVATE6[i])) return "DIRECT";

  for(var i=0;i<JO6.length;i++)
    if(in6(host,JO6[i])) return "DIRECT";

  return selectProxy(host);
}

/* ========= DOMAINS ========= */

return selectProxy(host);

}
