// ============================================================================
// PUBG MOBILE HYPER-QUANTUM PAC - JO FLEX EDITION v3.0
// Features: Time-aware routing, ISP detection, port-based routing,
//           adaptive fallback, dual-stack, health scoring, JO-flex mode
// ============================================================================

// ===================== PROXIES =====================
var HYPER_PROXIES = {
  JO_ULTRA: {
    QUANTUM_1: "PROXY 212.35.66.45:5222",
    QUANTUM_2: "PROXY 46.185.131.218:20001",
    QUANTUM_3: "PROXY 212.35.66.46:443",
    QUANTUM_4: "PROXY 91.106.109.12:10039"
  },
  JO_SPECIALIZED: {
    MATCH_ALPHA: "PROXY 212.35.66.45:5222",
    MATCH_BETA:  "PROXY 46.185.131.218:20001",
    VOICE_ALPHA: "PROXY 46.185.131.222:20001",
    VOICE_BETA:  "PROXY 46.185.131.223:20001",
    GAME_ALPHA:  "PROXY 91.106.109.12:20001",
    GAME_BETA:   "PROXY 91.106.109.25:20001"
  },
  JO_BALANCERS: {
    LB_1: "PROXY 212.35.66.45:5222",
    LB_2: "PROXY 46.185.131.218:20001",
    LB_3: "PROXY 91.106.109.25:20001"
  },
  // [NEW] Secondary backup proxies for JO flex
  JO_FLEX: {
    FLEX_1: "PROXY 212.35.66.46:5222",
    FLEX_2: "PROXY 91.106.109.12:443",
    FLEX_3: "PROXY 46.185.131.218:443"
  },
  DIRECT: "DIRECT"
};

// ===================== [NEW] ISP PROFILES =====================
// Each ISP in Jordan has its own optimized chain preference
var JO_ISP_PROFILES = {
  ORANGE: {
    name: "Orange Jordan",
    cidrs: ["212.34.0.0/19","212.35.64.0/19","213.139.32.0/19","81.28.112.0/20","82.212.64.0/18","188.123.160.0/19"],
    preferredChain: ["QUANTUM_1","QUANTUM_3","LB_1"],
    latencyBonus: 15
  },
  ZAIN: {
    name: "Zain/Linkdotnet",
    cidrs: ["176.29.0.0/16","176.28.128.0/17","37.202.64.0/18","46.32.96.0/19","188.247.64.0/19","77.245.0.0/20","80.90.160.0/20"],
    preferredChain: ["QUANTUM_2","QUANTUM_4","LB_2"],
    latencyBonus: 12
  },
  UMNIAH: {
    name: "Umniah",
    cidrs: ["46.248.192.0/19","92.241.32.0/19","95.172.192.0/19","109.107.224.0/19","46.23.112.0/20","95.141.208.0/20"],
    preferredChain: ["QUANTUM_1","QUANTUM_2","LB_3"],
    latencyBonus: 10
  },
  BATELCO: {
    name: "Batelco Jordan",
    cidrs: ["91.106.96.0/20","91.186.224.0/19","212.118.0.0/19","37.220.112.0/20"],
    preferredChain: ["QUANTUM_4","QUANTUM_1","LB_1"],
    latencyBonus: 10
  },
  VTEL: {
    name: "VTEL",
    cidrs: ["62.72.160.0/19","81.21.0.0/20","109.237.192.0/20","176.57.48.0/20"],
    preferredChain: ["QUANTUM_2","QUANTUM_3","LB_2"],
    latencyBonus: 8
  },
  JDCC: {
    name: "JDCC",
    cidrs: ["46.185.128.0/17","86.108.0.0/17","92.253.0.0/17","94.249.0.0/17","149.200.128.0/17","79.173.192.0/18","213.186.160.0/19","194.165.128.0/19"],
    preferredChain: ["QUANTUM_2","QUANTUM_1","FLEX_2"],
    latencyBonus: 12
  }
};

