// =======================================================
// PROXIES
// =======================================================
// MATCH_JO   : بروكسي الماتش (أقل بنق + ثابت)
// LOBBY_POOL : بروكسيات اللوبي (توزيع ثابت)
// BLOCK      : إسقاط أي اتصال غير مرغوب
// DIRECT     : مرور مباشر (منصات مستثناة)

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
// نطاقات أردنية ثابتة للماتش فقط
// الهدف: Ping ثابت + منع أي Server Hop أثناء اللعب

var JORDAN_MATCH_IPV4 = [
  ["46.185.128.0","255.255.128.0"], // Orange Jordan
  ["212.35.0.0","255.255.0.0"],     // Orange Jordan
  ["86.108.0.0","255.254.0.0"],     // Zain Jordan
  ["176.29.0.0","255.255.0.0"]      // Umniah Jordan
];


// =======================================================
// JORDAN REAL PLAYERS (99%)
// =======================================================
// تمثل 99% من اللاعبين الأردنيين الحقيقيين داخل الأردن
// شبكات منزلية + موبايل (ليست VPS ولا CDN)

var JORDAN_REAL_PLAYERS_IPV4 = [
  ["46.185.128.0","255.255.128.0"], // Orange
  ["212.35.0.0","255.255.0.0"],     // Orange
  ["86.108.0.0","255.254.0.0"],     // Zain
  ["176.29.0.0","255.255.0.0"]      // Umniah
];


// =======================================================
// GEO BLACKLIST
// =======================================================
// منع أوروبا / روسيا / آسيا
// الهدف: منع Region Drift و Matchmaking الخاطئ

var GEO_BLACKLIST = [
  ["5.0.0.0","255.0.0.0"],
  ["37.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],
  ["5.136.0.0","255.248.0.0"],
  ["31.128.0.0","255.192.0.0"],
  ["46.16.0.0","255.240.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["178.64.0.0","255.192.0.0"],
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","255.0.0.0"],
  ["39.0.0.0","255.0.0.0"],
  ["42.0.0.0","255.0.0.0"],
  ["49.0.0.0","255.0.0.0"],
  ["58.0.0.0","255.0.0.0"],
  ["59.0.0.0","255.0.0.0"],
  ["60.0.0.0","255.0.0.0"]
];


// =======================================================
// SESSION STATE
// =======================================================
// matchNet  : تثبيت /24 أثناء الماتش
// matchHost : تثبيت السيرفر
// dnsCache  : منع تغيّر IP أثناء الجلسة

var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};


// =======================================================
// HELPERS
// =======================================================
function norm(h){
  var i=h.indexOf(":");
  return i>-1 ? h.substring(0,i) : h;
}

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

// DNS pinning خاص بـ PUBG
function resolvePinned(host){
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip && isPUBG(host)) SESSION.dnsCache[host] = ip;
  return ip;
}

// توزيع ثابت للّوبي
function pickLobbyProxy(host){
  var h=0;
  for (var i=0;i<host.length;i++)
    h=(h+host.charCodeAt(i))%LOBBY_POOL.length;
  return LOBBY_POOL[h];
}


// =======================================================
// GLOBAL WHITELIST (DIRECT)
// =======================================================
// منصات مستثناة بالكامل

function isWhitelistedPlatform(h){
  return /(youtube\.com|youtu\.be|googlevideo\.com|
           github\.com|githubusercontent\.com|
           tiktok\.com|tiktokcdn\.com|tiktokv\.com)/i.test(h);
}


// =======================================================
// DETECTION (FLEXIBLE)
// =======================================================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

// Match = صارم
function isMatch(u,h){
  return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(u+h);
}

// Lobby = مرن
function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|
          join|recruit|enter|prepare|pre|connect|handshake/i.test(u+h);
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
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // DIRECT PLATFORMS
  if (isWhitelistedPlatform(host)) return DIRECT;
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // HARD GEO BLOCK
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // ================= MATCH (STRICT PINNING) =================
  if (isMatch(url, host)) {

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');

    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (net24 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  // RESET AFTER MATCH
  if (SESSION.matchNet) {
    SESSION.matchNet = null;
    SESSION.matchHost = null;
  }

  // ================= LOBBY / SOCIAL / CDN (FLEXIBLE) =================
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    return pickLobbyProxy(host);
  }

  // ================= PUBG UNKNOWN TRAFFIC =================
  // أي اتصال PUBG غير مصنّف نعامله كلوبّي
  return pickLobbyProxy(host);
}
