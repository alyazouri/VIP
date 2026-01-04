// ============================================================================
// 🇯🇴 PUBG JO>ME MATCH TARGETS — FINAL (3x JO PROXIES FROM YOUR SCANS)
// Proxies: 77.245.9.11 / 82.212.84.33 / 46.32.102.152
// Ports used are confirmed open by your scans: 9030,10000,10012,3478,443,8443,20001,20020
// DNS (set on iPad Wi-Fi Manual):
//   212.118.1.10
//   213.139.57.100
// ============================================================================

// ===================== PROXIES (Round-Robin Chains) =====================
// Lobby: prefer 9030 then 10000 then 443/8443 (all confirmed open)
var PROXY_LOBBY = [
  "PROXY 77.245.9.11:9030",
  "PROXY 82.212.84.33:9030",
  "PROXY 46.32.102.152:9030",
  "PROXY 77.245.9.11:10000",
  "PROXY 82.212.84.33:10000",
  "PROXY 46.32.102.152:10000",
  "PROXY 77.245.9.11:443",
  "PROXY 82.212.84.33:443",
  "PROXY 46.32.102.152:443",
  "PROXY 77.245.9.11:8443",
  "PROXY 82.212.84.33:8443",
  "PROXY 46.32.102.152:8443"
].join("; ");

// Match: stable 10012 (confirmed open)
var PROXY_MATCH = [
  "PROXY 77.245.9.11:10012",
  "PROXY 82.212.84.33:10012",
  "PROXY 46.32.102.152:10012"
].join("; ");

// Voice: 3478 then 443 (confirmed open)
var PROXY_VOICE = [
  "PROXY 77.245.9.11:3478",
  "PROXY 82.212.84.33:3478",
  "PROXY 46.32.102.152:3478",
  "PROXY 77.245.9.11:443",
  "PROXY 82.212.84.33:443",
  "PROXY 46.32.102.152:443"
].join("; ");

// CDN/updates: prefer 443/8443 (confirmed open)
var PROXY_CDN = [
  "PROXY 77.245.9.11:443",
  "PROXY 82.212.84.33:443",
  "PROXY 46.32.102.152:443",
  "PROXY 77.245.9.11:8443",
  "PROXY 82.212.84.33:8443",
  "PROXY 46.32.102.152:8443"
].join("; ");

var PROXY_TELEM = PROXY_CDN;

var BLOCK = "PROXY 0.0.0.0:0";

// ===================== CFG =====================
var CFG = {
  SEARCH_PRESSURE_SECONDS: 240,
  JO_ONLY_SECONDS: 90,
  MATCH_HANDSHAKE_STRICT_SECONDS: 20,
  DNS_GUARD_SECONDS: 10,
  STICKY_LOCK: true
};

var START_TS = Date.now();

// ===================== DIRECT =====================
var DIRECT_DOMAINS = [
  "github.com","raw.githubusercontent.com","gist.githubusercontent.com",
  "youtube.com","googlevideo.com","ytimg.com","youtubei.googleapis.com"
];

// ===================== HINTS =====================
var PUBG_HINTS  = ["pubg","tencent","igamecj","proximabeta","gcloud","qcloud","qq.com"];

var RECRUIT_HINTS = [
  "teamfinder","recruit","globalrecruit","presence",
  "friends","social","clan","nearby","party","squad",
  "im","chat","message","notify","push","state","sync"
];

var SEARCH_HINTS = [
  "matchmaking","broker","gateway","dispatch","route","matchcfg",
  "region","login","auth","passport","account","token","session","connect",
  "config","cfg","setting",
  "rank","ranking","season","ladder"
];

var MATCH_HINTS = ["match","battle","game","room","arena","session","rank","zone","server"];
var VOICE_HINTS = ["voice","rtc","voip","agora","rtm"];
var CDN_HINTS   = ["cdn","update","patch","assets","resource","download","static"];
var TELE_HINTS  = ["telemetry","analytics","log","ads","report","stat"];