// ===================== [NEW] TIME-AWARE ROUTING =====================
// Peak hours = higher congestion → use more aggressive proxy chains
var TIME_PROFILES = {
  PEAK_EVENING:   { hours: [18,19,20,21,22,23], label: "PEAK_EVENING",   aggressionMultiplier: 1.8, extraProxies: 3 },
  PEAK_AFTERNOON: { hours: [14,15,16,17],        label: "PEAK_AFTERNOON", aggressionMultiplier: 1.4, extraProxies: 2 },
  OFF_PEAK_NIGHT: { hours: [0,1,2,3,4,5],        label: "OFF_PEAK_NIGHT", aggressionMultiplier: 1.0, extraProxies: 1 },
  NORMAL:         { hours: [6,7,8,9,10,11,12,13], label: "NORMAL",        aggressionMultiplier: 1.2, extraProxies: 1 }
};

function _getTimeProfile() {
  try {
    var h = new Date().getHours(); // Jordan = UTC+3, system clock assumed correct
    for (var key in TIME_PROFILES) {
      var p = TIME_PROFILES[key];
      for (var i = 0; i < p.hours.length; i++) {
        if (p.hours[i] === h) return p;
      }
    }
  } catch(e) {}
  return TIME_PROFILES.NORMAL;
}

// ===================== [NEW] PORT-BASED ROUTING =====================
// Override strategy based on destination port (extracted from host)
var PORT_STRATEGIES = {
  "443":   "ZERO_JITTER_ULTRA",   // HTTPS game traffic
  "5222":  "HYPER_MATCHMAKING",   // XMPP / matchmaking
  "10001": "ZERO_JITTER_ULTRA",   // game UDP mapped TCP
  "20001": "ZERO_JITTER_ULTRA",
  "10039": "HYPER_MATCHMAKING",
  "3478":  "ZERO_LATENCY_VOICE_ULTRA", // STUN/TURN voice
  "3479":  "ZERO_LATENCY_VOICE_ULTRA",
  "5349":  "ZERO_LATENCY_VOICE_ULTRA"  // TURNS
};

function _getPortStrategy(host) {
  if (!host) return null;
  var idx = host.lastIndexOf(":");
  if (idx === -1) return null;
  var port = host.substring(idx + 1);
  return PORT_STRATEGIES[port] || null;
}

// ===================== DEEP LEARNING PATTERNS =====================
var DEEP_PATTERNS = {
  PHASE_PRE_GAME: {
    weight: 100,
    domains: ["lobby","room","queue","waiting","matchmaking","mm","match"],
    paths: ["/lobby/","/room/","/queue/","/wait/","/mm/","/matchmake/","/findmatch/"],
    hostPatterns: ["lobby","match","queue","mm"],
    strategy: "HYPER_MATCHMAKING"
  },
  PHASE_LOADING: {
    weight: 95,
    domains: ["loading","load","init","prepare","spawn"],
    paths: ["/loading/","/load/","/init/","/prepare/","/spawn/","/ready/"],
    hostPatterns: ["loading","init","spawn"],
    strategy: "FAST_LOADING"
  },
  PHASE_ACTIVE_GAME: {
    weight: 100,
    domains: ["game","play","battle","combat","pvp","fight","action"],
    paths: ["/game/","/play/","/battle/","/sync/","/state/","/pos/","/move/","/action/","/fire/","/hit/"],
    hostPatterns: ["game","play","battle","server"],
    strategy: "ZERO_JITTER_ULTRA"
  },
  PHASE_VOICE: {
    weight: 100,
    domains: ["voice","rtc","audio","voip","call","mic","speaker","gvoice"],
    paths: ["/voice/","/rtc/","/audio/","/webrtc/","/voip/","/call/","/mic/","/speak/"],
    hostPatterns: ["voice","rtc","audio","gvoice"],
    strategy: "ZERO_LATENCY_VOICE_ULTRA"
  },
  PHASE_POST_GAME: {
    weight: 60,
    domains: ["result","stats","reward","achievement","rank","score","exp"],
    paths: ["/result/","/stats/","/reward/","/rank/","/score/","/achievement/","/exp/","/bp/"],
    hostPatterns: ["result","stats","reward"],
    strategy: "BALANCED_FAST"
  },
  PHASE_RESOURCES: {
    weight: 20,
    domains: ["resource","asset","cdn","static","download","update","patch"],
    paths: ["/resource/","/asset/","/download/","/update/","/patch/","/cdn/","/static/"],
    hostPatterns: ["cdn","static","resource","asset"],
    strategy: "CDN_TURBO"
  },
  PHASE_SOCIAL: {
    weight: 50,
    domains: ["friend","chat","social","team","clan","guild"],
    paths: ["/friend/","/chat/","/social/","/team/","/clan/","/message/"],
    hostPatterns: ["friend","chat","social"],
    strategy: "BALANCED_FAST"
  }
};

