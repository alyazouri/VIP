// ================= DNS =================
// dns 1.1.1.1 1.0.0.1
// dns 8.8.8.8 8.8.4.4

// ================= SOCKS PROXIES =================
var JORDAN_PROXY  = "SOCKS 46.185.131.218:20001";
var MATCH_JO      = "SOCKS 46.185.131.218:20001";
var LOBBY_PROXY   = "SOCKS 212.35.66.45:8085";
var REGION_PROXY  = "SOCKS 212.35.66.45:8085";   // مخصص للـ Region
var SOCIAL_PROXY  = "SOCKS 212.35.66.45:8085";   // مخصص للتجنيد
var BLOCK         = "SOCKS 127.0.0.1:9";
var DIRECT        = "DIRECT";

// ================= FAILOVER PROXIES =================
var JORDAN_FAILOVER   = "SOCKS 46.185.131.218:20002; SOCKS 46.185.131.218:20003";
var LOBBY_FAILOVER    = "SOCKS 212.35.66.45:8086; SOCKS 212.35.66.45:8087";
var REGION_FAILOVER   = "SOCKS 212.35.66.45:8086; SOCKS 212.35.66.45:8087";

// ================= PERFORMANCE SETTINGS =================
var DNS_TTL_MS       = 120000;
var DNS_FAST_TTL     = 45000;
var SOCIAL_TTL       = 180000;
var REGION_TTL       = 300000;   // 5 دقائق للـ Region (أهم!)
var PROBE_LIMIT      = 10;
var SESSION_TIMEOUT  = 600000;

// ================= ADVANCED SESSION =================
var SESSION = {
  dnsCache:       {},
  dnsTTL:         {},
  dnsHits:        {},
  matchNet:       null,
  matchHost:      null,
  matchProxy:     null,
  matchStart:     0,
  socialLock:     null,
  socialNet:      null,
  socialStart:    0,
  socialHits:     0,
  lastSocialAct:  0,
  regionLock:     null,          // قفل الـ Region
  regionVerified: false,         // تم التحقق من Region
  blockedHosts:   {},
  probeCount:     {},
  lastReset:      0,
  inGame:         false,
  isJordanUser:   false,         // ظهور كمستخدم أردني
  lastRegionCheck: 0
};

