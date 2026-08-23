// ══════════════════════════════════════════════════════════════
//  PUBG ALL-IN JORDAN ULTRA v3.0 — "QUANTUM FORGE"
//  📅 Updated: 2026-08  |  Season 28+
//  🎯 Priority: Jordan FIRST → Gulf ONLY (Block All Others)
//  🔧 Fixed: getRealIPv4 | BLOCKED prefix | Date.now safety
//  🆕 Expanded: Jordan/Gulf ranges | PUBG S28+ modes | IPv6
// ══════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────
//  §1  PROXIES (STABLE)
//  LOBBY  → 9030 : Matchmaking + WOW + Arena
//  MATCH  → 20001: In-Game (Classic / Ranked)
//  VOICE  → 20001: Voice Chat (RTC/WebRTC)
// ─────────────────────────────────────────────
var LOBBY_PROXY =
  "PROXY 176.29.153.95:9030; " +
  "PROXY 212.35.66.45:9030";

var MATCH_PROXY =
  "PROXY 176.29.153.95:20001; " +
  "PROXY 212.35.66.45:20001";

var VOICE_PROXY =
  "PROXY 82.212.84.33:20001; " +
  "PROXY 82.212.84.33:10012";

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ─────────────────────────────────────────────
//  §2  ALWAYS DIRECT — System + CDN + Social
// ─────────────────────────────────────────────
var SAFE_DIRECT = [
  // Apple System
  "captive.apple.com","time.apple.com","ocsp.apple.com",
  "albert.apple.com","mesu.apple.com","gs.apple.com",
  // Google System
  "clients3.google.com","gstatic.com","googleapis.com",
  "safebrowsing.googleapis.com",
  // Microsoft
  "windowsupdate.com","update.microsoft.com",
  // CDN
  "akamaied.net","akamaihd.net","cloudfront.net",
  "fastly.net","edgesuite.net",
  // Video
  "youtube.com","googlevideo.com","ytimg.com",
  "fbcdn.net","cdninstagram.com",
  "tiktokcdn.com","tiktokv.com",
  // Dev
  "github.com","github.io","githubusercontent.com"
];

// ─────────────────────────────────────────────
//  §3  BITMASK TABLES — Jordan IPv4
//  مرتّبة: Zain → Orange → Umniah → Linkdotnet → Others
//  [network >>> 0, mask >>> 0]
// ─────────────────────────────────────────────

// ══════ ZAIN JO (AS48832) ══════
var JO_ZAIN = [
  [0x52D44000, 0xFFFFC000],  // 82.212.64.0/18   Core Block
  [0xB01D0000, 0xFFFF0000],  // 176.29.0.0/16    Fixed Broad
  [0xB01D9800, 0xFFFFFF00],  // 176.29.152.0/24  Game Servers
  [0xB01C8000, 0xFFFF8000],  // 176.28.128.0/17  Wholesale
  [0xBC7BA000, 0xFFFFE000],  // 188.123.160.0/19 LTE Pool
  [0x25DC7000, 0xFFFFF000],  // 37.220.112.0/20  2023 Block
  [0x5EF90000, 0xFFFF8000],  // 94.249.0.0/17    DC
  [0x511C7000, 0xFFFFF000],  // 81.28.112.0/20   Mobile Data
  [0x52D45000, 0xFFFFF000],  // 82.212.80.0/20   2024 Sub-A
  [0x52D46000, 0xFFFFE000]   // 82.212.96.0/19   2024 Sub-B
];

// ══════ ORANGE JO / JDC (AS8697/AS9038) ══════
var JO_ORANGE = [
  [0x2EB98000, 0xFFFF8000],  // 46.185.128.0/17  Broadband Core
  [0x566C0000, 0xFFFF8000],  // 86.108.0.0/17    DSL Pool
  [0x4FADC000, 0xFFFFC000],  // 79.173.192.0/18  Mobile
  [0x5CFD0000, 0xFFFF8000],  // 92.253.0.0/17    Business
  [0x25CA4000, 0xFFFFC000],  // 37.202.64.0/18   JDC
  [0xC1BC4000, 0xFFFFE000],  // 193.188.64.0/19  Legacy
  [0xC2A58000, 0xFFFFE000],  // 194.165.128.0/19 PA Block
  [0xD5BAA000, 0xFFFFE000],  // 213.186.160.0/19 Backbone
  [0x5BBAE000, 0xFFFFE000],  // 91.186.224.0/19  Enterprise
  [0xD9170000, 0xFFFFF000]   // 217.23.0.0/20    Peering
];

