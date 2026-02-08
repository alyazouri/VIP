// ================= CONFIG =================
var REGION = "JORDAN";

// ================= PROXIES =================
var LOBBY_JO = "PROXY 2.59.53.74:443";   // Lobby Jordan
var MATCH_JO = "PROXY 37.44.38.20:443";  // Match Jordan (Stronger)
var BLOCK    = "PROXY 127.0.0.1:9";

// ================= REGION DEFINITIONS =================
var REGIONS = {
  JORDAN: {
    PRIORITY_ISPS: ["ZAIN", "UMNIAH", "ORANGE"],
    ISPS: {
      ZAIN: [
  ["5.45.128.0",  "255.255.128.0"],
     ["46.32.0.0",   "255.224.0.0"],
    ["62.72.128.0", "255.255.128.0"]

      ],
      UMNIAH: [
      ["176.28.0.0", "255.254.0.0"],
   ["178.18.0.0", "255.254.0.0"],
   ["77.245.0.0", "255.255.0.0"],
   ["79.173.0.0", "255.255.0.0"]
      ],
      ORANGE: [
        ["37.44.0.0",   "255.252.0.0"],
        ["82.212.0.0",  "255.252.0.0"],
        ["92.240.0.0",  "255.248.0.0"],
        ["109.107.0.0", "255.255.0.0"],
        ["188.247.0.0", "255.255.0.0"]
      ]
    }
  }
};

// ================= SESSION =================
var SESSION = {
  netCount: {},
  pinnedNet: null,
  pinnedHost: null,
  pinnedISP: null,
  LOCKED: false,
  totalMatchReq: 0
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isIPv6(ip){
  return ip.indexOf(":") > -1;
}

function isInList(ip, list){
  for (var i = 0; i < list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

// net24 حسب تعريفك (أول خانتين = ضغط أعلى)
function net24(ip){
  return ip.split('.').slice(0,2).join('.');
}

function detectISP(ip){
  var r = REGIONS[REGION];
  for (var isp in r.ISPS) {
    if (isInList(ip, r.ISPS[isp])) return isp;
  }
  return null;
}

function ispPriority(isp){
  var p = REGIONS[REGION].PRIORITY_ISPS;
  for (var i = 0; i < p.length; i++)
    if (p[i] === isp) return i;
  return 999;
}

// ================= PUBG DETECTION (ALL MODES) =================
function isPUBG(host){
  return /(pubg|pubgm|pubgmobile|pubgpc|krafton|bluehole|
           tencent|lightspeed|levelinfinite|
           wow|metro|payload)/i.test(host);
}

// Lobby / Pre-game (Classic, Ranked, Arena, TDM, Metro, WOW, Training, Custom)
function isLobby(url, host){
  return /(lobby|matchmaking|queue|dispatch|gateway|
           region|join|prepare|ready|
           arena|tdm|training|custom|
           metro|wow|payload)/i.test(url + host);
}

// Match / In-game (All gameplay & realtime traffic)
function isMatch(url, host){
  return /(match|battle|game|combat|realtime|
           sync|udp|tick|room|session|
           arena|tdm|payload|
           metro|zombie|pve|
           wow|sandbox|instance)/i.test(url + host);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // PUBG فقط
  if (!isPUBG(host)) return BLOCK;

  var ip = dnsResolve(host);
  if (!ip) return BLOCK;

  // IPv6 ممنوع
  if (isIPv6(ip)) return BLOCK;

  // Detect ISP حسب Region الأردن
  var isp = detectISP(ip);
  if (!isp) return BLOCK;

  // ================= MATCH =================
  if (isMatch(url, host)) {

    var curNet = net24(ip);
    SESSION.totalMatchReq++;

    if (!SESSION.netCount[curNet])
      SESSION.netCount[curNet] = 0;
    SESSION.netCount[curNet]++;

    // لو قفلنا خلاص
    if (SESSION.LOCKED) {
      if (curNet !== SESSION.pinnedNet) return BLOCK;
      if (host   !== SESSION.pinnedHost) return BLOCK;
      if (isp    !== SESSION.pinnedISP)  return BLOCK;
      return MATCH_JO;
    }

    // تثبيت حسب أولوية المزوّد
    var prio = ispPriority(isp);
    if (
      (prio === 0 && SESSION.netCount[curNet] >= 1) || // ZAIN
      (prio === 1 && SESSION.netCount[curNet] >= 2) || // UMNIAH
      (prio === 2 && SESSION.netCount[curNet] >= 3) || // ORANGE
      SESSION.totalMatchReq >= 5
    ) {
      SESSION.pinnedNet  = curNet;
      SESSION.pinnedHost = host;
      SESSION.pinnedISP  = isp;
      SESSION.LOCKED     = true;
      return MATCH_JO;
    }

    return MATCH_JO;
  }

  // ================= LOBBY =================
  if (isLobby(url, host)) {
    return LOBBY_JO;
  }

  return BLOCK;
}
