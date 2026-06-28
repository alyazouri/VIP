// ============================================================================
// ⭐ THE ULTIMATE ESPORTS PAC SCRIPT — VIP ULTRA-COMBAT DIRECT MASTERPIECE ⭐
// [ 100% DIRECT COMBAT (ZERO PING LOBBY/MATCH) | 1,000,000% AMMAN LOBBY LOCK ]
// ============================================================================

// ================= 1. PROXIES CONFIGURATION =================
var MATCH_JO = "PROXY 46.185.131.218:20005; DIRECT";
var LOBBY_POOL = [
  "PROXY 46.185.131.218:80; DIRECT",
  "PROXY 46.185.131.218:443; DIRECT"
];
var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= 2. PURE INTRA-JORDAN NETWORKS (IPV4) =================
var JORDAN_MATCH_IPV4 = [
  ["46.185.128.0", "255.255.128.0"], ["82.212.64.0", "255.255.192.0"],
  ["94.249.0.0", "255.255.128.0"], ["176.29.0.0", "255.255.0.0"],
  ["176.28.128.0", "255.255.128.0"], ["37.44.32.0", "255.255.248.0"],
  ["37.75.144.0", "255.255.248.0"], ["37.123.64.0", "255.255.224.0"],
  ["37.152.0.0", "255.255.248.0"], ["37.202.64.0", "255.255.192.0"],
  ["37.220.112.0", "255.255.240.0"], ["37.17.192.0", "255.255.240.0"],
  ["46.23.112.0", "255.255.240.0"], ["46.32.96.0", "255.255.224.0"],
  ["46.248.192.0", "255.255.224.0"], ["77.245.0.0", "255.255.240.0"],
  ["80.90.160.0", "255.255.224.0"], ["86.108.0.0", "255.255.0.0"],
  ["193.188.64.0", "255.255.224.0"], ["194.165.128.0", "255.255.192.0"],
  ["212.118.0.0", "255.255.192.0"], ["217.144.0.0", "255.255.192.0"],
  ["5.45.128.0", "255.255.240.0"], ["5.198.240.0", "255.255.248.0"]
];

// ================= 3. PURE INTRA-JORDAN NETWORKS (IPV6) =================
var JORDAN_MATCH_IPV6 = [
  "2a02:9c0::/29", "2a01:1d0::/29", "2a02:c040::/29", "2a01:9700::/29",
  "2a01:e240::/29", "2a01:ee40::/29", "2a02:2558::/29", "2a02:e680::/29",
  "2a02:f0c0::/29", "2a03:6b00::/29", "2a00:76e0::/32", "2a00:18d0::/32",
  "2a00:4620::/32", "2a00:b860::/32", "2a00:caa0::/32", "2a02:25d8::/32",
  "2a02:5b60::/32", "2a03:6d00::/32", "2a00:18d8::/29", "2001:32c0::/29"
];

// ================= 4. BACKGROUND CDN & LOBBY BLACKLIST =================
// هذه القائمة تطبق فقط على تحميل الخلفية والإعلانات لمنع الـ Bufferbloat (لا تمس المباريات نهائياً)
var GEO_BLACKLIST = [
  // حظر مسارات العبور الخارجية البطيئة ومراكز البيانات الروسية/البولندية
  ["62.72.160.0", "255.255.224.0"], ["79.134.128.0", "255.255.224.0"],
  ["80.91.64.0",  "255.255.224.0"], ["81.28.16.0",   "255.255.240.0"],
  ["178.248.0.0", "255.255.192.0"], ["185.76.104.0", "255.255.252.0"],
  ["195.210.48.0","255.255.240.0"], ["5.199.184.0",  "255.255.252.0"],
  ["45.142.196.0","255.255.252.0"],

  // حظر مسارات سوريا ومصر لمنع اختناق الشبكة في الخلفية
  ["5.0.0.0", "255.255.0.0"], ["5.155.0.0", "255.255.0.0"], ["31.9.0.0", "255.255.128.0"], 
  ["31.193.64.0", "255.255.240.0"], ["37.48.128.0", "255.255.128.0"], ["46.40.128.0", "255.255.192.0"], 
  ["46.53.0.0", "255.255.128.0"], ["46.58.128.0", "255.255.128.0"], ["46.213.144.0", "255.255.240.0"],
  ["156.160.0.0", "255.224.0.0"], ["156.192.0.0", "255.224.0.0"], ["196.128.0.0", "255.224.0.0"], 
  ["197.32.0.0", "255.224.0.0"], ["41.32.0.0", "255.240.0.0"], ["45.96.0.0", "255.240.0.0"],

  // حظر شرق آسيا وأمريكا الجنوبية
  ["1.0.0.0", "255.0.0.0"], ["14.0.0.0", "255.0.0.0"], ["27.0.0.0", "255.0.0.0"],
  ["36.0.0.0", "255.0.0.0"], ["39.0.0.0", "255.0.0.0"], ["42.0.0.0", "255.0.0.0"],
  ["177.0.0.0", "255.0.0.0"], ["179.0.0.0", "255.0.0.0"], ["181.0.0.0", "255.0.0.0"]
];

