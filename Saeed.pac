// ================= PROXIES =================
var LOBBY_JO = "PROXY 2.59.53.74:443";    // Lobby services
var MATCH_JO = "PROXY 37.44.38.20:443";  // Match + Join + Matchmaking
var BLOCK    = "PROXY 127.0.0.1:9";

// ================= INTERNAL (LAN) =================
var INTERNAL_IPV4 = [
  ["10.0.0.0",    "255.0.0.0"],
  ["172.16.0.0",  "255.240.0.0"],
  ["192.168.0.0", "255.255.0.0"],
  ["127.0.0.0",   "255.0.0.0"],
  ["169.254.0.0", "255.255.0.0"]
];

// ================= LOBBY IPV4 (WIDE – ALL JORDAN MOBILE) =================
var LOBBY_IPV4 = [
  // Zain
  ["176.28.0.0",  "255.254.0.0"],
  ["178.18.0.0",  "255.254.0.0"],
  ["77.245.0.0",  "255.255.0.0"],
  // Orange
  ["37.44.0.0",   "255.252.0.0"],
  ["82.212.0.0",  "255.252.0.0"],
  ["92.240.0.0",  "255.248.0.0"],
  ["109.107.0.0", "255.255.0.0"],
  // Umniah
  ["5.45.128.0",  "255.255.128.0"],
  ["62.72.128.0", "255.255.128.0"]
];

// ================= MATCH IPV4 (ULTRA CLEAN – ZAIN ONLY) =================
var MATCH_IPV4 = [
  ["176.28.64.0",  "255.255.192.0"],
  ["176.28.128.0", "255.255.192.0"]
];

// ================= SESSION (MATCH PIN) =================
var SESSION = { pinnedNet: null, pinnedHost: null };

// ================= HELPERS =================
function norm(h){ var i=h.indexOf(":"); return i>-1? h.substring(0,i):h; }
function isInList(ip, list){
  for (var i=0;i<list.length;i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}
// PIN ~ /18
function netPin(ip){
  var p=ip.split('.');
  return p[0]+"."+p[1]+"."+Math.floor(p[2]/64);
}

// ================= PUBG DETECTION (ALL MODES) =================
function isPUBG(u,h){
  var s=(u+" "+h).toLowerCase();
  return (
    /(pubg|pubgm|pubgmobile|pubg\-mobile|pubg\.mobile)/.test(s) ||
    /(krafton|tencent|levelinfinite|lightspeed|lightspeedquantum|bluehole|proxima|vnggames|igame)/.test(s) ||
    /(qcloud|gcloud|tencentcloud|aliyun|alibaba|aliyuncs|amazonaws|aws|cloudfront)/.test(s)
  );
}

// ================= TRAFFIC TYPES =================
// LOBBY = كل ما يظهر بالصورة (Teams list / Recruit / Inventory / Ranked rooms / Social / Store / Events)
function isLobby(u,h){
  return /(inventory|loadout|wardrobe|outfit|
           team|squad|party|room|rooms|list|
           recruit|invite|filter|advanced|
           ranked|erangel|primewood|skyhigh|spectacle|
           profile|card|badge|title|rank|
           friend|social|chat|clan|crew|
           shop|store|mall|purchase|order|
           reward|mission|task|event|
           notice|mail|message|
           config|setting|option|language|
           version|patch|update|
           cdn|static|asset|resource|
           gateway|region|discover)/i
         .test((u+" "+h).toLowerCase());
}

// MATCH = join + matchmaking + gameplay
function isMatch(u,h){
  return /(join|matchmaking|queue|
           match|battle|game|combat|
           realtime|sync|udp|tick|
           instance|session|shard|
           classic|ranked|arena|evo|
           payload|metro|zombie|
           training|custom|event)/i
         .test((u+" "+h).toLowerCase());
}

// ================= MAIN =================
function FindProxyForURL(url, host){
  host = norm(host.toLowerCase());

  if (!isPUBG(url, host)) return BLOCK;

  var ip = dnsResolve(host);
  if (!ip) return BLOCK;
  if (ip.indexOf(":")>-1) return BLOCK; // no IPv6

  if (isInList(ip, INTERNAL_IPV4)) return "DIRECT";

  // LOBBY (FULL)
  if (isLobby(url, host)){
    if (isInList(ip, LOBBY_IPV4)) return LOBBY_JO;
    return BLOCK;
  }

  // MATCH + JOIN + MATCHMAKING
  if (isMatch(url, host)){
    if (!isInList(ip, MATCH_IPV4)) return BLOCK;

    var curPin = netPin(ip);
    if (!SESSION.pinnedNet){
      SESSION.pinnedNet = curPin;
      SESSION.pinnedHost = host;
      return MATCH_JO;
    }
    if (curPin !== SESSION.pinnedNet) return BLOCK;
    if (host !== SESSION.pinnedHost)  return BLOCK;

    return MATCH_JO;
  }

  return BLOCK;
}
