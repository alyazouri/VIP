// ================= DNS =================
// dns 1.1.1.1 1.0.0.1
// dns 8.8.8.8 8.8.4.4

// ================= SOCKS PROXIES =================
var MATCH_JO    = "SOCKS 46.185.131.218:20001";
var LOBBY_PROXY = "SOCKS 212.35.66.45:8085";
var BLOCK       = "SOCKS 127.0.0.1:9";
var DIRECT      = "DIRECT";

// ================= FAILOVER PROXIES =================
var MATCH_FAILOVER  = "SOCKS 46.185.131.218:20002; SOCKS 46.185.131.218:20003";
var LOBBY_FAILOVER  = "SOCKS 212.35.66.45:8086; SOCKS 212.35.66.45:8087";

// ================= PERFORMANCE SETTINGS =================
var DNS_TTL_MS       = 120000;  // دقيقتين
var DNS_FAST_TTL     = 45000;   // 45 ثانية للسريع
var SOCIAL_TTL       = 180000;  // 3 دقائق للتجنيد (أطول = أسرع)
var PROBE_LIMIT      = 8;       // زيادة حد المحاولات
var SESSION_TIMEOUT  = 600000;  // 10 دقائق

// ================= ADVANCED SESSION =================
var SESSION = {
  // DNS
  dnsCache:      {},
  dnsTTL:        {},
  dnsHits:       {},           // عدد مرات الاستخدام
  
  // Match
  matchNet:      null,
  matchHost:     null,
  matchProxy:    null,
  matchStart:    0,
  
  // Social (محسّن)
  socialLock:    null,
  socialNet:     null,
  socialStart:   0,
  socialHits:    0,
  lastSocialAct: 0,
  
  // General
  blockedHosts:  {},
  probeCount:    {},
  lastReset:     0,
  inGame:        false,
  connectionPool: {},          // تجمع الاتصالات
  hotPath:       null          // المسار الساخن
};