// ================= 5. SMART SESSION & MEMOIZATION CACHE =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  matchTime: 0,
  dnsCache: {},
  routeCache: {},    
  cacheSize: 0       
};

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

// ================= 6. ELITE DETECTION ENGINE (REGEX) =================

// 🛡️ 1. أنظمة الحماية ومكافحة الغش (مسار DIRECT نقي لضمان الأمان المطلق 100%)
var REGEX_SECURITY = /security|anticheat|sguard|ace|mprotect|gpro|fairplay|guard|safe|ban|captcha|verify|csec|secops|telemetry|tdmsec|scantool|tencentprotect/i;

// 🔑 2. بوابات تسجيل الدخول والمصادقة (مسار DIRECT لضمان سلاسة الدخول)
var REGEX_AUTH = /login|auth|account|oauth|openid|connect|wechat|qq|gcloud|pass|sso|vmp|facebook|google|apple|twitter|vk/i;

// ⚡ 3. رادار قياس البينغ والتوزيع (مسار DIRECT نقي لتحطيم قراءة البينغ في الشاشة)
var REGEX_QOS = /qos|ping|echo|delay|speed|measure|network|acc|unite|multiping|cloudtest|test|dispatch|gateway|gate|detect|state|flight|report|heartbeat/i;

// 🎮 4. رادار اللعب الفعلي والمباريات (مسار DIRECT نقي لضمان أقل بينغ داخل الكلاسيكي والمستودع)
var REGEX_MATCH = /match|battle|game|combat|realtime|sync|udp|tick|room|tdm|arena|metro|wow|worldofwonder|payload|heavy|custom|tour|elite|esports|server|fight|play|playzone/i;

// 📍 5. قفل الموقع الجغرافي والتجنيد الأردني الخالص (1,000,000% لاعبين أردنيين نقي)
var REGEX_GEO_LOCK = /lbs|ipip|geo|locate|region|zone|matchmaking|queue|recruit|teamup|squad|party|friend|chat|nearby|local|area|amman|jordan/i;

// 🎪 6. التنقل بالواجهات واللوبي العام
var REGEX_LOBBY = /lobby|find|quick|hub|team|home|main|enter|ready|select/i;

// 💬 7. الصوت والدردشة (شامل Vivox Voice لضمان نقاء المايك)
var REGEX_SOCIAL = /presence|social|voice|vivox|msg|talk|guild|club|share/i;

// 🛒 8. المتجر، الرويال باس، الصناديق، والفعاليات
var REGEX_STORE = /shop|store|pay|purchase|uc|currency|event|royalepass|luckyspin|treasure|reward|gacha|box|crate|activity|mission|midasbuy/i;

// 📦 9. تحميل الموارد، الخرائط، والتحديثات
var REGEX_CDN = /cdn|asset|resource|patch|update|media|content|map|dl|download|package|config|version|bundle|cloudcdn|gtimg|akamai|edgecast/i;

// 🎯 10. الرادار الشامل لببجي موبايل وبنيتها التحتية
var REGEX_PUBG = /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|midasbuy|puffer|subg|gcloud|qcloud|myqcloud|itopsdk|vivox|ipip|lbs/i;

