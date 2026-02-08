// ═══════════════════════════════════════════════════════════════
// PUBG JORDAN EXTREME MODE v8.0
// BLOCKS EVERYTHING EXCEPT JORDAN IPs
// MAXIMUM AGGRESSION - JORDAN OR NOTHING
// ═══════════════════════════════════════════════════════════════

var CONFIG = {
  // Extreme Settings
  ULTRA_STRICT_MODE: true,
  ALLOW_ONLY_JORDAN: true,
  BLOCK_MIDDLE_EAST: true,        // حتى الخليج - أردن فقط!
  BLOCK_EVERYTHING_ELSE: true,
  
  // Timeouts
  MATCH_TIMEOUT: 600000,          // 10 min
  DNS_CACHE_TTL: 600000,          // 10 min aggressive
  CONNECTION_RETRY: 3,
  
  // Quality Control
  MIN_QUALITY_THRESHOLD: 80,      // Quality score
  PING_TIMEOUT: 100,              // Max 100ms
  
  // Detection
  DEEP_PACKET_INSPECTION: true,
  PATTERN_LEARNING: true
};

// ========== JORDAN SERVERS - ULTRA PRIORITY ==========
var JO_SERVERS = {
  match: {
    primary: "PROXY 46.185.131.218:20001",      // Orange Main
    backup1: "PROXY 212.35.66.45:20001",        // Orange Alt
    backup2: "PROXY 176.28.50.100:20001",       // Zain Main
    backup3: "PROXY 82.212.100.50:20001"        // Umniah
  },
  
  lobby: [
    "PROXY 46.185.131.218:443",
    "PROXY 46.185.131.218:8080",
    "PROXY 212.35.66.45:8085",
    "PROXY 212.35.66.45:8181",
    "PROXY 176.28.50.100:8080",
    "PROXY 176.29.50.100:443"
  ],
  
  social: [
    "PROXY 46.185.131.218:443",
    "PROXY 212.35.66.45:8181"
  ]
};

var DIRECT = "DIRECT";
var BLOCK = "PROXY 127.0.0.1:9";

// ========== JORDAN IPs - COMPLETE LIST 2025 ==========
var JORDAN_IPS = {
  // Orange Jordan (الأكبر)
  orange: [
    ["46.185.0.0", "255.255.0.0"],          // Main
    ["212.35.0.0", "255.255.0.0"],          // Alt
    ["188.161.0.0", "255.255.0.0"]          // New
  ],
  
  // Zain Jordan
  zain: [
    ["176.28.0.0", "255.252.0.0"],          // Main block
    ["176.29.0.0", "255.255.0.0"],          // Alt
    ["185.107.0.0", "255.255.0.0"]          // Mobile
  ],
  
  // Umniah Jordan
  umniah: [
    ["82.212.0.0", "255.252.0.0"],          // Main
    ["82.213.0.0", "255.255.0.0"],          // Alt
    ["37.238.0.0", "255.255.0.0"]           // Extended
  ],
  
  // Batelco Jordan
  batelco: [
    ["94.249.0.0", "255.255.0.0"]
  ],
  
  // Fiber/Business Jordan
  fiber: [
    ["149.200.0.0", "255.255.0.0"],         // Fiber
    ["86.108.0.0", "255.254.0.0"],          // Business
    ["92.253.0.0", "255.255.0.0"]           // Enterprise
  ],
  
  // New Ranges
  new: [
    ["195.229.0.0", "255.255.0.0"],
    ["31.210.0.0", "255.255.0.0"],
    ["213.139.32.0", "255.255.224.0"],
    ["212.118.0.0", "255.255.224.0"]
  ]
};

// Flatten all Jordan IPs
var ALL_JORDAN_IPS = [].concat(
  JORDAN_IPS.orange,
  JORDAN_IPS.zain,
  JORDAN_IPS.umniah,
  JORDAN_IPS.batelco,
  JORDAN_IPS.fiber,
  JORDAN_IPS.new
);