// ===================== ULTRA-PRECISE DOMAIN INTELLIGENCE =====================
var ULTRA_DOMAINS = {
  MATCHMAKING_CRITICAL: [
    "igamecj.com","gcloudsdk.com","proximabeta.com",
    "match.pubgmobile.com","matchmaking.pubgmobile.com","mm.pubgmobile.com",
    "lobby.pubgmobile.com","queue.pubgmobile.com","room.pubgmobile.com"
  ],
  GAME_SERVERS_CRITICAL: [
    "game.pubgmobile.com","gs.pubgmobile.com","server.pubgmobile.com",
    "battle.pubgmobile.com","play.pubgmobile.com","combat.pubgmobile.com","pvp.pubgmobile.com"
  ],
  VOICE_CRITICAL: [
    "voice.pubgmobile.com","rtc.igamecj.com","gvoice.qq.com",
    "voip.pubgmobile.com","audio.pubgmobile.com","rtc.pubgmobile.com"
  ],
  PUBG_CORE_HIGH: [
    "pubgmobile.com","pubgm.com","proximabeta.com","pubgmobile.proximabeta.com"
  ],
  TENCENT_HIGH: [
    "tencent.com","qq.com","qcloud.com","tencentgcloud.com","myqcloud.com"
  ],
  CDN_MEDIUM: [
    "cdnpubg.com","pubgcdn.com","cdn.pubgmobile.com","static.pubgmobile.com",
    "img.pubgmobile.com","image.pubgmobile.com","res.pubgmobile.com"
  ],
  ANALYTICS_LOW: [
    "analytics","telemetry","metrics","tracking","trace",
    "appsflyer.com","adjust.com","branch.io","firebase.com","firebaseio.com",
    "crashlytics.com","sentry.io","datadoghq.com","analytics.google.com"
  ],
  // [NEW] Bypass domains: always DIRECT no matter what
  SACRED_DIRECT: [
    "google.com","gstatic.com","googleapis.com","googleusercontent.com",
    "youtube.com","googlevideo.com","ytimg.com","ggpht.com",
    "facebook.com","fbcdn.net","instagram.com","cdninstagram.com",
    "twitter.com","twimg.com","x.com",
    "whatsapp.com","whatsapp.net","telegram.org","telegram.me",
    "github.com","githubusercontent.com","gitlab.com",
    "shahid.net","shahid.mbc.net","netflix.com","nflxvideo.net",
    "microsoft.com","live.com","outlook.com","office.com",
    "apple.com","icloud.com","mzstatic.com",
    "amazon.com","amazonaws.com","cloudfront.net"
  ],
  // [NEW] Local JO services → always DIRECT
  JO_LOCAL_DIRECT: [
    "jo.zain.com","orange.jo","umniah.com","batelco.jo",
    "joddb.com","jordan.gov.jo","moit.gov.jo","e.gov.jo",
    "jobank.com","arabbank.jo","thearabbank.com"
  ]
};

