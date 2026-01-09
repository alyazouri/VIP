// =====================================================
// PUBG ALL-IN JORDAN ULTRA — FINAL COMPLETE (LONG-TERM)
// Recruit 9030 | Arena JO-Pressure | Match 20001 Lock
// GEO NARROWING: JORDAN JUST (CIDR + Prefix)
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
// GEO NARROWING (JORDAN JUST) — LONG-TERM
// - Fast prefix check + strong CIDR check (IPv4)
// - Any non-Jordan PUBG endpoint => BLOCK
// =======================
var CFG = { JO_ONLY: true };

// Fast prefixes (cheap)
var JO_TIGHT = {
  "82.212.":1,"212.35.":1,"176.29.":1,"91.106.":1,"46.32.":1
};

// Wider prefixes (fallback quick-pass)
var JO_FULL = {
  "78.135.":1,"78.138.":1,"37.48.":1,"37.49.":1,"37.50.":1,"37.51.":1,
  "185.84.":1,"185.85.":1,"185.86.":1,"185.87.":1,
  "188.161.":1,"188.247.":1,"37.75.":1,"195.229.":1,"195.135.":1,
  "193.178.":1,"213.6.":1,"213.42.":1,"217.171.":1
};

// Arabic Nets still kept for your Recruit/Arena phases,
// BUT GEO JO_ONLY will override and block non-JO if CFG.JO_ONLY=true.
var ARABIC_NETS = {
  "212.71.":1,"185.193.":1,              // KSA
  "185.125.":1,"46.183.":1,              // Bahrain
  "5.62.":1,"31.192.":1,"31.193.":1,     // UAE
  "62.84.":1,                            // Kuwait
  "197.32.":1,"197.33.":1                // Egypt
};

// Hard blocked far regions (extra safety)
var BLOCKED = [
  "8.222.","47.245.","43.132.","18.163.","13.228.","13.229.",
  "13.250.","52.220.","54.169.","54.251.","175.41.","119.81.",
  "103.28.","103.29.","203.104.","210.16.","52.74.","52.77.",
  "18.185.","3.120.","52.58.","35.156.","52.28.","52.29.",
  "54.218.","52.88.","34.208.","18.237.","52.36.","54.244."
];

// =======================
// DNS HINTS (routing hint only)
// =======================
var DNS_FORCE = {
  lobby:"82.212.84.33",
  game:"185.125.190.100",
  voice:"185.125.190.50"
};

function forceBestDNS(host){
  var h = host.toLowerCase();
  if (/match|matching|lobby|queue|room|recruit|arena|tdm/.test(h))
    return DNS_FORCE.lobby;
  if (/game|gs\./.test(h))
    return DNS_FORCE.game;
  if (/voice|rtc|voip|audio/.test(h))
    return DNS_FORCE.voice;
  return dnsResolve(host);
}

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

// Arena helper in your requested regex style (long-term)
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
  for (var k in table)
    if (ip.indexOf(k) === 0) return true;
  return false;
}

// =======================
// JORDAN JUST DETECTOR (LONG-TERM, IPv4)
// - prefix quick-pass + CIDR isInNet (strong)
// =======================
function isJordanIP(ip){
  if (!ip) return false;

  // Quick prefix
  if (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL)) return true;

  // Strong CIDR checks (representative JO allocations; safe long-term)
  // Zain / Umniah / Orange / Others commonly observed
  if (isInNet(ip, "176.28.128.0", "255.255.128.0")) return true; // 176.28.128.0/17
  if (isInNet(ip, "176.29.0.0",   "255.255.0.0"))   return true; // 176.29.0.0/16
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return true; // 46.185.128.0/17
  if (isInNet(ip, "86.108.0.0",   "255.255.128.0")) return true; // 86.108.0.0/17
  if (isInNet(ip, "92.253.0.0",   "255.255.128.0")) return true; // 92.253.0.0/17
  if (isInNet(ip, "94.249.0.0",   "255.255.128.0")) return true; // 94.249.0.0/17

  // Orange-ish / others seen often
  if (isInNet(ip, "212.35.64.0",  "255.255.224.0")) return true; // 212.35.64.0/19
  if (isInNet(ip, "188.247.64.0", "255.255.224.0")) return true; // 188.247.64.0/19

  // Umniah-ish
  if (isInNet(ip, "91.106.0.0",   "255.255.0.0"))   return true; // 91.106.0.0/16

  return false;
}

