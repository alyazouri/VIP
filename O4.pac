// =====================================================
// 🎮 PUBG MOBILE PROXY – ULTIMATE JORDAN BUILD v2.0
// Smart Detection + Strict Routing + Session Guard
// No Direct Connections - Full Proxy Control
// =====================================================

// ==================== PROXY ROUTES ====================
var LOBBY_PROXY =
  "PROXY 176.29.153.95:9030; " +
  "PROXY 212.35.66.45:9030; " +
  "PROXY 46.185.131.218:20001; " +
  "PROXY 82.212.84.33:20001";

var MATCH_PROXY = "PROXY 176.29.153.95:20001";
var VOICE_JO    = "PROXY 82.212.84.33:10012";
var VOICE_GULF  = "PROXY 82.212.84.33:20001";
var ANALYTICS_PROXY = "PROXY 82.212.84.33:5000"; // ✅ بروكسي خفيف للتحليلات
var CDN_PROXY = "PROXY 46.185.131.218:443";      // ✅ بروكسي للتحميلات
var BLOCK  = "PROXY 127.0.0.1:9";

// ==================== JORDAN STRICT (MATCH-ONLY) ====================
var JORDAN_STRICT = [
  ["82.212.64.0","255.255.192.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["91.106.0.0","255.255.0.0"],
  ["188.123.160.0","255.255.224.0"],
  ["46.185.128.0","255.255.128.0"],
  ["86.108.0.0","255.255.128.0"],
  ["92.253.0.0","255.255.128.0"],
  ["94.249.0.0","255.255.128.0"]
];

// ==================== JORDAN EXTENDED (FUNNEL-ONLY) ====================
var JORDAN_EXTENDED = [
  ["37.202.0.0","255.255.0.0"],
  ["185.23.0.0","255.255.0.0"],
  ["185.107.0.0","255.255.0.0"],
  ["193.188.0.0","255.255.0.0"]
];

// ==================== REGION DETECTION ====================
function inList(ip, list){
  for (var i=0; i<list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function isJordanStrict(ip){ return ip && inList(ip, JORDAN_STRICT); }
function isJordanExtended(ip){ return ip && inList(ip, JORDAN_EXTENDED); }

function isNearGulf(ip){
  return ip && (
    isInNet(ip,"212.71.0.0","255.255.0.0") ||
    isInNet(ip,"62.84.0.0","255.255.0.0") ||
    ip.indexOf("31.192.") === 0 ||
    ip.indexOf("5.62.") === 0
  );
}

// ==================== TRAFFIC CLASSIFIERS ====================
function isPUBG(h){
  return /(pubg|pubgm|intlgame|igamecj|tencent|krafton|lightspeed|wow|ugc)/i.test(h);
}

function isLobby(u,h){
  return /(lobby|matchmaking|queue|room|dispatcher|region|allocation|gateway)/i.test(u+h);
}

function isFriends(u,h){
  return /(friend|social|presence|invite|party|team|squad|clan|guild)/i.test(u+h);
}

function isPreMatch(u,h){
  return /(ready|prepare|loadout|sync|select|spawn|briefing)/i.test(u+h);
}

function isMatch(u,h){
  return /(game|battle|match|session|realtime|tick|state|gameserver|authority)/i.test(u+h);
}

function isArena(u,h){
  return /(arena|tdm|deathmatch|training|practice|range|warehouse)/i.test(u+h);
}

function isVoice(u,h){
  return /(voice|rtc|webrtc|voip|audio|mic|talk)/i.test(u+h);
}

function isAnalytics(u,h){
  return /(analytics|telemetry|metrics|stats|tracking|log|crash|report)/i.test(u+h);
}

function isCDN(u,h){
  return /(cdn|asset|resource|download|patch|update|content)/i.test(u+h);
}

function isAuth(u,h){
  return /(login|auth|token|oauth|passport|account|verify)/i.test(u+h);
}

// ==================== SESSION STATE ====================
var SESSION = {
  matchIP: null,
  hardLockUntil: 0,
  quarantineIP: null,
  lobbyAttempts: 0,
  sessionStart: 0
};

function now(){ return Date.now(); }

function resetSession(){
  if (SESSION.matchIP && now() > SESSION.hardLockUntil + 60000){
    SESSION.matchIP = null;
    SESSION.quarantineIP = null;
    SESSION.hardLockUntil = 0;
  }
}

// ==================== HELPERS ====================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function ipOf(h){
  var ip = dnsResolve(h);
  return (ip && ip.indexOf(".") !== -1) ? ip : null;
}

function isValidIP(ip){
  if (!ip) return false;
  if (isInNet(ip, "127.0.0.0", "255.0.0.0")) return false;
  if (isInNet(ip, "10.0.0.0", "255.0.0.0")) return false;
  if (isInNet(ip, "172.16.0.0", "255.240.0.0")) return false;
  if (isInNet(ip, "192.168.0.0", "255.255.0.0")) return false;
  return true;
}

// ==================== MAIN ROUTING ENGINE ====================
function FindProxyForURL(url, host){
  host = norm(host.toLowerCase());
  
  resetSession();
  
  // ✅ Non-PUBG traffic → Lobby Proxy (بدلاً من DIRECT)
  if (!isPUBG(host)) return LOBBY_PROXY;

  var ip = ipOf(host);
  
  if (!isValidIP(ip)) return BLOCK;

  var JO_S = isJordanStrict(ip);
  var JO_E = isJordanExtended(ip);
  var GULF = isNearGulf(ip);
  var UNKNOWN = !JO_S && !JO_E && !GULF;

  // -------- AUTH/LOGIN (ALWAYS FUNNEL)
  if (isAuth(url, host)){
    return LOBBY_PROXY;
  }

  // ✅ ANALYTICS/TELEMETRY (عبر بروكسي خفيف)
  if (isAnalytics(url, host)){
    return ANALYTICS_PROXY;
  }

  // ✅ CDN/ASSETS (عبر بروكسي مخصص)
  if (isCDN(url, host)){
    return CDN_PROXY;
  }

  // -------- VOICE (REGIONAL ROUTING)
  if (isVoice(url, host)){
    if (JO_S) return VOICE_JO;
    if (GULF) return VOICE_GULF;
    return BLOCK;
  }

  // -------- FRIENDS/PARTY (FUNNEL TO JORDAN)
  if (isFriends(url, host)){
    return LOBBY_PROXY;
  }

  // -------- PRE-MATCH (JORDAN GATE)
  if (isPreMatch(url, host)){
    if (JO_S || JO_E) return LOBBY_PROXY;
    return BLOCK;
  }

  // -------- MATCH (STRICT JORDAN ONLY + QUARANTINE)
  if (isMatch(url, host)){
    if (SESSION.quarantineIP && ip === SESSION.quarantineIP) return BLOCK;

    if (SESSION.matchIP){
      if (ip === SESSION.matchIP) return MATCH_PROXY;
      SESSION.quarantineIP = ip;
      return BLOCK;
    }

    if (JO_S){
      SESSION.matchIP = ip;
      SESSION.hardLockUntil = now() + 30000;
      SESSION.sessionStart = now();
      return MATCH_PROXY;
    }

    SESSION.quarantineIP = ip;
    return BLOCK;
  }

  // -------- ARENA (JORDAN FUNNEL)
  if (isArena(url, host)){
    return (JO_S || JO_E) ? LOBBY_PROXY : BLOCK;
  }

  // -------- LOBBY (SMART FUNNEL)
  if (isLobby(url, host)){
    SESSION.lobbyAttempts++;

    if (JO_S || JO_E) return LOBBY_PROXY;
    if (GULF && SESSION.lobbyAttempts > 3) return LOBBY_PROXY;
    if (UNKNOWN) return LOBBY_PROXY;

    return BLOCK;
  }

  // ✅ DEFAULT FALLBACK (عبر Lobby Proxy)
  return LOBBY_PROXY;
}
