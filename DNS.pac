// 🔥 PUBG JO ABSOLUTE FINAL — JO LOCK + DNS Friendly (ES5 SAFE)

// ===================== CFG =====================
var CFG = {
  ALLOW_SAFE_DIRECT: true,
  BLOCK_IR_AF: true,
  HEADSHOT_PRIORITY: true,
  PROXY_ROTATION: true   // ثابت = ثبات NAT
};

// ===================== DIRECT ONLY =====================
var DIRECT_DOMAINS = [
  "github.com",
  "raw.githubusercontent.com",
  "gist.githubusercontent.com",
  "youtube.com",
  "googlevideo.com",
  "ytimg.com",
  "youtubei.googleapis.com"
];

// ===================== SAFE DIRECT (system) =====================
var SAFE_DIRECT_DOMAINS = [
  "captive.apple.com",
  "ocsp.apple.com",
  "time.apple.com",
  "clients3.google.com",
  "gstatic.com",
  "googleapis.com"
];

// ===================== PROXIES =====================
var PROXY_MATCH   = "PROXY 212.35.66.45:20020";   // Match
var PROXY_LOBBY   = "PROXY 46.185.131.218:20001"; // Lobby / Recruit
var PROXY_VOICE   = "PROXY 212.35.66.45:443";     // Voice
var BLOCK         = "PROXY 0.0.0.0:0";

// ===================== PUBG DOMAINS =====================
var PUBG_MATCH = [
  "match.pubgmobile.com",
  "matchmaking.pubgmobile.com",
  "mm.pubgmobile.com",
  "game.pubgmobile.com",
  "gs.pubgmobile.com",
  "battle.pubgmobile.com"
];

var PUBG_LOBBY = [
  "lobby.pubgmobile.com",
  "queue.pubgmobile.com",
  "room.pubgmobile.com",
  "recruit.pubgmobile.com",
  "team.pubgmobile.com"
];

var PUBG_VOICE = [
  "voice.pubgmobile.com",
  "rtc.pubgmobile.com",
  "voip.pubgmobile.com",
  "rtc.igamecj.com"
];

var PUBG_CORE = [
  "pubgmobile.com",
  "pubgm.com",
  "proximabeta.com",
  "igamecj.com",
  "tencent.com",
  "qq.com"
];

// ===================== JO CIDRS =====================
var JO_CIDRS = [
  "212.35.0.0/16",
  "46.185.128.0/17",
  "176.29.0.0/16",
  "176.28.128.0/17",
  "77.245.0.0/16",
  "91.106.0.0/16"
];

var BLOCK_CIDRS = [
  "5.0.0.0/17",
  "46.53.0.0/16",
  "188.215.160.0/19"
];

// ===================== CIDR ENGINE =====================
function ipToLong(ip){
  var p = ip.split(".");
  if (p.length !== 4) return -1;
  return (((+p[0]<<24)|(+p[1]<<16)|(+p[2]<<8)|(+p[3]))>>>0);
}

function inCIDR(ip, cidrs){
  var ipL = ipToLong(ip);
  if (ipL < 0) return false;
  for (var i=0;i<cidrs.length;i++){
    var c = cidrs[i].split("/");
    var net = ipToLong(c[0]);
    var mask = (0xFFFFFFFF << (32-parseInt(c[1])))>>>0;
    if ((ipL & mask) === (net & mask)) return true;
  }
  return false;
}

// ===================== HELPERS =====================
function endsWith(h,s){
  return h===s || h.slice(-s.length-1)==="."+s;
}

function inDomains(h,list){
  for(var i=0;i<list.length;i++){
    if(endsWith(h,list[i])) return true;
  }
  return false;
}

// ===================== MAIN =====================
function FindProxyForURL(url, host){
  host = (host||"").toLowerCase();

  // DIRECT GitHub / YouTube
  if (inDomains(host, DIRECT_DOMAINS)) return "DIRECT";

  // SAFE DIRECT
  if (CFG.ALLOW_SAFE_DIRECT && inDomains(host, SAFE_DIRECT_DOMAINS))
    return "DIRECT";

  var ip = dnsResolve(host) || "0.0.0.0";

  // BLOCK unwanted regions
  if (CFG.BLOCK_IR_AF && inCIDR(ip, BLOCK_CIDRS))
    return BLOCK;

  // PUBG Match
  if (inDomains(host, PUBG_MATCH))
    return inCIDR(ip, JO_CIDRS) ? PROXY_MATCH : PROXY_MATCH + "; " + BLOCK;

  // PUBG Lobby
  if (inDomains(host, PUBG_LOBBY))
    return inCIDR(ip, JO_CIDRS) ? PROXY_LOBBY : PROXY_LOBBY + "; " + BLOCK;

  // PUBG Voice
  if (inDomains(host, PUBG_VOICE))
    return PROXY_VOICE;

  // PUBG Core
  if (inDomains(host, PUBG_CORE))
    return PROXY_MATCH;

  // Default: JO only
  return inCIDR(ip, JO_CIDRS) ? PROXY_LOBBY : BLOCK;
}