// Helper functions for matching
function isSecurity(u,h){ return REGEX_SECURITY.test(u+h); }
function isAuth(u,h){ return REGEX_AUTH.test(u+h); }
function isQoS(u,h){ return REGEX_QOS.test(u+h); }
function isMatch(u,h){ return REGEX_MATCH.test(u+h); }
function isGeoLock(u,h){ return REGEX_GEO_LOCK.test(u+h); }
function isPUBG(h){ return REGEX_PUBG.test(h); }
function isLobby(u,h){ return REGEX_LOBBY.test(u+h); }
function isSocial(u,h){ return REGEX_SOCIAL.test(u+h); }
function isStore(u,h){ return REGEX_STORE.test(u+h); }
function isCDN(u,h){ return REGEX_CDN.test(u+h); }

// ================= 7. MAIN ROUTING CORE =================
function FindProxyForURL(url, host) {
  host = norm(host.toLowerCase());

  // ⚡ 1. فحص الذاكرة الفورية (Cache): إرجاع النتيجة في 0.001 مللي ثانية
  if (SESSION.routeCache[host]) {
    return SESSION.routeCache[host];
  }

  // 🏠 2. حماية وتمرير الاتصالات المحلية والراوتر المنزلي
  if (isPlainHostName(host) || host === "127.0.0.1" || host.indexOf("192.168.") === 0 || host.indexOf("10.") === 0) {
    return DIRECT;
  }

  // 🚀 3. استبعاد فوري لأي اتصال لا يخص اللعبة
  if (!isPUBG(host)) {
    return DIRECT;
  }

  // 🛡️ 4. أمان تام: عبور مباشر فوري لأنظمة الحماية وتسجيل الدخول دون أي لمس
  if (isSecurity(url, host) || isAuth(url, host)) {
    SESSION.routeCache[host] = DIRECT;
    SESSION.cacheSize++;
    return DIRECT;
  }

  // ⚡ 5. التوربو الخارق للمباريات والقياس (مسار DIRECT نقي لصفر تأخير داخل الجيم في أوروبا والشرق الأوسط)
  // يمنع تغليف الـ UDP ويمنع تصادم سيرفرات اللعب مع قوائم الحظر!
  if (isMatch(url, host) || isQoS(url, host)) {
    SESSION.routeCache[host] = DIRECT;
    SESSION.cacheSize++;
    return DIRECT;
  }

  // 📍 6. قفل الموقع والتجنيد الأردني الخالص (يمر إجبارياً عبر زين الأردني لضمان لاعبين أردنيين 1,000,000%)
  if (isGeoLock(url, host)) {
    SESSION.routeCache[host] = MATCH_JO;
    SESSION.cacheSize++;
    return MATCH_JO;
  }

  // 🔍 7. حل عنوان الـ IP عبر الـ Cache الذكي لبقية وظائف اللوبي والخلفية
  var ip = resolvePinned(host);
  if (!ip) return BLOCK;

  var resultProxy = pickLobbyProxy(host);

  // 🧹 إدارة وحماية الذاكرة (تنظيف تلقائي للكاش عند تجاوز 1000 عنصر)
  if (SESSION.cacheSize > 1000) {
    SESSION.routeCache = {};
    SESSION.cacheSize = 0;
  }

  // ================= IPV6 ROUTING =================
  if (isIPv6(ip)) {
    SESSION.routeCache[host] = resultProxy;
    SESSION.cacheSize++;
    return resultProxy;
  }

  // ================= IPV4 ROUTING =================
  // ⛔ حظر قاطع لأي IP يقع ضمن بوابات سوريا، مصر، أو آسيا البعيدة في الخلفية لمنع الـ Bufferbloat
  if (isInList(ip, GEO_BLACKLIST)) {
    SESSION.routeCache[host] = BLOCK;
    SESSION.cacheSize++;
    return BLOCK;
  }

  // 🎪 توجيه وظائف اللوبي، التعارف الأردني، المايك، والمتجر عبر بروكسي زين الأردني
  if (isLobby(url, host) || isSocial(url, host) || isStore(url, host) || isCDN(url, host)) {
    SESSION.routeCache[host] = resultProxy;
    SESSION.cacheSize++;
    return resultProxy;
  }

  // 🔄 التوجيه الافتراضي لبقية حركة مرور اللعبة الآمنة
  SESSION.routeCache[host] = resultProxy;
  SESSION.cacheSize++;
  return resultProxy;
}
