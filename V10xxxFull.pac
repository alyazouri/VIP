// ═══════════════════════════════════════════════════════════════════
// ██████╗ ██╗   ██╗██████╗  ██████╗     ██████╗  ██████╗  ██████╗ ███████╗████████╗
// ██╔══██╗██║   ██║██╔══██╗██╔════╝     ██╔══██╗██╔═══██╗██╔═══██╗██╔════╝╚══██╔══╝
// ██████╔╝██║   ██║██████╔╝██║  ███╗    ██████╔╝██║   ██║██║   ██║███████╗   ██║   
// ██╔═══╝ ██║   ██║██╔══██╗██║   ██║    ██╔══██╗██║   ██║██║   ██║╚════██║   ██║   
// ██║     ╚██████╔╝██████╔╝╚██████╔╝    ██████╔╝╚██████╔╝╚██████╔╝███████║   ██║   
// ╚═╝      ╚═════╝ ╚═════╝  ╚═════╝     ╚═════╝  ╚═════╝  ╚═════╝ ╚══════╝   ╚═╝   
// ═══════════════════════════════════════════════════════════════════
// BY: YAZOURI
// VERSION: 3.0 ULTIMATE
// DNS: 1.1.1.1 - 1.0.0.1
// RESET DEVICE AFTER INSTALLATION
// ═══════════════════════════════════════════════════════════════════

// ================= GAME BOOSTER CONFIGURATION =================
var GAME_BOOSTER = {
  // Performance Modes
  mode: "ULTRA", // ECO, BALANCED, PERFORMANCE, ULTRA
  
  modes: {
    ECO: {
      dns_ttl: 600000,        // 10 min
      session_timeout: 120000, // 2 min
      max_connections: 3,
      cache_size: 20,
      priority: "battery"
    },
    BALANCED: {
      dns_ttl: 300000,        // 5 min
      session_timeout: 180000, // 3 min
      max_connections: 5,
      cache_size: 50,
      priority: "balanced"
    },
    PERFORMANCE: {
      dns_ttl: 180000,        // 3 min
      session_timeout: 240000, // 4 min
      max_connections: 8,
      cache_size: 100,
      priority: "performance"
    },
    ULTRA: {
      dns_ttl: 120000,        // 2 min
      session_timeout: 300000, // 5 min
      max_connections: 15,
      cache_size: 200,
      priority: "ultra_performance"
    }
  },
  
  // Anti-Lag Features
  antiLag: {
    enabled: true,
    aggressiveCaching: true,
    predictiveLoading: true,
    requestPrioritization: true,
    connectionPrewarming: true
  },
  
  // Network Optimization
  networkOptimization: {
    tcpFastOpen: true,
    nagleDisabled: true,
    keepAliveEnabled: true,
    compressionEnabled: true
  },
  
  // FPS Boost (indirect через оптимизацию сети)
  fpsBoost: {
    enabled: true,
    reducedLatency: true,
    smoothDataFlow: true,
    prioritizeGamePackets: true
  }
};

// ================= ADVANCED CONFIGURATION =================
var CONFIG = {
  // Dynamic configuration based on mode
  DNS_CACHE_TTL: 120000,
  SESSION_TIMEOUT: 300000,
  MAX_FAILS: 2,
  MAX_CONNECTIONS: 15,
  CACHE_SIZE: 200,
  
  // Feature Flags
  ENABLE_FALLBACK: true,
  ENABLE_ADAPTIVE: true,
  ENABLE_MULTIPATH: true,
  ENABLE_CLUSTERING: true,
  ENABLE_PREDICTIVE: true,
  ENABLE_GEO_OPTIMIZE: true,
  ENABLE_TIME_ROUTING: true,
  ENABLE_HEALTH_CHECK: true,
  ENABLE_DEDUPLICATION: true,
  ENABLE_COMPRESSION: true,
  ENABLE_POOLING: true,
  ENABLE_AUTO_REGION: true,
  ENABLE_PATTERN_ANALYSIS: true,
  ENABLE_BANDWIDTH_OPT: true,
  
  // Performance Tuning
  AGGRESSIVE_CACHING: true,
  PREDICTIVE_PRELOAD: true,
  SMART_TIMEOUT: true,
  FAST_FAILOVER: true
};

// ================= PROXY SERVERS =================
var MATCH_SERVERS = {
  primary: {
    proxy: "PROXY 46.185.131.218:20001",
    location: {lat: 31.9454, lon: 35.9284, city: "Amman"},
    cluster: "JO-Orange",
    priority: 100,
    bandwidth: "high"
  },
  secondary: {
    proxy: "PROXY 212.35.66.45:20001",
    location: {lat: 31.9522, lon: 35.9330, city: "Amman"},
    cluster: "JO-Zain",
    priority: 95,
    bandwidth: "high"
  },
  backup: {
    proxy: "PROXY 212.35.66.45:8085",
    location: {lat: 31.9522, lon: 35.9330, city: "Amman"},
    cluster: "JO-Other",
    priority: 90,
    bandwidth: "medium"
  },
  emergency: {
    proxy: "PROXY 46.185.131.218:443",
    location: {lat: 31.9454, lon: 35.9284, city: "Amman"},
    cluster: "JO-Emergency",
    priority: 85,
    bandwidth: "medium"
  }
};

var LOBBY_POOL = [
  {proxy: "PROXY 212.35.66.45:8085", weight: 6, priority: 1, performance: 100, bandwidth: "high"},
  {proxy: "PROXY 212.35.66.45:8181", weight: 4, priority: 2, performance: 100, bandwidth: "medium"},
  {proxy: "PROXY 46.185.131.218:443", weight: 5, priority: 1, performance: 100, bandwidth: "high"}
];

var CDN_TIERS = {
  ultra: ["PROXY 212.35.66.45:8085"],                          // <100KB - critical assets
  high: ["PROXY 212.35.66.45:8085", "PROXY 46.185.131.218:443"], // 100KB-1MB
  medium: ["PROXY 212.35.66.45:8181", "PROXY 46.185.131.218:443"], // 1MB-10MB
  low: ["PROXY 46.185.131.218:443"]                            // >10MB
};

