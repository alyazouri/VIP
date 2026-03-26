// =====================================================================
// PUBG MOBILE - JORDAN OPTIMIZED PAC FILE v2.0
// تحسين: ping أقل، رؤية أردنيين أكثر، دومينات محدّثة 2025/2026
// =====================================================================

// ================= PROXIES =================
var P1 = "SOCKS5 46.185.131.218:20001; SOCKS 46.185.131.218:20001";
var P2 = "SOCKS5 212.35.66.45:8085;    SOCKS 212.35.66.45:8085";
var P3 = "SOCKS5 46.185.131.218:20002; SOCKS 46.185.131.218:20002";
var P4 = "SOCKS5 212.35.66.45:8086;    SOCKS 212.35.66.45:8086";

var JORDAN_CHAIN = P1 + "; " + P2 + "; " + P3 + "; " + P4 + "; DIRECT";
var MATCH_CHAIN  = P1 + "; " + P2 + "; DIRECT";
var BLOCK        = "SOCKS5 127.0.0.1:9; SOCKS 127.0.0.1:9";
var DIRECT       = "DIRECT";

// ================= DNS CACHE =================
var _dnsCache = {};
var _dnsTTL   = {};
var DNS_TTL   = 120000;

function smartResolve(host) {
  var now = Date.now();
  if (_dnsCache[host] && (now - _dnsTTL[host]) < DNS_TTL) {
    return _dnsCache[host];
  }
  var ip = dnsResolve(host);
  if (ip) { _dnsCache[host] = ip; _dnsTTL[host] = now; }
  return ip;
}

