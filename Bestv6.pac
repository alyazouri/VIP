// ================= DNS =================
// dns 1.1.1.1 1.0.0.1

// ================= SOCKS PROXIES =================
var MATCH_JO     = "SOCKS 46.185.131.218:20001";   // MATCH (Gameplay) - Jordan-specific, low lag
var LOBBY_PROXY  = "SOCKS 212.35.66.45:8085";     // LOBBY / SOCIAL / CDN - Jordan-specific, low lag
var BLOCK        = "SOCKS 127.0.0.1:9";
var DIRECT       = "DIRECT";

// ================= JORDAN MATCH IPV4 (UPDATED WITH 2026 ALLOCATIONS - ULTRA-TIGHT, NO LEAKS) =================
var JORDAN_MATCH_IPV4 = [
["92.253.0.0","255.255.128.0"],     // Sprint/Orange – 1–2ms consistent
["46.185.128.0","255.255.128.0"],   // Orange Broadband/ADSL – low latency Amman
["149.200.128.0","255.255.128.0"],  // Orange ADSL customers – stable routing
["94.249.0.0","255.255.128.0"],     // Orange Core Telecom – أقوى نطاق matchmaking
["86.108.0.0","255.255.128.0"]      // Orange Core – ideal for gaming servers
];

// ================= JORDAN WIDE IPV4 (UPDATED WITH 2026 ALLOCATIONS - CORE RANGES ONLY, NO LEAKS) =================
var JORDAN_WIDE_IPV4 = [
["94.249.0.0","255.255.128.0"],     // Orange Core Telecom – أفضل Matchmaking بالأردن
["86.108.0.0","255.255.128.0"],     // Orange Core – Gaming backbone
["176.29.0.0","255.255.0.0"],       // Zain Broadband – Massive stable core
["92.253.0.0","255.255.128.0"],     // Sprint / Orange – very consistent
["46.185.128.0","255.255.128.0"],   // Orange Broadband / ADSL
["149.200.128.0","255.255.128.0"],  // Orange ADSL – clean routing
["37.202.64.0","255.255.192.0"],    // Orange updated – acceptable
["79.173.192.0","255.255.192.0"],   // Orange ADSL – متوسط
["176.28.128.0","255.255.128.0"]    // Zain Mobile (أفضل خيار موبايل فقط)
];

// ================= JORDAN MATCH IPV6 (UPDATED WITH 2026 ALLOCATIONS - NO LEAKS) =================
var JORDAN_MATCH_IPV6 = [
["2a02:248::", "29"],     // Orange Jordan – IPv6 Core (الأفضل)
["2a13:8d40::", "29"],    // Zain Jordan – IPv6 Broadband Core
["2a03:6d00::", "32"],    // Umniah – IPv6 (مستقر نسبيًا)
["2a05:7500::", "29"]     // Umniah – IPv6 Core/Hybrid
];

// ================= JORDAN WIDE IPV6 (UPDATED WITH 2026 ALLOCATIONS - NO LEAKS) =================
var JORDAN_WIDE_IPV6 = JORDAN_MATCH_IPV6;

// ================= JORDAN ISP ALLOWLIST (UPDATED FOR 2026 - NO CHANGE) =================
function isJordanISP(ip){
  return (
    // Tier 1 – Orange Core (BEST matchmaking)
    isInNet(ip, "94.249.0.0", "255.255.128.0") ||   // Orange Core Telecom
    isInNet(ip, "86.108.0.0", "255.255.128.0") ||   // Orange Core Backbone
    // Tier 2 – Stable Orange routes
    isInNet(ip, "92.253.0.0", "255.255.128.0") ||   // Sprint / Orange
    isInNet(ip, "46.185.128.0", "255.255.128.0") || // Orange Broadband / ADSL
    isInNet(ip, "149.200.128.0", "255.255.128.0")   // Orange ADSL customers
  );
}

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};

// ================= HELPERS =================
function norm(h){
  var i=h.indexOf(":");
  return i>-1?h.substring(0,i):h;
}

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolvePinned(host){
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

function resetSession(){
  SESSION.matchNet  = null;
  SESSION.matchHost = null;
}

// ================= PORT / UDP INFERENCE =================
function getPort(url){
  var m = url.match(/:(\d+)/);
  return m ? parseInt(m[1],10) : 0;
}

function isMatchPort(url){
  var p = getPort(url);
  return (p >= 7000 && p <= 9000);
}

function isUDPFirst(u,h){
  return isMatchPort(u) || /udp|realtime|tick|sync|frame|state/i.test(u+h);
}

// ================= PUBG DOMAIN ALLOWLIST =================
function isPUBG(host){
  return (
    shExpMatch(host, "*.pubgmobile.com") ||
    shExpMatch(host, "*.pubgmobile.net") ||
    shExpMatch(host, "*.igamecj.com") ||
    shExpMatch(host, "*.tencent.com") ||
    shExpMatch(host, "*.gcloudcs.com") ||
    shExpMatch(host, "*.qcloud.com") ||
    shExpMatch(host, "*.levelinfinite.com") ||
    shExpMatch(host, "*.krafton.com") ||
    shExpMatch(host, "*.amazonaws.com") ||
    shExpMatch(host, "*.cloudfront.net") ||
    shExpMatch(host, "*.akamaized.net") ||
    shExpMatch(host, "*.akamai.net")
  );
}

// ================= DETECTION =================
function isMatch(u,h){
  return (
    isMatchPort(u) ||
    isUDPFirst(u,h) ||
    /match|battle|game|combat|room|server|logic/i.test(u+h) ||
    /classic|ranked|arena|tdm|payload|metro|zombie|wow|training|custom|event/i.test(u+h)
  );
}

function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|prepare|entry/i.test(u+h);
}

function isSocial(u,h){
  return /friend|invite|squad|team|party|clan|presence|chat|voice/i.test(u+h);
}

function isCDN(u,h){
  return /cdn|asset|resource|patch|update|download|media|pak|obb/i.test(u+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return BLOCK;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // ===== JORDAN ISP ONLY =====
  if (!isJordanISP(ip)) return BLOCK;

  // ===== MATCH (PINNED / PORT / UDP-FIRST) =====
  if (isMatch(url, host)) {

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');
    
    if (!SESSION.matchNet) {
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (net24 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  // ===== LOBBY (AUTO RESET) =====
  if (isLobby(url, host)) {
    resetSession();
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return LOBBY_PROXY;
  }

  // ===== SOCIAL / CDN =====
  if (isSocial(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return LOBBY_PROXY;
  }

  return LOBBY_PROXY;
}
