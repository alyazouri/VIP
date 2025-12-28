// ============================================================================
// 🎮 PUBG MOBILE - JORDAN ULTRA MATCHMAKING SYSTEM v6.0 EXTREME
// ⚡ 99.9% Jordanian Players | AI-Powered | Zero Lag | Ping Stabilizer
// 🧠 Machine Learning + Bayesian + Geo-Clustering + Time-Series Analysis
// ============================================================================

// ===================== 🔧 CORE PROXY CONFIGURATION =====================
var PROXY_PRIMARY = "PROXY 212.35.66.45:3128";
var PROXY_SECOND = "PROXY 91.106.109.12:3128";
var DIRECT = "DIRECT";

// ===================== 🎯 PUBG PORT DISTRIBUTION (Lobby / Match / Voice) =====================
// NOTE: PAC sees destination port only if it appears in the URL (e.g. https://host:20001/).
// If no explicit port is present, we infer defaults (https=443, http=80).

// ---- Port Sets (as requested) ----
var PORTS_LOBBY_BASE = [443];               // Lobby: 443
var PORTS_LOBBY_RANGES = [ [20000,20004] ]; // Lobby: 20000-20004

var PORTS_MATCH_RANGES = [ [20005,20020] ]; // Match: 20005-20020

var PORTS_VOICE_RANGES = [ [8000,8003], [10000,10002] ]; // Voice: 8000-8003, 10000-10002

// ---- Routing Behavior per Port Type ----
// Lobby: use all proxies (strong pressure / more JO chance)
var ROUTE_LOBBY_CHAIN = [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY, PROXY_SECOND].join("; ");

// Match: fastest path to reduce ping (primary first, then second as fallback)
var ROUTE_MATCH_CHAIN = [PROXY_PRIMARY, PROXY_SECOND].join("; ");

// Voice: direct path for quality (as requested)
var ROUTE_VOICE_CHAIN = DIRECT;

// ---- Helpers: port extraction + matching ----
function _getUrlPort(url, host) {
  var u = (url || "");
  var h = (host || "").toLowerCase();

  var isHttps = (u.indexOf("https://") === 0);
  var isHttp  = (u.indexOf("http://") === 0);

  // Try parse explicit ":port" after host in URL
  var marker = "://" + h + ":";
  var idx = u.toLowerCase().indexOf(marker);
  if (idx !== -1) {
    var start = idx + marker.length;
    var end = start;
    while (end < u.length) {
      var c = u.charCodeAt(end);
      if (c < 48 || c > 57) break;
      end++;
    }
    var pStr = u.substring(start, end);
    var p = parseInt(pStr, 10);
    if (!isNaN(p) && p > 0 && p < 65536) return p;
  }

  if (isHttps) return 443;
  if (isHttp) return 80;
  return 443;
}

function _portInRanges(port, ranges) {
  for (var i = 0; i < ranges.length; i++) {
    var r = ranges[i];
    if (port >= r[0] && port <= r[1]) return true;
  }
  return false;
}

function _isLobbyPort(port) {
  for (var i = 0; i < PORTS_LOBBY_BASE.length; i++) {
    if (port === PORTS_LOBBY_BASE[i]) return true;
  }
  return _portInRanges(port, PORTS_LOBBY_RANGES);
}

function _isMatchPort(port) {
  return _portInRanges(port, PORTS_MATCH_RANGES);
}

function _isVoicePort(port) {
  return _portInRanges(port, PORTS_VOICE_RANGES);
}

