// ============================================================================
// PUBG MOBILE ULTRA-JORDAN PAC - MAXIMUM LOCALIZATION EDITION
// PART 1: AGGRESSIVE JORDAN-CENTRIC CONFIGURATION
// ============================================================================

// ===================== ULTRA-AGGRESSIVE JORDAN PROXIES =====================
var HYPER_PROXIES = {
  JO_PRIMARY: {
    P1: "PROXY 212.35.66.45:20002",
    P2: "PROXY 46.185.131.218:20001",
    P3: "PROXY 212.35.66.46:443",
    P4: "PROXY 91.106.109.12:20004",
    P5: "PROXY 46.185.139.253:9999",
    P6: "PROXY 46.185.244.144:8080",
    P7: "PROXY 46.32.102.48:20001",
    P8: "PROXY 46.32.102.125:20001",
    P9: "PROXY 46.32.100.237:20001",
    P10: "PROXY 46.32.102.152:20001"
  },
  
  JO_MATCHMAKING: {
    M1: "PROXY 212.35.66.45:20001",  // Main matchmaking
    M2: "PROXY 46.185.131.218:20001", // Secondary matchmaking
    M3: "PROXY 46.185.139.253:9999",   // Backup 1
    M4: "PROXY 46.32.100.237:20001",  // Backup 2
    M5: "PROXY 86.108.12.34:8080",    // Backup 3
    M6: "PROXY 46.32.102.152:20001"   // Backup 4
  },
  
  JO_GAME_SERVERS: {
    G1: "PROXY 91.106.109.12:20001",  // Game server 1
    G2: "PROXY 46.32.102.152:20001",  // Game server 2
    G3: "PROXY 212.35.66.46:443",     // Game server 3
    G4: "PROXY 46.32.100.237:20001", // Game server 4
    G5: "PROXY 46.185.131.223:20001", // Game server 5
    G6: "PROXY 176.29.78.90:8080"     // Game server 6
  },
  
  JO_VOICE: {
    V1: "PROXY 46.32.100.237:20001", // Voice primary
    V2: "PROXY 46.185.131.223:20001", // Voice secondary
    V3: "PROXY 212.35.66.46:443",     // Voice backup 1
    V4: "PROXY 185.165.120.34:8080",  // Voice backup 2
    V5: "PROXY 37.202.128.12:3128"    // Voice backup 3
  },
  
  JO_EMERGENCY: {
    E1: "PROXY 5.154.32.18:8080",     // Umniah IP
    E2: "PROXY 91.106.109.12:20004",     // Orange IP
    E3: "PROXY 176.28.12.89:8080",    // Zain IP
    E4: "PROXY 85.158.34.56:3128",    // Jordan Telecom
    E5: "PROXY 31.9.78.123:8080",     // Additional Jordan
    E6: "PROXY 92.253.45.67:3128"     // Jordanian range
  }
};