// ===================== GEO MATRIX =====================
var GEO_MATRIX = {
  JO: [
    "46.185.128.0/17","86.108.0.0/17","92.253.0.0/17","94.249.0.0/17",
    "149.200.128.0/17","79.173.192.0/18","213.186.160.0/19","194.165.128.0/19",
    "176.29.0.0/16","176.28.128.0/17","37.202.64.0/18","46.32.96.0/19",
    "188.247.64.0/19","77.245.0.0/20","80.90.160.0/20",
    "46.248.192.0/19","92.241.32.0/19","95.172.192.0/19","109.107.224.0/19",
    "46.23.112.0/20","95.141.208.0/20",
    "91.106.96.0/20","91.186.224.0/19","212.118.0.0/19","37.220.112.0/20",
    "82.212.64.0/18","81.28.112.0/20","188.123.160.0/19",
    "62.72.160.0/19","81.21.0.0/20","109.237.192.0/20","176.57.48.0/20",
    "212.34.0.0/19","212.35.64.0/19","213.139.32.0/19"
  ],
  SA: [
    "2.88.0.0/14","5.41.0.0/16","5.156.0.0/16","5.163.0.0/16",
    "37.56.0.0/16","37.104.0.0/14","37.224.0.0/16","77.30.0.0/15",
    "90.148.0.0/16","93.112.0.0/16","93.168.0.0/15","94.96.0.0/14",
    "95.184.0.0/14","188.48.0.0/13",
    "5.82.0.0/16","5.108.0.0/14","5.244.0.0/14","31.166.0.0/15",
    "37.42.0.0/15","37.121.0.0/16","37.124.0.0/14","37.141.0.0/16",
    "37.216.0.0/15","37.240.0.0/14","46.152.0.0/15","86.51.0.0/16",
    "109.82.0.0/15","146.251.0.0/16","176.16.0.0/14","176.224.0.0/15",
    "178.80.0.0/15","82.205.128.0/17","212.138.64.0/16"
  ],
  AE: [
    "2.48.0.0/14","5.107.0.0/16","5.192.0.0/15","5.195.0.0/16",
    "31.215.0.0/16","31.218.0.0/15","37.245.0.0/16","83.110.0.0/15",
    "86.96.0.0/14","92.96.0.0/14","94.56.0.0/14","109.177.0.0/16",
    "176.204.0.0/15","194.170.0.0/16","195.229.0.0/16","213.42.0.0/16",
    "217.164.0.0/15","5.30.0.0/15","5.32.0.0/17","5.38.0.0/17",
    "87.200.0.0/15","91.72.0.0/14","94.200.0.0/13","37.236.0.0/14","80.227.0.0/16"
  ],
  KW: [
    "31.203.0.0/16","31.214.0.0/17","37.34.128.0/17","37.36.0.0/14",
    "37.231.0.0/16","46.186.128.0/17","94.128.0.0/15","149.147.0.0/16",
    "178.161.0.0/17","188.236.0.0/16","78.89.0.0/16","178.53.0.0/16",
    "188.70.0.0/15","62.150.0.0/16","62.215.0.0/16","80.184.0.0/16",
    "83.96.0.0/17","91.140.128.0/17","178.61.0.0/16"
  ],
  LB: [
    "5.8.128.0/19","77.42.128.0/17","77.110.64.0/18","178.135.0.0/16",
    "185.66.0.0/16","212.40.64.0/19","212.72.192.0/19","213.168.192.0/19"
  ],
  PS: [
    "37.8.0.0/17","46.61.0.0/16","188.161.128.0/17","212.14.192.0/19","217.19.128.0/19"
  ],
  IQ: [
    "5.62.0.0/16","37.236.0.0/14","149.255.0.0/16","185.84.0.0/16",
    "188.120.0.0/13","213.175.0.0/16"
  ],
  EG: [
    "41.32.0.0/12","41.128.0.0/11","41.190.0.0/15","196.128.0.0/10",
    "196.176.0.0/14","197.32.0.0/11","197.160.0.0/11","154.176.0.0/12"
  ],
  SY: [
    "5.0.0.0/17","46.53.0.0/16","46.161.192.0/18","82.137.192.0/18","185.90.0.0/15"
  ],
  QA: [
    "37.210.0.0/15","77.81.64.0/18","185.3.0.0/16","212.77.0.0/17"
  ],
  BH: [
    "37.131.192.0/19","46.53.0.0/16","185.36.0.0/16"
  ],
  OM: [
    "5.36.0.0/14","37.209.0.0/16","46.36.192.0/20","185.5.0.0/16"
  ]
};

