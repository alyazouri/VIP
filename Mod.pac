// ================= PROXIES =================
var MATCH_JO   = "PROXY 46.185.131.218:20001";
var LOBBY_POOL = ["PROXY 212.35.66.45:8085", "PROXY 176.29.153.95:9030"];
var BLOCK      = "PROXY 127.0.0.1:9";
var DIRECT     = "DIRECT";

// ================= JORDAN IPv4 RANGES =================
var JORDAN_IPV4 = [
  ["91.106.96.0",   "255.255.240.0"],   // /20 — يشمل 91.106.109.x
  ["176.28.128.0",  "255.255.128.0"],   // /17
  ["82.212.64.0",   "255.255.192.0"],   // /18
  ["37.202.64.0",   "255.255.192.0"],   // /18
  ["94.249.0.0",    "255.255.128.0"],   // /17
  ["149.200.128.0", "255.255.128.0"],   // /17
  ["178.77.128.0",  "255.255.192.0"],   // /18
  ["37.152.0.0",    "255.255.248.0"],   // /21
  ["37.220.112.0",  "255.255.240.0"],   // /20
  ["46.185.128.0",  "255.255.128.0"],   // /17
  ["92.253.0.0",    "255.255.128.0"],   // /17
  ["95.172.192.0",  "255.255.224.0"],   // /19
  ["188.247.64.0",  "255.255.224.0"]    // /19
];

// ================= JORDAN IPv6 PREFIXES =================
// مطابقة prefix أول 32 بت (مجموعتان سداسيتان)
var JORDAN_IPV6 = [
  "2a00:18d0",   // Zain JO — /32
  "2a00:18d8",   // Zain JO — /29
  "2a01:9700",   // /29
  "2a02:c040",   // /29
  "2a05:74c0"    // /29
];

// ================= SESSION =================
var SESSION = {
  matchNet:  null,
  matchHost: null,
  matchIP:   null,
  isV6:      false,
  dnsCache:  {}
};

// ================= HELPERS =================

// إزالة المنفذ من الهوست مع الحفاظ على IPv6 (يحتوي نقطتين متعددة)
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

// مطابقة IPv4 عبر isInNet() الأصلية
function inV4List(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

// مطابقة IPv6 عبر prefix string (تعمل مع /32 و /29)
function inV6List(ip, prefixes) {
  var low = ip.toLowerCase();
  for (var i = 0; i < prefixes.length; i++) {
    if (low.indexOf(prefixes[i]) === 0) return true;
  }
  return false;
}

// حل DNS مع دعم IPv6 عبر dnsResolveEx ثم fallback لـ dnsResolve
function resolveAll(host) {
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];

  var ips = [];

  // dnsResolveEx: يعيد قائمة مفصولة بـ ";" تحتوي IPv4 + IPv6 (Chrome/Windows)
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

  // dnsResolve: fallback للبيئات القديمة (Firefox) — IPv4 فقط
  try {
    if (typeof dnsResolve === "function") {
      var v4 = dnsResolve(host);
      if (v4 && ips.indexOf(v4) === -1) ips.push(v4);
    }
  } catch (e) {}

  if (ips.length > 0) SESSION.dnsCache[host] = ips;
  return ips;
}

// إيجاد أول IP أردني (IPv4 أو IPv6) من قائمة العناوين المُحلَّلة
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

// استخراج بادئة الشبكة لقفل الجلسة:
// IPv4 → /24 (أول 3 أوكتيت) | IPv6 → /48 (أول 3 مجموعات)
function netPrefix(ip) {
  if (isIPv6(ip)) return ip.split(":").slice(0, 3).join(":");
  return ip.split(".").slice(0, 3).join(".");
}

// ================= TRAFFIC DETECTION =================
function isPUBG(h) {
  return /pubg|pubgm|pubgmobile|tencent|krafton|lightspeed|levelinfinite|igamecj|proximabeta|vnggames/i
    .test(h);
}
function isMatchTraffic(u, h) {
  return /(udp|tick|ticks|sync|realtime|battle|combat|match|game|room|session|state|frame|physics|movement|shoot|fire|hit|damage)/i
    .test(u + h);
}
function isLobby(u, h) {
  return /(lobby|matchmaking|queue|dispatch|gateway|region|zone|join|recruit|pair|assign|entry)/i
    .test(u + h);
}
function isSocial(u, h) {
  return /(friend|invite|squad|team|party|clan|presence|social|voice|mic|talk|chat|whisper)/i
    .test(u + h);
}
function isCDN(u, h) {
  return /(cdn|asset|resource|static|media|content|patch|update|download|bundle|pak|obb|manifest)/i
    .test(u + h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // تجاهل كل ما ليس PUBG
  if (!isPUBG(host)) return DIRECT;

  // حل DNS (IPv4 + IPv6)
  var ips = resolveAll(host);
  if (!ips || ips.length === 0) return BLOCK;

  // ─── MATCH / UDP — قفل صارم ───────────────────────────
  if (isMatchTraffic(url, host)) {

    var matchIP = findJordanIP(ips);
    if (!matchIP) return BLOCK;

    var net = netPrefix(matchIP);

    if (!SESSION.matchNet) {
      // تأسيس الجلسة عند أول اتصال
      SESSION.matchNet  = net;
      SESSION.matchHost = host;
      SESSION.matchIP   = matchIP;
      SESSION.isV6      = isIPv6(matchIP);
      return MATCH_JO;
    }

    // Ultra-lock: أي انحراف = حجب فوري
    if (host    !== SESSION.matchHost) return BLOCK;
    if (net     !== SESSION.matchNet)  return BLOCK;
    if (matchIP !== SESSION.matchIP)   return BLOCK;

    return MATCH_JO;
  }

  // ─── LOBBY / SOCIAL / CDN ─────────────────────────────
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    if (!findJordanIP(ips)) return BLOCK;
    return LOBBY_POOL[0];
  }

  return BLOCK;
}