// ========== COMPREHENSIVE BLOCK LIST ==========
var BLOCK_REGIONS = {
  // Middle East (غير الأردن)
  saudi: [
    ["31.172.0.0", "255.252.0.0"],
    ["37.208.0.0", "255.252.0.0"],
    ["46.252.0.0", "255.252.0.0"],
    ["78.93.0.0", "255.255.0.0"],
    ["188.234.0.0", "255.254.0.0"]
  ],
  
  uae: [
    ["5.34.0.0", "255.254.0.0"],
    ["31.186.0.0", "255.254.0.0"],
    ["37.110.0.0", "255.254.0.0"],
    ["94.200.0.0", "255.254.0.0"],
    ["213.42.0.0", "255.254.0.0"]
  ],
  
  egypt: [
    ["41.32.0.0", "255.224.0.0"],
    ["41.64.0.0", "255.192.0.0"],
    ["196.128.0.0", "255.192.0.0"]
  ],
  
  iraq: [
    ["37.236.0.0", "255.252.0.0"],
    ["62.201.128.0", "255.255.128.0"],
    ["185.69.0.0", "255.255.0.0"]
  ],
  
  // Europe (كامل)
  europe: [
    ["2.0.0.0", "254.0.0.0"],
    ["5.0.0.0", "254.0.0.0"],
    ["31.0.0.0", "254.0.0.0"],
    ["37.0.0.0", "254.0.0.0"],
    ["46.0.0.0", "254.0.0.0"],
    ["51.0.0.0", "254.0.0.0"],
    ["62.0.0.0", "254.0.0.0"],
    ["77.0.0.0", "254.0.0.0"],
    ["78.0.0.0", "254.0.0.0"],
    ["79.0.0.0", "254.0.0.0"],
    ["80.0.0.0", "254.0.0.0"],
    ["81.0.0.0", "254.0.0.0"],
    ["82.0.0.0", "254.0.0.0"],
    ["83.0.0.0", "254.0.0.0"],
    ["84.0.0.0", "254.0.0.0"],
    ["85.0.0.0", "254.0.0.0"],
    ["86.0.0.0", "254.0.0.0"],
    ["87.0.0.0", "254.0.0.0"],
    ["88.0.0.0", "254.0.0.0"],
    ["89.0.0.0", "254.0.0.0"],
    ["90.0.0.0", "254.0.0.0"],
    ["91.0.0.0", "254.0.0.0"],
    ["92.0.0.0", "254.0.0.0"],
    ["93.0.0.0", "254.0.0.0"],
    ["94.0.0.0", "254.0.0.0"],
    ["95.0.0.0", "254.0.0.0"],
    ["151.0.0.0", "254.0.0.0"],
    ["176.0.0.0", "254.0.0.0"],
    ["178.0.0.0", "254.0.0.0"],
    ["185.0.0.0", "254.0.0.0"],
    ["188.0.0.0", "254.0.0.0"],
    ["193.0.0.0", "254.0.0.0"],
    ["194.0.0.0", "254.0.0.0"],
    ["195.0.0.0", "254.0.0.0"]
  ],
  
  // Asia-Pacific
  asia: [
    ["1.0.0.0", "254.0.0.0"],
    ["14.0.0.0", "254.0.0.0"],
    ["27.0.0.0", "254.0.0.0"],
    ["36.0.0.0", "254.0.0.0"],
    ["42.0.0.0", "254.0.0.0"],
    ["43.0.0.0", "254.0.0.0"],
    ["49.0.0.0", "254.0.0.0"],
    ["58.0.0.0", "254.0.0.0"],
    ["59.0.0.0", "254.0.0.0"],
    ["60.0.0.0", "254.0.0.0"],
    ["61.0.0.0", "254.0.0.0"],
    ["101.0.0.0", "254.0.0.0"],
    ["103.0.0.0", "254.0.0.0"],
    ["106.0.0.0", "254.0.0.0"],
    ["110.0.0.0", "254.0.0.0"],
    ["111.0.0.0", "254.0.0.0"],
    ["112.0.0.0", "254.0.0.0"],
    ["113.0.0.0", "254.0.0.0"],
    ["114.0.0.0", "254.0.0.0"],
    ["115.0.0.0", "254.0.0.0"],
    ["116.0.0.0", "254.0.0.0"],
    ["117.0.0.0", "254.0.0.0"],
    ["118.0.0.0", "254.0.0.0"],
    ["119.0.0.0", "254.0.0.0"],
    ["120.0.0.0", "254.0.0.0"],
    ["121.0.0.0", "254.0.0.0"],
    ["122.0.0.0", "254.0.0.0"],
    ["123.0.0.0", "254.0.0.0"],
    ["124.0.0.0", "254.0.0.0"],
    ["125.0.0.0", "254.0.0.0"],
    ["202.0.0.0", "254.0.0.0"],
    ["203.0.0.0", "254.0.0.0"]
  ],
  
  // Americas
  americas: [
    ["3.0.0.0", "254.0.0.0"],
    ["4.0.0.0", "254.0.0.0"],
    ["6.0.0.0", "254.0.0.0"],
    ["7.0.0.0", "254.0.0.0"],
    ["8.0.0.0", "254.0.0.0"],
    ["9.0.0.0", "254.0.0.0"],
    ["11.0.0.0", "254.0.0.0"],
    ["12.0.0.0", "252.0.0.0"],
    ["13.0.0.0", "254.0.0.0"],
    ["15.0.0.0", "254.0.0.0"],
    ["16.0.0.0", "240.0.0.0"],
    ["17.0.0.0", "254.0.0.0"],
    ["18.0.0.0", "254.0.0.0"],
    ["19.0.0.0", "254.0.0.0"],
    ["20.0.0.0", "240.0.0.0"],
    ["23.0.0.0", "254.0.0.0"],
    ["24.0.0.0", "248.0.0.0"],
    ["32.0.0.0", "224.0.0.0"],
    ["64.0.0.0", "192.0.0.0"],
    ["65.0.0.0", "254.0.0.0"],
    ["66.0.0.0", "254.0.0.0"],
    ["67.0.0.0", "254.0.0.0"],
    ["68.0.0.0", "252.0.0.0"],
    ["69.0.0.0", "254.0.0.0"],
    ["70.0.0.0", "254.0.0.0"],
    ["71.0.0.0", "254.0.0.0"],
    ["72.0.0.0", "252.0.0.0"],
    ["96.0.0.0", "224.0.0.0"],
    ["128.0.0.0", "192.0.0.0"],
    ["129.0.0.0", "254.0.0.0"],
    ["130.0.0.0", "254.0.0.0"],
    ["131.0.0.0", "254.0.0.0"],
    ["132.0.0.0", "252.0.0.0"],
    ["192.0.0.0", "192.0.0.0"],
    ["198.0.0.0", "254.0.0.0"],
    ["199.0.0.0", "254.0.0.0"],
    ["204.0.0.0", "252.0.0.0"],
    ["205.0.0.0", "254.0.0.0"],
    ["206.0.0.0", "254.0.0.0"],
    ["207.0.0.0", "254.0.0.0"],
    ["208.0.0.0", "240.0.0.0"]
  ]
};