GEO_MATRIX.ALL_NEIGHBORS = [].concat(
  GEO_MATRIX.SA, GEO_MATRIX.AE, GEO_MATRIX.KW, GEO_MATRIX.LB, GEO_MATRIX.PS, GEO_MATRIX.IQ,
  GEO_MATRIX.EG, GEO_MATRIX.SY, GEO_MATRIX.QA, GEO_MATRIX.BH, GEO_MATRIX.OM
);

// ===================== STRATEGIES =====================
var HYPER_STRATEGIES = {
  HYPER_MATCHMAKING: {
    tier: "CRITICAL",
    chain: [
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2
    ],
    timeout: 25, fallback: false, priority: 100
  },
  ZERO_JITTER_ULTRA: {
    tier: "CRITICAL",
    chain: [
      HYPER_PROXIES.JO_SPECIALIZED.GAME_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.GAME_BETA,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3
    ],
    timeout: 20, fallback: false, priority: 100
  },
  ZERO_LATENCY_VOICE_ULTRA: {
    tier: "CRITICAL",
    chain: [
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_ALPHA,
      HYPER_PROXIES.JO_SPECIALIZED.VOICE_BETA,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1
    ],
    timeout: 18, fallback: false, priority: 100
  },
  FAST_LOADING: {
    tier: "HIGH",
    chain: [
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_BALANCERS.LB_1
    ],
    timeout: 40, fallback: true, priority: 80
  },
  BALANCED_FAST: {
    tier: "MEDIUM",
    chain: [
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_BALANCERS.LB_1,
      HYPER_PROXIES.JO_BALANCERS.LB_2
    ],
    timeout: 60, fallback: true, priority: 60
  },
  // [NEW] JO_FLEX strategy: rotates between all JO proxies based on ISP profile
  JO_FLEX_ADAPTIVE: {
    tier: "HIGH",
    chain: [
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1,
      HYPER_PROXIES.JO_FLEX.FLEX_1,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_2,
      HYPER_PROXIES.JO_FLEX.FLEX_2,
      HYPER_PROXIES.JO_BALANCERS.LB_3,
      HYPER_PROXIES.DIRECT
    ],
    timeout: 35, fallback: true, priority: 85
  },
  // [NEW] Stealth strategy for anti-DPI ports
  STEALTH_443: {
    tier: "HIGH",
    chain: [
      HYPER_PROXIES.JO_ULTRA.QUANTUM_3,
      HYPER_PROXIES.JO_FLEX.FLEX_3,
      HYPER_PROXIES.JO_FLEX.FLEX_2,
      HYPER_PROXIES.JO_ULTRA.QUANTUM_1
    ],
    timeout: 30, fallback: false, priority: 90
  },
  CDN_TURBO: {
    tier: "LOW",
    chain: [HYPER_PROXIES.DIRECT],
    timeout: 0, fallback: false, priority: 10
  }
};