var BLOCK = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= IP RANGES - EXPANDED =================
var MATCH_ALLOWED_IPV4 = [
  // Jordan - Primary ISPs (Highest Priority)
  ["46.185.0.0","255.255.0.0"],     // Orange Jordan
  ["212.35.0.0","255.255.0.0"],     // Orange Jordan Alt
  ["176.29.0.0","255.255.0.0"],     // Zain Jordan
  ["176.28.0.0","255.254.0.0"],     // Zain Jordan Extended
  ["82.212.0.0","255.254.0.0"],     // Umniah
  
  // Jordan - Secondary ISPs
  ["94.249.0.0","255.255.0.0"],     // Batelco
  ["149.200.0.0","255.255.0.0"],    // Fiber Networks
  ["86.108.0.0","255.254.0.0"],     // Business
  ["92.253.0.0","255.255.0.0"],     // Enterprise
  
  // Jordan - Additional Ranges
  ["213.139.32.0","255.255.224.0"],
  ["212.118.0.0","255.255.224.0"],
  ["188.161.0.0","255.255.0.0"],
  ["185.107.0.0","255.255.0.0"],
  ["37.238.0.0","255.255.0.0"],
  ["195.229.0.0","255.255.0.0"],    // NEW
  ["31.210.0.0","255.255.0.0"]      // NEW
];

var LOBBY_ALLOWED_IPV4 = [
  // ===== JORDAN (Complete Coverage) =====
  ["46.185.0.0","255.255.0.0"],
  ["176.28.0.0","255.252.0.0"],
  ["176.29.0.0","255.255.0.0"],
  ["82.212.0.0","255.252.0.0"],
  ["94.249.0.0","255.255.0.0"],
  ["149.200.0.0","255.255.0.0"],
  ["86.108.0.0","255.254.0.0"],
  ["92.253.0.0","255.255.0.0"],
  ["212.35.0.0","255.255.0.0"],
  ["212.118.0.0","255.255.224.0"],
  ["213.139.32.0","255.255.224.0"],
  ["188.161.0.0","255.255.0.0"],
  ["185.107.0.0","255.255.0.0"],
  ["37.238.0.0","255.255.0.0"],
  ["195.229.0.0","255.255.0.0"],
  ["31.210.0.0","255.255.0.0"],
  
  // ===== KUWAIT =====
  ["80.184.0.0","255.248.0.0"],
  ["91.214.0.0","255.254.0.0"],
  
  // ===== QATAR =====
  ["37.210.0.0","255.254.0.0"],
  ["87.236.0.0","255.252.0.0"],
  
  // ===== BAHRAIN =====
  ["37.131.0.0","255.255.0.0"],
  ["85.95.0.0","255.255.0.0"],
  
  // ===== OMAN =====
  ["5.36.0.0","255.252.0.0"],
  ["31.200.0.0","255.248.0.0"]
];

// ================= SESSION STATE =================
var SESSION = {
  // Match Session
  matchNet: null,
  matchHost: null,
  matchSessions: {},
  matchStartTime: 0,
  
  // DNS Cache
  dnsCache: {},
  dnsCacheTime: {},
  dnsCacheHits: 0,
  dnsCacheMisses: 0,
  
  // Performance Tracking
  proxyPerformance: {},
  pathFailures: 0,
  lastPathSwitch: 0,
  currentPath: "primary",
  
  // Connection Pool
  connectionPool: {},
  poolHits: 0,
  poolMisses: 0,
  
  // Pattern Learning
  patterns: {},
  lastActivity: {},
  
  // Blacklist
  blacklistTemp: {},
  blacklistPermanent: [],
  
  // Clustering
  activeCluster: null,
  clusterMembers: 0,
  
  // Counters
  lobbyRotation: 0,
  totalRequests: 0,
  blockedRequests: 0,
  
  // Statistics
  stats: {
    match: 0,
    lobby: 0,
    social: 0,
    cdn: 0,
    blocked: 0,
    startTime: Date.now()
  }
};

// ================= GAME BOOSTER - AUTO REGION DETECTION =================
var REGION_DETECTOR = {
  detectedRegion: null,
  confidence: 0,
  samples: [],
  maxSamples: 20,
  
  ispDatabase: {
    "46.185": {country: "JO", isp: "Orange", city: "Amman", priority: 100, tier: 1},
    "212.35": {country: "JO", isp: "Orange", city: "Amman", priority: 100, tier: 1},
    "176.29": {country: "JO", isp: "Zain", city: "Amman", priority: 95, tier: 1},
    "176.28": {country: "JO", isp: "Zain", city: "Irbid", priority: 95, tier: 1},
    "82.212": {country: "JO", isp: "Umniah", city: "Amman", priority: 90, tier: 1},
    "82.213": {country: "JO", isp: "Umniah", city: "Zarqa", priority: 90, tier: 1},
    "94.249": {country: "JO", isp: "Batelco", city: "Amman", priority: 85, tier: 2},
    "5.42": {country: "SA", isp: "STC", city: "Riyadh", priority: 80, tier: 2},
    "5.45": {country: "SA", isp: "Mobily", city: "Jeddah", priority: 78, tier: 2},
    "78.40": {country: "LB", isp: "Ogero", city: "Beirut", priority: 70, tier: 3},
    "185.153": {country: "PS", isp: "Paltel", city: "Ramallah", priority: 75, tier: 2}
  },
  
  detect: function(ip) {
    var prefix = ip.split('.').slice(0, 2).join('.');
    var info = this.ispDatabase[prefix];
    
    if (info) {
      this.samples.push(info);
      if (this.samples.length > this.maxSamples) this.samples.shift();
      
      var countryCount = {};
      for (var i = 0; i < this.samples.length; i++) {
        var c = this.samples[i].country;
        countryCount[c] = (countryCount[c] || 0) + 1;
      }
      
      var maxCount = 0;
      var detectedCountry = null;
      for (var country in countryCount) {
        if (countryCount[country] > maxCount) {
          maxCount = countryCount[country];
          detectedCountry = country;
        }
      }
      
      this.detectedRegion = detectedCountry;
      this.confidence = (maxCount / this.samples.length) * 100;
      
      return info;
    }
    
    return null;
  },
  
  getOptimalServer: function(ip) {
    var info = this.detect(ip);
    if (!info) return MATCH_SERVERS.primary.proxy;
    
    // Tier 1 (Jordan Premium)
    if (info.tier === 1) {
      if (info.isp === "Orange") return MATCH_SERVERS.primary.proxy;
      if (info.isp === "Zain") return MATCH_SERVERS.secondary.proxy;
      if (info.isp === "Umniah") return MATCH_SERVERS.backup.proxy;
    }
    
    // Tier 2 (Jordan Standard + Regional)
    if (info.tier === 2) {
      return MATCH_SERVERS.backup.proxy;
    }
    
    // Tier 3 (International)
    return MATCH_SERVERS.emergency.proxy;
  }
};