// ══════ UMNIAH (AS50670) ══════
var JO_UMNIAH = [
  [0x2EF8C000, 0xFFFFE000],  // 46.248.192.0/19  Mobile Core
  [0x5CF12000, 0xFFFFE000],  // 92.241.32.0/19   LTE Data
  [0x6D6BE000, 0xFFFFE000],  // 109.107.224.0/19 4G Pool
  [0x052D8000, 0xFFFFF000],  // 5.45.128.0/20    Legacy DSL
  [0x2E177000, 0xFFFFF000],  // 46.23.112.0/20   Fixed
  [0x95C88000, 0xFFFF8000],  // 149.200.128.0/17 Shared Block
  [0xB2EEB000, 0xFFFFF000],  // 178.238.176.0/20 Extended
  [0x2EB78000, 0xFFFF8000]   // 46.183.0.0/17    2024 New
];

// ══════ LINKDOTNET JO ══════
var JO_LINK = [
  [0x2E206000, 0xFFFFE000],  // 46.32.96.0/19
  [0x505AA000, 0xFFFFF000],  // 80.90.160.0/20
  [0x5E8E2000, 0xFFFFE000],  // 94.142.32.0/19
  [0x4DF50000, 0xFFFFF000],  // 77.245.0.0/20
  [0x505A8000, 0xFFFF8000]   // 80.90.128.0/17
];

// ══════ BATELCO JO ══════
var JO_BATELCO = [
  [0x5B6A6000, 0xFFFFF000],  // 91.106.96.0/20
  [0xD4760000, 0xFFFFE000],  // 212.118.0.0/19
  [0x25DC7000, 0xFFFFF000]   // 37.220.112.0/20
];

// ══════ VTEL JO ══════
var JO_VTEL = [
  [0x3E48A000, 0xFFFFE000],  // 62.72.160.0/19
  [0x51150000, 0xFFFFF000],  // 81.21.0.0/20
  [0x6DEDC000, 0xFFFFC000],  // 109.237.192.0/18
  [0xB0390000, 0xFFFFE000],  // 176.57.0.0/19
  [0xB24D8000, 0xFFFFC000]   // 178.77.128.0/18
];

// ══════ JORDAN TELECOM PSC (AS8697) ══════
var JO_JT = [
  [0xD4220000, 0xFFFFE000],  // 212.34.0.0/19
  [0xD4234000, 0xFFFFC000],  // 212.35.64.0/18  ← Game Servers
  [0xD58B2000, 0xFFFFE000],  // 213.139.32.0/19
  [0xD9900000, 0xFFFFF000],  // 217.144.0.0/20
  [0xD91B2000, 0xFFFFE000]   // 217.27.32.0/19
];

// ══════ AL MOUAKHAH / OTHERS ══════
var JO_OTHER = [
  [0x2511C000, 0xFFFFF000],  // 37.17.192.0/20
  [0x257B4000, 0xFFFFE000],  // 37.123.64.0/19
  [0x5F8DD000, 0xFFFFF000],  // 95.141.208.0/20
  [0x54122000, 0xFFFFE000],  // 84.18.32.0/19
  [0x25988000, 0xFFFFF000],  // 37.152.128.0/20
  [0x05160000, 0xFFFF0000],  // 5.22.0.0/16 — NITC
  [0xB9188000, 0xFFFFE000],  // 185.24.128.0/19
  [0xB93E8000, 0xFFFFE000],  // 185.62.128.0/19
  [0xBC7B4000, 0xFFFFE000],  // 188.123.64.0/19
  [0xBCF74000, 0xFFFFE000]   // 188.247.64.0/19
];