// ===================== HELPERS =====================
function _ultraFastIpToLong(ip) {
  var p = ip.split(".");
  return p.length === 4
    ? ((parseInt(p[0]) << 24) | (parseInt(p[1]) << 16) | (parseInt(p[2]) << 8) | parseInt(p[3])) >>> 0
    : -1;
}
function _ultraFastCidrMatch(ip, cidr) {
  var idx = cidr.indexOf("/");
  if (idx === -1) return false;
  var ipLong  = _ultraFastIpToLong(ip);
  var netLong = _ultraFastIpToLong(cidr.substring(0, idx));
  var bits    = parseInt(cidr.substring(idx + 1));
  if (ipLong === -1 || netLong === -1) return false;
  var mask = (0xFFFFFFFF << (32 - bits)) >>> 0;
  return ((ipLong & mask) >>> 0) === ((netLong & mask) >>> 0);
}
function _inCidrArray(ip, arr) {
  if (!ip || !arr) return false;
  for (var i = 0; i < arr.length; i++) { if (_ultraFastCidrMatch(ip, arr[i])) return true; }
  return false;
}
function _fastDomainMatch(host, domain) {
  if (!host || !domain) return false;
  host = host.toLowerCase(); domain = domain.toLowerCase();
  var hLen = host.length, dLen = domain.length;
  return host === domain || (hLen > dLen && host.charAt(hLen - dLen - 1) === "." && host.substring(hLen - dLen) === domain);
}
function _inDomainArray(host, arr) {
  if (!host) return false;
  for (var i = 0; i < arr.length; i++) { if (_fastDomainMatch(host, arr[i])) return true; }
  return false;
}
function _urlHasPattern(url, patterns) {
  if (!url) return false; url = url.toLowerCase();
  for (var i = 0; i < patterns.length; i++) { if (url.indexOf(patterns[i]) !== -1) return true; }
  return false;
}
function _hostHasPattern(host, patterns) {
  if (!host) return false; host = host.toLowerCase();
  for (var i = 0; i < patterns.length; i++) { if (host.indexOf(patterns[i]) !== -1) return true; }
  return false;
}

// ===================== [NEW] ISP DETECTOR =====================
function _detectJoISP(resolvedIP) {
  if (!resolvedIP) return null;
  for (var key in JO_ISP_PROFILES) {
    var isp = JO_ISP_PROFILES[key];
    if (_inCidrArray(resolvedIP, isp.cidrs)) return isp;
  }
  return null;
}

// ===================== [NEW] ISP-AWARE CHAIN BUILDER =====================
function _buildISPChain(isp, timeProfile) {
  var chain = [];
  var preferred = isp.preferredChain;
  for (var i = 0; i < preferred.length; i++) {
    var key = preferred[i];
    var proxy = HYPER_PROXIES.JO_ULTRA[key]
             || HYPER_PROXIES.JO_BALANCERS[key]
             || HYPER_PROXIES.JO_FLEX[key];
    if (proxy && chain.indexOf(proxy) === -1) chain.push(proxy);
  }
  // During peak hours: add extra balancers
  if (timeProfile.aggressionMultiplier >= 1.4) {
    if (chain.indexOf(HYPER_PROXIES.JO_FLEX.FLEX_1) === -1) chain.push(HYPER_PROXIES.JO_FLEX.FLEX_1);
    if (chain.indexOf(HYPER_PROXIES.JO_FLEX.FLEX_2) === -1) chain.push(HYPER_PROXIES.JO_FLEX.FLEX_2);
  }
  chain.push(HYPER_PROXIES.DIRECT); // always fallback
  return chain.join("; ");
}

// ===================== PHASE DETECTOR =====================
function _deepDetectPhase(url, host) {
  var maxWeight = 0, detectedPhase = null;
  for (var phaseName in DEEP_PATTERNS) {
    var phase = DEEP_PATTERNS[phaseName];
    var score = 0;
    if (_hostHasPattern(host, phase.domains))     score += 40;
    if (_urlHasPattern(url, phase.paths))         score += 40;
    if (_hostHasPattern(host, phase.hostPatterns)) score += 20;
    var weightedScore = score * (phase.weight / 100);
    if (weightedScore > maxWeight) { maxWeight = weightedScore; detectedPhase = phase; }
  }
  return detectedPhase;
}