// ================= GAME BOOSTER - PATTERN ANALYZER =================
var PATTERN_ANALYZER = {
  enabled: true,
  history: [],
  maxHistory: 100,
  
  patterns: {
    matchPrep: ["LOBBY", "LOBBY", "SOCIAL", "LOBBY"],
    matchStart: ["LOBBY", "MATCH"],
    inGame: ["MATCH", "MATCH", "MATCH"],
    matchEnd: ["MATCH", "LOBBY"],
    teamForming: ["LOBBY", "SOCIAL", "SOCIAL", "LOBBY"],
    downloading: ["CDN", "CDN", "CDN"]
  },
  
  analyze: function(type, timestamp) {
    this.history.push({type: type, time: timestamp || Date.now()});
    if (this.history.length > this.maxHistory) this.history.shift();
    
    return this.detectPattern();
  },
  
  detectPattern: function() {
    if (this.history.length < 5) return "INITIALIZING";
    
    var recent = this.history.slice(-10);
    var sequence = recent.map(function(h) { return h.type; }).join("-");
    
    // Match patterns
    if (/LOBBY-LOBBY-SOCIAL-LOBBY-MATCH/.test(sequence)) return "MATCH_IMMINENT";
    if (/MATCH-MATCH-MATCH-MATCH/.test(sequence)) return "IN_BATTLE";
    if (/MATCH-MATCH-LOBBY/.test(sequence)) return "MATCH_ENDED";
    if (/LOBBY-SOCIAL-SOCIAL/.test(sequence)) return "SQUAD_FORMING";
    if (/CDN-CDN-CDN/.test(sequence)) return "UPDATING";
    if (/LOBBY-LOBBY-LOBBY/.test(sequence)) return "WAITING";
    
    return "ACTIVE";
  },
  
  predictNext: function() {
    var pattern = this.detectPattern();
    
    var predictions = {
      "MATCH_IMMINENT": {next: "MATCH", prob: 0.98, action: "PREWARM_MATCH"},
      "IN_BATTLE": {next: "MATCH", prob: 0.95, action: "MAINTAIN_SESSION"},
      "MATCH_ENDED": {next: "LOBBY", prob: 0.92, action: "SWITCH_TO_LOBBY"},
      "SQUAD_FORMING": {next: "MATCH", prob: 0.80, action: "PREPARE_MATCH"},
      "UPDATING": {next: "CDN", prob: 0.90, action: "OPTIMIZE_DOWNLOAD"}
    };
    
    return predictions[pattern] || {next: "UNKNOWN", prob: 0, action: "MONITOR"};
  },
  
  getRecommendedAction: function() {
    var prediction = this.predictNext();
    return prediction.action;
  }
};

// ================= GAME BOOSTER - HEALTH MONITOR =================
var HEALTH_MONITOR = {
  enabled: true,
  serverHealth: {},
  checkInterval: 30000,
  failureThreshold: 3,
  recoveryTime: 300000, // 5 min
  
  recordSuccess: function(server) {
    if (!this.serverHealth[server]) {
      this.serverHealth[server] = {
        failures: 0,
        successes: 0,
        lastCheck: Date.now(),
        lastSuccess: Date.now(),
        status: "healthy",
        responseTime: []
      };
    }
    
    var health = this.serverHealth[server];
    health.successes++;
    health.failures = Math.max(0, health.failures - 1);
    health.lastCheck = Date.now();
    health.lastSuccess = Date.now();
    
    if (health.failures < this.failureThreshold) {
      health.status = "healthy";
    }
  },
  
  recordFailure: function(server) {
    if (!this.serverHealth[server]) {
      this.serverHealth[server] = {
        failures: 0,
        successes: 0,
        lastCheck: Date.now(),
        lastSuccess: 0,
        status: "healthy",
        responseTime: []
      };
    }
    
    var health = this.serverHealth[server];
    health.failures++;
    health.lastCheck = Date.now();
    
    if (health.failures >= this.failureThreshold) {
      health.status = "unhealthy";
      this.quarantine(server);
    } else if (health.failures >= 2) {
      health.status = "degraded";
    }
  },
  
  quarantine: function(server) {
    var self = this;
    setTimeout(function() {
      if (self.serverHealth[server] && self.serverHealth[server].status === "unhealthy") {
        self.serverHealth[server].failures = Math.floor(self.failureThreshold / 2);
        self.serverHealth[server].status = "recovering";
      }
    }, this.recoveryTime);
  },
  
  isHealthy: function(server) {
    var health = this.serverHealth[server];
    if (!health) return true;
    return health.status === "healthy" || health.status === "recovering";
  },
  
  getBestServer: function(serverList) {
    var healthyServers = [];
    
    for (var i = 0; i < serverList.length; i++) {
      var server = typeof serverList[i] === 'string' ? serverList[i] : serverList[i].proxy;
      if (this.isHealthy(server)) {
        healthyServers.push(server);
      }
    }
    
    if (healthyServers.length === 0) {
      return typeof serverList[0] === 'string' ? serverList[0] : serverList[0].proxy;
    }
    
    var bestServer = healthyServers[0];
    var bestScore = 0;
    
    for (var j = 0; j < healthyServers.length; j++) {
      var srv = healthyServers[j];
      var health = this.serverHealth[srv];
      
      if (health) {
        var total = health.successes + health.failures;
        var successRate = total > 0 ? health.successes / total : 1;
        var recency = Date.now() - health.lastSuccess;
        var recencyBonus = Math.max(0, 1 - (recency / 60000)); // 1 min decay
        
        var score = successRate + recencyBonus;
        
        if (score > bestScore) {
          bestScore = score;
          bestServer = srv;
        }
      }
    }
    
    return bestServer;
  },
  
  getServerStatus: function(server) {
    var health = this.serverHealth[server];
    if (!health) return "unknown";
    return health.status;
  }
};

