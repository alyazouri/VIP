/* =========================================================
   T | JORDAN TITANIUM CORE
   PUBG MOBILE — 8 SECOND TIER ROTATION
   JORDAN RESIDENTIAL PRIORITY
   STICKY ROUTING
   ZERO DIRECT
   PAC COMPATIBLE
   ========================================================= */


/* =========================================================
   🌐 PROXY DEFINITIONS
   ========================================================= */

var PROXY_A = "PROXY 85.159.217.18:80";
var PROXY_B = "PROXY 85.159.217.18:443";
var PROXY_C = "PROXY 92.253.2.100:8080";


/* =========================================================
   ⚡ ULTRA HASH
   ========================================================= */

function ultraHash(str) {

  var h = 2166136261;

  for (var i = 0; i < str.length; i++) {

    h ^= str.charCodeAt(i);

    h +=
      (h << 1) +
      (h << 4) +
      (h << 7) +
      (h << 8) +
      (h << 24);
  }

  return h >>> 0;
}


/* =========================================================
   🧹 NORMALIZE HOST
   ========================================================= */

function normalizeHost(host) {

  host = host || "";

  host = host.toLowerCase();

  host = host.replace(/^\s+|\s+$/g,"");

  host = host.replace(/^\.+|\.+$/g,"");

  return host;
}


/* =========================================================
   🌐 IPv4 VALIDATION
   ========================================================= */

function isIPv4(host) {

  if (!host) {
    return false;
  }

  var parts = host.split(".");

  if (parts.length !== 4) {
    return false;
  }

  for (var i = 0; i < 4; i++) {

    if (!/^\d+$/.test(parts[i])) {
      return false;
    }

    var n = parseInt(parts[i],10);

    if (n < 0 || n > 255) {
      return false;
    }
  }

  return true;
}


/* =========================================================
   🇯🇴 PRIMARY JORDAN RESIDENTIAL
   كل نطاقين = Tier
   ========================================================= */

function jordanResidentialTier(host) {

  if (!isIPv4(host)) {
    return 0;
  }


  /* TIER 26 */

  if (
    isInNet(host,"46.32.96.0","255.255.224.0") ||
    isInNet(host,"37.202.64.0","255.255.192.0")
  ) {
    return 26;
  }


  /* TIER 25 */

  if (
    isInNet(host,"37.17.192.0","255.255.240.0") ||
    isInNet(host,"46.185.128.0","255.255.128.0")
  ) {
    return 25;
  }


  /* TIER 24 */

  if (
    isInNet(host,"86.108.0.0","255.255.128.0") ||
    isInNet(host,"92.253.0.0","255.255.128.0")
  ) {
    return 24;
  }


  /* TIER 23 */

  if (
    isInNet(host,"94.249.0.0","255.255.128.0") ||
    isInNet(host,"149.200.128.0","255.255.128.0")
  ) {
    return 23;
  }


  /* TIER 22 */

  if (
    isInNet(host,"94.142.32.0","255.255.224.0") ||
    isInNet(host,"79.173.192.0","255.255.192.0")
  ) {
    return 22;
  }


  /* TIER 21 */

  if (
    isInNet(host,"194.165.128.0","255.255.224.0") ||
    isInNet(host,"79.134.128.0","255.255.224.0")
  ) {
    return 21;
  }


  /* TIER 20 */

  if (
    isInNet(host,"213.186.160.0","255.255.224.0") ||
    isInNet(host,"213.139.32.0","255.255.224.0")
  ) {
    return 20;
  }


  /* TIER 19 */

  if (
    isInNet(host,"212.34.0.0","255.255.224.0") ||
    isInNet(host,"84.18.32.0","255.255.224.0")
  ) {
    return 19;
  }


  /* TIER 18 */

  if (
    isInNet(host,"84.18.64.0","255.255.224.0") ||
    isInNet(host,"81.28.112.0","255.255.240.0")
  ) {
    return 18;
  }


  return 0;
}