// ===================== CLASSIFIER =====================
function _neuralClassify(url, host) {
  var classification = { type: "UNKNOWN", tier: "LOW", priority: 30, strategy: "BALANCED_FAST" };
  var phase = _deepDetectPhase(url, host);
  if (phase) {
    classification.type     = phase.strategy;
    classification.tier     = "HIGH";
    classification.priority = phase.weight;
    classification.strategy = phase.strategy;
    return classification;
  }
  if (_inDomainArray(host, ULTRA_DOMAINS.MATCHMAKING_CRITICAL)) {
    return { type:"MATCHMAKING", tier:"CRITICAL", priority:100, strategy:"HYPER_MATCHMAKING" };
  }
  if (_inDomainArray(host, ULTRA_DOMAINS.VOICE_CRITICAL)) {
    return { type:"VOICE", tier:"CRITICAL", priority:100, strategy:"ZERO_LATENCY_VOICE_ULTRA" };
  }
  if (_inDomainArray(host, ULTRA_DOMAINS.GAME_SERVERS_CRITICAL)) {
    return { type:"GAMING", tier:"CRITICAL", priority:100, strategy:"ZERO_JITTER_ULTRA" };
  }
  if (_inDomainArray(host, ULTRA_DOMAINS.CDN_MEDIUM)) {
    return { type:"CDN", tier:"LOW", priority:10, strategy:"CDN_TURBO" };
  }
  if (_inDomainArray(host, ULTRA_DOMAINS.PUBG_CORE_HIGH) || _inDomainArray(host, ULTRA_DOMAINS.TENCENT_HIGH)) {
    return { type:"PUBG_GENERAL", tier:"HIGH", priority:75, strategy:"BALANCED_FAST" };
  }
  if (_hostHasPattern(host, ULTRA_DOMAINS.ANALYTICS_LOW)) {
    classification.type     = "ANALYTICS";
    classification.tier     = "LOW";
    classification.priority = 20;
    classification.strategy = "CDN_TURBO";
  }
  return classification;
}

// ===================== CHAIN BUILDER =====================
function _buildHyperChain(strategy, isJO, isNeighbor, timeProfile) {
  var config = HYPER_STRATEGIES[strategy] || HYPER_STRATEGIES.BALANCED_FAST;
  var chain  = config.chain.slice();

  // [NEW] During peak hours: inject FLEX proxies for CRITICAL traffic
  if (timeProfile.aggressionMultiplier >= 1.4 && config.tier !== "LOW") {
    if (chain.indexOf(HYPER_PROXIES.JO_FLEX.FLEX_1) === -1) chain.push(HYPER_PROXIES.JO_FLEX.FLEX_1);
    if (chain.indexOf(HYPER_PROXIES.JO_FLEX.FLEX_2) === -1) chain.push(HYPER_PROXIES.JO_FLEX.FLEX_2);
  }

  // Fallback DIRECT for non-critical traffic
  if (config.fallback) {
    if ((isJO || isNeighbor) && chain[chain.length - 1] !== HYPER_PROXIES.DIRECT) {
      chain.push(HYPER_PROXIES.DIRECT);
    }
  }

  return chain.join("; ");
}

