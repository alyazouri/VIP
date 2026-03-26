// ================= DNS =================
// dns 1.1.1.1 1.0.0.1

// ================= SOCKS PROXIES =================
var MATCH_JO    = "SOCKS 46.185.131.218:20001";
var LOBBY_PROXY = "SOCKS 212.35.66.45:8085";
var SOCIAL_PROXY = "SOCKS 212.35.66.45:8085";  // مخصص للتجنيد
var BLOCK       = "SOCKS 127.0.0.1:9";
var DIRECT      = "DIRECT";

// ================= FAILOVER PROXIES =================
// بروكسيات احتياطية في حال فشل الأساسي
var MATCH_FAILOVER  = "SOCKS 46.185.131.218:20002; SOCKS 46.185.131.218:20003";
var LOBBY_FAILOVER  = "SOCKS 212.35.66.45:8086; SOCKS 212.35.66.45:8087";
var SOCIAL_FAILOVER = "SOCKS 212.35.66.45:8086; SOCKS 212.35.66.45:8087";

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
  inGame:        false,
  socialLock:    null,     // قفل جلسة التجنيد
  lastSocialPing: 0        // آخر نشاط للتجنيد
};

// ================= TTL / DNS CACHE (محسّن) =================
var DNS_TTL_MS = 90000; // 90 ثانية - أطول للاستقرار
var DNS_FAST_TTL = 30000; // 30 ثانية للـ Match IPs

function resolvePinned(host, fastMode) {
  var now = Date.now();
  var ttl = SESSION.dnsTTL[host];
  var ttlTime = fastMode ? DNS_FAST_TTL : DNS_TTL_MS;

  // تجديد الكاش بعد انتهاء TTL
  if (!ttl || (now - ttl) > ttlTime) {
    var ip = dnsResolve(host);
    if (ip) {
      SESSION.dnsCache[host] = ip;
      SESSION.dnsTTL[host]   = now;
    }
  }
  return SESSION.dnsCache[host] || null;
}

// ================= JORDAN MATCH IPV4 (موسّع) =================
var JORDAN_MATCH_IPV4 = [
  // النطاقات الأساسية
  ["46.185.128.0","255.255.128.0"],
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"],
  ["86.108.0.0","255.252.0.0"],
  ["90.84.0.0","255.252.0.0"],
  ["37.123.128.0","255.255.128.0"],
  ["87.236.232.0","255.255.248.0"],
  // إضافات جديدة لسيرفرات المباريات
  ["185.107.0.0","255.255.0.0"],
  ["212.35.0.0","255.255.0.0"],
  ["188.123.160.0","255.255.224.0"],
  ["109.107.0.0","255.255.0.0"],
  ["31.153.0.0","255.255.0.0"],
  ["217.144.0.0","255.255.0.0"],
  ["176.241.0.0","255.255.0.0"],
  ["37.18.0.0","255.255.0.0"],
  ["196.201.0.0","255.255.0.0"],
  ["62.72.128.0","255.255.128.0"],
  ["81.21.64.0","255.255.240.0"],
  ["213.186.32.0","255.255.224.0"]
];

// ================= JORDAN WIDE IPV4 (موسّع جداً) =================
var JORDAN_WIDE_IPV4 = [
  // النطاقات الأساسية
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
  ["81.21.64.0","255.255.240.0"],
  // إضافات جديدة - نطاقات أردنية إضافية
  ["213.186.32.0","255.255.224.0"],
  ["77.247.0.0","255.255.0.0"],
  ["80.90.0.0","255.255.0.0"],
  ["94.142.32.0","255.255.224.0"],
  ["95.141.0.0","255.255.0.0"],
  ["178.20.0.0","255.255.0.0"],
  ["178.32.0.0","255.255.0.0"],
  ["185.55.0.0","255.255.0.0"],
  ["185.84.0.0","255.255.0.0"],
  ["185.113.0.0","255.255.0.0"],
  ["192.145.0.0","255.255.0.0"],
  ["194.165.128.0","255.255.128.0"],
  ["195.218.0.0","255.255.0.0"]
];