/* =========================================================
   🇯🇴 EXTENDED JORDAN
   ========================================================= */

function jordanExtendedTier(host) {

  if (!isIPv4(host)) {
    return 0;
  }


  /* TIER 17 */

  if (
    isInNet(host,"176.28.128.0","255.255.128.0") ||
    isInNet(host,"109.107.224.0","255.255.224.0")
  ) {
    return 17;
  }


  /* TIER 16 */

  if (
    isInNet(host,"109.237.192.0","255.255.240.0") ||
    isInNet(host,"95.141.208.0","255.255.240.0")
  ) {
    return 16;
  }


  /* TIER 15 */

  if (
    isInNet(host,"95.172.192.0","255.255.224.0") ||
    isInNet(host,"91.106.96.0","255.255.240.0")
  ) {
    return 15;
  }


  /* TIER 14 */

  if (
    isInNet(host,"93.93.144.0","255.255.248.0") ||
    isInNet(host,"93.95.200.0","255.255.248.0")
  ) {
    return 14;
  }


  /* TIER 13 */

  if (
    isInNet(host,"94.127.208.0","255.255.248.0") ||
    isInNet(host,"176.57.0.0","255.255.224.0")
  ) {
    return 13;
  }


  /* TIER 12 */

  if (
    isInNet(host,"178.20.184.0","255.255.248.0") ||
    isInNet(host,"37.44.32.0","255.255.248.0")
  ) {
    return 12;
  }


  /* TIER 11 */

  if (
    isInNet(host,"37.75.144.0","255.255.248.0") ||
    isInNet(host,"37.123.64.0","255.255.224.0")
  ) {
    return 11;
  }


  /* TIER 10 */

  if (
    isInNet(host,"46.23.112.0","255.255.240.0") ||
    isInNet(host,"46.248.192.0","255.255.224.0")
  ) {
    return 10;
  }


  /* TIER 9 */

  if (
    isInNet(host,"87.236.232.0","255.255.248.0") ||
    isInNet(host,"87.238.128.0","255.255.248.0")
  ) {
    return 9;
  }


  /* TIER 8 */

  if (
    isInNet(host,"89.28.216.0","255.255.248.0") ||
    isInNet(host,"89.38.152.0","255.255.254.0")
  ) {
    return 8;
  }


  return 0;
}


/* =========================================================
   🇯🇴 SMALL JORDAN
   ========================================================= */

function jordanSmallTier(host) {

  if (!isIPv4(host)) {
    return 0;
  }


  /* TIER 7 */

  if (
    isInNet(host,"62.72.161.0","255.255.255.0") ||
    isInNet(host,"62.72.162.0","255.255.255.0")
  ) {
    return 7;
  }


  /* TIER 6 */

  if (
    isInNet(host,"62.72.165.0","255.255.255.0") ||
    isInNet(host,"62.72.166.0","255.255.255.0")
  ) {
    return 6;
  }


  /* TIER 5 */

  if (
    isInNet(host,"62.72.168.0","255.255.252.0") ||
    isInNet(host,"62.72.174.0","255.255.255.0")
  ) {
    return 5;
  }


  /* TIER 4 */

  if (
    isInNet(host,"62.72.176.0","255.255.255.0") ||
    isInNet(host,"62.72.179.0","255.255.255.0")
  ) {
    return 4;
  }


  /* TIER 3 */

  if (
    isInNet(host,"62.72.180.0","255.255.255.0") ||
    isInNet(host,"62.72.184.0","255.255.252.0")
  ) {
    return 3;
  }


  /* TIER 2 */

  if (
    isInNet(host,"62.72.191.0","255.255.255.0")
  ) {
    return 2;
  }


  return 0;
}


/* =========================================================
   📊 FINAL REGION TIER
   ========================================================= */

