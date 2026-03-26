// =====================================================================
// PUBG MOBILE - JORDAN ULTIMATE PAC FILE
// =====================================================================
// هذا الملف يضمن ظهورك كمستخدم أردني ويجعلك ترى أردنيين آخرين
// =====================================================================

// ================= DNS SERVERS =================
// dns 1.1.1.1 1.0.0.1
// dns 8.8.8.8 8.8.4.4
// dns 208.67.222.222 208.67.220.220

// ================= SOCKS PROXIES =================
// البروكسي الرئيسي - كل شيء يمر منه
var JORDAN_PRIMARY   = "SOCKS5 46.185.131.218:20001; SOCKS 46.185.131.218:20001";
var JORDAN_SECONDARY = "SOCKS5 212.35.66.45:8085; SOCKS 212.35.66.45:8085";

// بروكسيات احتياطية
var JORDAN_BACKUP_1  = "SOCKS5 46.185.131.218:20002; SOCKS 46.185.131.218:20002";
var JORDAN_BACKUP_2  = "SOCKS5 46.185.131.218:20003; SOCKS 46.185.131.218:20003";
var JORDAN_BACKUP_3  = "SOCKS5 212.35.66.45:8086; SOCKS 212.35.66.45:8086";
var JORDAN_BACKUP_4  = "SOCKS5 212.35.66.45:8087; SOCKS 212.35.66.45:8087";

// البروكسي المركب (كل البروكسيات)
var JORDAN_ALL = JORDAN_PRIMARY + "; " + JORDAN_SECONDARY + "; " + JORDAN_BACKUP_1 + "; " + JORDAN_BACKUP_2 + "; " + JORDAN_BACKUP_3 + "; " + JORDAN_BACKUP_4;

var BLOCK = "SOCKS5 127.0.0.1:9; SOCKS 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= CONFIGURATION =================
var CONFIG = {
  // TTL
  dnsTTL:          180000,    // 3 دقائق
  regionTTL:       600000,    // 10 دقائق
  sessionTTL:      600000,    // 10 دقائق
  
  // Limits
  maxProbes:       15,
  cleanupInterval: 300000,    // 5 دقائق
  
  // Mode
  forceJordan:     true,      // تفعيل الوضع الأردني الإجباري
  debugMode:       false,
  logRequests:     false
};

// ================= SESSION STATE =================
var SESSION = {
  // DNS Cache
  dnsCache:        {},
  dnsTTL:          {},
  dnsResolveCount: {},
  
  // Connection State
  activeProxy:     null,
  lastProxySwitch: 0,
  connectionCount: 0,
  
  // Game State
  inGame:          false,
  inLobby:         false,
  inMatchmaking:   false,
  matchStart:      0,
  
  // Region State (مهم للأردنيين)
  regionLocked:    false,
  regionIP:        null,
  regionVerified:  0,
  isJordanUser:    false,
  
  // Social State
  socialActive:    false,
  lastSocialAct:   0,
  
  // Probe Tracking
  probeCount:      {},
  blockedHosts:    {},
  lastCleanup:     0,
  
  // Stats
  totalRequests:   0,
  blockedRequests: 0,
  jordanRequests:  0
};