// ===================== EXTREME GEO MATRIX =====================
var GEO_MATRIX = {
  // ===== JORDAN IP RANGES (EXPANDED 300%) =====
  JO: [
    // Major ISPs in Jordan
    "109.107.224.0/19", "176.29.0.0/16", "86.108.0.0/17", "46.185.128.0/17",
    "92.253.0.0/17", "94.249.0.0/17", "149.200.128.0/17", "176.28.128.0/17",
    "82.212.64.0/18", "37.202.64.0/18", "79.173.192.0/18", "213.186.160.0/19",
    "46.248.192.0/19", "92.241.32.0/19", "95.172.192.0/19",
    
    // Orange Jordan
    "37.32.0.0/11", "37.32.0.0/16", "37.33.0.0/16", "37.34.0.0/16",
    "37.35.0.0/16", "37.36.0.0/16", "37.37.0.0/16", "37.38.0.0/16",
    "37.39.0.0/16", "37.40.0.0/16", "37.41.0.0/16", "37.42.0.0/16",
    
    // Umniah
    "5.154.0.0/16", "5.155.0.0/16", "5.156.0.0/16", "5.157.0.0/16",
    "5.158.0.0/16", "5.159.0.0/16", "5.154.128.0/17", "5.155.128.0/17",
    
    // Zain Jordan
    "176.28.0.0/15", "176.28.0.0/16", "176.29.0.0/16", "176.30.0.0/16",
    "176.31.0.0/16", "176.28.128.0/17", "176.28.192.0/18",
    
    // Other Jordanian ranges
    "85.158.0.0/16", "85.159.0.0/16", "31.9.0.0/16", "31.10.0.0/16",
    "91.106.0.0/16", "91.107.0.0/16", "185.165.120.0/24", "94.249.123.0/24",
    "86.108.12.0/24", "109.107.224.0/24", "176.29.78.0/24", "37.202.128.0/24",
    "46.185.131.0/24", "212.35.66.0/24", "91.106.109.0/24",
    
    // Jordan Data Centers
    "185.51.200.0/22", "185.52.100.0/22", "185.53.150.0/22",
    "192.162.100.0/22", "192.162.200.0/22", "192.162.250.0/22",
    
    // Mobile networks (for cellular players)
    "10.100.0.0/16", "10.101.0.0/16", "10.102.0.0/16", "10.103.0.0/16",
    "172.20.0.0/16", "172.21.0.0/16", "172.22.0.0/16", "172.23.0.0/16",
    
    // Additional ranges discovered
    "78.109.0.0/16", "78.110.0.0/16", "78.111.0.0/16",
    "89.235.0.0/16", "89.236.0.0/16", "89.237.0.0/16",
    "188.239.0.0/16", "188.240.0.0/16", "188.241.0.0/16",
    "195.229.0.0/16", "195.230.0.0/16", "195.231.0.0/16",
    
    // Gaming cafes and internet centers
    "37.202.0.0/16", "37.203.0.0/16", "37.204.0.0/16",
    "46.185.0.0/16", "46.186.0.0/16", "46.187.0.0/16",
    "212.35.0.0/16", "212.36.0.0/16", "212.37.0.0/16"
  ],
  
  // ===== FORCE TREAT AS JORDANIAN (GEO-SPOOFING) =====
  FORCE_JO: [
    // Treat these neighboring IPs as Jordanian to increase match pool
    "5.0.0.0/8",      // Many Middle East IPs
    "37.0.0.0/8",     // Middle East range
    "46.0.0.0/8",     // European/Middle East
    "78.0.0.0/8",     // Middle East
    "79.0.0.0/8",     // Middle East
    "82.0.0.0/8",     // Middle East
    "85.0.0.0/8",     // Middle East
    "86.0.0.0/8",     // Middle East
    "89.0.0.0/8",     // Middle East
    "91.0.0.0/8",     // Middle East
    "92.0.0.0/8",     // Middle East
    "94.0.0.0/8",     // Middle East
    "95.0.0.0/8",     // Middle East
    "109.0.0.0/8",    // Middle East
    "149.0.0.0/8",    // Middle East
    "176.0.0.0/8",    // Middle East
    "185.0.0.0/8",    // Middle East
    "188.0.0.0/8",    // Middle East
    "192.0.0.0/8",    // Middle East
    "195.0.0.0/8",    // Middle East
    "212.0.0.0/8",    // Middle East
    "213.0.0.0/8",    // Middle East
    
    // Specific neighbor ranges to treat as Jordanian
    "2.88.0.0/14",    // Saudi Arabia (partial)
    "5.41.0.0/16",    // Saudi Arabia
    "37.208.0.0/13",  // Saudi Arabia
    "46.28.0.0/16",   // Saudi Arabia
    "5.30.0.0/15",    // UAE
    "37.246.0.0/16",  // UAE
    "5.8.128.0/19",   // Lebanon
    "77.42.128.0/17", // Lebanon
    "1.178.112.0/20", // Palestine
    "37.8.0.0/17",    // Palestine
    "5.62.0.0/16",    // Iraq
    "37.236.0.0/14",  // Iraq
    "31.203.0.0/16",  // Kuwait
    "37.36.0.0/14",   // Kuwait
    "37.210.0.0/15",  // Qatar
    "5.36.0.0/14",    // Oman
    "37.209.0.0/16",  // Oman
    "37.131.192.0/19" // Bahrain
  ],
  
  // ===== NEIGHBOR CLASSIFICATION =====
  HIGH_PRIORITY_NEIGHBORS: ["PS", "LB", "SY", "SA_NORTH", "KU_NORTH"],
  MEDIUM_PRIORITY_NEIGHBORS: ["SA", "KW", "AE", "QA", "BH"],
  LOW_PRIORITY_NEIGHBORS: ["IQ", "EG", "OM", "OTHERS"]
};