// ================= JORDAN ALL IPV4 (شامل) =================
var JORDAN_ALL_IPV4 = [
  // ========== Orange Jordan ==========
  ["46.185.0.0","255.255.0.0"],
  ["46.185.128.0","255.255.128.0"],
  ["37.123.128.0","255.255.128.0"],
  ["37.18.0.0","255.255.0.0"],
  ["77.247.0.0","255.255.0.0"],
  ["80.90.0.0","255.255.0.0"],
  ["82.212.64.0","255.255.192.0"],
  ["82.212.0.0","255.255.0.0"],
  ["94.142.32.0","255.255.224.0"],
  ["94.249.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["185.55.0.0","255.255.0.0"],
  ["185.84.0.0","255.255.0.0"],
  ["185.107.0.0","255.255.0.0"],
  ["188.123.160.0","255.255.224.0"],
  ["217.144.0.0","255.255.0.0"],
  // ========== Zain Jordan ==========
  ["176.29.0.0","255.255.0.0"],
  ["176.28.0.0","255.252.0.0"],
  ["86.108.0.0","255.252.0.0"],
  ["90.84.0.0","255.252.0.0"],
  ["31.153.0.0","255.255.0.0"],
  ["95.141.0.0","255.255.0.0"],
  ["185.113.0.0","255.255.0.0"],
  ["178.20.0.0","255.255.0.0"],
  // ========== Umniah ==========
  ["94.249.0.0","255.255.128.0"],
  ["109.107.0.0","255.255.0.0"],
  ["87.236.232.0","255.255.248.0"],
  ["176.241.0.0","255.255.0.0"],
  ["178.32.0.0","255.255.0.0"],
  // ========== DAMAMAX ==========
  ["212.35.0.0","255.255.0.0"],
  ["213.186.32.0","255.255.224.0"],
  // ========== Jordan Telecom ==========
  ["213.6.0.0","255.255.0.0"],
  // ========== Other Jordan ==========
  ["62.72.128.0","255.255.128.0"],
  ["81.21.64.0","255.255.240.0"],
  ["196.201.0.0","255.255.0.0"],
  ["192.145.0.0","255.255.0.0"],
  ["195.218.0.0","255.255.0.0"],
  ["194.165.128.0","255.255.128.0"],
  ["195.229.0.0","255.254.0.0"],
  ["5.133.0.0","255.255.0.0"],
  ["5.134.0.0","255.255.0.0"],
  ["31.25.0.0","255.255.0.0"],
  ["31.47.0.0","255.255.0.0"],
  ["37.40.0.0","255.255.0.0"],
  ["37.76.0.0","255.255.0.0"],
  ["37.208.0.0","255.255.0.0"],
  ["45.67.0.0","255.255.0.0"],
  ["45.68.0.0","255.255.0.0"],
  ["45.69.0.0","255.255.0.0"],
  ["46.32.0.0","255.255.0.0"],
  ["46.152.0.0","255.255.0.0"],
  ["46.235.0.0","255.255.0.0"],
  ["77.245.0.0","255.255.0.0"],
  ["78.89.0.0","255.255.0.0"],
  ["79.134.0.0","255.255.0.0"],
  ["79.173.0.0","255.255.0.0"],
  ["80.83.0.0","255.255.0.0"],
  ["80.249.0.0","255.255.0.0"],
  ["82.137.0.0","255.255.0.0"],
  ["82.205.0.0","255.255.0.0"],
  ["83.110.0.0","255.255.0.0"],
  ["84.18.0.0","255.255.0.0"],
  ["84.235.0.0","255.255.0.0"],
  ["85.113.0.0","255.255.0.0"],
  ["85.237.0.0","255.255.0.0"],
  ["87.238.0.0","255.255.0.0"],
  ["88.83.0.0","255.255.0.0"],
  ["89.28.0.0","255.255.0.0"],
  ["91.207.0.0","255.255.0.0"],
  ["91.220.0.0","255.255.0.0"],
  ["91.236.0.0","255.255.0.0"],
  ["92.62.0.0","255.255.0.0"],
  ["92.253.0.0","255.255.0.0"],
  ["93.157.0.0","255.255.0.0"],
  ["93.180.0.0","255.255.0.0"],
  ["95.129.0.0","255.255.0.0"],
  ["95.215.0.0","255.255.0.0"],
  ["149.200.0.0","255.255.0.0"],
  ["151.249.0.0","255.255.0.0"],
  ["156.195.0.0","255.255.0.0"],
  ["168.187.0.0","255.255.0.0"],
  ["178.135.0.0","255.255.0.0"],
  ["178.150.0.0","255.255.0.0"],
  ["185.1.0.0","255.255.0.0"],
  ["185.45.0.0","255.255.0.0"],
  ["185.57.0.0","255.255.0.0"],
  ["185.69.0.0","255.255.0.0"],
  ["185.81.0.0","255.255.0.0"],
  ["185.95.0.0","255.255.0.0"],
  ["185.111.0.0","255.255.0.0"],
  ["185.133.0.0","255.255.0.0"],
  ["185.145.0.0","255.255.0.0"],
  ["185.151.0.0","255.255.0.0"],
  ["185.167.0.0","255.255.0.0"],
  ["185.179.0.0","255.255.0.0"],
  ["185.199.0.0","255.255.0.0"],
  ["185.204.0.0","255.255.0.0"],
  ["185.208.0.0","255.255.0.0"],
  ["185.221.0.0","255.255.0.0"],
  ["185.233.0.0","255.255.0.0"],
  ["185.241.0.0","255.255.0.0"],
  ["185.246.0.0","255.255.0.0"],
  ["188.68.0.0","255.255.0.0"],
  ["188.127.0.0","255.255.0.0"],
  ["188.139.0.0","255.255.0.0"],
  ["188.247.0.0","255.255.0.0"],
  ["193.188.0.0","255.255.0.0"],
  ["194.165.0.0","255.255.0.0"],
  ["195.14.0.0","255.255.0.0"],
  ["195.47.0.0","255.255.0.0"],
  ["195.60.0.0","255.255.0.0"],
  ["195.62.0.0","255.255.0.0"],
  ["195.82.0.0","255.255.0.0"],
  ["195.85.0.0","255.255.0.0"],
  ["195.88.0.0","255.255.0.0"],
  ["195.94.0.0","255.255.0.0"],
  ["195.110.0.0","255.255.0.0"],
  ["195.122.0.0","255.255.0.0"],
  ["195.130.0.0","255.255.0.0"],
  ["195.140.0.0","255.255.0.0"],
  ["195.189.0.0","255.255.0.0"],
  ["195.202.0.0","255.255.0.0"],
  ["195.211.0.0","255.255.0.0"],
  ["195.225.0.0","255.255.0.0"],
  ["195.234.0.0","255.255.0.0"],
  ["195.242.0.0","255.255.0.0"],
  ["195.250.0.0","255.255.0.0"],
  ["212.23.0.0","255.255.0.0"],
  ["212.38.0.0","255.255.0.0"],
  ["212.72.0.0","255.255.0.0"],
  ["212.85.0.0","255.255.0.0"],
  ["212.93.0.0","255.255.0.0"],
  ["212.118.0.0","255.255.0.0"],
  ["212.150.0.0","255.255.0.0"],
  ["212.234.0.0","255.255.0.0"],
  ["213.139.0.0","255.255.0.0"],
  ["213.158.0.0","255.255.0.0"],
  ["213.181.0.0","255.255.0.0"],
  ["213.203.0.0","255.255.0.0"],
  ["213.244.0.0","255.255.0.0"],
  ["217.23.0.0","255.255.0.0"],
  ["217.29.0.0","255.255.0.0"],
  ["217.53.0.0","255.255.0.0"],
  ["217.174.0.0","255.255.0.0"],
  ["217.196.0.0","255.255.0.0"]
];

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
  ["87.236.232.0","255.255.248.0"],
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
  ["213.186.32.0","255.255.224.0"],
  ["77.247.0.0","255.255.0.0"],
  ["80.90.0.0","255.255.0.0"],
  ["95.141.0.0","255.255.0.0"],
  ["185.55.0.0","255.255.0.0"],
  ["185.84.0.0","255.255.0.0"],
  ["194.165.128.0","255.255.128.0"]
];

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

