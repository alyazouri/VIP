// ================= PROXIES المحسّنة للموقع الجغرافي =================
// هنا راح نستخدم proxies محددة حسب المدينة في الأردن
// كل proxy راح يكون مسجل في مدينة معينة لضمان أفضل تطابق جغرافي

// Proxy رئيسي للمباريات - يُفضل أن يكون من مدينتك المحددة
// في هذا المثال، سنفترض أنك في عمّان
var MATCH_JO_AMMAN = "PROXY 46.185.131.218:20001";

// Proxies للـ Lobby - نستخدم عدة proxies من مدن أردنية مختلفة
// لكن نعطي الأولوية للـ proxies من مدينتك
var LOBBY_POOL = [
  "PROXY 188.247.94.145:8080",   // عمّان - أولوية عالية
  "PROXY 212.35.66.45:8181",   // عمّان - أولوية عالية  
  "PROXY 46.185.131.218:443"   // إربد - أولوية متوسطة
];

// للخدمات التي تتطلب موقعاً دقيقاً جداً (GPS-based features)
// نستخدم proxy واحد ثابت لضمان consistency في الموقع
var LOCATION_SERVICES_PROXY = "PROXY 212.35.66.45:8085";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN MATCH - مرتبة حسب المدن =================
// هذه النطاقات مرتبة بحيث نعطي الأولوية للنطاقات من المدن الكبرى
// هذا يساعد في matching مع لاعبين من نفس المدينة
var JORDAN_MATCH_IPV4 = [
  // عمّان والمناطق المحيطة (الأولوية القصوى)
  ["46.185.128.0","255.255.128.0"],  // Zain عمّان
  ["77.245.0.0","255.255.240.0"],     // Zain عمّان
  ["79.134.128.0","255.255.224.0"],  // Orange عمّان
  
  // المدن الأخرى
  ["79.173.192.0","255.255.192.0"],  // إربد والشمال
  ["80.90.160.0","255.255.240.0"],   // الزرقاء
  ["149.200.128.0","255.255.128.0"]  // مناطق متنوعة
];

// ================= JORDAN WIDE =================
var JORDAN_WIDE_IPV4 = [
  ["46.32.0.0",    "255.224.0.0"],
  ["79.134.128.0", "255.255.128.0"],
  ["176.29.0.0",   "255.255.0.0"],
  ["77.245.0.0",   "255.255.0.0"],
  ["178.77.0.0",   "255.255.0.0"],
  ["62.72.0.0",    "255.255.0.0"],
  ["37.202.0.0",   "255.255.0.0"],
  ["85.159.0.0",   "255.255.0.0"],
  ["93.93.0.0",    "255.255.0.0"],
  ["93.95.0.0",    "255.255.0.0"],
  ["37.252.0.0",   "255.255.0.0"],
  ["94.127.0.0",   "255.255.0.0"],
  ["212.34.0.0",   "255.255.0.0"],
  ["213.139.64.0", "255.255.192.0"],
  ["176.57.0.0",   "255.255.0.0"],
  ["188.123.0.0",  "255.255.0.0"],
  ["188.247.0.0",  "255.255.0.0"],
  ["193.188.64.0", "255.255.224.0"],
  ["149.200.0.0",  "255.255.0.0"]
];

// ================= BLACKLIST =================
var GEO_BLACKLIST = [
  ["5.0.0.0","255.0.0.0"],
  ["50.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],
  ["5.136.0.0","255.248.0.0"],
  ["31.128.0.0","255.192.0.0"],
  ["46.16.0.0","255.240.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["178.64.0.0","255.192.0.0"],
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"],
  ["36.0.0.0","255.0.0.0"],
  ["39.0.0.0","255.0.0.0"],
  ["42.0.0.0","255.0.0.0"],
  ["49.0.0.0","255.0.0.0"],
  ["58.0.0.0","255.0.0.0"],
  ["59.0.0.0","255.0.0.0"],
  ["60.0.0.0","255.0.0.0"]
];

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {},
  initialMatchIP: null
};

// ================= HELPERS =================
function norm(h){ var i=h.indexOf(":"); return i>-1?h.substring(0,i):h; }

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolvePinned(host){
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

// دالة محسّنة لاختيار الـ lobby proxy
// هذه الدالة تعطي وزناً أكبر للـ proxies الأولى في القائمة
// مما يعني أنها راح تستخدم proxies من مدينتك أكثر
function pickLobbyProxy(host){
  var h=0;
  for (var i=0;i<host.length;i++)
    h=(h+host.charCodeAt(i))%LOBBY_POOL.length;
  
  // نضيف bias نحو الـ proxies الأولى (من مدينتك)
  // إذا كان الـ hash يشير لـ proxy متأخر، نحاول نستخدم الأول 70% من الوقت
  if (h > 0 && (Math.random() < 0.7)) {
    return LOBBY_POOL[0];
  }
  
  return LOBBY_POOL[h];
}

function isSameRegion(ip1, ip2) {
  if (!ip1 || !ip2) return false;
  var parts1 = ip1.split('.');
  var parts2 = ip2.split('.');
  return parts1[0] === parts2[0] && parts1[1] === parts2[1];
}

// ================= DETECTION =================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function isMatch(u,h){
  return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(u+h);
}

function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit/i.test(u+h);
}

function isSocial(u,h){
  return /friend|invite|squad|team|party|clan|presence|social/i.test(u+h);
}

function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content/i.test(u+h);
}

// ================= دوال جديدة للـ Location-based features =================

// هذه الدالة تكتشف إذا كان الطلب متعلق بخدمات الموقع الجغرافي
// مثل الـ GPS location، Region rankings، City players، إلخ
function isLocationService(u,h){
  return /location|gps|position|geo|region|city|area|nearby|local|ground|airdrop|ranking/i.test(u+h);
}

// هذه الدالة تكتشف إذا كان الطلب متعلق بالـ Chat features
// التي تعتمد على الموقع مثل Same City Chat
function isChatService(u,h){
  return /chat|message|talk|conversation|voice|comm/i.test(u+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // حظر جغرافي صارم
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // ==========================================
  // معالجة خاصة لخدمات الموقع الجغرافي
  // ==========================================
  // هذا الجزء مهم جداً! أي طلب متعلق بالموقع الجغرافي
  // راح يمر عبر نفس الـ proxy دائماً لضمان consistency
  if (isLocationService(url, host) || isChatService(url, host)) {
    // نتأكد أنه من النطاقات الأردنية
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    
    // نستخدم proxy ثابت لكل الخدمات المتعلقة بالموقع
    // هذا يضمن أن اللعبة تعتقد دائماً أنك في نفس المكان
    return LOCATION_SERVICES_PROXY;
  }

  // ==========================================
  // معالجة اتصالات المباريات
  // ==========================================
  if (isMatch(url, host)) {
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');
    
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      SESSION.initialMatchIP = ip;
      return MATCH_JO_AMMAN;
    }
    
    if (isSameRegion(ip, SESSION.initialMatchIP)) {
      SESSION.matchHost = host;
      SESSION.matchNet = net24;
      return MATCH_JO_AMMAN;
    }
    
    return BLOCK;
  }

  // ==========================================
  // معالجة الـ Lobby والـ Social
  // ==========================================
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  return pickLobbyProxy(host);
}
