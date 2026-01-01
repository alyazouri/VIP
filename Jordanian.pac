// ===================== PART 1: CORE CONFIG & SYSTEMS =====================

// ===================== USER SWITCHES =====================
var CFG = {
  ALLOW_SAFE_DIRECT: true,
  ENABLE_MATCHMAKING_PRESSURE: true,
  MAX_CHAIN: 2,
  PRESSURE_LEVEL: 18, // رفعناه من 14 لـ 18 لضغط أقوى
  AGGRESSIVE_JO_MODE: true, // جديد: وضع الإجبار الأردني
  LEARNING_ENABLED: true, // جديد: التعلم من المحاولات
  ASN_OPTIMIZATION: true // جديد: تحسين بالـ ASN
};

// ===================== SAFE DIRECT DOMAINS =====================
var SAFE_DIRECT_DOMAINS = [
  "captive.apple.com","ocsp.apple.com","ocsp2.apple.com","time.apple.com","mesu.apple.com","gsp-ssl.ls.apple.com",
  "connectivitycheck.gstatic.com","clients3.google.com","clients4.google.com",
  "github.com","raw.githubusercontent.com","youtube.com","googlevideo.com","ytimg.com"
];

// ===================== BLOCK =====================
var BLOCK = "PROXY 0.0.0.0:0";

// ===================== HYPER PROXIES =====================
var HYPER_PROXIES = {
  JO_ULTRA: {
    QUANTUM_1: "PROXY 212.35.66.45:20020",
    QUANTUM_2: "PROXY 46.185.131.218:20001",
    QUANTUM_3: "PROXY 212.35.66.46:443",
    QUANTUM_4: "PROXY 91.106.109.12:20004",
    QUANTUM_5: "PROXY 185.165.120.34:8080",
    QUANTUM_6: "PROXY 94.249.123.45:3128"
  },
  JO_SPECIALIZED: {
    MATCH_ALPHA: "PROXY 212.35.66.45:20020",
    MATCH_BETA:  "PROXY 46.185.131.218:20001",
    MATCH_GAMMA: "PROXY 94.249.123.45:3128",
    VOICE_ALPHA: "PROXY 46.185.131.222:20001",
    VOICE_BETA:  "PROXY 46.185.131.223:20001",
    VOICE_GAMMA: "PROXY 185.165.120.34:8080",
    GAME_ALPHA:  "PROXY 91.106.109.12:20001",
    GAME_BETA:   "PROXY 91.106.109.25:20001",
    GAME_GAMMA:  "PROXY 212.35.66.46:443"
  },
  JO_BALANCERS: {
    LB_1: "PROXY 212.35.66.45:20020",
    LB_2: "PROXY 46.185.131.218:20001",
    LB_3: "PROXY 91.106.109.25:20001",
    LB_4: "PROXY 94.249.123.45:3128",
    LB_5: "PROXY 185.165.120.34:8080"
  },
  JO_RESERVE: {
    RESCUE_1: "PROXY 86.108.12.34:8080",
    RESCUE_2: "PROXY 109.107.224.56:3128",
    RESCUE_3: "PROXY 176.29.78.90:8080",
    RESCUE_4: "PROXY 37.202.128.12:3128"
  }
};

// ===================== DOMAIN MAP =====================
var ULTRA_DOMAINS = {
  MATCHMAKING_CRITICAL: [
    "igamecj.com","gcloudsdk.com","proximabeta.com",
    "match.pubgmobile.com","matchmaking.pubgmobile.com","mm.pubgmobile.com",
    "lobby.pubgmobile.com","queue.pubgmobile.com","room.pubgmobile.com",
    "recruit.pubgmobile.com","team.pubgmobile.com","find.pubgmobile.com","search.pubgmobile.com"
  ],
  GAME_SERVERS_CRITICAL: [
    "game.pubgmobile.com","gs.pubgmobile.com","server.pubgmobile.com",
    "battle.pubgmobile.com","play.pubgmobile.com","combat.pubgmobile.com",
    "pvp.pubgmobile.com","sync.pubgmobile.com","action.pubgmobile.com"
  ],
  VOICE_CRITICAL: [
    "voice.pubgmobile.com","rtc.igamecj.com","gvoice.qq.com",
    "voip.pubgmobile.com","audio.pubgmobile.com","rtc.pubgmobile.com",
    "talk.pubgmobile.com","mic.pubgmobile.com"
  ],
  CDN_UPDATES: [
    "cdn.pubgmobile.com","dl.pubgmobile.com","download.pubgmobile.com",
    "patch.pubgmobile.com","update.pubgmobile.com",
    "cloud.gsdk.proximabeta.com","down.qq.com","dldir1.qq.com"
  ],
  PUBG_CORE_HIGH: [
    "pubgmobile.com","pubgm.com","proximabeta.com","pubgmobile.proximabeta.com",
    "tencent.com","qq.com","qcloud.com","gcloudsdk.com"
  ]
};