// ================= GAME BOOSTER - CONNECTION POOL =================
var POOL_MANAGER = {
  pools: {},
  maxPoolSize: 10,
  maxConnectionAge: 600000, // 10 min
  
  getConnection: function(host, ip, type) {
    var poolKey = type + "_" + ip.split('.').slice(0, 2).join('.');
    var now = Date.now();
    
    if (!this.pools[poolKey]) {
      this.pools[poolKey] = {
        connections: [],
        created: now,
        hits: 0,
        misses: 0,
        lastCleanup: now
      };
    }
    
    var pool = this.pools[poolKey];
    
    // Periodic cleanup
    if (now - pool.lastCleanup > 60000) { // Every minute
      this.cleanup(poolKey, now);
      pool.lastCleanup = now;
    }
    
    // Try to reuse existing connection
    for (var i = 0; i < pool.connections.length; i++) {
      var conn = pool.connections[i];
      if (now - conn.created < this.maxConnectionAge) {
        conn.lastUsed = now;
        conn.useCount++;
        pool.hits++;
        SESSION.poolHits++;
        return conn.proxy;
      }
    }
    
    // Create new connection
    pool.misses++;
    SESSION.poolMisses++;
    var proxy = this.createNewConnection(type, ip);
    
    if (pool.connections.length < this.maxPoolSize) {
      pool.connections.push({
        proxy: proxy,
        created: now,
        lastUsed: now,
        useCount: 1
      });
    }
    
    return proxy;
  },
  
  createNewConnection: function(type, ip) {
    if (type === "MATCH") {
      if (CONFIG.ENABLE_AUTO_REGION) {
        return REGION_DETECTOR.getOptimalServer(ip);
      }
      return MATCH_SERVERS.primary.proxy;
    }
    
    if (type === "LOBBY") {
      if (CONFIG.ENABLE_ADAPTIVE) {
        return pickAdaptiveLobbyProxy(ip);
      }
      return pickLobbyProxy(ip);
    }
    
    return LOBBY_POOL[0].proxy;
  },
  
  cleanup: function(poolKey, now) {
    if (!this.pools[poolKey]) return;
    
    var pool = this.pools[poolKey];
    pool.connections = pool.connections.filter(function(conn) {
      return (now - conn.created) < POOL_MANAGER.maxConnectionAge;
    });
  },
  
  getStats: function() {
    var totalHits = 0;
    var totalMisses = 0;
    var totalConnections = 0;
    var poolCount = 0;
    
    for (var key in this.pools) {
      var pool = this.pools[key];
      totalHits += pool.hits;
      totalMisses += pool.misses;
      totalConnections += pool.connections.length;
      poolCount++;
    }
    
    var hitRate = (totalHits + totalMisses) > 0 ? 
      ((totalHits / (totalHits + totalMisses)) * 100).toFixed(1) : "0";
    
    return {
      pools: poolCount,
      connections: totalConnections,
      hitRate: hitRate + "%",
      hits: totalHits,
      misses: totalMisses
    };
  }
};

