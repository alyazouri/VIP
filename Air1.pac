// ==================================================================================
// PUBG MOBILE - JORDAN PLAYERS OPTIMIZER v3.0
// Advanced Proxy Auto-Config (PAC) Script
// Optimized for maximum Jordan player concentration
// ==================================================================================

// ================= CONFIGURATION =================
var CONFIG = {
  // Primary Match Servers (UDP Optimized)
  MATCH_PRIMARY: "PROXY 46.185.131.218:20001",
  
  // Backup Match Servers (Failover)
  MATCH_BACKUP: [
    "PROXY 46.185.131.218:443",
    "PROXY 212.35.66.45:8085",
    "PROXY 82.212.84.33:9030"
  ],
  
  // Lobby Pool (Distributed Load Balancing)
  LOBBY_POOL: [
    "PROXY 212.35.66.45:8085",
    "PROXY 82.212.84.33:9030",
    "PROXY 91.106.109.12:10039",
    "PROXY 46.185.131.218:443"
  ],
  
  // Social/Party Pool (Premium)
  SOCIAL_POOL: [
    "PROXY 212.35.66.45:8085",
    "PROXY 46.185.131.218:443"
  ],
  
  // ISP-Specific Proxies (Smart Routing)
  ISP_PROXIES: {
    "ZAIN": "PROXY 46.185.131.218:20001",
    "ORANGE": "PROXY 212.35.66.45:8085",
    "UMNIAH": "PROXY 82.212.84.33:9030",
    "MOBILE": "PROXY 91.106.109.12:10039",
    "FIBER": "PROXY 46.185.131.218:20001"
  },
  
  // Special routes
  BLOCK: "PROXY 127.0.0.1:9",
  DIRECT: "DIRECT",
  
  // Performance Settings
  DNS_CACHE_LIMIT: 150,
  MATCH_STICKY_DURATION: 300000, // 5 minutes
  SESSION_CLEANUP_INTERVAL: 600000, // 10 minutes
  ENABLE_LOGGING: false,
  ENABLE_STATS: true,
  PREMIUM_FAILOVER: true
};

// ================= JORDAN IP RANGES (COMPREHENSIVE) =================
var JORDAN_NETWORKS = {
  // Tier 1: Premium ISPs (Zain, Orange, Umniah) - Fiber & High-Speed
  PREMIUM: [
    ["46.185.168.0", "255.255.248.0"],    // Zain Fiber
    ["46.185.176.0", "255.255.248.0"],    // Zain Extended
    ["212.35.64.0", "255.255.248.0"],     // Orange Fiber
    ["212.35.72.0", "255.255.248.0"],     // Orange Extended
    ["92.241.32.0", "255.255.248.0"],     // Umniah Primary
    ["92.241.40.0", "255.255.248.0"],     // Umniah Extended
    ["37.220.112.0", "255.255.248.0"],    // Premium Range 1
    ["176.57.48.0", "255.255.248.0"],     // Premium Range 2
    ["109.237.192.0", "255.255.248.0"],   // Premium Range 3
    ["185.60.216.0", "255.255.252.0"],    // New Fiber Networks
    ["185.117.8.0", "255.255.252.0"]      // Advanced Infrastructure
  ],
  
  // Tier 2: Standard ISPs
  STANDARD: [
    ["188.161.0.0", "255.255.0.0"],       // Wide Jordan Block 1
    ["46.244.0.0", "255.255.0.0"],        // Wide Jordan Block 2
    ["176.56.0.0", "255.254.0.0"],        // Extended Range 1
    ["195.229.0.0", "255.255.0.0"],       // Extended Range 2
    ["79.142.192.0", "255.255.192.0"],    // Regional ISPs
    ["82.212.64.0", "255.255.192.0"],     // Additional Blocks
    ["91.106.64.0", "255.255.192.0"]      // Secondary Networks
  ],
  
  // Tier 3: Mobile Networks (3G/4G/5G)
  MOBILE: [
    ["31.9.0.0", "255.255.0.0"],          // Mobile Operator 1
    ["195.229.0.0", "255.255.0.0"],       // Mobile Operator 2
    ["79.142.192.0", "255.255.192.0"],    // 4G LTE Ranges
    ["176.56.128.0", "255.255.128.0"],    // 5G Networks
    ["85.115.0.0", "255.255.0.0"]         // Mobile Data
  ],
  
  // Tier 4: Government & Universities (Stable connections)
  INSTITUTIONAL: [
    ["193.188.0.0", "255.255.0.0"],       // Educational Networks
    ["212.100.0.0", "255.255.0.0"],       // Government Networks
    ["194.165.0.0", "255.255.0.0"]        // Research Networks
  ]
};