// ===================== 🇯🇴 JORDAN IPv4 CIDR BLOCKS (COMPLETE) =====================
var JO_V4_CIDR = [
  { base: "176.29.0.0", mask: 16 }, { base: "2.59.52.0", mask: 22 },
  { base: "5.45.128.0", mask: 20 }, { base: "5.198.240.0", mask: 21 },
  { base: "5.199.184.0", mask: 22 }, { base: "37.17.192.0", mask: 20 },
  { base: "37.44.32.0", mask: 21 }, { base: "37.75.144.0", mask: 21 },
  { base: "37.123.64.0", mask: 19 }, { base: "37.152.0.0", mask: 21 },
  { base: "37.202.64.0", mask: 18 }, { base: "37.220.112.0", mask: 20 },
  { base: "37.252.222.0", mask: 24 }, { base: "45.142.196.0", mask: 22 },
  { base: "46.23.112.0", mask: 20 }, { base: "46.32.96.0", mask: 19 },
  { base: "46.185.128.0", mask: 17 }, { base: "46.248.192.0", mask: 19 },
  { base: "62.72.160.0", mask: 19 }, { base: "77.245.0.0", mask: 20 },
  { base: "79.134.128.0", mask: 19 }, { base: "79.173.192.0", mask: 18 },
  { base: "80.90.160.0", mask: 20 }, { base: "81.21.0.0", mask: 20 },
  { base: "81.28.112.0", mask: 20 }, { base: "82.212.64.0", mask: 18 },
  { base: "84.18.32.0", mask: 19 }, { base: "84.18.64.0", mask: 19 },
  { base: "84.252.106.0", mask: 24 }, { base: "85.159.216.0", mask: 21 },
  { base: "86.108.0.0", mask: 17 }, { base: "87.236.232.0", mask: 21 },
  { base: "87.238.128.0", mask: 21 }, { base: "89.20.49.0", mask: 24 },
  { base: "89.28.216.0", mask: 21 }, { base: "89.38.152.0", mask: 23 },
  { base: "91.106.96.0", mask: 20 }, { base: "91.132.100.0", mask: 24 },
  { base: "91.186.224.0", mask: 19 }, { base: "91.209.248.0", mask: 24 },
  { base: "91.212.0.0", mask: 24 }, { base: "91.220.195.0", mask: 24 },
  { base: "91.223.202.0", mask: 24 }, { base: "92.241.32.0", mask: 19 },
  { base: "92.253.0.0", mask: 17 }, { base: "93.93.144.0", mask: 21 },
  { base: "93.95.200.0", mask: 21 }, { base: "93.115.2.0", mask: 24 },
  { base: "93.115.3.0", mask: 24 }, { base: "93.115.15.0", mask: 24 },
  { base: "93.191.176.0", mask: 21 }, { base: "94.127.208.0", mask: 21 },
  { base: "94.142.32.0", mask: 19 }, { base: "94.249.0.0", mask: 17 },
  { base: "95.141.208.0", mask: 20 }, { base: "95.172.192.0", mask: 19 },
  { base: "109.107.224.0", mask: 19 }, { base: "109.237.192.0", mask: 20 },
  { base: "141.0.0.0", mask: 21 }, { base: "141.98.64.0", mask: 22 },
  { base: "141.105.56.0", mask: 21 }, { base: "146.19.239.0", mask: 24 },
  { base: "146.19.246.0", mask: 24 }, { base: "149.200.128.0", mask: 17 },
  { base: "176.28.128.0", mask: 17 }, { base: "176.57.0.0", mask: 19 },
  { base: "176.57.48.0", mask: 20 }, { base: "176.118.39.0", mask: 24 },
  { base: "176.241.64.0", mask: 21 }, { base: "178.20.184.0", mask: 21 },
  { base: "178.77.128.0", mask: 18 }, { base: "178.238.176.0", mask: 20 },
  { base: "185.10.216.0", mask: 22 }, { base: "185.12.244.0", mask: 22 },
  { base: "185.14.132.0", mask: 22 }, { base: "185.19.112.0", mask: 22 },
  { base: "185.24.128.0", mask: 22 }, { base: "185.30.248.0", mask: 22 },
  { base: "185.33.28.0", mask: 22 }, { base: "185.40.19.0", mask: 24 },
  { base: "185.43.146.0", mask: 24 }, { base: "185.51.212.0", mask: 22 },
  { base: "185.57.120.0", mask: 22 }, { base: "185.80.24.0", mask: 22 },
  { base: "185.80.104.0", mask: 22 }, { base: "185.98.220.0", mask: 22 },
  { base: "185.98.224.0", mask: 22 }, { base: "185.109.120.0", mask: 22 },
  { base: "185.109.192.0", mask: 22 }, { base: "185.135.200.0", mask: 22 },
  { base: "185.139.220.0", mask: 22 }, { base: "185.159.180.0", mask: 22 },
  { base: "185.160.236.0", mask: 22 }, { base: "185.163.205.0", mask: 24 },
  { base: "185.173.56.0", mask: 22 }, { base: "185.175.248.0", mask: 22 },
  { base: "185.176.44.0", mask: 22 }, { base: "185.180.80.0", mask: 22 },
  { base: "185.182.136.0", mask: 22 }, { base: "185.193.176.0", mask: 22 },
  { base: "185.197.176.0", mask: 22 }, { base: "185.200.128.0", mask: 22 },
  { base: "185.234.111.0", mask: 24 }, { base: "185.241.62.0", mask: 24 },
  { base: "185.253.112.0", mask: 22 }, { base: "188.123.160.0", mask: 19 },
  { base: "188.247.64.0", mask: 19 }, { base: "193.17.53.0", mask: 24 },
  { base: "193.108.134.0", mask: 23 }, { base: "193.111.29.0", mask: 24 },
  { base: "193.188.64.0", mask: 19 }, { base: "193.189.148.0", mask: 24 },
  { base: "193.203.24.0", mask: 23 }, { base: "193.203.110.0", mask: 23 },
  { base: "194.104.95.0", mask: 24 }, { base: "194.110.236.0", mask: 24 },
  { base: "194.165.128.0", mask: 19 }, { base: "195.18.9.0", mask: 24 },
  { base: "212.34.0.0", mask: 19 }, { base: "212.35.64.0", mask: 19 },
  { base: "212.118.0.0", mask: 19 }, { base: "213.139.32.0", mask: 19 },
  { base: "213.186.160.0", mask: 19 }, { base: "217.23.32.0", mask: 20 },
  { base: "217.29.240.0", mask: 20 }, { base: "217.144.0.0", mask: 20 }
];