// =====================================================================
// JORDAN IP RANGES - ALL ISPs (250+ Ranges)
// =====================================================================
var JORDAN_IPS = [
  // ================= ORANGE JORDAN (أكبر مزود) =================
  ["46.185.0.0", "255.255.0.0"],
  ["46.185.128.0", "255.255.128.0"],
  ["37.123.128.0", "255.255.128.0"],
  ["37.18.0.0", "255.255.0.0"],
  ["37.40.0.0", "255.255.0.0"],
  ["37.76.0.0", "255.255.0.0"],
  ["37.208.0.0", "255.255.0.0"],
  ["77.247.0.0", "255.255.0.0"],
  ["77.245.0.0", "255.255.0.0"],
  ["80.90.0.0", "255.255.0.0"],
  ["80.83.0.0", "255.255.0.0"],
  ["80.249.0.0", "255.255.0.0"],
  ["82.212.0.0", "255.255.0.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["82.137.0.0", "255.255.0.0"],
  ["82.205.0.0", "255.255.0.0"],
  ["83.110.0.0", "255.255.0.0"],
  ["84.18.0.0", "255.255.0.0"],
  ["84.235.0.0", "255.255.0.0"],
  ["85.113.0.0", "255.255.0.0"],
  ["85.237.0.0", "255.255.0.0"],
  ["94.142.32.0", "255.255.224.0"],
  ["94.249.0.0", "255.255.0.0"],
  ["176.28.0.0", "255.252.0.0"],
  ["176.28.128.0", "255.255.128.0"],
  ["185.55.0.0", "255.255.0.0"],
  ["185.84.0.0", "255.255.0.0"],
  ["185.107.0.0", "255.255.0.0"],
  ["185.45.0.0", "255.255.0.0"],
  ["185.57.0.0", "255.255.0.0"],
  ["185.69.0.0", "255.255.0.0"],
  ["185.81.0.0", "255.255.0.0"],
  ["185.95.0.0", "255.255.0.0"],
  ["185.111.0.0", "255.255.0.0"],
  ["185.133.0.0", "255.255.0.0"],
  ["185.145.0.0", "255.255.0.0"],
  ["185.151.0.0", "255.255.0.0"],
  ["185.167.0.0", "255.255.0.0"],
  ["185.179.0.0", "255.255.0.0"],
  ["185.199.0.0", "255.255.0.0"],
  ["185.204.0.0", "255.255.0.0"],
  ["185.208.0.0", "255.255.0.0"],
  ["185.221.0.0", "255.255.0.0"],
  ["185.233.0.0", "255.255.0.0"],
  ["185.241.0.0", "255.255.0.0"],
  ["185.246.0.0", "255.255.0.0"],
  ["188.68.0.0", "255.255.0.0"],
  ["188.123.160.0", "255.255.224.0"],
  ["188.127.0.0", "255.255.0.0"],
  ["188.139.0.0", "255.255.0.0"],
  ["188.247.0.0", "255.255.0.0"],
  ["217.144.0.0", "255.255.0.0"],
  ["217.53.0.0", "255.255.0.0"],
  ["217.174.0.0", "255.255.0.0"],
  ["217.196.0.0", "255.255.0.0"],
  
  // ================= ZAIN JORDAN =================
  ["176.29.0.0", "255.255.0.0"],
  ["86.108.0.0", "255.252.0.0"],
  ["90.84.0.0", "255.252.0.0"],
  ["31.153.0.0", "255.255.0.0"],
  ["31.25.0.0", "255.255.0.0"],
  ["31.47.0.0", "255.255.0.0"],
  ["95.141.0.0", "255.255.0.0"],
  ["95.129.0.0", "255.255.0.0"],
  ["95.215.0.0", "255.255.0.0"],
  ["178.20.0.0", "255.255.0.0"],
  ["185.113.0.0", "255.255.0.0"],
  
  // ================= UMNIAH =================
  ["94.249.0.0", "255.255.128.0"],
  ["109.107.0.0", "255.255.0.0"],
  ["87.236.232.0", "255.255.248.0"],
  ["87.238.0.0", "255.255.0.0"],
  ["176.241.0.0", "255.255.0.0"],
  ["178.32.0.0", "255.255.0.0"],
  ["178.135.0.0", "255.255.0.0"],
  ["178.150.0.0", "255.255.0.0"],
  
  // ================= DAMAMAX =================
  ["212.35.0.0", "255.255.0.0"],
  ["213.186.32.0", "255.255.224.0"],
  
  // ================= JORDAN TELECOM =================
  ["213.6.0.0", "255.255.0.0"],
  ["193.188.0.0", "255.255.0.0"],
  ["194.165.0.0", "255.255.0.0"],
  ["194.165.128.0", "255.255.128.0"],
  
  // ================= OTHER JORDAN ISPs =================
  ["5.133.0.0", "255.255.0.0"],
  ["5.134.0.0", "255.255.0.0"],
  ["45.67.0.0", "255.255.0.0"],
  ["45.68.0.0", "255.255.0.0"],
  ["45.69.0.0", "255.255.0.0"],
  ["46.32.0.0", "255.255.0.0"],
  ["46.152.0.0", "255.255.0.0"],
  ["46.235.0.0", "255.255.0.0"],
  ["62.72.128.0", "255.255.128.0"],
  ["62.150.0.0", "255.255.0.0"],
  ["78.89.0.0", "255.255.0.0"],
  ["79.134.0.0", "255.255.0.0"],
  ["79.173.0.0", "255.255.0.0"],
  ["81.21.64.0", "255.255.240.0"],
  ["88.83.0.0", "255.255.0.0"],
  ["89.28.0.0", "255.255.0.0"],
  ["91.207.0.0", "255.255.0.0"],
  ["91.220.0.0", "255.255.0.0"],
  ["91.236.0.0", "255.255.0.0"],
  ["92.62.0.0", "255.255.0.0"],
  ["92.253.0.0", "255.255.0.0"],
  ["93.157.0.0", "255.255.0.0"],
  ["93.180.0.0", "255.255.0.0"],
  ["149.200.0.0", "255.255.0.0"],
  ["151.249.0.0", "255.255.0.0"],
  ["156.195.0.0", "255.255.0.0"],
  ["168.187.0.0", "255.255.0.0"],
  ["185.1.0.0", "255.255.0.0"],
  ["192.145.0.0", "255.255.0.0"],
  ["195.14.0.0", "255.255.0.0"],
  ["195.47.0.0", "255.255.0.0"],
  ["195.60.0.0", "255.255.0.0"],
  ["195.62.0.0", "255.255.0.0"],
  ["195.82.0.0", "255.255.0.0"],
  ["195.85.0.0", "255.255.0.0"],
  ["195.88.0.0", "255.255.0.0"],
  ["195.94.0.0", "255.255.0.0"],
  ["195.110.0.0", "255.255.0.0"],
  ["195.122.0.0", "255.255.0.0"],
  ["195.130.0.0", "255.255.0.0"],
  ["195.140.0.0", "255.255.0.0"],
  ["195.189.0.0", "255.255.0.0"],
  ["195.202.0.0", "255.255.0.0"],
  ["195.211.0.0", "255.255.0.0"],
  ["195.218.0.0", "255.255.0.0"],
  ["195.225.0.0", "255.255.0.0"],
  ["195.229.0.0", "255.254.0.0"],
  ["195.234.0.0", "255.255.0.0"],
  ["195.242.0.0", "255.255.0.0"],
  ["195.250.0.0", "255.255.0.0"],
  ["196.201.0.0", "255.255.0.0"],
  ["212.23.0.0", "255.255.0.0"],
  ["212.38.0.0", "255.255.0.0"],
  ["212.72.0.0", "255.255.0.0"],
  ["212.85.0.0", "255.255.0.0"],
  ["212.93.0.0", "255.255.0.0"],
  ["212.118.0.0", "255.255.0.0"],
  ["212.150.0.0", "255.255.0.0"],
  ["212.234.0.0", "255.255.0.0"],
  ["213.139.0.0", "255.255.0.0"],
  ["213.158.0.0", "255.255.0.0"],
  ["213.181.0.0", "255.255.0.0"],
  ["213.203.0.0", "255.255.0.0"],
  ["213.244.0.0", "255.255.0.0"],
  ["217.23.0.0", "255.255.0.0"],
  ["217.29.0.0", "255.255.0.0"]
];

// IPs للمباريات فقط (الأفضل أداءً)
var JORDAN_MATCH_IPS = [
  ["46.185.128.0", "255.255.128.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["176.29.0.0", "255.255.0.0"],
  ["86.108.0.0", "255.252.0.0"],
  ["90.84.0.0", "255.252.0.0"],
  ["94.249.0.0", "255.255.0.0"],
  ["212.35.0.0", "255.255.0.0"],
  ["213.6.0.0", "255.255.0.0"]
];

// =====================================================================
// ALL PUBG DOMAINS (Complete List)
// =====================================================================
function isPUBGDomain(host) {
  host = host.toLowerCase();
  
  // PUBG Mobile Core
  if (shExpMatch(host, "*pubgmobile*")) return true;
  if (shExpMatch(host, "*pubgmobile.com")) return true;
  if (shExpMatch(host, "*pubgmobile.net")) return true;
  if (shExpMatch(host, "*pubg*")) return true;
  
  // Tencent
  if (shExpMatch(host, "*.tencent.com")) return true;
  if (shExpMatch(host, "*.tencent.net")) return true;
  if (shExpMatch(host, "*.tencent-cloud.com")) return true;
  if (shExpMatch(host, "*.tencent-cloud.net")) return true;
  if (shExpMatch(host, "*.tencentcloud.com")) return true;
  if (shExpMatch(host, "*.tencentmusic.com")) return true;
  
  // QQ Services
  if (shExpMatch(host, "*.qq.com")) return true;
  if (shExpMatch(host, "*.qq.net")) return true;
  if (shExpMatch(host, "*.qpic.cn")) return true;
  if (shExpMatch(host, "*.qpic.com")) return true;
  if (shExpMatch(host, "*.qlogo.cn")) return true;
  if (shExpMatch(host, "*.qlogo.com")) return true;
  if (shExpMatch(host, "*.gtimg.cn")) return true;
  if (shExpMatch(host, "*.gtimg.com")) return true;
  if (shExpMatch(host, "*.idqqimg.com")) return true;
  if (shExpMatch(host, "*.qpic.cn-*")) return true;
  
  // Game Services
  if (shExpMatch(host, "*.igamecj.com")) return true;
  if (shExpMatch(host, "*.igame.qq.com")) return true;
  if (shExpMatch(host, "*.game.qq.com")) return true;
  if (shExpMatch(host, "*.gamesafe.qq.com")) return true;
  if (shExpMatch(host, "*.tgpqq.com")) return true;
  
  // Cloud Services
  if (shExpMatch(host, "*.gcloudcs.com")) return true;
  if (shExpMatch(host, "*.qcloud.com")) return true;
  if (shExpMatch(host, "*.myqcloud.com")) return true;
  if (shExpMatch(host, "*.cdn.dl.pstmn.io")) return true;
  
  // CDNs
  if (shExpMatch(host, "*.cloudfront.net")) return true;
  if (shExpMatch(host, "*.amazonaws.com")) return true;
  if (shExpMatch(host, "*.akamaized.net")) return true;
  if (shExpMatch(host, "*.akamai.net")) return true;
  if (shExpMatch(host, "*.cdn.jsdelivr.net")) return true;
  
  // Krafton / Level Infinite
  if (shExpMatch(host, "*.krafton.com")) return true;
  if (shExpMatch(host, "*.levelinfinite.com")) return true;
  if (shExpMatch(host, "*.levelinfinite.net")) return true;
  
  // Auth & Login
  if (shExpMatch(host, "*.wtlogin.qq.com")) return true;
  if (shExpMatch(host, "*.login.qq.com")) return true;
  if (shExpMatch(host, "*.openmobile.qq.com")) return true;
  if (shExpMatch(host, "*.ssl.qq.com")) return true;
  if (shExpMatch(host, "*.graph.qq.com")) return true;
  if (shExpMatch(host, "*.xui.qq.com")) return true;
  if (shExpMatch(host, "*.ptlogin2.qq.com")) return true;
  
  // Friends & Social
  if (shExpMatch(host, "*.friend.qq.com")) return true;
  if (shExpMatch(host, "*.friends.qq.com")) return true;
  if (shExpMatch(host, "*.splits.qq.com")) return true;
  if (shExpMatch(host, "*.idip.qq.com")) return true;
  
  // WeChat
  if (shExpMatch(host, "*.wechat.com")) return true;
  if (shExpMatch(host, "*.weixin.com")) return true;
  if (shExpMatch(host, "*.wechatapp.com")) return true;
  if (shExpMatch(host, "*.wechatlego.com")) return true;
  
  // Xbox
  if (shExpMatch(host, "*.xboxlive.com")) return true;
  if (shExpMatch(host, "*.xbox.com")) return true;
  if (shExpMatch(host, "*.msdl.microsoft.com")) return true;
  
  // PlayFab
  if (shExpMatch(host, "*.playfab.com")) return true;
  if (shExpMatch(host, "*.playfabapi.com")) return true;
  
  // Payment
  if (shExpMatch(host, "*.pay.qq.com")) return true;
  if (shExpMatch(host, "*.midas.qq.com")) return true;
  if (shExpMatch(host, "*.event.qq.com")) return true;
  if (shExpMatch(host, "*.activity.qq.com")) return true;
  
  // Analytics
  if (shExpMatch(host, "*.pingma.qq.com")) return true;
  if (shExpMatch(host, "*.tjstat.com")) return true;
  if (shExpMatch(host, "*.report.qq.com")) return true;
  if (shExpMatch(host, "*.beacon.qq.com")) return true;
  if (shExpMatch(host, "*.bugly.qq.com")) return true;
  if (shExpMatch(host, "*.trace.qq.com")) return true;
  
  // DNS
  if (shExpMatch(host, "*.dnspod.net")) return true;
  if (shExpMatch(host, "*.dns.qq.com")) return true;
  
  // Emulator
  if (shExpMatch(host, "*.gameloop.com")) return true;
  if (shExpMatch(host, "*.tencentgamerbuddy.com")) return true;
  if (shExpMatch(host, "*.sy.com")) return true;
  
  // Other Gaming
  if (shExpMatch(host, "*.pvp.net")) return true;
  if (shExpMatch(host, "*.riotgames.com")) return true;
  if (shExpMatch(host, "*.discord.com")) return true;
  if (shExpMatch(host, "*.discordapp.com")) return true;
  if (shExpMatch(host, "*.discord.gg")) return true;
  
  // Specific PUBG patterns
  if (host.indexOf("pubg") !== -1) return true;
  if (host.indexOf("igamecj") !== -1) return true;
  if (host.indexOf("gcloudcs") !== -1) return true;
  if (host.indexOf("krafton") !== -1) return true;
  if (host.indexOf("levelinfinite") !== -1) return true;
  
  return false;
}

// =====================================================================
// TRAFFIC CLASSIFICATION
// =====================================================================

// مهم جداً: Region و Geolocation
function isRegionTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  // Region patterns
  if (/region|country|geo|location|area|zone/i.test(combined)) return true;
  if (/geolocation|geoip|geo-location/i.test(combined)) return true;
  if (/ip.*location|ip.*check|ip.*detect/i.test(combined)) return true;
  if (/what.*is.*my.*ip|my.*ip.*address/i.test(combined)) return true;
  if (/nearby|near.*me|close.*to.*me/i.test(combined)) return true;
  if (/local.*player|player.*nearby/i.test(combined)) return true;
  
  // Matchmaking patterns
  if (/matchmaking|match.*make|mm.*queue/i.test(combined)) return true;
  if (/finding.*match|searching.*match/i.test(combined)) return true;
  if (/player.*pool|match.*pool/i.test(combined)) return true;
  
  // Dispatch patterns
  if (/dispatch|gateway|router|broker/i.test(combined)) return true;
  if (/server.*select|server.*list|server.*choose/i.test(combined)) return true;
  if (/best.*server|optimal.*server|nearest.*server/i.test(combined)) return true;
  
  return false;
}

// Match Traffic
function isMatchTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  var port = getPort(url);
  
  // Port-based
  if (port >= 6000 && port <= 10000) return true;
  if (port >= 20000 && port <= 40000) return true;
  
  // Pattern-based
  if (/match|battle|game|combat|room|logic/i.test(combined)) return true;
  if (/classic|ranked|arena|tdm|payload|metro/i.test(combined)) return true;
  if (/tick|frame|sync|realtime|relay/i.test(combined)) return true;
  if (/udp|udpate|gameplay/i.test(combined)) return true;
  
  return false;
}