function isInListFast(ip, list) {
  var ip24 = ip.split('.').slice(0, 3).join('.');
  for (var i = 0; i < list.length; i++) {
    var net24 = list[i][0].split('.').slice(0, 3).join('.');
    if (ip24 === net24) return true;
  }
  return isInList(ip, list);
}

function getPort(url) {
  var m = url.match(/:(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function getNet24(ip) { return ip.split('.').slice(0, 3).join('.'); }
function getNet16(ip) { return ip.split('.').slice(0, 2).join('.'); }

// ================= SMART DNS =================
function resolvePinned(host, mode) {
  var now = Date.now();
  var ttl = SESSION.dnsTTL[host];
  var ttlTime = DNS_TTL_MS;
  
  if (mode === 'fast') ttlTime = DNS_FAST_TTL;
  else if (mode === 'social') ttlTime = SOCIAL_TTL;
  else if (mode === 'region') ttlTime = REGION_TTL;
  
  if (!ttl || (now - ttl) > ttlTime) {
    var ip = dnsResolve(host);
    if (ip) {
      SESSION.dnsCache[host] = ip;
      SESSION.dnsTTL[host]   = now;
      SESSION.dnsHits[host]  = (SESSION.dnsHits[host] || 0) + 1;
    }
  }
  return SESSION.dnsCache[host] || null;
}

// ================= GAME STATE =================
function detectGameState(url, host) {
  var p = getPort(url);
  var combined = (url + host).toLowerCase();
  var isGamePort = (p >= 6000 && p <= 9000) || (p >= 10000 && p <= 10100) || (p >= 20000 && p <= 40000);
  if (isGamePort) SESSION.inGame = true;
  if (/lobby|matchmaking|prepare|queue|main.*menu|start/i.test(combined)) SESSION.inGame = false;
  return SESSION.inGame;
}

function isMatchPort(url) {
  var p = getPort(url);
  return (p >= 6000 && p <= 10000) || (p >= 20000 && p <= 40000);
}

function isUDPFirst(u, h) {
  return isMatchPort(u) || /udp|realtime|tick|sync|frame|state/i.test(u + h);
}

// ================= PUBG DOMAINS (شامل جداً) =================
function isPUBG(host) {
  return (
    // PUBG Core
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
    shExpMatch(host, "*.cdn.dl.pstmn.io")   ||
    // Auth
    shExpMatch(host, "*.gamesafe.qq.com")   ||
    shExpMatch(host, "*.msdl.microsoft.com")||
    shExpMatch(host, "*.xboxlive.com")      ||
    shExpMatch(host, "*.playfab.com")       ||
    shExpMatch(host, "*.tgpqq.com")         ||
    // Friends
    shExpMatch(host, "*.friend.qq.com")     ||
    shExpMatch(host, "*.friends.qq.com")    ||
    shExpMatch(host, "*.splits.qq.com")     ||
    shExpMatch(host, "*.idip.qq.com")       ||
    shExpMatch(host, "*.openmobile.qq.com") ||
    shExpMatch(host, "*.graph.qq.com")      ||
    shExpMatch(host, "*.wtlogin.qq.com")    ||
    shExpMatch(host, "*.ssl.qq.com")        ||
    shExpMatch(host, "*.gtimg.cn")          ||
    shExpMatch(host, "*.gtimg.com")         ||
    shExpMatch(host, "*.qpic.cn")           ||
    shExpMatch(host, "*.qpic.com")          ||
    shExpMatch(host, "*.qlogo.cn")          ||
    shExpMatch(host, "*.qlogo.com")         ||
    shExpMatch(host, "*.wechat.com")        ||
    shExpMatch(host, "*.weixin.com")        ||
    shExpMatch(host, "*.wechatapp.com")     ||
    // QQ
    shExpMatch(host, "*.qq.com")            ||
    shExpMatch(host, "*.tim.qq.com")        ||
    shExpMatch(host, "*.qplus.com")         ||
    shExpMatch(host, "*.vip.qq.com")        ||
    shExpMatch(host, "*.tencent-cloud.com") ||
    shExpMatch(host, "*.tencent-cloud.net") ||
    shExpMatch(host, "*.dnspod.net")        ||
    shExpMatch(host, "*.dns.qq.com")        ||
    shExpMatch(host, "*.pingma.qq.com")     ||
    shExpMatch(host, "*.tjstat.com")        ||
    shExpMatch(host, "*.report.qq.com")     ||
    // Gaming
    shExpMatch(host, "*.game.qq.com")       ||
    shExpMatch(host, "*.igame.qq.com")      ||
    shExpMatch(host, "*.pvp.net")           ||
    shExpMatch(host, "*.riotgames.com")     ||
    shExpMatch(host, "*.discord.com")       ||
    shExpMatch(host, "*.discordapp.com")    ||
    shExpMatch(host, "*.discord.gg")        ||
    // Payment
    shExpMatch(host, "*.pay.qq.com")        ||
    shExpMatch(host, "*.event.qq.com")      ||
    shExpMatch(host, "*.activity.qq.com")   ||
    shExpMatch(host, "*.midas.qq.com")      ||
    // Emulator
    shExpMatch(host, "*.gameloop.com")      ||
    shExpMatch(host, "*.tencentgamerbuddy.com") ||
    shExpMatch(host, "*.sy.com")            ||
    // Analytics & Telemetry
    shExpMatch(host, "*.bugly.qq.com")      ||
    shExpMatch(host, "*.beacon.qq.com")     ||
    shExpMatch(host, "*.trace.qq.com")
  );
}

// ================= TRAFFIC CLASSIFICATION =================
function isMatch(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    isMatchPort(u) ||
    isUDPFirst(u, h) ||
    /match|battle|game|combat|room|server|logic/i.test(combined) ||
    /classic|ranked|arena|tdm|payload|metro|zombie|wow|training|custom|event/i.test(combined) ||
    /tick|frame|sync|realtime|relay|rpc|ping|probe/i.test(combined)
  );
}

// ================= REGION DETECTION (جديد - مهم للأردنيين) =================
// هذه الدالة تكتشف حركة الـ Region والموقع الجغرافي
function isRegion(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    // كلمات الـ Region
    /region|country|location|geo|geolocation|geoip/i.test(combined) ||
    // كلمات الـ Matchmaking (تحدد من وين تلعب)
    /matchmaking|mm.*server|server.*select|server.*list/i.test(combined) ||
    // كلمات الـ Dispatch و Gateway
    /dispatch|gateway|router|broker|coordinator/i.test(combined) ||
    // تحديد السيرفر
    /server.*region|region.*server|area.*server|zone.*server/i.test(combined) ||
    // تحديد الموقع
    /ip.*check|ip.*detect|ip.*location|what.*is.*my.*ip/i.test(combined) ||
    // أنماط Tencent للـ Region
    /region.*qq|area.*qq|zone.*qq|dispatch.*qq/i.test(combined) ||
    // Near و Nearby (لايجاد لاعبين قريبين)
    /nearby|near.*player|close.*player|local.*player/i.test(combined) ||
    // Lobby Region
    /lobby.*region|region.*lobby|lobby.*area/i.test(combined) ||
    // Player Search Region
    /player.*search|search.*region|find.*region/i.test(combined) ||
    // Server Selection
    /select.*server|choose.*server|best.*server|optimal.*server/i.test(combined) ||
    // المزيد من أنماط الموقع
    /location.*service|geo.*service|position.*service/i.test(combined)
  );
}

// Matchmaking Traffic (مهم جداً للظهور كمستخدم أردني)
function isMatchmaking(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    /matchmaking|match.*make|mm.*queue|queue.*match/i.test(combined) ||
    /finding.*match|searching.*match|looking.*for.*match/i.test(combined) ||
    /player.*pool|match.*pool|queue.*pool/i.test(combined) ||
    /rating.*match|elo.*match|skill.*match/i.test(combined) ||
    /quick.*match|random.*match|casual.*match/i.test(combined)
  );
}

