// =====================================================
// PUBG PAC PROXY SCRIPT
// كل نطاق يعمل بشكل مستقل
// جميع النطاقات يمكن أن تعمل بنفس الوقت
// =====================================================


// ================= PROXIES =================

var MATCH_JO = "PROXY 37.44.38.20:443";

var LOBBY_POOL = [
  "PROXY 86.108.11.20:443"

  // أضف بروكسيات أخرى عند الحاجة:
  // ,"PROXY 86.108.11.21:443"
  // ,"PROXY 86.108.11.22:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";


// ================= JORDAN MATCH =================

var JORDAN_MATCH_IPV4 = [

  ["79.173.192.0",  "255.255.192.0"],
  ["46.185.128.0",  "255.255.128.0"],
  ["86.108.0.0",    "255.255.128.0"],
  ["92.253.0.0",    "255.255.128.0"],
  ["94.249.0.0",    "255.255.128.0"],
  ["37.202.64.0",   "255.255.192.0"],
  ["149.200.128.0", "255.255.128.0"],
  ["37.44.32.0",    "255.255.248.0"],
  ["5.198.240.0",   "255.255.248.0"],
  ["5.45.128.0",    "255.255.240.0"],
  ["37.152.0.0",    "255.255.248.0"]

];


// ================= JORDAN WIDE / LOBBY =================

var JORDAN_WIDE_IPV4 = [

  ["79.173.192.0",  "255.255.192.0"],
  ["46.185.128.0",  "255.255.128.0"],
  ["86.108.0.0",    "255.255.128.0"],
  ["92.253.0.0",    "255.255.128.0"],
  ["94.249.0.0",    "255.255.128.0"],
  ["37.202.64.0",   "255.255.192.0"],
  ["149.200.128.0", "255.255.128.0"],
  ["37.44.32.0",    "255.255.248.0"],
  ["5.198.240.0",   "255.255.248.0"],
  ["5.45.128.0",    "255.255.240.0"],
  ["37.152.0.0",    "255.255.248.0"],

  ["176.29.0.0",    "255.255.0.0"],
  ["176.28.128.0",  "255.255.128.0"],
  ["188.247.64.0",  "255.255.252.0"],
  ["46.32.96.0",    "255.255.224.0"],
  ["77.245.0.0",    "255.255.240.0"],
  ["80.90.160.0",   "255.255.240.0"],
  ["87.238.128.0",  "255.255.248.0"],
  ["94.142.32.0",   "255.255.224.0"]

];


// ================= BLACKLIST: EUROPE + RUSSIA + ASIA =================

var GEO_BLACKLIST = [

  // Europe - wide
  ["5.0.0.0",   "255.0.0.0"],
  ["50.0.0.0",  "255.0.0.0"],
  ["51.0.0.0",  "255.0.0.0"],

  // Russia
  ["5.136.0.0",  "255.248.0.0"],
  ["31.128.0.0", "255.192.0.0"],
  ["46.16.0.0",  "255.240.0.0"],
  ["95.24.0.0",  "255.248.0.0"],
  ["178.64.0.0", "255.192.0.0"],

  // Asia - wide
  ["1.0.0.0",  "255.0.0.0"],
  ["14.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"],
  ["36.0.0.0", "255.0.0.0"],
  ["39.0.0.0", "255.0.0.0"],
  ["42.0.0.0", "255.0.0.0"],
  ["49.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "255.0.0.0"],
  ["59.0.0.0", "255.0.0.0"],
  ["60.0.0.0", "255.0.0.0"]

];


// ================= SESSION / DNS CACHE =================

// لا يوجد matchNet أو matchHost
// حتى يعمل كل نطاق بشكل مستقل
var SESSION = {
  dnsCache: {}
};


// ================= HELPERS =================

function norm(h) {
  var i = h.indexOf(":");

  if (i > -1) {
    return h.substring(0, i);
  }

  return h;
}


function isInList(ip, list) {
  var i;

  for (i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) {
      return true;
    }
  }

  return false;
}


function resolvePinned(host) {
  var ip;

  if (SESSION.dnsCache[host]) {
    return SESSION.dnsCache[host];
  }

  ip = dnsResolve(host);

  if (ip) {
    SESSION.dnsCache[host] = ip;
  }

  return ip;
}


function pickLobbyProxy(host) {
  var hash = 0;
  var i;

  if (LOBBY_POOL.length === 0) {
    return DIRECT;
  }

  for (i = 0; i < host.length; i++) {
    hash = (hash + host.charCodeAt(i)) % LOBBY_POOL.length;
  }

  return LOBBY_POOL[hash];
}


// ================= PUBG DETECTION =================

function isPUBG(host) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(host);
}


// ================= TRAFFIC DETECTION =================

function isMatch(url, host) {
  return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(
    url + host
  );
}


function isLobby(url, host) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit/i.test(
    url + host
  );
}


function isSocial(url, host) {
  return /friend|invite|squad|team|party|clan|presence|social/i.test(
    url + host
  );
}


function isCDN(url, host) {
  return /cdn|asset|resource|patch|update|media|content/i.test(
    url + host
  );
}


// ================= MAIN =================

function FindProxyForURL(url, host) {

  var ip;

  host = norm(host.toLowerCase());


  // المواقع غير التابعة لـ PUBG تعمل مباشرة
  if (!isPUBG(host)) {
    return DIRECT;
  }


  // حل DNS
  ip = resolvePinned(host);


  // فشل DNS أو IPv6
  if (!ip || ip.indexOf(":") > -1) {
    return BLOCK;
  }


  // =================================================
  // MATCH
  // أولوية نطاقات الأردن قبل GEO_BLACKLIST
  // =================================================

  if (isMatch(url, host)) {

    if (isInList(ip, JORDAN_MATCH_IPV4)) {
      return MATCH_JO;
    }

    return BLOCK;
  }


  // =================================================
  // LOBBY / SOCIAL / CDN
  // أولوية نطاقات الأردن قبل GEO_BLACKLIST
  // =================================================

  if (
    isLobby(url, host) ||
    isSocial(url, host) ||
    isCDN(url, host)
  ) {

    if (isInList(ip, JORDAN_WIDE_IPV4)) {
      return pickLobbyProxy(host);
    }

    return BLOCK;
  }


  // =================================================
  // باقي اتصالات PUBG
  // =================================================

  if (isInList(ip, JORDAN_WIDE_IPV4)) {
    return pickLobbyProxy(host);
  }


  // =================================================
  // GEO BLACKLIST
  // يتم تطبيقها فقط على النطاقات غير الأردنية
  // =================================================

  if (isInList(ip, GEO_BLACKLIST)) {
    return BLOCK;
  }


  // أي اتصال PUBG غير موجود في قوائم الأردن
  return BLOCK;
}
