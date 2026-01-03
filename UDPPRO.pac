// ============================================================================
// 🇯🇴 TEAM1_FINAL — SEARCH WIDE (Expanded Lobby) + MATCH MICRO (Stable Low Ping)
// - Lobby/Search: Expanded scope + JO-preferred (blocks only Anycast traps during strict window)
// - Match/In-game: Micro stable path (single port 10012) for lowest jitter
// - Voice: 3478 (fallback 443)
// - CDN/Updates: 443/8443 (isolated from match)
// Ports are open on 212.35.66.45 per your scan.  [oai_citation:0‡Port Scan.pdf](sediment://file_00000000177471fd8cf5db29f28acfa8)
// ============================================================================

var CFG = {
  STRICT_SEARCH_SECONDS: 180,          // توسعة/تشدد البحث فقط (زيد/نقص حسب رغبتك)
  BLOCK_ANYCAST_IN_SEARCH: true,       // احظر فخاخ Anycast فقط في البحث
  STICKY_LOCK: true                   // تثبيت المسار لكل host
};

var START_TS = Date.now();

// ===================== DIRECT EXCEPTIONS =====================
var DIRECT_DOMAINS = [
  "github.com","raw.githubusercontent.com","gist.githubusercontent.com",
  "youtube.com","googlevideo.com","ytimg.com","youtubei.googleapis.com"
];

// ===================== PROXIES (Fast/Stable Ports) =====================
// Lobby: توسعة + عدة منافذ سريعة
var PROXY_LOBBY = "PROXY 212.35.66.45:9030; PROXY 212.35.66.45:443; PROXY 212.35.66.45:8443; PROXY 212.35.66.45:10000";
// Match: قناة واحدة ثابتة (أقل jitter)
var PROXY_MATCH = "PROXY 212.35.66.45:10012";
// Voice: prefer RTC port
var PROXY_VOICE = "PROXY 212.35.66.45:3478; PROXY 212.35.66.45:443";
// CDN/Updates: isolate heavy downloads
var PROXY_CDN   = "PROXY 212.35.66.45:443; PROXY 212.35.66.45:8443";
// Telemetry: keep away from match
var PROXY_TELEM = "PROXY 212.35.66.45:443";

var BLOCK = "PROXY 0.0.0.0:0";

// ===================== HINTS =====================
var PUBG_HINTS  = ["pubg","tencent","igamecj","proximabeta","gcloud","qcloud","qq.com"];

var SEARCH_HINTS = [
  // Lobby/Matchmaking/Presence
  "lobby","matchmaking","teamfinder","recruit","presence","broker","gateway",
  "friends","social","clan","nearby","party","squad",
  // Login/Auth/Config/Region/Dispatch (توسعة اللوبي)
  "login","auth","passport","account","token","session","connect",
  "config","cfg","setting","region","dispatch","route","matchcfg",
  // Realtime/IM/Notify
  "im","chat","message","notify","push","state","sync"
];

var MATCH_HINTS = ["match","battle","game","room","arena","session","rank","zone","server"];
var VOICE_HINTS = ["voice","rtc","voip","agora","rtm"];
var CDN_HINTS   = ["cdn","update","patch","assets","resource","download","static"];
var TELE_HINTS  = ["telemetry","analytics","log","ads","report","stat"];

// ===================== JO LISTS =====================
// WIDE for search (افتحها أكثر بإضافة شبكات الأردن اللي عندك بنفس الصيغة)
var JO_WIDE = [
  ["176.28.0.0","255.252.0.0"],   // /14
  ["176.29.0.0","255.255.0.0"],   // /16
  ["176.30.0.0","255.254.0.0"],   // /15
  ["46.185.128.0","255.255.128.0"], // /17
  ["37.202.64.0","255.255.192.0"],  // /18
  ["212.35.64.0","255.255.224.0"],  // /19
  ["188.247.64.0","255.255.224.0"]  // /19
];

// MICRO for in-game stability
var JO_MICRO = [
  ["212.35.64.0","255.255.224.0"],
  ["176.28.0.0","255.252.0.0"]
];

// Anycast/Europe-trap ranges (blocking only during search)
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

function hasAny(h, arr){
  h = lc(h);
  for (var i=0;i<arr.length;i++) if (h.indexOf(arr[i]) !== -1) return true;
  return false;
}

function isHostInList(host, arr){
  for (var i=0;i<arr.length;i++){
    if (host === arr[i] || shExpMatch(host,"*."+arr[i])) return true;
  }
  return false;
}

function dnsIP(h){
  var ip = dnsResolve(h);
  return ip ? ip : "";
}

function isIPv4(ip){
  return ip && ip.indexOf(".") !== -1 && ip.split(".").length === 4;
}

function inNets(ip, nets){
  if (!isIPv4(ip)) return false;
  for (var i=0;i<nets.length;i++){
    if (isInNet(ip, nets[i][0], nets[i][1])) return true;
  }
  return false;
}

function strictSearchPhase(){
  return (Date.now() - START_TS) < (CFG.STRICT_SEARCH_SECONDS * 1000);
}

function isPUBG(host){
  host = lc(host);
  if (hasAny(host, PUBG_HINTS)) return true;
  if (shExpMatch(host,"*pubg*")) return true;
  return false;
}

// ===================== MAIN =====================
function FindProxyForURL(url, host){
  host = lc(host);

  // DIRECT: YouTube/GitHub
  if (isHostInList(host, DIRECT_DOMAINS)) return "DIRECT";

  // Telemetry isolation
  if (hasAny(host, TELE_HINTS)) return PROXY_TELEM;

  if (isPUBG(host)) {

    // Heavy CDN/Updates isolated
    if (hasAny(host, CDN_HINTS)) return PROXY_CDN;

    // Voice isolated
    if (hasAny(host, VOICE_HINTS)) return PROXY_VOICE;

    var isSearch = hasAny(host, SEARCH_HINTS);
    var isMatch  = hasAny(host, MATCH_HINTS);

    var ip = dnsIP(host);

    // ===== SEARCH WIDE: JO-preferred + Anycast trap block (only during strict window) =====
    if (isSearch) {
      if (strictSearchPhase() && CFG.BLOCK_ANYCAST_IN_SEARCH && isIPv4(ip)) {
        // Block only obvious anycast traps (common Europe pull)
        if (inNets(ip, ANYCAST)) return BLOCK;
        // Do NOT hard-block non-JO here — توسعة اللوبي (JO preferred via proxy)
        // If you want slightly stricter: uncomment next line
        // if (!inNets(ip, JO_WIDE)) return BLOCK;
      }

      if (CFG.STICKY_LOCK && STICKY[host]) return STICKY[host];
      STICKY[host] = PROXY_LOBBY;
      return PROXY_LOBBY;
    }

    // ===== MATCH MICRO: stable path, no blocking =====
    if (isMatch) {
      if (CFG.STICKY_LOCK && STICKY[host]) return STICKY[host];

      // Even if IP not in JO_MICRO, never block in-game. Keep stable match channel.
      STICKY[host] = PROXY_MATCH;
      return PROXY_MATCH;
    }

    // Default PUBG -> Match stable
    if (CFG.STICKY_LOCK && STICKY[host]) return STICKY[host];
    STICKY[host] = PROXY_MATCH;
    return PROXY_MATCH;
  }

  // Non-PUBG -> Lobby proxy
  return PROXY_LOBBY;
}