// ================= ISP DETECTION PATTERNS =================
var ISP_DETECTION = {
  "46.185.": "ZAIN",
  "46.244.": "ZAIN",
  "212.35.": "ORANGE",
  "92.241.": "UMNIAH",
  "31.9.": "MOBILE",
  "195.229.": "MOBILE",
  "79.142.": "MOBILE",
  "185.60.": "FIBER",
  "185.117.": "FIBER",
  "188.161.": "STANDARD",
  "176.56.": "STANDARD"
};

// ================= VIP USERS (Priority Routing) =================
var VIP_CONFIG = {
  ENABLED: true,
  IPS: [
    // Add VIP IPs here for priority routing
    // "46.185.170.50",
    // "212.35.65.100"
  ],
  DEDICATED_PROXY: "PROXY 46.185.131.218:20001"
};

// ================= SESSION MANAGEMENT =================
var SESSION = {
  // Match session tracking
  matchNet: null,
  matchHost: null,
  matchTimestamp: 0,
  matchISP: null,
  
  // DNS caching
  dnsCache: {},
  dnsCacheList: [],
  dnsCacheTimestamp: {},
  
  // Load balancing
  proxyLoad: {},
  
  // Statistics
  stats: {
    matchConnections: 0,
    lobbyConnections: 0,
    socialConnections: 0,
    cdnConnections: 0,
    blockedConnections: 0,
    directConnections: 0,
    vipConnections: 0,
    totalRequests: 0,
    lastReset: new Date().getTime()
  },
  
  // Performance tracking
  lastCleanup: new Date().getTime()
};

// Initialize proxy load tracking
(function initProxyLoad() {
  var allProxies = [CONFIG.MATCH_PRIMARY]
    .concat(CONFIG.MATCH_BACKUP)
    .concat(CONFIG.LOBBY_POOL)
    .concat(CONFIG.SOCIAL_POOL);
  
  for (var i = 0; i < allProxies.length; i++) {
    if (!SESSION.proxyLoad[allProxies[i]]) {
      SESSION.proxyLoad[allProxies[i]] = 0;
    }
  }
})();

// ================= UTILITY FUNCTIONS =================

function log(msg) {
  if (CONFIG.ENABLE_LOGGING) {
    // In production environment, this could be sent to monitoring system
    // For now, it's just a placeholder
  }
}

function normalizeHost(host) {
  var colonIndex = host.indexOf(":");
  return colonIndex > -1 ? host.substring(0, colonIndex) : host;
}

function getCurrentTimestamp() {
  return new Date().getTime();
}

// ================= NETWORK DETECTION =================

function isInNetworkList(ip, networkList) {
  for (var i = 0; i < networkList.length; i++) {
    if (isInNet(ip, networkList[i][0], networkList[i][1])) {
      return true;
    }
  }
  return false;
}

function isJordanIP(ip) {
  return isInNetworkList(ip, JORDAN_NETWORKS.PREMIUM) ||
         isInNetworkList(ip, JORDAN_NETWORKS.STANDARD) ||
         isInNetworkList(ip, JORDAN_NETWORKS.MOBILE) ||
         isInNetworkList(ip, JORDAN_NETWORKS.INSTITUTIONAL);
}

function isPremiumJordanIP(ip) {
  return isInNetworkList(ip, JORDAN_NETWORKS.PREMIUM);
}

function isMobileIP(ip) {
  return isInNetworkList(ip, JORDAN_NETWORKS.MOBILE);
}

function detectISP(ip) {
  for (var prefix in ISP_DETECTION) {
    if (ip.indexOf(prefix) === 0) {
      return ISP_DETECTION[prefix];
    }
  }
  return "UNKNOWN";
}

function isVIP(ip) {
  if (!VIP_CONFIG.ENABLED) return false;
  
  for (var i = 0; i < VIP_CONFIG.IPS.length; i++) {
    if (ip === VIP_CONFIG.IPS[i]) {
      return true;
    }
  }
  return false;
}

// ================= DNS RESOLUTION & CACHING =================

