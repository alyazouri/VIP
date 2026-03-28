// ================= PROXIES =================
var MATCH_JO_PRIMARY   = "PROXY 46.185.131.218:20001";
var MATCH_JO_SECONDARY = "PROXY 46.185.131.219:20001"; // Failover للمباريات
var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 176.29.153.95:9030",
  "PROXY 46.185.131.218:20002"  // مسار ثالث للـ Lobby
];
var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN IPv4 RANGES (موسّعة) =================
var JORDAN_IPV4 = [
  // --- نطاقات ISPs الرئيسية ---
  ["91.106.96.0",   "255.255.240.0"],   // /20 Orange JO
  ["176.28.128.0",  "255.255.128.0"],   // /17 Orange JO
  ["82.212.64.0",   "255.255.192.0"],   // /18 Zain JO
  ["37.202.64.0",   "255.255.192.0"],   // /18 Zain JO
  ["94.249.0.0",    "255.255.128.0"],   // /17 Zain JO
  ["149.200.128.0", "255.255.128.0"],   // /17 Umniah
  ["178.77.128.0",  "255.255.192.0"],   // /18 Umniah
  ["37.152.0.0",    "255.255.248.0"],   // /21 Umniah
  ["37.220.112.0",  "255.255.240.0"],   // /20
  ["46.185.128.0",  "255.255.128.0"],   // /17
  ["92.253.0.0",    "255.255.128.0"],   // /17
  ["95.172.192.0",  "255.255.224.0"],   // /19
  ["188.247.64.0",  "255.255.224.0"],   // /19
  // --- نطاقات إضافية ---
  ["109.224.0.0",   "255.240.0.0"],     // /12 — RIPE JO block كبير
  ["212.35.64.0",   "255.255.192.0"],   // /18 Jordan Telecom
  ["77.69.0.0",     "255.255.128.0"],   // /17 Orange extra
  ["87.101.128.0",  "255.255.128.0"],   // /17 Batelco JO
  ["185.16.72.0",   "255.255.252.0"],   // /22 صغير لكن نشط
  ["185.95.216.0",  "255.255.252.0"],   // /22
  ["185.121.160.0", "255.255.224.0"],   // /19
  ["194.9.40.0",    "255.255.252.0"],   // /22 JPMC
  ["217.144.96.0",  "255.255.224.0"],   // /19
  ["62.3.3.0",      "255.255.255.0"],   // /24 Batelco small
  ["37.48.96.0",    "255.255.224.0"],   // /19 Zain extra
  ["5.21.0.0",      "255.255.0.0"],     // /16 MOT JO
  ["37.98.192.0",   "255.255.192.0"]    // /18 added
];

// ================= JORDAN IPv6 PREFIXES (موسّعة) =================
var JORDAN_IPV6 = [
  "2a00:18d0",   // Zain JO /32
  "2a00:18d8",   // Zain JO /29
  "2a01:9700",   // Orange JO /29
  "2a02:c040",   // Umniah /29
  "2a05:74c0",   // /29
  "2a04:2e00",   // Jordan Telecom extra
  "2a06:8ec0",   // ISP block JO
  "2001:41f0"    // Academic/Gov JO
];

// ================= خوادم PUBG الأردنية / الإقليمية المعروفة مسبقاً =================
// Fast Path: تجاوز DNS lookup لهذه المضيفات مباشرةً إلى MATCH proxy
var KNOWN_JO_GAME_HOSTS = [
  "46.185.131",   // prefix IP مطابقة مباشرة
  "176.29.153",
  "212.35.66"
];

// ================= SESSION =================
var SESSION = {
  matchNet:       null,
  matchHost:      null,
  matchIP:        null,
  isV6:           false,
  dnsCache:       {},
  lobbyIndex:     0,         // Round-Robin pointer
  matchFailCount: 0,         // عداد إخفاقات MATCH proxy
  lastMatchTime:  0,         // timestamp لإعادة التهيئة
  warmupDone:     false      // هل تمت عملية الـ Warm-up
};

var SESSION_TIMEOUT_MS = 300000; // إعادة تهيئة الجلسة بعد 5 دقائق انقطاع

// ================= HELPERS =================

function norm(h) {
  var colons = 0, last = -1;
  for (var i = 0; i < h.length; i++) {
    if (h[i] === ":") { colons++; last = i; }
  }
  return (colons === 1) ? h.substring(0, last) : h;
}

function isIPv6(ip) {
  return ip.indexOf(":") > -1;
}

function inV4List(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function inV6List(ip, prefixes) {
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.indexOf(prefixes[i]) === 0) return true;
  }
  return false;
}

// Fast Path: هل IP ينتمي للمضيفات الأردنية المعروفة مسبقاً؟
function isKnownJoHost(host) {
  for (var i = 0; i < KNOWN_JO_GAME_HOSTS.length; i++) {
    if (host.indexOf(KNOWN_JO_GAME_HOSTS[i]) !== -1) return true;
  }
  return false;
}

