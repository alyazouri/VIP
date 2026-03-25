// ================= DNS =================
// dns 1.1.1.1 1.0.0.1

// ================= SOCKS PROXIES =================
var MATCH_JO    = "SOCKS 46.185.131.218:20001";
var LOBBY_PROXY = "SOCKS 212.35.66.45:8085";
var BLOCK       = "SOCKS 127.0.0.1:9";
var DIRECT      = "DIRECT";

// ================= FAILOVER PROXIES =================
// بروكسيات احتياطية في حال فشل الأساسي
var MATCH_FAILOVER  = "SOCKS 46.185.131.218:20002; SOCKS 46.185.131.218:20003";
var LOBBY_FAILOVER  = "SOCKS 212.35.66.45:8086; SOCKS 212.35.66.45:8087";

// ================= SESSION =================
var SESSION = {
  matchNet:      null,
  matchHost:     null,
  matchProxy:    null,
  dnsCache:      {},
  dnsTTL:        {},
  blockedHosts:  {},
  probeCount:    {},
  lastReset:     0,
  inGame:        false
};

// ================= TTL / DNS CACHE =================
var DNS_TTL_MS = 60000; // 60 ثانية

function resolvePinned(host) {
  var now = Date.now();
  var ttl = SESSION.dnsTTL[host];

  // تجديد الكاش بعد انتهاء TTL
  if (!ttl || (now - ttl) > DNS_TTL_MS) {
    var ip = dnsResolve(host);
    if (ip) {
      SESSION.dnsCache[host] = ip;
      SESSION.dnsTTL[host]   = now;
    }
  }
  return SESSION.dnsCache[host] || null;
}

// ================= JORDAN MATCH IPV4 =================
var JORDAN_MATCH_IPV4 = [
  ["46.185.128.0","255.255.128.0"],
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"],
  ["86.108.0.0","255.252.0.0"],
  ["90.84.0.0","255.252.0.0"],
  ["37.123.128.0","255.255.128.0"],
  ["87.236.232.0","255.255.248.0"]
];

// ================= JORDAN WIDE IPV4 =================
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
  ["86.108.0.0","255.252.0.0"],
  ["90.84.0.0","255.252.0.0"],
  ["217.144.0.0","255.255.0.0"],
  ["37.123.128.0","255.255.128.0"],
  ["87.236.232.0","255.255.248.0"],
  ["176.241.0.0","255.255.0.0"],
  ["37.18.0.0","255.255.0.0"],
  ["196.201.0.0","255.255.0.0"],
  ["62.72.128.0","255.255.128.0"],
  ["81.21.64.0","255.255.240.0"]
];

// ================= JORDAN ISP ALLOWLIST =================
function isJordanISP(ip) {
  return (
    isInNet(ip, "37.123.128.0",  "255.255.128.0") ||
    isInNet(ip, "87.236.232.0",  "255.255.248.0") ||
    isInNet(ip, "94.249.0.0",    "255.255.128.0") ||
    isInNet(ip, "176.241.0.0",   "255.255.0.0")   ||
    isInNet(ip, "176.29.0.0",    "255.255.0.0")   ||
    isInNet(ip, "46.185.128.0",  "255.255.128.0") ||
    isInNet(ip, "37.18.0.0",     "255.255.0.0")   ||
    isInNet(ip, "196.201.0.0",   "255.255.0.0")   ||
    isInNet(ip, "62.72.128.0",   "255.255.128.0") ||
    isInNet(ip, "213.186.32.0",  "255.255.224.0") ||
    isInNet(ip, "81.21.64.0",    "255.255.240.0") ||
    isInNet(ip, "86.108.0.0",    "255.252.0.0")   ||
    isInNet(ip, "90.84.0.0",     "255.252.0.0")   ||
    isInNet(ip, "217.144.0.0",   "255.255.0.0")
  );
}

