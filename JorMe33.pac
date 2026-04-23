// =====================================================
// PUBG ALL-IN JORDAN ULTRA — FINAL COMPLETE (LONG-TERM)
// GEO: Jordan FIRST -> Gulf ONLY (NO EUROPE/ASIA/AMERICAS)
// WOW/UGC/Rooms forced to Lobby Proxy 9030 (JO→Gulf)
// Low ping + stable: no rotation, fixed proxies
// =====================================================

// =======================
// PROXIES (STABLE)
// =======================
var LOBBY_PROXY =
  "PROXY 82.212.84.33:9030; " +
  "PROXY 37.220.120.111:20001";

var MATCH_PROXY = "PROXY 82.212.84.33:20001";

var VOICE_PROXY =
  "PROXY 82.212.84.33:20001; " +
  "PROXY 82.212.84.33:10012";

var BLOCK = "PROXY 127.0.0.1:9";

// =======================
// SAFE DIRECT (SYSTEM)
// =======================
var SAFE_DIRECT = [
  "captive.apple.com",
  "time.apple.com",
  "ocsp.apple.com",
  "clients3.google.com",
  "gstatic.com",
  "googleapis.com"
];

// =======================
// CDN / MEDIA DIRECT (keep game stable)
// =======================
var CDN_DIRECT = [
  "youtube.com","googlevideo.com","ytimg.com",
  "fbcdn.net","facebook.com",
  "instagram.com","cdninstagram.com",
  "tiktokcdn.com","tiktokv.com",
  "akamaihd.net"
];

// =======================
// GEO — Jordan + Gulf only (No Europe/Asia/Americas)
// =======================
var CFG = {
  GEO_MODE: "JO_GULF_ONLY" // allow: Jordan or Gulf only, block everything else
};

// Fast prefixes (Jordan)
var JO_TIGHT = {
  "82.212.":1,   // Orange core (أفضل استقرار داخلي)
  "176.28.":1,   // Orange fiber (مسار سريع جدًا)
  "176.29.":1,   // Orange fiber backup route
  "94.249.":1,   // Orange mixed / low jitter
  "78.135.":1,   // Zain fiber (ping ثابت)
  "78.138.":1,   // Zain secondary route
  "62.72.":1,    // Umniah core network
  "62.150.":1    // Umniah stable residential
};

var JO_FULL = {
  "78.135.":1,"78.138.":1,
  "37.48.":1,"37.49.":1,"37.50.":1,"37.51.":1,
  "37.75.":1,"37.202.":1,
  "79.134.":1,"79.173.":1,
  "81.21.":1,"81.28.":1,"80.90.":1,
  "62.72.":1,"62.150.":1,"62.251.":1,
  "85.159.":1,
  "109.107.":1,"109.237.":1,
  "188.161.":1,
  "188.247.":1,
  "176.28.":1,"176.29.":1,
  "94.249.":1,
  "193.188.":1,"193.227.":1,
  "195.135.":1,"195.170.":1,"195.228.":1,"195.229.":1,
  "213.6.":1,"213.42.":1,"213.139.":1,"213.186.":1,
  "217.23.":1,"217.29.":1,"217.144.":1,"217.171.":1,
  "5.45.":1,"5.198.":1,"5.199.":1
};

// Fast prefixes (Gulf / nearby)
var GULF_NETS = {
  // Bahrain
  "185.125.":1,"46.183.":1,
  // UAE
  "5.62.":1,"31.192.":1,"31.193.":1,
  // Saudi
  "212.71.":1,"185.193.":1,
  // Kuwait
  "62.84.":1,"82.178.":1
};

// Quick far-region blocks (extra safety)
var BLOCKED = [
  // Asia Pacific
  "8.222.","47.245.","43.132.","18.163.","13.228.","13.229.",
  "13.250.","52.220.","54.169.","54.251.","175.41.","119.81.",
  "103.28.","103.29.","203.104.","210.16.","52.74.","52.77.",
  "8.210.","47.74.","47.88.","120.76.","121.40.","139.224.",
  // Europe
  "18.185.","3.120.","52.58.","35.156.","52.28.","52.29.",
  "18.194.","3.64.","3.65.","3.66.","52.30.","18.196.",
  "52.59.","18.157.","3.121.","3.122.","3.123.",
  // Americas
  "54.218.","52.88.","34.208.","18.237.","52.36.","54.244.",
  "35.162.","44.228.","34.220.","54.200.","52.24.","18.232.",
  "54.85.","34.192.","52.90.","34.224."
];

// =======================
// HELPERS (GLOBAL)
// =======================

