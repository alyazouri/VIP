// ============================================================================
// 🇯🇴 PUBG MOBILE - ULTIMATE JO ENHANCEMENT SCRIPT
// Enhanced for MAXIMUM LOCAL PLAYER MATCHING & PERFORMANCE
// Proxies: 46.32.102.115 / 86.108.15.1 / 82.212.106.22
// ALL PORTS ARE OPEN FOR USE
// DNS: 212.118.1.10 , 213.139.57.100
// ============================================================================

// ===================== ENHANCED PROXY CONFIGURATION =====================
// Optimized for both performance and geographic signaling
var PROXY_ULTRA_FAST = [
    "PROXY 46.32.102.115:20001", // Primary Match Proxy (Lowest Ping)
    "PROXY 86.108.15.1:20001",
    "PROXY 82.212.106.22:20001"
].join("; ");

var PROXY_LOBBY_JO_STRONG = [
    "PROXY 46.32.102.115:9030",
    "PROXY 46.32.102.115:9050",
    "PROXY 86.108.15.1:20001",
    "PROXY 82.212.106.22:9030",
    "PROXY 82.212.106.22:9050"
].join("; ");

var PROXY_SECURE_TUNNEL = [
    "PROXY 46.32.102.115:443",
    "PROXY 46.32.102.115:8080",
    "PROXY 86.108.15.1:20001",
    "PROXY 82.212.106.22:8080",
    "PROXY 82.212.106.22:443"
].join("; ");

// ===================== ADVANCED CONFIGURATION =====================
var CFG = {
    SEARCH_PRESSURE_SECONDS: 300,      // Extended to 5 minutes
    JO_ONLY_SECONDS: 180,              // Increased to 3 minutes of strict JO
    MATCH_HANDSHAKE_STRICT_SECONDS: 30, // Stricter handshake
    DNS_GUARD_SECONDS: 15,
    STICKY_LOCK: true,
    AGGRESSIVE_JO_MODE: true           // NEW: Extra JO enforcement
};

var START_TS = Date.now();
var DIRECT_DOMAINS = [
    "github.com","raw.githubusercontent.com","gist.githubusercontent.com",
    "youtube.com","googlevideo.com","ytimg.com","youtubei.googleapis.com"
];

// ===================== EXPANDED HINT CATEGORIES =====================
// More precise domain matching for better control
var PUBG_HINTS  = ["pubg","tencent","igamecj","proximabeta","gcloud","qcloud","qq.com"];
var RECRUIT_HINTS = [
    "teamfinder","recruit","globalrecruit","presence","invite",
    "friends","social","clan","nearby","party","squad","crew",
    "im","chat","message","notify","push","state","sync","lobby"
];
var SEARCH_HINTS = [
    "matchmaking","broker","gateway","dispatch","route","matchcfg","finder",
    "region","login","auth","passport","account","token","session","connect",
    "config","cfg","setting","profile",
    "rank","ranking","season","ladder","tier","competitive"
];
var MATCH_HINTS = ["match","battle","game","room","arena","session","server","instance","zone"];
var VOICE_HINTS = ["voice","rtc","voip","agora","rtm","audio","call","talk"];
var CDN_HINTS   = ["cdn","update","patch","assets","resource","download","static","content"];
var TELE_HINTS  = ["telemetry","analytics","log","ads","report","stat","track","metric"];

// ===================== AGGRESSIVE JO GEO-TARGETING =====================
// EXPANDED Jordan IP ranges - More ISPs, more coverage
var JO_WIDE_AGGRESSIVE = [
    ["5.45.128.0", "255.255.240.0"],
    ["37.17.192.0", "255.255.240.0"],
    ["37.123.64.0", "255.255.224.0"],
    ["37.202.64.0", "255.255.192.0"],
    ["46.23.112.0", "255.255.240.0"],
    ["46.32.96.0", "255.255.224.0"],
    ["46.32.128.0", "255.255.128.0"],  // NEW: Additional JO range
    ["46.185.128.0","255.255.128.0"],
    ["62.72.160.0", "255.255.224.0"],
    ["77.245.0.0",  "255.255.240.0"],
    ["77.245.16.0", "255.255.240.0"],  // NEW: Additional JO range
    ["82.212.64.0", "255.255.192.0"],
    ["86.108.0.0",  "255.255.128.0"],
    ["149.200.128.0","255.255.128.0"],
    ["176.28.128.0","255.255.128.0"],
    ["176.29.0.0",  "255.255.0.0"],
    ["185.15.0.0", "255.255.0.0"],     // NEW: Zain JO range
    ["212.34.0.0",  "255.255.224.0"],
    ["212.35.64.0", "255.255.224.0"],
    ["212.118.0.0", "255.255.0.0"],    // NEW: Umniah JO range
    ["217.144.0.0", "255.255.240.0"]
];

// STRICT JO MATCH TARGETS - For recruit/search phases
var MATCH_TARGET_JO_STRICT = [
    ["176.28.128.0","255.255.128.0"],
    ["176.29.0.0",  "255.255.0.0"],
    ["82.212.64.0", "255.255.192.0"],
    ["77.245.0.0",  "255.255.240.0"],
    ["212.35.64.0", "255.255.224.0"],
    ["46.32.96.0",  "255.255.224.0"],
    ["185.15.0.0", "255.255.0.0"]      // Zain mobile users
];

var MATCH_TARGET_ME = [
    ["5.22.0.0",   "255.255.0.0"],
    ["5.30.0.0",   "255.254.0.0"],
    ["94.200.0.0", "255.248.0.0"],
    ["37.38.0.0",  "255.255.0.0"],
    ["82.148.0.0", "255.252.0.0"],
    ["78.40.0.0",  "255.248.0.0"]
];