// ─────────────────────────────────────────────
//  §4  BITMASK TABLES — Gulf IPv4
//  مرتّبة: BH (أقرب) → SA → UAE → KW → QA → OM
// ─────────────────────────────────────────────
var GULF_MASKS = [
  // Bahrain — أقرب وأفضل fallback
  [0xB97DBB00, 0xFFFFFC00],  // 185.125.188.0/22
  [0x2EB7D800, 0xFFFFFC00],  // 46.183.216.0/22
  [0x4E1A0000, 0xFFFE0000],  // 78.26.0.0/15
  [0x5B4A0000, 0xFFFF0000],  // 91.74.0.0/16
  [0x50F10000, 0xFFFF0000],  // 80.241.0.0/16

  // Saudi Arabia
  [0xD4470000, 0xFFFF0000],  // 212.71.0.0/16
  [0xB9C14000, 0xFFFFC000],  // 185.193.64.0/18
  [0xB9C20000, 0xFFFE0000],  // 185.194.0.0/15
  [0x5E1A0000, 0xFFFF0000],  // 94.26.0.0/16
  [0x5FB10000, 0xFFFF0000],  // 95.177.0.0/16
  [0x25B80000, 0xFFFF8000],  // 37.184.0.0/17
  [0x2E980000, 0xFFFF8000],  // 46.152.0.0/17
  [0x25E00000, 0xFFFF0000],  // 37.224.0.0/16
  [0xBC870000, 0xFFFF8000],  // 188.135.0.0/17
  [0x6DE00000, 0xFFFF8000],  // 109.224.0.0/17
  [0x5F450000, 0xFFFF0000],  // 95.69.0.0/16

  // UAE
  [0x053E3C00, 0xFFFFFC00],  // 5.62.60.0/22
  [0x1FC00000, 0xFFFF0000],  // 31.192.0.0/16
  [0x1FC10000, 0xFFFF0000],  // 31.193.0.0/16
  [0x56600000, 0xFFFF0000],  // 86.96.0.0/16
  [0x5EC80000, 0xFFFF8000],  // 94.200.0.0/17
  [0xD52A0000, 0xFFFF8000],  // 213.42.0.0/17

  // Kuwait
  [0x3E540000, 0xFFFF0000],  // 62.84.0.0/16
  [0x52B20000, 0xFFFF0000],  // 82.178.0.0/16
  [0x5B8C0000, 0xFFFF0000],  // 91.140.0.0/16
  [0x5E800000, 0xFFFF0000],  // 94.128.0.0/16

  // Qatar
  [0x25D20000, 0xFFFF0000],  // 37.210.0.0/16
  [0x59D30000, 0xFFFF0000],  // 89.211.0.0/16

  // Oman
  [0xB9400000, 0xFFFF0000],  // 185.64.0.0/16
  [0x05240000, 0xFFFF0000],  // 5.36.0.0/16
  [0x25B80000, 0xFFFF0000]   // 37.184.0.0/16
];

// ─────────────────────────────────────────────
//  §5  AFGHANISTAN BLOCK — Tight CIDR confirm
// ─────────────────────────────────────────────
var AF_MASKS = [
  [0x3A938000, 0xFFFFE000],  // 58.147.128.0/19
  [0x3B997C00, 0xFFFFFC00],  // 59.153.124.0/22
  [0x3D05C000, 0xFFFFF000],  // 61.5.192.0/20
  [0x5B6DD800, 0xFFFFF800],  // 91.109.216.0/21
  [0x67053C00, 0xFFFFFC00],  // 103.5.172.0/22
  [0x670D4000, 0xFFFFFC00],  // 103.13.64.0/22
  [0x67113C00, 0xFFFFFC00],  // 103.17.60.0/22
  [0x6712A000, 0xFFFFFC00],  // 103.18.160.0/22
  [0x67172400, 0xFFFFFC00],  // 103.23.36.0/22
  [0x671C8400, 0xFFFFFC00],  // 103.28.132.0/22
  [0x2D413800, 0xFFFFFC00],  // 45.65.56.0/22
  [0x2D748000, 0xFFFFFE00]   // 45.116.128.0/23
];

