// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH (STRONG) =================
// نطاقات قوية مؤكدة لـ Orange/Umniah/Zain - خوادم اللعبة
var JORDAN_MATCH_IPV4 = [
  ["46.185.128.0","255.255.128.0"],  // Orange JO - core
  ["82.212.64.0", "255.255.192.0"],  // Orange JO
  ["94.249.0.0",  "255.255.128.0"],  // Zain JO
  ["176.29.0.0",  "255.255.0.0"],    // Umniah
  ["176.28.128.0","255.255.128.0"],  // Umniah alt
  ["213.6.0.0",   "255.255.0.0"],    // Orange JO legacy
  ["212.35.64.0", "255.255.192.0"],  // Batelco/proxy range
  ["188.123.160.0","255.255.224.0"]  // Jordan Telecom
];

// ================= JORDAN WIDE (LOBBY) =================
// نطاقات أوسع تشمل كل ISPs الأردنية
var JORDAN_WIDE_IPV4 = [
  ["46.185.0.0",  "255.255.0.0"],    // Orange JO
  ["82.212.0.0",  "255.255.0.0"],    // Orange JO wide
  ["94.249.0.0",  "255.255.0.0"],    // Zain JO
  ["176.28.0.0",  "255.252.0.0"],    // Umniah block (/14)
  ["176.29.0.0",  "255.255.0.0"],    // Umniah
  ["109.107.0.0", "255.255.0.0"],    // Damamax
  ["31.153.0.0",  "255.255.0.0"],    // Jordan Data
  ["188.123.160.0","255.255.224.0"], // Jordan Telecom
  ["212.35.0.0",  "255.255.0.0"],    // Batelco JO
  ["213.6.0.0",   "255.255.0.0"],    // Orange JO legacy
  ["185.107.0.0", "255.255.0.0"],    // VTEL
  ["195.229.0.0", "255.254.0.0"],    // Zain wide
  ["37.98.0.0",   "255.255.0.0"],    // Umniah mobile
  ["37.99.0.0",   "255.255.0.0"],    // Umniah mobile alt
  ["5.29.0.0",    "255.255.0.0"],    // Orange JO mobile
  ["91.156.0.0",  "255.255.0.0"],    // Jordan ISP
  ["217.144.80.0","255.255.240.0"]   // Petra Eng. University / gov
];

// ================= BLACKLIST: دقيقة وآمنة =================
// تم إزالة /8 العريضة التي تتداخل مع العرب - نطاقات محددة فقط
var GEO_BLACKLIST = [

  // Europe core (بعيدة عن الشرق الأوسط)
  ["51.0.0.0",   "255.0.0.0"],    // EU cloud
  ["52.0.0.0",   "254.0.0.0"],    // AWS EU
  ["54.0.0.0",   "255.0.0.0"],    // AWS EU
  ["77.0.0.0",   "255.0.0.0"],    // EU ISPs
  ["78.0.0.0",   "255.0.0.0"],
  ["79.0.0.0",   "255.0.0.0"],
  ["80.0.0.0",   "255.0.0.0"],
  ["81.0.0.0",   "255.0.0.0"],    // EU ISPs
  ["82.0.0.0",   "255.128.0.0"],  // EU prefix (82.0-82.127، ما يطال 82.212 الأردن)
  ["83.0.0.0",   "255.0.0.0"],
  ["84.0.0.0",   "255.0.0.0"],
  ["85.0.0.0",   "255.0.0.0"],
  ["86.0.0.0",   "255.0.0.0"],
  ["87.0.0.0",   "255.0.0.0"],
  ["88.0.0.0",   "255.0.0.0"],
  ["89.0.0.0",   "255.0.0.0"],
  ["90.0.0.0",   "255.0.0.0"],
  ["91.0.0.0",   "255.128.0.0"],  // EU (91.0-91.127، ما يطال 91.156 الأردن)

  // Russia specific
  ["46.16.0.0",  "255.240.0.0"],
  ["95.24.0.0",  "255.248.0.0"],
  ["178.64.0.0", "255.192.0.0"],
  ["185.0.0.0",  "255.128.0.0"],  // RU hosting (185.0-185.127، ما يطال 185.107 الأردن)

  // Asia Pacific (خوادم الصين/كوريا/يابان)
  ["1.0.0.0",    "255.0.0.0"],
  ["14.0.0.0",   "255.0.0.0"],
  ["27.0.0.0",   "255.0.0.0"],
  ["36.0.0.0",   "255.0.0.0"],
  ["39.0.0.0",   "255.0.0.0"],
  ["42.0.0.0",   "255.0.0.0"],
  ["49.0.0.0",   "255.0.0.0"],
  ["58.0.0.0",   "255.0.0.0"],
  ["59.0.0.0",   "255.0.0.0"],
  ["60.0.0.0",   "255.0.0.0"],
  ["61.0.0.0",   "255.0.0.0"],
  ["103.0.0.0",  "255.0.0.0"],
  ["110.0.0.0",  "255.0.0.0"],
  ["111.0.0.0",  "255.0.0.0"],
  ["112.0.0.0",  "255.0.0.0"],
  ["113.0.0.0",  "255.0.0.0"],
  ["114.0.0.0",  "255.0.0.0"],
  ["115.0.0.0",  "255.0.0.0"],
  ["116.0.0.0",  "255.0.0.0"],
  ["117.0.0.0",  "255.0.0.0"],
  ["118.0.0.0",  "255.0.0.0"],
  ["119.0.0.0",  "255.0.0.0"],
  ["120.0.0.0",  "255.0.0.0"],
  ["121.0.0.0",  "255.0.0.0"],
  ["122.0.0.0",  "255.0.0.0"],
  ["123.0.0.0",  "255.0.0.0"],
  ["124.0.0.0",  "255.0.0.0"],
  ["125.0.0.0",  "255.0.0.0"],

  // India
  ["117.96.0.0", "255.224.0.0"],
  ["157.32.0.0", "255.240.0.0"],
  ["180.0.0.0",  "255.0.0.0"],
  ["182.0.0.0",  "255.0.0.0"],

  // Iran (محجوب صراحةً)
  ["2.144.0.0",  "255.248.0.0"],
  ["5.52.0.0",   "255.252.0.0"],
  ["31.2.0.0",   "255.254.0.0"],
  ["37.32.0.0",  "255.248.0.0"],
  ["91.99.0.0",  "255.255.0.0"],
  ["94.74.128.0","255.255.128.0"]
];