// Dispatch Traffic (توجيه اللاعبين للسيرفرات)
function isDispatch(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    /dispatch|dispatch.*server|game.*dispatch/i.test(combined) ||
    /route|router|gateway|entry.*point/i.test(combined) ||
    /connect.*server|server.*connect|assign.*server/i.test(combined)
  );
}

function isLobby(u, h) {
  var combined = (u + h).toLowerCase();
  return /lobby|matchmaking|queue|dispatch|gateway|region|prepare|entry|roster|rank|mainmenu/i.test(combined);
}

function isSocial(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    /friend|invite|squad|team|party|clan|presence|chat|voice|guild|group/i.test(combined) ||
    /recruit|recruitment|apply|join|member|crew|alliance/i.test(combined) ||
    /social|buddy|companion|ally|partner|cooperate/i.test(combined) ||
    /wtlogin|login|session|token|auth|verify/i.test(combined) ||
    /nearby|recommend|search.*player|find.*player|player.*info|player.*list/i.test(combined) ||
    /relation|relationlist|addfriend|accept.*invite|reject.*invite/i.test(combined) ||
    /openmobile|graph.*qq|ssl.*qq|friend.*qq|splits|idip/i.test(combined) ||
    /voice|mic|speaker|audio.*chat|realtime.*voice/i.test(combined) ||
    /session.*friend|sync.*friend|push.*friend|notify.*friend/i.test(combined) ||
    /presence|online|offline|status|away|busy/i.test(combined) ||
    /message|msg|inbox|notification|alert/i.test(combined) ||
    /profile|avatar|emblem|badge|achievement|statistic/i.test(combined)
  );
}