// ─────────────────────────────────────────────
//  §6  FAR-REGION BLOCK — Asia/EU/Americas
//  (حجب سريع قبل isInNet — بـ prefix بدلاً من string match)
// ─────────────────────────────────────────────
var FAR_MASKS = [
  // Asia Pacific — AWS/Alibaba/Tencent edges
  [0x082BD000, 0xFFFFF000],  // 8.43.208.0/20   — SGP
  [0x2FF50000, 0xFFFF0000],  // 47.245.0.0/16   — ALI SGP
  [0x2B840000, 0xFFFF0000],  // 43.132.0.0/16   — TC HK
  [0x129F0000, 0xFFFF0000],  // 18.163.0.0/16   — AWS HK
  [0x0DE40000, 0xFFFF0000],  // 13.228.0.0/16   — AWS SGP
  [0xAF290000, 0xFFFF0000],  // 175.41.0.0/16   — AWS SGP2
  [0x77510000, 0xFFFF0000],  // 119.81.0.0/16   — IBM SGP
  [0x34FA0000, 0xFFFF0000],  // 52.250.0.0/16   — AWS AP
  [0x3444C000, 0xFFFF0000],  // 52.68.0.0/16    — AWS JP
  [0x36AC0000, 0xFFFF0000],  // 54.172.0.0/16   — AWS JP2
  [0x78640000, 0xFFFF0000],  // 120.76.0.0/16   — ALI SH
  [0x7928C000, 0xFFFF0000],  // 121.40.192.0/18 — ALI HZ

  // Europe — AWS EU
  [0x1299B000, 0xFFFF0000],  // 18.185.0.0/16   — AWS EU-W
  [0x03780000, 0xFFFF0000],  // 3.120.0.0/16    — AWS EU-C
  [0x3472E000, 0xFFFF0000],  // 52.114.0.0/16   — MSFT EU
  [0x231C0000, 0xFFFF0000],  // 35.28.0.0/16    — GCP EU
  [0x12C20000, 0xFFFF0000],  // 18.194.0.0/16   — AWS EU-F
  [0x03400000, 0xFFFF0000],  // 3.64.0.0/16     — AWS EU-C2

  // Americas — AWS US
  [0x36DA0000, 0xFFFF0000],  // 54.218.0.0/16   — AWS US-W
  [0x3658C000, 0xFFFF0000],  // 54.88.192.0/18  — AWS US-E
  [0x22D00000, 0xFFFF0000],  // 34.208.0.0/16   — AWS US-W2
  [0x12ED0000, 0xFFFF0000],  // 18.237.0.0/16   — AWS US-W3
  [0x2C240000, 0xFFFF0000],  // 44.36.0.0/16    — AWS US-E2
  [0x36C80000, 0xFFFF0000]   // 54.200.0.0/16   — AWS US-W4
];

// ─────────────────────────────────────────────
//  §7  IP HELPERS
// ─────────────────────────────────────────────
function ipToInt(ip) {
  var a = ip.split(".");
  return (((+a[0]) << 24) | ((+a[1]) << 16) |
          ((+a[2]) <<  8) |  (+a[3])) >>> 0;
}

function matchAnyMask(ip, masks) {
  var n = ipToInt(ip);
  for (var i = 0; i < masks.length; i++)
    if ((n & masks[i][1]) >>> 0 === masks[i][0] >>> 0) return true;
  return false;
}

function isIPv4(s)  { return /^(\d{1,3}\.){3}\d{1,3}$/.test(s); }
function isIPv6(s)  { return s.indexOf(":") !== -1; }

function isPrivateOrLocal(ip) {
  if (!isIPv4(ip)) return false;
  return isInNet(ip,"10.0.0.0","255.0.0.0")     ||
         isInNet(ip,"172.16.0.0","255.240.0.0")  ||
         isInNet(ip,"192.168.0.0","255.255.0.0") ||
         isInNet(ip,"127.0.0.0","255.0.0.0")     ||
         isInNet(ip,"169.254.0.0","255.255.0.0");
}

// آمن — يُعيد IPv4 فقط أو null
function getRealIPv4(host) {
  try {
    if (typeof dnsResolve !== "function") return null;
    var ip = dnsResolve(host);
    if (ip && isIPv4(ip)) return ip;
  } catch(e) {}
  return null;
}

