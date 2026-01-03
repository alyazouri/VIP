// ============================================================================
// 🇯🇴 TEAM1_HYBRID_JO_MAX_FAST_STABLE
// Goal: Highest JO probability + Very stable ping + Faster entry + Comfortable use
// - Phase A (first 60s): JO-STRICT for SEARCH only (blocks non-JO IPv4 + anycast)
// - Phase B (after 60s): Relaxed SEARCH (blocks anycast only)
// - MATCH: always stable 10012 (no in-game blocking)
// - Lobby: 9030/443/8443/10000
// - Voice: 3478 fallback 443
// ============================================================================

var CFG = {
  STRICT_JO_SECONDS: 60,            // أول 60 ثانية: أقوى ضغط أردني
  STRICT_SEARCH_TOTAL_SECONDS: 180, // بعد 60 ثانية -> يصير مريح لكن يبقى ذكي
  STICKY_LOCK: true
};

var START_TS = Date.now();

// ===================== DIRECT =====================
var DIRECT_DOMAINS = [
  "github.com","raw.githubusercontent.com","gist.githubusercontent.com",
  "youtube.com","googlevideo.com","ytimg.com","youtubei.googleapis.com"
];

// ===================== PROXIES =====================
var PROXY_LOBBY = "PROXY 212.35.66.45:9030; PROXY 212.35.66.45:443; PROXY 212.35.66.45:8443; PROXY 212.35.66.45:10000";
var PROXY_MATCH = "PROXY 212.35.66.45:10012";
var PROXY_VOICE = "PROXY 212.35.66.45:3478; PROXY 212.35.66.45:443";
var PROXY_CDN   = "PROXY 212.35.66.45:443; PROXY 212.35.66.45:8443";
var PROXY_TELEM = "PROXY 212.35.66.45:443";
var BLOCK       = "PROXY 0.0.0.0:0";

// ===================== HINTS =====================
var PUBG_HINTS  = ["pubg","tencent","igamecj","proximabeta","gcloud","qcloud","qq.com"];
var SEARCH_HINTS = [
  "lobby","matchmaking","teamfinder","recruit","presence","broker","gateway",
  "friends","social","clan","nearby","party","squad",
  "login","auth","passport","account","token","session","connect",
  "config","cfg","setting","region","dispatch","route","matchcfg",
  "im","chat","message","notify","push","state","sync"
];
var MATCH_HINTS = ["match","battle","game","room","arena","session","rank","zone","server"];
var VOICE_HINTS = ["voice","rtc","voip","agora","rtm"];
var CDN_HINTS   = ["cdn","update","patch","assets","resource","download","static"];
var TELE_HINTS  = ["telemetry","analytics","log","ads","report","stat"];