// ================= HELPERS =================
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function getPort(url) {
  var m = url.match(/:(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

// ================= SUBNET UTILITIES =================
// يستخرج الـ /24 و /16 للمقارنة
function getNet24(ip) { return ip.split('.').slice(0, 3).join('.'); }
function getNet16(ip) { return ip.split('.').slice(0, 2).join('.'); }

// ================= AUTO GAME-STATE DETECTION =================
// يكتشف ما إذا كنت داخل مباراة فعلية بناءً على المنفذ والنمط
function detectGameState(url, host) {
  var p = getPort(url);

  // منافذ الجيم بلاي المعروفة لـ PUBG Mobile
  var isGamePort = (p >= 6000 && p <= 9000)   ||
                   (p >= 10000 && p <= 10100)  ||
                   (p === 443 && /game|match|battle|logic|tick/i.test(url + host));

  if (isGamePort) SESSION.inGame = true;

  // إعادة تعيين حالة اللعبة عند الدخول للـ Lobby
  if (/lobby|matchmaking|prepare|queue/i.test(url + host)) SESSION.inGame = false;

  return SESSION.inGame;
}

// ================= PORT / UDP INFERENCE =================
function isMatchPort(url) {
  var p = getPort(url);
  return (p >= 6000 && p <= 10000);
}

function isUDPFirst(u, h) {
  return isMatchPort(u) || /udp|realtime|tick|sync|frame|state/i.test(u + h);
}

// ================= PUBG DOMAIN ALLOWLIST (موسّع) =================
function isPUBG(host) {
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
    shExpMatch(host, "*.tencentcloud.com")  ||
    shExpMatch(host, "*.myqcloud.com")      ||
    // إضافات جديدة
    shExpMatch(host, "*.gamesafe.qq.com")   ||   // AntiCheat
    shExpMatch(host, "*.msdl.microsoft.com")||   // Xbox Auth
    shExpMatch(host, "*.xboxlive.com")      ||   // Xbox Live
    shExpMatch(host, "*.playfab.com")            // PlayFab (Events / Analytics)
  );
}

// ================= TRAFFIC CLASSIFICATION (موسّع) =================
function isMatch(u, h) {
  return (
    isMatchPort(u) ||
    isUDPFirst(u, h) ||
    /match|battle|game|combat|room|server|logic/i.test(u + h) ||
    /classic|ranked|arena|tdm|payload|metro|zombie|wow|training|custom|event/i.test(u + h) ||
    /tick|frame|sync|realtime|relay|rpc|ping|probe/i.test(u + h)    // إضافة: مزيد من الأنماط
  );
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|prepare|entry|roster|rank/i.test(u + h);
}

function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|chat|voice|guild|group/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|download|media|pak|obb|manifest|bundle|texture/i.test(u + h);
}

// إضافة جديدة: تصنيف Auth / Backend
function isAuth(u, h) {
  return /auth|login|token|account|session|oauth|verify|captcha|report/i.test(u + h);
}

// ================= ANTI-JITTER: SESSION LOCK =================
// يقفل البروكسي على الـ IP الأول الناجح طوال المباراة ويمنع القفز بين السيرفرات
function lockSession(ip, proxy) {
  if (!SESSION.matchNet) {
    SESSION.matchNet   = getNet24(ip);
    SESSION.matchProxy = proxy;
  }
}

function isSessionLocked(ip) {
  return SESSION.matchNet && getNet24(ip) === SESSION.matchNet;
}

function resetSession() {
  SESSION.matchNet   = null;
  SESSION.matchHost  = null;
  SESSION.matchProxy = null;
  SESSION.lastReset  = Date.now();
  SESSION.inGame     = false;
}

// ================= PROBE LIMITER =================
// يحدّ من إعادة المحاولة على الهوست المحظوط لتقليل الـ Overhead
function isBlockedHost(host) {
  var count = SESSION.probeCount[host] || 0;
  if (count > 5) return true;  // حظر بعد 5 محاولات فاشلة
  return false;
}

function markProbe(host) {
  SESSION.probeCount[host] = (SESSION.probeCount[host] || 0) + 1;
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // ===== PUBG DOMAIN CHECK =====
  if (!isPUBG(host)) return BLOCK;

  // ===== PROBE LIMITER =====
  if (isBlockedHost(host)) return BLOCK;

  // ===== DNS RESOLVE WITH TTL =====
  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":") > -1) {
    markProbe(host);
    return BLOCK;
  }

  // ===== JORDAN ISP ONLY =====
  if (!isJordanISP(ip)) {
    markProbe(host);
    return BLOCK;
  }

  // ===== AUTH / BACKEND (مرن أكثر) =====
  if (isAuth(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== MATCH (PINNED / PORT / UDP-FIRST) =====
  if (isMatch(url, host)) {
    detectGameState(url, host);

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    // تثبيت الجلسة
    lockSession(ip, MATCH_JO);

    // السماح بنفس الـ /24 فقط بعد القفل
    if (!isSessionLocked(ip)) return BLOCK;

    // Failover تلقائي لو المنفذ الأساسي عالق
    return MATCH_JO + "; " + MATCH_FAILOVER;
  }

  // ===== LOBBY (AUTO RESET SESSION) =====
  if (isLobby(url, host)) {
    resetSession();
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== SOCIAL / CDN =====
  if (isSocial(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== FALLBACK =====
  if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
  return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
}