// ===================== GEO MATRIX =====================
var GEO_MATRIX = {
  JO: [
    "109.107.224.0/19","176.29.0.0/16","86.108.0.0/17","46.185.128.0/17",
    "92.253.0.0/17","94.249.0.0/17","149.200.128.0/17","176.28.128.0/17",
    "82.212.64.0/18","37.202.64.0/18","79.173.192.0/18","213.186.160.0/19",
    "46.248.192.0/19","92.241.32.0/19","95.172.192.0/19",
    "185.165.120.0/24","94.249.123.0/24","86.108.12.0/24","109.107.224.0/24",
    "176.29.78.0/24","37.202.128.0/24","91.106.0.0/16","212.35.0.0/16"
  ],
  PS: ["188.161.128.0/17","212.14.192.0/19","217.19.128.0/19","37.8.0.0/16","5.37.0.0/16"],
  LB: ["77.42.128.0/17","77.110.64.0/18","178.135.0.0/16","212.40.64.0/19","213.168.192.0/19"],
  SY: ["5.0.0.0/17","46.53.0.0/16","46.161.0.0/16","31.9.0.0/16"],
  SA: ["2.88.0.0/14","5.41.0.0/16","5.108.0.0/14","37.208.0.0/13","46.28.0.0/16"],
  KW: ["31.203.0.0/16","37.36.0.0/14","37.231.0.0/16","80.184.0.0/15","213.180.128.0/17"],
  AE: ["2.48.0.0/14","5.30.0.0/15","5.32.0.0/17","5.107.0.0/16","213.42.0.0/16"],
  PRIORITY_NEIGHBORS: ["PS","LB","SY"],
  STANDARD_NEIGHBORS: ["SA","KW","AE"]
};

// ===================== CIDR CACHE =====================
var CIDR_CACHE = {};

function _ipToLong(ip){
  var p=ip.split(".");
  if(p.length!==4) return -1;
  var a=(parseInt(p[0],10)&255),b=(parseInt(p[1],10)&255),c=(parseInt(p[2],10)&255),d=(parseInt(p[3],10)&255);
  return (((a<<24)>>>0)|((b<<16)>>>0)|((c<<8)>>>0)|(d>>>0))>>>0;
}

function _precomputeCidrCache(){
  for (var cc in GEO_MATRIX){
    if (!Array.isArray(GEO_MATRIX[cc])) continue;
    CIDR_CACHE[cc]=[];
    for (var i=0;i<GEO_MATRIX[cc].length;i++){
      var cidr=GEO_MATRIX[cc][i];
      var s=cidr.indexOf("/");
      if(s<0) continue;
      var ip=cidr.substring(0,s);
      var bits=parseInt(cidr.substring(s+1),10);
      var ipLong=_ipToLong(ip);
      if(ipLong<0) continue;
      var mask=(0xFFFFFFFF << (32-bits))>>>0;
      CIDR_CACHE[cc].push({network: ipLong, mask: mask});
    }
  }
}

function _cidrMatch(ip, entry){
  var ipLong=_ipToLong(ip);
  if(ipLong<0) return false;
  return ((ipLong & entry.mask)>>>0) === (entry.network>>>0);
}

function _inCidrArray(ip, cc){
  var arr = CIDR_CACHE[cc];
  if(!ip || !arr) return false;
  for (var i=0;i<arr.length;i++){
    if(_cidrMatch(ip, arr[i])) return true;
  }
  return false;
}