function cleanupDNSCache() {
  var now = getCurrentTimestamp();
  var cacheAge = 3600000; // 1 hour
  
  for (var i = SESSION.dnsCacheList.length - 1; i >= 0; i--) {
    var host = SESSION.dnsCacheList[i];
    if (now - SESSION.dnsCacheTimestamp[host] > cacheAge) {
      delete SESSION.dnsCache[host];
      delete SESSION.dnsCacheTimestamp[host];
      SESSION.dnsCacheList.splice(i, 1);
    }
  }
}

function resolveHostCached(host) {
  // Periodic cleanup
  var now = getCurrentTimestamp();
  if (now - SESSION.lastCleanup > CONFIG.SESSION_CLEANUP_INTERVAL) {
    cleanupDNSCache();
    SESSION.lastCleanup = now;
  }
  
  // Check cache
  if (SESSION.dnsCache[host]) {
    return SESSION.dnsCache[host];
  }
  
  // Resolve
  var ip = dnsResolve(host);
  if (ip) {
    // Manage cache size
    if (SESSION.dnsCacheList.length >= CONFIG.DNS_CACHE_LIMIT) {
      var oldHost = SESSION.dnsCacheList.shift();
      delete SESSION.dnsCache[oldHost];
      delete SESSION.dnsCacheTimestamp[oldHost];
    }
    
    SESSION.dnsCache[host] = ip;
    SESSION.dnsCacheList.push(host);
    SESSION.dnsCacheTimestamp[host] = now;
  }
  
  return ip;
}

// ================= LOAD BALANCING =================

function incrementProxyLoad(proxy) {
  if (SESSION.proxyLoad[proxy] !== undefined) {
    SESSION.proxyLoad[proxy]++;
  }
}

function getLeastLoadedProxy(proxyList) {
  var minLoad = 999999;
  var bestProxy = proxyList[0];
  
  for (var i = 0; i < proxyList.length; i++) {
    var proxy = proxyList[i];
    var load = SESSION.proxyLoad[proxy] || 0;
    
    if (load < minLoad) {
      minLoad = load;
      bestProxy = proxy;
    }
  }
  
  return bestProxy;
}

function selectProxyByHash(host, proxyList) {
  // Consistent hashing for same host -> same proxy
  var hash = 0;
  for (var i = 0; i < host.length; i++) {
    hash = ((hash << 5) - hash) + host.charCodeAt(i);
    hash = hash & hash;
  }
  
  var index = Math.abs(hash) % proxyList.length;
  return proxyList[index];
}

function getOptimalMatchProxy(ip, isp, isPremium) {
  // VIP users get dedicated proxy
  if (isVIP(ip)) {
    SESSION.stats.vipConnections++;
    return VIP_CONFIG.DEDICATED_PROXY;
  }
  
  // ISP-specific routing
  if (isp && CONFIG.ISP_PROXIES[isp]) {
    return CONFIG.ISP_PROXIES[isp];
  }
  
  // Premium IPs get primary proxy
  if (isPremium) {
    return CONFIG.MATCH_PRIMARY;
  }
  
  // Load balancing for others
  if (CONFIG.PREMIUM_FAILOVER && CONFIG.MATCH_BACKUP.length > 0) {
    var allMatchProxies = [CONFIG.MATCH_PRIMARY].concat(CONFIG.MATCH_BACKUP);
    return getLeastLoadedProxy(allMatchProxies);
  }
  
  return CONFIG.MATCH_PRIMARY;
}

function getOptimalLobbyProxy(host, isPremium, isMobile) {
  // Premium users get better pool
  if (isPremium && !isMobile) {
    return selectProxyByHash(host, CONFIG.SOCIAL_POOL);
  }
  
  // Consistent hashing for lobby
  return selectProxyByHash(host, CONFIG.LOBBY_POOL);
}

// ================= TRAFFIC DETECTION =================

function isPUBGDomain(host) {
  var patterns = [
    /pubg/i,
    /pubgm/i,
    /tencent/i,
    /krafton/i,
    /lightspeed/i,
    /levelinfinite/i,
    /proximabeta/i,
    /intlgame/i,
    /gameloop/i,
    /quantum/i,
    /helpshift/i
  ];
  
  for (var i = 0; i < patterns.length; i++) {
    if (patterns[i].test(host)) return true;
  }
  return false;
}

function isMatchTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  var matchPatterns = [
    /\/classic/,
    /\/rank/,
    /battle.*royale/,
    /metro.*royale/,
    /\/match[^m]/,
    /game.*server/,
    /gameplay/,
    /\/game\//,
    /\/br\//,
    /\/mode\//,
    /erangel/,
    /miramar/,
    /sanhok/,
    /vikendi/,
    /livik/,
    /karakin/,
    /taego/,
    /deston/,
    /\/session/,
    /gamestate/
  ];
  
  for (var i = 0; i < matchPatterns.length; i++) {
    if (matchPatterns[i].test(combined)) return true;
  }
  
  return false;
}

function isTDMTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  var tdmPatterns = [
    /\/tdm/,
    /\/arena/,
    /deathmatch/,
    /\/payload/,
    /\/zombie/,
    /infection/,
    /war.*mode/,
    /quickmatch/,
    /\/evo/,
    /\/warehouse/,
    /\/hangar/,
    /\/ruins/
  ];
  
  for (var i = 0; i < tdmPatterns.length; i++) {
    if (tdmPatterns[i].test(combined)) return true;
  }
  
  return false;
}

function isLobbyTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  var lobbyPatterns = [
    /\/lobby/,
    /matchmaking/,
    /\/queue/,
    /\/dispatch/,
    /\/gateway/,
    /\/region/,
    /server.*list/,
    /\/account/,
    /\/login/,
    /\/auth/,
    /\/player/,
    /\/profile/,
    /inventory/,
    /\/shop/,
    /\/store/,
    /\/purchase/
  ];
  
  for (var i = 0; i < lobbyPatterns.length; i++) {
    if (lobbyPatterns[i].test(combined)) return true;
  }
  
  return false;
}

function isSocialTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  var socialPatterns = [
    /\/friend/,
    /\/social/,
    /\/party/,
    /\/team/,
    /\/squad/,
    /\/clan/,
    /\/guild/,
    /\/invite/,
    /\/presence/,
    /\/chat/,
    /\/voice/,
    /\/recruit/,
    /\/crew/,
    /\/member/,
    /\/ranking/,
    /leaderboard/
  ];
  
  for (var i = 0; i < socialPatterns.length; i++) {
    if (socialPatterns[i].test(combined)) return true;
  }
  
  return false;
}

function isCDNTraffic(url, host) {
  var combined = (url + " " + host).toLowerCase();
  
  var cdnPatterns = [
    /\/cdn/,
    /\/asset/,
    /\/resource/,
    /\/static/,
    /\/patch/,
    /\/update/,
    /\/download/,
    /\/media/,
    /\/content/,
    /\/image/,
    /\/texture/,
    /\.pak/,
    /\.zip/,
    /\.apk/,
    /cloudfront/,
    /akamai/,
    /fastly/
  ];
  
  for (var i = 0; i < cdnPatterns.length; i++) {
    if (cdnPatterns[i].test(combined)) return true;
  }
  
  return false;
}

// ================= SESSION VALIDATION =================

function shouldResetMatchSession() {
  if (!SESSION.matchTimestamp) return false;
  
  var now = getCurrentTimestamp();
  var elapsed = now - SESSION.matchTimestamp;
  
  return elapsed > CONFIG.MATCH_STICKY_DURATION;
}

function validateMatchSession(host, ip, isp) {
  var currentNet = ip.split('.').slice(0, 3).join('.');
  
  // Auto-reset if expired
  if (shouldResetMatchSession()) {
    SESSION.matchNet = null;
    SESSION.matchHost = null;
    SESSION.matchTimestamp = 0;
    SESSION.matchISP = null;
    log("Match session reset (timeout)");
  }
  
  // Initialize new session
  if (!SESSION.matchNet) {
    SESSION.matchNet = currentNet;
    SESSION.matchHost = host;
    SESSION.matchISP = isp;
    SESSION.matchTimestamp = getCurrentTimestamp();
    log("New match session: " + host + " (" + currentNet + ".x) ISP: " + isp);
    return true;
  }
  
  // Validate against existing session
  if (host !== SESSION.matchHost) {
    log("Blocked: Different host (" + host + " vs " + SESSION.matchHost + ")");
    return false;
  }
  
  if (currentNet !== SESSION.matchNet) {
    log("Blocked: Different network (" + currentNet + " vs " + SESSION.matchNet + ")");
    return false;
  }
  
  // Optional: Validate same ISP for consistency
  // if (isp !== SESSION.matchISP && SESSION.matchISP !== "UNKNOWN") {
  //   log("Warning: Different ISP (" + isp + " vs " + SESSION.matchISP + ")");
  // }
  
  return true;
}

// ================= STATISTICS =================

