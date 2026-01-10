// ========================== CONFIGURATION ==========================
var CONFIG = {
    jordan: {
        primary: [
            { proxy: "PROXY 82.212.84.33:20001", weight: 10, tier: 1 },
            { proxy: "PROXY 82.212.84.34:20001", weight: 10, tier: 1 },
            { proxy: "PROXY 212.35.66.45:20001", weight: 9, tier: 1 },
            { proxy: "PROXY 212.35.66.46:20001", weight: 9, tier: 1 },
            { proxy: "PROXY 86.108.78.12:20001", weight: 8, tier: 2 }
        ],
        lobby: [
            { proxy: "PROXY 82.212.84.33:9030", weight: 10 },
            { proxy: "PROXY 212.35.66.45:9030", weight: 9 },
            { proxy: "PROXY 86.108.78.12:9030", weight: 8 }
        ],
        voice: [
            { proxy: "PROXY 82.212.84.33:10012", weight: 10 },
            { proxy: "PROXY 212.35.66.45:10012", weight: 9 }
        ],
        critical: [
            { proxy: "PROXY 82.212.84.33:8081", weight: 10 },
            { proxy: "PROXY 82.212.84.33:4433", weight: 10 }
        ]
    },

    gulf: [
        { proxy: "PROXY 185.125.190.10:20001", weight: 10 },
        { proxy: "PROXY 5.62.61.100:20001", weight: 9 },
        { proxy: "PROXY 212.71.234.50:20001", weight: 8 }
    ],

    block: "PROXY 127.0.0.1:9",

    thresholds: {
        min_score: 30,
        max_fails: 5,
        match_timeout: 1800000,
        dns_ttl: 300000,
        health_check_interval: 60000
    }
};

// ========================== DOMAINS ==========================
var PUBG_DOMAINS = [
    "pubgmobile.com",
    "pubgmobile.net",
    "proximabeta.com",
    "intlgame.com",
    "tencent.com",
    "qcloud.com",
    "gcloudcs.com",
    "igamecj.com",
    "lightspeedstudio.com",
    "krafton.com"
];

var JAWAKER_DOMAINS = [
    "jawaker.com",
    "jawakerapp.com",
    "jawakercdn.com",
    "jwkr.net"
];

// ========================== STATE MANAGEMENT ==========================
var STATE = {
    session_id: null,
    player_hash: null,
    match_proxy: null,
    match_locked: false,
    match_start_time: 0,
    match_host_pattern: null,
    dns_cache: {},
    proxy_stats: {},
    rtt_samples: {},
    request_count: 0,
    last_lobby_time: 0,
    last_match_time: 0,
    blacklisted_proxies: {}
};

// ========================== GEO DATABASE ==========================
var GEO = {
    jordan_core: {
        "82.212.": { latency: 12 },
        "212.35.": { latency: 15 },
        "86.108.": { latency: 18 }
    },
    jordan_extended: {
        "176.29.":1,"91.106.":1,"188.247.":1,"78.135.":1,"78.138.":1,
        "78.139.":1,"37.202.":1,"37.238.":1,"79.134.":1,"79.173.":1,
        "62.72.":1,"62.150.":1,"62.251.":1,"46.185.":1,"92.253.":1,
        "94.249.":1,"149.200.":1
    },
    gulf: {
        "185.125.":1,"46.183.":1,"212.71.":1,"5.62.":1
    },
    anycast: {
        "13.":1,"15.":1,"18.":1,"52.":1,"54.":1,"104.":1,"172.":1
    },
    block: {
        "45.":1,"103.":1,"195.":1
    }
};

// ========================== UTILITIES ==========================
function now(){ return Date.now(); }

function startsWith(ip, table){
    for (var p in table){
        if (ip.indexOf(p) === 0) return table[p];
    }
    return false;
}

function hash(str){
    var h = 0;
    for (var i=0;i<str.length;i++){
        h = ((h<<5)-h)+str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h)>>>0;
}

function initSession(){
    if(!STATE.session_id){
        STATE.session_id = now().toString(36)+Math.random().toString(36).substr(2);
        STATE.player_hash = hash(STATE.session_id);
    }
}

function hostMatches(host, list){
    for (var i=0;i<list.length;i++){
        if (host === list[i] || host.endsWith("." + list[i])) return true;
    }
    return false;
}

