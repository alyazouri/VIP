// ============================================================================
// 🇯🇴 TEAM1_JO_LOW_PING_FINAL (PAC-ONLY)
// هدفه: مسار أردني لأقصى درجة + بنق ثابت/منخفض + صفر تشتيت
// - Search: JO -> 9030 | non-JO -> 443 | IPv6/unknown -> JO
// - Match: 10012 ONLY (no fallback)
// - Voice: 3478 ONLY
// - CDN: 443 ONLY
// - Non-PUBG: DIRECT (no congestion)
// - Sticky per category + Country lock (first 180s, CORE only)
// ES5 SAFE
// ============================================================================

var SERV = {
  SEARCH_JO:  "PROXY 212.35.66.45:9030",
  SEARCH_NON: "PROXY 212.35.66.45:443",
  MATCH:      "PROXY 212.35.66.45:10012",
  VOICE:      "PROXY 212.35.66.45:3478",
  CDN:        "PROXY 212.35.66.45:443",
  DIRECT:     "DIRECT"
};

var DIRECT_DOMAINS = [
  "github.com","raw.githubusercontent.com","gist.githubusercontent.com",
  "youtube.com","googlevideo.com","ytimg.com","youtubei.googleapis.com"
];

var PUBG_HINTS = ["pubg","tencent","igamecj","proximabeta","gcloud","qcloud","qq.com"];

var SEARCH_CORE = [
  "matchmaking","dispatch","route","region","matchcfg","broker","gateway",
  "login","auth","passport","account","token","session","connect","config","cfg","setting"
];

var SEARCH_NOISE = [
  "friends","social","clan","nearby","party","squad","teamfinder","recruit",
  "im","chat","message","notify","push","state","sync","presence","lobby"
];

var MATCH_HINTS = ["match","battle","game","room","arena","session","rank","zone","server"];
var VOICE_HINTS = ["voice","rtc","voip","agora","rtm"];
var CDN_HINTS   = ["cdn","update","patch","assets","resource","download","static"];

var JO_NETWORKS = [
  "5.45.128.0/20","37.17.192.0/20","37.123.64.0/19","37.202.64.0/18","37.220.112.0/20",
  "46.23.112.0/20","46.32.96.0/19","46.185.128.0/17","46.248.192.0/19","62.72.160.0/19",
  "77.245.0.0/20","79.134.128.0/19","79.173.192.0/18","80.90.160.0/20","81.21.0.0/20",
  "81.28.112.0/20","82.212.64.0/18","84.18.32.0/19","84.18.64.0/19","86.108.0.0/17",
  "91.106.96.0/20","91.186.224.0/19","92.241.32.0/19","92.253.0.0/17","94.142.32.0/19",
  "94.249.0.0/17","95.141.208.0/20","95.172.192.0/19","109.107.224.0/19","109.237.192.0/20",
  "149.200.128.0/17","176.28.128.0/17","176.29.0.0/16","176.57.0.0/19","178.77.128.0/18",
  "178.238.176.0/20","188.123.160.0/19","188.247.64.0/19","193.188.64.0/19","194.165.128.0/19",
  "212.34.0.0/19","212.35.64.0/19","212.118.0.0/19","213.139.32.0/19","213.186.160.0/19",
  "217.23.32.0/20","217.29.240.0/20","217.144.0.0/20"
];

// Sticky per category
var ST_SEARCH = "";
var ST_MATCH  = "";
var ST_VOICE  = "";
var ST_CDN    = "";

// Country lock first 180s (CORE only)
var START_MS = (new Date()).getTime();
var LOCK_MS  = 180000;
var COUNTRY_LOCK = ""; // "", "JO", "NON"

// ---------- helpers ----------
function lc(s){ return String(s||"").toLowerCase(); }

function hasAny(h, arr){
  h = lc(h);
  for (var i=0;i<arr.length;i++) if (h.indexOf(arr[i]) !== -1) return true;
  return false;
}

function hostInList(h, list){
  for (var i=0;i<list.length;i++){
    var d = list[i];
    if (h === d || shExpMatch(h, "*." + d)) return true;
  }
  return false;
}