// ─────────────────────────────────────────────
//  §8  GEO CLASSIFIERS
// ─────────────────────────────────────────────
function isJordanIP(ip) {
  if (!ip || !isIPv4(ip)) return false;
  return matchAnyMask(ip, JO_ZAIN)    ||
         matchAnyMask(ip, JO_ORANGE)  ||
         matchAnyMask(ip, JO_UMNIAH)  ||
         matchAnyMask(ip, JO_LINK)    ||
         matchAnyMask(ip, JO_BATELCO) ||
         matchAnyMask(ip, JO_VTEL)    ||
         matchAnyMask(ip, JO_JT)      ||
         matchAnyMask(ip, JO_OTHER);
}

function isGulfIP(ip) {
  if (!ip || !isIPv4(ip)) return false;
  return matchAnyMask(ip, GULF_MASKS);
}

function isAfghanistanIP(ip) {
  if (!ip || !isIPv4(ip)) return false;
  return matchAnyMask(ip, AF_MASKS);
}

function isFarRegionIP(ip) {
  if (!ip || !isIPv4(ip)) return false;
  return matchAnyMask(ip, FAR_MASKS);
}

// ─────────────────────────────────────────────
//  §9  DOMAIN / HOST HELPERS
// ─────────────────────────────────────────────
function normalizeHost(host) {
  host = (host || "").toLowerCase();
  var c = host.indexOf(":");
  if (c !== -1) host = host.substring(0, c);
  return host;
}

function domainInList(host, list) {
  for (var i = 0; i < list.length; i++) {
    var d = list[i].toLowerCase();
    if (host === d || host.slice(-(d.length + 1)) === "." + d) return true;
  }
  return false;
}

// ─────────────────────────────────────────────
//  §10  PUBG DETECTOR — Season 28+
// ─────────────────────────────────────────────
function isPUBG(host) {
  return /pubg|pubgm|pubgmobile|bgmi|igamecj|igamepubg|proximabeta|krafton|lightspeed|levelinfinite|vnggames|garena|tencent|tencentyun|qcloud|myqcloud|tencentcs|gcloud|wechatgame|intlgame|amsoveasea|gcloudsdk|vmpone|gamecenter/.test(host);
}

// ─────────────────────────────────────────────
//  §11  TRAFFIC TYPE DETECTORS
// ─────────────────────────────────────────────
function isWOWTraffic(url, host) {
  var s = (url + host).toLowerCase();
  return /worldofwonder|wow|ugc|creative|creation|customroom|custom.room|workshop|editor|publish|playtogether|featured|trending|popular|recommend|contest|community|maps|template/.test(s);
}

function isArenaTraffic(url, host) {
  var s = (url + host).toLowerCase();
  return /arena|tdm|deathmatch|gungame|gun.game|training|warehouse|hangar|ultimatearena|ultimate.arena/.test(s);
}

function isLobbyTraffic(url, host) {
  var s = (url + host).toLowerCase();
  return /lobby|matchmak|matching|queue|room|recruit|squad|party|invite|gateway|dispatcher|region|allocation|gate/.test(s);
}

function isVoiceTraffic(url, host) {
  var s = (url + host).toLowerCase();
  return /voice|rtc|webrtc|voip|audio|mic|talk|channel|speech|sound/.test(s);
}

function isMatchTraffic(url, host) {
  var s = (url + host).toLowerCase();
  return /game|battle|fight|combat|play|gs\.|gss|gameserver|logic|session|instance|zone|shard|node|scene|realtime|action|frame|tick|sync/.test(s);
}

// ─────────────────────────────────────────────
//  §12  TIMING ENGINE — Jordan-First Pressure
//  ⚠️ nowMs() آمن — يعود إلى 0 إذا لم يتوفر Date
// ─────────────────────────────────────────────
function nowMs() {
  try {
    return (typeof Date !== "undefined" && Date.now) ? Date.now() : 0;
  } catch(e) { return 0; }
}

var _startTs = nowMs();