// =====================================================================
// JORDAN IP RANGES
// =====================================================================
var JORDAN_IPS = [
  // Orange Jordan
  ["46.185.0.0",    "255.255.0.0"],
  ["46.185.128.0",  "255.255.128.0"],
  ["37.123.128.0",  "255.255.128.0"],
  ["37.18.0.0",     "255.255.0.0"],
  ["37.40.0.0",     "255.255.0.0"],
  ["37.76.0.0",     "255.255.0.0"],
  ["37.208.0.0",    "255.255.0.0"],
  ["77.247.0.0",    "255.255.0.0"],
  ["80.90.0.0",     "255.255.0.0"],
  ["80.83.0.0",     "255.255.0.0"],
  ["82.212.0.0",    "255.255.0.0"],
  ["82.212.64.0",   "255.255.192.0"],
  ["82.137.0.0",    "255.255.0.0"],
  ["83.110.0.0",    "255.255.0.0"],
  ["84.18.0.0",     "255.255.0.0"],
  ["85.113.0.0",    "255.255.0.0"],
  ["85.237.0.0",    "255.255.0.0"],
  ["94.142.32.0",   "255.255.224.0"],
  ["94.249.0.0",    "255.255.0.0"],
  ["176.28.0.0",    "255.252.0.0"],
  ["176.28.128.0",  "255.255.128.0"],
  ["185.55.0.0",    "255.255.0.0"],
  ["185.84.0.0",    "255.255.0.0"],
  ["185.107.0.0",   "255.255.0.0"],
  ["185.45.0.0",    "255.255.0.0"],
  ["185.57.0.0",    "255.255.0.0"],
  ["185.69.0.0",    "255.255.0.0"],
  ["185.81.0.0",    "255.255.0.0"],
  ["185.95.0.0",    "255.255.0.0"],
  ["185.111.0.0",   "255.255.0.0"],
  ["185.133.0.0",   "255.255.0.0"],
  ["185.145.0.0",   "255.255.0.0"],
  ["185.151.0.0",   "255.255.0.0"],
  ["185.167.0.0",   "255.255.0.0"],
  ["185.179.0.0",   "255.255.0.0"],
  ["185.199.0.0",   "255.255.0.0"],
  ["185.204.0.0",   "255.255.0.0"],
  ["185.208.0.0",   "255.255.0.0"],
  ["185.221.0.0",   "255.255.0.0"],
  ["185.233.0.0",   "255.255.0.0"],
  ["185.241.0.0",   "255.255.0.0"],
  ["185.246.0.0",   "255.255.0.0"],
  ["188.68.0.0",    "255.255.0.0"],
  ["188.123.160.0", "255.255.224.0"],
  ["188.127.0.0",   "255.255.0.0"],
  ["188.247.0.0",   "255.255.0.0"],
  ["217.144.0.0",   "255.255.0.0"],
  ["217.53.0.0",    "255.255.0.0"],
  ["217.174.0.0",   "255.255.0.0"],
  ["217.196.0.0",   "255.255.0.0"],

  // Zain Jordan
  ["176.29.0.0",    "255.255.0.0"],
  ["86.108.0.0",    "255.252.0.0"],
  ["90.84.0.0",     "255.252.0.0"],
  ["31.153.0.0",    "255.255.0.0"],
  ["31.25.0.0",     "255.255.0.0"],
  ["31.47.0.0",     "255.255.0.0"],
  ["95.141.0.0",    "255.255.0.0"],
  ["95.129.0.0",    "255.255.0.0"],
  ["95.215.0.0",    "255.255.0.0"],
  ["178.20.0.0",    "255.255.0.0"],

  // Umniah
  ["109.107.0.0",   "255.255.0.0"],
  ["87.236.232.0",  "255.255.248.0"],
  ["87.238.0.0",    "255.255.0.0"],
  ["176.241.0.0",   "255.255.0.0"],
  ["178.135.0.0",   "255.255.0.0"],
  ["178.150.0.0",   "255.255.0.0"],

  // Damamax
  ["212.35.0.0",    "255.255.0.0"],
  ["213.186.32.0",  "255.255.224.0"],

  // Jordan Telecom / JTGC
  ["213.6.0.0",     "255.255.0.0"],
  ["193.188.0.0",   "255.255.0.0"],
  ["194.165.0.0",   "255.255.0.0"],
  ["194.165.128.0", "255.255.128.0"],

  // Other Jordan ISPs
  ["5.133.0.0",     "255.255.0.0"],
  ["5.134.0.0",     "255.255.0.0"],
  ["45.67.0.0",     "255.255.0.0"],
  ["46.32.0.0",     "255.255.0.0"],
  ["46.152.0.0",    "255.255.0.0"],
  ["46.235.0.0",    "255.255.0.0"],
  ["62.72.128.0",   "255.255.128.0"],
  ["62.150.0.0",    "255.255.0.0"],
  ["78.89.0.0",     "255.255.0.0"],
  ["79.134.0.0",    "255.255.0.0"],
  ["79.173.0.0",    "255.255.0.0"],
  ["81.21.64.0",    "255.255.240.0"],
  ["88.83.0.0",     "255.255.0.0"],
  ["89.28.0.0",     "255.255.0.0"],
  ["91.207.0.0",    "255.255.0.0"],
  ["91.220.0.0",    "255.255.0.0"],
  ["91.236.0.0",    "255.255.0.0"],
  ["92.62.0.0",     "255.255.0.0"],
  ["93.157.0.0",    "255.255.0.0"],
  ["93.180.0.0",    "255.255.0.0"],
  ["149.200.0.0",   "255.255.0.0"],
  ["151.249.0.0",   "255.255.0.0"],
  ["156.195.0.0",   "255.255.0.0"],
  ["168.187.0.0",   "255.255.0.0"],
  ["192.145.0.0",   "255.255.0.0"],
  ["195.14.0.0",    "255.255.0.0"],
  ["195.47.0.0",    "255.255.0.0"],
  ["195.60.0.0",    "255.255.0.0"],
  ["195.62.0.0",    "255.255.0.0"],
  ["195.82.0.0",    "255.255.0.0"],
  ["195.85.0.0",    "255.255.0.0"],
  ["195.88.0.0",    "255.255.0.0"],
  ["195.94.0.0",    "255.255.0.0"],
  ["195.110.0.0",   "255.255.0.0"],
  ["195.122.0.0",   "255.255.0.0"],
  ["195.130.0.0",   "255.255.0.0"],
  ["195.140.0.0",   "255.255.0.0"],
  ["195.189.0.0",   "255.255.0.0"],
  ["195.202.0.0",   "255.255.0.0"],
  ["195.211.0.0",   "255.255.0.0"],
  ["195.218.0.0",   "255.255.0.0"],
  ["195.225.0.0",   "255.255.0.0"],
  ["195.229.0.0",   "255.254.0.0"],
  ["195.234.0.0",   "255.255.0.0"],
  ["195.242.0.0",   "255.255.0.0"],
  ["195.250.0.0",   "255.255.0.0"],
  ["196.201.0.0",   "255.255.0.0"],
  ["212.23.0.0",    "255.255.0.0"],
  ["212.38.0.0",    "255.255.0.0"],
  ["212.72.0.0",    "255.255.0.0"],
  ["212.85.0.0",    "255.255.0.0"],
  ["212.93.0.0",    "255.255.0.0"],
  ["212.118.0.0",   "255.255.0.0"],
  ["212.150.0.0",   "255.255.0.0"],
  ["212.234.0.0",   "255.255.0.0"],
  ["213.139.0.0",   "255.255.0.0"],
  ["213.158.0.0",   "255.255.0.0"],
  ["213.181.0.0",   "255.255.0.0"],
  ["213.203.0.0",   "255.255.0.0"],
  ["213.244.0.0",   "255.255.0.0"],
  ["217.23.0.0",    "255.255.0.0"],
  ["217.29.0.0",    "255.255.0.0"]
];