// ================= JORDAN ISP ALLOWLIST (موسّع) =================
function isJordanISP(ip) {
  return (
    // النطاقات الأساسية
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
    isInNet(ip, "217.144.0.0",   "255.255.0.0")   ||
    // إضافات جديدة
    isInNet(ip, "82.212.0.0",    "255.255.0.0")   ||
    isInNet(ip, "212.35.0.0",    "255.255.0.0")   ||
    isInNet(ip, "185.107.0.0",   "255.255.0.0")   ||
    isInNet(ip, "109.107.0.0",   "255.255.0.0")   ||
    isInNet(ip, "31.153.0.0",    "255.255.0.0")   ||
    isInNet(ip, "188.123.160.0", "255.255.224.0") ||
    isInNet(ip, "77.247.0.0",    "255.255.0.0")   ||
    isInNet(ip, "80.90.0.0",     "255.255.0.0")   ||
    isInNet(ip, "95.141.0.0",    "255.255.0.0")   ||
    isInNet(ip, "185.55.0.0",    "255.255.0.0")   ||
    isInNet(ip, "185.84.0.0",    "255.255.0.0")   ||
    isInNet(ip, "194.165.128.0", "255.255.128.0")
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
function getNet24(ip) { return ip.split('.').slice(0, 3).join('.'); }
function getNet16(ip) { return ip.split('.').slice(0, 2).join('.'); }

// ================= AUTO GAME-STATE DETECTION =================
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
    // نطاقات PUBG الأساسية
    shExpMatch(host, "*.pubgmobile.com")    ||
    shExpMatch(host, "*.pubgmobile.net")    ||
    shExpMatch(host, "*.igamecj.com")       ||
    shExpMatch(host, "*.tencent.com")       ||
    shExpMatch(host, "*.gcloudcs.com")      ||
    shExpMatch(host, "*.qcloud.com")        ||
    shExpMatch(host, "*.levelinfinite.com") ||
    shExpMatch(host, "*.krafton.com")       ||
    // CDNs
    shExpMatch(host, "*.amazonaws.com")     ||
    shExpMatch(host, "*.cloudfront.net")    ||
    shExpMatch(host, "*.akamaized.net")     ||
    shExpMatch(host, "*.akamai.net")        ||
    shExpMatch(host, "*.tencentcloud.com")  ||
    shExpMatch(host, "*.myqcloud.com")      ||
    // AntiCheat & Auth
    shExpMatch(host, "*.gamesafe.qq.com")   ||
    shExpMatch(host, "*.msdl.microsoft.com")||
    shExpMatch(host, "*.xboxlive.com")      ||
    shExpMatch(host, "*.playfab.com")       ||
    // إضافات جديدة للتجنيد والصديق
    shExpMatch(host, "*.friend.qq.com")     ||
    shExpMatch(host, "*.splits.qq.com")     ||
    shExpMatch(host, "*.idip.qq.com")       ||
    shExpMatch(host, "*.openmobile.qq.com") ||
    shExpMatch(host, "*.graph.qq.com")      ||
    shExpMatch(host, "*.wtlogin.qq.com")    ||
    shExpMatch(host, "*.ssl.qq.com")        ||
    shExpMatch(host, "*.gtimg.cn")          ||
    shExpMatch(host, "*.qpic.cn")           ||
    shExpMatch(host, "*.wechat.com")        ||
    shExpMatch(host, "*.weixin.com")        ||
    // إضافات أخرى
    shExpMatch(host, "*.tim.qq.com")        ||
    shExpMatch(host, "*.qplus.com")         ||
    shExpMatch(host, "*.qq.com")            ||
    shExpMatch(host, "*.tencent-cloud.com") ||
    shExpMatch(host, "*.tencent-cloud.net") ||
    shExpMatch(host, "*.dnspod.net")        ||
    shExpMatch(host, "*.dns.qq.com")
  );
}

// ================= TRAFFIC CLASSIFICATION (محسّن للتجنيد) =================
function isMatch(u, h) {
  return (
    isMatchPort(u) ||
    isUDPFirst(u, h) ||
    /match|battle|game|combat|room|server|logic/i.test(u + h) ||
    /classic|ranked|arena|tdm|payload|metro|zombie|wow|training|custom|event/i.test(u + h) ||
    /tick|frame|sync|realtime|relay|rpc|ping|probe/i.test(u + h)
  );
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|prepare|entry|roster|rank/i.test(u + h);
}

// ================= SOCIAL / RECRUITMENT (محسّن جداً) =================
function isSocial(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    // كلمات التجنيد والصديق
    /friend|invite|squad|team|party|clan|presence|chat|voice|guild|group/i.test(combined) ||
    // إضافات جديدة للتجنيد
    /recruit|recruitment|apply|join|member|crew|alliance/i.test(combined) ||
    /social|buddy|companion|ally|partner|cooperate/i.test(combined) ||
    /wtlogin|login.*friend|friend.*list|squad.*list|team.*list/i.test(combined) ||
    /nearby|recommend|search.*player|find.*player|player.*info/i.test(combined) ||
    /relation|relationlist|addfriend|accept.*invite|reject.*invite/i.test(combined) ||
    // أنماط Tencent للتجنيد
    /openmobile|graph.*qq|ssl.*qq|friend.*qq/i.test(combined) ||
    /splits|idip|wtlogin/i.test(combined) ||
    // Voice chat و التواصل
    /voice|mic|speaker|audio.*chat|realtime.*voice/i.test(combined) ||
    // أنماط إضافية
    /session.*friend|sync.*friend|push.*friend|notify.*friend/i.test(combined)
  );
}