function recordStats(type) {
  if (!CONFIG.ENABLE_STATS) return;
  
  SESSION.stats.totalRequests++;
  
  switch(type) {
    case "match":
      SESSION.stats.matchConnections++;
      break;
    case "lobby":
      SESSION.stats.lobbyConnections++;
      break;
    case "social":
      SESSION.stats.socialConnections++;
      break;
    case "cdn":
      SESSION.stats.cdnConnections++;
      break;
    case "block":
      SESSION.stats.blockedConnections++;
      break;
    case "direct":
      SESSION.stats.directConnections++;
      break;
  }
}

// ================= MAIN PROXY FUNCTION =================

function FindProxyForURL(url, host) {
  
  // Normalize host
  host = normalizeHost(host.toLowerCase());
  
  // Quick exit for non-PUBG traffic
  if (!isPUBGDomain(host)) {
    recordStats("direct");
    return CONFIG.DIRECT;
  }
  
  // Resolve IP with caching
  var ip = resolveHostCached(host);
  
  // Block IPv6 or DNS failures
  if (!ip || ip.indexOf(":") > -1) {
    recordStats("block");
    log("Blocked: Invalid IP or IPv6 for " + host);
    return CONFIG.BLOCK;
  }
  
  // Network analysis
  var isJordan = isJordanIP(ip);
  var isPremium = isPremiumJordanIP(ip);
  var isMobile = isMobileIP(ip);
  var isp = detectISP(ip);
  var isVIPUser = isVIP(ip);
  
  // ========= MATCH TRAFFIC (Battle Royale, Ranked, TDM) =========
  if (isMatchTraffic(url, host) || isTDMTraffic(url, host)) {
    
    // Strict Jordan-only policy for matches
    if (!isJordan) {
      recordStats("block");
      log("Blocked match: Non-Jordan IP " + ip);
      return CONFIG.BLOCK;
    }
    
    // Validate session consistency (prevent server hopping)
    if (!validateMatchSession(host, ip, isp)) {
      recordStats("block");
      return CONFIG.BLOCK;
    }
    
    // Route to optimal match proxy
    recordStats("match");
    var matchProxy = getOptimalMatchProxy(ip, isp, isPremium);
    incrementProxyLoad(matchProxy);
    
    log("Match routed: " + host + " (" + ip + ") ISP: " + isp + " -> " + matchProxy);
    return matchProxy;
  }
  
  // ========= LOBBY TRAFFIC (Matchmaking, Queue, Region Selection) =========
  if (isLobbyTraffic(url, host)) {
    
    // Jordan-only for lobby
    if (!isJordan) {
      recordStats("block");
      log("Blocked lobby: Non-Jordan IP " + ip);
      return CONFIG.BLOCK;
    }
    
    recordStats("lobby");
    var lobbyProxy = getOptimalLobbyProxy(host, isPremium, isMobile);
    incrementProxyLoad(lobbyProxy);
    
    return lobbyProxy;
  }
  
  // ========= SOCIAL TRAFFIC (Friends, Party, Clan, Voice) =========
  if (isSocialTraffic(url, host)) {
    
    // Jordan-only for social
    if (!isJordan) {
      recordStats("block");
      log("Blocked social: Non-Jordan IP " + ip);
      return CONFIG.BLOCK;
    }
    
    recordStats("social");
    
    // Premium pool for social features
    var socialProxy = selectProxyByHash(host, CONFIG.SOCIAL_POOL);
    incrementProxyLoad(socialProxy);
    
    return socialProxy;
  }
  
  // ========= CDN TRAFFIC (Assets, Updates, Downloads) =========
  if (isCDNTraffic(url, host)) {
    recordStats("cdn");
    
    // CDN can go direct for better performance (or through proxy if Jordan)
    if (isJordan) {
      var cdnProxy = getOptimalLobbyProxy(host, isPremium, isMobile);
      return cdnProxy;
    }
    
    // Allow direct for non-Jordan CDN to reduce load
    recordStats("direct");
    return CONFIG.DIRECT;
  }
  
  // ========= DEFAULT ROUTING =========
  
  // Jordan IPs: Route through lobby pool
  if (isJordan) {
    var defaultProxy = getOptimalLobbyProxy(host, isPremium, isMobile);
    incrementProxyLoad(defaultProxy);
    return defaultProxy;
  }
  
  // Non-Jordan: Block to concentrate players
  recordStats("block");
  log("Blocked: Non-Jordan IP " + ip + " for " + host);
  return CONFIG.BLOCK;
}

// ================= END OF SCRIPT =================
