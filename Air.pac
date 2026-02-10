// ================= PROXIES =================

var MATCH_JO = "PROXY 46.185.131.218:20001"; // Strong UDP Match

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= STRONG JORDAN IPV4 (MATCH) =================
var JORDAN_MATCH_IPV4 = [
  ["46.185.168.0","255.255.248.0"],
  ["212.35.64.0","255.255.248.0"],
  ["92.241.32.0","255.255.248.0"],
  ["37.220.112.0","255.255.248.0"],
  ["176.57.48.0","255.255.248.0"],
  ["109.237.192.0","255.255.248.0"]
];

// ================= WIDE JORDAN IPV4 (LOBBY) =================
var JORDAN_WIDE_IPV4 = [
  ["46.185.168.0","255.255.248.0"],
  ["212.35.64.0","255.255.248.0"],
  ["92.241.32.0","255.255.248.0"],
  ["37.220.112.0","255.255.248.0"],
  ["176.57.48.0","255.255.248.0"],
  ["109.237.192.0","255.255.248.0"]
];

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0,i) : h;
}

function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

function resolvePinned(host){
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

function pickLobbyProxy(host){
  var h = 0;
  for (var i=0;i<host.length;i++)
    h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  return LOBBY_POOL[h];
}

// ================= DETECTION =================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

// Classic / Ranked / Battle Royale / Metro
function isClassic(u,h){
  return /classic|rank|battle|match|royale|metro/i.test(u+h);
}

// TDM / Arena / Payload / Zombie / War
function isTDM(u,h){
  return /arena|tdm|teamdeathmatch|payload|zombie|war/i.test(u+h);
}

// Lobby / Squad / Party / Social
function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|party|team|squad|invite|friend|social|clan|presence/i.test(u+h);
}

// CDN / Updates
function isCDN(u,h){
  return /cdn|asset|resource|patch|update|media|content/i.test(u+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // ========= MATCH (Classic + TDM) =========
  if (isClassic(url,host) || isTDM(url,host)) {

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0,3).join('.');

    if (!SESSION.matchNet) {
      SESSION.matchNet  = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (net24 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  // ========= LOBBY / SOCIAL / CDN =========
  if (isLobby(url,host) || isCDN(url,host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  return pickLobbyProxy(host);
}