_precomputeCidrCache();

// ===================== DOMAIN MATCHING =====================
function _endsWith(host, dom){
  return host===dom || (host.length>dom.length && host.substring(host.length-dom.length-1)==="."+dom);
}

function _inDomainArray(host, arr){
  for(var i=0;i<arr.length;i++){
    if(_endsWith(host, arr[i])) return true;
  }
  return false;
}

// ===================== PING MATRIX =====================
var PING_MATRIX = {
  PING_WEIGHTS: {
    "PROXY 212.35.66.45:20020": {base: 12, stab: 9},
    "PROXY 46.185.131.218:20001": {base: 14, stab: 9},
    "PROXY 212.35.66.46:443": {base: 16, stab: 8},
    "PROXY 91.106.109.12:20004": {base: 17, stab: 8},
    "PROXY 91.106.109.12:20001": {base: 17, stab: 8},
    "PROXY 91.106.109.25:20001": {base: 18, stab: 8},
    "PROXY 185.165.120.34:8080": {base: 19, stab: 7},
    "PROXY 94.249.123.45:3128": {base: 20, stab: 7},
    "PROXY 86.108.12.34:8080": {base: 23, stab: 6},
    "PROXY 109.107.224.56:3128": {base: 24, stab: 6},
    "PROXY 176.29.78.90:8080": {base: 24, stab: 6},
    "PROXY 37.202.128.12:3128": {base: 25, stab: 6}
  },
  score: function(proxy){
    var w=this.PING_WEIGHTS[proxy] ? this.PING_WEIGHTS[proxy] : {base: 50, stab: 1};
    return (w.base*10) - (w.stab*3);
  },
  sortByPing: function(list){
    var a=list.slice();
    a.sort(function(x,y){ return PING_MATRIX.score(x)-PING_MATRIX.score(y); });
    return a;
  }
};

// ===================== ASN ROUTER (جديد) =====================
var ASN_ROUTER = {
  jordanianASN: {
    "212.35.0.0/16": "AS8376",    // Orange
    "35.66.0.0/16": "AS8376",
    "46.185.128.0/17": "AS48832", // Zain
    "92.253.0.0/17": "AS48832",
    "37.202.64.0/18": "AS47887",  // Umniah
    "82.212.64.0/18": "AS47887",
    "185.165.120.0/22": "AS41330", // Batelco
    "91.106.0.0/16": "AS8376"     // Orange Range
  },
  
  detectASN: function(ip) {
    for (var cidr in this.jordanianASN) {
      var s = cidr.indexOf("/");
      var network = cidr.substring(0, s);
      var bits = parseInt(cidr.substring(s + 1), 10);
      var netLong = _ipToLong(network);
      var ipLong = _ipToLong(ip);
      var mask = (0xFFFFFFFF << (32 - bits)) >>> 0;
      if (((ipLong & mask) >>> 0) === ((netLong & mask) >>> 0)) {
        return this.jordanianASN[cidr];
      }
    }
    return null;
  },
  
  classifyProvider: function(asn) {
    if (!asn) return "UNKNOWN";
    if (asn === "AS8376") return "ORANGE";
    if (asn === "AS48832") return "ZAIN";
    if (asn === "AS47887") return "UMNIAH";
    if (asn === "AS41330") return "BATELCO";
    return "FOREIGN";
  },
  
  sameProviderProxy: function(provider) {
    var providerProxies = {
      ORANGE: HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      ZAIN: HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      UMNIAH: HYPER_PROXIES.JO_SPECIALIZED.GAME_ALPHA,
      BATELCO: HYPER_PROXIES.JO_ULTRA.QUANTUM_5
    };
    return providerProxies[provider] || null;
  }
};

// ===================== GEO MAGNETISM (جديد) =====================
var GEO_MAGNETISM = {
  calculatePull: function(ip) {
    if (!ip) return 0;
    var ipLong = _ipToLong(ip);
    var jordanCenter = _ipToLong("212.35.66.1");
    var distance = Math.abs(ipLong - jordanCenter);
    var maxDist = 4294967295;
    var pull = 100 - ((distance / maxDist) * 100);
    return pull;
  },
  
  classifyByMagnetism: function(ip) {
    var pull = this.calculatePull(ip);
    if (pull > 90) return "ULTRA_CLOSE";
    if (pull > 70) return "VERY_CLOSE";
    if (pull > 50) return "CLOSE";
    if (pull > 30) return "MEDIUM";
    return "FAR";
  }
};

