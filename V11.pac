// ================= PROXIES =================
var MATCH_JO = "PROXY 212.35.66.45:20001"; // MATCH ONLY (UDP)

var LOBBY_POOL = [
  "PROXY 91.106.109.12:9030",
  "PROXY 176.29.153.95:9030",
  "PROXY 212.35.66.45:10039",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";
var MATCH_PORT = 20001;

// ================= MATCH (STABLE CORE – LONG TERM) =================
var JORDAN_MATCH_CORE = [
  ["82.212.64.0","255.255.192.0"],   // Zain
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],      // Orange
  ["176.28.128.0","255.255.128.0"],
  ["46.185.128.0","255.255.128.0"],  // Jordan IX
  ["213.6.0.0","255.255.0.0"]        // DC
];

// ================= LOBBY / ARENA / WOW (WIDE JO) =================
var JORDAN_WIDE_IPV4 = [
  ["100.64.0.0","255.192.0.0"],

  ["82.212.0.0","255.255.0.0"],
  ["94.249.0.0","255.255.0.0"],

  ["176.28.0.0","255.252.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["37.48.0.0","255.255.0.0"],
  ["91.106.0.0","255.255.0.0"],

  ["109.107.0.0","255.255.0.0"],
  ["31.153.0.0","255.255.0.0"],
  ["188.123.160.0","255.255.224.0"],

  ["212.35.0.0","255.255.0.0"],
  ["178.133.0.0","255.255.0.0"],
  ["85.235.0.0","255.255.0.0"],
  ["62.150.0.0","255.255.128.0"],

  ["213.6.0.0","255.255.0.0"],
  ["46.185.0.0","255.255.0.0"],
  ["185.107.0.0","255.255.0.0"],
  ["195.229.0.0","255.254.0.0"]
];

// ================= GEO BLOCK (MATCH ONLY) =================
var GEO_BLACKLIST = [
  ["5.0.0.0","255.0.0.0"],
  ["37.0.0.0","255.0.0.0"],
  ["51.0.0.0","255.0.0.0"],
  ["31.128.0.0","255.192.0.0"],
  ["46.16.0.0","255.240.0.0"],
  ["95.24.0.0","255.248.0.0"],
  ["178.64.0.0","255.192.0.0"],
  ["1.0.0.0","255.0.0.0"],
  ["14.0.0.0","255.0.0.0"],
  ["27.0.0.0","255.0.0.0"]
];

// ================= IRAQ BLOCK (ALL) =================
var IRAQ_BLACKLIST = [
  ["37.236.0.0","255.252.0.0"],
  ["45.82.0.0","255.255.0.0"],
  ["45.84.0.0","255.255.0.0"],
  ["62.201.0.0","255.255.0.0"],
  ["77.44.0.0","255.252.0.0"],
  ["78.109.0.0","255.255.0.0"],
  ["91.132.0.0","255.255.0.0"],
  ["95.170.0.0","255.254.0.0"],
  ["185.117.0.0","255.255.0.0"],
  ["185.194.0.0","255.255.0.0"],
  ["185.225.0.0","255.255.0.0"]
];

// ================= SESSION =================
var SESSION = { dnsCache:{} };

// ================= HELPERS =================
function norm(h){ var i=h.indexOf(":"); return i>-1?h.substring(0,i):h; }
function isInList(ip,list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip,list[i][0],list[i][1])) return true;
  return false;
}
function isIraq(ip){ return isInList(ip, IRAQ_BLACKLIST); }
function resolvePinned(host){
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}
function pickLobbyProxy(host){
  var h=0; for (var i=0;i<host.length;i++) h=(h+host.charCodeAt(i))%LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

// ================= DETECTION =================
function isPUBG(h){
  return /(pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|vng|krmobile)/i.test(h);
}
function isMatch(u,h){
  return /(match|battle|combat|ingame|udp|tick|room|server|play)/i.test(u+" "+h);
}
function isArena(u,h){
  return /(arena|wow|training|tdm|practice)/i.test(u+" "+h);
}
function isLobby(u,h){
  return /(lobby|matchmaking|queue|recruit|join|search|gateway)/i.test(u+" "+h);
}
function isPresence(u,h){
  return /(presence|status|online|heartbeat|keepalive|session)/i.test(u+" "+h);
}
function isRelay(u,h){
  return /(relay|turn|stun|voice|rtc|webrtc|media|send|recv)/i.test(u+" "+h);
}
function isCDN(u,h){
  return /(cdn|asset|patch|update|content|pak|obb)/i.test(u+" "+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host){
  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;

  if (isIraq(ip)) return BLOCK;

  if (isPresence(url, host) || isRelay(url, host)) {
    return pickLobbyProxy(host);
  }

  if (isArena(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  if (isMatch(url, host)) {
    if (url.indexOf(":"+MATCH_PORT) === -1 && host.indexOf(":"+MATCH_PORT) === -1) return BLOCK;
    if (isInList(ip, GEO_BLACKLIST)) return BLOCK;
    if (!isInList(ip, JORDAN_MATCH_CORE)) return BLOCK;
    return MATCH_JO;
  }

  if (isLobby(url, host) || isCDN(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  return pickLobbyProxy(host);
}
