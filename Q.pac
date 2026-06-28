// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 46.185.131.218:80",
  "PROXY 46.185.131.218:443",
  "PROXY 80.91.64.202:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH (IPV4) — نطاقات أردنية بحتة، مسار شرق أوسطي =================
// المصدر: ScaniteX + RIPE NCC allocations لـ JO
var JORDAN_MATCH_IPV4 = [
  // ── مزودو الخدمة الرئيسيون (Tier 1 - مسار مباشر عمّان) ──
  ["46.185.128.0",  "255.255.128.0"],   // /17 — Zain JO (AS48832) ⭐ الأفضل
  ["82.212.64.0",   "255.255.192.0"],   // /18 — Orange JO (AS8697)
  ["94.249.0.0",    "255.255.128.0"],   // /17 — Umniah (AS9038)
  ["176.29.0.0",    "255.255.0.0"],     // /16 — Zain JO
  ["176.28.128.0",  "255.255.128.0"],   // /17 — Zain JO
  ["213.6.0.0",     "255.255.0.0"],     // /16 — Jordan Telecom Group
  ["62.72.160.0",   "255.255.224.0"],   // /19 — VTEL JO

  // ── نطاقات أردنية إضافية (Tier 2 - تعبر عمّان/الشرق الأوسط) ──
  ["37.44.32.0",    "255.255.248.0"],   // /21 — JO allocated
  ["37.75.144.0",   "255.255.248.0"],   // /21 — JO allocated
  ["37.123.64.0",   "255.255.224.0"],   // /19 — JO allocated
  ["37.152.0.0",    "255.255.248.0"],   // /21 — JO allocated
  ["37.202.64.0",   "255.255.192.0"],   // /18 — JO allocated
  ["37.220.112.0",  "255.255.240.0"],   // /20 — JO allocated
  ["37.17.192.0",   "255.255.240.0"],   // /20 — JO allocated
  ["46.23.112.0",   "255.255.240.0"],   // /20 — JO allocated
  ["46.32.96.0",    "255.255.224.0"],   // /19 — JO allocated
  ["46.248.192.0",  "255.255.224.0"],   // /19 — JO allocated
  ["77.245.0.0",    "255.255.240.0"],   // /20 — JO allocated
  ["79.134.128.0",  "255.255.224.0"],   // /19 — JO allocated
  ["80.90.160.0",   "255.255.224.0"],   // /19 — JO allocated
  ["80.91.64.0",    "255.255.224.0"],   // /19 — JO allocated
  ["81.28.16.0",    "255.255.240.0"],   // /20 — JO allocated
  ["85.115.64.0",   "255.255.224.0"],   // /19 — JO allocated
  ["86.108.0.0",    "255.255.0.0"],     // /16 — Orange JO
  ["178.248.0.0",   "255.255.192.0"],   // /18 — JO allocated
  ["185.76.104.0",  "255.255.252.0"],   // /22 — JO allocated
  ["188.247.0.0",   "255.255.192.0"],   // /18 — JO allocated
  ["188.71.0.0",    "255.255.192.0"],   // /18 — JO allocated
  ["193.188.64.0",  "255.255.224.0"],   // /19 — JO allocated
  ["194.165.128.0", "255.255.192.0"],   // /18 — JO allocated
  ["195.210.48.0",  "255.255.240.0"],   // /20 — JO allocated
  ["212.118.0.0",   "255.255.192.0"],   // /18 — JO allocated
  ["217.144.0.0",   "255.255.192.0"],   // /18 — JO allocated

  // ── نطاقات صغيرة مؤكدة أردنياً ──
  ["2.59.52.0",     "255.255.252.0"],   // /22 — JO
  ["5.45.128.0",    "255.255.240.0"],   // /20 — JO
  ["5.198.240.0",   "255.255.248.0"],   // /21 — JO
  ["5.199.184.0",   "255.255.252.0"],   // /22 — JO
  ["45.142.196.0",  "255.255.252.0"]    // /22 — JO
];

// ================= JORDAN WIDE (IPV4) — نفس القائمة للتغطية الكاملة =================
var JORDAN_WIDE_IPV4 = JORDAN_MATCH_IPV4;