function resolveAll(host) {
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ips = [];
  try {
    if (typeof dnsResolveEx === "function") {
      var ex = dnsResolveEx(host);
      if (ex) {
        var parts = ex.split(";");
        for (var i = 0; i < parts.length; i++) {
          var p = parts[i].trim();
          if (p && ips.indexOf(p) === -1) ips.push(p);
        }
      }
    }
  } catch (e) {}
  try {
    if (typeof dnsResolve === "function") {
      var v4 = dnsResolve(host);
      if (v4 && ips.indexOf(v4) === -1) ips.push(v4);
    }
  } catch (e) {}
  if (ips.length > 0) SESSION.dnsCache[host] = ips;
  return ips;
}

function findJordanIP(ips) {
  for (var i = 0; i < ips.length; i++) {
    var ip = ips[i];
    if (isIPv6(ip)) {
      if (inV6List(ip, JORDAN_IPV6)) return ip;
    } else {
      if (inV4List(ip, JORDAN_IPV4)) return ip;
    }
  }
  return null;
}

function netPrefix(ip) {
  if (isIPv6(ip)) return ip.split(":").slice(0, 3).join(":");
  return ip.split(".").slice(0, 3).join(".");
}

// ─── Round-Robin للـ Lobby Pool ──────────────────────────────
function nextLobbyProxy() {
  var proxy = LOBBY_POOL[SESSION.lobbyIndex % LOBBY_POOL.length];
  SESSION.lobbyIndex++;
  return proxy;
}

// ─── اختيار Match Proxy مع Failover ─────────────────────────
function matchProxy() {
  // بعد 3 إخفاقات متتالية → تبديل للـ Secondary
  if (SESSION.matchFailCount >= 3) return MATCH_JO_SECONDARY;
  return MATCH_JO_PRIMARY;
}

// ─── إعادة تهيئة الجلسة عند انقطاع طويل ─────────────────────
function checkSessionExpiry(now) {
  if (SESSION.matchNet && SESSION.lastMatchTime > 0) {
    if ((now - SESSION.lastMatchTime) > SESSION_TIMEOUT_MS) {
      SESSION.matchNet       = null;
      SESSION.matchHost      = null;
      SESSION.matchIP        = null;
      SESSION.isV6           = false;
      SESSION.matchFailCount = 0;
      SESSION.warmupDone     = false;
    }
  }
}

// ================= TRAFFIC DETECTION =================

function isPUBG(h) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames|garena/i
    .test(h);
}

function isMatchTraffic(u, h) {
  return /(udp|tick|ticks|sync|realtime|battle|combat|match|game|room|session|state|frame|physics|movement|shoot|fire|hit|damage|relay|turn|stun|dtls|rtp|srtp)/i
    .test(u + h);
}

function isLobby(u, h) {
  return /(lobby|matchmaking|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry|roster|bracket|rank|rating|mmr|elo|pool|slot|seat|capacity|available)/i
    .test(u + h);
}

function isSocial(u, h) {
  return /(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper|notify|push|alert|broadcast)/i
    .test(u + h);
}

function isCDN(u, h) {
  return /(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest|version|config)/i
    .test(u + h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  if (!isPUBG(host)) return DIRECT;

  // ─── Fast Path: مضيف أردني معروف → توجيه مباشر ──────────
  if (isKnownJoHost(host)) {
    if (isMatchTraffic(url, host)) {
      SESSION.lastMatchTime = Date.now ? Date.now() : 0;
      return matchProxy();
    }
    return nextLobbyProxy();
  }

  // ─── حل DNS ───────────────────────────────────────────────
  var ips = resolveAll(host);
  if (!ips || ips.length === 0) return BLOCK;

  // ─── MATCH / UDP — قفل صارم مع Failover ──────────────────
  if (isMatchTraffic(url, host)) {

    var now = Date.now ? Date.now() : 0;
    checkSessionExpiry(now);

    var matchIP = findJordanIP(ips);
    if (!matchIP) {
      SESSION.matchFailCount++;
      return BLOCK;
    }

    var net = netPrefix(matchIP);

    if (!SESSION.matchNet) {
      SESSION.matchNet       = net;
      SESSION.matchHost      = host;
      SESSION.matchIP        = matchIP;
      SESSION.isV6           = isIPv6(matchIP);
      SESSION.matchFailCount = 0;
      SESSION.warmupDone     = true;
    }

    // Ultra-lock: أي انحراف = حجب فوري
    if (host    !== SESSION.matchHost) { SESSION.matchFailCount++; return BLOCK; }
    if (net     !== SESSION.matchNet)  { SESSION.matchFailCount++; return BLOCK; }
    if (matchIP !== SESSION.matchIP)   { SESSION.matchFailCount++; return BLOCK; }

    SESSION.lastMatchTime  = now;
    SESSION.matchFailCount = 0;
    return matchProxy();
  }

  // ─── LOBBY — Round-Robin عبر Pool ────────────────────────
  if (isLobby(url, host)) {
    if (!findJordanIP(ips)) return BLOCK;
    return nextLobbyProxy();  // توزيع الحمل لتسريع المطابقة
  }

  // ─── SOCIAL ───────────────────────────────────────────────
  if (isSocial(url, host)) {
    if (!findJordanIP(ips)) return BLOCK;
    return nextLobbyProxy();
  }

  // ─── CDN / Assets — مباشر لتوفير باندويدث البروكسي ───────
  if (isCDN(url, host)) {
    return DIRECT; // التحديثات لا تحتاج proxy أردني
  }

  return BLOCK;
}
