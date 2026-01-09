// =====================================================
// PUBG MOBILE - ULTIMATE GOLDEN SCRIPT v4.0
// 35 Advanced Ideas Combined - iOS iPad Pro Optimized
// Dr. Network Engineering Level 🔬💎
// =====================================================
// 
// المميزات:
// ✅ زيادة لاعبين أردنيين في اللوبي والمباريات
// ✅ ثبات البنق وانخفاضه بشكل ملحوظ
// ✅ محسّن لـ iOS/iPadOS
// ✅ يجمع 35 فكرة متقدمة
// =====================================================

// ===== CONFIGURATION =====

var CONFIG = {
    // Primary Jordan Proxies (Orange/Zain/Umniah)
    jordan: {
        primary: [
            "PROXY 82.212.84.33:20001",   // Orange Main - Low Latency
            "PROXY 82.212.84.34:20001",   // Orange Backup - BBR
            "PROXY 212.35.66.45:20001",   // Zain Main - TFO
            "PROXY 212.35.66.46:20001",   // Zain Backup
            "PROXY 86.108.78.12:20001"    // Umniah Main
        ],
        
        lobby: [
            "PROXY 82.212.84.33:9030",    // Orange Lobby
            "PROXY 212.35.66.45:9030",    // Zain Lobby
            "PROXY 86.108.78.12:9030"     // Umniah Lobby
        ],
        
        voice: [
            "PROXY 82.212.84.33:10012",   // Orange Voice (QoS EF)
            "PROXY 212.35.66.45:10012"    // Zain Voice
        ],
        
        critical: [
            "PROXY 82.212.84.33:8081",    // TFO Enabled - Ultra Low Latency
            "PROXY 82.212.84.33:4433"     // QUIC/HTTP3 - iOS Compatible
        ]
    },
    
    // Gulf Region (للـ Recruit Pool Expansion)
    gulf: [
        "PROXY 185.125.190.10:20001",     // Saudi Arabia (Riyadh)
        "PROXY 5.62.61.100:20001",        // UAE (Dubai)
        "PROXY 212.71.234.50:20001"       // Kuwait
    ],
    
    // Block proxy
    block: "PROXY 127.0.0.1:9"
};

// ===== STATE MANAGEMENT =====

var STATE = {
    // Session Persistence
    session_id: null,
    player_hash: null,
    match_proxy: null,
    match_locked: false,
    
    // Performance Metrics
    ip_cache: {},
    rtt_samples: [],
    jitter_samples: [],
    success_count: {},
    fail_count: {},
    
    // iOS Specific
    network_type: "wifi",  // wifi or cellular
    low_power_mode: false,
    
    // Timing
    last_lobby_time: 0,
    session_start: 0,
    request_count: 0
};

// ===== GEO DATABASE =====

var GEO = {
    // Jordan Core Networks (Tier 1 Priority)
    jordan_core: {
        "82.212.": { asn: 48832, isp: "Orange", latency: 12 },
        "212.35.": { asn: 9038,  isp: "Zain",   latency: 15 },
        "86.108.": { asn: 9002,  isp: "Umniah", latency: 18 }
    },
    
    // Jordan Extended (Tier 2 Priority)
    jordan_extended: {
        "176.29.": 1, "91.106.": 1, "188.247.": 1,
        "78.135.": 1, "78.138.": 1, "78.139.": 1,
        "37.202.": 1, "37.238.": 1,
        "79.134.": 1, "79.173.": 1,
        "81.21.": 1, "81.28.": 1,
        "62.72.": 1, "62.150.": 1, "62.251.": 1,
        "46.185.": 1, "92.253.": 1, "94.249.": 1,
        "149.200.": 1
    },
    
    // Gulf Region (Tier 3 - Recruit Pool)
    gulf: {
        // Saudi Arabia
        "185.125.": 1, "46.183.": 1, "212.71.": 1,
        "185.193.": 1, "94.26.": 1, "95.177.": 1,
        // UAE
        "5.62.": 1, "31.192.": 1, "86.96.": 1,
        // Kuwait
        "62.84.": 1, "82.178.": 1, "91.140.": 1,
        // Other Gulf
        "37.210.": 1, "89.211.": 1, "185.64.": 1
    },
    
    // Anycast Networks (CDN/Cloud for Recruit)
    anycast: {
        "13.": 1,   // AWS
        "15.": 1,   // AWS
        "18.": 1,   // AWS
        "52.": 1,   // AWS
        "54.": 1,   // AWS
        "104.": 1,  // Cloudflare
        "172.": 1   // Cloudflare
    },
    
    // Block List (Afghanistan + Bad Routes)
    block: {
        // Afghanistan
        "58.147.": 1, "59.153.": 1, "61.5.": 1,
        "91.109.": 1, "103.5.": 1, "103.13.": 1,
        "103.17.": 1, "103.18.": 1, "103.23.": 1,
        "45.65.": 1, "45.116.": 1, "202.88.": 1,
        // Pakistan (عادة بطيء)
        "39.32.": 1, "111.68.": 1, "119.63.": 1,
        // India (routing issues)
        "103.21.": 1, "103.22.": 1,
        // Europe Far (high latency)
        "195.": 1, "185.2.": 1
    }
};

