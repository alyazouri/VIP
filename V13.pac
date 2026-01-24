// ================= PROXIES =================
var MATCH_JO = "PROXY 212.35.66.45:20001"; // Gameplay / Arena / WoW (JO Core)

var VISIBILITY_POOL = [
  "PROXY 176.29.153.95:9030", // Mobile CGNAT (high visibility)
  "PROXY 91.106.109.12:9030"  // Core JO (stability)
];

var BLOCK = "PROXY 127.0.0.1:9";

// ================= JORDAN CORE (MATCH / ARENA / WOW) =================
var JORDAN_CORE = [
  // Zain
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  // Orange
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  // Umniah
  ["109.107.0.0","255.255.0.0"],
  ["31.153.0.0","255.255.0.0"],
  ["188.123.160.0","255.255.224.0"]
];

// ================= JORDAN MOBILE / ACCESS (VISIBILITY) =================
var JORDAN_VISIBILITY = [
  ["100.64.0.0","255.192.0.0"], // CGNAT
  ["176.28.0.0","255.252.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["91.106.0.0","255.255.0.0"],
  ["82.212.0.0","255.255.0.0"],
  ["94.249.0.0","255.255.0.0"]
];

// ================= HELPERS =================
function norm(h){
  var i=h.indexOf(":");
  return i>-1 ? h.substring(0,i) : h;
}
function inList(ip,list){
  for (var i=0;i<list.length;i++){
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}
function pickVisibility(host){
  var h=0;
  for (var i=0;i<host.length;i++)
    h=(h+host.charCodeAt(i))%VISIBILITY_POOL.length;
  return VISIBILITY_POOL[h];
}

// ================= DETECTION (BEHAVIORAL & CLEAN) =================
function isPUBG(h){
  return /(pubg|pubgm|tencent|krafton|lightspeed|levelinfinite)/i.test(h);
}

// --- NO TOUCH ZONE ---
function isAuth(u,h){
  return /(auth|account|login|security|anticheat|integrity|shield|telemetry)/i
         .test(u+" "+h);
}

// --- VISIBILITY CORE ---
function isPresence(u,h){
  return /(presence|heartbeat|status|keepalive|session|availability)/i
         .test(u+" "+h);
}
function isParty(u,h){
  return /(party|squad|team|group|member|invite|joinparty)/i
         .test(u+" "+h);
}
function isRecruit(u,h){
  return /(recruit|matchmaking|queue|search|findteam|teammate|fill|autojoin)/i
         .test(u+" "+h);
}
function isVoice(u,h){
  return /(voice|rtc|webrtc|audio|media)/i
         .test(u+" "+h);
}

// --- GAMEPLAY ---
function isMatch(u,h){
  return /(match|battle|ingame|udp|tick|room|server|combat)/i
         .test(u+" "+h);
}
function isArena(u,h){
  return /(arena|wow|training|tdm|practice)/i
         .test(u+" "+h);
}

// --- CDN ---
function isCDN(u,h){
  return /(cdn|asset|patch|update|content|pak|obb|bundle)/i
         .test(u+" "+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host){
  host = norm(host.toLowerCase());

  // Anything not PUBG → BLOCK
  if (!isPUBG(host)) return BLOCK;

  var ip = dnsResolve(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  // AUTH / ANTI-CHEAT → pass quietly via visibility pool
  if (isAuth(url, host)) {
    return pickVisibility(host);
  }

  // PRESENCE + PARTY + RECRUIT + VOICE → SAME VISIBILITY PATH
  if (isPresence(url, host) || isParty(url, host) ||
      isRecruit(url, host)  || isVoice(url, host)) {
    if (!inList(ip, JORDAN_VISIBILITY)) return BLOCK;
    return pickVisibility(host);
  }

  // MATCH + ARENA + WOW → JORDAN CORE ONLY
  if (isMatch(url, host) || isArena(url, host)) {
    if (!inList(ip, JORDAN_CORE)) return BLOCK;
    return MATCH_JO;
  }

  // CDN → visibility pool (no direct)
  if (isCDN(url, host)) {
    return pickVisibility(host);
  }

  return BLOCK;
}