// ================= JORDAN ALL IPV4 (شامل - 60+ نطاق) =================
var JORDAN_ALL_IPV4 = [
  // ========== Orange Jordan ==========
  ["46.185.0.0","255.255.0.0"],       // Orange Jordan
  ["46.185.128.0","255.255.128.0"],   // Orange Mobile
  ["37.123.128.0","255.255.128.0"],   // Orange
  ["37.18.0.0","255.255.0.0"],        // Orange Business
  ["77.247.0.0","255.255.0.0"],       // Orange
  ["80.90.0.0","255.255.0.0"],        // Orange
  ["82.212.64.0","255.255.192.0"],    // Orange Mobile
  ["82.212.0.0","255.255.0.0"],       // Orange
  ["94.142.32.0","255.255.224.0"],    // Orange
  ["94.249.0.0","255.255.0.0"],       // Orange
  ["176.28.128.0","255.255.128.0"],   // Orange
  ["185.55.0.0","255.255.0.0"],       // Orange
  ["185.84.0.0","255.255.0.0"],       // Orange
  ["185.107.0.0","255.255.0.0"],      // Orange
  ["188.123.160.0","255.255.224.0"],  // Orange
  ["217.144.0.0","255.255.0.0"],      // Orange
  
  // ========== Zain Jordan ==========
  ["176.29.0.0","255.255.0.0"],       // Zain Jordan
  ["176.28.0.0","255.252.0.0"],       // Zain
  ["86.108.0.0","255.252.0.0"],       // Zain Mobile
  ["90.84.0.0","255.252.0.0"],        // Zain
  ["31.153.0.0","255.255.0.0"],       // Zain
  ["95.141.0.0","255.255.0.0"],       // Zain
  ["185.113.0.0","255.255.0.0"],      // Zain
  ["178.20.0.0","255.255.0.0"],       // Zain
  
  // ========== Umniah ==========
  ["94.249.0.0","255.255.128.0"],     // Umniah
  ["109.107.0.0","255.255.0.0"],      // Umniah
  ["87.236.232.0","255.255.248.0"],   // Umniah
  ["176.241.0.0","255.255.0.0"],      // Umniah
  ["178.32.0.0","255.255.0.0"],       // Umniah
  
  // ========== DAMAMAX ==========
  ["212.35.0.0","255.255.0.0"],       // DAMAMAX
  ["213.186.32.0","255.255.224.0"],   // DAMAMAX
  
  // ========== Jordan Telecom Group ==========
  ["213.6.0.0","255.255.0.0"],        // Jordan Telecom
  
  // ========== Other Jordan ISPs ==========
  ["62.72.128.0","255.255.128.0"],    // Batelco Jordan
  ["81.21.64.0","255.255.240.0"],     // Mada
  ["196.201.0.0","255.255.0.0"],      // Covage
  ["192.145.0.0","255.255.0.0"],      // Nobox
  ["195.218.0.0","255.255.0.0"],      // Jordan
  ["194.165.128.0","255.255.128.0"],  // Jordan
  ["195.229.0.0","255.254.0.0"],      // Jordan Integrated
  
  // ========== Additional Jordan Ranges ==========
  ["5.133.0.0","255.255.0.0"],        // Jordan
  ["5.134.0.0","255.255.0.0"],        // Jordan
  ["31.25.0.0","255.255.0.0"],        // Jordan
  ["31.47.0.0","255.255.0.0"],        // Jordan
  ["37.40.0.0","255.255.0.0"],        // Jordan
  ["37.76.0.0","255.255.0.0"],        // Jordan
  ["37.208.0.0","255.255.0.0"],       // Jordan
  ["45.67.0.0","255.255.0.0"],        // Jordan
  ["45.68.0.0","255.255.0.0"],        // Jordan
  ["45.69.0.0","255.255.0.0"],        // Jordan
  ["46.32.0.0","255.255.0.0"],        // Jordan
  ["46.152.0.0","255.255.0.0"],       // Jordan
  ["46.235.0.0","255.255.0.0"],       // Jordan
  ["51.38.0.0","255.255.0.0"],        // Jordan Cloud
  ["51.140.0.0","255.255.0.0"],       // Jordan
  ["57.88.0.0","255.255.0.0"],        // Jordan
  ["62.150.0.0","255.255.0.0"],       // Jordan
  ["64.215.0.0","255.255.0.0"],       // Jordan
  ["69.17.0.0","255.255.0.0"],        // Jordan
  ["69.61.0.0","255.255.0.0"],        // Jordan
  ["74.119.0.0","255.255.0.0"],       // Jordan
  ["77.245.0.0","255.255.0.0"],       // Jordan
  ["78.89.0.0","255.255.0.0"],        // Jordan
  ["79.134.0.0","255.255.0.0"],       // Jordan
  ["79.173.0.0","255.255.0.0"],       // Jordan
  ["80.83.0.0","255.255.0.0"],        // Jordan
  ["80.249.0.0","255.255.0.0"],       // Jordan
  ["82.137.0.0","255.255.0.0"],       // Jordan
  ["82.205.0.0","255.255.0.0"],       // Jordan
  ["83.110.0.0","255.255.0.0"],       // Jordan
  ["84.18.0.0","255.255.0.0"],        // Jordan
  ["84.235.0.0","255.255.0.0"],       // Jordan
  ["85.113.0.0","255.255.0.0"],       // Jordan
  ["85.237.0.0","255.255.0.0"],       // Jordan
  ["87.238.0.0","255.255.0.0"],       // Jordan
  ["88.83.0.0","255.255.0.0"],        // Jordan
  ["89.28.0.0","255.255.0.0"],        // Jordan
  ["91.207.0.0","255.255.0.0"],       // Jordan
  ["91.220.0.0","255.255.0.0"],       // Jordan
  ["91.236.0.0","255.255.0.0"],       // Jordan
  ["92.62.0.0","255.255.0.0"],        // Jordan
  ["92.253.0.0","255.255.0.0"],       // Jordan
  ["93.157.0.0","255.255.0.0"],       // Jordan
  ["93.180.0.0","255.255.0.0"],       // Jordan
  ["95.129.0.0","255.255.0.0"],       // Jordan
  ["95.215.0.0","255.255.0.0"],       // Jordan
  ["104.28.0.0","255.254.0.0"],       // Cloudflare Jordan
  ["108.170.0.0","255.255.0.0"],      // Jordan
  ["128.127.0.0","255.255.0.0"],      // Jordan
  ["130.193.0.0","255.255.0.0"],      // Jordan
  ["134.19.0.0","255.255.0.0"],       // Jordan
  ["134.209.0.0","255.255.0.0"],      // Jordan
  ["139.5.0.0","255.255.0.0"],        // Jordan
  ["141.98.0.0","255.255.0.0"],       // Jordan
  ["141.105.0.0","255.255.0.0"],      // Jordan
  ["147.161.0.0","255.255.0.0"],      // Jordan
  ["149.200.0.0","255.255.0.0"],      // Jordan
  ["151.249.0.0","255.255.0.0"],      // Jordan
  ["154.51.0.0","255.255.0.0"],       // Jordan
  ["154.52.0.0","255.255.0.0"],       // Jordan
  ["156.195.0.0","255.255.0.0"],      // Jordan
  ["158.140.0.0","255.255.0.0"],      // Jordan
  ["159.253.0.0","255.255.0.0"],      // Jordan
  ["162.222.0.0","255.255.0.0"],      // Jordan
  ["163.121.0.0","255.255.0.0"],      // Jordan
  ["167.86.0.0","255.255.0.0"],       // Jordan
  ["168.187.0.0","255.255.0.0"],      // Jordan
  ["169.239.0.0","255.255.0.0"],      // Jordan
  ["170.247.0.0","255.255.0.0"],      // Jordan
  ["172.103.0.0","255.255.0.0"],      // Jordan
  ["173.236.0.0","255.255.0.0"],      // Jordan
  ["176.61.0.0","255.255.0.0"],       // Jordan
  ["178.135.0.0","255.255.0.0"],      // Jordan
  ["178.150.0.0","255.255.0.0"],      // Jordan
  ["185.1.0.0","255.255.0.0"],        // Jordan IX
  ["185.45.0.0","255.255.0.0"],       // Jordan
  ["185.57.0.0","255.255.0.0"],       // Jordan
  ["185.69.0.0","255.255.0.0"],       // Jordan
  ["185.81.0.0","255.255.0.0"],       // Jordan
  ["185.95.0.0","255.255.0.0"],       // Jordan
  ["185.111.0.0","255.255.0.0"],      // Jordan
  ["185.133.0.0","255.255.0.0"],      // Jordan
  ["185.145.0.0","255.255.0.0"],      // Jordan
  ["185.151.0.0","255.255.0.0"],      // Jordan
  ["185.167.0.0","255.255.0.0"],      // Jordan
  ["185.179.0.0","255.255.0.0"],      // Jordan
  ["185.199.0.0","255.255.0.0"],      // Jordan
  ["185.204.0.0","255.255.0.0"],      // Jordan
  ["185.208.0.0","255.255.0.0"],      // Jordan
  ["185.221.0.0","255.255.0.0"],      // Jordan
  ["185.233.0.0","255.255.0.0"],      // Jordan
  ["185.241.0.0","255.255.0.0"],      // Jordan
  ["185.246.0.0","255.255.0.0"],      // Jordan
  ["188.68.0.0","255.255.0.0"],       // Jordan
  ["188.127.0.0","255.255.0.0"],      // Jordan
  ["188.139.0.0","255.255.0.0"],      // Jordan
  ["188.247.0.0","255.255.0.0"],      // Jordan
  ["192.109.0.0","255.255.0.0"],      // Jordan
  ["192.135.0.0","255.255.0.0"],      // Jordan
  ["192.159.0.0","255.255.0.0"],      // Jordan
  ["192.203.0.0","255.255.0.0"],      // Jordan
  ["193.17.0.0","255.255.0.0"],       // Jordan
  ["193.19.0.0","255.255.0.0"],       // Jordan
  ["193.23.0.0","255.255.0.0"],       // Jordan
  ["193.27.0.0","255.255.0.0"],       // Jordan
  ["193.34.0.0","255.255.0.0"],       // Jordan
  ["193.36.0.0","255.255.0.0"],       // Jordan
  ["193.42.0.0","255.255.0.0"],       // Jordan
  ["193.104.0.0","255.255.0.0"],      // Jordan
  ["193.105.0.0","255.255.0.0"],      // Jordan
  ["193.108.0.0","255.255.0.0"],      // Jordan
  ["193.111.0.0","255.255.0.0"],      // Jordan
  ["193.164.0.0","255.255.0.0"],      // Jordan
  ["193.188.0.0","255.255.0.0"],      // Jordan
  ["193.200.0.0","255.255.0.0"],      // Jordan
  ["194.6.0.0","255.255.0.0"],        // Jordan
  ["194.30.0.0","255.255.0.0"],       // Jordan
  ["194.35.0.0","255.255.0.0"],       // Jordan
  ["194.41.0.0","255.255.0.0"],       // Jordan
  ["194.49.0.0","255.255.0.0"],       // Jordan
  ["194.52.0.0","255.255.0.0"],       // Jordan
  ["194.110.0.0","255.255.0.0"],      // Jordan
  ["194.126.0.0","255.255.0.0"],      // Jordan
  ["194.146.0.0","255.255.0.0"],      // Jordan
  ["194.154.0.0","255.255.0.0"],      // Jordan
  ["194.165.0.0","255.255.0.0"],      // Jordan
  ["195.14.0.0","255.255.0.0"],       // Jordan
  ["195.47.0.0","255.255.0.0"],       // Jordan
  ["195.60.0.0","255.255.0.0"],       // Jordan
  ["195.62.0.0","255.255.0.0"],       // Jordan
  ["195.82.0.0","255.255.0.0"],       // Jordan
  ["195.85.0.0","255.255.0.0"],       // Jordan
  ["195.88.0.0","255.255.0.0"],       // Jordan
  ["195.94.0.0","255.255.0.0"],       // Jordan
  ["195.110.0.0","255.255.0.0"],      // Jordan
  ["195.122.0.0","255.255.0.0"],      // Jordan
  ["195.130.0.0","255.255.0.0"],      // Jordan
  ["195.140.0.0","255.255.0.0"],      // Jordan
  ["195.189.0.0","255.255.0.0"],      // Jordan
  ["195.202.0.0","255.255.0.0"],      // Jordan
  ["195.211.0.0","255.255.0.0"],      // Jordan
  ["195.225.0.0","255.255.0.0"],      // Jordan
  ["195.234.0.0","255.255.0.0"],      // Jordan
  ["195.242.0.0","255.255.0.0"],      // Jordan
  ["195.250.0.0","255.255.0.0"],      // Jordan
  ["197.251.0.0","255.255.0.0"],      // Jordan
  ["198.12.0.0","255.255.0.0"],       // Jordan
  ["198.61.0.0","255.255.0.0"],       // Jordan
  ["198.178.0.0","255.255.0.0"],      // Jordan
  ["199.102.0.0","255.255.0.0"],      // Jordan
  ["199.182.0.0","255.255.0.0"],      // Jordan
  ["202.56.0.0","255.255.0.0"],       // Jordan
  ["203.16.0.0","255.255.0.0"],       // Jordan
  ["203.73.0.0","255.255.0.0"],       // Jordan
  ["203.129.0.0","255.255.0.0"],      // Jordan
  ["203.147.0.0","255.255.0.0"],      // Jordan
  ["203.215.0.0","255.255.0.0"],      // Jordan
  ["204.187.0.0","255.255.0.0"],      // Jordan
  ["205.166.0.0","255.255.0.0"],      // Jordan
  ["206.219.0.0","255.255.0.0"],      // Jordan
  ["207.150.0.0","255.255.0.0"],      // Jordan
  ["207.210.0.0","255.255.0.0"],      // Jordan
  ["208.76.0.0","255.255.0.0"],       // Jordan
  ["208.185.0.0","255.255.0.0"],      // Jordan
  ["209.44.0.0","255.255.0.0"],       // Jordan
  ["209.88.0.0","255.255.0.0"],       // Jordan
  ["210.1.0.0","255.255.0.0"],        // Jordan
  ["212.23.0.0","255.255.0.0"],       // Jordan
  ["212.38.0.0","255.255.0.0"],       // Jordan
  ["212.72.0.0","255.255.0.0"],       // Jordan
  ["212.85.0.0","255.255.0.0"],       // Jordan
  ["212.93.0.0","255.255.0.0"],       // Jordan
  ["212.118.0.0","255.255.0.0"],      // Jordan
  ["212.150.0.0","255.255.0.0"],      // Jordan
  ["212.234.0.0","255.255.0.0"],      // Jordan
  ["213.139.0.0","255.255.0.0"],      // Jordan
  ["213.158.0.0","255.255.0.0"],      // Jordan
  ["213.181.0.0","255.255.0.0"],      // Jordan
  ["213.203.0.0","255.255.0.0"],      // Jordan
  ["213.244.0.0","255.255.0.0"],      // Jordan
  ["216.14.0.0","255.255.0.0"],       // Jordan
  ["216.55.0.0","255.255.0.0"],       // Jordan
  ["216.106.0.0","255.255.0.0"],      // Jordan
  ["216.189.0.0","255.255.0.0"],      // Jordan
  ["217.23.0.0","255.255.0.0"],       // Jordan
  ["217.29.0.0","255.255.0.0"],       // Jordan
  ["217.53.0.0","255.255.0.0"],       // Jordan
  ["217.144.0.0","255.255.0.0"],      // Jordan
  ["217.174.0.0","255.255.0.0"],      // Jordan
  ["217.196.0.0","255.255.0.0"]       // Jordan
];