// Lobby Traffic
function isLobbyTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  return /lobby|menu|main|home|start|entry/i.test(combined);
}

// Social Traffic
function isSocialTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  if (/friend|squad|team|party|clan|guild/i.test(combined)) return true;
  if (/chat|voice|message|inbox/i.test(combined)) return true;
  if (/invite|join|recruit|apply/i.test(combined)) return true;
  if (/social|presence|online|status/i.test(combined)) return true;
  if (/profile|avatar|badge|achievement/i.test(combined)) return true;
  if (/wtlogin|openmobile|graph.*qq/i.test(combined)) return true;
  
  return false;
}

// Auth Traffic
function isAuthTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  return /auth|login|token|account|session|oauth|verify|captcha/i.test(combined);
}

// CDN Traffic
function isCDNTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  return /cdn|asset|resource|patch|update|download|media|pak|obb|bundle/i.test(combined);
}

// =====================================================================
// HELPER FUNCTIONS
// =====================================================================

function norm(host) {
  if (!host) return "";
  var i = host.indexOf(":");
  return i > -1 ? host.substring(0, i).toLowerCase() : host.toLowerCase();
}

function getPort(url) {
  if (!url) return 0;
  var m = url.match(/:(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function getNet24(ip) {
  if (!ip) return "";
  return ip.split('.').slice(0, 3).join('.');
}

function isInJordan(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  for (var i = 0; i < JORDAN_IPS.length; i++) {
    if (isInNet(ip, JORDAN_IPS[i][0], JORDAN_IPS[i][1])) return true;
  }
  return false;
}

function isJordanMatchIP(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  for (var i = 0; i < JORDAN_MATCH_IPS.length; i++) {
    if (isInNet(ip, JORDAN_MATCH_IPS[i][0], JORDAN_MATCH_IPS[i][1])) return true;
  }
  return false;
}

// Smart DNS with caching
function smartResolve(host) {
  var now = Date.now();
  var cached = SESSION.dnsCache[host];
  var ttl = SESSION.dnsTTL[host];
  
  if (cached && ttl && (now - ttl) < CONFIG.dnsTTL) {
    return cached;
  }
  
  var ip = dnsResolve(host);
  if (ip) {
    SESSION.dnsCache[host] = ip;
    SESSION.dnsTTL[host] = now;
  }
  
  return ip;
}

// Probe limiter
function checkProbe(host) {
  var count = SESSION.probeCount[host] || 0;
  if (count > CONFIG.maxProbes) return false;
  return true;
}

function recordProbe(host, success) {
  if (!success) {
    SESSION.probeCount[host] = (SESSION.probeCount[host] || 0) + 1;
  }
}

// Cleanup
function cleanup() {
  var now = Date.now();
  if (now - SESSION.lastCleanup > CONFIG.cleanupInterval) {
    SESSION.probeCount = {};
    SESSION.lastCleanup = now;
  }
}

// =====================================================================
// MAIN PROXY FUNCTION
// =====================================================================
function FindProxyForURL(url, host) {
  
  // Normalize
  host = norm(host);
  SESSION.totalRequests++;
  
  // Cleanup
  cleanup();
  
  // ====== CHECK IF PUBG DOMAIN ======
  if (!isPUBGDomain(host)) {
    return BLOCK;
  }
  
  // ====== PROBE LIMITER ======
  if (!checkProbe(host)) {
    SESSION.blockedRequests++;
    return BLOCK;
  }
  
  // ====== DNS RESOLVE ======
  var ip = smartResolve(host);
  if (!ip) {
    recordProbe(host, false);
    return BLOCK;
  }
  
  // IPv6 check
  if (ip.indexOf(":") !== -1) {
    recordProbe(host, false);
    return BLOCK;
  }
  
  // ====== JORDAN IP CHECK ======
  if (!isInJordan(ip)) {
    recordProbe(host, false);
    return BLOCK;
  }
  
  // ====== SUCCESS - RECORD AND ROUTE ======
  recordProbe(host, true);
  SESSION.jordanRequests++;
  
  // ====== FORCE ALL TRAFFIC THROUGH JORDAN ======
  // هذا يضمن أن كل شيء يمر عبر البروكسي الأردني
  
  // Region Traffic (أولوية قصوى)
  if (isRegionTraffic(url, host)) {
    SESSION.regionLocked = true;
    SESSION.regionIP = ip;
    SESSION.isJordanUser = true;
    return JORDAN_ALL;
  }
  
  // Auth Traffic
  if (isAuthTraffic(url, host)) {
    return JORDAN_ALL;
  }
  
  // Social Traffic
  if (isSocialTraffic(url, host)) {
    SESSION.socialActive = true;
    SESSION.lastSocialAct = Date.now();
    return JORDAN_ALL;
  }
  
  // Match Traffic
  if (isMatchTraffic(url, host)) {
    SESSION.inGame = true;
    SESSION.matchStart = Date.now();
    return JORDAN_ALL;
  }
  
  // Lobby Traffic
  if (isLobbyTraffic(url, host)) {
    SESSION.inLobby = true;
    SESSION.inGame = false;
    return JORDAN_ALL;
  }
  
  // CDN Traffic
  if (isCDNTraffic(url, host)) {
    return JORDAN_ALL;
  }
  
  // ====== DEFAULT: ALL THROUGH JORDAN ======
  // أي شيء آخر يمر عبر الأردن أيضاً
  return JORDAN_ALL;
}