// ================= JORDAN MATCH (IPV6) — نطاقات أردنية محدثة =================
var JORDAN_MATCH_IPV6 = [
  // ── نطاقات /29 (كبيرة - مشغلون رئيسيون) ──
  "2a02:9c0::/29",    // Zain JO
  "2a01:1d0::/29",    // Orange JO
  "2a02:c040::/29",   // Umniah
  "2a01:9700::/29",   // JO allocated
  "2a01:e240::/29",   // JO allocated
  "2a01:ee40::/29",   // JO allocated
  "2a02:2558::/29",   // JO allocated
  "2a02:e680::/29",   // JO allocated
  "2a02:f0c0::/29",   // JO allocated
  "2a03:6b00::/29",   // JO allocated

  // ── نطاقات /32 (معيارية) ──
  "2a00:76e0::/32",   // JO allocated
  "2a00:18d0::/32",   // JO allocated
  "2a00:4620::/32",   // JO allocated
  "2a00:b860::/32",   // JO allocated
  "2a00:caa0::/32",   // JO allocated
  "2a02:25d8::/32",   // JO allocated
  "2a02:5b60::/32",   // JO allocated
  "2a03:6d00::/32",   // JO allocated

  // ── نطاقات أخرى ──
  "2a00:18d8::/29",   // JO allocated
  "2001:32c0::/29"    // JO allocated
];

// ================= JORDAN WIDE (IPV6) =================
var JORDAN_WIDE_IPV6 = JORDAN_MATCH_IPV6;

// ================= BLACKLIST IPV4 — حظر مناطق بعيدة (أوروبا، آسيا البعيدة، إلخ) =================
var GEO_BLACKLIST = [
  // ── أوروبا الغربية / الشمالية ──
  ["5.0.0.0",     "255.0.0.0"],
  ["31.128.0.0",  "255.192.0.0"],
  ["46.16.0.0",   "255.240.0.0"],
  ["50.0.0.0",    "255.0.0.0"],
  ["51.0.0.0",    "255.0.0.0"],
  ["52.0.0.0",    "255.0.0.0"],      // AWS أوروبا
  ["95.24.0.0",   "255.248.0.0"],
  ["104.0.0.0",   "255.0.0.0"],      // Cloudflare / أمريكا
  ["178.64.0.0",  "255.192.0.0"],

  // ── شرق آسيا / الصين / الهند ──
  ["1.0.0.0",     "255.0.0.0"],
  ["14.0.0.0",    "255.0.0.0"],
  ["27.0.0.0",    "255.0.0.0"],
  ["36.0.0.0",    "255.0.0.0"],
  ["39.0.0.0",    "255.0.0.0"],
  ["42.0.0.0",    "255.0.0.0"],
  ["49.0.0.0",    "255.0.0.0"],
  ["58.0.0.0",    "255.0.0.0"],
  ["59.0.0.0",    "255.0.0.0"],
  ["60.0.0.0",    "255.0.0.0"],
  ["61.0.0.0",    "255.0.0.0"],
  ["101.0.0.0",   "255.0.0.0"],
  ["103.0.0.0",   "255.0.0.0"],
  ["106.0.0.0",   "255.0.0.0"],
  ["110.0.0.0",   "255.0.0.0"],
  ["111.0.0.0",   "255.0.0.0"],
  ["112.0.0.0",   "255.0.0.0"],
  ["113.0.0.0",   "255.0.0.0"],
  ["114.0.0.0",   "255.0.0.0"],
  ["115.0.0.0",   "255.0.0.0"],
  ["116.0.0.0",   "255.0.0.0"],
  ["117.0.0.0",   "255.0.0.0"],
  ["118.0.0.0",   "255.0.0.0"],
  ["119.0.0.0",   "255.0.0.0"],
  ["120.0.0.0",   "255.0.0.0"],
  ["121.0.0.0",   "255.0.0.0"],
  ["122.0.0.0",   "255.0.0.0"],
  ["123.0.0.0",   "255.0.0.0"],
  ["124.0.0.0",   "255.0.0.0"],
  ["125.0.0.0",   "255.0.0.0"],

  // ── أمريكا الجنوبية / أفريقيا البعيدة ──
  ["177.0.0.0",   "255.0.0.0"],
  ["179.0.0.0",   "255.0.0.0"],
  ["181.0.0.0",   "255.0.0.0"],
  ["186.0.0.0",   "255.0.0.0"],
  ["187.0.0.0",   "255.0.0.0"],
  ["189.0.0.0",   "255.0.0.0"],
  ["190.0.0.0",   "255.0.0.0"],
  ["191.0.0.0",   "255.0.0.0"],
  ["200.0.0.0",   "255.0.0.0"],
  ["201.0.0.0",   "255.0.0.0"]
];

