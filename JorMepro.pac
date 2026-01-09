// ============================================================================
// PUBG MOBILE – GOLDEN SCRIPT v4.2 FINAL (CORRECTED & COMPLETE)
// iOS / iPadOS SAFE • FULL INTELLIGENCE • NO INTERNET DROP
// ============================================================================

// ========================== CONFIGURATION ==========================

var CONFIG = {
    jordan: {
        primary: [
            "PROXY 82.212.84.33:20001",
            "PROXY 82.212.84.34:20001",
            "PROXY 212.35.66.45:20001",
            "PROXY 212.35.66.46:20001",
            "PROXY 86.108.78.12:20001"
        ],
        lobby: [
            "PROXY 82.212.84.33:9030",
            "PROXY 212.35.66.45:9030",
            "PROXY 86.108.78.12:9030"
        ],
        voice: [
            "PROXY 82.212.84.33:10012",
            "PROXY 212.35.66.45:10012"
        ],
        critical: [
            "PROXY 82.212.84.33:8081",
            "PROXY 82.212.84.33:4433"
        ]
    },

    gulf: [
        "PROXY 185.125.190.10:20001",
        "PROXY 5.62.61.100:20001",
        "PROXY 212.71.234.50:20001"
    ],

    block: "PROXY 127.0.0.1:9"
};

// ========================== STATE ==========================

var STATE = {
    session_id: null,
    player_hash: null,

    match_proxy: null,
    match_locked: false,

    ip_cache: {},

    rtt: [],
    success: {},
    fail: {},

    request_count: 0,
    last_lobby_time: 0
};

// ========================== GEO DATABASE ==========================

var GEO = {
    jordan_core: {
        "82.212.": { latency: 12 },
        "212.35.": { latency: 15 },
        "86.108.": { latency: 18 }
    },

    jordan_extended: {
        "176.29.":1,"91.106.":1,"188.247.":1,
        "78.135.":1,"78.138.":1,"78.139.":1,
        "37.202.":1,"37.238.":1,
        "79.134.":1,"79.173.":1,
        "62.72.":1,"62.150.":1,"62.251.":1,
        "46.185.":1,"92.253.":1,"94.249.":1,
        "149.200.":1
    },

    gulf: {
        "185.125.":1,"46.183.":1,"212.71.":1,
        "5.62.":1,"31.192.":1,"86.96.":1,
        "62.84.":1,"82.178.":1
    },

    anycast: {
        "13.":1,"15.":1,"18.":1,"52.":1,"54.":1,
        "104.":1,"172.":1
    },

    block: {
        "58.147.":1,"59.153.":1,"61.5.":1,
        "91.109.":1,"103.":1,"45.":1,
        "39.32.":1,"111.68.":1,
        "195.":1,"185.2.":1
    }
};

// ========================== UTILITIES ==========================

function startsWith(ip, table) {
    for (var p in table) {
        if (ip.indexOf(p) === 0) return table[p];
    }
    return false;
}

function hash(str) {
    var h = 0;
    for (var i = 0; i < str.length; i++) {
        h = ((h << 5) - h) + str.charCodeAt(i);
        h |= 0;
    }
    return Math.abs(h);
}

function resolve(host) {
    if (STATE.ip_cache[host]) return STATE.ip_cache[host];
    try {
        var ip = dnsResolve(host);
        if (ip && ip !== "127.0.0.1") {
            STATE.ip_cache[host] = ip;
            return ip;
        }
    } catch (e) {}
    return null;
}

// ========================== SESSION ==========================

function initSession() {
    if (!STATE.session_id) {
        STATE.session_id = Date.now().toString(36) + Math.random().toString(36);
        STATE.player_hash = hash(STATE.session_id);
    }
}

// ========================== PERFORMANCE ==========================

function recordRTT(v) {
    STATE.rtt.push(v);
    if (STATE.rtt.length > 20) STATE.rtt.shift();
}

function avgRTT() {
    if (!STATE.rtt.length) return 20;
    var s = 0;
    for (var i = 0; i < STATE.rtt.length; i++) s += STATE.rtt[i];
    return s / STATE.rtt.length;
}

function success(p) {
    STATE.success[p] = (STATE.success[p] || 0) + 1;
}

function fail(p) {
    STATE.fail[p] = (STATE.fail[p] || 0) + 1;
}

function score(p) {
    var s = STATE.success[p] || 0;
    var f = STATE.fail[p] || 0;
    if (s + f === 0) return 50;
    return Math.floor((s / (s + f)) * 100);
}

// ========================== RTT ESTIMATION ==========================