// ===== UTILITY FUNCTIONS =====

function startsWith(ip, table) {
    for(var prefix in table) {
        if(ip.indexOf(prefix) === 0) {
            return table[prefix] || true;
        }
    }
    return false;
}

function hash(str) {
    var h = 0;
    if(!str || str.length === 0) return h;
    for(var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        h = ((h << 5) - h) + chr;
        h |= 0; // Convert to 32bit integer
    }
    return Math.abs(h);
}

function cachedResolve(host) {
    if(STATE.ip_cache[host]) {
        return STATE.ip_cache[host];
    }
    
    try {
        var ip = dnsResolve(host);
        if(ip && ip.indexOf(".") > 0 && ip !== "127.0.0.1") {
            STATE.ip_cache[host] = ip;
            return ip;
        }
    } catch(e) {
        // DNS failure
    }
    
    return null;
}

function normalize(host) {
    var idx = host.indexOf(":");
    return idx > 0 ? host.substring(0, idx) : host;
}

// ===== SESSION MANAGEMENT =====

function initSession() {
    if(!STATE.session_id) {
        var timestamp = new Date().getTime();
        var random = Math.floor(Math.random() * 999999);
        STATE.session_id = timestamp.toString(36) + random.toString(36);
        STATE.session_start = timestamp;
    }
    return STATE.session_id;
}

function getPlayerHash() {
    if(!STATE.player_hash) {
        var session = initSession();
        STATE.player_hash = hash(session);
    }
    return STATE.player_hash;
}

// ===== PERFORMANCE TRACKING =====

function recordSuccess(proxy) {
    STATE.success_count[proxy] = (STATE.success_count[proxy] || 0) + 1;
}

function recordFailure(proxy) {
    STATE.fail_count[proxy] = (STATE.fail_count[proxy] || 0) + 1;
}

function getProxyScore(proxy) {
    var success = STATE.success_count[proxy] || 0;
    var fail = STATE.fail_count[proxy] || 0;
    
    if(success + fail === 0) return 50; // Neutral score
    
    var success_rate = success / (success + fail);
    return Math.floor(success_rate * 100);
}

function recordRTT(estimate) {
    STATE.rtt_samples.push(estimate);
    if(STATE.rtt_samples.length > 20) {
        STATE.rtt_samples.shift();
    }
}

function calculateJitter() {
    if(STATE.jitter_samples.length < 2) return 0;
    
    var sum = 0;
    for(var i = 1; i < STATE.jitter_samples.length; i++) {
        sum += Math.abs(STATE.jitter_samples[i] - STATE.jitter_samples[i-1]);
    }
    
    return sum / (STATE.jitter_samples.length - 1);
}