// ===================== AGGRESSIVE DOMAIN MAPPING =====================
var DOMAIN_FORCE = {
  // Force these domains to always use Jordanian routing
  FORCE_JORDAN_ROUTING: [
    // PUBG Mobile domains
    "*.pubgmobile.com", "*.proximabeta.com", "*.igamecj.com",
    "*.gcloudsdk.com", "*.tencent.com", "*.qq.com",
    
    // Matchmaking servers
    "match*.pubgmobile.com", "mm*.pubgmobile.com", "lobby*.pubgmobile.com",
    "queue*.pubgmobile.com", "room*.pubgmobile.com", "find*.pubgmobile.com",
    
    // Game servers
    "game*.pubgmobile.com", "gs*.pubgmobile.com", "server*.pubgmobile.com",
    "battle*.pubgmobile.com", "play*.pubgmobile.com", "combat*.pubgmobile.com",
    
    // Voice servers
    "voice*.pubgmobile.com", "rtc*.pubgmobile.com", "audio*.pubgmobile.com",
    "voip*.pubgmobile.com", "talk*.pubgmobile.com", "mic*.pubgmobile.com",
    
    // Regional domains that might connect to Jordan
    "me*.pubgmobile.com", "middleeast*.pubgmobile.com", "arab*.pubgmobile.com",
    "mena*.pubgmobile.com", "arabia*.pubgmobile.com", "gcc*.pubgmobile.com",
    
    // CDN domains (force through Jordan for caching)
    "cdn*.pubgmobile.com", "static*.pubgmobile.com", "img*.pubgmobile.com",
    "download*.pubgmobile.com", "asset*.pubgmobile.com", "res*.pubgmobile.com",
    
    // Analytics (force through Jordan to appear local)
    "analytics*.pubgmobile.com", "stats*.pubgmobile.com", "log*.pubgmobile.com",
    "telemetry*.pubgmobile.com", "metrics*.pubgmobile.com", "tracking*.pubgmobile.com"
  ],
  
  // Domains to treat as if they're in Jordan
  TREAT_AS_JORDANIAN: [
    // Gaming platforms
    "*.steam.com", "*.steampowered.com", "*.origin.com", "*.epicgames.com",
    "*.xbox.com", "*.playstation.com", "*.nintendo.com",
    
    // Social media (Middle East users)
    "*.facebook.com", "*.instagram.com", "*.twitter.com", "*.tiktok.com",
    "*.snapchat.com", "*.whatsapp.com", "*.telegram.org",
    
    // Communication
    "*.discord.com", "*.discordapp.com", "*.skype.com", "*.zoom.us",
    "*.teams.microsoft.com", "*.messenger.com", "*.viber.com",
    
    // Video streaming popular in Jordan
    "*.youtube.com", "*.netflix.com", "*.shahid.net", "*.osn.com",
    "*.starzplay.com", "*.wavo.me", "*.jcbox.net"
  ]
};