function isRecruitment(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    /recruit|join.*squad|squad.*join|find.*team|team.*find/i.test(combined) ||
    /apply.*crew|crew.*apply|guild.*join|clan.*join/i.test(combined) ||
    /recommend.*player|player.*recommend|nearby.*player/i.test(combined) ||
    /friend.*request|request.*friend|invite.*accept|invite.*send/i.test(combined) ||
    /squad.*search|search.*squad|team.*search|search.*team/i.test(combined) ||
    /wtlogin|friend\.qq|graph\.qq|openmobile/i.test(combined)
  );
}

function isCDN(u, h) {
  var combined = (u + h).toLowerCase();
  return /cdn|asset|resource|patch|update|download|media|pak|obb|manifest|bundle|texture/i.test(combined);
}

function isAuth(u, h) {
  var combined = (u + h).toLowerCase();
  return /auth|login|token|account|session|oauth|verify|captcha|report/i.test(combined);
}

// ================= SESSION MANAGEMENT =================
function lockMatchSession(ip, proxy) {
  if (!SESSION.matchNet) {
    SESSION.matchNet   = getNet24(ip);
    SESSION.matchProxy = proxy;
    SESSION.matchStart = Date.now();
  }
}

function isMatchSessionLocked(ip) {
  if (SESSION.matchStart && (Date.now() - SESSION.matchStart > SESSION_TIMEOUT)) {
    resetMatchSession();
    return false;
  }
  return SESSION.matchNet && getNet24(ip) === SESSION.matchNet;
}

function resetMatchSession() {
  SESSION.matchNet   = null;
  SESSION.matchHost  = null;
  SESSION.matchProxy = null;
  SESSION.matchStart = 0;
  SESSION.inGame     = false;
}

function lockSocialSession(ip) {
  if (!SESSION.socialLock) {
    SESSION.socialLock = ip;
    SESSION.socialNet  = getNet24(ip);
    SESSION.socialStart = Date.now();
  }
  SESSION.lastSocialAct = Date.now();
  SESSION.socialHits++;
}