// ========================== DNS ==========================
function resolve(host){
    var c = STATE.dns_cache[host];
    if(c && (now()-c.time < CONFIG.thresholds.dns_ttl)) return c.ip;
    try{
        var ip = dnsResolve(host);
        if(ip){
            STATE.dns_cache[host] = { ip: ip, time: now() };
            return ip;
        }
    }catch(e){}
    return null;
}

// ========================== TRAFFIC CLASSIFICATION ==========================
function isLobby(url){ return /lobby|matchmaking|party|invite|room|table|join|sit|social/i.test(url); }
function isMatch(url){ return /game|battle|session|match|round|play|turn|zone/i.test(url); }
function isVoice(url){ return /voice|rtc|webrtc|voip|audio/i.test(url); }
function isTelemetry(url){ return /telemetry|analytic|metric|beacon|track|log/i.test(url); }
function isDownload(url){ return /download|update|patch|cdn|asset/i.test(url); }

// ========================== PROXY HELPERS ==========================
function buildProxyChain(arr, fallback){
    var out=[];
    for(var i=0;i<arr.length;i++) out.push(arr[i].proxy);
    if(fallback) out.push(fallback);
    return out.join("; ");
}

function buildHashRing(){
    var ring=[], p=CONFIG.jordan.primary;
    var step=Math.floor(4294967296/p.length);
    for(var i=0;i<p.length;i++){
        ring.push({pos:i*step, proxy:p[i].proxy});
    }
    return ring;
}
var HASH_RING = buildHashRing();

function consistentProxy(){
    for(var i=0;i<HASH_RING.length;i++){
        if(STATE.player_hash <= HASH_RING[i].pos) return HASH_RING[i].proxy;
    }
    return HASH_RING[0].proxy;
}

// ========================== MAIN ==========================
function FindProxyForURL(url, host){
    host = host.toLowerCase();
    url  = url.toLowerCase();
    initSession();
    STATE.request_count++;

    var isPUBG   = hostMatches(host, PUBG_DOMAINS);
    var isJawaker= hostMatches(host, JAWAKER_DOMAINS);

    if(!isPUBG && !isJawaker) return "DIRECT";
    if(isTelemetry(url)) return CONFIG.block;

    var ip = resolve(host);
    if(!ip || startsWith(ip, GEO.block)) return CONFIG.block;

    var is_jordan_core = startsWith(ip, GEO.jordan_core);
    var is_jordan = is_jordan_core || startsWith(ip, GEO.jordan_extended);

    // ================= JAWAKER =================
    if(isJawaker){
        if(isLobby(url)){
            if(!STATE.match_locked){
                STATE.match_proxy = consistentProxy();
                STATE.match_locked = true;
                STATE.match_start_time = now();
            }
            return buildProxyChain(CONFIG.jordan.lobby, STATE.match_proxy);
        }
        if(isMatch(url)){
            if(!STATE.match_locked){
                STATE.match_proxy = consistentProxy();
                STATE.match_locked = true;
                STATE.match_start_time = now();
            }
            return STATE.match_proxy;
        }
        return buildProxyChain(CONFIG.jordan.primary);
    }

    // ================= PUBG =================
    if(isVoice(url)){
        if(is_jordan) return buildProxyChain(CONFIG.jordan.voice);
        return "DIRECT";
    }

    if(isLobby(url)){
        if(!STATE.match_locked && is_jordan_core){
            STATE.match_proxy = consistentProxy();
            STATE.match_locked = true;
            STATE.match_start_time = now();
        }
        if(is_jordan) return buildProxyChain(CONFIG.jordan.lobby, buildProxyChain(CONFIG.jordan.primary));
        return CONFIG.block;
    }

    if(isMatch(url)){
        if(!is_jordan_core) return CONFIG.block;
        if(!STATE.match_locked){
            STATE.match_proxy = consistentProxy();
            STATE.match_locked = true;
            STATE.match_start_time = now();
        }
        return STATE.match_proxy + "; " + buildProxyChain(CONFIG.jordan.critical);
    }

    if(isDownload(url)) return "DIRECT";
    if(is_jordan) return buildProxyChain(CONFIG.jordan.primary);
    return CONFIG.block;
}