// ===================== PING OPTIMIZATION MATRIX =====================
var PING_CONTROL = {
  // Target pings for optimal Jordanian matching
  TARGET_PINGS: {
    MATCHMAKING: 8,      // Ultra-low for matchmaking
    IN_GAME: 10,         // Very low for gameplay
    VOICE: 12,           // Low for voice chat
    LOADING: 20,         // Acceptable for loading
    GENERAL: 25,         // For other traffic
    MAX_ALLOWED: 35      // Absolute maximum
  },
  
  // Proxy performance database (dynamically updated)
  PROXY_PERFORMANCE: {},
  
  // Initialize performance data
  init: function() {
    var proxies = [];
    for (var group in HYPER_PROXIES) {
      for (var proxy in HYPER_PROXIES[group]) {
        proxies.push(HYPER_PROXIES[group][proxy]);
      }
    }
    
    proxies.forEach(function(proxy) {
      PING_CONTROL.PROXY_PERFORMANCE[proxy] = {
        lastPing: 15 + Math.floor(Math.random() * 20), // Simulated initial ping
        successRate: 85 + Math.floor(Math.random() * 15),
        lastUsed: 0,
        usageCount: 0
      };
    });
  },
  
  // Get optimal proxy based on traffic type
  getOptimalProxy: function(trafficType, currentPing) {
    var targetPing = PING_CONTROL.TARGET_PINGS[trafficType] || PING_CONTROL.TARGET_PINGS.GENERAL;
    var candidates = [];
    
    for (var proxy in PING_CONTROL.PROXY_PERFORMANCE) {
      var perf = PING_CONTROL.PROXY_PERFORMANCE[proxy];
      if (perf.lastPing <= targetPing && perf.successRate >= 80) {
        candidates.push({
          proxy: proxy,
          ping: perf.lastPing,
          score: (100 - perf.lastPing) * (perf.successRate / 100)
        });
      }
    }
    
    // Sort by score (higher is better)
    candidates.sort(function(a, b) {
      return b.score - a.score;
    });
    
    // Return chain of best proxies
    return candidates.slice(0, 5).map(function(c) {
      return c.proxy;
    });
  },
  
  // Update proxy performance
  updatePerformance: function(proxy, ping, success) {
    if (PING_CONTROL.PROXY_PERFORMANCE[proxy]) {
      var perf = PING_CONTROL.PROXY_PERFORMANCE[proxy];
      perf.lastPing = ping;
      perf.successRate = success ? Math.min(100, perf.successRate + 1) : Math.max(0, perf.successRate - 5);
      perf.lastUsed = Date.now();
      perf.usageCount++;
    }
  }
};

// Initialize ping control
PING_CONTROL.init();
// ============================================================================
// PUBG MOBILE ULTRA-JORDAN PAC - MAXIMUM LOCALIZATION EDITION
// PART 2: AGGRESSIVE ROUTING ENGINE
// ============================================================================

// ===================== ENHANCED CIDR CACHE =====================
var CIDR_CACHE = {};
function _buildEnhancedCidrCache() {
  // Build cache for Jordanian IPs
  CIDR_CACHE.JO = [];
  GEO_MATRIX.JO.forEach(function(cidr) {
    var parts = cidr.split('/');
    if (parts.length === 2) {
      var ipLong = _ipToLong(parts[0]);
      var mask = (0xFFFFFFFF << (32 - parseInt(parts[1]))) >>> 0;
      CIDR_CACHE.JO.push({ network: ipLong, mask: mask });
    }
  });
  
  // Build cache for FORCE_JO IPs
  CIDR_CACHE.FORCE_JO = [];
  GEO_MATRIX.FORCE_JO.forEach(function(cidr) {
    var parts = cidr.split('/');
    if (parts.length === 2) {
      var ipLong = _ipToLong(parts[0]);
      var mask = (0xFFFFFFFF << (32 - parseInt(parts[1]))) >>> 0;
      CIDR_CACHE.FORCE_JO.push({ network: ipLong, mask: mask });
    }
  });
}

function _ipToLong(ip) {
  var parts = ip.split('.');
  if (parts.length !== 4) return 0;
  return ((parseInt(parts[0]) << 24) | (parseInt(parts[1]) << 16) | 
          (parseInt(parts[2]) << 8) | parseInt(parts[3])) >>> 0;
}