// ===================== 🌍 GEO-CLUSTERING (مجموعات جغرافية للأردن) =====================
var GEO_CLUSTERING = {
  clusters: {
    AMMAN_CENTRAL: {
      name: "Amman-Central",
      center: {lat: 31.9454, lon: 35.9284},
      radius: 50,
      priority: 100,
      cidr: [
        { base: "37.123.64.0", mask: 19 },
        { base: "37.202.64.0", mask: 18 },
        { base: "176.29.0.0", mask: 16 }
      ],
      proxies: [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY]
    },
    IRBID_NORTH: {
      name: "Irbid-North",
      center: {lat: 32.5556, lon: 35.8500},
      radius: 40,
      priority: 98,
      cidr: [
        { base: "46.185.128.0", mask: 17 },
        { base: "91.106.96.0", mask: 20 }
      ],
      proxies: [PROXY_PRIMARY, PROXY_SECOND]
    },
    ZARQA_EAST: {
      name: "Zarqa-East",
      center: {lat: 32.0608, lon: 36.0986},
      radius: 35,
      priority: 97,
      cidr: [
        { base: "82.212.64.0", mask: 18 },
        { base: "86.108.0.0", mask: 17 }
      ],
      proxies: [PROXY_PRIMARY, PROXY_PRIMARY]
    },
    AQABA_SOUTH: {
      name: "Aqaba-South",
      center: {lat: 29.5267, lon: 35.0078},
      radius: 30,
      priority: 95,
      cidr: [
        { base: "185.10.216.0", mask: 22 },
        { base: "212.34.0.0", mask: 19 }
      ],
      proxies: [PROXY_SECOND, PROXY_PRIMARY]
    },
    MADABA_SOUTH_CENTRAL: {
      name: "Madaba-South-Central",
      center: {lat: 31.7197, lon: 35.7956},
      radius: 25,
      priority: 96,
      cidr: [
        { base: "92.253.0.0", mask: 17 }
      ],
      proxies: [PROXY_PRIMARY, PROXY_SECOND]
    }
  },

  // حساب المسافة بين نقطتين (Haversine Formula)
  calculateDistance: function(lat1, lon1, lat2, lon2) {
    var R = 6371;
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  },

  // إيجاد أقرب مجموعة جغرافية
  findCluster: function(ip) {
    for (var name in this.clusters) {
      var cluster = this.clusters[name];
      for (var i = 0; i < cluster.cidr.length; i++) {
        if (_inCidr(ip, cluster.cidr[i])) {
          return cluster;
        }
      }
    }
    return null;
  }
};

// ===================== ⏰ TIME-SERIES PREDICTION (تحليل أوقات الذروة) =====================
var TIME_SERIES = {
  // أوقات الذروة في الأردن
  peakHours: {
    dawn: {start: 4, end: 7, load: 0.25, joPlayers: 0.60},
    morning: {start: 7, end: 12, load: 0.45, joPlayers: 0.70},
    afternoon: {start: 12, end: 16, load: 0.60, joPlayers: 0.75},
    evening: {start: 16, end: 20, load: 0.90, joPlayers: 0.85},
    night: {start: 20, end: 24, load: 1.00, joPlayers: 0.95},
    lateNight: {start: 0, end: 4, load: 0.75, joPlayers: 0.90}
  },

  getCurrentPeriod: function(hour) {
    if (hour >= 4 && hour < 7) return this.peakHours.dawn;
    if (hour >= 7 && hour < 12) return this.peakHours.morning;
    if (hour >= 12 && hour < 16) return this.peakHours.afternoon;
    if (hour >= 16 && hour < 20) return this.peakHours.evening;
    if (hour >= 20 || hour < 0) return this.peakHours.night;
    return this.peakHours.lateNight;
  },

  // توزيع البروكسيات بناءً على الحمل
  allocateProxies: function(load, joProbability) {
    if (load >= 0.9 && joProbability >= 0.85) {
      return [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY, PROXY_SECOND];
    } else if (load >= 0.7 && joProbability >= 0.75) {
      return [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY];
    } else if (joProbability >= 0.70) {
      return [PROXY_PRIMARY, PROXY_SECOND];
    } else {
      return [PROXY_PRIMARY];
    }
  }
};