function regionTier(host) {

  host = normalizeHost(host);


  var primaryTier = jordanResidentialTier(host);

  if (primaryTier > 0) {
    return primaryTier;
  }


  var extendedTier = jordanExtendedTier(host);

  if (extendedTier > 0) {
    return extendedTier;
  }


  var smallTier = jordanSmallTier(host);

  if (smallTier > 0) {
    return smallTier;
  }


  return 0;
}


/* =========================================================
   ⏱️ 8 SECOND TIER ROTATION
   ========================================================= */

var TIER_ROTATION = [
  26,
  25,
  24,
  23,
  22,
  21,
  20,
  19,
  18,
  17,
  16,
  15,
  14,
  13,
  12,
  11,
  10,
  9,
  8,
  7,
  6,
  5,
  4,
  3,
  2
];


function getActiveTier() {

  /*
     كل Tier يعمل 8 ثواني.
     لا يوجد Timer حقيقي؛
     PAC يحسب الـSlot من الوقت الحالي.
  */

  var now = new Date().getTime();

  var slot = Math.floor(now / 8000);

  var index = slot % TIER_ROTATION.length;

  return TIER_ROTATION[index];
}


/* =========================================================
   🎮 PUBG DIRECT IDENTIFIERS
   ========================================================= */

function isPUBGDirect(s) {

  return (

    /(^|[.\-_])pubg([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgm([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgsea([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgkr([.\-_]|$)/.test(s) ||
    /(^|[.\-_])pubgcs([.\-_]|$)/.test(s)
  );
}


/* =========================================================
   🎮 PUBG PUBLISHER
   ========================================================= */

function isPUBGPublisher(s) {

  return (

    /(^|[.\-_])krafton([.\-_]|$)/.test(s) ||
    /(^|[.\-_])tencent([.\-_]|$)/.test(s) ||
    /(^|[.\-_])lightspeed([.\-_]|$)/.test(s) ||
    /(^|[.\-_])proximabeta([.\-_]|$)/.test(s) ||
    /(^|[.\-_])igame([.\-_]|$)/.test(s)
  );
}


/* =========================================================
   ☁️ PUBG INFRASTRUCTURE
   ========================================================= */

function isPUBGInfra(s) {

  return (

    /qcloud/.test(s) ||
    /myqcloud/.test(s) ||
    /tencentcs/.test(s) ||

    /amazonaws/.test(s) ||
    /aliyun/.test(s) ||
    /alibaba/.test(s) ||
    /cloudfront/.test(s)
  );
}


/* =========================================================
   🎮 PUBG GAME SERVICES
   ========================================================= */

function isPUBGService(s) {

  return (

    /matchmaking/.test(s) ||
    /matchmaker/.test(s) ||

    /gameserver/.test(s) ||
    /game-server/.test(s) ||

    /gamesession/.test(s) ||
    /game-session/.test(s) ||

    /sessionserver/.test(s) ||
    /session-server/.test(s) ||

    /matchserver/.test(s) ||
    /match-server/.test(s) ||

    /dispatcher/.test(s) ||
    /allocation/.test(s)
  );
}


/* =========================================================
   🎮 PUBG MAP / MODE
   ========================================================= */

function isPUBGMode(s) {

  return (

    /erangel/.test(s) ||
    /livik/.test(s) ||
    /sanhok/.test(s) ||
    /miramar/.test(s) ||
    /vikendi/.test(s) ||
    /karakin/.test(s) ||
    /nusa/.test(s) ||

    /tdm/.test(s) ||
    /teamdeathmatch/.test(s) ||

    /payload/.test(s) ||
    /metroroyale/.test(s) ||
    /metro-royale/.test(s)
  );
}


/* =========================================================
   🎮 PUBG API
   ========================================================= */

function isPUBGAPI(u) {

  return (

    /(\/api\/|\/v1\/|\/v2\/|\/v3\/)/.test(u) &&

    /(game|match|session|battle|player|server|region)/.test(u)
  );
}


/* =========================================================
   🌍 PUBG SERVER DISCOVERY
   ========================================================= */

function isPUBGServerDiscovery(s,u) {

  return (

    /(serverlist|server-list|realm|routing)/.test(u) &&

    /(game|match|player|pubg|pubgm|tencent|krafton)/.test(s)
  );
}


/* =========================================================
   📦 PUBG RESOURCE
   ========================================================= */

function isPUBGResource(s,u) {

  return (

    /(patch|update|resource|asset|hotfix)/.test(u) &&

    /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton)/.test(s)
  );
}


/* =========================================================
   🧠 PUBG SCORE
   ========================================================= */

function getPUBGScore(host,url) {

  var h = normalizeHost(host);

  var u = (url || "").toLowerCase();

  u = u.replace(/[\r\n\t]/g,"");

  var s = h + " " + u;

  var score = 0;


  if (isPUBGDirect(s)) {
    score += 100;
  }


  if (isPUBGPublisher(s)) {
    score += 85;
  }


  if (isPUBGInfra(s)) {
    score += 25;
  }


  if (isPUBGService(s)) {
    score += 70;
  }


  if (isPUBGMode(s)) {
    score += 45;
  }


  if (isPUBGAPI(u)) {
    score += 35;
  }


  if (isPUBGServerDiscovery(s,u)) {
    score += 40;
  }


  if (isPUBGResource(s,u)) {
    score += 30;
  }


  if (
    /match/.test(s) &&
    /(game|session|battle|server)/.test(s)
  ) {
    score += 15;
  }


  if (
    /battle/.test(s) &&
    /(game|match|session|server)/.test(s)
  ) {
    score += 15;
  }


  return score;
}


/* =========================================================
   🏆 FINAL PUBG DETECTION
   ========================================================= */

function isPUBG(host,url) {

  return getPUBGScore(host,url) >= 60;
}


/* =========================================================
   🔒 STICKY CORE
   ========================================================= */

var LOCKED_CORE = null;


/* =========================================================
   🚀 CORE SELECTION
   ========================================================= */

function selectCore(host,url) {

  /*
     إذا تم تثبيت Proxy سابقًا،
     نحافظ عليه.
  */

  if (LOCKED_CORE !== null) {
    return LOCKED_CORE;
  }


  var tier = regionTier(host);

  var activeTier = getActiveTier();


  /* =======================================================
     🇯🇴 ACTIVE TIER
     ======================================================= */

  if (
    tier === activeTier &&
    tier >= 2
  ) {

    LOCKED_CORE = PROXY_A;

    return LOCKED_CORE;
  }


  /* =======================================================
     🇯🇴 ANY KNOWN JORDAN TIER
     ======================================================= */

  if (tier >= 2) {

    LOCKED_CORE = PROXY_A;

    return LOCKED_CORE;
  }


  /* =======================================================
     🌍 UNKNOWN
     ======================================================= */

  var hash = ultraHash(
    host + "|" + url
  );

  var selector = hash % 3;


  if (selector === 0) {

    LOCKED_CORE = PROXY_A;

  } else if (selector === 1) {

    LOCKED_CORE = PROXY_B;

  } else {

    LOCKED_CORE = PROXY_C;
  }


  return LOCKED_CORE;
}


/* =========================================================
   🛡️ NON PUBG
   ========================================================= */

function selectNonPUBGCore() {

  return PROXY_A;
}


/* =========================================================
   🚀 MAIN PAC ENGINE
   ========================================================= */

function FindProxyForURL(url,host) {

  /*
     PAC supplies URL and HOST.
     لا تضع قيمًا ثابتة هنا.
  */

  host = host || "";

  url = url || "";


  host = normalizeHost(host);


  /* =======================================================
     🎮 PUBG
     ======================================================= */

  if (isPUBG(host,url)) {

    return selectCore(host,url);
  }


  /* =======================================================
     🌐 EVERYTHING ELSE
     ======================================================= */

  return selectNonPUBGCore();
}
