// =====================================================
// PUBG ALL-IN JORDAN ULTRA — JORDAN MOST OF THE TIME
// Jordan FIRST very aggressively -> Gulf ONLY as fallback
// WOW/UGC/Rooms forced to Lobby Proxy 9030
// =====================================================

// =======================
// PROXIES (STABLE)
// =======================
var JO_LOBBY_PROXY =
  "PROXY 176.29.153.95:9030; " +
  "PROXY 212.35.66.45:9030";

var GULF_LOBBY_PROXY =
  "PROXY 176.29.153.95:9030; " +
  "PROXY 212.35.66.45:9030";

var JO_MATCH_PROXY =
  "PROXY 176.29.153.95:20001";

var GULF_MATCH_PROXY =
  "PROXY 176.29.153.95:20001";

var VOICE_PROXY =
  "PROXY 82.212.84.33:20001; " +
  "PROXY 82.212.84.33:10012";

var BLOCK = "PROXY 127.0.0.1:9";

// =======================
// SAFE DIRECT
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
// JORDAN
// =======================
var JO_TIGHT = {
  "82.212.":1,
  "188.123.":1,
  "37.202.":1,
  "212.35.":1,
  "176.29.":1,
  "91.106.":1,
  "46.32.":1,
  "46.185.":1,
  "86.108.":1,
  "92.253.":1,
  "94.249.":1,
  "188.247.":1,
  "149.200.":1
};

var JO_FULL = {
  "5.45.":1,
  "5.198.":1,
  "5.199.":1,
  "31.214.":1,
  "37.48.":1,
  "37.49.":1,
  "37.50.":1,
  "37.51.":1,
  "37.75.":1,
  "37.202.":1,
  "46.32.":1,
  "46.185.":1,
  "62.72.":1,
  "62.150.":1,
  "62.251.":1,
  "77.245.":1,
  "78.135.":1,
  "78.138.":1,
  "79.134.":1,
  "79.173.":1,
  "80.90.":1,
  "81.21.":1,
  "81.28.":1,
  "82.212.":1,
  "85.159.":1,
  "86.108.":1,
  "91.106.":1,
  "92.253.":1,
  "94.249.":1,
  "109.107.":1,
  "109.237.":1,
  "149.200.":1,
  "176.29.":1,
  "188.123.":1,
  "188.161.":1,
  "188.247.":1,
  "193.188.":1,
  "193.227.":1,
  "195.135.":1,
  "195.170.":1,
  "195.228.":1,
  "195.229.":1,
  "212.35.":1,
  "213.6.":1,
  "213.139.":1,
  "213.186.":1,
  "217.23.":1,
  "217.29.":1,
  "217.144.":1,
  "217.171.":1
};

// =======================
// GULF
// =======================
var GULF_NETS = {
  "185.125.":1, "46.183.":1, "37.131.":1, "80.241.":1, "84.235.":1,
  "212.71.":1, "185.193.":1, "185.194.":1, "185.195.":1, "185.196.":1,
  "94.26.":1, "95.177.":1, "46.152.":1, "37.224.":1,
  "5.62.":1, "31.192.":1, "31.193.":1,
  "86.96.":1, "94.200.":1, "94.201.":1, "94.202.":1,
  "217.164.":1,
  "62.84.":1, "82.178.":1, "91.140.":1, "94.128.":1,
  "37.210.":1, "89.211.":1,
  "185.64.":1, "5.36.":1
};

// =======================
// FAR BLOCKS
// =======================
var BLOCKED = [
  "8.222.","47.245.","43.132.","18.163.","13.228.","13.229.",
  "13.250.","52.220.","54.169.","54.251.","175.41.","119.81.",
  "103.28.","103.29.","203.104.","210.16.","52.74.","52.77.",
  "8.210.","47.74.","47.88.","120.76.","121.40.","139.224.",
  "18.185.","3.120.","52.58.","35.156.","52.28.","52.29.",
  "18.194.","3.64.","3.65.","3.66.","52.30.","18.196.",
  "52.59.","18.157.","3.121.","3.122.","3.123.",
  "54.218.","52.88.","34.208.","18.237.","52.36.","54.244.",
  "35.162.","44.228.","34.220.","54.200.","52.24.","18.232.",
  "54.85.","34.192.","52.90.","34.224."
];

// =======================
// HELPERS
// =======================
function isPUBG(host){
  host = host.toLowerCase();
  return /(pubg|pubgm|pubgmobile|intlgame|igamecj|proximabeta|tencent|qq|qcloud|gcloudsdk|krafton|lightspeed|amsoveasea|vmpone|vmp|gme|gamecenter|wow|worldofwonder|ugc|creative|creation|creations)/.test(host);
}

function isLobbyTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(lobby|matchmaking|matching|queue|room|recruit|team|squad|party|invite|gate|dispatcher|router|region|allocation)/.test(s);
}

function isWOWTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(worldofwonder|wow|ugc|creative|creation|creations|room|rooms|customroom|custom-room|map|maps|template|templates|featured|trending|popular|recommend|recommended|daily|weekly|newcreations|new-creations|contests|contest|community|workshop|editor|publish|published|playtogether|play-together)/.test(s);
}

function isArenaTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(arena|tdm|deathmatch|teamdeathmatch|team[_-]?deathmatch|gun|gungame|gun[_-]?game|training|arenatraining|arena[_-]?training|ultimate|ultimatearena|ultimate[_-]?arena|warehouse|hangar|wow)/.test(s);
}

function isMatchTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(game|battle|fight|combat|play|gs\.|gss|gameserver|logic|session|instance|zone|shard|node|cell|scene|realtime|action|frame)/.test(s);
}

function isVoiceTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(voice|rtc|webrtc|voip|audio|mic|talk|channel|stream|speech|sound)/.test(s);
}

function startsWithAny(ip, table){
  for (var k in table) {
    if (ip.indexOf(k) === 0) return true;
  }
  return false;
}

function normalizeHost(host){
  var i = host.indexOf(":");
  if (i !== -1) return host.substring(0, i);
  return host;
}

function isIPv4(ip){
  return ip && ip.indexOf(".") !== -1;
}

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

function isAfghanistanIP(ip){
  if (!ip) return false;

  var maybe =
    ip.indexOf("58.147.") === 0 ||
    ip.indexOf("59.153.") === 0 ||
    ip.indexOf("61.5.") === 0 ||
    ip.indexOf("91.109.") === 0 ||
    ip.indexOf("103.") === 0 ||
    ip.indexOf("45.") === 0;

  if (!maybe) return false;

  if (isInNet(ip, "58.147.128.0", "255.255.224.0")) return true;
  if (isInNet(ip, "59.153.124.0", "255.255.252.0")) return true;
  if (isInNet(ip, "61.5.192.0",   "255.255.240.0")) return true;
  if (isInNet(ip, "91.109.216.0", "255.255.248.0")) return true;
  if (isInNet(ip, "103.5.172.0",  "255.255.252.0")) return true;
  if (isInNet(ip, "103.13.64.0",  "255.255.252.0")) return true;
  if (isInNet(ip, "103.17.60.0",  "255.255.252.0")) return true;
  if (isInNet(ip, "103.18.160.0", "255.255.252.0")) return true;
  if (isInNet(ip, "103.23.36.0",  "255.255.252.0")) return true;
  if (isInNet(ip, "103.28.132.0", "255.255.252.0")) return true;
  if (isInNet(ip, "45.65.56.0",   "255.255.252.0")) return true;
  if (isInNet(ip, "45.116.128.0", "255.255.254.0")) return true;

  return false;
}

function isJordanIP(ip){
  if (!ip) return false;

  if (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL)) return true;

  if (isInNet(ip, "176.28.128.0", "255.255.128.0")) return true;
  if (isInNet(ip, "176.29.0.0",   "255.255.0.0"))   return true;
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return true;
  if (isInNet(ip, "86.108.0.0",   "255.255.128.0")) return true;
  if (isInNet(ip, "92.253.0.0",   "255.255.128.0")) return true;
  if (isInNet(ip, "94.249.0.0",   "255.255.128.0")) return true;
  if (isInNet(ip, "212.35.64.0",  "255.255.224.0")) return true;
  if (isInNet(ip, "188.247.64.0", "255.255.224.0")) return true;
  if (isInNet(ip, "91.106.0.0",   "255.255.0.0"))   return true;
  if (isInNet(ip, "82.212.64.0",  "255.255.192.0")) return true;
  if (isInNet(ip, "149.200.128.0","255.255.128.0")) return true;

  return false;
}

