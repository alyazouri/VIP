// ============================================================================
// PUBG MOBILE HYPER-QUANTUM PAC - ULTIMATE EDITION (NO-DIRECT VERSION)
// PART 1: CORE LIBRARIES & DEFINITIONS
// ============================================================================

// ===================== HYPER-PERFORMANCE PROXIES (NO DIRECT) =====================
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
    MATCH_BETA: "PROXY 46.185.131.218:20001",
    MATCH_GAMMA: "PROXY 94.249.123.45:3128",
    VOICE_ALPHA: "PROXY 46.185.131.222:20001",
    VOICE_BETA: "PROXY 46.185.131.223:20001",
    VOICE_GAMMA: "PROXY 185.165.120.34:8080",
    GAME_ALPHA: "PROXY 91.106.109.12:20001",
    GAME_BETA: "PROXY 91.106.109.25:20001",
    GAME_GAMMA: "PROXY 212.35.66.46:443"
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

// ===================== PING OPTIMIZATION MATRIX =====================
var PING_MATRIX = {
  OPTIMAL_PING: 15, // المستوى الأمثل للبينج (بالميلي ثانية)
  MAX_PING: 45,     // أقصى بينج مسموح به
  PING_WEIGHTS: {
    "PROXY 212.35.66.45:20020": { base: 12, stability: 98 },
    "PROXY 46.185.131.218:20001": { base: 15, stability: 95 },
    "PROXY 212.35.66.46:443": { base: 18, stability: 97 },
    "PROXY 91.106.109.12:20004": { base: 22, stability: 94 },
    "PROXY 185.165.120.34:8080": { base: 25, stability: 92 },
    "PROXY 94.249.123.45:3128": { base: 20, stability: 93 },
    "PROXY 46.185.131.222:20001": { base: 14, stability: 96 },
    "PROXY 46.185.131.223:20001": { base: 16, stability: 95 },
    "PROXY 91.106.109.12:20001": { base: 21, stability: 94 },
    "PROXY 91.106.109.25:20001": { base: 23, stability: 93 },
    "PROXY 86.108.12.34:8080": { base: 30, stability: 90 },
    "PROXY 109.107.224.56:3128": { base: 28, stability: 91 },
    "PROXY 176.29.78.90:8080": { base: 32, stability: 89 },
    "PROXY 37.202.128.12:3128": { base: 35, stability: 88 }
  },
  
  // حساب البينج الديناميكي بناءً على الوقت
  calculateDynamicPing: function(proxy) {
    var base = this.PING_WEIGHTS[proxy] ? this.PING_WEIGHTS[proxy].base : 50;
    var stability = this.PING_WEIGHTS[proxy] ? this.PING_WEIGHTS[proxy].stability : 85;
    
    // تأثير الوقت خلال اليوم (أقل بينج في ساعات الذروة المسائية)
    var hour = new Date().getHours();
    var timeFactor = 1.0;
    if (hour >= 18 && hour <= 23) timeFactor = 0.9;  // المساء
    else if (hour >= 0 && hour <= 6) timeFactor = 0.8; // الفجر
    else timeFactor = 1.1; // النهار
    
    // تأثير الاستقرار
    var stabilityFactor = stability / 100;
    
    return Math.round(base * timeFactor * stabilityFactor);
  },
  
  // فرز البروكسيات حسب البينج
  sortByPing: function(proxies) {
    var self = this;
    return proxies.sort(function(a, b) {
      var pingA = self.calculateDynamicPing(a);
      var pingB = self.calculateDynamicPing(b);
      return pingA - pingB;
    });
  },
  
  // فلترة البروكسيات ذات البينج المقبول
  filterByPing: function(proxies, maxPing) {
    var self = this;
    return proxies.filter(function(proxy) {
      return self.calculateDynamicPing(proxy) <= (maxPing || self.MAX_PING);
    });
  }
};

