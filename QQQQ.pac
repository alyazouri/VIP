// ============================================================================
// ⭐ THE RADICAL PURE-JORDAN PAC SCRIPT — VIP 100% JORDANIAN PLANE & SQUAD ⭐
// [ RADICAL QoS/GCLOUD GUILLOTINE | 100% AMMAN DEDICATED POOL | 100% SAFE ]
// ============================================================================

// ================= 1. PROXIES & FAILOVER CONFIGURATION =================
var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:9"; // مقصلة الإعدام الفوري لأي سيرفر مخلط خارج الأردن
var MATCH_JO = "PROXY 46.185.131.218:20005; DIRECT"; // منفذ الألعاب الأردني السريع

// ================= 2. THE 3 ELITE JORDANIAN ROTATION POOLS (IPV4) =================
// نخبة النطاقات الأردنية المحلية في عمّان وإربد والزرقاء (صفر مسارات خارجية)

// 🟢 المجموعة الأولى: نخبة خوادم شركة زين الأردنية (Zain VIP Pool)
var JORDAN_POOL_ZAIN_V4 = [
  ["46.185.128.0", "255.255.128.0"], ["176.29.0.0", "255.255.0.0"],
  ["176.28.128.0", "255.255.128.0"], ["46.32.96.0", "255.255.224.0"],
  ["77.245.0.0",   "255.255.240.0"], ["80.90.160.0", "255.255.224.0"]
];
var PROXY_POOL_ZAIN = ["PROXY 46.185.131.218:20005; DIRECT", "PROXY 46.185.131.218:80; DIRECT"];

// 🟠 المجموعة الثانية: نخبة خوادم شركة أورانج الأردنية (Orange Elite Pool)
var JORDAN_POOL_ORANGE_V4 = [
  ["82.212.64.0",   "255.255.192.0"], ["37.202.64.0",   "255.255.192.0"],
  ["86.108.0.0",    "255.255.0.0"],   ["194.165.128.0", "255.255.192.0"]
];
var PROXY_POOL_ORANGE = ["PROXY 46.185.131.218:443; DIRECT", "PROXY 46.185.131.218:80; DIRECT"];

// 🟣 المجموعة الثالثة: نخبة خوادم شركة أمنية ومقسم JINX المحلي (Umniah & JINX Pro Pool)
var JORDAN_POOL_UMNIAH_V4 = [
  ["94.249.0.0", "255.255.128.0"], ["37.44.32.0", "255.255.248.0"],
  ["37.75.144.0", "255.255.248.0"], ["37.123.64.0", "255.255.224.0"],
  ["37.152.0.0", "255.255.248.0"], ["37.220.112.0", "255.255.240.0"],
  ["37.17.192.0", "255.255.240.0"], ["46.23.112.0", "255.255.240.0"],
  ["46.248.192.0", "255.255.224.0"], ["193.188.64.0", "255.255.224.0"],
  ["212.118.0.0", "255.255.192.0"], ["217.144.0.0", "255.255.192.0"],
  ["5.45.128.0", "255.255.240.0"], ["5.198.240.0", "255.255.248.0"]
];
var PROXY_POOL_UMNIAH = ["PROXY 46.185.131.218:80; DIRECT", "PROXY 46.185.131.218:443; DIRECT"];

// القائمة التجميعية الحصرية لبطاقات التحقق من هوية السيرفر الأردني
var JORDAN_MATCH_IPV4 = JORDAN_POOL_ZAIN_V4.concat(JORDAN_POOL_ORANGE_V4, JORDAN_POOL_UMNIAH_V4);

// ================= 3. THE 3 ELITE ROTATION POOLS (IPV6) =================
var JORDAN_POOL_ZAIN_V6 = ["2a02:9c0::/29", "2a03:6b00::/29", "2a00:76e0::/32", "2a02:25d8::/32"];
var JORDAN_POOL_ORANGE_V6 = ["2a01:1d0::/29", "2a01:9700::/29", "2a00:18d0::/32", "2a00:18d8::/29"];
var JORDAN_POOL_UMNIAH_V6 = ["2a02:c040::/29", "2a01:e240::/29", "2a01:ee40::/29", "2a02:2558::/29", "2a02:e680::/29", "2a02:f0c0::/29", "2a00:4620::/32", "2a00:b860::/32", "2a00:caa0::/32", "2a02:5b60::/32", "2a03:6d00::/32", "2001:32c0::/29"];
var JORDAN_MATCH_IPV6 = JORDAN_POOL_ZAIN_V6.concat(JORDAN_POOL_ORANGE_V6, JORDAN_POOL_UMNIAH_V6);