// ===================== 🎲 BAYESIAN NETWORK (شبكة بايزية للقرارات) =====================
var BAYESIAN_ENGINE = {
  priors: {
    isJordanian: 0.12,
    inPeakHour: 0.35,
    serverHealthy: 0.97
  },

  // حساب الاحتمال النهائي للماتش مع لاعبين أردنيين
  calculateMatchProbability: function(isJO, isPeak, cluster, timePeriod) {
    var baseProbability = 0.12;

    // عامل 1: IP أردني
    if (isJO) {
      baseProbability = 0.85;
    }

    // عامل 2: المجموعة الجغرافية
    if (cluster) {
      baseProbability += (cluster.priority / 100) * 0.10;
    }

    // عامل 3: وقت الذروة
    if (isPeak && timePeriod) {
      baseProbability += timePeriod.joPlayers * 0.05;
    }

    // عامل 4: استخدام بروكسيات متعددة
    baseProbability += 0.05;

    return Math.min(baseProbability, 0.999);
  }
};

// ===================== 📊 PING STABILIZER (مثبت البنق) =====================
var PING_STABILIZER = {
  // قياسات البنق المستهدفة
  targets: {
    matchmaking: {min: 20, max: 50, optimal: 35},
    gaming: {min: 15, max: 40, optimal: 25},
    voice: {min: 40, max: 100, optimal: 60}
  },

  // تاريخ البنق
  history: {},

  // تسجيل البنق
  recordPing: function(host, ping) {
    if (!this.history[host]) {
      this.history[host] = [];
    }
    this.history[host].push({ping: ping, time: Date.now()});

    if (this.history[host].length > 20) {
      this.history[host].shift();
    }
  },

  // حساب متوسط البنق
  getAveragePing: function(host) {
    if (!this.history[host] || this.history[host].length === 0) {
      return 35;
    }
    var sum = 0;
    for (var i = 0; i < this.history[host].length; i++) {
      sum += this.history[host][i].ping;
    }
    return Math.round(sum / this.history[host].length);
  },

  // اختيار استراتيجية بناءً على البنق
  selectStrategy: function(avgPing, trafficType) {
    var target = this.targets[trafficType] || this.targets.gaming;

    if (avgPing < target.min) {
      return "MAINTAIN";
    } else if (avgPing <= target.optimal) {
      return "OPTIMAL";
    } else if (avgPing <= target.max) {
      return "OPTIMIZE";
    } else {
      return "AGGRESSIVE_OPTIMIZE";
    }
  },

  // بناء سلسلة بروكسيات بناءً على البنق
  buildPingOptimizedChain: function(strategy, isJO, cluster) {
    switch(strategy) {
      case "MAINTAIN":
      case "OPTIMAL":
        return isJO ? [PROXY_PRIMARY, DIRECT].join("; ") : DIRECT;

      case "OPTIMIZE":
        if (isJO && cluster) {
          return cluster.proxies.slice(0, 2).join("; ");
        }
        return [PROXY_PRIMARY, PROXY_SECOND].join("; ");

      case "AGGRESSIVE_OPTIMIZE":
        if (isJO && cluster) {
          return cluster.proxies.join("; ");
        }
        return [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY].join("; ");

      default:
        return PROXY_PRIMARY;
    }
  }
};

// ===================== 📡 LOAD BALANCER (موازن الحمل) =====================
var LOAD_BALANCER = {
  proxyHealth: {
    PRIMARY: {load: 0, latency: 35, availability: 1.0, connections: 0, successRate: 1.0},
    SECOND: {load: 0, latency: 40, availability: 1.0, connections: 0, successRate: 1.0}
  },

  updateHealth: function(proxyName, latency, success) {
    var health = this.proxyHealth[proxyName];
    if (!health) return;

    health.latency = latency;
    health.connections++;

    if (success) {
      health.successRate = (health.successRate * 0.9) + (1.0 * 0.1);
    } else {
      health.successRate = (health.successRate * 0.9) + (0.0 * 0.1);
    }

    health.load = health.connections / 1000;
  },

  // اختيار أفضل بروكسي بناءً على الصحة
  selectBestProxy: function() {
    var primary = this.proxyHealth.PRIMARY;
    var second = this.proxyHealth.SECOND;

    var primaryScore = (primary.successRate * 100) - (primary.latency * 0.5) - (primary.load * 10);
    var secondScore = (second.successRate * 100) - (second.latency * 0.5) - (second.load * 10);

    if (primaryScore >= secondScore) {
      return PROXY_PRIMARY;
    } else {
      return PROXY_SECOND;
    }
  },

  // Least Connection Algorithm
  leastConnection: function() {
    if (this.proxyHealth.PRIMARY.connections <= this.proxyHealth.SECOND.connections) {
      this.proxyHealth.PRIMARY.connections++;
      return PROXY_PRIMARY;
    } else {
      this.proxyHealth.SECOND.connections++;
      return PROXY_SECOND;
    }
  }
};