// ===================== JO ENFORCER (جديد) =====================
var JO_ENFORCER = {
  attempts: {},
  
  trackAttempt: function(host, ip, isJO) {
    var key = host + ":" + ip;
    if (!this.attempts[key]) {
      this.attempts[key] = {
        total: 0,
        joSuccess: 0,
        nonJoAttempts: 0,
        lastJO: 0,
        firstSeen: Date.now()
      };
    }
    this.attempts[key].total++;
    if (isJO) {
      this.attempts[key].joSuccess++;
      this.attempts[key].lastJO = Date.now();
    } else {
      this.attempts[key].nonJoAttempts++;
    }
    return this.attempts[key];
  },
  
  shouldAcceptNonJO: function(host, ip) {
    var key = host + ":" + ip;
    var record = this.attempts[key];
    if (!record) return false;
    if (record.joSuccess > 0) return false;
    if (record.total > 10 && record.joSuccess === 0) return true;
    return false;
  },
  
  forceJORouting: function() {
    return [
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA,
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_GAMMA,
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2,
      BLOCK
    ].join("; ");
  }
};
// ===================== PART 2: ADVANCED SYSTEMS & MAIN LOGIC =====================

// ===================== PING OPTIMIZER (جديد) =====================
var PING_OPTIMIZER = {
  history: {},
  
  recordPing: function(proxy, host, estimatedPing) {
    var key = proxy + ":" + host;
    if (!this.history[key]) {
      this.history[key] = {
        samples: [],
        avg: 0,
        min: 999,
        max: 0,
        trend: "STABLE",
        lastUpdate: Date.now()
      };
    }
    
    var record = this.history[key];
    record.samples.push({
      ping: estimatedPing,
      time: Date.now()
    });
    
    if (record.samples.length > 30) {
      record.samples.shift();
    }
    
    this.calculateStats(record);
    record.lastUpdate = Date.now();
  },
  
  calculateStats: function(record) {
    var sum = 0;
    record.min = 999;
    record.max = 0;
    
    for (var i = 0; i < record.samples.length; i++) {
      var ping = record.samples[i].ping;
      sum += ping;
      if (ping < record.min) record.min = ping;
      if (ping > record.max) record.max = ping;
    }
    
    record.avg = sum / record.samples.length;
    
    if (record.samples.length >= 10) {
      var recent = record.samples.slice(-5);
      var older = record.samples.slice(-10, -5);
      var recentAvg = 0, olderAvg = 0;
      
      for (var j = 0; j < recent.length; j++) {
        recentAvg += recent[j].ping;
      }
      recentAvg /= recent.length;
      
      for (var k = 0; k < older.length; k++) {
        olderAvg += older[k].ping;
      }
      olderAvg /= older.length;
      
      if (recentAvg > olderAvg * 1.2) {
        record.trend = "DEGRADING";
      } else if (recentAvg < olderAvg * 0.8) {
        record.trend = "IMPROVING";
      } else {
        record.trend = "STABLE";
      }
    }
  },
  
  selectOptimalProxy: function(proxies, host) {
    var scored = [];
    
    for (var i = 0; i < proxies.length; i++) {
      var key = proxies[i] + ":" + host;
      var record = this.history[key];
      var score = 0;
      
      if (record && CFG.LEARNING_ENABLED) {
        var age = Date.now() - record.lastUpdate;
        if (age < 600000) { // آخر 10 دقائق
          score = 1000 - record.avg;
          var stability = record.max - record.min;
          score -= stability * 0.5;
          
          if (record.trend === "IMPROVING") score += 50;
          if (record.trend === "DEGRADING") score -= 50;
        } else {
          score = 500; // بيانات قديمة
        }
      } else {
        var baseScore = PING_MATRIX.score(proxies[i]);
        score = 1000 - baseScore;
      }
      
      scored.push({proxy: proxies[i], score: score});
    }
    
    scored.sort(function(a, b) { return b.score - a.score; });
    return scored.map(function(item) { return item.proxy; });
  },
  
  estimatePing: function(proxy, host) {
    var w = PING_MATRIX.PING_WEIGHTS[proxy];
    if (!w) return 50;
    
    var basePing = w.base;
    var jitter = (Math.random() * 10) - 5;
    return basePing + jitter;
  }
};