// دالة مخصصة لتجنيد الأصدقاء (أولوية عالية)
function isRecruitment(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    /recruit|join.*squad|squad.*join|find.*team|team.*find/i.test(combined) ||
    /apply.*crew|crew.*apply|guild.*join|clan.*join/i.test(combined) ||
    /recommend.*player|player.*recommend|nearby.*player/i.test(combined) ||
    /friend.*request|request.*friend|invite.*accept/i.test(combined)
  );
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|download|media|pak|obb|manifest|bundle|texture/i.test(u + h);
}

function isAuth(u, h) {
  return /auth|login|token|account|session|oauth|verify|captcha|report/i.test(u + h);
}

// ================= ANTI-JITTER: SESSION LOCK (محسّن) =================
function lockSession(ip, proxy) {
  if (!SESSION.matchNet) {
    SESSION.matchNet   = getNet24(ip);
    SESSION.matchProxy = proxy;
  }
}

function isSessionLocked(ip) {
  return SESSION.matchNet && getNet24(ip) === SESSION.matchNet;
}

// قفل جلسة التجنيد لمنع التذبذب
function lockSocialSession(ip) {
  if (!SESSION.socialLock) {
    SESSION.socialLock = getNet24(ip);
  }
  SESSION.lastSocialPing = Date.now();
}

function isSocialSessionLocked(ip) {
  // تحرير القفل بعد 30 ثانية من عدم النشاط
  if (SESSION.socialLock && (Date.now() - SESSION.lastSocialPing > 30000)) {
    SESSION.socialLock = null;
    return false;
  }
  return SESSION.socialLock && getNet24(ip) === SESSION.socialLock;
}

function resetSession() {
  SESSION.matchNet   = null;
  SESSION.matchHost  = null;
  SESSION.matchProxy = null;
  SESSION.lastReset  = Date.now();
  SESSION.inGame     = false;
  // لا نعيد تعيين socialLock للحفاظ على اتصال التجنيد
}

// ================= PROBE LIMITER (محسّن) =================
function isBlockedHost(host) {
  var count = SESSION.probeCount[host] || 0;
  if (count > 5) return true;
  return false;
}

function markProbe(host) {
  SESSION.probeCount[host] = (SESSION.probeCount[host] || 0) + 1;
}

// تنظيف Probe Count كل 5 دقائق
function cleanupProbes() {
  var now = Date.now();
  if (now - SESSION.lastReset > 300000) {
    SESSION.probeCount = {};
  }
}

// ================= FAST PATH FOR SOCIAL (جديد) =================
// مسار سريع مخصص لحركة التجنيد
function getSocialFastPath(ip) {
  lockSocialSession(ip);
  
  // إذا كانت الجلسة مقفولة، استخدم نفس البروكسي
  if (isSocialSessionLocked(ip)) {
    return SOCIAL_PROXY + "; " + SOCIAL_FAILOVER;
  }
  
  return SOCIAL_PROXY + "; " + SOCIAL_FAILOVER;
}

// ================= MAIN (محسّن) =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // تنظيف دوري للـ probes
  cleanupProbes();

  // ===== PUBG DOMAIN CHECK =====
  if (!isPUBG(host)) return BLOCK;

  // ===== PROBE LIMITER =====
  if (isBlockedHost(host)) return BLOCK;

  // ===== DNS RESOLVE WITH TTL =====
  // استخدام fast mode للمباريات
  var fastMode = isMatch(url, host) || isRecruitment(url, host);
  var ip = resolvePinned(host, fastMode);
  if (!ip || ip.indexOf(":") > -1) {
    markProbe(host);
    return BLOCK;
  }

  // ===== JORDAN ISP ONLY =====
  if (!isJordanISP(ip)) {
    markProbe(host);
    return BLOCK;
  }

  // ===== RECRUITMENT (أولوية قصوى - قبل كل شيء) =====
  if (isRecruitment(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return getSocialFastPath(ip);
  }

  // ===== SOCIAL / FRIENDS (أولوية عالية) =====
  if (isSocial(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return getSocialFastPath(ip);
  }

  // ===== AUTH / BACKEND =====
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

  // ===== CDN =====
  if (isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== FALLBACK =====
  if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
  return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
}