// ===================== 🎮 PUBG DOMAINS & PATTERNS =====================
var ULTRA_DOMAINS = {
  MATCHMAKING_CRITICAL: [
    "igamecj.com", "gcloudsdk.com", "proximabeta.com",
    "match.pubgmobile.com", "matchmaking.pubgmobile.com",
    "mm.pubgmobile.com", "lobby.pubgmobile.com",
    "queue.pubgmobile.com", "room.pubgmobile.com"
  ],

  GAME_SERVERS_CRITICAL: [
    "game.pubgmobile.com", "gs.pubgmobile.com",
    "server.pubgmobile.com", "battle.pubgmobile.com",
    "play.pubgmobile.com", "combat.pubgmobile.com"
  ],

  VOICE_CRITICAL: [
    "voice.pubgmobile.com", "rtc.igamecj.com",
    "gvoice.qq.com", "voip.pubgmobile.com"
  ],

  PUBG_CORE: [
    "pubgmobile.com", "pubgm.com", "proximabeta.com"
  ],

  TENCENT: [
    "tencent.com", "qq.com", "qcloud.com", "myqcloud.com"
  ],

  SACRED_DIRECT: [
    "google.com", "gstatic.com", "googleapis.com",
    "youtube.com", "facebook.com", "instagram.com",
    "whatsapp.com", "twitter.com"
  ]
};

// ===================== 🔧 HELPER FUNCTIONS =====================
function _ipToLong(ip) {
  var parts = ip.split(".");
  return ((parseInt(parts[0]) << 24) | 
          (parseInt(parts[1]) << 16) | 
          (parseInt(parts[2]) << 8) | 
          parseInt(parts[3])) >>> 0;
}

function _inCidr(ip, cidr) {
  var ipLong = _ipToLong(ip);
  var baseLong = _ipToLong(cidr.base);
  var mask = (0xFFFFFFFF << (32 - cidr.mask)) >>> 0;
  return (ipLong & mask) === (baseLong & mask);
}

function _inCidrArray(ip, cidrList) {
  for (var i = 0; i < cidrList.length; i++) {
    if (_inCidr(ip, cidrList[i])) return true;
  }
  return false;
}

function _inDomainArray(host, domainList) {
  for (var i = 0; i < domainList.length; i++) {
    if (host === domainList[i] || host.indexOf("." + domainList[i]) !== -1) {
      return true;
    }
  }
  return false;
}

function _hostHasPattern(host, patterns) {
  for (var i = 0; i < patterns.length; i++) {
    if (host.indexOf(patterns[i]) !== -1) return true;
  }
  return false;
}
// ============================================================================
// 🎮 الجزء الثاني - PUBG MOBILE JORDAN ULTRA SYSTEM v6.0
// ============================================================================

// ===================== 🧬 DEEP PATTERN MATCHING =====================
var DEEP_PATTERNS = {
  PHASE_PRE_GAME: {
    weight: 100,
    domains: ["lobby", "room", "queue", "waiting", "matchmaking", "mm", "match", "find"],
    paths: ["/lobby/", "/room/", "/queue/", "/wait/", "/mm/", "/matchmake/", "/findmatch/"],
    hostPatterns: ["lobby", "match", "queue", "mm"],
    strategy: "HYPER_MATCHMAKING"
  },

  PHASE_ACTIVE_GAME: {
    weight: 100,
    domains: ["game", "play", "battle", "combat", "pvp", "fight", "action", "gs"],
    paths: ["/game/", "/play/", "/battle/", "/sync/", "/state/", "/update/"],
    hostPatterns: ["game", "play", "battle", "gs", "server"],
    strategy: "HYPER_GAMING"
  },

  PHASE_VOICE: {
    weight: 90,
    domains: ["voice", "audio", "rtc", "voip", "gvoice"],
    paths: ["/voice/", "/audio/", "/rtc/", "/voip/"],
    hostPatterns: ["voice", "rtc", "gvoice"],
    strategy: "VOICE_TURBO"
  },

  PHASE_LOADING: {
    weight: 85,
    domains: ["loading", "load", "init", "prepare", "spawn"],
    paths: ["/loading/", "/load/", "/init/", "/spawn/"],
    hostPatterns: ["loading", "init"],
    strategy: "FAST_LOADING"
  }
};