function isJordanIP(ip) {
  if (!ip || ip.indexOf(":") !== -1) return false;
  for (var i = 0; i < JORDAN_IPS.length; i++) {
    if (isInNet(ip, JORDAN_IPS[i][0], JORDAN_IPS[i][1])) return true;
  }
  return false;
}

// =====================================================================
// PUBG DOMAINS - محدّث 2025/2026
// =====================================================================
function isPUBGDomain(h) {

  // PUBG / Krafton / Level Infinite
  if (shExpMatch(h, "*pubgmobile*"))       return true;
  if (shExpMatch(h, "*pubg.com"))          return true;
  if (shExpMatch(h, "*.krafton.com"))      return true;
  if (shExpMatch(h, "*.levelinfinite.com")) return true;
  if (shExpMatch(h, "*.levelinfinite.net")) return true;

  // Tencent Core
  if (shExpMatch(h, "*.tencent.com"))       return true;
  if (shExpMatch(h, "*.tencent.net"))       return true;
  if (shExpMatch(h, "*.tencentcloud.com"))  return true;
  if (shExpMatch(h, "*.tencent-cloud.net")) return true;
  if (shExpMatch(h, "*.intlgame.com"))      return true;
  if (shExpMatch(h, "*.intlgame.net"))      return true;
  if (shExpMatch(h, "*.igamecj.com"))       return true;
  if (shExpMatch(h, "*.gcloudcs.com"))      return true;
  if (shExpMatch(h, "*.qcloud.com"))        return true;
  if (shExpMatch(h, "*.myqcloud.com"))      return true;

  // QQ Services
  if (shExpMatch(h, "*.qq.com"))            return true;
  if (shExpMatch(h, "*.qq.net"))            return true;
  if (shExpMatch(h, "*.qpic.cn"))           return true;
  if (shExpMatch(h, "*.gtimg.com"))         return true;
  if (shExpMatch(h, "*.gtimg.cn"))          return true;
  if (shExpMatch(h, "*.idqqimg.com"))       return true;
  if (shExpMatch(h, "*.qlogo.cn"))          return true;

  // Auth / Login
  if (shExpMatch(h, "*.wtlogin.qq.com"))    return true;
  if (shExpMatch(h, "*.openmobile.qq.com")) return true;
  if (shExpMatch(h, "*.ssl.qq.com"))        return true;
  if (shExpMatch(h, "*.graph.qq.com"))      return true;
  if (shExpMatch(h, "*.ptlogin2.qq.com"))   return true;
  if (shExpMatch(h, "*.xui.qq.com"))        return true;

  // Social / Friends
  if (shExpMatch(h, "*.friend.qq.com"))     return true;
  if (shExpMatch(h, "*.friends.qq.com"))    return true;
  if (shExpMatch(h, "*.idip.qq.com"))       return true;

  // Middle East / Region servers
  if (shExpMatch(h, "*middleeast*"))        return true;
  if (shExpMatch(h, "*me.tencent*"))        return true;
  if (shExpMatch(h, "*me.qq*"))             return true;
  if (shExpMatch(h, "*dispatch*"))          return true;
  if (shExpMatch(h, "*gateway*tencent*"))   return true;

  // CDN
  if (shExpMatch(h, "*.cloudfront.net"))    return true;
  if (shExpMatch(h, "*.amazonaws.com"))     return true;
  if (shExpMatch(h, "*.akamaized.net"))     return true;
  if (shExpMatch(h, "*.akamai.net"))        return true;
  if (shExpMatch(h, "*.fastly.net"))        return true;
  if (shExpMatch(h, "*.dnspod.net"))        return true;
  if (shExpMatch(h, "*.dns.qq.com"))        return true;

  // Analytics / Anti-cheat (لا تبلوك هذي أو اللعبة تواجه مشاكل)
  if (shExpMatch(h, "*.beacon.qq.com"))     return true;
  if (shExpMatch(h, "*.bugly.qq.com"))      return true;
  if (shExpMatch(h, "*.report.qq.com"))     return true;
  if (shExpMatch(h, "*.pingma.qq.com"))     return true;
  if (shExpMatch(h, "*.trace.qq.com"))      return true;

  // WeChat login
  if (shExpMatch(h, "*.wechat.com"))        return true;
  if (shExpMatch(h, "*.weixin.com"))        return true;
  if (shExpMatch(h, "*.wechatapp.com"))     return true;

  // Payment
  if (shExpMatch(h, "*.pay.qq.com"))        return true;
  if (shExpMatch(h, "*.midas.qq.com"))      return true;
  if (shExpMatch(h, "*.event.qq.com"))      return true;

  // PlayFab
  if (shExpMatch(h, "*.playfab.com"))       return true;
  if (shExpMatch(h, "*.playfabapi.com"))    return true;

  // Discord
  if (shExpMatch(h, "*.discord.com"))       return true;
  if (shExpMatch(h, "*.discordapp.com"))    return true;
  if (shExpMatch(h, "*.discord.gg"))        return true;

  // Xbox / Microsoft (تسجيل دخول)
  if (shExpMatch(h, "*.xboxlive.com"))      return true;
  if (shExpMatch(h, "*.xbox.com"))          return true;

  // GameLoop Emulator
  if (shExpMatch(h, "*.gameloop.com"))      return true;
  if (shExpMatch(h, "*.tencentgamerbuddy.com")) return true;

  return false;
}