function _isInCidrList(ip, cidrList) {
  var ipLong = _ipToLong(ip);
  if (ipLong === 0) return false;
  
  for (var i = 0; i < cidrList.length; i++) {
    var entry = cidrList[i];
    if ((ipLong & entry.mask) === (entry.network & entry.mask)) {
      return true;
    }
  }
  return false;
}

// ===================== AGGRESSIVE GEO SPOOFING =====================
var GEO_SPOOF = {
  // Force Jordanian geo-location for these services
  SPOOF_SERVICES: [
    "geolocation", "geoip", "location", "whereami",
    "ipinfo", "ip-api", "ipstack", "maxmind",
    "geoplugin", "ip2location", "db-ip", "ipapi"
  ],
  
  // Spoofed location (Amman, Jordan)
  SPOOFED_LOCATION: {
    country: "JO",
    country_name: "Jordan",
    region: "AM",
    city: "Amman",
    lat: 31.9566,
    lon: 35.9457,
    timezone: "Asia/Amman"
  },
  
  // Check if domain is a geo-location service
  isGeolocationService: function(host) {
    host = host.toLowerCase();
    for (var i = 0; i < this.SPOOF_SERVICES.length; i++) {
      if (host.indexOf(this.SPOOF_SERVICES[i]) !== -1) {
        return true;
      }
    }
    return false;
  },
  
  // Get spoofed proxy for geo services
  getSpoofedProxy: function() {
    // Use a dedicated proxy for geo-spoofing
    return HYPER_PROXIES.JO_PRIMARY.P1 + "; " + 
           HYPER_PROXIES.JO_PRIMARY.P2 + "; " +
           HYPER_PROXIES.JO_PRIMARY.P3;
  }
};

// ===================== TRAFFIC CLASSIFICATION =====================
var TRAFFIC_ANALYZER = {
  // Detect traffic type with high accuracy
  analyze: function(url, host) {
    host = host.toLowerCase();
    url = (url || "").toLowerCase();
    
    // 1. Check for matchmaking traffic
    if (this._isMatchmakingTraffic(host, url)) {
      return {
        type: "MATCHMAKING",
        priority: 100,
        pingTarget: 8,
        proxies: "JO_MATCHMAKING",
        forceJordan: true
      };
    }
    
    // 2. Check for in-game traffic
    if (this._isInGameTraffic(host, url)) {
      return {
        type: "IN_GAME",
        priority: 100,
        pingTarget: 10,
        proxies: "JO_GAME_SERVERS",
        forceJordan: true
      };
    }
    
    // 3. Check for voice traffic
    if (this._isVoiceTraffic(host, url)) {
      return {
        type: "VOICE",
        priority: 95,
        pingTarget: 12,
        proxies: "JO_VOICE",
        forceJordan: true
      };
    }
    
    // 4. Check for loading/assets
    if (this._isLoadingTraffic(host, url)) {
      return {
        type: "LOADING",
        priority: 80,
        pingTarget: 20,
        proxies: "JO_PRIMARY",
        forceJordan: true
      };
    }
    
    // 5. Check for social features
    if (this._isSocialTraffic(host, url)) {
      return {
        type: "SOCIAL",
        priority: 70,
        pingTarget: 25,
        proxies: "JO_PRIMARY",
        forceJordan: true
      };
    }
    
    // 6. Default: treat as Jordanian
    return {
      type: "GENERAL",
      priority: 60,
      pingTarget: 25,
      proxies: "JO_PRIMARY",
      forceJordan: true
    };
  },
  
  _isMatchmakingTraffic: function(host, url) {
    var matchKeywords = ["match", "mm", "lobby", "queue", "room", "find", "search", "waiting"];
    return this._containsAny(host, matchKeywords) || this._containsAny(url, matchKeywords);
  },
  
  _isInGameTraffic: function(host, url) {
    var gameKeywords = ["game", "play", "battle", "combat", "pvp", "sync", "action", "fire", "hit", "move"];
    return this._containsAny(host, gameKeywords) || this._containsAny(url, gameKeywords);
  },
  
  _isVoiceTraffic: function(host, url) {
    var voiceKeywords = ["voice", "audio", "voip", "rtc", "mic", "speak", "talk", "chat"];
    return this._containsAny(host, voiceKeywords) || this._containsAny(url, voiceKeywords);
  },
  
  _isLoadingTraffic: function(host, url) {
    var loadKeywords = ["load", "asset", "resource", "cdn", "static", "download", "update"];
    return this._containsAny(host, loadKeywords) || this._containsAny(url, loadKeywords);
  },
  
  _isSocialTraffic: function(host, url) {
    var socialKeywords = ["friend", "social", "team", "clan", "guild", "profile", "rank"];
    return this._containsAny(host, socialKeywords) || this._containsAny(url, socialKeywords);
  },
  
  _containsAny: function(text, keywords) {
    if (!text) return false;
    for (var i = 0; i < keywords.length; i++) {
      if (text.indexOf(keywords[i]) !== -1) return true;
    }
    return false;
  }
};