function isGulfIP(ip){
  if (!ip) return false;

  if (startsWithAny(ip, GULF_NETS)) return true;

  if (isInNet(ip, "185.125.188.0", "255.255.252.0")) return true;
  if (isInNet(ip, "185.125.190.0", "255.255.254.0")) return true;
  if (isInNet(ip, "46.183.216.0",  "255.255.252.0")) return true;
  if (isInNet(ip, "212.71.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "185.193.64.0",  "255.255.192.0")) return true;
  if (isInNet(ip, "185.194.0.0",   "255.254.0.0"))   return true;
  if (isInNet(ip, "94.26.0.0",     "255.255.0.0"))   return true;
  if (isInNet(ip, "95.177.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "5.62.60.0",     "255.255.252.0")) return true;
  if (isInNet(ip, "31.192.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "31.193.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "86.96.0.0",     "255.255.0.0"))   return true;
  if (isInNet(ip, "62.84.0.0",     "255.255.0.0"))   return true;
  if (isInNet(ip, "82.178.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "91.140.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "37.210.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "89.211.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "185.64.0.0",    "255.255.0.0"))   return true;
  if (isInNet(ip, "5.36.0.0",      "255.255.0.0"))   return true;

  return false;
}

// =======================
// TIMING — MORE JORDAN
// =======================
var RECRUIT_JO_ONLY_MS = 180000;
var RECRUIT_START_TS = Date.now();
function recruitJOOnly(){
  return (Date.now() - RECRUIT_START_TS) < RECRUIT_JO_ONLY_MS;
}

var ARENA_JO_ONLY_MS = 90000;
var ARENA_GULF_ONLY_MS = 240000;
var ARENA_START_TS = Date.now();
function arenaPhase(){
  var dt = Date.now() - ARENA_START_TS;
  if (dt < ARENA_JO_ONLY_MS) return "JO_ONLY";
  if (dt < ARENA_GULF_ONLY_MS) return "JO_OR_GULF";
  return "AFTER";
}

var WOW_JO_ONLY_MS = 120000;
var WOW_START_TS = Date.now();
function wowJOOnly(){
  return (Date.now() - WOW_START_TS) < WOW_JO_ONLY_MS;
}

var MATCH_JO_ONLY_MS = 60000;
var MATCH_START_TS = Date.now();
function matchJOOnly(){
  return (Date.now() - MATCH_START_TS) < MATCH_JO_ONLY_MS;
}

// =======================
// BEST ROUTES
// =======================
function bestLobbyRoute(JO, GF){
  if (JO) return JO_LOBBY_PROXY;
  if (GF) return GULF_LOBBY_PROXY;
  return BLOCK;
}

function bestMatchRoute(JO, GF){
  if (matchJOOnly()) {
    if (JO) return JO_MATCH_PROXY;
    return BLOCK;
  }

  if (JO) return JO_MATCH_PROXY;
  if (GF) return GULF_MATCH_PROXY;
  return BLOCK;
}

// =======================
// MAIN
// =======================
function FindProxyForURL(url, host){
  host = normalizeHost(host.toLowerCase());

  for (var i = 0; i < SAFE_DIRECT.length; i++) {
    if (dnsDomainIs(host, SAFE_DIRECT[i])) return "DIRECT";
  }

  for (var j = 0; j < CDN_DIRECT.length; j++) {
    if (shExpMatch(host, "*" + CDN_DIRECT[j])) return "DIRECT";
  }

  if (isPlainHostName(host)) return BLOCK;
  if (!isPUBG(host)) return "DIRECT";

  var ip = getRealIPv4(host);
  if (!ip) return BLOCK;
  if (isPrivateOrLocalIP(ip)) return BLOCK;
  if (isAfghanistanIP(ip)) return BLOCK;

  for (var b = 0; b < BLOCKED.length; b++) {
    if (ip.indexOf(BLOCKED[b]) === 0) return BLOCK;
  }

  var JO = isJordanIP(ip);
  var GF = isGulfIP(ip);

  if (!(JO || GF)) return BLOCK;

  if (isWOWTraffic(url, host)) {
    if (wowJOOnly()) {
      if (JO) return JO_LOBBY_PROXY;
      return BLOCK;
    }
    return bestLobbyRoute(JO, GF);
  }

  if (isArenaTraffic(url, host)) {
    var phase = arenaPhase();

    if (phase === "JO_ONLY") {
      if (JO) return JO_LOBBY_PROXY;
      return BLOCK;
    }

    return bestLobbyRoute(JO, GF);
  }

  if (isLobbyTraffic(url, host)) {
    if (recruitJOOnly()) {
      if (JO) return JO_LOBBY_PROXY;
      return BLOCK;
    }
    return bestLobbyRoute(JO, GF);
  }

  if (isVoiceTraffic(url, host)) {
    return VOICE_PROXY;
  }

  if (isMatchTraffic(url, host)) {
    return bestMatchRoute(JO, GF);
  }

  return bestMatchRoute(JO, GF);
}