var T_RECRUIT_JO   = 90000;   // 90s — ابحث في الأردن أولاً
var T_ARENA_JO     = 45000;   // 45s — Arena أردني فقط
var T_ARENA_GULF   = 180000;  // ثم أردني + خليجي
var T_WOW_JO       = 60000;   // 60s — WOW أردني أولاً

function elapsedMs() { return nowMs() - _startTs; }

function recruitJOOnly()  { return elapsedMs() < T_RECRUIT_JO; }
function wowJOOnly()      { return elapsedMs() < T_WOW_JO; }

function arenaPhase() {
  var dt = elapsedMs();
  if (dt < T_ARENA_JO)   return "JO_ONLY";
  if (dt < T_ARENA_GULF) return "JO_OR_GULF";
  return "OPEN";
}

// ─────────────────────────────────────────────
//  §13  FindProxyForURL — نقطة الدخول الرئيسية
// ─────────────────────────────────────────────
function FindProxyForURL(url, host) {
  host = normalizeHost(host || url || "");

  // ══════════════════════════════════════════
  // [1]  SAFE DIRECT — System / CDN / Video
  // ══════════════════════════════════════════
  if (domainInList(host, SAFE_DIRECT)) return DIRECT;

  // ══════════════════════════════════════════
  // [2]  سيرفرات محلية داخلية → حجب (Private IP)
  // ══════════════════════════════════════════
  if (isPlainHostName(host)) return BLOCK;

  // ══════════════════════════════════════════
  // [3]  غير PUBG → مرور مباشر
  // ══════════════════════════════════════════
  if (!isPUBG(host)) return DIRECT;

  // ══════════════════════════════════════════
  // [4]  Resolve IPv4
  // ══════════════════════════════════════════
  var ip = getRealIPv4(host);
  if (!ip)                   return BLOCK;  // فشل الـ DNS
  if (isPrivateOrLocal(ip))  return BLOCK;  // IP خاص

  // ══════════════════════════════════════════
  // [5]  Hard Block — Afghanistan + Far Regions
  // ══════════════════════════════════════════
  if (isAfghanistanIP(ip)) return BLOCK;
  if (isFarRegionIP(ip))   return BLOCK;

  // ══════════════════════════════════════════
  // [6]  GEO GATE — أردن أو خليج فقط
  // ══════════════════════════════════════════
  var JO = isJordanIP(ip);
  var GF = isGulfIP(ip);
  if (!JO && !GF) return BLOCK;

  // ══════════════════════════════════════════
  // [7]  WOW / UGC / ROOMS — Lobby 9030
  // ══════════════════════════════════════════
  if (isWOWTraffic(url, host)) {
    if (wowJOOnly()) return JO ? LOBBY_PROXY : BLOCK;
    return (JO || GF) ? LOBBY_PROXY : BLOCK;
  }

  // ══════════════════════════════════════════
  // [8]  ARENA / TDM / TRAINING — Lobby 9030
  // ══════════════════════════════════════════
  if (isArenaTraffic(url, host)) {
    var phase = arenaPhase();
    if (phase === "JO_ONLY")    return JO ? LOBBY_PROXY : BLOCK;
    if (phase === "JO_OR_GULF") return (JO || GF) ? LOBBY_PROXY : BLOCK;
    return (JO || GF) ? LOBBY_PROXY : BLOCK;
  }

  // ══════════════════════════════════════════
  // [9]  LOBBY / MATCHMAKING — Lobby 9030
  // ══════════════════════════════════════════
  if (isLobbyTraffic(url, host)) {
    if (recruitJOOnly()) return JO ? LOBBY_PROXY : BLOCK;
    return (JO || GF) ? LOBBY_PROXY : BLOCK;
  }

  // ══════════════════════════════════════════
  // [10]  VOICE / RTC — Voice Proxy
  // ══════════════════════════════════════════
  if (isVoiceTraffic(url, host)) return VOICE_PROXY;

  // ══════════════════════════════════════════
  // [11]  MATCH / IN-GAME — Match Proxy
  // ══════════════════════════════════════════
  if (isMatchTraffic(url, host)) return MATCH_PROXY;

  // ══════════════════════════════════════════
  // [12]  DEFAULT PUBG → Match Proxy
  // ══════════════════════════════════════════
  return MATCH_PROXY;
}