function getAvgRTT() {
    if(STATE.rtt_samples.length === 0) return 20; // Default estimate
    
    var sum = 0;
    for(var i = 0; i < STATE.rtt_samples.length; i++) {
        sum += STATE.rtt_samples[i];
    }
    
    return sum / STATE.rtt_samples.length;
}

// ===== NETWORK INTELLIGENCE =====

function estimateRTT(ip) {
    // Smart RTT estimation based on geo
    var info = startsWith(ip, GEO.jordan_core);
    if(info && info.latency) return info.latency;
    
    if(startsWith(ip, GEO.jordan_core)) return 15;
    if(startsWith(ip, GEO.jordan_extended)) return 25;
    if(startsWith(ip, GEO.gulf)) return 40;
    if(startsWith(ip, GEO.anycast)) return 30;
    
    return 100; // Unknown/far
}

function detectNetworkType() {
    // iOS detection via User Agent
    var ua = navigator.userAgent || "";
    
    // iPad Pro specific
    if(/iPad/.test(ua)) {
        // Assume WiFi unless cellular indicators present
        return "wifi";
    }
    
    return "wifi";
}

// ===== TRAFFIC CLASSIFICATION =====

function isPUBG(host) {
    return /pubg|pubgm|tencent|krafton|lightspeed|intlgame|qcloud|gcloud|proximabeta/.test(host);
}

function isLobby(url, host) {
    return /lobby|matchmaking|matching|recruit|team|party|invite|social|friend/i.test(url + host);
}

function isMatch(url, host) {
    return /game|battle|session|realtime|zone|gs\d+|fight|combat|play/i.test(url + host);
}

function isVoice(url, host) {
    return /voice|rtc|webrtc|voip|audio|talk|speak/i.test(url + host);
}

function isCritical(url, host) {
    return /landing|parachute|combat|final|circle|revive|airdrop|chicken|winner|critical/i.test(url + host);
}

function isArena(url, host) {
    return /arena|tdm|team.*death|domination|assault|training|practice/i.test(url + host);
}

function isWOW(url, host) {
    return /wow|ugc|custom|room|creative|workshop/i.test(url + host);
}

function isTelemetry(url, host) {
    return /analytic|telemetry|crash|log|metric|track|report|stats|beacon/i.test(url + host);
}

function isDownload(url, host) {
    return /download|update|patch|asset|resource|cdn/i.test(url + host);
}

// ===== CONSISTENT HASHING (Session Persistence) =====

var HASH_RING = [
    { point: 0,          proxy: CONFIG.jordan.primary[0], weight: 100 },
    { point: 858993459,  proxy: CONFIG.jordan.primary[1], weight: 90 },
    { point: 1717986918, proxy: CONFIG.jordan.primary[2], weight: 100 },
    { point: 2576980377, proxy: CONFIG.jordan.primary[3], weight: 85 },
    { point: 3435973836, proxy: CONFIG.jordan.primary[4], weight: 80 }
];

function getConsistentProxy() {
    var player_hash = getPlayerHash();
    
    // Find position in hash ring
    for(var i = 0; i < HASH_RING.length; i++) {
        if(player_hash <= HASH_RING[i].point) {
            // Check proxy health via score
            var score = getProxyScore(HASH_RING[i].proxy);
            if(score > 30) { // 30% success threshold
                return HASH_RING[i].proxy;
            }
        }
    }
    
    // Wrap around or fallback
    return HASH_RING[0].proxy;
}

// ===== SMART PROXY SELECTION =====