// =====================================================================
// TRAFFIC CLASSIFICATION
// =====================================================================

// Matchmaking = أهم خطوة لتحديد المنطقة
function isMatchmakingTraffic(url, h) {
  var c = (url + " " + h).toLowerCase();
  if (/dispatch|matchmak|gateway|region|geo|country|zone/.test(c)) return true;
  if (/middleeast|me[\-\.]server|me\.qq|me\.tencent/.test(c))      return true;
  if (/server[\-\.]?select|server[\-\.]?list|nearest[\-\.]?server/.test(c)) return true;
  if (/player[\-\.]?pool|match[\-\.]?pool|find[\-\.]?match/.test(c)) return true;
  return false;
}

// ماتش مباشر = أسرع مسار
function isMatchTraffic(url, h) {
  var c   = (url + " " + h).toLowerCase();
  var port = 0;
  var m   = url.match(/:(\d+)/);
  if (m) port = parseInt(m[1], 10);

  // PUBG game UDP ports
  if (port >= 6000  && port <= 6200)  return true;
  if (port >= 8000  && port <= 8100)  return true;
  if (port >= 10000 && port <= 10200) return true;
  if (port >= 17000 && port <= 17500) return true;
  if (port >= 20000 && port <= 20500) return true;

  if (/\b(match|battle|game|combat|room|logic|relay|tick|sync|realtime)\b/.test(c)) return true;
  if (/\b(classic|ranked|tdm|metro|arena|payload|erangel|miramar)\b/.test(c))       return true;
  return false;
}

// CDN / Assets = أسرع مباشرة
function isCDNTraffic(url, h) {
  var c = (url + " " + h).toLowerCase();
  return /cdn|asset|patch|update|download|\.pak|\.obb|\.bundle|\.zip|media/.test(c);
}

// Auth
function isAuthTraffic(url, h) {
  var c = (url + " " + h).toLowerCase();
  return /auth|login|token|account|session|oauth|verify|captcha/.test(c);
}

// Social
function isSocialTraffic(url, h) {
  var c = (url + " " + h).toLowerCase();
  return /friend|squad|team|party|clan|chat|voice|invite|social|presence|profile/.test(c);
}

// =====================================================================
// MAIN PROXY FUNCTION
// =====================================================================
function FindProxyForURL(url, host) {

  // Normalize host
  host = host.toLowerCase();
  var colon = host.indexOf(":");
  if (colon > -1) host = host.substring(0, colon);

  // ====== 1. فقط دومينات PUBG ======
  if (!isPUBGDomain(host)) {
    return BLOCK;
  }

  // ====== 2. DNS Resolve ======
  var ip = smartResolve(host);

  // لو DNS فشل، لا تبلوك — جرّب البروكسي
  if (!ip) return JORDAN_CHAIN;

  // IPv6 = بلوك
  if (ip.indexOf(":") !== -1) return BLOCK;

  // ====== 3. Matchmaking (أولوية قصوى - يحدد منطقتك) ======
  // يجب أن يمر عبر البروكسي الأردني دائماً
  if (isMatchmakingTraffic(url, host)) {
    return JORDAN_CHAIN;
  }

  // ====== 4. Auth / Login ======
  if (isAuthTraffic(url, host)) {
    return JORDAN_CHAIN;
  }

  // ====== 5. Social / Friends ======
  if (isSocialTraffic(url, host)) {
    return JORDAN_CHAIN;
  }

  // ====== 6. ماتش مباشر = أسرع مسار لتقليل الـ ping ======
  if (isMatchTraffic(url, host)) {
    return MATCH_CHAIN;
  }

  // ====== 7. CDN / Assets = مباشر (أسرع للتحميل) ======
  if (isCDNTraffic(url, host)) {
    return DIRECT;
  }

  // ====== 8. IP أردني مؤكد = مباشر (أسرع) ======
  if (isJordanIP(ip)) {
    return DIRECT;
  }

  // ====== 9. Default: كل شيء ثاني عبر الأردن ======
  return JORDAN_CHAIN;
}