// ================= SESSION & CACHE =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isIPv6(ip){
  return ip && ip.indexOf(":") !== -1;
}

function isInList(ip, list){
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function isInIPv6List(ip, list){
  if (typeof isInNetEx === 'undefined') return false;
  for (var i = 0; i < list.length; i++) {
    if (isInNetEx(ip, list[i])) return true;
  }
  return false;
}

function ipv6Net48(ip){
  return ip.split(":").slice(0,3).join(":");
}

// ✅ Smart DNS Resolver with 5-min Cache
function resolvePinned(host){
  var now = Date.now();
  if (SESSION.dnsCache[host] && (now - SESSION.dnsCache[host].time < 300000)) {
    return SESSION.dnsCache[host].ip;
  }

  var ip = null;
  try {
    var rawIp = (typeof dnsResolveEx !== 'undefined') ? dnsResolveEx(host) : dnsResolve(host);
    if (rawIp) {
      var ips = rawIp.split(';');
      ip = ips.find(function(x){ return x.indexOf(':') === -1; }) || ips[0];
    }
  } catch(e) {}

  if (ip) {
    SESSION.dnsCache[host] = { ip: ip, time: now };
  }
  return ip;
}

function pickLobbyProxy(host){
  var h = 0;
  for (var i = 0; i < host.length; i++) h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

// ================= DETECTION (Optimized) =================
var REGEX_PUBG = /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i;
var REGEX_MATCH = /match|battle|game|combat|realtime|sync|udp|tick|room/i;
var REGEX_LOBBY = /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|Find|Quick|Hub|Team/i;
var REGEX_SOCIAL = /friend|invite|squad|party|clan|presence|social/i;
var REGEX_CDN = /cdn|asset|resource|patch|update|media|content/i;

function isPUBG(h){ return REGEX_PUBG.test(h); }
function isMatch(u,h){ return REGEX_MATCH.test(u+h); }
function isLobby(u,h){ return REGEX_LOBBY.test(u+h); }
function isSocial(u,h){ return REGEX_SOCIAL.test(u+h); }
function isCDN(u,h){ return REGEX_CDN.test(u+h); }

// ================= MAIN =================
function FindProxyForURL(url, host) {
  host = norm(host.toLowerCase());

  // 1. تصفية سريعة للحركة غير المتعلقة باللعبة
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip) return BLOCK;

  // ================= IPV6 (STRICT /48) =================
  if (isIPv6(ip)) {
    if (isMatch(url, host)) {
      if (!isInIPv6List(ip, JORDAN_MATCH_IPV6)) return BLOCK;

      var net = ipv6Net48(ip);
      if (!SESSION.matchNet) {
        SESSION.matchNet = net;
        SESSION.matchHost = host;
        return MATCH_JO;
      }
      if (net !== SESSION.matchNet) return BLOCK;
      return MATCH_JO;
    }

    if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
      if (!isInIPv6List(ip, JORDAN_WIDE_IPV6)) return BLOCK;
      return pickLobbyProxy(host);
    }
    return pickLobbyProxy(host);
  }

  // ================= IPV4 =================
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  if (isMatch(url, host)) {
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }
    if (net24 !== SESSION.matchNet) return BLOCK;
    return MATCH_JO;
  }

  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  return pickLobbyProxy(host);
}