// ===================== JO WIDE (Lobby) =====================
var JO_WIDE = [
  ["5.45.128.0", "255.255.240.0"],
  ["37.17.192.0", "255.255.240.0"],
  ["37.123.64.0", "255.255.224.0"],
  ["37.202.64.0", "255.255.192.0"],
  ["46.23.112.0", "255.255.240.0"],
  ["46.32.96.0", "255.255.224.0"],
  ["46.185.128.0","255.255.128.0"],
  ["62.72.160.0", "255.255.224.0"],
  ["77.245.0.0",  "255.255.240.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["86.108.0.0",  "255.255.128.0"],
  ["149.200.128.0","255.255.128.0"],
  ["176.28.128.0","255.255.128.0"],
  ["176.29.0.0",  "255.255.0.0"],
  ["212.34.0.0",  "255.255.224.0"],
  ["212.35.64.0", "255.255.224.0"],
  ["217.144.0.0", "255.255.240.0"]
];

// ===================== MATCH TARGETS (JO then ME) =====================
var MATCH_TARGET_JO = [
  ["176.28.128.0","255.255.128.0"],
  ["176.29.0.0",  "255.255.0.0"],
  ["82.212.64.0", "255.255.192.0"],
  ["77.245.0.0",  "255.255.240.0"],
  ["212.35.64.0", "255.255.224.0"],
  ["46.32.96.0",  "255.255.224.0"]
];

var MATCH_TARGET_ME = [
  ["5.22.0.0",   "255.255.0.0"],
  ["5.30.0.0",   "255.254.0.0"],
  ["94.200.0.0", "255.248.0.0"],
  ["37.38.0.0",  "255.255.0.0"],
  ["82.148.0.0", "255.252.0.0"],
  ["78.40.0.0",  "255.248.0.0"]
];

// Anycast SAFE for Recruit/Search/Handshake to avoid empty or false blocks
var ANYCAST = [
  ["34.0.0.0","255.0.0.0"],
  ["35.0.0.0","255.0.0.0"],
  ["104.16.0.0","255.240.0.0"],
  ["104.24.0.0","255.240.0.0"],
  ["151.101.0.0","255.255.0.0"]
];

// ===================== iOS DNS WARMUP =====================
var DNS_WARMUP_HOSTS = [
  "igamecj.com","proximabeta.com","gcloudsdk.com","qcloud.com","tencent.com","pubgmobile.com"
];
var DNS_WARMED = false;

// ===================== STATE =====================
var STICKY = {};

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
function tSec(){ return (Date.now() - START_TS)/1000.0; }
function inSearchPressure(){ return tSec() < CFG.SEARCH_PRESSURE_SECONDS; }
function inJOOnly(){ return tSec() < CFG.JO_ONLY_SECONDS; }
function inMatchHandshake(){ return tSec() < CFG.MATCH_HANDSHAKE_STRICT_SECONDS; }
function inDNSGuard(){ return tSec() < CFG.DNS_GUARD_SECONDS; }

function sticky(host, val){
  if (CFG.STICKY_LOCK && STICKY[host]) return STICKY[host];
  STICKY[host] = val;
  return val;
}

function dnsWarmupOnce(){
  if (DNS_WARMED) return;
  for (var i=0;i<DNS_WARMUP_HOSTS.length;i++) dnsResolve(DNS_WARMUP_HOSTS[i]);
  DNS_WARMED = true;
}

// ===================== MAIN =====================
function FindProxyForURL(url, host){
  host = lc(host);

  dnsWarmupOnce();

  if (isHostInList(host, DIRECT_DOMAINS)) return "DIRECT";

  if (isPUBG(host)) {
    if (hasAny(host, TELE_HINTS)) return sticky(host, PROXY_TELEM);
    if (hasAny(host, CDN_HINTS))  return sticky(host, PROXY_CDN);
    if (hasAny(host, VOICE_HINTS)) return sticky(host, PROXY_VOICE);

    var ip = dnsIP(host);

    // 1) Recruit/Search: JO only -> JO+ME (avoid EU) during pressure window
    if (hasAny(host, RECRUIT_HINTS) || hasAny(host, SEARCH_HINTS)) {
      if (inSearchPressure() && isIPv4(ip)) {
        if (!inNets(ip, ANYCAST)) {
          if (inJOOnly()) {
            if (!inNets(ip, MATCH_TARGET_JO) && !inNets(ip, JO_WIDE)) {
              if (!inDNSGuard()) return BLOCK;
            }
          } else {
            if (!inNets(ip, MATCH_TARGET_JO) && !inNets(ip, MATCH_TARGET_ME) && !inNets(ip, JO_WIDE)) {
              if (!inDNSGuard()) return BLOCK;
            }
          }
        }
      }
      return sticky(host, PROXY_LOBBY);
    }

    // 2) Match: stable + short strict handshake to keep JO/ME bias
    if (hasAny(host, MATCH_HINTS)) {
      if (CFG.MATCH_HANDSHAKE_STRICT_SECONDS > 0 && inMatchHandshake() && isIPv4(ip)) {
        if (!inNets(ip, ANYCAST)) {
          if (!inNets(ip, MATCH_TARGET_JO) && !inNets(ip, MATCH_TARGET_ME)) {
            if (!inDNSGuard()) return BLOCK;
          }
        }
      }
      return sticky(host, PROXY_MATCH);
    }

    return sticky(host, PROXY_MATCH);
  }

  return PROXY_LOBBY;
}