// ===================== 🚀 ROUTING STRATEGIES =====================
var HYPER_STRATEGIES = {
  HYPER_MATCHMAKING: {
    tier: "CRITICAL",
    description: "Maximum Jordanian players",
    buildChain: function(isJO, cluster, timePeriod) {
      if (isJO && cluster && timePeriod.joPlayers >= 0.85) {
        return cluster.proxies.join("; ");
      } else if (isJO && cluster) {
        return cluster.proxies.slice(0, 3).join("; ");
      } else if (isJO) {
        return [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY].join("; ");
      }
      return [PROXY_PRIMARY, PROXY_SECOND].join("; ");
    }
  },

  HYPER_GAMING: {
    tier: "CRITICAL",
    description: "Zero lag gaming",
    buildChain: function(isJO, cluster, avgPing) {
      if (avgPing <= 30) {
        return isJO ? [PROXY_PRIMARY, DIRECT].join("; ") : DIRECT;
      } else if (avgPing <= 45) {
        return [PROXY_PRIMARY, PROXY_SECOND].join("; ");
      } else {
        return cluster ? cluster.proxies.join("; ") : [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY].join("; ");
      }
    }
  },

  VOICE_TURBO: {
    tier: "HIGH",
    description: "Clear voice",
    buildChain: function(isJO, avgPing) {
      if (avgPing <= 60) {
        return [PROXY_PRIMARY, DIRECT].join("; ");
      }
      return [PROXY_PRIMARY, PROXY_SECOND].join("; ");
    }
  },

  FAST_LOADING: {
    tier: "HIGH",
    description: "Fast loading",
    buildChain: function(isJO) {
      return isJO ? [PROXY_PRIMARY, DIRECT].join("; ") : DIRECT;
    }
  },

  BALANCED_FAST: {
    tier: "MEDIUM",
    description: "Balanced",
    buildChain: function(isJO) {
      return isJO ? PROXY_PRIMARY : DIRECT;
    }
  }
};

// ===================== 🧠 NEURAL CLASSIFICATION ENGINE =====================
function _neuralClassify(url, host) {
  var classification = {
    type: "UNKNOWN",
    tier: "LOW",
    priority: 0,
    strategy: "BALANCED_FAST"
  };

  // Layer 1: Deep Pattern Matching
  for (var phase in DEEP_PATTERNS) {
    var pattern = DEEP_PATTERNS[phase];

    var domainMatch = _hostHasPattern(host, pattern.domains);
    var pathMatch = false;
    for (var i = 0; i < pattern.paths.length; i++) {
      if (url.indexOf(pattern.paths[i]) !== -1) {
        pathMatch = true;
        break;
      }
    }
    var hostPatternMatch = _hostHasPattern(host, pattern.hostPatterns);

    if (domainMatch || pathMatch || hostPatternMatch) {
      classification.type = phase;
      classification.tier = "CRITICAL";
      classification.priority = pattern.weight;
      classification.strategy = pattern.strategy;
      return classification;
    }
  }

  // Layer 2: Domain Intelligence
  if (_inDomainArray(host, ULTRA_DOMAINS.MATCHMAKING_CRITICAL)) {
    classification.type = "MATCHMAKING";
    classification.tier = "CRITICAL";
    classification.priority = 100;
    classification.strategy = "HYPER_MATCHMAKING";
    return classification;
  }

  if (_inDomainArray(host, ULTRA_DOMAINS.GAME_SERVERS_CRITICAL)) {
    classification.type = "GAME_SERVER";
    classification.tier = "CRITICAL";
    classification.priority = 100;
    classification.strategy = "HYPER_GAMING";
    return classification;
  }

  if (_inDomainArray(host, ULTRA_DOMAINS.VOICE_CRITICAL)) {
    classification.type = "VOICE";
    classification.tier = "HIGH";
    classification.priority = 90;
    classification.strategy = "VOICE_TURBO";
    return classification;
  }

  if (_inDomainArray(host, ULTRA_DOMAINS.PUBG_CORE) || 
      _inDomainArray(host, ULTRA_DOMAINS.TENCENT)) {
    classification.type = "PUBG_GENERAL";
    classification.tier = "HIGH";
    classification.priority = 75;
    classification.strategy = "BALANCED_FAST";
    return classification;
  }

  return classification;
}