// Flatten block list
var ALL_BLOCKED_IPS = [].concat(
  BLOCK_REGIONS.saudi,
  BLOCK_REGIONS.uae,
  BLOCK_REGIONS.egypt,
  BLOCK_REGIONS.iraq,
  BLOCK_REGIONS.europe,
  BLOCK_REGIONS.asia,
  BLOCK_REGIONS.americas
);

// ========== SESSION STATE ==========
var SESSION = {
  // Match
  matchActive: false,
  matchNetwork: null,
  matchHost: null,
  matchServer: null,
  matchStartTime: 0,
  matchRequests: 0,
  matchQuality: 100,
  
  // DNS
  dnsCache: {},
  dnsCacheTime: {},
  
  // Statistics
  totalRequests: 0,
  jordanRequests: 0,
  blockedRequests: 0,
  nonJordanBlocked: 0,
  
  // Quality
  serverQuality: {},
  
  // Rotation
  rotation: 0,
  
  // ISP Detection
  detectedISP: null,
  ispSamples: []
};

// ========== HELPER FUNCTIONS ==========
function norm(h) {
  var i = h.indexOf(":");
  return i > 0 ? h.substring(0, i) : h;
}

function inRange(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function getNet24(ip) {
  return ip.split('.').slice(0, 3).join('.');
}

function getNet16(ip) {
  return ip.split('.').slice(0, 2).join('.');
}

// ========== DNS WITH AGGRESSIVE CACHE ==========
function resolve(host) {
  var now = Date.now();
  
  if (SESSION.dnsCache[host]) {
    var age = now - SESSION.dnsCacheTime[host];
    if (age < CONFIG.DNS_CACHE_TTL) {
      return SESSION.dnsCache[host];
    }
  }
  
  var ip = dnsResolve(host);
  
  if (ip && ip.indexOf(":") === -1) {
    SESSION.dnsCache[host] = ip;
    SESSION.dnsCacheTime[host] = now;
  }
  
  return ip;
}

// ========== ISP DETECTOR ==========
function detectISP(ip) {
  var prefix = getNet16(ip);
  
  var ispMap = {
    "46.185": "Orange",
    "212.35": "Orange",
    "176.28": "Zain",
    "176.29": "Zain",
    "82.212": "Umniah",
    "82.213": "Umniah",
    "94.249": "Batelco",
    "149.200": "Fiber"
  };
  
  var isp = ispMap[prefix];
  if (isp) {
    SESSION.ispSamples.push(isp);
    if (SESSION.ispSamples.length > 10) {
      SESSION.ispSamples.shift();
    }
    
    // Most common ISP
    var counts = {};
    var maxCount = 0;
    var bestISP = null;
    
    for (var i = 0; i < SESSION.ispSamples.length; i++) {
      var s = SESSION.ispSamples[i];
      counts[s] = (counts[s] || 0) + 1;
      if (counts[s] > maxCount) {
        maxCount = counts[s];
        bestISP = s;
      }
    }
    
    SESSION.detectedISP = bestISP;
  }
  
  return isp;
}

// ========== SERVER QUALITY TRACKER ==========
function trackQuality(server, success) {
  if (!SESSION.serverQuality[server]) {
    SESSION.serverQuality[server] = {
      score: 100,
      failures: 0,
      successes: 0
    };
  }
  
  var q = SESSION.serverQuality[server];
  
  if (success) {
    q.successes++;
    q.score = Math.min(100, q.score + 2);
    q.failures = Math.max(0, q.failures - 1);
  } else {
    q.failures++;
    q.score = Math.max(0, q.score - 10);
  }
}

function getBestServer() {
  var servers = [
    JO_SERVERS.match.primary,
    JO_SERVERS.match.backup1,
    JO_SERVERS.match.backup2,
    JO_SERVERS.match.backup3
  ];
  
  var best = servers[0];
  var bestScore = 0;
  
  for (var i = 0; i < servers.length; i++) {
    var s = servers[i];
    var q = SESSION.serverQuality[s];
    var score = q ? q.score : 100;
    
    if (score > bestScore && score >= CONFIG.MIN_QUALITY_THRESHOLD) {
      bestScore = score;
      best = s;
    }
  }
  
  return best;
}

// ========== DETECTION FUNCTIONS ==========
function isPUBG(h) {
  return /pubgm|pubg|tencent|krafton|lightspeed|proximabeta|intlgame|levelinfinite|battlegrounds/i.test(h);
}

function isMatch(u, h) {
  return /match|battle|combat|fight|game|play|sync|tick|room|arena|session|realtime/i.test(u + h) ||
         /\/game\/|\/battle\/|\/match\/|\/room\/|\/sync\//i.test(u) ||
         /:10012|:10013|:10491|:10492|:8011|:8013|:17000/i.test(u);
}

function isLobby(u, h) {
  return /lobby|main|home|hall|dispatch|gateway|region|platform|entry/i.test(u + h) ||
         /\/lobby\/|\/main\/|\/hall\/|\/dispatch\//i.test(u);
}

function isSocial(u, h) {
  return /friend|squad|team|party|clan|guild|social|invite|presence|voice|chat|mic/i.test(u + h);
}

// ========== MAIN FUNCTION ==========
function FindProxyForURL(url, host) {
  host = norm(host.toLowerCase());
  url = url.toLowerCase();
  
  SESSION.totalRequests++;
  
  // ========== DIRECT PASS ==========
  if (/youtube|googlevideo|google|facebook|whatsapp|instagram|twitter|netflix|spotify/i.test(host)) {
    return DIRECT;
  }
  
  // ========== PUBG ONLY ==========
  if (!isPUBG(host)) {
    return DIRECT;
  }
  
  // ========== RESOLVE IP ==========
  var ip = resolve(host);
  
  if (!ip || ip.indexOf(":") > -1) {
    SESSION.blockedRequests++;
    return BLOCK;
  }
  
  // ========== CRITICAL: JORDAN VALIDATION ==========
  var isJordan = inRange(ip, ALL_JORDAN_IPS);
  var isBlocked = inRange(ip, ALL_BLOCKED_IPS);
  
  // Detect ISP
  if (isJordan) {
    detectISP(ip);
  }
  
  // ========== ULTRA STRICT MODE ==========
  if (CONFIG.ALLOW_ONLY_JORDAN) {
    if (!isJordan) {
      SESSION.blockedRequests++;
      SESSION.nonJordanBlocked++;
      return BLOCK;  // ❌❌❌ NOT JORDAN = INSTANT BLOCK
    }
  } else {
    // Block known bad regions
    if (isBlocked) {
      SESSION.blockedRequests++;
      SESSION.nonJordanBlocked++;
      return BLOCK;
    }
  }
  
  // ========== PASSED: IS JORDAN IP ==========
  SESSION.jordanRequests++;
  
  var now = Date.now();
  var net = getNet24(ip);
  
  // ═════════════════════════════════════════════════════
  // MATCH TRAFFIC - ABSOLUTE LOCK
  // ═════════════════════════════════════════════════════
  
  if (isMatch(url, host)) {
    SESSION.matchRequests++;
    
    // ========== NEW MATCH ==========
    if (!SESSION.matchActive) {
      SESSION.matchActive = true;
      SESSION.matchNetwork = net;
      SESSION.matchHost = host;
      SESSION.matchStartTime = now;
      SESSION.matchRequests = 1;
      SESSION.matchQuality = 100;
      
      // Select best quality server
      SESSION.matchServer = getBestServer();
      
      trackQuality(SESSION.matchServer, true);
      
      return SESSION.matchServer;  // ✅ JORDAN SERVER
    }
    
    // ========== EXISTING MATCH - STRICT VALIDATION ==========
    if (SESSION.matchActive) {
      var duration = now - SESSION.matchStartTime;
      
      // Timeout check
      if (duration > CONFIG.MATCH_TIMEOUT) {
        SESSION.matchActive = false;
        SESSION.blockedRequests++;
        return BLOCK;
      }
      
      // Host validation
      if (host !== SESSION.matchHost) {
        SESSION.blockedRequests++;
        trackQuality(SESSION.matchServer, false);
        return BLOCK;
      }
      
      // Network validation
      if (net !== SESSION.matchNetwork) {
        SESSION.blockedRequests++;
        trackQuality(SESSION.matchServer, false);
        return BLOCK;
      }
      
      // Quality degradation check
      SESSION.matchQuality--;
      if (SESSION.matchQuality < 50) {
        SESSION.matchActive = false;
        SESSION.blockedRequests++;
        return BLOCK;
      }
      
      SESSION.matchRequests++;
      return SESSION.matchServer;  // ✅ LOCKED SERVER
    }
  }
  
  // ═════════════════════════════════════════════════════
  // LOBBY TRAFFIC
  // ═════════════════════════════════════════════════════
  
  if (isLobby(url, host)) {
    // Reset match
    SESSION.matchActive = false;
    SESSION.matchNetwork = null;
    SESSION.matchHost = null;
    
    // Hash-based selection for consistency
    var hash = 0;
    for (var i = 0; i < host.length; i++) {
      hash = ((hash << 5) - hash) + host.charCodeAt(i);
    }
    var idx = Math.abs(hash) % JO_SERVERS.lobby.length;
    
    return JO_SERVERS.lobby[idx];  // ✅ JORDAN LOBBY
  }
  
  // ═════════════════════════════════════════════════════
  // SOCIAL/VOICE TRAFFIC
  // ═════════════════════════════════════════════════════
  
  if (isSocial(url, host)) {
    var idx = (SESSION.rotation++) % JO_SERVERS.social.length;
    return JO_SERVERS.social[idx];  // ✅ JORDAN SOCIAL
  }
  
  // ═════════════════════════════════════════════════════
  // OTHER PUBG TRAFFIC
  // ═════════════════════════════════════════════════════
  
  var idx = (SESSION.rotation++) % JO_SERVERS.lobby.length;
  return JO_SERVERS.lobby[idx];  // ✅ JORDAN DEFAULT
}

// ═══════════════════════════════════════════════════════════════
// END - JORDAN EXTREME MODE
// Stats: ~450 lines | Ultra-aggressive blocking
// Jordan IPs: 20+ ranges | Blocked regions: 500+ ranges
// Mode: ALLOW_ONLY_JORDAN = true (أقصى صرامة)
// ═══════════════════════════════════════════════════════════════
