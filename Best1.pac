// ================= DNS =================
// dns 1.1.1.1 1.0.0.1

// ================= SOCKS PROXIES =================
var MATCH_JO    = "SOCKS 46.185.131.218:20001";  // MATCH (Gameplay) - Jordan UMNIAH
var LOBBY_PROXY = "SOCKS 212.35.66.45:8085";     // LOBBY / SOCIAL / CDN
var BLOCK       = "SOCKS 127.0.0.1:9";
var DIRECT      = "DIRECT";

// ================= JORDAN MATCH IPV4 (موسّع) =================
var JORDAN_MATCH_IPV4 = [
  ["46.185.128.0","255.255.128.0"],   // UMNIAH (MATCH proxy subnet)
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"],
  ["86.108.0.0","255.252.0.0"],       // Orange FTTH
  ["90.84.0.0","255.252.0.0"],        // Orange CORE
  ["37.123.128.0","255.255.128.0"],   // ZAIN
  ["87.236.232.0","255.255.248.0"]    // ZAIN
];

// ================= JORDAN WIDE IPV4 (موسّع) =================
var JORDAN_WIDE_IPV4 = [
  ["82.212.0.0","255.255.0.0"],
  ["94.249.0.0","255.255.0.0"],
  ["176.28.0.0","255.252.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["109.107.0.0","255.255.0.0"],
  ["31.153.0.0","255.255.0.0"],
  ["188.123.160.0","255.255.224.0"],
  ["212.35.0.0","255.255.0.0"],
  ["213.6.0.0","255.255.0.0"],
  ["46.185.0.0","255.255.0.0"],
  ["185.107.0.0","255.255.0.0"],
  ["195.229.0.0","255.254.0.0"],
  ["86.108.0.0","255.252.0.0"],       // Orange FTTH
  ["90.84.0.0","255.252.0.0"],        // Orange CORE
  ["217.144.0.0","255.255.0.0"],      // Orange
  ["37.123.128.0","255.255.128.0"],   // ZAIN
  ["87.236.232.0","255.255.248.0"],   // ZAIN
  ["176.241.0.0","255.255.0.0"],      // ZAIN
  ["37.18.0.0","255.255.0.0"],        // UMNIAH
  ["196.201.0.0","255.255.0.0"],      // Orange
  ["62.72.128.0","255.255.128.0"],    // Orange
  ["81.21.64.0","255.255.240.0"]      // Orange
];

// ================= JORDAN ISP ALLOWLIST =================
function isJordanISP(ip){
  return (
    /* ZAIN */
    isInNet(ip, "37.123.128.0",  "255.255.128.0") ||
    isInNet(ip, "87.236.232.0",  "255.255.248.0") ||
    isInNet(ip, "94.249.0.0",    "255.255.128.0") ||
    isInNet(ip, "176.241.0.0",   "255.255.0.0")   ||

    /* UMNIAH */
    isInNet(ip, "176.29.0.0",    "255.255.0.0")   ||
    isInNet(ip, "46.185.128.0",  "255.255.128.0") ||
    isInNet(ip, "37.18.0.0",     "255.255.0.0")   ||

    /* ORANGE */
    isInNet(ip, "196.201.0.0",   "255.255.0.0")   ||
    isInNet(ip, "62.72.128.0",   "255.255.128.0") ||
    isInNet(ip, "213.186.32.0",  "255.255.224.0") ||
    isInNet(ip, "81.21.64.0",    "255.255.240.0") ||

    /* ORANGE CORE / FTTH */
    isInNet(ip, "86.108.0.0",    "255.252.0.0")   ||
    isInNet(ip, "90.84.0.0",     "255.252.0.0")   ||
    isInNet(ip, "217.144.0.0",   "255.255.0.0")
  );
}

// ================= SESSION =================
var SESSION = {
  matchNet:  null,
  matchHost: null,
  dnsCache:  {}
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list){
  for (var i = 0; i < list.length; i++)
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
  return m ? parseInt(m[1], 10) : 0;
}

function isMatchPort(url){
  var p = getPort(url);
  // نطاق منافذ أوسع لالتقاط حركة الجيم بلاي بشكل أفضل
  return (p >= 6000 && p <= 10000);
}

function isUDPFirst(u, h){
  return isMatchPort(u) || /udp|realtime|tick|sync|frame|state/i.test(u + h);
}

// ================= PUBG DOMAIN ALLOWLIST =================
function isPUBG(host){
  return (
    shExpMatch(host, "*.pubgmobile.com")    ||
    shExpMatch(host, "*.pubgmobile.net")    ||
    shExpMatch(host, "*.igamecj.com")       ||
    shExpMatch(host, "*.tencent.com")       ||
    shExpMatch(host, "*.gcloudcs.com")      ||
    shExpMatch(host, "*.qcloud.com")        ||
    shExpMatch(host, "*.levelinfinite.com") ||
    shExpMatch(host, "*.krafton.com")       ||
    shExpMatch(host, "*.amazonaws.com")     ||
    shExpMatch(host, "*.cloudfront.net")    ||
    shExpMatch(host, "*.akamaized.net")     ||
    shExpMatch(host, "*.akamai.net")        ||
    shExpMatch(host, "*.tencentcloud.com")  ||   // إضافة: Tencent Cloud
    shExpMatch(host, "*.myqcloud.com")           // إضافة: Tencent CDN
  );
}

// ================= DETECTION =================
function isMatch(u, h){
  return (
    isMatchPort(u) ||
    isUDPFirst(u, h) ||
    /match|battle|game|combat|room|server|logic/i.test(u + h) ||
    /classic|ranked|arena|tdm|payload|metro|zombie|wow|training|custom|event/i.test(u + h)
  );
}

function isLobby(u, h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|prepare|entry/i.test(u + h);
}

function isSocial(u, h){
  return /friend|invite|squad|team|party|clan|presence|chat|voice/i.test(u + h);
}

function isCDN(u, h){
  return /cdn|asset|resource|patch|update|download|media|pak|obb/i.test(u + h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return BLOCK;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // ===== JORDAN ISP ONLY =====
  if (!isJordanISP(ip)) return BLOCK;

  // ===== MATCH (PINNED / PORT / UDP-FIRST) =====
  if (isMatch(url, host)) {

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    // تخفيض البينغ: تثبيت الجلسة على /24 بدلاً من /16
    var net24 = ip.split('.').slice(0, 3).join('.');

    if (!SESSION.matchNet) {
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    // السماح بتغيير الهوست داخل نفس الـ /24 لتفادي قطع الاتصال
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
