// =====================================================
// PUBG ALL-IN JORDAN ULTRA — FINAL COMPLETE (LONG-TERM)
// Recruit 9030 | Arena JO-Pressure | Match 20001 Lock
// GEO: JO FIRST -> GULF ONLY (NO EUROPE/ASIA/AMERICAS)
// =====================================================

// =======================
// PROXIES
// =======================
var LOBBY_PROXY =
  "PROXY 82.212.84.33:9030; " +
  "PROXY 212.35.66.45:9030";

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
// CDN / MEDIA DIRECT
// =======================
var CDN_DIRECT = [
  "youtube.com","googlevideo.com","ytimg.com",
  "fbcdn.net","facebook.com",
  "instagram.com","cdninstagram.com",
  "tiktokcdn.com","tiktokv.com",
  "akamaihd.net"
];

// =======================
// CFG
// =======================
var CFG = {
  GEO_MODE: "JO_GULF"   // JO_GULF = Jordan first, else Gulf only, never Europe/Asia/Americas
};

// =======================
// GEO — Prefixes (fast)
// =======================
var JO_TIGHT = { "82.212.":1,"212.35.":1,"176.29.":1,"91.106.":1,"46.32.":1 };

var JO_FULL = {
  "78.135.":1,"78.138.":1,"37.48.":1,"37.49.":1,"37.50.":1,"37.51.":1,
  "185.84.":1,"185.85.":1,"185.86.":1,"185.87.":1,
  "188.161.":1,"188.247.":1,"37.75.":1,"195.229.":1,"195.135.":1,
  "193.178.":1,"213.6.":1,"213.42.":1,"217.171.":1
};

// Gulf / nearby (prefix fast pass)
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

// Extra far-region quick blocks (cheap)
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
function isPUBG(host){
  return /(pubgmobile|pubgm|intlgame|igamecj|proximabeta|tencent|qq|krafton|gcloudsdk)/.test(host);
}

function isLobbyTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(lobby|matchmaking|matching|queue|room|recruit|
           team|squad|party|invite|
           gate|dispatcher|router|region|allocation)/.test(s);
}

function isArenaTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(arena|tdm|deathmatch|teamdeathmatch|team[_-]?deathmatch|
           gun|gungame|gun[_-]?game|
           training|arenatraining|arena[_-]?training|
           ultimate|ultimatearena|ultimate[_-]?arena|
           warehouse|hangar|wow)/.test(s);
}

function isMatchTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(game|battle|fight|combat|play|
           gs\.|gss|gameserver|
           logic|session|instance|zone|
           shard|node|cell|scene|
           realtime|action|frame)/.test(s);
}

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
  if (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL)) return true;

  if (isInNet(ip, "176.28.128.0", "255.255.128.0")) return true; // 176.28.128.0/17
  if (isInNet(ip, "176.29.0.0",   "255.255.0.0"))   return true; // 176.29.0.0/16
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return true; // 46.185.128.0/17
  if (isInNet(ip, "86.108.0.0",   "255.255.128.0")) return true; // 86.108.0.0/17
  if (isInNet(ip, "92.253.0.0",   "255.255.128.0")) return true; // 92.253.0.0/17
  if (isInNet(ip, "94.249.0.0",   "255.255.128.0")) return true; // 94.249.0.0/17
  if (isInNet(ip, "212.35.64.0",  "255.255.224.0")) return true; // 212.35.64.0/19
  if (isInNet(ip, "188.247.64.0", "255.255.224.0")) return true; // 188.247.64.0/19
  if (isInNet(ip, "91.106.0.0",   "255.255.0.0"))   return true; // 91.106.0.0/16

  return false;
}

function isGulfIP(ip){
  if (!ip) return false;
  if (startsWithAny(ip, GULF_NETS)) return true;

  // Bahrain (example blocks)
  if (isInNet(ip, "185.125.190.0", "255.255.254.0")) return true; // 185.125.190.0/23
  if (isInNet(ip, "46.183.216.0",  "255.255.252.0")) return true; // 46.183.216.0/22

  // UAE (example blocks)
  if (isInNet(ip, "5.62.60.0",     "255.255.252.0")) return true; // 5.62.60.0/22
  if (isInNet(ip, "31.192.0.0",    "255.255.0.0"))   return true; // 31.192.0.0/16

  // Saudi (example blocks)
  if (isInNet(ip, "212.71.0.0",    "255.255.0.0"))   return true; // 212.71.0.0/16
  if (isInNet(ip, "185.193.68.0",  "255.255.252.0")) return true; // 185.193.68.0/22

  // Kuwait (example blocks)
  if (isInNet(ip, "62.84.0.0",     "255.255.0.0"))   return true; // 62.84.0.0/16
  if (isInNet(ip, "82.178.0.0",    "255.255.0.0"))   return true; // 82.178.0.0/16

  return false;
}

// =======================
// TIMING
// =======================
var RECRUIT_JO_ONLY_MS = 45000;
var RECRUIT_START_TS = Date.now();
function recruitJOOnly(){
  return (Date.now() - RECRUIT_START_TS) < RECRUIT_JO_ONLY_MS;
}

var ARENA_JO_ONLY_MS = 25000;
var ARENA_GULF_ONLY_MS = 90000;
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

  if (!isPUBG(host)) return "DIRECT";

  // REAL IPv4
  var ip = getRealIPv4(host);
  if (!ip) return BLOCK;
  if (isPrivateOrLocalIP(ip)) return BLOCK;

  // Hard block known far-region prefixes
  for (var b=0;b<BLOCKED.length;b++)
    if (ip.indexOf(BLOCKED[b]) === 0) return BLOCK;

  // GEO gate: allow JO or Gulf only
  if (!(isJordanIP(ip) || isGulfIP(ip))) return BLOCK;

  // ===== ARENA =====
  if (isArenaTraffic(url, host)){
    var phase = arenaPhase();

    if (phase === "JO_ONLY"){
      if (isJordanIP(ip)) return LOBBY_PROXY;
      return BLOCK;
    }

    // JO then Gulf (no Europe ever)
    if (phase === "JO_OR_GULF"){
      if (isJordanIP(ip) || isGulfIP(ip)) return LOBBY_PROXY;
      return BLOCK;
    }

    // After: keep JO/Gulf only
    if (isJordanIP(ip) || isGulfIP(ip)) return LOBBY_PROXY;
    return BLOCK;
  }

  // ===== RECRUIT / LOBBY =====
  if (isLobbyTraffic(url, host)){
    if (recruitJOOnly()){
      if (isJordanIP(ip)) return LOBBY_PROXY;
      return BLOCK;
    }
    // After: JO or Gulf only
    if (isJordanIP(ip) || isGulfIP(ip)) return LOBBY_PROXY;
    return BLOCK;
  }

  // ===== VOICE =====
  if (isVoiceTraffic(url, host))
    return VOICE_PROXY;

  // ===== MATCH =====
  if (isMatchTraffic(url, host))
    return MATCH_PROXY;

  return MATCH_PROXY;
}