function isPUBG(h){
  h = lc(h);
  return hasAny(h, PUBG_HINTS) || shExpMatch(h, "*pubg*");
}

function inLockWindow(){
  return (((new Date()).getTime() - START_MS) < LOCK_MS);
}

function dnsIP(host){
  try { var r = dnsResolve(host); return r ? r : ""; }
  catch(e){ return ""; }
}

function isIPv4(ip){
  if (!ip) return false;
  if (ip.indexOf(":") !== -1) return false;
  var p = ip.split(".");
  if (p.length !== 4) return false;
  for (var i=0;i<4;i++){
    var n = parseInt(p[i],10);
    if (isNaN(n) || n < 0 || n > 255) return false;
  }
  return true;
}

function ipToLong(ip){
  var p = ip.split(".");
  return (((parseInt(p[0],10) << 24) >>> 0) +
          ((parseInt(p[1],10) << 16) >>> 0) +
          ((parseInt(p[2],10) << 8)  >>> 0) +
          ( parseInt(p[3],10)        >>> 0)) >>> 0;
}

function cidrHas(ip, cidr){
  if (!isIPv4(ip)) return false;
  var parts = cidr.split("/");
  if (parts.length !== 2) return false;
  var net = parts[0];
  var bits = parseInt(parts[1],10);
  if (isNaN(bits) || bits < 0 || bits > 32) return false;
  var mask = (bits === 0) ? 0 : ((0xFFFFFFFF << (32 - bits)) >>> 0);
  return ((ipToLong(ip) & mask) >>> 0) === ((ipToLong(net) & mask) >>> 0);
}

function isJO(ip){
  if (!isIPv4(ip)) return false;
  for (var i=0;i<JO_NETWORKS.length;i++){
    if (cidrHas(ip, JO_NETWORKS[i])) return true;
  }
  return false;
}

function determineCountry(host, ip){
  // IPv6/unknown => JO (حتى لا نخسر الأردن بسبب DNS)
  if (!isIPv4(ip)) return "JO";
  return isJO(ip) ? "JO" : "NON";
}

function sticky(type, val){
  if (type === "SEARCH") { if (ST_SEARCH) return ST_SEARCH; ST_SEARCH = val; return ST_SEARCH; }
  if (type === "MATCH")  { if (ST_MATCH)  return ST_MATCH;  ST_MATCH  = val; return ST_MATCH; }
  if (type === "VOICE")  { if (ST_VOICE)  return ST_VOICE;  ST_VOICE  = val; return ST_VOICE; }
  if (type === "CDN")    { if (ST_CDN)    return ST_CDN;    ST_CDN    = val; return ST_CDN; }
  return val;
}

// ===================== MAIN =====================
function FindProxyForURL(url, host){
  var h = lc(host);

  // safe DIRECT list
  if (hostInList(h, DIRECT_DOMAINS)) return SERV.DIRECT;

  // non-PUBG always direct (no congestion)
  if (!isPUBG(h)) return SERV.DIRECT;

  // CDN/VOICE fixed
  if (hasAny(h, CDN_HINTS))   return sticky("CDN", SERV.CDN);
  if (hasAny(h, VOICE_HINTS)) return sticky("VOICE", SERV.VOICE);

  // MATCH fixed (10012 only)
  if (hasAny(h, MATCH_HINTS)) return sticky("MATCH", SERV.MATCH);

  // SEARCH logic (JO bias + country lock)
  if (hasAny(h, SEARCH_CORE) || hasAny(h, SEARCH_NOISE)) {
    if (ST_SEARCH) return ST_SEARCH;

    var ip = dnsIP(host);
    var country;

    if (inLockWindow() && hasAny(h, SEARCH_CORE) && !COUNTRY_LOCK) {
      COUNTRY_LOCK = determineCountry(h, ip);
    }

    country = COUNTRY_LOCK ? COUNTRY_LOCK : determineCountry(h, ip);
    ST_SEARCH = (country === "JO") ? SERV.SEARCH_JO : SERV.SEARCH_NON;
    return ST_SEARCH;
  }

  // default PUBG traffic -> match (stable)
  return sticky("MATCH", SERV.MATCH);
}