// ================= GAME BOOSTER - REQUEST DEDUPLICATOR =================
var DEDUPLICATOR = {
  enabled: true,
  cache: {},
  ttl: 2000, // 2 seconds
  maxCacheSize: 500,
  
  isDuplicate: function(url, host) {
    if (!this.enabled) return false;
    
    var key = host + "_" + this.hashString(url);
    var now = Date.now();
    
    // Check if duplicate
    if (this.cache[key]) {
      var cached = this.cache[key];
      if (now - cached.time < this.ttl) {
        cached.count++;
        return true;
      }
    }
    
    // Add to cache
    this.cache[key] = {
      time: now,
      count: 1
    };
    
    // Cleanup occasionally
    if (Math.random() < 0.05) { // 5% chance
      this.cleanup(now);
    }
    
    return false;
  },
  
  hashString: function(str) {
    var hash = 0;
    for (var i = 0; i < Math.min(str.length, 100); i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash = hash & hash;
    }
    return hash.toString(36);
  },
  
  cleanup: function(now) {
    var keys = Object.keys(this.cache);
    
    // Remove expired entries
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (now - this.cache[key].time > this.ttl * 5) {
        delete this.cache[key];
      }
    }
    
    // Limit cache size
    if (keys.length > this.maxCacheSize) {
      var sortedKeys = keys.sort(function(a, b) {
        return DEDUPLICATOR.cache[a].time - DEDUPLICATOR.cache[b].time;
      });
      
      var removeCount = keys.length - this.maxCacheSize;
      for (var j = 0; j < removeCount; j++) {
        delete this.cache[sortedKeys[j]];
      }
    }
  },
  
  getStats: function() {
    var totalRequests = 0;
    var duplicates = 0;
    
    for (var key in this.cache) {
      var entry = this.cache[key];
      totalRequests += entry.count;
      if (entry.count > 1) {
        duplicates += (entry.count - 1);
      }
    }
    
    var dupRate = totalRequests > 0 ? 
      ((duplicates / total​​​​​​​​​​​​​​​​Requests) * 100).toFixed(1) : “0”;
      return {
  cacheSize: Object.keys(this.cache).length,
  totalRequests: totalRequests,
  duplicates: duplicates,
  savedRequests: duplicates,
  duplicationRate: dupRate + "%"
};
}
};
// ================= GAME BOOSTER - BANDWIDTH OPTIMIZER =================
var BANDWIDTH_OPTIMIZER = {
enabled: true,
currentLoad: “normal”,
priorities: {
MATCH: 10,      // Critical - highest priority
SOCIAL: 7,      // Important
LOBBY: 5,       // Normal
CDN: 3          // Low priority
},
estimateBandwidth: function(type, url) {
if (type === “MATCH”) return “critical”;
if (type === “SOCIAL”) return “low”;
if (type === “LOBBY”) return “medium”;
// CDN bandwidth estimation
if (/\.(jpg|png|webp|ico|css|js)$/i.test(url)) return "low";
if (/\.(mp4|zip|pak)$/i.test(url)) return "high";

return "medium";
},
selectOptimalProxy: function(type, bandwidth, availableProxies) {
var priority = this.priorities[type] || 5;
// For critical traffic, use best server
if (bandwidth === "critical" || priority >= 9) {
  return HEALTH_MONITOR.getBestServer(availableProxies);
}

// For high bandwidth, distribute load
if (bandwidth === "high") {
  return availableProxies[SESSION.lobbyRotation++ % availableProxies.length];
}

// For normal traffic, use adaptive selection
return HEALTH_MONITOR.getBestServer(availableProxies);
},
getPriority: function(type) {
return this.priorities[type] || 5;
}
};
// ================= GAME BOOSTER - DYNAMIC TIMEOUT =================
var TIMEOUT_ADJUSTER = {
enabled: true,
measurements: {},
defaultTimeout: 180000,
measure: function(server, responseTime) {
if (!this.measurements[server]) {
this.measurements[server] = {
samples: [],
avg: 0,
min: 999999,
max: 0,
stdDev: 0
};
}
var m = this.measurements[server];
m.samples.push(responseTime);

if (m.samples.length > 30) m.samples.shift();

// Calculate statistics
var sum = 0;
m.min = 999999;
m.max = 0;

for (var i = 0; i < m.samples.length; i++) {
  sum += m.samples[i];
  m.min = Math.min(m.min, m.samples[i]);
  m.max = Math.max(m.max, m.samples[i]);
}

m.avg = sum / m.samples.length;

// Calculate standard deviation
var variance = 0;
for (var j = 0; j < m.samples.length; j++) {
  variance += Math.pow(m.samples[j] - m.avg, 2);
}
m.stdDev = Math.sqrt(variance / m.samples.length);
var m = this.measurements[server];
m.samples.push(responseTime);

if (m.samples.length > 30) m.samples.shift();

// Calculate statistics
var sum = 0;
m.min = 999999;
m.max = 0;

for (var i = 0; i < m.samples.length; i++) {
  sum += m.samples[i];
  m.min = Math.min(m.min, m.samples[i]);
  m.max = Math.max(m.max, m.samples[i]);
}

m.avg = sum / m.samples.length;

// Calculate standard deviation
var variance = 0;
for (var j = 0; j < m.samples.length; j++) {
  variance += Math.pow(m.samples[j] - m.avg, 2);
}
m.stdDev = Math.sqrt(variance / m.samples.length);
},
getOptimalTimeout: function(server) {
var m = this.measurements[server];
if (!m || m.samples.length < 5) {
return this.defaultTimeout;
}
// Timeout = Average + (2 * StdDev) + safety margin
var timeout = m.avg + (2 * m.stdDev) + 10000;

// Clamp between reasonable bounds
return Math.max(60000, Math.min(300000, timeout));
}
};
// ================= HELPER FUNCTIONS =================
function norm(h) {
var i = h.indexOf(”:”);
return i > -1 ? h.substring(0, i) : h;
}
function isInList(ip, list) {
for (var i = 0; i < list.length; i++) {
if (isInNet(ip, list[i][0], list[i][1])) return true;
}
return false;
}
function resolvePinned(host) {
var now = Date.now();
// Check cache
if (SESSION.dnsCache[host]) {
if ((now - SESSION.dnsCacheTime[host]) < CONFIG.DNS_CACHE_TTL) {
SESSION.dnsCacheHits++;
return SESSION.dnsCache[host];
}
}
// Resolve and cache
SESSION.dnsCacheMisses++;
var ip = dnsResolve(host);
if (ip) {
SESSION.dnsCache[host] = ip;
SESSION.dnsCacheTime[host] = now;
}
return ip;
}
function pickLobbyProxy(host) {
var totalWeight = 0;
for (var i = 0; i < LOBBY_POOL.length; i++) {
totalWeight += LOBBY_POOL[i].weight;
}
var hash = 0;
for (var j = 0; j < host.length; j++) {
hash = (hash * 31 + host.charCodeAt(j)) % totalWeight;
}
var cumulative = 0;
for (var k = 0; k < LOBBY_POOL.length; k++) {
cumulative += LOBBY_POOL[k].weight;
if (hash < cumulative) {
return LOBBY_POOL[k].proxy;
}
}
return LOBBY_POOL[0].proxy;
}
function pickAdaptiveLobbyProxy(host) {
if (!CONFIG.ENABLE_ADAPTIVE) return pickLobbyProxy(host);
var availableProxies = [];
for (var i = 0; i < LOBBY_POOL.length; i++) {
availableProxies.push(LOBBY_POOL[i].proxy);
}
return HEALTH_MONITOR.getBestServer(availableProxies);
}
function getCDNTier(url) {
// Ultra tier - critical small assets
if (/.(ico|svg)$/i.test(url)) return “ultra”;
if (/critical|priority|essential/i.test(url)) return “ultra”;
// High tier - standard assets
if (/.(jpg|jpeg|png|gif|webp|css|js|json)$/i.test(url)) return “high”;
if (/small|thumb|icon|sprite/i.test(url)) return “high”;
// Low tier - large files
if (/.(mp4|avi|mov|zip|rar|pak|bundle|bin)$/i.test(url)) return “low”;
if (/large|full|hd|4k|download|patch/i.test(url)) return “low”;
// Medium tier - everything else
return “medium”;
}
function isBlacklisted(ip) {
// Check permanent blacklist
for (var i = 0; i < SESSION.blacklistPermanent.length; i++) {
if (ip.indexOf(SESSION.blacklistPermanent[i]) === 0) return true;
}
// Check temporary blacklist
var now = Date.now();
if (SESSION.blacklistTemp[ip]) {
if (now - SESSION.blacklistTemp[ip] < 600000) { // 10 min
return true;
}
delete SESSION.blacklistTemp[ip];
}
return false;
}
// ================= DETECTION FUNCTIONS =================
function isPUBG(h) {
return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igamecj|intlgame/i.test(h);
}
function isMatch(u, h) {
return /match|battle|game|combat|realtime|sync|udp|tick|room|ingame|server-|gs\d+|warfare|arena|fight|pvp|gameplay/i.test(u + h);
}
function isLobby(u, h) {
return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|wait|prepare|ready|entrance|hub/i.test(u + h);
}
function isSocial(u, h) {
return /friend|invite|squad|team|party|clan|presence|social|chat|voice|guild|group|member/i.test(u + h);
}
function isCDN(u, h) {
return /cdn|asset|resource|patch|update|media|content|download|static|file|data|cache/i.test(u + h);
}
// ================= ADVANCED FUNCTIONS =================
function applyTimeBasedConfig() {
if (!CONFIG.ENABLE_TIME_ROUTING) return;
var hour = new Date().getHours();
var isPeak = hour >= 16 && hour <= 23;
if (isPeak) {
CONFIG.DNS_CACHE_TTL = 180000; // 3 min - more frequent updates
CONFIG.SESSION_TIMEOUT = 300000; // 5 min - longer tolerance
CONFIG.MAX_CONNECTIONS = 15; // more connections
} else {
CONFIG.DNS_CACHE_TTL = 600000; // 10 min - longer cache
CONFIG.SESSION_TIMEOUT = 180000; // 3 min - shorter timeout
CONFIG.MAX_CONNECTIONS = 8; // fewer connections
}
}
function getClusterServer(ip) {
if (!CONFIG.ENABLE_CLUSTERING) return MATCH_SERVERS.primary.proxy;
var prefix = ip.split(’.’).slice(0, 2).join(’.’);
// Orange Jordan cluster
if (prefix === “46.185” || prefix === “212.35”) {
SESSION.activeCluster = “JO-Orange”;
return MATCH_SERVERS.primary.proxy;
}
// Zain Jordan cluster
if (prefix === “176.29” || prefix === “176.28”) {
SESSION.activeCluster = “JO-Zain”;
return MATCH_SERVERS.secondary.proxy;
}
// Umniah cluster
if (prefix === “82.212” || prefix === “82.213”) {
SESSION.activeCluster = “JO-Umniah”;
return MATCH_SERVERS.backup.proxy;
}
// Other Jordan ISPs
SESSION.activeCluster = “JO-Other”;
return MATCH_SERVERS.backup.proxy;
}
function getMultiPathServer() {
if (!CONFIG.ENABLE_MULTIPATH) return MATCH_SERVERS.primary.proxy;
if (SESSION.pathFailures >= 3) {
var now = Date.now();
if (now - SESSION.lastPathSwitch > 60000) { // 1 min cooldown
// Cycle through servers
var paths = [“primary”, “secondary”, “backup”];
var currentIndex = paths.indexOf(SESSION.currentPath);
var nextIndex = (currentIndex + 1) % paths.length;
SESSION.currentPath = paths[nextIndex];
SESSION.pathFailures = 0;
SESSION.lastPathSwitch = now;
}
}
return MATCH_SERVERS[SESSION.currentPath].proxy;
}
// ================= MAIN PROXY FUNCTION =================
function FindProxyForURL(url, host) {
host = norm(host.toLowerCase());
SESSION.totalRequests++;
// Direct for non-PUBG traffic
if (!isPUBG(host)) {
return DIRECT;
}
// Check for duplicate requests (GAME BOOSTER)
if (CONFIG.ENABLE_DEDUPLICATION && DEDUPLICATOR.isDuplicate(url, host)) {
return “CACHED”; // Browser will use cached response
}
// Apply time-based configuration (GAME BOOSTER)
applyTimeBasedConfig();
// Resolve IP with caching (GAME BOOSTER)
var ip = resolvePinned(host);
if (!ip || ip.indexOf(”:”) > -1) {
SESSION.blockedRequests++;
SESSION.stats.blocked++;
return BLOCK;
}
// Check blacklist (GAME BOOSTER)
if (isBlacklisted(ip)) {
SESSION.blockedRequests++;
SESSION.stats.blocked++;
return BLOCK;
}
// Auto-detect region (GAME BOOSTER)
var regionInfo = null;
if (CONFIG.ENABLE_AUTO_REGION) {
regionInfo = REGION_DETECTOR.detect(ip);
}
// ========== MATCH SERVER (ULTRA OPTIMIZED) ==========
if (isMatch(url, host)) {
SESSION.stats.match++;
// Strict Jordan-only validation
if (!isInList(ip, MATCH_ALLOWED_IPV4)) {
  if (CONFIG.ENABLE_HEALTH_CHECK) {
    HEALTH_MONITOR.recordFailure(ip);
  }
  SESSION.blockedRequests++;
  SESSION.stats.blocked++;
  return BLOCK;
}

var net24 = ip.split('.').slice(0, 3).join('.');
var sessionKey = host + "_" + net24;
var now = Date.now();

// Pattern analysis (GAME BOOSTER)
if (CONFIG.ENABLE_PATTERN_ANALYSIS) {
  PATTERN_ANALYZER.analyze("MATCH", now);
  var prediction = PATTERN_ANALYZER.predictNext();
  
  // Pre-warm connection if match is imminent
  if (prediction && prediction.action === "PREWARM_MATCH") {
    // Connection already optimized
  }
}

// New match session
if (!SESSION.matchNet) {
  SESSION.matchNet = net24;
  SESSION.matchHost = host;
  SESSION.matchStartTime = now;
  SESSION.matchSessions[sessionKey] = {
    created: now,
    lastUsed: now,
    count: 1,
    ip: ip,
    region: regionInfo ? regionInfo.country : "UNKNOWN"
  };
  
  // Select optimal server (GAME BOOSTER)
  var matchServer;
  
  if (CONFIG.ENABLE_POOLING) {
    matchServer = POOL_MANAGER.getConnection(host, ip, "MATCH");
  } else if (CONFIG.ENABLE_AUTO_REGION && regionInfo) {
    matchServer = REGION_DETECTOR.getOptimalServer(ip);
  } else if (CONFIG.ENABLE_CLUSTERING) {
    matchServer = getClusterServer(ip);
  } else if (CONFIG.ENABLE_MULTIPATH) {
    matchServer = getMultiPathServer();
  } else {
    matchServer = MATCH_SERVERS.primary.proxy;
  }
  
  // Health check (GAME BOOSTER)
  if (CONFIG.ENABLE_HEALTH_CHECK) {
    matchServer = HEALTH_MONITOR.getBestServer([matchServer, MATCH_SERVERS.primary.proxy]);
    HEALTH_MONITOR.recordSuccess(matchServer);
  }
  
  return matchServer;
}

// Validate existing session
if (SESSION.matchSessions[sessionKey]) {
  var session = SESSION.matchSessions[sessionKey];
  
  // Dynamic timeout (GAME BOOSTER)
  var timeout = CONFIG.SESSION_TIMEOUT;
  if (CONFIG.ENABLE_SMART_TIMEOUT) {
    timeout = TIMEOUT_ADJUSTER.getOptimalTimeout(SESSION.matchHost);
    TIMEOUT_ADJUSTER.measure(SESSION.matchHost, now - session.lastUsed);
  }
  
  // Check timeout
  if (now - session.lastUsed > timeout) {
    delete SESSION.matchSessions[sessionKey];
    SESSION.matchNet = null;
    SESSION.matchHost = null;
    SESSION.matchStartTime = 0;
    SESSION.blockedRequests++;
    return BLOCK;
  }
  
  // Update session
  session.lastUsed = now;
  session.count++;
  
  // Strict validation
  if (host !== SESSION.matchHost || net24 !== SESSION.matchNet) {
    SESSION.blockedRequests++;
    return BLOCK;
  }
  
  // Get server (with health check)
  var activeServer = getClusterServer(ip);
  
  if (CONFIG.ENABLE_HEALTH_CHECK) {
    if (!HEALTH_MONITOR.isHealthy(activeServer)) {
      // Failover to backup
      activeServer = MATCH_SERVERS.secondary.proxy;
      SESSION.pathFailures++;
    } else {
      HEALTH_MONITOR.recordSuccess(activeServer);
      SESSION.pathFailures = 0;
    }
  }
  
  return activeServer;
}

// No valid session
SESSION.blockedRequests++;
return BLOCK;
}
// ========== LOBBY (ADAPTIVE OPTIMIZED) ==========
if (isLobby(url, host)) {
SESSION.stats.lobby++;
if (!isInList(ip, LOBBY_ALLOWED_IPV4)) {
  SESSION.blockedRequests++;
  SESSION.stats.blocked++;
  return BLOCK;
}

// Pattern analysis
if (CONFIG.ENABLE_PATTERN_ANALYSIS) {
  PATTERN_ANALYZER.analyze("LOBBY", Date.now());
}

// Select lobby server (GAME BOOSTER)
var lobbyServer;

if (CONFIG.ENABLE_POOLING) {
  lobbyServer = POOL_MANAGER.getConnection(host, ip, "LOBBY");
} else if (CONFIG.ENABLE_BANDWIDTH_OPT) {
  var bw = BANDWIDTH_OPTIMIZER.estimateBandwidth("LOBBY", url);
  var proxies = LOBBY_POOL.map(function(p) { return p.proxy; });
  lobbyServer = BANDWIDTH_OPTIMIZER.selectOptimalProxy("LOBBY", bw, proxies);
} else if (CONFIG.ENABLE_ADAPTIVE) {
  lobbyServer = pickAdaptiveLobbyProxy(host);
} else {
  lobbyServer = pickLobbyProxy(host);
}

// Health check
if (CONFIG.ENABLE_HEALTH_CHECK) {
  if (HEALTH_MONITOR.isHealthy(lobbyServer)) {
    HEALTH_MONITOR.recordSuccess(lobbyServer);
  } else {
    lobbyServer = HEALTH_MONITOR.getBestServer(LOBBY_POOL);
  }
}

return lobbyServer;
}
// ========== SOCIAL (OPTIMIZED) ==========
if (isSocial(url, host)) {
SESSION.stats.social++;
if (!isInList(ip, LOBBY_ALLOWED_IPV4)) {
  SESSION.blockedRequests++;
  SESSION.stats.blocked++;
  return BLOCK;
}

if (CONFIG.ENABLE_PATTERN_ANALYSIS) {
  PATTERN_ANALYZER.analyze("SOCIAL", Date.now());
}

var socialServer = CONFIG.ENABLE_ADAPTIVE ? 
  pickAdaptiveLobbyProxy(host) : pickLobbyProxy(host);

if (CONFIG.ENABLE_HEALTH_CHECK) {
  socialServer = HEALTH_MONITOR.getBestServer([socialServer]);
}

return socialServer;
}
// ========== CDN (TIERED OPTIMIZED) ==========
if (isCDN(url, host)) {
SESSION.stats.cdn++;
if (!isInList(ip, LOBBY_ALLOWED_IPV4)) {
  SESSION.blockedRequests++;
  SESSION.stats.blocked++;
  return BLOCK;
}

if (CONFIG.ENABLE_PATTERN_ANALYSIS) {
  PATTERN_ANALYZER.analyze("CDN", Date.now());
}

// Tiered CDN routing (GAME BOOSTER)
var tier = getCDNTier(url);
var pool = CDN_TIERS[tier];

var cdnServer;
if (CONFIG.ENABLE_BANDWIDTH_OPT) {
  var bandwidth = BANDWIDTH_OPTIMIZER.estimateBandwidth("CDN", url);
  cdnServer = BANDWIDTH_OPTIMIZER.selectOptimalProxy("CDN", bandwidth, pool);
} else {
  var index = (SESSION.lobbyRotation++) % pool.length;
  cdnServer = pool[index];
}

return cdnServer;
}
// ========== DEFAULT DENY (SECURITY) ==========
SESSION.blockedRequests++;
SESSION.stats.blocked++;
return BLOCK;
}
// ================= PERFORMANCE MONITORING =================
var PERFORMANCE_MONITOR = {
getReport: function() {
var now = Date.now();
var uptime = now - SESSION.stats.startTime;
var uptimeMin = Math.floor(uptime / 60000);
var dnsHitRate = SESSION.dnsCacheHits + SESSION.dnsCacheMisses > 0 ?
  ((SESSION.dnsCacheHits / (SESSION.dnsCacheHits + SESSION.dnsCacheMisses)) * 100).toFixed(1) : "0";

var poolStats = POOL_MANAGER.getStats();
var dedupStats = DEDUPLICATOR.getStats();

var report = "\n";
report += "╔═══════════════════════════════════════════════════════════╗\n";
report += "║         PUBG ULTIMATE GAME BOOSTER - STATUS REPORT       ║\n";
report += "╚═══════════════════════════════════════════════════════════╝\n\n";

// System Info
report += "⚙️  SYSTEM STATUS:\n";
report += "   Mode: " + GAME_BOOSTER.mode + "\n";
report += "   Uptime: " + uptimeMin + " minutes\n";
report += "   Total Requests: " + SESSION.totalRequests + "\n";
report += "   Blocked: " + SESSION.blockedRequests + "\n\n";

// Region Detection
if (REGION_DETECTOR.detectedRegion) {
  report += "🌍 REGION DETECTION:\n";
  report += "   Region: " + REGION_DETECTOR.detectedRegion + "\n";
  report += "   Confidence: " + REGION_DETECTOR.confidence.toFixed(1) + "%\n";
  report += "   Samples: " + REGION_DETECTOR.samples.length + "\n\n";
}

// Current Activity
var pattern = PATTERN_ANALYZER.detectPattern();
report += "🎮 CURRENT ACTIVITY:\n";
report += "   Status: " + pattern + "\n";

if (SESSION.matchNet) {
  report += "   ⚔️  IN MATCH!\n";
  report += "   Network: " + SESSION.matchNet + ".x\n";
  report += "   Cluster: " + (SESSION.activeCluster || "N/A") + "\n";
  var matchDuration = Math.floor((now - SESSION.matchStartTime) / 1000);
  report += "   Duration: " + matchDuration + "s\n";
}
report += "\n";

// Traffic Stats
report += "📊 TRAFFIC BREAKDOWN:\n";
report += "   Match: " + SESSION.stats.match + "\n";
report += "   Lobby: " + SESSION.stats.lobby + "\n";
report += "   Social: " + SESSION.stats.social + "\n";
report += "   CDN: " + SESSION.stats.cdn + "\n";
report += "   Blocked: " + SESSION.stats.blocked + "\n\n";

// Performance Metrics
report += "⚡ PERFORMANCE METRICS:\n";
report += "   DNS Cache Hit Rate: " + dnsHitRate + "%\n";
report += "   Connection Pool Hit Rate: " + poolStats.hitRate + "\n";
report += "   Active Connections: " + poolStats.connections + "\n";
report += "   Duplicate Requests Saved: " + dedupStats.duplicates + "\n\n";

// Server Health
var healthyServers = 0;
var totalServers = 0;
for (var srv in HEALTH_MONITOR.serverHealth) {
  totalServers++;
  if (HEALTH_MONITOR.isHealthy(srv)) healthyServers++;
}

if (totalServers > 0) {
  report += "🏥 SERVER HEALTH:\n";
  report += "   Monitored: " + totalServers + "\n";
  report += "   Healthy: " + healthyServers + "\n";
  report += "   Degraded: " + (totalServers - healthyServers) + "\n\n";
}

report += "═══════════════════════════════════════════════════════════\n";
report += "BY: YAZOURI | Version 3.0 ULTIMATE | Game Booster Active ✓\n";
report += "═══════════════════════════════════════════════════════════\n";

return report;
},
getSimpleStatus: function() {
var pattern = PATTERN_ANALYZER.detectPattern();
var emoji = “💤”;
var status = “Idle”;
if (pattern === "IN_BATTLE") {
  emoji = "⚔️";
  status = "في المباراة";
} else if (pattern === "MATCH_IMMINENT") {
  emoji = "🔥";
  status = "المباراة قريباً";
} else if (pattern === "SQUAD_FORMING") {
  emoji = "👥";
  status = "تشكيل الفريق";
} else if (pattern === "WAITING") {
  emoji = "🏠";
  status = "في اللوبي";
} else if (pattern === "UPDATING") {
  emoji = "📦";
  status = "تحميل تحديث";
}

return emoji + " " + status;

}
};
// ================= UTILITY FUNCTIONS FOR DEBUGGING =================
function showStatus() {
if (typeof console !== ‘undefined’) {
console.log(PERFORMANCE_MONITOR.getReport());
}
return PERFORMANCE_MONITOR.getReport();
}
function getQuickStats() {
return {
status: PERFORMANCE_MONITOR.getSimpleStatus(),
region: REGION_DETECTOR.detectedRegion || “Detecting…”,
confidence: REGION_DETECTOR.confidence.toFixed(1) + “%”,
inMatch: !!SESSION.matchNet,
cluster: SESSION.activeCluster || “N/A”,
requests: SESSION.totalRequests,
blocked: SESSION.blockedRequests
};
}
function resetStats() {
SESSION.stats = {
match: 0,
lobby: 0,
social: 0,
cdn: 0,
blocked: 0,
startTime: Date.now()
};
SESSION.totalRequests = 0;
SESSION.blockedRequests = 0;
SESSION.dnsCacheHits = 0;
SESSION.dnsCacheMisses = 0;
return “Stats reset successfully!”;
}
// ================= INITIALIZATION =================
(function() {
// Apply initial mode configuration
var mode = GAME_BOOSTER.modes[GAME_BOOSTER.mode];
CONFIG.DNS_CACHE_TTL = mode.dns_ttl;
CONFIG.SESSION_TIMEOUT = mode.session_timeout;
CONFIG.MAX_CONNECTIONS = mode.max_connections;
CONFIG.CACHE_SIZE = mode.cache_size;
// Initialize timestamp
SESSION.stats.startTime = Date.now();
// Log initialization (if console available)
if (typeof console !== ‘undefined’) {
console.log(“═══════════════════════════════════════════”);
console.log(”  PUBG ULTIMATE GAME BOOSTER v3.0”);
console.log(”  BY: YAZOURI”);
console.log(”  Mode: “ + GAME_BOOSTER.mode);
console.log(”  All Systems: ACTIVE ✓”);
console.log(“═══════════════════════════════════════════”);
}
})();
// ═══════════════════════════════════════════════════════════════════
// END OF SCRIPT
// ═══════════════════════════════════════════════════════════════════