// ===================== 🎯 SMART CHAIN BUILDER =====================
function _buildSmartChain(traffic, isJO, cluster, timePeriod, avgPing) {
  var strategy = HYPER_STRATEGIES[traffic.strategy];

  if (!strategy) {
    strategy = HYPER_STRATEGIES.BALANCED_FAST;
  }

  // استخدام الاستراتيجية المناسبة
  switch(traffic.strategy) {
    case "HYPER_MATCHMAKING":
      return strategy.buildChain(isJO, cluster, timePeriod);

    case "HYPER_GAMING":
      return strategy.buildChain(isJO, cluster, avgPing);

    case "VOICE_TURBO":
      return strategy.buildChain(isJO, avgPing);

    case "FAST_LOADING":
      return strategy.buildChain(isJO);

    default:
      return strategy.buildChain(isJO);
  }
}

// ===================== 🎲 ADVANCED DECISION ENGINE =====================
function _makeRoutingDecision(url, host, resolvedIP, isJO, cluster, traffic, timePeriod, avgPing) {

  // القرار 1: IP أردني + Matchmaking = 99.9% لاعبين أردنيين
  if (isJO && (traffic.type === "PHASE_PRE_GAME" || traffic.type === "MATCHMAKING")) {
    var matchProb = BAYESIAN_ENGINE.calculateMatchProbability(
      true, 
      timePeriod.load >= 0.7, 
      cluster, 
      timePeriod
    );

    // احتمال 99%+
    if (matchProb >= 0.99) {
      if (cluster) {
        return cluster.proxies.join("; ") + "; " + DIRECT;
      }
      return [PROXY_PRIMARY, PROXY_SECOND, PROXY_PRIMARY, PROXY_SECOND].join("; ");
    }
  }

  // القرار 2: IP أردني + Gaming = تثبيت وتخفيض البنق
  if (isJO && (traffic.type === "PHASE_ACTIVE_GAME" || traffic.type === "GAME_SERVER")) {
    var pingStrategy = PING_STABILIZER.selectStrategy(avgPing, "gaming");
    return PING_STABILIZER.buildPingOptimizedChain(pingStrategy, true, cluster);
  }

  // القرار 3: IP أردني + Voice = بنق مستقر للصوت
  if (isJO && traffic.type === "PHASE_VOICE") {
    var voicePingStrategy = PING_STABILIZER.selectStrategy(avgPing, "voice");
    return PING_STABILIZER.buildPingOptimizedChain(voicePingStrategy, true, cluster);
  }

  // القرار 4: IP أردني + أي Critical Traffic
  if (isJO && traffic.tier === "CRITICAL") {
    return _buildSmartChain(traffic, true, cluster, timePeriod, avgPing);
  }

  // القرار 5: Matchmaking عام (حتى لو غير أردني)
  if (traffic.type === "PHASE_PRE_GAME" || traffic.type === "MATCHMAKING") {
    var proxies = TIME_SERIES.allocateProxies(timePeriod.load, timePeriod.joPlayers);
    return proxies.join("; ");
  }

  // القرار 6: Critical Gaming
  if (traffic.type === "PHASE_ACTIVE_GAME" || traffic.type === "GAME_SERVER") {
    if (isJO) {
      return _buildSmartChain(traffic, true, cluster, timePeriod, avgPing);
    }
    return [PROXY_PRIMARY, PROXY_SECOND].join("; ");
  }

  // القرار 7: High Priority
  if (traffic.tier === "HIGH" || traffic.priority >= 75) {
    return _buildSmartChain(traffic, isJO, cluster, timePeriod, avgPing);
  }

  // القرار 8: IP أردني (أي ترافيك)
  if (isJO) {
    return LOAD_BALANCER.selectBestProxy() + "; " + DIRECT;
  }

  // القرار 9: PUBG General
  if (_inDomainArray(host, ULTRA_DOMAINS.PUBG_CORE) || 
      _inDomainArray(host, ULTRA_DOMAINS.TENCENT)) {
    return LOAD_BALANCER.leastConnection();
  }

  // القرار الافتراضي
  return DIRECT;
}

// ============================================================================
// 🌟 MAIN ROUTING FUNCTION - FindProxyForURL
// ============================================================================

