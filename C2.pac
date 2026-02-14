function FindProxyForURL(url, host) {

/* ========= CONFIG ========= */

var GAME_PROXY = "PROXY 46.185.131.218:20003";  // Stealth proxy
var WEB_PROXIES = [
  "PROXY 46.185.131.218:20001",
  "PROXY 46.185.131.218:20002"
];

var FAIL_CLOSED = false;

function proxyChain(p){
  return FAIL_CLOSED ? p : p + "; DIRECT";
}

function hash(s){
  var h=0;
  for(var i=0;i<s.length;i++)
    h=((h<<5)-h)+s.charCodeAt(i);
  return Math.abs(h);
}

function selectProxy(host){
  var idx = hash(host) % WEB_PROXIES.length;
  return proxyChain(WEB_PROXIES[idx]);
}

/* ========= GAMING STEALTH ========= */

if (
  dnsDomainIs(host, "pubgmobile.com") ||
  dnsDomainIs(host, "igamecj.com") ||
  dnsDomainIs(host, "intlgame.com") ||
  dnsDomainIs(host, "proximabeta.com") ||
  dnsDomainIs(host, "tencent.com") ||
  dnsDomainIs(host, "qq.com") ||
  dnsDomainIs(host, "gtimg.com") ||
  shExpMatch(host, "*.pubgmobile.*") ||
  shExpMatch(host, "*.tencent.*") ||
  shExpMatch(host, "*.igamecj.*")
){
  return proxyChain(GAME_PROXY);
}

/* ========= GITHUB BYPASS ========= */

if (
  dnsDomainIs(host, "github.com") ||
  dnsDomainIs(host, "api.github.com") ||
  dnsDomainIs(host, "raw.githubusercontent.com") ||
  shExpMatch(host, "*.githubusercontent.com")
){
  return "DIRECT";
}

/* ========= LOCAL ========= */

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
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["185.35.100.0","255.255.252.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["185.108.64.0","255.255.192.0"],
  ["188.161.128.0","255.255.128.0"],
  ["37.48.0.0","255.255.0.0"],
  ["185.71.68.0","255.255.252.0"],
  ["217.171.80.0","255.255.240.0"],
  ["213.6.0.0","255.255.0.0"],
  ["195.229.0.0","255.255.0.0"],
  ["46.185.128.0","255.255.128.0"],
  ["46.23.96.0","255.255.224.0"],
  ["185.19.200.0","255.255.252.0"],
  ["212.118.0.0","255.255.0.0"],
  ["195.202.0.0","255.255.192.0"],
  ["212.104.160.0","255.255.224.0"],
  ["193.188.0.0","255.255.0.0"],
  ["188.247.0.0","255.255.0.0"],
  ["31.6.0.0","255.254.0.0"],
  ["87.236.0.0","255.252.0.0"],
  ["185.117.156.0","255.255.252.0"],
  ["212.119.0.0","255.255.0.0"],
  ["195.228.0.0","255.254.0.0"]
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
 "2a03:6b00::/29",
 "2a00:d880::/29",
 "2a04:3542::/32",
 "2a05:3580::/29"
];

if(is6(host)){
  for(var i=0;i<PRIVATE6.length;i++)
    if(in6(host,PRIVATE6[i])) return "DIRECT";

  for(var i=0;i<JO6.length;i++)
    if(in6(host,JO6[i])) return "DIRECT";

  return selectProxy(host);
}

return selectProxy(host);

}