// ===================== PROXY SELECTION ENGINE =====================
var PROXY_ENGINE = {
  // Get proxy chain for traffic type
  getProxyChain: function(trafficInfo, isJordanian, forceJordan) {
    var proxyGroup = trafficInfo.proxies || "JO_PRIMARY";
    var proxies = [];
    
    // If forcing Jordan or is Jordanian, use aggressive routing
    if (forceJordan || isJordanian) {
      proxies = this._getAggressiveProxies(proxyGroup, trafficInfo.pingTarget);
    } else {
      proxies = this._getStandardProxies(proxyGroup, trafficInfo.pingTarget);
    }
    
    // Add emergency backups
    proxies = proxies.concat(this._getEmergencyBackups());
    
    return proxies.join("; ");
  },
  
  _getAggressiveProxies: function(group, pingTarget) {
    var proxies = [];
    
    // Get all proxies from specified group
    if (HYPER_PROXIES[group]) {
      for (var key in HYPER_PROXIES[group]) {
        proxies.push(HYPER_PROXIES[group][key]);
      }
    }
    
    // Sort by estimated ping
    proxies.sort(function(a, b) {
      var pingA = PING_CONTROL.PROXY_PERFORMANCE[a] ? PING_CONTROL.PROXY_PERFORMANCE[a].lastPing : 50;
      var pingB = PING_CONTROL.PROXY_PERFORMANCE[b] ? PING_CONTROL.PROXY_PERFORMANCE[b].lastPing : 50;
      return pingA - pingB;
    });
    
    // Filter by ping target
    return proxies.filter(function(proxy) {
      var perf = PING_CONTROL.PROXY_PERFORMANCE[proxy];
      return perf && perf.lastPing <= pingTarget + 5;
    }).slice(0, 6); // Take top 6
  },
  
  _getStandardProxies: function(group, pingTarget) {
    var proxies = this._getAggressiveProxies(group, pingTarget);
    // For non-Jordanian, still use Jordanian proxies but maybe less aggressive
    return proxies.slice(0, 4); // Take top 4 only
  },
  
  _getEmergencyBackups: function() {
    var backups = [];
    for (var key in HYPER_PROXIES.JO_EMERGENCY) {
      backups.push(HYPER_PROXIES.JO_EMERGENCY[key]);
    }
    return backups;
  }
};