// ===================== MULTI PROBE (جديد) =====================
var MULTI_PROBE = {
  probeResults: {},
  lastProbeTime: {},
  
  getBestProxyForHost: function(host) {
    var best = null;
    var bestScore = -1;
    
    for (var key in this.probeResults) {
      if (key.indexOf(host + ":") === 0) {
        var record = this.probeResults[key];
        
        if (record.attempts < 3) continue;
        
        var successRate = record.successes / record.attempts;
        var avgLat = record.avgLatency || 100;
        var score = (successRate * 1000) / avgLat;
        
        if (score > bestScore) {
          bestScore = score;
          best = key.split(":")[1];
        }
      }
    }
    
    return best;
  },
  
  recordProbe: function(host, proxy, success, latency) {
    var key = host + ":" + proxy;
    
    if (!this.probeResults[key]) {
      this.probeResults[key] = {
        attempts: 0,
        successes: 0,
        totalLatency: 0,
        avgLatency: 0
      };
    }
    
    var record = this.probeResults[key];
    record.attempts++;
    
    if (success) {
      record.successes++;
      record.totalLatency += latency;
      record.avgLatency = record.totalLatency / record.successes;
    }
    
    this.lastProbeTime[key] = Date.now();
  },
  
  shouldProbe: function(host) {
    var lastTime = this.lastProbeTime[host] || 0;
    var timeSince = Date.now() - lastTime;
    return timeSince > 300000; // كل 5 دقائق
  }
};

// ===================== AGGRESSIVE JO MATCHMAKING (جديد) =====================
var AGGRESSIVE_JO_MATCH = {
  matchAttempts: 0,
  consecutiveNonJO: 0,
  lastReset: Date.now(),
  
  escalationLevels: [
    function() {
      return [
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA
      ].join("; ");
    },
    function() {
      return [
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA,
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_GAMMA,
        HYPER_PROXIES.JO_BALANCERS.LB_1
      ].join("; ");
    },
    function() {
      return [
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA,
        HYPER_PROXIES.JO_SPECIALIZED.MATCH_GAMMA,
        HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
        HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
        HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
        HYPER_PROXIES.JO_BALANCERS.LB_1,
        HYPER_PROXIES.JO_BALANCERS.LB_2
      ].join("; ");
    },
    function() {
      return BLOCK;
    },
    function() {
      return JO_ENFORCER.forceJORouting();
    }
  ],
  
  getEscalationLevel: function() {
    var level = Math.floor(this.consecutiveNonJO / 2);
    return Math.min(level, this.escalationLevels.length - 1);
  },
  
  handleMatchmaking: function(host, ip, isJO) {
    this.matchAttempts++;
    
    if (isJO) {
      this.consecutiveNonJO = 0;
      var asn = ASN_ROUTER.detectASN(ip);
      var provider = ASN_ROUTER.classifyProvider(asn);
      var sameProvider = ASN_ROUTER.sameProviderProxy(provider);
      
      if (sameProvider && CFG.ASN_OPTIMIZATION) {
        return sameProvider;
      }
      return HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA;
    }
    
    this.consecutiveNonJO++;
    
    if (this.shouldReset()) {
      this.reset();
    }
    
    var level = this.getEscalationLevel();
    return this.escalationLevels[level]();
  },
  
  shouldReset: function() {
    var timeSince = Date.now() - this.lastReset;
    return this.matchAttempts > 25 || this.consecutiveNonJO > 10 || timeSince > 600000;
  },
  
  reset: function() {
    this.matchAttempts = 0;
    this.consecutiveNonJO = 0;
    this.lastReset = Date.now();
  }
};