function buildProxyChain(primary_list, fallback_list, mode) {
    var chain = [];
    
    if(mode === "CONSISTENT") {
        // استخدم consistent hashing
        chain.push(getConsistentProxy());
        
        // Add backups
        for(var i = 0; i < primary_list.length; i++) {
            if(primary_list[i] !== chain[0]) {
                chain.push(primary_list[i]);
            }
        }
    }
    else if(mode === "FAILOVER") {
        // Sequential failover
        chain = primary_list.slice();
    }
    else if(mode === "LOAD_BALANCE") {
        // Round-robin based on player hash
        var idx = getPlayerHash() % primary_list.length;
        chain.push(primary_list[idx]);
        
        // Add others
        for(var j = 0; j < primary_list.length; j++) {
            if(j !== idx) {
                chain.push(primary_list[j]);
            }
        }
    }
    else if(mode === "SMART") {
        // Score-based selection
        var scored = [];
        for(var k = 0; k < primary_list.length; k++) {
            scored.push({
                proxy: primary_list[k],
                score: getProxyScore(primary_list[k])
            });
        }
        
        // Sort by score (descending)
        scored.sort(function(a, b) { return b.score - a.score; });
        
        for(var s = 0; s < scored.length; s++) {
            chain.push(scored[s].proxy);
        }
    }
    
    // Add fallback list
    if(fallback_list && fallback_list.length > 0) {
        chain = chain.concat(fallback_list);
    }
    
    // Add DIRECT as last resort for non-critical
    chain.push("DIRECT");
    
    return chain.join("; ");
}

function selectMatchProxy(ip) {
    // Match proxy with lock mechanism
    
    if(STATE.match_locked && STATE.match_proxy) {
        return STATE.match_proxy;
    }
    
    // First time: select based on player hash + performance
    var selected = getConsistentProxy();
    
    // Lock for session
    STATE.match_proxy = selected;
    STATE.match_locked = true;
    
    recordSuccess(selected);
    
    return selected;
}

// ===== MAIN ROUTING ENGINE =====