// =======================
// TIMING
// =======================

// Recruit timing (normal)
var RECRUIT_JO_ONLY_MS = 45000;
var RECRUIT_START_TS = Date.now();
function recruitJOOnly(){
  return (Date.now() - RECRUIT_START_TS) < RECRUIT_JO_ONLY_MS;
}

// Arena timing (special)
var ARENA_JO_ONLY_MS = 25000;
var ARENA_AR_ONLY_MS = 90000;
var ARENA_START_TS = Date.now();

function arenaPhase(){
  var dt = Date.now() - ARENA_START_TS;
  if (dt < ARENA_JO_ONLY_MS) return "JO_ONLY";
  if (dt < ARENA_AR_ONLY_MS) return "JO_OR_ARABIC";
  return "AFTER";
}

// =======================
// MAIN ROUTING ENGINE
// =======================
function FindProxyForURL(url, host){

  host = host.toLowerCase();

  // ---- SAFE DIRECT ----
  for (var i=0;i<SAFE_DIRECT.length;i++)
    if (dnsDomainIs(host, SAFE_DIRECT[i])) return "DIRECT";

  for (var j=0;j<CDN_DIRECT.length;j++)
    if (shExpMatch(host, "*"+CDN_DIRECT[j])) return "DIRECT";

  if (isPlainHostName(host)) return BLOCK;
  if (!isPUBG(host)) return "DIRECT";

  var ip = forceBestDNS(host);

  // Far region block
  for (var b=0;b<BLOCKED.length;b++)
    if (ip && ip.indexOf(BLOCKED[b]) === 0) return BLOCK;

  // =====================================================
  // GEO NARROWING ENFORCER (JORDAN JUST)
  // =====================================================
  if (CFG.JO_ONLY && !isJordanIP(ip)) return BLOCK;

  // =====================================================
  // ARENA ONLY PRESSURE + ARENA-SPECIFIC TIMING
  // =====================================================
  if (isArenaTraffic(url, host)){

    var phase = arenaPhase();

    if (phase === "JO_ONLY"){
      if (ip && startsWithAny(ip, JO_TIGHT)) return LOBBY_PROXY;
      return BLOCK;
    }

    // JO_OR_ARABIC phase will still be blocked by JO_ONLY enforcer above.
    if (phase === "JO_OR_ARABIC"){
      if (ip && (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL))) return LOBBY_PROXY;
      if (ip && startsWithAny(ip, ARABIC_NETS)) return LOBBY_PROXY;
      return BLOCK;
    }

    if (ip && (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL))) return LOBBY_PROXY;
    if (ip && startsWithAny(ip, ARABIC_NETS)) return LOBBY_PROXY;
    return BLOCK;
  }

  // =======================
  // RECRUIT / LOBBY
  // =======================
  if (isLobbyTraffic(url, host)){
    if (recruitJOOnly()){
      if (ip && startsWithAny(ip, JO_TIGHT)) return LOBBY_PROXY;
      return BLOCK;
    }
    if (ip && (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL))) return LOBBY_PROXY;
    if (ip && startsWithAny(ip, ARABIC_NETS)) return LOBBY_PROXY;
    return BLOCK;
  }

  // =======================
  // VOICE
  // =======================
  if (isVoiceTraffic(url, host))
    return VOICE_PROXY;

  // =======================
  // MATCH (Classic / Ranked)
  // =======================
  if (isMatchTraffic(url, host))
    return MATCH_PROXY;

  // =======================
  // OTHER PUBG
  // =======================
  return MATCH_PROXY;
}
