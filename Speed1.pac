// =======================================================
// PROXIES
// =======================================================
var MATCH_JO = "PROXY 91.106.109.12:20001";

var LOBBY_POOL = [
  "PROXY 91.106.109.12:9030",
  "PROXY 212.35.66.45:9030",
  "PROXY 46.185.131.218:20001"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";


// =======================================================
// JORDAN MATCH (STRICT)
// =======================================================
// نطاقات سعودية + مستخدمة فعليًا داخل الأردن
var JORDAN_MATCH_IPV4 = [
  ["46.185.128.0","255.255.128.0"], // Orange Jordan
  ["212.35.0.0","255.255.0.0"],     // Orange Jordan
  ["86.108.0.0","255.254.0.0"],     // Zain Jordan
  ["176.29.0.0","255.255.0.0"],     // Umniah Jordan
  ["5.45.128.0","255.255.240.0"],   // زبائن موبايل / DSL
  ["37.17.192.0","255.255.240.0"],  // ISP محلية
  ["37.44.32.0","255.255.248.0"],
  ["37.75.144.0","255.255.248.0"],
  ["37.123.64.0","255.255.224.0"],
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["46.185.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"]
];


// =======================================================
// JORDAN LOBBY (EXPANDED USED)
// =======================================================
// نطاقات موسّعة تغطّي أغلب IPv4 اللي تظهر بأنها داخل الأردن فعليًا
// مُجمع من قواعد بيانات جغرافية لبلد الأردن.  [oai_citation:1‡lite.ip2location.com](https://lite.ip2location.com/jordan-ip-address-ranges?utm_source=chatgpt.com)

var JORDAN_LOBBY_IPV4 = [
  ["46.185.128.0","255.255.128.0"],  // Orange
  ["212.35.0.0","255.255.0.0"],      // Orange
  ["86.108.0.0","255.254.0.0"],      // Zain
  ["176.29.0.0","255.255.0.0"],      // Umniah
  ["5.45.128.0","255.255.240.0"],
  ["37.17.192.0","255.255.240.0"],
  ["37.44.32.0","255.255.248.0"],
  ["37.75.144.0","255.255.248.0"],
  ["37.123.64.0","255.255.224.0"],
  ["46.23.112.0","255.255.240.0"],
  ["46.32.96.0","255.255.224.0"],
  ["46.248.192.0","255.255.224.0"],
  ["62.72.160.0","255.255.224.0"],
  ["77.245.0.0","255.255.240.0"],
  ["79.134.128.0","255.255.224.0"],
  ["79.173.192.0","255.255.224.0"],
  ["92.253.0.0","255.255.0.0"],
  ["94.142.32.0","255.255.224.0"],
  ["94.249.0.0","255.255.0.0"],
  ["109.107.224.0","255.255.224.0"],
  ["188.161.0.0","255.255.0.0"]
];


// =======================================================
// GEO BLACKLIST
// =======================================================
var GEO_BLACKLIST = [
  ["5.0.0.0","255.0.0.0"],
  ["37.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","255.0.0.0"],
  ["39.0.0.0","255.0.0.0"],
  ["42.0.0.0","255.0.0.0"]
];


// =======================================================
// SESSION STATE
// =======================================================
var SESSION = { matchNet: null, matchHost: null, dnsCache: {} };


// =======================================================
// HELPERS
// =======================================================
function norm(h){ var i=h.indexOf(":"); return i>-1 ? h.substring(0,i):h; }
function isInList(ip,list){ for(var i=0;i<list.length;i++) if(isInNet(ip,list[i][0],list[i][1])) return true; return false; }
function resolvePinned(host){ if(SESSION.dnsCache[host]) return SESSION.dnsCache[host]; var ip=dnsResolve(host); if(ip && isPUBG(host)) SESSION.dnsCache[host]=ip; return ip; }
function pickLobbyProxy(host){ var h=0; for(var i=0;i<host.length;i++) h=(h+host.charCodeAt(i))%LOBBY_POOL.length; return LOBBY_POOL[h]; }


// =======================================================
// GLOBAL WHITELIST (DIRECT)
// =======================================================
function isWhitelistedPlatform(h){
  return /(youtube\\.com|youtu\\.be|googlevideo\\.com|
            github\\.com|githubusercontent\\.com|
            tiktok\\.com|tiktokcdn\\.com|tiktokv\\.com)/i.test(h);
}


// =======================================================
// DETECTION (FLEXIBLE)
// =======================================================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function isMatch(u,h){
  return /match|battle|game|combat|realtime|sync|tick|room/i.test(u+h);
}

function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|
          join|recruit|enter|prepare|connect|handshake/i.test(u+h);
}

function isSocial(u,h){
  return /friend|invite|squad|team|party|clan|presence|social/i.test(u+h);
}

function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content/i.test(u+h);
}


// =======================================================
// MAIN
// =======================================================
function FindProxyForURL(url,host){

  host = norm(host.toLowerCase());

  if (isWhitelistedPlatform(host)) return DIRECT;
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;
  if (isInList(ip,GEO_BLACKLIST)) return BLOCK;

  // ---- MATCH (STRICT) ----
  if (isMatch(url,host)) {
    if (!isInList(ip,JORDAN_MATCH_IPV4)) return BLOCK;
    var net24 = ip.split(".").slice(0,3).join(".");
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }
    if (host!==SESSION.matchHost) return BLOCK;
    if (net24!==SESSION.matchNet) return BLOCK;
    return MATCH_JO;
  }

  // reset after match
  if (SESSION.matchNet) {
    SESSION.matchNet=null;
    SESSION.matchHost=null;
  }

  // ---- LOBBY / SOCIAL / CDN ----
  if (isLobby(url,host)||isSocial(url,host)||isCDN(url,host)) {
    if (isInList(ip,JORDAN_LOBBY_IPV4)) return pickLobbyProxy(host);
    return pickLobbyProxy(host);
  }

  return pickLobbyProxy(host);
}