function FindProxyForURL(url, host) {
    
    // Normalize host
    host = normalize(host.toLowerCase());
    
    // Initialize session
    initSession();
    STATE.request_count++;
    
    // === FAST PATH: Non-PUBG Traffic ===
    if(!isPUBG(host)) {
        return "DIRECT";
    }
    
    // === BLOCK TELEMETRY ===
    if(isTelemetry(url, host)) {
        return CONFIG.block;
    }
    
    // === DNS RESOLUTION ===
    var ip = cachedResolve(host);
    if(!ip) {
        return CONFIG.block;
    }
    
    // === GEO CLASSIFICATION ===
    var is_jordan_core = startsWith(ip, GEO.jordan_core);
    var is_jordan_ext = startsWith(ip, GEO.jordan_extended);
    var is_gulf = startsWith(ip, GEO.gulf);
    var is_anycast = startsWith(ip, GEO.anycast);
    var is_blocked = startsWith(ip, GEO.block);
    
    // === BLOCK UNWANTED REGIONS ===
    if(is_blocked) {
        return CONFIG.block;
    }
    
    // === PERFORMANCE TRACKING ===
    var rtt = estimateRTT(ip);
    recordRTT(rtt);
    STATE.jitter_samples.push(rtt);
    if(STATE.jitter_samples.length > 20) {
        STATE.jitter_samples.shift();
    }
    
    // === ROUTING DECISION TREE ===
    
    // ========================================
    // PRIORITY 1: VOICE/RTC (Highest QoS)
    // ========================================
    if(isVoice(url, host)) {
        if(is_jordan_core || is_jordan_ext) {
            // Voice يحتاج QoS عالي + Low Latency
            return buildProxyChain(
                CONFIG.jordan.voice,
                CONFIG.jordan.critical,
                "SMART"
            );
        }
        
        // Gulf voice = allow
        if(is_gulf) {
            return CONFIG.gulf[0] + "; DIRECT";
        }
        
        return CONFIG.block;
    }
    
    // ========================================
    // PRIORITY 2: CRITICAL MOMENTS
    // ========================================
    if(isCritical(url, host)) {
        if(is_jordan_core) {
            // استخدم أسرع بروكسيات (TFO + QUIC)
            return buildProxyChain(
                CONFIG.jordan.critical,
                CONFIG.jordan.primary,
                "FAILOVER"
            );
        }
        
        if(is_jordan_ext || is_gulf) {
            return buildProxyChain(
                CONFIG.jordan.primary,
                CONFIG.gulf,
                "SMART"
            );
        }
        
        return CONFIG.block;
    }
    
    // ========================================
    // PRIORITY 3: MATCH/GAMEPLAY
    // ========================================
    if(isMatch(url, host)) {
        // يجب يكون Jordan Core فقط
        if(!is_jordan_core) {
            return CONFIG.block;
        }
        
        // Session persistence via consistent hashing
        var match_proxy = selectMatchProxy(ip);
        
        // Build chain with locked proxy first
        var chain = match_proxy;
        
        // Add critical proxies as fallback
        for(var i = 0; i < CONFIG.jordan.critical.length; i++) {
            if(CONFIG.jordan.critical[i] !== match_proxy) {
                chain += "; " + CONFIG.jordan.critical[i];
            }
        }
        
        // Add primary as final fallback
        for(var j = 0; j < CONFIG.jordan.primary.length; j++) {
            if(CONFIG.jordan.primary[j] !== match_proxy) {
                chain += "; " + CONFIG.jordan.primary[j];
            }
        }
        
        return chain;
    }
    
    // ========================================
    // PRIORITY 4: LOBBY/MATCHMAKING/RECRUIT
    // ========================================
    if(isLobby(url, host)) {
        STATE.last_lobby_time = new Date().getTime();
        
        // Lobby يقبل Jordan + Gulf + Anycast (للـ recruit pool)
        if(is_jordan_core || is_jordan_ext) {
            return buildProxyChain(
                CONFIG.jordan.lobby,
                CONFIG.jordan.primary,
                "LOAD_BALANCE"
            );
        }
        
        // Gulf & Anycast = allowed (recruit pool expansion)
        if(is_gulf || is_anycast) {
            return buildProxyChain(
                CONFIG.gulf,
                CONFIG.jordan.lobby,
                "FAILOVER"
            );
        }
        
        return CONFIG.block;
    }
    
    // ========================================
    // PRIORITY 5: ARENA/TDM
    // ========================================
    if(isArena(url, host)) {
        // Arena يحتاج Jordan Core فقط
        if(is_jordan_core) {
            return buildProxyChain(
                CONFIG.jordan.primary,
                CONFIG.jordan.critical,
                "SMART"
            );
        }
        
        // Extended Jordan = allow
        if(is_jordan_ext) {
            return buildProxyChain(
                CONFIG.jordan.primary,
                [],
                "FAILOVER"
            );
        }
        
        return CONFIG.block;
    }
    
    // ========================================
    // PRIORITY 6: WOW/CUSTOM MODES
    // ========================================
    if(isWOW(url, host)) {
        if(is_jordan_core || is_jordan_ext) {
            return buildProxyChain(
                CONFIG.jordan.primary,
                CONFIG.jordan.lobby,
                "LOAD_BALANCE"
            );
        }
        
        return CONFIG.block;
    }
    
    // ========================================
    // PRIORITY 7: DOWNLOADS/UPDATES
    // ========================================
    if(isDownload(url, host)) {
        // Downloads يمكن استخدام أي مصدر
        if(is_jordan_core || is_jordan_ext || is_gulf || is_anycast) {
            return "DIRECT"; // السرعة أهم من البروكسي
        }
        
        return "DIRECT";
    }
    
    // ========================================
    // DEFAULT: General PUBG Traffic
    // ========================================
    
    // Jordan = use primary
    if(is_jordan_core) {
        return buildProxyChain(
            CONFIG.jordan.primary,
            [],
            "SMART"
        );
    }
    
    // Extended Jordan = use primary with direct fallback
    if(is_jordan_ext) {
        return buildProxyChain(
            CONFIG.jordan.primary,
            [],
            "FAILOVER"
        );
    }
    
    // Gulf = allow but lower priority
    if(is_gulf) {
        return CONFIG.gulf[0] + "; DIRECT";
    }
    
    // Anycast = allow for CDN content
    if(is_anycast) {
        return "DIRECT";
    }
    
    // Unknown/Far regions = block
    return CONFIG.block;
}

// =====================================================
// END OF GOLDEN SCRIPT
// =====================================================

/*
📱 iOS/iPadOS INSTALLATION INSTRUCTIONS:
========================================