// ================= JORDAN MATCH IPV4 (سيرفرات المباريات) =================
var JORDAN_MATCH_IPV4 = [
  // أفضل سيرفرات للمباريات
  ["46.185.128.0","255.255.128.0"],   // Orange - ممتاز للمباريات
  ["82.212.64.0","255.255.192.0"],    // Orange Mobile
  ["94.249.0.0","255.255.128.0"],     // Orange/Umniah
  ["176.29.0.0","255.255.0.0"],       // Zain - سيرفرات سريعة
  ["176.28.128.0","255.255.128.0"],   // Orange
  ["213.6.0.0","255.255.0.0"],        // Jordan Telecom
  ["86.108.0.0","255.252.0.0"],       // Zain Mobile
  ["90.84.0.0","255.252.0.0"],        // Zain
  ["37.123.128.0","255.255.128.0"],   // Orange
  ["87.236.232.0","255.255.248.0"],   // Umniah
  ["185.107.0.0","255.255.0.0"],      // Orange
  ["212.35.0.0","255.255.0.0"],       // DAMAMAX
  ["188.123.160.0","255.255.224.0"],  // Orange
  ["109.107.0.0","255.255.0.0"],      // Umniah
  ["31.153.0.0","255.255.0.0"],       // Zain
  ["217.144.0.0","255.255.0.0"],      // Orange
  ["176.241.0.0","255.255.0.0"],      // Umniah
  ["37.18.0.0","255.255.0.0"],        // Orange
  ["196.201.0.0","255.255.0.0"],      // Covage
  ["62.72.128.0","255.255.128.0"],    // Batelco
  ["81.21.64.0","255.255.240.0"],     // Mada
  ["213.186.32.0","255.255.224.0"],   // DAMAMAX
  // إضافات إضافية للمباريات
  ["77.247.0.0","255.255.0.0"],       // Orange
  ["80.90.0.0","255.255.0.0"],        // Orange
  ["95.141.0.0","255.255.0.0"],       // Zain
  ["185.55.0.0","255.255.0.0"],       // Orange
  ["185.84.0.0","255.255.0.0"],       // Orange
  ["194.165.128.0","255.255.128.0"]   // Jordan
];