// ===================== JO_WIDE (قائمتك + تضييق 46.185 إلى /17) =====================
var JO_WIDE = [
  ["5.45.128.0", "255.255.240.0"],
  ["37.17.192.0", "255.255.240.0"],
  ["37.123.64.0", "255.255.224.0"],
  ["37.202.64.0", "255.255.192.0"],
  ["37.220.112.0", "255.255.240.0"],
  ["46.23.112.0", "255.255.240.0"],
  ["46.32.96.0", "255.255.224.0"],
  ["46.185.128.0", "255.255.128.0"],
  ["46.248.192.0", "255.255.224.0"],
  ["62.72.160.0", "255.255.224.0"],
  ["77.245.0.0", "255.255.240.0"],
  ["79.134.128.0", "255.255.224.0"],
  ["79.173.192.0", "255.255.192.0"],
  ["80.90.160.0", "255.255.240.0"],
  ["81.21.0.0", "255.255.240.0"],
  ["81.28.112.0", "255.255.240.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["84.18.32.0", "255.255.224.0"],
  ["84.18.64.0", "255.255.224.0"],
  ["86.108.0.0", "255.255.128.0"],
  ["91.106.96.0", "255.255.240.0"],
  ["91.186.224.0", "255.255.224.0"],
  ["92.241.32.0", "255.255.224.0"],
  ["92.253.0.0", "255.255.128.0"],
  ["94.142.32.0", "255.255.224.0"],
  ["94.249.0.0", "255.255.128.0"],
  ["95.141.208.0", "255.255.240.0"],
  ["95.172.192.0", "255.255.224.0"],
  ["109.107.224.0", "255.255.224.0"],
  ["109.237.192.0", "255.255.240.0"],
  ["149.200.128.0", "255.255.128.0"],
  ["176.28.128.0", "255.255.128.0"],
  ["176.29.0.0", "255.255.0.0"],
  ["176.57.0.0", "255.255.224.0"],
  ["178.77.128.0", "255.255.192.0"],
  ["178.238.176.0", "255.255.240.0"],
  ["188.123.160.0", "255.255.224.0"],
  ["188.247.64.0", "255.255.224.0"],
  ["193.188.64.0", "255.255.224.0"],
  ["194.165.128.0", "255.255.224.0"],
  ["212.34.0.0", "255.255.224.0"],
  ["212.35.64.0", "255.255.224.0"],
  ["212.118.0.0", "255.255.224.0"],
  ["213.139.32.0", "255.255.224.0"],
  ["213.186.160.0", "255.255.224.0"],
  ["217.23.32.0", "255.255.240.0"],
  ["217.29.240.0", "255.255.240.0"],
  ["217.144.0.0", "255.255.240.0"]
];

// ===================== JO_MICRO (الجيم فقط) =====================
var JO_MICRO = [
  ["212.35.64.0", "255.255.224.0"],
  ["176.28.0.0",  "255.252.0.0"],
  ["176.29.0.0",  "255.255.0.0"]
];

// Anycast traps (Search only)
var ANYCAST = [
  ["34.0.0.0","255.0.0.0"],
  ["35.0.0.0","255.0.0.0"],
  ["104.16.0.0","255.240.0.0"],
  ["104.24.0.0","255.240.0.0"],
  ["151.101.0.0","255.255.0.0"]
];

// ===================== STATE =====================
var STICKY = {};

// ===================== HELPERS =====================
function lc(s){ return String(s||"").toLowerCase(); }
function hasAny(h, arr){ h=lc(h); for (var i=0;i<arr.length;i++) if (h.indexOf(arr[i])!==-1) return true; return false; }
function isHostInList(h, arr){ for (var i=0;i<arr.length;i++) if (h===arr[i] || shExpMatch(h,"*."+arr[i])) return true; return false; }
function dnsIP(h){ var ip=dnsResolve(h); return ip?ip:""; } // IPv6-Prefer: إذا ما رجع IPv4 -> ""
function isIPv4(ip){ return ip && ip.indexOf(".")!==-1 && ip.split(".").length===4; }
function inNets(ip, nets){
  if(!isIPv4(ip)) return false;
  for(var i=0;i<nets.length;i++) if(isInNet(ip, nets[i][0], nets[i][1])) return true;
  return false;
}
function isPUBG(h){ h=lc(h); return hasAny(h, PUBG_HINTS) || shExpMatch(h,"*pubg*"); }

function tSec(){ return (Date.now() - START_TS) / 1000.0; }
function inStrictJOPhase(){ return tSec() < CFG.STRICT_JO_SECONDS; }
function inStrictSearchTotal(){ return tSec() < CFG.STRICT_SEARCH_TOTAL_SECONDS; }

// ===================== MAIN =====================
function FindProxyForURL(url, host){
  host = lc(host);

  if (isHostInList(host, DIRECT_DOMAINS)) return "DIRECT";
  if (hasAny(host, TELE_HINTS)) return PROXY_TELEM;

  if (isPUBG(host)) {
    if (hasAny(host, CDN_HINTS)) return PROXY_CDN;
    if (hasAny(host, VOICE_HINTS)) return PROXY_VOICE;

    var isSearch = hasAny(host, SEARCH_HINTS);
    var isMatch  = hasAny(host, MATCH_HINTS);
    var ip = dnsIP(host);

    // ===== SEARCH (Hybrid) =====
    if (isSearch) {
      // فقط أثناء نافذة البحث (180s): نمنع Anycast traps إن كان IPv4
      if (inStrictSearchTotal() && isIPv4(ip)) {
        if (inNets(ip, ANYCAST)) return BLOCK;

        // أول 60s: JO-STRICT (أقوى احتمال أردني) — لكن فقط على IPv4 لتجنب مشاكل IPv6
        if (inStrictJOPhase()) {
          if (!inNets(ip, JO_WIDE)) return BLOCK;
        }
      }
      if (CFG.STICKY_LOCK && STICKY[host]) return STICKY[host];
      STICKY[host] = PROXY_LOBBY;
      return PROXY_LOBBY;
    }

    // ===== MATCH (always stable) =====
    if (isMatch) {
      if (CFG.STICKY_LOCK && STICKY[host]) return STICKY[host];
      STICKY[host] = PROXY_MATCH; // ثابت 10012
      return PROXY_MATCH;
    }

    // Default PUBG -> Match stable
    if (CFG.STICKY_LOCK && STICKY[host]) return STICKY[host];
    STICKY[host] = PROXY_MATCH;
    return PROXY_MATCH;
  }

  return PROXY_LOBBY;
}
