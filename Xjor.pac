// ============================================================================
// 🇯🇴 PUBG JO — LOBBY ALL JO / MATCH STRONG JO ONLY
// - Lobby + Recruit: allow ALL Jordan IP ranges (JO_WIDE) + allow Anycast
// - Match gameplay: allow ONLY strong Jordan ranges (JO_STRONG)
// - Sticky routing for stability + per-host proxy chain
// ============================================================================

// ===================== PROXIES (ضع بروكسياتك هنا) =====================
var LOBBY_PROXIES = [
  "PROXY 212.35.66.45:9030",
  "PROXY 212.35.66.45:443",
  "PROXY 212.35.66.45:8443",
  "PROXY 212.35.66.45:10000",
  "PROXY 46.185.131.218:20001"
];

var MATCH_PROXIES = [
  "PROXY 212.35.66.45:10012",
  "PROXY 46.185.131.218:20001"
];

var VOICE_PROXIES = [
  "PROXY 212.35.66.45:3478",
  "PROXY 212.35.66.45:443"
];

var DIRECT_DOMAINS = [
  "github.com","raw.githubusercontent.com","gist.githubusercontent.com",
  "youtube.com","googlevideo.com","ytimg.com","youtubei.googleapis.com"
];

var BLOCK = "PROXY 0.0.0.0:0";

// ===================== HINTS =====================
var PUBG_HINTS  = ["pubg","tencent","igamecj","proximabeta","gcloud","qcloud","qq.com"];

var RECRUIT_HINTS = [
  "teamfinder","recruit","globalrecruit","presence",
  "friends","social","clan","nearby","party","squad",
  "im","chat","message","notify","push","state","sync"
];

var LOBBY_HINTS = [
  "lobby","login","auth","passport","account","token","session","connect",
  "config","cfg","setting","region","dispatch","route","matchcfg",
  "gateway","broker","friends","social","clan","party"
];

var MATCH_HINTS = ["match","battle","game","room","arena","session","rank","zone","server"];
var VOICE_HINTS = ["voice","rtc","voip","agora","rtm"];
var CDN_HINTS   = ["cdn","update","patch","assets","resource","download","static"];
var TELE_HINTS  = ["telemetry","analytics","log","ads","report","stat"];