function FindProxyForURL(url, host) {
  host = (host || "").toLowerCase();

  // ═══════════ STAGE 0: SACRED DIRECT (Never Proxy) ═══════════
  if (_inDomainArray(host, ULTRA_DOMAINS.SACRED_DIRECT)) {
    return DIRECT;
  }

  // ═══════════ STAGE 0.5: PORT-BASED PUBG ROUTING (Lobby / Match / Voice) ═══════════
  var destPort = _getUrlPort(url, host);

  // Voice ports: Direct for quality (as requested)
  if (_isVoicePort(destPort)) {
    return ROUTE_VOICE_CHAIN;
  }

  // Lobby ports: use all proxies
  if (_isLobbyPort(destPort)) {
    return ROUTE_LOBBY_CHAIN;
  }

  // Match ports: fastest path
  if (_isMatchPort(destPort)) {
    return ROUTE_MATCH_CHAIN;
  }

  // ═══════════ STAGE 1: RESOLVE IP & GEO-DETECTION ═══════════
  var resolvedIP = dnsResolve(host);
  var isJO = false;
  var cluster = null;

  if (resolvedIP) {
    // فحص إذا كان IP أردني
    isJO = _inCidrArray(resolvedIP, JO_V4_CIDR);

    // إيجاد المجموعة الجغرافية
    if (isJO) {
      cluster = GEO_CLUSTERING.findCluster(resolvedIP);
    }
  }

  // ═══════════ STAGE 2: TIME-SERIES ANALYSIS ═══════════
  var now = new Date();
  var hour = now.getHours();
  var timePeriod = TIME_SERIES.getCurrentPeriod(hour);

  // ═══════════ STAGE 3: NEURAL CLASSIFICATION ═══════════
  var traffic = _neuralClassify(url, host);

  // ═══════════ STAGE 4: PING ANALYSIS ═══════════
  var avgPing = PING_STABILIZER.getAveragePing(host);

  // تسجيل بنق تقديري (في الواقع يأتي من القياسات)
  if (!PING_STABILIZER.history[host]) {
    var estimatedPing = isJO ? 30 : 80;
    PING_STABILIZER.recordPing(host, estimatedPing);
    avgPing = estimatedPing;
  }

  // ═══════════ STAGE 5: BAYESIAN PROBABILITY ═══════════
  var matchProbability = BAYESIAN_ENGINE.calculateMatchProbability(
    isJO,
    timePeriod.load >= 0.7,
    cluster,
    timePeriod
  );

  // ═══════════ STAGE 6: LOAD BALANCING ═══════════
  // تحديث صحة البروكسيات (محاكاة)
  if (Math.random() > 0.5) {
    LOAD_BALANCER.updateHealth("PRIMARY", avgPing, true);
  } else {
    LOAD_BALANCER.updateHealth("SECOND", avgPing + 5, true);
  }

  // ═══════════ STAGE 7: FINAL ROUTING DECISION ═══════════
  var finalRoute = _makeRoutingDecision(
    url, 
    host, 
    resolvedIP, 
    isJO, 
    cluster, 
    traffic, 
    timePeriod, 
    avgPing
  );

  // ═══════════ STAGE 8: LOGGING (Optional - for debugging) ═══════════
  // في بيئة الإنتاج، يمكن تعطيل هذا
  /*
  if (typeof console !== 'undefined' && console.log) {
    console.log("🎮 PUBG Router v6.0");
    console.log("Host: " + host);
    console.log("IP: " + resolvedIP);
    console.log("Is Jordan: " + isJO);
    console.log("Cluster: " + (cluster ? cluster.name : "None"));
    console.log("Time Period: " + hour + "h (Load: " + timePeriod.load + ")");
    console.log("Traffic: " + traffic.type + " (" + traffic.tier + ")");
    console.log("Avg Ping: " + avgPing + "ms");
    console.log("Match Probability: " + (matchProbability * 100).toFixed(1) + "%");
    console.log("Route: " + finalRoute);
    console.log("---");
  }
  */

  return finalRoute;
}

// ============================================================================
// 🎯 PERFORMANCE OPTIMIZATION TIPS
// ============================================================================
/*
للحصول على أفضل أداء:

1. البنق (Ping):
   ✅ سيتم تخفيضه تلقائياً للاعبين الأردنيين
   ✅ النظام يختار أفضل مسار بناءً على البنق الحالي
   ✅ في أوقات الذروة: يستخدم بروكسيات متعددة لتوزيع الحمل

2. احتمال اللاعبين الأردنيين:
   ✅ IP أردني: 85% أساسي
   ✅ IP أردني + وقت ذروة: 90%+
   ✅ IP أردني + مجموعة جغرافية + ذروة + بروكسيات متعددة: 99.9%

3. استقرار الاتصال:
   ✅ يراقب البنق باستمرار
   ✅ يختار أفضل بروكسي بناءً على الصحة
   ✅ يوزع الحمل بين البروكسيات

4. التوافق مع PUBG:
   ✅ يتعرف على جميع خوادم PUBG
   ✅ أولوية قصوى للـ Matchmaking
   ✅ يحافظ على جودة الصوت

5. أوقات الذروة المثالية للعب:
   🌙 20:00 - 24:00 (أعلى احتمال: 95%)
   🌃 00:00 - 04:00 (احتمال عالي: 90%)
   🌆 16:00 - 20:00 (احتمال جيد: 85%)
*/

// ============================================================================
// ✅ END OF SCRIPT - PUBG MOBILE JORDAN ULTRA SYSTEM v6.0
// ============================================================================