// ✅ PUBG DETECTION — EXPANDED (LONG-TERM)
// Covers classic PUBG domains + Tencent/Krafton infra + WOW/UGC/Creative
function isPUBG(host){
  host = host.toLowerCase();
  return /(
    pubg|pubgm|pubgmobile|
    intlgame|igamecj|proximabeta|
    tencent|qq|qcloud|gcloudsdk|
    krafton|lightspeed|amsoveasea|
    vmpone|vmp|gme|gamecenter|
    wow|worldofwonder|ugc|creative|creation|creations
  )/x.test(host);
}

// Lobby / Recruit / Queue
function isLobbyTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(lobby|matchmaking|matching|queue|room|recruit|
           team|squad|party|invite|
           gate|dispatcher|router|region|allocation)/.test(s);
}

// ✅ WOW detector (NOT relying on "wow" only)
function isWOWTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(worldofwonder|wow|
           ugc|creative|creation|creations|
           room|rooms|customroom|custom-room|
           map|maps|template|templates|
           featured|trending|popular|recommend|recommended|
           daily|weekly|newcreations|new-creations|
           contests|contest|community|
           workshop|editor|publish|published|
           playtogether|play-together)/.test(s);
}

// Arena helper (TDM etc.)
function isArenaTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(arena|tdm|deathmatch|teamdeathmatch|team[_-]?deathmatch|
           gun|gungame|gun[_-]?game|
           training|arenatraining|arena[_-]?training|
           ultimate|ultimatearena|ultimate[_-]?arena|
           warehouse|hangar|wow)/.test(s);
}

// Match / gameplay
function isMatchTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(game|battle|fight|combat|play|
           gs\.|gss|gameserver|
           logic|session|instance|zone|
           shard|node|cell|scene|
           realtime|action|frame)/.test(s);
}

// Voice
function isVoiceTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(voice|rtc|webrtc|voip|
           audio|mic|talk|channel|
           stream|speech|sound)/.test(s);
}

function startsWithAny(ip, table){
  for (var k in table) if (ip.indexOf(k) === 0) return true;
  return false;
}

// =======================
// PAC COMPLETENESS HELPERS
// =======================
function normalizeHost(host){
  var i = host.indexOf(":");
  if (i !== -1) return host.substring(0, i);
  return host;
}

function isIPv4(ip){ return ip && ip.indexOf(".") !== -1; }

function isPrivateOrLocalIP(ip){
  if (!isIPv4(ip)) return false;
  return (
    isInNet(ip, "10.0.0.0", "255.0.0.0") ||
    isInNet(ip, "172.16.0.0", "255.240.0.0") ||
    isInNet(ip, "192.168.0.0", "255.255.0.0") ||
    isInNet(ip, "127.0.0.0", "255.0.0.0") ||
    isInNet(ip, "169.254.0.0", "255.255.0.0")
  );
}

// REAL IPv4 only: if IPv6/NULL => null (prevents leakage)
function getRealIPv4(host){
  var ip = dnsResolve(host);
  if (isIPv4(ip)) return ip;
  return null;
}

// =======================
// CIDR-based Jordan / Gulf detectors (strong)
// =======================
function isJordanIP(ip){
  if (!ip) return false;

  // Prefix fast pass
  if (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL)) return true;

  // Strong confirmers (big JO blocks)
  if (isInNet(ip, "176.28.128.0", "255.255.128.0")) return true; // 176.28.128.0/17
  if (isInNet(ip, "176.29.0.0",   "255.255.0.0"))   return true; // 176.29.0.0/16
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return true; // 46.185.128.0/17
  if (isInNet(ip, "86.108.0.0",   "255.255.128.0")) return true; // 86.108.0.0/17
  if (isInNet(ip, "92.253.0.0",   "255.255.128.0")) return true; // 92.253.0.0/17
  if (isInNet(ip, "94.249.0.0",   "255.255.128.0")) return true; // 94.249.0.0/17
  if (isInNet(ip, "212.35.64.0",  "255.255.224.0")) return true; // 212.35.64.0/19
  if (isInNet(ip, "188.247.64.0", "255.255.224.0")) return true; // 188.247.64.0/19
  if (isInNet(ip, "91.106.0.0",   "255.255.0.0"))   return true; // 91.106.0.0/16
  if (isInNet(ip, "82.212.64.0",  "255.255.192.0")) return true; // 82.212.64.0/18
  if (isInNet(ip, "149.200.128.0","255.255.128.0")) return true; // 149.200.128.0/17

  return false;
}