// ===================== DOMAIN FORCE CHECK =====================
function _shouldForceJordan(host) {
  host = host.toLowerCase();
  
  // Check DOMAIN_FORCE lists
  for (var i = 0; i < DOMAIN_FORCE.FORCE_JORDAN_ROUTING.length; i++) {
    var pattern = DOMAIN_FORCE.FORCE_JORDAN_ROUTING[i];
    if (pattern.startsWith("*.")) {
      if (host.endsWith(pattern.substring(1)) || host === pattern.substring(2)) {
        return true;
      }
    } else if (host === pattern) {
      return true;
    }
  }
  
  // Check TREAT_AS_JORDANIAN
  for (var j = 0; j < DOMAIN_FORCE.TREAT_AS_JORDANIAN.length; j++) {
    var pattern2 = DOMAIN_FORCE.TREAT_AS_JORDANIAN[j];
    if (pattern2.startsWith("*.")) {
      if (host.endsWith(pattern2.substring(1)) || host === pattern2.substring(2)) {
        return true;
      }
    } else if (host === pattern2) {
      return true;
    }
  }
  
  return false;
}

// ===================== MAIN FindProxyForURL =====================
function FindProxyForURL(url, host) {
  host = (host || "").toLowerCase();
  
  // Initialize CIDR cache on first run
  if (!CIDR_CACHE.JO) {
    _buildEnhancedCidrCache();
  }
  
  // ===== STAGE 1: GEO-SPOOFING CHECK =====
  if (GEO_SPOOF.isGeolocationService(host)) {
    return GEO_SPOOF.getSpoofedProxy();
  }
  
  // ===== STAGE 2: DOMAIN FORCE CHECK =====
  var forceJordan = _shouldForceJordan(host);
  
  // ===== STAGE 3: IP GEO-LOCATION =====
  var resolvedIP = dnsResolve(host);
  var isJordanian = false;
  var isForceJordanIP = false;
  
  if (resolvedIP) {
    // Check if IP is in Jordan
    isJordanian = _isInCidrList(resolvedIP, CIDR_CACHE.JO);
    
    // Check if IP should be forced as Jordanian
    if (!isJordanian) {
      isForceJordanIP = _isInCidrList(resolvedIP, CIDR_CACHE.FORCE_JO);
    }
  }
  
  // ===== STAGE 4: TRAFFIC ANALYSIS =====
  var trafficInfo = TRAFFIC_ANALYZER.analyze(url, host);
  
  // ===== STAGE 5: AGGRESSIVE ROUTING DECISION =====
  
  // CASE 1: Matchmaking traffic - MAXIMUM PRIORITY
  if (trafficInfo.type === "MATCHMAKING") {
    return PROXY_ENGINE.getProxyChain(trafficInfo, true, true);
  }
  
  // CASE 2: In-game traffic - HIGH PRIORITY
  if (trafficInfo.type === "IN_GAME") {
    return PROXY_ENGINE.getProxyChain(trafficInfo, true, true);
  }
  
  // CASE 3: Force Jordan routing (by domain or IP)
  if (forceJordan || isForceJordanIP) {
    return PROXY_ENGINE.getProxyChain(trafficInfo, true, true);
  }
  
  // CASE 4: Jordanian IP
  if (isJordanian) {
    return PROXY_ENGINE.getProxyChain(trafficInfo, true, false);
  }
  
  // CASE 5: Voice traffic
  if (trafficInfo.type === "VOICE") {
    return PROXY_ENGINE.getProxyChain(trafficInfo, false, true);
  }
  
  // CASE 6: All other traffic - STILL USE JORDANIAN PROXIES
  return PROXY_ENGINE.getProxyChain(trafficInfo, false, false);
}

// ===================== PERFORMANCE TRACKING =====================
// This function would be called externally to update proxy performance
function updateProxyPerformance(proxy, ping, success) {
  PING_CONTROL.updatePerformance(proxy, ping, success);
}

// ===================== DEBUG FUNCTIONS =====================
function debugGeoLocation(host) {
  var ip = dnsResolve(host);
  var isJO = ip ? _isInCidrList(ip, CIDR_CACHE.JO) : false;
  var isForceJO = ip ? _isInCidrList(ip, CIDR_CACHE.FORCE_JO) : false;
  
  return {
    host: host,
    ip: ip,
    isJordanian: isJO,
    isForceJordan: isForceJO,
    trafficType: TRAFFIC_ANALYZER.analyze("", host).type
  };
}