// ===================== JO LISTS =====================
// ✅ Lobby: ALL Jordan ranges (wide)
var JO_WIDE = [
  ["5.45.128.0", "255.255.240.0"],
  ["37.17.192.0", "255.255.240.0"],
  ["37.123.64.0", "255.255.224.0"],
  ["37.202.64.0", "255.255.192.0"],
  ["37.220.112.0", "255.255.240.0"],
  ["46.23.112.0", "255.255.240.0"],
  ["46.32.96.0", "255.255.224.0"],
  ["46.185.128.0","255.255.128.0"],
  ["46.248.192.0","255.255.224.0"],
  ["62.72.160.0", "255.255.224.0"],
  ["77.245.0.0",  "255.255.240.0"],
  ["79.134.128.0","255.255.224.0"],
  ["79.173.192.0","255.255.192.0"],
  ["80.90.160.0", "255.255.240.0"],
  ["81.21.0.0",   "255.255.240.0"],
  ["81.28.112.0", "255.255.240.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["84.18.32.0",  "255.255.224.0"],
  ["84.18.64.0",  "255.255.224.0"],
  ["86.108.0.0",  "255.255.128.0"],
  ["91.106.96.0", "255.255.240.0"],
  ["91.186.224.0","255.255.224.0"],
  ["92.241.32.0", "255.255.224.0"],
  ["92.253.0.0",  "255.255.128.0"],
  ["94.142.32.0", "255.255.224.0"],
  ["94.249.0.0",  "255.255.128.0"],
  ["95.141.208.0","255.255.240.0"],
  ["95.172.192.0","255.255.224.0"],
  ["109.107.224.0","255.255.224.0"],
  ["109.237.192.0","255.255.240.0"],
  ["149.200.128.0","255.255.128.0"],
  ["176.28.128.0","255.255.128.0"],
  ["176.29.0.0",  "255.255.0.0"],
  ["176.57.0.0",  "255.255.224.0"],
  ["178.77.128.0","255.255.192.0"],
  ["178.238.176.0","255.255.240.0"],
  ["188.123.160.0","255.255.224.0"],
  ["188.247.64.0","255.255.224.0"],
  ["193.188.64.0","255.255.224.0"],
  ["194.165.128.0","255.255.224.0"],
  ["212.34.0.0",  "255.255.224.0"],
  ["212.35.64.0", "255.255.224.0"],
  ["212.118.0.0", "255.255.224.0"],
  ["213.139.32.0","255.255.224.0"],
  ["213.186.160.0","255.255.224.0"],
  ["217.23.32.0", "255.255.240.0"],
  ["217.29.240.0","255.255.240.0"],
  ["217.144.0.0", "255.255.240.0"]
];

// ✅ Match: STRONG Jordan only (أقوى/الأثبت غالبًا)
// (إذا بدك أضيف/أشيل منها حسب نتائجك قلّي)
var JO_STRONG = [
  ["212.35.64.0", "255.255.224.0"], // Batelco / Core proxy net
  ["176.28.128.0","255.255.128.0"], // Zain big
  ["176.29.0.0",  "255.255.0.0"],   // Zain big
  ["46.185.128.0","255.255.128.0"]  // Zain/Jo transit chunk
];

// Anycast allowed for Lobby (to avoid empty recruit)
var ANYCAST = [
  ["34.0.0.0","255.0.0.0"],
  ["35.0.0.0","255.0.0.0"],
  ["104.16.0.0","255.240.0.0"],
  ["104.24.0.0","255.240.0.0"],
  ["151.101.0.0","255.255.0.0"]
];

// ===================== STATE =====================
var STICKY = {};
var IDX = {};

// ===================== HELPERS =====================
function lc(s){ return String(s||"").toLowerCase(); }
function hasAny(h, arr){ h=lc(h); for (var i=0;i<arr.length;i++) if (h.indexOf(arr[i])!==-1) return true; return false; }
function isHostInList(h, arr){ for (var i=0;i<arr.length;i++) if (h===arr[i] || shExpMatch(h,"*."+arr[i])) return true; return false; }
function dnsIP(h){ var ip=dnsResolve(h); return ip?ip:""; }
function isIPv4(ip){ return ip && ip.indexOf(".")!==-1 && ip.split(".").length===4; }
function inNets(ip, nets){
  if(!isIPv4(ip)) return false;
  for(var i=0;i<nets.length;i++) if(isInNet(ip, nets[i][0], nets[i][1])) return true;
  return false;
}
function isPUBG(h){ h=lc(h); return hasAny(h, PUBG_HINTS) || shExpMatch(h,"*pubg*"); }

function sticky(host, val){
  if (STICKY[host]) return STICKY[host];
  STICKY[host] = val;
  return val;
}

function pickRR(host, arr){
  var k = host + "|" + String(arr.length);
  var i = (IDX[k] || 0) % arr.length;
  IDX[k] = i + 1;
  var out = [];
  for (var n=0;n<arr.length;n++) out.push(arr[(i+n) % arr.length]);
  return out.join("; ");
}

// ===================== MAIN =====================
function FindProxyForURL(url, host){
  host = lc(host);

  if (isHostInList(host, DIRECT_DOMAINS)) return "DIRECT";

  // PUBG routing
  if (isPUBG(host)) {

    if (hasAny(host, TELE_HINTS)) return sticky(host, pickRR(host, LOBBY_PROXIES));
    if (hasAny(host, CDN_HINTS))  return sticky(host, pickRR(host, LOBBY_PROXIES));
    if (hasAny(host, VOICE_HINTS)) return sticky(host, pickRR(host, VOICE_PROXIES));

    var ip = dnsIP(host);

    // -----------------------
    // LOBBY + RECRUIT: ALL JO (JO_WIDE) + allow ANYCAST
    // -----------------------
    if (hasAny(host, RECRUIT_HINTS) || hasAny(host, LOBBY_HINTS)) {
      if (isIPv4(ip)) {
        // if not JO wide AND not anycast => block
        if (!inNets(ip, JO_WIDE) && !inNets(ip, ANYCAST)) return BLOCK;
      }
      return sticky(host, pickRR(host, LOBBY_PROXIES));
    }

    // -----------------------
    // MATCH: STRONG JO ONLY
    // -----------------------
    if (hasAny(host, MATCH_HINTS)) {
      if (isIPv4(ip)) {
        if (!inNets(ip, JO_STRONG)) return BLOCK;
      }
      return sticky(host, pickRR(host, MATCH_PROXIES));
    }

    // default PUBG -> Match policy
    if (isIPv4(ip)) {
      // treat unknown PUBG host as Match path (safer)
      if (!inNets(ip, JO_STRONG)) return BLOCK;
    }
    return sticky(host, pickRR(host, MATCH_PROXIES));
  }

  // Non-PUBG default
  return pickRR(host, LOBBY_PROXIES);
}