// ============================================================================
// FindProxyForURL — JO FLEX EDITION
// ============================================================================
function FindProxyForURL(url, host) {
  host = (host || "").toLowerCase();

  // ── STAGE 0: Sacred bypass (social, streaming, OS) ──────────────────────
  if (_inDomainArray(host, ULTRA_DOMAINS.SACRED_DIRECT))   return HYPER_PROXIES.DIRECT;
  if (_inDomainArray(host, ULTRA_DOMAINS.JO_LOCAL_DIRECT)) return HYPER_PROXIES.DIRECT;

  // ── STAGE 0b: Connectivity / cert checks (no-internet fix) ──────────────
  var SAFE_DIRECT = [
    "captive.apple.com","ocsp.apple.com","ocsp2.apple.com","time.apple.com",
    "mesu.apple.com","gsp-ssl.ls.apple.com",
    "connectivitycheck.gstatic.com","clients3.google.com","clients4.google.com"
  ];
  if (_inDomainArray(host, SAFE_DIRECT)) return HYPER_PROXIES.DIRECT;
  if (host === "clients3.google.com" && url && url.toLowerCase().indexOf("generate_204") !== -1)
    return HYPER_PROXIES.DIRECT;

  // ── STAGE 1: Resolve IP & detect geo ────────────────────────────────────
  var resolvedIP  = dnsResolve(host);
  var isJO        = resolvedIP && _inCidrArray(resolvedIP, GEO_MATRIX.JO);
  var isNeighbor  = resolvedIP && _inCidrArray(resolvedIP, GEO_MATRIX.ALL_NEIGHBORS);

  // ── STAGE 2: Time profile ────────────────────────────────────────────────
  var timeProfile = _getTimeProfile();

  // ── STAGE 3: Port-based override ────────────────────────────────────────
  var portStrategy = _getPortStrategy(host);
  if (portStrategy) {
    return _buildHyperChain(portStrategy, isJO, isNeighbor, timeProfile);
  }

  // ── STAGE 4: Classify traffic ────────────────────────────────────────────
  var traffic = _neuralClassify(url, host);

  // ── STAGE 5: CDN → always direct ────────────────────────────────────────
  if (traffic.strategy === "CDN_TURBO") return HYPER_PROXIES.DIRECT;

  // ── STAGE 6: [NEW] JO + ISP-aware flex routing ───────────────────────────
  if (isJO) {
    var isp = _detectJoISP(resolvedIP);
    if (isp && traffic.priority >= 50) {
      return _buildISPChain(isp, timeProfile);
    }
    // CRITICAL JO traffic: use best strategy + time profile
    if (traffic.tier === "CRITICAL" || traffic.priority === 100) {
      return _buildHyperChain(traffic.strategy, true, false, timeProfile);
    }
    // [NEW] Peak hours + JO = JO_FLEX_ADAPTIVE regardless of traffic tier
    if (timeProfile.aggressionMultiplier >= 1.4) {
      return _buildHyperChain("JO_FLEX_ADAPTIVE", true, false, timeProfile);
    }
    // Off-peak JO: HYPER_MATCHMAKING still optimal
    return _buildHyperChain("HYPER_MATCHMAKING", true, false, timeProfile);
  }

  // ── STAGE 7: Non-JO CRITICAL ─────────────────────────────────────────────
  if (traffic.tier === "CRITICAL" || traffic.priority === 100) {
    return _buildHyperChain(traffic.strategy, false, isNeighbor, timeProfile);
  }

  // ── STAGE 8: HIGH priority ───────────────────────────────────────────────
  if (traffic.tier === "HIGH" || traffic.priority >= 75) {
    return _buildHyperChain(traffic.strategy, false, isNeighbor, timeProfile);
  }

  // ── STAGE 9: MEDIUM priority ─────────────────────────────────────────────
  if (traffic.priority >= 50 && traffic.type !== "UNKNOWN") {
    return _buildHyperChain(traffic.strategy, false, isNeighbor, timeProfile);
  }

  // ── STAGE 10: Neighbor fallback ──────────────────────────────────────────
  if (isNeighbor) {
    return _buildHyperChain("BALANCED_FAST", false, true, timeProfile);
  }

  // ── Default: DIRECT (non-game, non-JO, low priority) ────────────────────
  return HYPER_PROXIES.DIRECT;
}