// ===================== STRATEGIES =====================
var HYPER_STRATEGIES = {
  MATCHMAKING: {
    chain: [
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA,
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2
    ],
    pressure: true
  },
  GAMEPLAY: {
    chain: [
      HYPER_PROXIES.JO_SPECIALIZED.GAME_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.GAME_BETA,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2
    ],
    pressure: false
  },
  VOICE: {
    chain: [
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_BETA,
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_GAMMA
    ],
    pressure: false
  },
  CDN: {
    chain: [
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
      HYPER_PROXIES.JO_BALANCERS.LB_5
    ],
    pressure: false
  },
  FALLBACK: {
    chain: [
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2,
      HYPER_PROXIES.JO_BALANCERS.LB_3,
      HYPER_PROXIES.JO_RESERVE.RESCUE_1,
      HYPER_PROXIES.JO_RESERVE.RESCUE_2
    ],
    pressure: false
  }
};

// ===================== HELPER FUNCTIONS =====================
function _dedup(list){
  var out=[], seen={};
  for(var i=0;i<list.length;i++){
    var x=list[i];
    if(!x || seen[x]) continue;
    seen[x]=1; out.push(x);
  }
  return out;
}

function _chainToString(list){
  var max = CFG.MAX_CHAIN;
  if(max<1) max=1;
  var a=list.slice(0, max);
  a=_dedup(a);
  if(a.length===0) return BLOCK;
  return a.join("; ");
}

function _build(strategy){
  var s=HYPER_STRATEGIES[strategy] || HYPER_STRATEGIES.FALLBACK;
  var chain = PING_MATRIX.sortByPing(s.chain);
  return _chainToString(chain);
}

function _pressureReturn(){
  if(!CFG.ENABLE_MATCHMAKING_PRESSURE) return _build("MATCHMAKING");
  if(CFG.PRESSURE_LEVEL >= 16) return BLOCK;
  if(CFG.PRESSURE_LEVEL >= 12) return (_build("MATCHMAKING") + "; " + BLOCK);
  if(CFG.PRESSURE_LEVEL >= 8)  return _build("MATCHMAKING");
  return _build("FALLBACK");
}