function isSocialSessionLocked(ip) {
  if (SESSION.socialLock && (Date.now() - SESSION.lastSocialAct > 60000)) {
    SESSION.socialLock = null;
    SESSION.socialNet  = null;
    return false;
  }
  return SESSION.socialLock === ip || (SESSION.socialNet && getNet24(ip) === SESSION.socialNet);
}

// ================= REGION LOCK (جديد - مهم للأردنيين) =================
function lockRegionSession(ip) {
  SESSION.regionLock = ip;
  SESSION.regionVerified = true;
  SESSION.isJordanUser = true;
  SESSION.lastRegionCheck = Date.now();
}

function isRegionSessionLocked(ip) {
  // تحقق كل 5 دقائق
  if (SESSION.regionLock && (Date.now() - SESSION.lastRegionCheck > 300000)) {
    // إعادة التحقق
    SESSION.lastRegionCheck = Date.now();
  }
  return SESSION.regionLock === ip;
}

// ================= PROBE LIMITER =================
function isBlockedHost(host) {
  var count = SESSION.probeCount[host] || 0;
  return count > PROBE_LIMIT;
}

function markProbe(host) {
  SESSION.probeCount[host] = (SESSION.probeCount[host] || 0) + 1;
}

function cleanupProbes() {
  var now = Date.now();
  if (now - SESSION.lastReset > 300000) {
    SESSION.probeCount = {};
    SESSION.lastReset = now;
  }
}

// ================= MAIN FUNCTION =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  cleanupProbes();

  // ===== PUBG DOMAIN CHECK =====
  if (!isPUBG(host)) return BLOCK;

  // ===== PROBE LIMITER =====
  if (isBlockedHost(host)) return BLOCK;

  // ===== DNS RESOLVE =====
  var mode = 'normal';
  if (isMatch(url, host)) mode = 'fast';
  else if (isRegion(url, host) || isMatchmaking(url, host)) mode = 'region';
  else if (isRecruitment(url, host) || isSocial(url, host)) mode = 'social';
  
  var ip = resolvePinned(host, mode);
  if (!ip || ip.indexOf(":") > -1) {
    markProbe(host);
    return BLOCK;
  }

  // ===== JORDAN ISP CHECK =====
  if (!isInListFast(ip, JORDAN_ALL_IPV4)) {
    markProbe(host);
    return BLOCK;
  }

  // ===== REGION / GEOLOCATION (أولوية قصوى - مهم للأردنيين) =====
  // هذا يحدد أنك من الأردن ويخليك تشوف أردنيين
  if (isRegion(url, host)) {
    lockRegionSession(ip);
    SESSION.isJordanUser = true;
    return REGION_PROXY + "; " + REGION_FAILOVER;
  }

  // ===== MATCHMAKING (مهم جداً للظهور كمستخدم أردني) =====
  if (isMatchmaking(url, host)) {
    lockRegionSession(ip);
    return REGION_PROXY + "; " + REGION_FAILOVER;
  }

  // ===== DISPATCH (توجيه للسيرفرات الأردنية) =====
  if (isDispatch(url, host)) {
    return REGION_PROXY + "; " + REGION_FAILOVER;
  }

  // ===== RECRUITMENT =====
  if (isRecruitment(url, host)) {
    lockSocialSession(ip);
    return SOCIAL_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== SOCIAL / FRIENDS =====
  if (isSocial(url, host)) {
    lockSocialSession(ip);
    return SOCIAL_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== AUTH =====
  if (isAuth(url, host)) {
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== MATCH =====
  if (isMatch(url, host)) {
    detectGameState(url, host);
    if (!isInList(ip, JORDAN_MATCH_IPV4)) {
      if (!isInList(ip, JORDAN_ALL_IPV4)) return BLOCK;
    }
    lockMatchSession(ip, MATCH_JO);
    if (!isMatchSessionLocked(ip)) return BLOCK;
    return MATCH_JO + "; " + JORDAN_FAILOVER;
  }

  // ===== LOBBY (توجيه عبر البروكسي الأردني) =====
  if (isLobby(url, host)) {
    resetMatchSession();
    // مهم: توجيه اللوبي عبر البروكسي الأردني
    return REGION_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== CDN =====
  if (isCDN(url, host)) {
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== FALLBACK (توجيه كل شيء عبر الأردن) =====
  return REGION_PROXY + "; " + LOBBY_FAILOVER;
}
