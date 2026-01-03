// ============================================================================
// 🇯🇴 TEAM1_UDP_PREFER_SMART
// UDP-Prefer (Voice + Game) with TCP Fast Fallback
// Hybrid Smart: Strict 60s -> Stable
// ============================================================================

// ===================== CONFIG =====================
var CFG = {
  PHASE_STRICT_SECONDS: 60,
  HARD_BLOCK_FOREIGN: true,
  STICKY_LOCK: true,
  FAIL_ONCE: true
};

// ===================== TIME =====================
var START_TS = Date.now();

// ===================== DIRECT =====================
var DIRECT_DOMAINS = [
  "github.com","raw.githubusercontent.com","gist.githubusercontent.com",
  "youtube.com","googlevideo.com","ytimg.com","youtubei.googleapis.com"
];

// ===================== BLOCK =====================
var BLOCK = "PROXY 0.0.0.0:0";

// ===================== PROXIES =====================
// ⚠️ إذا البروكسي يدعم UDP فعليًا → راح يستفيد
// إذا لا → النظام يعمل TCP تلقائيًا
var PROXY_MATCH_UDP = "PROXY 212.35.66.45:443";
var PROXY_MATCH_TCP = "PROXY 212.35.66.45:10012";

var PROXY_LOBBY = "PROXY 212.35.66.45:443";
var PROXY_VOICE_UDP = "PROXY 212.35.66.45:3478";
var PROXY_VOICE_TCP = "PROXY 212.35.66.45:443";

// ===================== UDP-PREFER PORTS =====================
var UDP_GAME_PORTS  = [443,10012,10443];
var UDP_VOICE_PORTS = [3478,3479,5349];

// ===================== HINTS =====================
var PUBG_HINTS = ["pubg","tencent","igamecj","proximabeta","gcloud","qcloud"];
var LOBBY_HINTS = ["lobby","matchmaking","team","recruit","presence"];
var MATCH_HINTS = ["match","battle","game","arena","room"];
var VOICE_HINTS = ["voice","rtc","voip","agora"];
var TELEMETRY_HINTS = ["telemetry","analytics","log","ads","report"];

// ===================== JO CIDR =====================
var JO_NETS = [
  ["176.28.0.0","255.252.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["37.202.64.0","255.255.192.0"],
  ["46.185.128.0","255.255.128.0"],
  ["212.35.64.0","255.255.224.0"]
];

// ===================== STATE =====================
var STICKY = {};
var FAILED = {};

// ===================== HELPERS =====================
function lc(s){return String(s||"").toLowerCase();}
function hasAny(h,a){for(var i=0;i<a.length;i++) if(h.indexOf(a[i])!==-1) return true; return false;}
function dnsIP(h){var ip=dnsResolve(h); return ip?ip:"";}
function isIPv4(ip){return ip && ip.indexOf(".")!==-1;}
function isJordan(ip){
  if(!isIPv4(ip)) return false;
  for(var i=0;i<JO_NETS.length;i++)
    if(isInNet(ip,JO_NETS[i][0],JO_NETS[i][1])) return true;
  return false;
}
function isPUBG(h){return hasAny(h,PUBG_HINTS);}
function strictPhase(){return (Date.now()-START_TS)<(CFG.PHASE_STRICT_SECONDS*1000);}

// ===================== MAIN =====================
function FindProxyForURL(url, host){
  host = lc(host);

  // DIRECT
  for (var i=0;i<DIRECT_DOMAINS.length;i++)
    if (host===DIRECT_DOMAINS[i] || shExpMatch(host,"*."+DIRECT_DOMAINS[i]))
      return "DIRECT";

  var port = (url.match(/:(\d+)/)||[])[1];
  port = port ? parseInt(port) : 0;

  // Telemetry isolation
  if (hasAny(host, TELEMETRY_HINTS))
    return PROXY_LOBBY;

  if (isPUBG(host)){
    var strict = strictPhase();
    var ip = dnsIP(host);

    // Strict geo lock
    if (strict && CFG.HARD_BLOCK_FOREIGN && isIPv4(ip) && !isJordan(ip)){
      FAILED[host] = true;
      return BLOCK;
    }

    // Sticky
    if (CFG.STICKY_LOCK && STICKY[host])
      return STICKY[host];

    var chosen = PROXY_MATCH_TCP;

    // 🎧 Voice: UDP Prefer
    if (hasAny(host, VOICE_HINTS) || UDP_VOICE_PORTS.indexOf(port)!==-1){
      chosen = PROXY_VOICE_UDP;
    }
    // 🎮 Match/Game: UDP Prefer
    else if (hasAny(host, MATCH_HINTS) || UDP_GAME_PORTS.indexOf(port)!==-1){
      chosen = PROXY_MATCH_UDP;
    }
    // Lobby
    else if (hasAny(host, LOBBY_HINTS)){
      chosen = PROXY_LOBBY;
    }

    STICKY[host] = chosen;
    return chosen;
  }

  return PROXY_LOBBY;
}