// ===================== MAIN FUNCTION =====================
function FindProxyForURL(url, host){
  host=(host||"").toLowerCase();
  url=(url||"");
  
  // SAFE DIRECT
  if(CFG.ALLOW_SAFE_DIRECT){
    if(_inDomainArray(host, SAFE_DIRECT_DOMAINS)) return "DIRECT";
    if(host==="clients3.google.com" && url.toLowerCase().indexOf("generate_204")!==-1) return "DIRECT";
  }
  
  // DNS RESOLVE
  var ip = dnsResolve(host);
  if (!ip) ip = "0.0.0.0";
  
  // ========== تحليل الهوية ==========
  var isJO = _inCidrArray(ip, "JO");
  var magnetism = GEO_MAGNETISM.classifyByMagnetism(ip);
  var asn = null;
  var provider = "UNKNOWN";
  
  if (CFG.ASN_OPTIMIZATION) {
    asn = ASN_ROUTER.detectASN(ip);
    provider = ASN_ROUTER.classifyProvider(asn);
  }
  
  var isLikelyJO = isJO || (magnetism === "ULTRA_CLOSE" && provider !== "FOREIGN");
  
  // تسجيل البنق التقديري
  if (CFG.LEARNING_ENABLED && isJO) {
    var estimatedPing = PING_OPTIMIZER.estimatePing(HYPER_PROXIES.JO_ULTRA.QUANTUM_1, host);
    PING_OPTIMIZER.recordPing(HYPER_PROXIES.JO_ULTRA.QUANTUM_1, host, estimatedPing);
  }
  
  // ========== MATCHMAKING - أولوية قصوى ==========
  if(_inDomainArray(host, ULTRA_DOMAINS.MATCHMAKING_CRITICAL)){
    if (CFG.AGGRESSIVE_JO_MODE) {
      JO_ENFORCER.trackAttempt(host, ip, isLikelyJO);
      
      if (isLikelyJO) {
        AGGRESSIVE_JO_MATCH.consecutiveNonJO = 0;
        
        if (CFG.ASN_OPTIMIZATION && provider !== "UNKNOWN" && provider !== "FOREIGN") {
          var sameProvider = ASN_ROUTER.sameProviderProxy(provider);
          if (sameProvider) return sameProvider;
        }
        
        if (CFG.LEARNING_ENABLED) {
          var matchProxies = [
            HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
            HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA,
            HYPER_PROXIES.JO_SPECIALIZED.MATCH_GAMMA
          ];
          var optimized = PING_OPTIMIZER.selectOptimalProxy(matchProxies, host);
          return optimized[0];
        }
        
        return HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA;
      }
      
      if (!JO_ENFORCER.shouldAcceptNonJO(host, ip)) {
        return AGGRESSIVE_JO_MATCH.handleMatchmaking(host, ip, false);
      }
    }
    
    // Fallback عادي
    if(isJO) return _build("MATCHMAKING");
    if(CFG.ENABLE_MATCHMAKING_PRESSURE) return _pressureReturn();
    
    var neighborPriority = null;
    for(var i=0;i<GEO_MATRIX.PRIORITY_NEIGHBORS.length;i++){
      if(_inCidrArray(ip, GEO_MATRIX.PRIORITY_NEIGHBORS[i])) { 
        neighborPriority="HIGH"; 
        break; 
      }
    }
    if(!neighborPriority){
      for(var j=0;j<GEO_MATRIX.STANDARD_NEIGHBORS.length;j++){
        if(_inCidrArray(ip, GEO_MATRIX.STANDARD_NEIGHBORS[j])) { 
          neighborPriority="MEDIUM"; 
          break; 
        }
      }
    }
    
    if(neighborPriority==="HIGH") return _build("MATCHMAKING");
    if(neighborPriority==="MEDIUM") return _build("FALLBACK");
    return _build("FALLBACK");
  }
  
  // ========== GAMEPLAY ==========
  if(_inDomainArray(host, ULTRA_DOMAINS.GAME_SERVERS_CRITICAL)){
    if (CFG.LEARNING_ENABLED) {
      var bestFromHistory = MULTI_PROBE.getBestProxyForHost(host);
      if (bestFromHistory) {
        return bestFromHistory;
      }
    }
    
    if(isLikelyJO) {
      if (CFG.ASN_OPTIMIZATION && provider !== "UNKNOWN" && provider !== "FOREIGN") {
        var gameProvider = ASN_ROUTER.sameProviderProxy(provider);
        if (gameProvider) return gameProvider;
      }
      return _build("GAMEPLAY");
    }
    
    if (magnetism === "VERY_CLOSE" || magnetism === "CLOSE") {
      return _build("GAMEPLAY");
    }
    
    return _build("GAMEPLAY") + "; " + _build("FALLBACK");
  }
  
  // ========== VOICE ==========
  if(_inDomainArray(host, ULTRA_DOMAINS.VOICE_CRITICAL)){
    if (CFG.LEARNING_ENABLED) {
      var voiceProxies = [
        HYPER_PROXIES.JO_SPECIALIZED.VOICE_ALPHA,
        HYPER_PROXIES.JO_SPECIALIZED.VOICE_BETA,
        HYPER_PROXIES.JO_SPECIALIZED.VOICE_GAMMA
      ];
      var voiceOptimized = PING_OPTIMIZER.selectOptimalProxy(voiceProxies, host);
      return voiceOptimized.slice(0, 2).join("; ");
    }
    return _build("VOICE");
  }
  
  // ========== CDN/UPDATES ==========
  if(_inDomainArray(host, ULTRA_DOMAINS.CDN_UPDATES)){
    return _build("CDN");
  }
  
  // ========== PUBG CORE ==========
  if(_inDomainArray(host, ULTRA_DOMAINS.PUBG_CORE_HIGH)){
    if(isLikelyJO) {
      if (CFG.ASN_OPTIMIZATION && provider !== "UNKNOWN" && provider !== "FOREIGN") {
        var coreProvider = ASN_ROUTER.sameProviderProxy(provider);
        if (coreProvider) return coreProvider;
      }
      return _build("GAMEPLAY");
    }
    
    if (CFG.AGGRESSIVE_JO_MODE && magnetism === "FAR") {
      return BLOCK;
    }
    
    return _build("FALLBACK");
  }
  
  // ========== DEFAULT ==========
  return _build("FALLBACK");
}

// ===================== END OF SCRIPT =====================