// ===================== DEEP LEARNING PATTERNS (ENHANCED) =====================
var DEEP_PATTERNS = {
  PHASE_PRE_GAME: {
    weight: 100,
    domains: ["lobby","room","queue","waiting","matchmaking","mm","match","find"],
    paths: ["/lobby/","/room/","/queue/","/wait/","/mm/","/matchmake/","/findmatch/","/search/"],
    hostPatterns: ["lobby","match","queue","mm","find"],
    strategy: "HYPER_MATCHMAKING",
    pingRequirement: 20,  // بينج منخفض جداً للمطابقة
    priority: "MAXIMUM"
  },
  PHASE_LOADING: {
    weight: 95,
    domains: ["loading","load","init","prepare","spawn","ready"],
    paths: ["/loading/","/load/","/init/","/prepare/","/spawn/","/ready/","/stage/"],
    hostPatterns: ["loading","init","spawn","ready"],
    strategy: "FAST_LOADING",
    pingRequirement: 30,
    priority: "HIGH"
  },
  PHASE_ACTIVE_GAME: {
    weight: 100,
    domains: ["game","play","battle","combat","pvp","fight","action","sync"],
    paths: ["/game/","/play/","/battle/","/sync/","/state/","/pos/","/move/","/action/","/fire/","/hit/","/update/"],
    hostPatterns: ["game","play","battle","server","sync","combat"],
    strategy: "ZERO_JITTER_ULTRA",
    pingRequirement: 15,  // أقل بينج ممكن أثناء اللعب
    priority: "MAXIMUM"
  },
  PHASE_VOICE: {
    weight: 100,
    domains: ["voice","rtc","audio","voip","call","mic","speaker","gvoice","talk"],
    paths: ["/voice/","/rtc/","/audio/","/webrtc/","/voip/","/call/","/mic/","/speak/","/talk/"],
    hostPatterns: ["voice","rtc","audio","gvoice","voip"],
    strategy: "ZERO_LATENCY_VOICE_ULTRA",
    pingRequirement: 18,  // بينج منخفض للصوت
    priority: "MAXIMUM"
  },
  PHASE_POST_GAME: {
    weight: 60,
    domains: ["result","stats","reward","achievement","rank","score","exp","bp"],
    paths: ["/result/","/stats/","/reward/","/rank/","/score/","/achievement/","/exp/","/bp/","/end/"],
    hostPatterns: ["result","stats","reward","rank"],
    strategy: "BALANCED_FAST",
    pingRequirement: 40,
    priority: "MEDIUM"
  },
  PHASE_RESOURCES: {
    weight: 20,
    domains: ["resource","asset","cdn","static","download","update","patch","file"],
    paths: ["/resource/","/asset/","/download/","/update/","/patch/","/cdn/","/static/","/file/"],
    hostPatterns: ["cdn","static","resource","asset","download"],
    strategy: "CDN_TURBO",
    pingRequirement: 50,
    priority: "LOW"
  },
  PHASE_SOCIAL: {
    weight: 50,
    domains: ["friend","chat","social","team","clan","guild","message","group"],
    paths: ["/friend/","/chat/","/social/","/team/","/clan/","/message/","/group/","/party/"],
    hostPatterns: ["friend","chat","social","team","clan"],
    strategy: "BALANCED_FAST",
    pingRequirement: 35,
    priority: "MEDIUM"
  }
};