function estimateRTT(ip) {
    var j = startsWith(ip, GEO.jordan_core);
    if (j && j.latency) return j.latency;
    if (startsWith(ip, GEO.jordan_extended)) return 25;
    if (startsWith(ip, GEO.gulf)) return 40;
    if (startsWith(ip, GEO.anycast)) return 30;
    return 100;
}

// ========================== TRAFFIC CLASS ==========================

function isPUBG(h){return /pubg|pubgm|tencent|krafton|lightspeed|intlgame|qcloud|gcloud|proximabeta/.test(h);}
function isLobby(u,h){return /lobby|matchmaking|recruit|team|party|invite|social/i.test(u+h);}
function isMatch(u,h){return /game|battle|session|zone|fight|combat|gs\d+/i.test(u+h);}
function isVoice(u,h){return /voice|rtc|webrtc|voip|audio/i.test(u+h);}
function isCritical(u,h){return /final|circle|revive|airdrop|winner|chicken/i.test(u+h);}
function isArena(u,h){return /arena|tdm|training|practice/i.test(u+h);}
function isWOW(u,h){return /wow|ugc|custom|room|creative|workshop/i.test(u+h);}
function isTelemetry(u,h){return /telemetry|analytic|crash|metric|beacon|track/i.test(u+h);}
function isDownload(u,h){return /download|update|patch|cdn|asset/i.test(u+h);}

// ========================== CONSISTENT HASHING ==========================

var HASH_RING = [
    { p: 0, proxy: CONFIG.jordan.primary[0] },
    { p: 858993459, proxy: CONFIG.jordan.primary[1] },
    { p: 1717986918, proxy: CONFIG.jordan.primary[2] },
    { p: 2576980377, proxy: CONFIG.jordan.primary[3] },
    { p: 3435973836, proxy: CONFIG.jordan.primary[4] }
];

function consistentProxy() {
    for (var i = 0; i < HASH_RING.length; i++) {
        if (STATE.player_hash <= HASH_RING[i].p) {
            if (score(HASH_RING[i].proxy) > 30)
                return HASH_RING[i].proxy;
        }
    }
    return HASH_RING[0].proxy;
}

// ========================== MAIN ENGINE ==========================

function FindProxyForURL(url, host) {

    host = host.toLowerCase();
    initSession();
    STATE.request_count++;

    if (!isPUBG(host)) return "DIRECT";
    if (isTelemetry(url, host) && !isMatch(url, host)) return CONFIG.block;

    var ip = resolve(host);
    if (!ip) return "DIRECT";

    if (startsWith(ip, GEO.block)) return CONFIG.block;

    var jc = startsWith(ip, GEO.jordan_core);
    var je = startsWith(ip, GEO.jordan_extended);
    var gf = startsWith(ip, GEO.gulf);
    var ac = startsWith(ip, GEO.anycast);

    recordRTT(estimateRTT(ip));

    // VOICE
    if (isVoice(url, host) && (jc || je))
        return CONFIG.jordan.voice.join("; ") + "; DIRECT";

    // CRITICAL
    if (isCritical(url, host) && jc)
        return CONFIG.jordan.critical.join("; ") + "; " + CONFIG.jordan.primary.join("; ");

    // MATCH (LOCKED)
    if (isMatch(url, host)) {
        if (!jc) return CONFIG.block;

        if (!STATE.match_locked) {
            STATE.match_proxy = consistentProxy();
            STATE.match_locked = true;
        }

        success(STATE.match_proxy);
        return STATE.match_proxy + "; " + CONFIG.jordan.critical.join("; ");
    }

    // LOBBY
    if (isLobby(url, host)) {
        STATE.last_lobby_time = Date.now();

        if (jc || je)
            return CONFIG.jordan.lobby.join("; ") + "; " + CONFIG.jordan.primary.join("; ");

        if (gf || ac)
            return CONFIG.gulf.join("; ") + "; DIRECT";

        return CONFIG.block;
    }

    // ARENA
    if (isArena(url, host) && (jc || je))
        return CONFIG.jordan.primary.join("; ");

    // WOW / CUSTOM
    if (isWOW(url, host) && (jc || je))
        return CONFIG.jordan.primary.join("; ");

    // DOWNLOAD
    if (isDownload(url, host)) return "DIRECT";

    // DEFAULT
    if (jc || je) return CONFIG.jordan.primary.join("; ");
    if (gf) return CONFIG.gulf[0] + "; DIRECT";
    if (ac) return "DIRECT";

    return CONFIG.block;
}

// ========================== END ==========================