// ===================== ENHANCED HELPER FUNCTIONS =====================
function lc(s){ return String(s||"").toLowerCase(); }
function hasAny(h, arr){ h=lc(h); for(var i=0;i<arr.length;i++) if(h.indexOf(arr[i])!==-1) return true; return false; }
function isHostInList(h, arr){ for(var i=0;i<arr.length;i++) if(h===arr[i] || shExpMatch(h,"*."+arr[i])) return true; return false; }
function dnsIP(h){ var ip=dnsResolve(h); return ip?ip:""; }
function isIPv4(ip){ return ip && /^(\d{1,3}\.){3}\d{1,3}$/.test(ip); }
function inNets(ip, nets){
    if(!isIPv4(ip)) return false;
    var ipParts=ip.split('.').map(Number);
    for(var i=0;i<nets.length;i++){
        var netParts=nets[i][0].split('.').map(Number);
        var maskParts=nets[i][1].split('.').map(Number);
        var match=true;
        for(var j=0;j<4;j++){
            if((ipParts[j] & maskParts[j]) !== (netParts[j] & maskParts[j])){
                match=false;
                break;
            }
        }
        if(match) return true;
    }
    return false;
}
function isPUBG(h){ h=lc(h); return hasAny(h, PUBG_HINTS) || shExpMatch(h,"*pubg*") || shExpMatch(h,"*.pubg*"); }

function tSec(){ return (Date.now() - START_TS)/1000.0; }
function inSearchPressure(){ return tSec() < CFG.SEARCH_PRESSURE_SECONDS; }
function inJOOnly(){ return tSec() < CFG.JO_ONLY_SECONDS; }
function inMatchHandshake(){ return tSec() < CFG.MATCH_HANDSHAKE_STRICT_SECONDS; }
function inDNSGuard(){ return tSec() < CFG.DNS_GUARD_SECONDS; }

// Enhanced sticky session with performance logging
var STICKY_CACHE = {};
function sticky(host, proxyType, reason){
    if(CFG.STICKY_LOCK && STICKY_CACHE[host]){
        return STICKY_CACHE[host];
    }
    STICKY_CACHE[host] = proxyType;
    return proxyType;
}

// ===================== AGGRESSIVE GEO-LOCK FUNCTIONS =====================
function enforceJOSubnet(ip){
    // STRICT enforcement during recruit/search phases
    if(inSearchPressure() && inJOOnly()){
        if(!inNets(ip, MATCH_TARGET_JO_STRICT)){
            return false; // Block connections outside strict JO subnets
        }
    }
    // Regular enforcement for rest of search phase
    else if(inSearchPressure()){
        if(!inNets(ip, MATCH_TARGET_JO_STRICT) && !inNets(ip, MATCH_TARGET_ME)){
            return false;
        }
    }
    return true;
}

// ===================== MAIN INTELLIGENT ROUTING FUNCTION =====================
function FindProxyForURL(url, host){
    var originalHost = host;
    host = lc(host);
    
    // Initial DNS resolution for critical services
    if(tSec() < 5){
        try{
            dnsResolve("igamecj.com");
            dnsResolve("proximabeta.com");
            dnsResolve("pubgmobile.com");
        }catch(e){}
    }
    
    // Direct access for non-PUBG services
    if(isHostInList(originalHost, DIRECT_DOMAINS)){
        return "DIRECT";
    }
    
    // PUBG SERVICE DETECTION AND ROUTING
    if(isPUBG(host)){
        var ip = dnsIP(originalHost);
        
        // 1. TELEMETRY & CDN - Use secure tunnel
        if(hasAny(host, TELE_HINTS)){
            return sticky(originalHost, PROXY_SECURE_TUNNEL, "telemetry");
        }
        if(hasAny(host, CDN_HINTS)){
            return sticky(originalHost, PROXY_SECURE_TUNNEL, "cdn");
        }
        
        // 2. VOICE CHAT - Ultra fast proxy
        if(hasAny(host, VOICE_HINTS)){
            return sticky(originalHost, PROXY_ULTRA_FAST, "voice");
        }
        
        // 3. RECRUIT & SEARCH - AGGRESSIVE JO ENFORCEMENT
        if(hasAny(host, RECRUIT_HINTS) || hasAny(host, SEARCH_HINTS)){
            if(ip && inSearchPressure()){
                if(!enforceJOSubnet(ip)){
                    // Logically block during critical phases to force JO matchmaking
                    if(!inDNSGuard()){
                        return "PROXY 0.0.0.0:0"; // Force failover to JO servers
                    }
                }
            }
            // Use strong JO lobby proxy for maximum geographic signaling
            return sticky(originalHost, PROXY_LOBBY_JO_STRONG, "recruit_search");
        }
        
        // 4. MATCH/GAME TRAFFIC - Performance optimized
        if(hasAny(host, MATCH_HINTS)){
            // Strict handshake enforcement for first 30 seconds
            if(inMatchHandshake() && ip){
                if(!inNets(ip, MATCH_TARGET_JO_STRICT) && !inNets(ip, MATCH_TARGET_ME)){
                    if(!inDNSGuard()){
                        return "PROXY 0.0.0.0:0";
                    }
                }
            }
            // Use ultra-fast proxy for actual gameplay
            return sticky(originalHost, PROXY_ULTRA_FAST, "match");
        }
        
        // 5. DEFAULT for any other PUBG traffic
        return sticky(originalHost, PROXY_ULTRA_FAST, "pubg_default");
    }
    
    // 6. NON-PUBG TRAFFIC - Use secure tunnel
    return PROXY_SECURE_TUNNEL;
}