// ================= SESSION =================
var SESSION = {
  matchNet16: null,   // /16 للتحقق الأول (أوسع)
  matchNet24: null,   // /24 للـ lock الفعلي
  matchHost:  null,
  matchCount: 0,
  startTime:  null
};

var SESSION_TIMEOUT_MS = 25 * 60 * 1000; // 25 دقيقة

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list){
  for (var i = 0; i < list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolvePinned(host){
  if (SESSION.dnsCache) {
    if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  } else {
    SESSION.dnsCache = {};
  }
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

function pickLobbyProxy(host){
  var h = 0;
  for (var i = 0; i < host.length; i++)
    h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

function sessionExpired(){
  if (!SESSION.startTime) return false;
  return (new Date().getTime() - SESSION.startTime) > SESSION_TIMEOUT_MS;
}

function resetSession(){
  SESSION.matchNet16 = null;
  SESSION.matchNet24 = null;
  SESSION.matchHost  = null;
  SESSION.matchCount = 0;
  SESSION.startTime  = null;
}

// ================= DETECTION =================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}
function isMatch(u, h){
  return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(u + h);
}
function isLobby(u, h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit/i.test(u + h);
}
function isSocial(u, h){
  return /friend|invite|squad|team|party|clan|presence|social/i.test(u + h);
}
function isCDN(u, h){
  return /cdn|asset|resource|patch|update|media|content/i.test(u + h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);

  // IPv6 أو فشل DNS = بلوك
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // HARD GEO BLOCK
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // ===== MATCH =====
  if (isMatch(url, host)) {
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0, 3).join('.');
    var net16 = ip.split('.').slice(0, 2).join('.');

    // Session منتهية؟ reset
    if (sessionExpired()) resetSession();

    // أول اتصال match
    if (!SESSION.matchNet24) {
      SESSION.matchNet16 = net16;
      SESSION.matchNet24 = net24;
      SESSION.matchHost  = host;
      SESSION.matchCount = 1;
      SESSION.startTime  = new Date().getTime();
      return MATCH_JO;
    }

    // نفس الـ /16 ؟ (مرونة للـ load balancer)
    if (net16 !== SESSION.matchNet16) return BLOCK;

    // بعد أول 3 طلبات نلوك على /24
    SESSION.matchCount++;
    if (SESSION.matchCount > 3 && net24 !== SESSION.matchNet24) return BLOCK;

    return MATCH_JO;
  }

  // ===== LOBBY / SOCIAL / CDN =====
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  // باقي traffic أردني
  return pickLobbyProxy(host);
}