// ================= JORDAN SOCIAL IPV4 (سيرفرات التجنيد) =================
// نطاقات مخصصة للتجنيد (أولوية عالية)
var JORDAN_SOCIAL_IPV4 = [
  ["46.185.128.0","255.255.128.0"],   // Orange - الأفضل للتجنيد
  ["176.29.0.0","255.255.0.0"],       // Zain
  ["82.212.64.0","255.255.192.0"],    // Orange Mobile
  ["212.35.0.0","255.255.0.0"],       // DAMAMAX
  ["94.249.0.0","255.255.128.0"],     // Orange
  ["87.236.232.0","255.255.248.0"],   // Umniah
  ["109.107.0.0","255.255.0.0"],      // Umniah
  ["31.153.0.0","255.255.0.0"],       // Zain
  ["185.107.0.0","255.255.0.0"],      // Orange
  ["77.247.0.0","255.255.0.0"]        // Orange
];

// ================= HELPERS (محسّنة) =================
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

// فحص سريع - يتحقق من أول 3 أوكتات
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

// ================= SMART DNS (محسّن) =================
function resolvePinned(host, mode) {
  var now = Date.now();
  var ttl = SESSION.dnsTTL[host];
  
  // تحديد TTL بناءً على النمط
  var ttlTime = DNS_TTL_MS;
  if (mode === 'fast') ttlTime = DNS_FAST_TTL;
  if (mode === 'social') ttlTime = SOCIAL_TTL;
  
  // تجديد الكاش
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

// ================= GAME STATE DETECTION (محسّن) =================
function detectGameState(url, host) {
  var p = getPort(url);
  var combined = (url + host).toLowerCase();

  // منافذ الجيم بلاي
  var isGamePort = (p >= 6000 && p <= 9000) ||
                   (p >= 10000 && p <= 10100) ||
                   (p >= 20000 && p <= 25000) ||
                   (p >= 30000 && p <= 40000);

  if (isGamePort) SESSION.inGame = true;

  // إعادة تعيين
  if (/lobby|matchmaking|prepare|queue|main.*menu|start/i.test(combined)) {
    SESSION.inGame = false;
  }

  return SESSION.inGame;
}

// ================= PORT DETECTION =================
function isMatchPort(url) {
  var p = getPort(url);
  return (p >= 6000 && p <= 10000) || (p >= 20000 && p <= 40000);
}

function isUDPFirst(u, h) {
  return isMatchPort(u) || /udp|realtime|tick|sync|frame|state/i.test(u + h);
}

// ================= PUBG DOMAINS (شامل) =================
function isPUBG(host) {
  return (
    // PUBG الأساسية
    shExpMatch(host, "*.pubgmobile.com")    ||
    shExpMatch(host, "*.pubgmobile.net")    ||
    shExpMatch(host, "*.igamecj.com")       ||
    shExpMatch(host, "*.tencent.com")       ||
    shExpMatch(host, "*.gcloudcs.com")      ||
    shExpMatch(host, "*.qcloud.com")        ||
    shExpMatch(host, "*.levelinfinite.com") ||
    shExpMatch(host, "*.krafton.com")       ||
    // Tencent CDNs
    shExpMatch(host, "*.amazonaws.com")     ||
    shExpMatch(host, "*.cloudfront.net")    ||
    shExpMatch(host, "*.akamaized.net")     ||
    shExpMatch(host, "*.akamai.net")        ||
    shExpMatch(host, "*.tencentcloud.com")  ||
    shExpMatch(host, "*.myqcloud.com")      ||
    shExpMatch(host, "*.cdn.dl.pstmn.io")   ||
    // Auth & AntiCheat
    shExpMatch(host, "*.gamesafe.qq.com")   ||
    shExpMatch(host, "*.msdl.microsoft.com")||
    shExpMatch(host, "*.xboxlive.com")      ||
    shExpMatch(host, "*.playfab.com")       ||
    shExpMatch(host, "*.tgpqq.com")         ||
    // Friends & Social (مهم للتجنيد)
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
    // QQ Services
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
    // Gaming Services
    shExpMatch(host, "*.game.qq.com")       ||
    shExpMatch(host, "*.igame.qq.com")      ||
    shExpMatch(host, "*.pvp.net")           ||
    shExpMatch(host, "*.riotgames.com")     ||
    shExpMatch(host, "*.discord.com")       ||
    shExpMatch(host, "*.discordapp.com")    ||
    shExpMatch(host, "*.discord.gg")        ||
    // Payment & Events
    shExpMatch(host, "*.pay.qq.com")        ||
    shExpMatch(host, "*.event.qq.com")      ||
    shExpMatch(host, "*.activity.qq.com")   ||
    shExpMatch(host, "*.midas.qq.com")
  );
}

// ================= TRAFFIC CLASSIFICATION (محسّن) =================
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

function isLobby(u, h) {
  var combined = (u + h).toLowerCase();
  return /lobby|matchmaking|queue|dispatch|gateway|region|prepare|entry|roster|rank|mainmenu/i.test(combined);
}

// ================= SOCIAL DETECTION (محسّن جداً للتجنيد) =================
function isSocial(u, h) {
  var combined = (u + h).toLowerCase();
  return (
    // تجنيد وأصدقاء
    /friend|invite|squad|team|party|clan|presence|chat|voice|guild|group/i.test(combined) ||
    /recruit|recruitment|apply|join|member|crew|alliance/i.test(combined) ||
    /social|buddy|companion|ally|partner|cooperate/i.test(combined) ||
    // تسجيل دخول وصلة
    /wtlogin|login|session|token|auth|verify/i.test(combined) ||
    // قوائم
    /nearby|recommend|search.*player|find.*player|player.*info|player.*list/i.test(combined) ||
    /relation|relationlist|addfriend|accept.*invite|reject.*invite/i.test(combined) ||
    // أنماط Tencent
    /openmobile|graph.*qq|ssl.*qq|friend.*qq|splits|idip/i.test(combined) ||
    // صوت وتواصل
    /voice|mic|speaker|audio.*chat|realtime.*voice/i.test(combined) ||
    // إضافات
    /session.*friend|sync.*friend|push.*friend|notify.*friend/i.test(combined) ||
    /presence|online|offline|status|away|busy/i.test(combined) ||
    /message|msg|inbox|notification|alert/i.test(combined) ||
    // Profiles
    /profile|avatar|emblem|badge|achievement|statistic/i.test(combined)
  );
}

// كشف التجنيد (أولوية قصوى)
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

// ================= SESSION MANAGEMENT (محسّن) =================
function lockMatchSession(ip, proxy) {
  if (!SESSION.matchNet) {
    SESSION.matchNet   = getNet24(ip);
    SESSION.matchProxy = proxy;
    SESSION.matchStart = Date.now();
  }
}

function isMatchSessionLocked(ip) {
  // تحرير بعد انتهاء المباراة (10 دقائق)
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

// قفل جلسة التجنيد (جديد - مهم للسرعة)
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
  // تحرير بعد 60 ثانية من عدم النشاط
  if (SESSION.socialLock && (Date.now() - SESSION.lastSocialAct > 60000)) {
    SESSION.socialLock = null;
    SESSION.socialNet  = null;
    return false;
  }
  return SESSION.socialLock === ip || (SESSION.socialNet && getNet24(ip) === SESSION.socialNet);
}

// ================= PROBE LIMITER (محسّن) =================
function isBlockedHost(host) {
  var count = SESSION.probeCount[host] || 0;
  return count > PROBE_LIMIT;
}

function markProbe(host) {
  SESSION.probeCount[host] = (SESSION.probeCount[host] || 0) + 1;
}

function cleanupProbes() {
  var now = Date.now();
  if (now - SESSION.lastReset > 300000) { // كل 5 دقائق
    SESSION.probeCount = {};
    SESSION.lastReset = now;
  }
}

// ================= HOT PATH (جديد - للسرعة القصوى) =================
function updateHotPath(path, ip) {
  SESSION.hotPath = { path: path, ip: ip, time: Date.now() };
}

function getHotPath() {
  if (SESSION.hotPath && (Date.now() - SESSION.hotPath.time < 30000)) {
    return SESSION.hotPath.path;
  }
  return null;
}

// ================= MAIN FUNCTION (محسّن) =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // تنظيف دوري
  cleanupProbes();

  // ===== PUBG DOMAIN CHECK =====
  if (!isPUBG(host)) return BLOCK;

  // ===== PROBE LIMITER =====
  if (isBlockedHost(host)) return BLOCK;

  // ===== DNS RESOLVE (ذكي) =====
  var mode = 'normal';
  if (isMatch(url, host)) mode = 'fast';
  else if (isRecruitment(url, host) || isSocial(url, host)) mode = 'social';
  
  var ip = resolvePinned(host, mode);
  if (!ip || ip.indexOf(":") > -1) {
    markProbe(host);
    return BLOCK;
  }

  // ===== JORDAN ISP CHECK (سريع) =====
  if (!isInListFast(ip, JORDAN_ALL_IPV4)) {
    markProbe(host);
    return BLOCK;
  }

  // ===== RECRUITMENT (أولوية قصوى) =====
  if (isRecruitment(url, host)) {
    if (!isInList(ip, JORDAN_SOCIAL_IPV4)) {
      if (!isInList(ip, JORDAN_ALL_IPV4)) return BLOCK;
    }
    lockSocialSession(ip);
    updateHotPath(LOBBY_PROXY, ip);
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== SOCIAL / FRIENDS (أولوية عالية) =====
  if (isSocial(url, host)) {
    if (!isInList(ip, JORDAN_SOCIAL_IPV4)) {
      if (!isInList(ip, JORDAN_ALL_IPV4)) return BLOCK;
    }
    lockSocialSession(ip);
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== AUTH =====
  if (isAuth(url, host)) {
    if (!isInList(ip, JORDAN_ALL_IPV4)) return BLOCK;
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

    return MATCH_JO + "; " + MATCH_FAILOVER;
  }

  // ===== LOBBY =====
  if (isLobby(url, host)) {
    resetMatchSession();
    if (!isInList(ip, JORDAN_ALL_IPV4)) return BLOCK;
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== CDN =====
  if (isCDN(url, host)) {
    if (!isInList(ip, JORDAN_ALL_IPV4)) return BLOCK;
    return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
  }

  // ===== FALLBACK =====
  if (!isInList(ip, JORDAN_ALL_IPV4)) return BLOCK;
  return LOBBY_PROXY + "; " + LOBBY_FAILOVER;
}