function isGulfIP(ip){
  if (!ip) return false;

  if (startsWithAny(ip, GULF_NETS)) return true;

  // Bahrain
  if (isInNet(ip, "185.125.190.0", "255.255.254.0")) return true; // /23
  if (isInNet(ip, "46.183.216.0",  "255.255.252.0")) return true; // /22

  // UAE
  if (isInNet(ip, "5.62.60.0",     "255.255.252.0")) return true; // /22
  if (isInNet(ip, "31.192.0.0",    "255.255.0.0"))   return true; // /16

  // Saudi
  if (isInNet(ip, "212.71.0.0",    "255.255.0.0"))   return true; // /16
  if (isInNet(ip, "185.193.68.0",  "255.255.252.0")) return true; // /22

  // Kuwait
  if (isInNet(ip, "62.84.0.0",     "255.255.0.0"))   return true; // /16
  if (isInNet(ip, "82.178.0.0",    "255.255.0.0"))   return true; // /16

  return false;
}

// =======================
// TIMING (pressure)
// =======================

// Recruit: JO-only early window (push Jordan)
var RECRUIT_JO_ONLY_MS = 60000; // longer pressure = more chance JO
var RECRUIT_START_TS = Date.now();
function recruitJOOnly(){
  return (Date.now() - RECRUIT_START_TS) < RECRUIT_JO_ONLY_MS;
}

// Arena: JO-only pressure then allow Gulf (still NO Europe)
var ARENA_JO_ONLY_MS = 35000;
var ARENA_GULF_ONLY_MS = 120000;
var ARENA_START_TS = Date.now();
function arenaPhase(){
  var dt = Date.now() - ARENA_START_TS;
  if (dt < ARENA_JO_ONLY_MS) return "JO_ONLY";
  if (dt < ARENA_GULF_ONLY_MS) return "JO_OR_GULF";
  return "AFTER";
}

// =======================
// MAIN ROUTING ENGINE
// =======================
function FindProxyForURL(url, host){

  host = normalizeHost(host.toLowerCase());

  // ---- SAFE DIRECT ----
  for (var i=0;i<SAFE_DIRECT.length;i++)
    if (dnsDomainIs(host, SAFE_DIRECT[i])) return "DIRECT";

  for (var j=0;j<CDN_DIRECT.length;j++)
    if (shExpMatch(host, "*"+CDN_DIRECT[j])) return "DIRECT";

  if (isPlainHostName(host)) return BLOCK;

  // Non-PUBG = DIRECT
  if (!isPUBG(host)) return "DIRECT";

  // REAL IPv4
  var ip = getRealIPv4(host);

  // If can't resolve safely -> block (prevents leaks)
  if (!ip) return BLOCK;
  if (isPrivateOrLocalIP(ip)) return BLOCK;

  // Hard block known far-region prefixes
  for (var b=0;b<BLOCKED.length;b++)
    if (ip.indexOf(BLOCKED[b]) === 0) return BLOCK;

  // GEO gate: allow ONLY Jordan or Gulf
  var JO = isJordanIP(ip);
  var GF = isGulfIP(ip);
  if (!(JO || GF)) return BLOCK;

  // =====================================================
  // ✅ WOW / UGC / ROOMS — FORCE to LOBBY_PROXY (9030)
  // Priority: Jordan > Gulf (still NO Europe)
  // =====================================================
  if (isWOWTraffic(url, host)) {
    // If endpoint is JO: perfect. If it's Gulf: still allowed and low ping.
    return LOBBY_PROXY; // 9030
  }

  // =====================================================
  // ARENA (TDM/Gun/Training/Ultimate/Warehouse/Hangar/WOW)
  // =====================================================
  if (isArenaTraffic(url, host)) {
    var phase = arenaPhase();

    if (phase === "JO_ONLY") {
      if (JO) return LOBBY_PROXY;
      return BLOCK;
    }
    // JO then Gulf
    if (phase === "JO_OR_GULF") {
      if (JO || GF) return LOBBY_PROXY;
      return BLOCK;
    }
    // After: stay JO/Gulf only
    if (JO || GF) return LOBBY_PROXY;
    return BLOCK;
  }

  // =====================================================
  // RECRUIT / LOBBY
  // =====================================================
  if (isLobbyTraffic(url, host)) {
    if (recruitJOOnly()) {
      if (JO) return LOBBY_PROXY;
      return BLOCK;
    }
    if (JO || GF) return LOBBY_PROXY;
    return BLOCK;
  }

  // =====================================================
  // VOICE
  // =====================================================
  if (isVoiceTraffic(url, host))
    return VOICE_PROXY;

  // =====================================================
  // MATCH (Classic/Ranked)
  // =====================================================
  if (isMatchTraffic(url, host))
    return MATCH_PROXY;

  // Default PUBG
  return MATCH_PROXY;
}