// ===================== ULTRA-PRECISE DOMAIN INTELLIGENCE =====================
var ULTRA_DOMAINS = {
  MATCHMAKING_CRITICAL: [
    "igamecj.com","gcloudsdk.com","proximabeta.com",
    "match.pubgmobile.com","matchmaking.pubgmobile.com","mm.pubgmobile.com",
    "lobby.pubgmobile.com","queue.pubgmobile.com","room.pubgmobile.com",
    "find.pubgmobile.com","search.pubgmobile.com"
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
  PUBG_CORE_HIGH: [
    "pubgmobile.com","pubgm.com","proximabeta.com","pubgmobile.proximabeta.com",
    "pubg.com","battlegrounds.pubg.com"
  ],
  TENCENT_HIGH: [
    "tencent.com","qq.com","qcloud.com","tencentgcloud.com","myqcloud.com",
    "weiyun.com","tencentmusic.com"
  ],
  CDN_MEDIUM: [
    "cdnpubg.com","pubgcdn.com","cdn.pubgmobile.com","static.pubgmobile.com",
    "img.pubgmobile.com","image.pubgmobile.com","res.pubgmobile.com",
    "download.pubgmobile.com","asset.pubgmobile.com"
  ],
  ANALYTICS_LOW: [
    "analytics","telemetry","metrics","tracking","trace","log",
    "appsflyer.com","adjust.com","branch.io","firebase.com","firebaseio.com",
    "crashlytics.com","sentry.io","datadoghq.com","analytics.google.com",
    "logs.pubgmobile.com","stats.pubgmobile.com"
  ],
  SACRED_DIRECT_REMOVED: [  // محجوز ولكن تم إلغاء الدايركت
    "google.com","gstatic.com","apple.com","microsoft.com","facebook.com"
    // جميع هذه ستعبر عبر البروكسي حسب الأولوية
  ]
};
// ============================================================================
// PUBG MOBILE HYPER-QUANTUM PAC - ULTIMATE EDITION (NO-DIRECT VERSION)
// PART 2: CORE ENGINE & ROUTING LOGIC
// ============================================================================

// ===================== GEO MATRIX ENHANCED =====================
var GEO_MATRIX = {
  JO: [
    "109.107.224.0/19","176.29.0.0/16","86.108.0.0/17","46.185.128.0/17",
    "92.253.0.0/17","94.249.0.0/17","149.200.128.0/17","176.28.128.0/17",
    "82.212.64.0/18","37.202.64.0/18","79.173.192.0/18","213.186.160.0/19",
    "46.248.192.0/19","92.241.32.0/19","95.172.192.0/19",
    "37.32.0.0/11","5.154.0.0/16","85.158.0.0/16","176.28.0.0/15",
    "31.9.0.0/16","91.106.0.0/16","185.165.120.0/24","94.249.123.0/24",
    "86.108.12.0/24","109.107.224.0/24","176.29.78.0/24","37.202.128.0/24"
  ],
  
  // دول مجاورة مصنفة حسب الأولوية
  PRIORITY_NEIGHBORS: ["PS", "LB", "SY"],  // أولوية عالية
  STANDARD_NEIGHBORS: ["SA", "KW", "AE"],  // أولوية متوسطة
  LOW_NEIGHBORS: ["IQ", "EG", "QA", "BH", "OM"]  // أولوية منخفضة
};

// نطاقات الدول المجاورة
GEO_MATRIX.PS = ["1.178.112.0/20","1.178.128.0/20","24.42.64.0/18","37.8.0.0/17","46.61.0.0/16","188.161.128.0/17","212.14.192.0/19","217.19.128.0/19"];
GEO_MATRIX.LB = ["5.8.128.0/19","77.42.128.0/17","77.110.64.0/18","178.135.0.0/16","185.66.0.0/16","212.40.64.0/19","212.72.192.0/19","213.168.192.0/19"];
GEO_MATRIX.SY = ["5.0.0.0/17","46.53.0.0/16","46.161.192.0/18","82.137.192.0/18","185.90.0.0/15"];
GEO_MATRIX.SA = ["2.88.0.0/14","5.41.0.0/16","5.82.0.0/16","5.108.0.0/14","31.166.0.0/15","37.208.0.0/13","46.28.0.0/16","46.234.0.0/15","78.93.0.0/16","82.205.128.0/17","91.102.0.0/16","109.107.32.0/19","151.232.0.0/14","188.245.0.0/16","212.138.64.0/19"];
GEO_MATRIX.KW = ["31.203.0.0/16","31.214.0.0/17","37.36.0.0/14","37.231.0.0/16","46.229.0.0/16","62.215.0.0/17","80.184.0.0/15","85.25.0.0/16","188.246.128.0/17","213.180.128.0/17"];
GEO_MATRIX.AE = ["2.48.0.0/14","5.30.0.0/15","5.32.0.0/17","5.107.0.0/16","5.192.0.0/15","31.193.128.0/17","37.246.0.0/16","46.252.128.0/17","62.215.128.0/17","78.84.0.0/15","84.17.96.0/19","85.115.0.0/16"];
GEO_MATRIX.IQ = ["5.62.0.0/16","37.236.0.0/14","149.255.0.0/16","185.84.0.0/16","188.120.0.0/13","213.175.0.0/16"];
GEO_MATRIX.EG = ["41.32.0.0/12","196.128.0.0/10","197.32.0.0/11","154.176.0.0/12","41.128.0.0/11","41.190.0.0/15","197.160.0.0/11","196.176.0.0/14"];
GEO_MATRIX.QA = ["37.210.0.0/15","77.81.64.0/18","185.3.0.0/16","212.77.0.0/17"];
GEO_MATRIX.BH = ["37.131.192.0/19","46.53.0.0/16","185.36.0.0/16"];
GEO_MATRIX.OM = ["5.36.0.0/14","37.209.0.0/16","46.36.192.0/20","185.5.0.0/16"];

// ===================== PING-LOCKED STRATEGIES =====================
var HYPER_STRATEGIES = {
  HYPER_MATCHMAKING: {
    tier: "CRITICAL",
    chain: PING_MATRIX.sortByPing([
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA,
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_GAMMA,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3
    ]),
    timeout: 15,
    fallback: "JO_RESERVE",
    priority: 100,
    maxPing: 20
  },
  
  ZERO_JITTER_ULTRA: {
    tier: "CRITICAL",
    chain: PING_MATRIX.sortByPing([
      HYPER_PROXIES.JO_SPECIALIZED.GAME_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.GAME_BETA,
      HYPER_PROXIES.JO_SPECIALIZED.GAME_GAMMA,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_4
    ]),
    timeout: 10,
    fallback: "JO_RESERVE",
    priority: 100,
    maxPing: 15
  },
  
  ZERO_LATENCY_VOICE_ULTRA: {
    tier: "CRITICAL",
    chain: PING_MATRIX.sortByPing([
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_BETA,
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_GAMMA,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2
    ]),
    timeout: 12,
    fallback: "JO_RESERVE",
    priority: 100,
    maxPing: 18
  },
  
  FAST_LOADING: {
    tier: "HIGH",
    chain: PING_MATRIX.sortByPing([
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2
    ]),
    timeout: 25,
    fallback: "JO_BALANCERS",
    priority: 80,
    maxPing: 30
  },
  
  BALANCED_FAST: {
    tier: "MEDIUM",
    chain: PING_MATRIX.sortByPing([
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2,
      HYPER_PROXIES.JO_BALANCERS.LB_3
    ]),
    timeout: 40,
    fallback: "JO_BALANCERS",
    priority: 60,
    maxPing: 40
  },
  
  CDN_TURBO: {
    tier: "LOW",
    chain: PING_MATRIX.sortByPing([
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2,
      HYPER_PROXIES.JO_BALANCERS.LB_3,
      HYPER_PROXIES.JO_BALANCERS.LB_4,
      HYPER_PROXIES.JO_BALANCERS.LB_5
    ]),
    timeout: 60,
    fallback: "JO_RESERVE",
    priority: 10,
    maxPing: 50
  }
};

// ===================== ADVANCED HELPERS =====================
var CIDR_CACHE = {};
function _precomputeCidrCache() {
  for (var country in GEO_MATRIX) {
    if (Array.isArray(GEO_MATRIX[country])) {
      CIDR_CACHE[country] = [];
      for (var i = 0; i < GEO_MATRIX[country].length; i++) {
        var cidr = GEO_MATRIX[country][i];
        var idx = cidr.indexOf("/");
        if (idx !== -1) {
          var ipPart = cidr.substring(0, idx);
          var bits = parseInt(cidr.substring(idx + 1));
          var ipLong = _ultraFastIpToLong(ipPart);
          if (ipLong !== -1) {
            var mask = (0xFFFFFFFF << (32 - bits)) >>> 0;
            CIDR_CACHE[country].push({
              network: ipLong,
              mask: mask,
              original: cidr
            });
          }
        }
      }
    }
  }
}

function _ultraFastIpToLong(ip) {
  var p = ip.split(".");
  if (p.length !== 4) return -1;
  var result = 0;
  for (var i = 0; i < 4; i++) {
    var octet = parseInt(p[i]);
    if (isNaN(octet) || octet < 0 || octet > 255) return -1;
    result = (result << 8) | octet;
  }
  return result >>> 0;
}

function _ultraFastCidrMatch(ip, cidrEntry) {
  var ipLong = _ultraFastIpToLong(ip);
  if (ipLong === -1) return false;
  return (ipLong & cidrEntry.mask) === (cidrEntry.network & cidrEntry.mask);
}

function _inCidrArray(ip, countryCode) {
  if (!ip || !CIDR_CACHE[countryCode]) return false;
  var cache = CIDR_CACHE[countryCode];
  for (var i = 0; i < cache.length; i++) {
    if (_ultraFastCidrMatch(ip, cache[i])) return true;
  }
  return false;
}

function _fastDomainMatch(host, domain) {
  if (!host || !domain) return false;
  host = host.toLowerCase();
  domain = domain.toLowerCase();
  return host === domain || host.endsWith("." + domain);
}

function _inDomainArray(host, arr) {
  if (!host) return false;
  for (var i = 0; i < arr.length; i++) {
    if (_fastDomainMatch(host, arr[i])) return true;
  }
  return false;
}

function _urlHasPattern(url, patterns) {
  if (!url) return false;
  url = url.toLowerCase();
  for (var i = 0; i < patterns.length; i++) {
    if (url.indexOf(patterns[i]) !== -1) return true;
  }
  return false;
}

function _hostHasPattern(host, patterns) {
  if (!host) return false;
  host = host.toLowerCase();
  for (var i = 0; i < patterns.length; i++) {
    if (host.indexOf(patterns[i]) !== -1) return true;
  }
  return false;
}

// ===================== ENHANCED PHASE DETECTOR =====================
function _deepDetectPhase(url, host) {
  var maxWeight = 0;
  var detectedPhase = null;
  
  for (var phaseName in DEEP_PATTERNS) {
    var phase = DEEP_PATTERNS[phaseName];
    var score = 0;
    
    if (_hostHasPattern(host, phase.domains)) score += 50;
    if (_urlHasPattern(url, phase.paths)) score += 40;
    if (_hostHasPattern(host, phase.hostPatterns)) score += 30;
    
    // زيادة النقاط إذا كان دومين حرج
    if (_inDomainArray(host, ULTRA_DOMAINS.MATCHMAKING_CRITICAL) && phaseName === "PHASE_PRE_GAME") score += 30;
    if (_inDomainArray(host, ULTRA_DOMAINS.GAME_SERVERS_CRITICAL) && phaseName === "PHASE_ACTIVE_GAME") score += 30;
    if (_inDomainArray(host, ULTRA_DOMAINS.VOICE_CRITICAL) && phaseName === "PHASE_VOICE") score += 30;
    
    var weightedScore = score * (phase.weight / 100);
    if (weightedScore > maxWeight) {
      maxWeight = weightedScore;
      detectedPhase = phase;
    }
  }
  
  return detectedPhase;
}

// ===================== NEURAL TRAFFIC CLASSIFIER =====================
function _neuralClassify(url, host) {
  var phase = _deepDetectPhase(url, host);
  if (phase) {
    return {
      type: phase.strategy,
      tier: phase.priority === "MAXIMUM" ? "CRITICAL" : phase.priority,
      priority: phase.weight,
      strategy: phase.strategy,
      pingRequirement: phase.pingRequirement,
      phaseName: phase
    };
  }
  
  if (_inDomainArray(host, ULTRA_DOMAINS.MATCHMAKING_CRITICAL)) {
    return {
      type: "MATCHMAKING",
      tier: "CRITICAL",
      priority: 100,
      strategy: "HYPER_MATCHMAKING",
      pingRequirement: 20,
      phaseName: "MATCHMAKING_CRITICAL"
    };
  }
  
  if (_inDomainArray(host, ULTRA_DOMAINS.VOICE_CRITICAL)) {
    return {
      type: "VOICE",
      tier: "CRITICAL",
      priority: 100,
      strategy: "ZERO_LATENCY_VOICE_ULTRA",
      pingRequirement: 18,
      phaseName: "VOICE_CRITICAL"
    };
  }
  
  if (_inDomainArray(host, ULTRA_DOMAINS.GAME_SERVERS_CRITICAL)) {
    return {
      type: "GAMING",
      tier: "CRITICAL",
      priority: 100,
      strategy: "ZERO_JITTER_ULTRA",
      pingRequirement: 15,
      phaseName: "GAME_SERVERS_CRITICAL"
    };
  }
  
  if (_inDomainArray(host, ULTRA_DOMAINS.CDN_MEDIUM)) {
    return {
      type: "CDN",
      tier: "LOW",
      priority: 10,
      strategy: "CDN_TURBO",
      pingRequirement: 50,
      phaseName: "CDN_MEDIUM"
    };
  }
  
  if (_inDomainArray(host, ULTRA_DOMAINS.PUBG_CORE_HIGH) || _inDomainArray(host, ULTRA_DOMAINS.TENCENT_HIGH)) {
    return {
      type: "PUBG_GENERAL",
      tier: "HIGH",
      priority: 75,
      strategy: "BALANCED_FAST",
      pingRequirement: 35,
      phaseName: "PUBG_GENERAL"
    };
  }
  
  if (_hostHasPattern(host, ULTRA_DOMAINS.ANALYTICS_LOW)) {
    return {
      type: "ANALYTICS",
      tier: "LOW",
      priority: 20,
      strategy: "CDN_TURBO",
      pingRequirement: 60,
      phaseName: "ANALYTICS"
    };
  }
  
  return {
    type: "UNKNOWN",
    tier: "LOW",
    priority: 30,
    strategy: "CDN_TURBO",
    pingRequirement: 100,
    phaseName: "UNKNOWN"
  };
}

// ===================== PING-OPTIMIZED CHAIN BUILDER =====================
function _buildHyperChain(strategy, isJO, neighborPriority) {
  var config = HYPER_STRATEGIES[strategy];
  if (!config) config = HYPER_STRATEGIES.CDN_TURBO;
  
  // فلترة حسب البينج أولاً
  var filteredChain = PING_MATRIX.filterByPing(config.chain, config.maxPing);
  
  if (filteredChain.length === 0) {
    // إذا لم يوجد بروكسي بالبينج المطلوب، نستخدم سلسلة الطوارئ
    if (config.fallback === "JO_RESERVE") {
      filteredChain = PING_MATRIX.sortByPing([
        HYPER_PROXIES.JO_RESERVE.RESCUE_1,
        HYPER_PROXIES.JO_RESERVE.RESCUE_2,
        HYPER_PROXIES.JO_RESERVE.RESCUE_3,
        HYPER_PROXIES.JO_RESERVE.RESCUE_4
      ]);
    } else if (config.fallback === "JO_BALANCERS") {
      filteredChain = PING_MATRIX.sortByPing([
        HYPER_PROXIES.JO_BALANCERS.LB_1,
        HYPER_PROXIES.JO_BALANCERS.LB_2,
        HYPER_PROXIES.JO_BALANCERS.LB_3,
        HYPER_PROXIES.JO_BALANCERS.LB_4,
        HYPER_PROXIES.JO_BALANCERS.LB_5
      ]);
    }
  }
  
  // إذا كان اتصال أردني، نضيف بروكسيات إضافية للثبات
  if (isJO && config.tier !== "LOW") {
    var extraProxies = [];
    for (var key in HYPER_PROXIES.JO_ULTRA) {
      var proxy = HYPER_PROXIES.JO_ULTRA[key];
      if (filteredChain.indexOf(proxy) === -1) {
        extraProxies.push(proxy);
      }
    }
    extraProxies = PING_MATRIX.filterByPing(extraProxies, config.maxPing + 10);
    filteredChain = filteredChain.concat(PING_MATRIX.sortByPing(extraProxies));
  }
  
  // إذا كان مجاور ذو أولوية عالية، نعطيه بروكسيات جيدة
  if (neighborPriority === "HIGH" && config.tier !== "LOW") {
    var neighborProxies = PING_MATRIX.sortByPing([
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2
    ]);
    filteredChain = PING_MATRIX.sortByPing(filteredChain.concat(neighborProxies));
  }
  
  return filteredChain.join("; ");
}

// ===================== MAIN FindProxyForURL =====================
function FindProxyForURL(url, host) {
  host = (host || "").toLowerCase();
  
  // ===== STAGE 0: PING-OPTIMIZED RESOLUTION =====
  var resolvedIP = dnsResolve(host);
  var isJO = resolvedIP && _inCidrArray(resolvedIP, "JO");
  
  var neighborPriority = null;
  if (!isJO && resolvedIP) {
    // التحقق من الجيران حسب الأولوية
    for (var i = 0; i < GEO_MATRIX.PRIORITY_NEIGHBORS.length; i++) {
      if (_inCidrArray(resolvedIP, GEO_MATRIX.PRIORITY_NEIGHBORS[i])) {
        neighborPriority = "HIGH";
        break;
      }
    }
    if (!neighborPriority) {
      for (var j = 0; j < GEO_MATRIX.STANDARD_NEIGHBORS.length; j++) {
        if (_inCidrArray(resolvedIP, GEO_MATRIX.STANDARD_NEIGHBORS[j])) {
          neighborPriority = "MEDIUM";
          break;
        }
      }
    }
    if (!neighborPriority) {
      for (var k = 0; k < GEO_MATRIX.LOW_NEIGHBORS.length; k++) {
        if (_inCidrArray(resolvedIP, GEO_MATRIX.LOW_NEIGHBORS[k])) {
          neighborPriority = "LOW";
          break;
        }
      }
    }
  }
  
  // ===== STAGE 1: TRAFFIC CLASSIFICATION =====
  var traffic = _neuralClassify(url, host);
  
  // ===== STAGE 2: PING-VERIFIED ROUTING =====
  
  // الحالة 1: اتصالات أردنية حرجة (أعلى أولوية)
  if (isJO && (traffic.tier === "CRITICAL" || traffic.priority >= 90)) {
    return _buildHyperChain(traffic.strategy, true, null);
  }
  
  // الحالة 2: جيران ذوو أولوية عالية + حركة حرجة
  if (neighborPriority === "HIGH" && traffic.tier === "CRITICAL") {
    return _buildHyperChain(traffic.strategy, false, "HIGH");
  }
  
  // الحالة 3: جميع الاتصالات الأردنية الأخرى
  if (isJO) {
    return _buildHyperChain("HYPER_MATCHMAKING", true, null);
  }
  
  // الحالة 4: حركة حرجة (بينج منخفض مطلوب)
  if (traffic.tier === "CRITICAL" && traffic.pingRequirement <= 20) {
    return _buildHyperChain(traffic.strategy, false, neighborPriority);
  }
  
  // الحالة 5: جيران + حركة متوسطة/عالية
  if (neighborPriority && traffic.priority >= 50) {
    return _buildHyperChain(traffic.strategy, false, neighborPriority);
  }
  
  // الحالة 6: حركة عالية/متوسطة
  if (traffic.priority >= 60) {
    return _buildHyperChain(traffic.strategy, false, neighborPriority);
  }
  
  // الحالة 7: أي حركة أخرى (ستحصل على بروكسي)
  return _buildHyperChain("CDN_TURBO", false, neighborPriority);
}

// ===================== INITIALIZATION =====================
_precomputeCidrCache();