// ================= 4. STRICT GLOBAL & NON-JORDAN BLACKLIST =================
var GEO_BLACKLIST = [
  // حظر مسارات العبور الخارجية البطيئة ومراكز البيانات الروسية/البولندية
  ["62.72.160.0", "255.255.224.0"], ["79.134.128.0", "255.255.224.0"],
  ["80.91.64.0",  "255.255.224.0"], ["81.28.16.0",   "255.255.240.0"],
  ["178.248.0.0", "255.255.192.0"], ["185.76.104.0", "255.255.252.0"],
  ["195.210.48.0","255.255.240.0"], ["5.199.184.0",  "255.255.252.0"],
  ["45.142.196.0","255.255.252.0"],

  // حظر خوادم الخليج (السعودية والإمارات) لمنع دخول لاعبين أجانب ومخلطين
  ["2.59.52.0",   "255.255.252.0"], ["85.115.64.0", "255.255.224.0"],

  // حظر مسارات سوريا ومصر لمنع المباريات المخلطة واختناق الشبكة
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

// ================= 5. SMART SESSION MANAGER =================
var SESSION = {
  activePeriod: 0,
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

function isIPv6(ip){ return ip && ip.indexOf(":") !== -1; }

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

function ipv6Net48(ip){ return ip.split(":").slice(0,3).join(":"); }

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

// ================= 6. ELITE DETECTION ENGINE (REGEX) =================

// 🛡️⚡ 1. محرك الأمان المطلق (SECURITY & AUTH DIRECT ONLY) ⚡🛡️
// يحتوي *فقط* على أنظمة الحماية ومكافحة الغش وتسجيل الدخول لضمان أمان حسابك 100%
// تم بتر وإزالة كافة بوابات القياس والسحابة (gcloud/qos/ping/cloudtest) لمنع الهروب للسيرفرات المخلطة!
var REGEX_SECURITY_AUTH = /security|anticheat|sguard|ace|mprotect|gpro|fairplay|guard|safe|ban|captcha|verify|csec|secops|telemetry|tdmsec|scantool|tencentprotect|login|auth|account|oauth|openid|wechat|qq|pass|sso|vmp|facebook|google|apple|twitter|vk/i;

// 🎮 2. رادار اللعب الفعلي، المباريات، وبوابات القياس السحابية (GCloud & QoS)
// تم دمجها هنا لكي تخضع لفحص الـ IP الصارم وإعدام السيرفرات المخلطة في البحرين ودبي ومصر وألمانيا
var REGEX_MATCH_QOS_GCLOUD = /match|battle|game|combat|realtime|sync|udp|tick|room|tdm|arena|metro|wow|worldofwonder|payload|heavy|custom|tour|elite|esports|server|fight|play|playzone|qos|ping|echo|delay|speed|measure|network|acc|unite|multiping|cloudtest|test|flight|report|heartbeat|gcloud|qcloud|myqcloud|connect/i;

// 📍 3. بوابات التوفيق والتوزيع والتجنيد (تجبر خادم اللعبة على إدخالك مع لاعبين أردنيين 100% فقط)
var REGEX_MATCHMAKING_LOCK = /matchmaking|dispatch|gateway|gate|queue|lbs|ipip|geo|locate|region|zone|recruit|teamup|squad|party|friend|chat|nearby|local|area|amman|jordan/i;

// 🎪 4. التنقل بالواجهات واللوبي العام
var REGEX_LOBBY = /lobby|find|quick|hub|team|home|main|enter|ready|select/i;

// 💬 5. الصوت والدردشة (شامل Vivox Voice)
var REGEX_SOCIAL = /presence|social|voice|vivox|msg|talk|guild|club|share/i;

// 🛒 6. المتجر، الرويال باس، الصناديق، والفعاليات
var REGEX_STORE = /shop|store|pay|purchase|uc|currency|event|royalepass|luckyspin|treasure|reward|gacha|box|crate|activity|mission|midasbuy/i;

// 📦 7. تحميل الموارد، الخرائط، والتحديثات
var REGEX_CDN = /cdn|asset|resource|patch|update|media|content|map|dl|download|package|config|version|bundle|cloudcdn|gtimg|akamai|edgecast/i;

// 🎯 8. الرادار الشامل لببجي موبايل وبنيتها التحتية
var REGEX_PUBG = /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igame|midasbuy|puffer|subg|itopsdk|vivox|ipip|lbs/i;

function isSecurityAuth(u,h){ return REGEX_SECURITY_AUTH.test(u+h); }
function isMatchQoSGCloud(u,h){ return REGEX_MATCH_QOS_GCLOUD.test(u+h); }
function isMatchmakingLock(u,h){ return REGEX_MATCHMAKING_LOCK.test(u+h); }
function isPUBG(h){ return REGEX_PUBG.test(h); }
function isLobby(u,h){ return REGEX_LOBBY.test(u+h); }
function isSocial(u,h){ return REGEX_SOCIAL.test(u+h); }
function isStore(u,h){ return REGEX_STORE.test(u+h); }
function isCDN(u,h){ return REGEX_CDN.test(u+h); }

// ================= 7. MAIN RADICAL PURE-JORDAN CORE =================
function FindProxyForURL(url, host) {
  host = norm(host.toLowerCase());

  // =========================================================================================
  // 🛡️⚡ السطر الأول المطلق: العبور المباشر لحماية الحساب ومكافحة الغش وتسجيل الدخول فقط ⚡🛡️
  if (isSecurityAuth(url, host)) {
    return DIRECT;
  }
  // =========================================================================================

  // ⚡ 2. فحص الذاكرة الفورية (Cache)
  if (SESSION.routeCache[host]) {
    return SESSION.routeCache[host];
  }

  // 🏠 3. حماية وتمرير الاتصالات المحلية والراوتر المنزلي
  if (isPlainHostName(host) || host === "127.0.0.1" || host.indexOf("192.168.") === 0 || host.indexOf("10.") === 0) {
    return DIRECT;
  }

  // 🚀 4. استبعاد فوري لأي اتصال لا يخص اللعبة
  if (!isPUBG(host)) {
    return DIRECT;
  }

  // ================= 🌟 5. المحرك الديناميكي للوبي والتوزيع (يدور كل 2 دقيقة) 🌟 =================
  var now = Date.now();
  var currentPeriod = Math.floor(now / 120000); 

  if (currentPeriod !== SESSION.activePeriod || SESSION.cacheSize > 1000) {
    SESSION.activePeriod = currentPeriod;
    SESSION.routeCache = {};
    SESSION.cacheSize = 0;
  }

  var poolIndex = currentPeriod % 3; 
  var activeProxyPool = (poolIndex === 0) ? PROXY_POOL_ZAIN : ((poolIndex === 1) ? PROXY_POOL_ORANGE : PROXY_POOL_UMNIAH);

  var hHash = 0;
  for (var k = 0; k < host.length; k++) hHash = (hHash + host.charCodeAt(k)) % activeProxyPool.length;
  var selectedProxy = activeProxyPool[hHash];

  // =========================================================================================
  // 📍📍 6. قفل التوفيق والتوزيع الأردني (Matchmaking Lock) 📍📍
  if (isMatchmakingLock(url, host)) {
    SESSION.routeCache[host] = selectedProxy;
    SESSION.cacheSize++;
    return selectedProxy;
  }
  // =========================================================================================

  // 🔍 7. حل عنوان الـ IP عبر الـ Cache الذكي لفحص خوادم اللعب والقياس
  var ip = resolvePinned(host);
  if (!ip) return BLOCK;

  // ================= IPV6 RADICAL ROUTING =================
  if (isIPv6(ip)) {
    if (isMatchQoSGCloud(url, host)) {
      if (!isInIPv6List(ip, JORDAN_MATCH_IPV6)) return BLOCK; // مقصلة السيرفرات المخلطة
      var net = ipv6Net48(ip);
      if (!SESSION.matchNet || (now - SESSION.matchTime > 2700000)) {
        SESSION.matchNet = net; SESSION.matchHost = host; SESSION.matchTime = now;
        return MATCH_JO;
      }
      if (net !== SESSION.matchNet) return BLOCK;
      return MATCH_JO;
    }
    SESSION.routeCache[host] = selectedProxy;
    SESSION.cacheSize++;
    return selectedProxy;
  }

  // ================= IPV4 RADICAL ROUTING =================
  // ⛔ حظر قاطع لأي IP يقع ضمن بوابات الخليج، سوريا، مصر، أو أوروبا
  if (isInList(ip, GEO_BLACKLIST)) {
    SESSION.routeCache[host] = BLOCK;
    SESSION.cacheSize++;
    return BLOCK;
  }

  // =========================================================================================
  // 🎮⚡ 8. مقصلة اللعب والقياس السحابي (100% Radical Pure Jordan Matches & QoS) ⚡🎮
  // هنا يتم إعدام سيرفرات البحرين ودبي ومصر وأوروبا المخلطة، وإجبار اللعبة على داتا سنتر عمّان فقط!
  if (isMatchQoSGCloud(url, host)) {
    // إذا حاول السيرفر إرسال قياس أو لعب خارج الأردن، اعدمه فورا (BLOCK)!
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK; 
    var net24 = ip.split('.').slice(0,3).join('.');
    if (!SESSION.matchNet || (now - SESSION.matchTime > 2700000)) {
      SESSION.matchNet = net24; SESSION.matchHost = host; SESSION.matchTime = now;
      return MATCH_JO; // افتح الاتصال عبر منفذ الألعاب الأردني السريع 20005
    }
    if (net24 !== SESSION.matchNet) return BLOCK;
    return MATCH_JO;
  }
  // =========================================================================================

  // 🎪 توجيه وظائف اللوبي، المايك، والمتجر عبر المجموعة الأردنية الفعالة حالياً
  if (isLobby(url, host) || isSocial(url, host) || isStore(url, host) || isCDN(url, host)) {
    SESSION.routeCache[host] = selectedProxy;
    SESSION.cacheSize++;
    return selectedProxy;
  }

  // 🔄 التوجيه الافتراضي لبقية حركة مرور اللعبة الآمنة
  SESSION.routeCache[host] = selectedProxy;
  SESSION.cacheSize++;
  return selectedProxy;
}
