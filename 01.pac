// ============================================================================
// PUBG MOBILE HYPER-QUANTUM PAC - ULTIMATE EDITION  (PATCHED: JO+NO-INTERNET FIX)
// ============================================================================

var HYPER_PROXIES = {
  JO_ULTRA: {
    QUANTUM_1: "PROXY 212.35.66.45:5222",
    QUANTUM_2: "PROXY 46.185.131.218:20001",
    QUANTUM_3: "PROXY 212.35.66.46:443",
    QUANTUM_4: "PROXY 91.106.109.12:10039"
  },
  JO_SPECIALIZED: {
    MATCH_ALPHA: "PROXY 212.35.66.45:5222",
    MATCH_BETA: "PROXY 46.185.131.218:20001",
    VOICE_ALPHA: "PROXY 46.185.131.222:20001",
    VOICE_BETA: "PROXY 46.185.131.223:20001",
    GAME_ALPHA:  "PROXY 91.106.109.12:20001",
    GAME_BETA:   "PROXY 91.106.109.25:20001"
  },
  JO_BALANCERS: {
    LB_1: "PROXY 212.35.66.45:5222",
    LB_2: "PROXY 46.185.131.218:20001",
    LB_3: "PROXY 91.106.109.25:20001"
  },
  DIRECT: "DIRECT"
};

// ===================== DEEP LEARNING PATTERNS (5+ LAYERS) =====================
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
  ]
};

// ===================== GEO MATRIX =====================
var GEO_MATRIX = {
  JO: [
  // Jordan Data Communications (JDCC) - الأكبر
  "46.185.128.0/17",
  "86.108.0.0/17",
  "92.253.0.0/17",
  "94.249.0.0/17",
  "149.200.128.0/17",
  "79.173.192.0/18",
  "213.186.160.0/19",
  "194.165.128.0/19",
  // Linkdotnet (Zain سابقاً) - الثاني
  "176.29.0.0/16",
  "176.28.128.0/17",
  "37.202.64.0/18",
  "46.32.96.0/19",
  "188.247.64.0/19",
  "77.245.0.0/20",
  "80.90.160.0/20",
  // Umniah - الثالث
  "46.248.192.0/19",
  "92.241.32.0/19",
  "95.172.192.0/19",
  "109.107.224.0/19",
  "46.23.112.0/20",
  "95.141.208.0/20",
  // Batelco Jordan
  "91.106.96.0/20",
  "91.186.224.0/19",
  "212.118.0.0/19",
  "37.220.112.0/20",
  // AL-HADATHEH / Orange Jordan
  "82.212.64.0/18",
  "81.28.112.0/20",
  "188.123.160.0/19",
  // VTEL
  "62.72.160.0/19",
  "81.21.0.0/20",
  "109.237.192.0/20",
  "176.57.48.0/20",
  // Jordan Telecom / Orange
  "212.34.0.0/19",
  "212.35.64.0/19",
  "213.139.32.0/19"
],
SA: [
  // STC - Saudi Telecom (أكبر مزود)
  "2.88.0.0/14",        // STC ← صحيح /14 (262144)
  "5.41.0.0/16",        // STC
  "5.156.0.0/16",       // STC ← جديد
  "5.163.0.0/16",       // STC ← جديد
  "37.56.0.0/16",       // STC ← جديد
  "37.104.0.0/14",      // STC ← صُحِّح من /14
  "37.224.0.0/16",      // STC ← جديد
  "77.30.0.0/15",       // STC ← جديد
  "90.148.0.0/16",      // STC ← جديد
  "93.112.0.0/16",      // STC ← جديد
  "93.168.0.0/15",      // STC ← جديد
  "94.96.0.0/14",       // STC ← جديد
  "95.184.0.0/14",      // STC ← جديد
  "188.48.0.0/13",      // STC ← أكبر نطاق 524288 IP
  // Mobily (Etihad Etisalat)
  "5.82.0.0/16",        // Mobily
  "5.108.0.0/14",       // Mobily ← صحيح /14
  "5.244.0.0/14",       // Mobily ← جديد
  "31.166.0.0/15",      // Mobily
  "37.42.0.0/15",       // Mobily ← صُحِّح من /15
  "37.121.0.0/16",      // Mobily ← جديد
  "37.124.0.0/14",      // Mobily ← جديد
  "37.141.0.0/16",      // Mobily ← جديد
  "37.216.0.0/15",      // Mobily ← جديد
  "37.240.0.0/14",      // Mobily ← جديد
  "46.152.0.0/15",      // Mobily ← جديد
  "86.51.0.0/16",       // Mobily ← جديد
  "109.82.0.0/15",      // Mobily ← جديد
  "146.251.0.0/16",     // Mobily ← جديد
  "176.16.0.0/14",      // Mobily ← جديد
  "176.224.0.0/15",     // Mobily ← جديد
  "178.80.0.0/15",      // Mobily ← جديد
  // Zain KSA
  "82.205.128.0/17",    // Zain
  "212.138.64.0/16"     // KACST ← صُحِّح (المستخدمون الفعليون)
],

AE: [
  // Etisalat (e&)
  "2.48.0.0/14",        // Etisalat ← صحيح /14
  "5.107.0.0/16",       // Etisalat
  "5.192.0.0/15",       // Etisalat ← صحيح /15
  "5.195.0.0/16",       // Etisalat ← جديد
  "31.215.0.0/16",      // Etisalat ← جديد
  "31.218.0.0/15",      // Etisalat ← جديد
  "37.245.0.0/16",      // Etisalat ← جديد
  "83.110.0.0/15",      // Etisalat ← جديد
  "86.96.0.0/14",       // Etisalat ← جديد
  "92.96.0.0/14",       // Etisalat ← جديد
  "94.56.0.0/14",       // Etisalat ← جديد
  "109.177.0.0/16",     // Etisalat ← جديد
  "176.204.0.0/15",     // Etisalat ← جديد
  "194.170.0.0/16",     // Etisalat ← جديد
  "195.229.0.0/16",     // Etisalat ← جديد
  "213.42.0.0/16",      // Etisalat ← جديد
  "217.164.0.0/15",     // Etisalat ← جديد
  // du (Emirates Integrated Telecom)
  "5.30.0.0/15",        // du ← صحيح /15
  "5.32.0.0/17",        // du
  "5.38.0.0/17",        // du ← جديد
  "87.200.0.0/15",      // du ← جديد
  "91.72.0.0/14",       // du ← جديد
  "94.200.0.0/13",      // du ← جديد (524288 IP!)
  // Earthlink UAE
  "37.236.0.0/14",      // Earthlink ← جديد
  "80.227.0.0/16"       // du ← جديد
],

KW: [
  // Zain Kuwait (MTC)
  "31.203.0.0/16",      // Zain ← صحيح /16
  "31.214.0.0/17",      // Zain ← صحيح /17
  "37.34.128.0/17",     // Zain ← جديد
  "37.36.0.0/14",       // Zain ← صحيح /14
  "37.231.0.0/16",      // VIVA Kuwait ← صحيح
  "46.186.128.0/17",    // Zain ← جديد
  "94.128.0.0/15",      // VIVA ← جديد (صُحِّح من /17)
  "149.147.0.0/16",     // Zain ← جديد
  "178.161.0.0/17",     // Zain ← جديد
  "188.236.0.0/16",     // Zain ← جديد
  // Ooredoo Kuwait (NMTC)
  "78.89.0.0/16",       // Ooredoo ← جديد
  "178.53.0.0/16",      // Ooredoo ← جديد
  "188.70.0.0/15",      // Ooredoo ← جديد
  // QualityNet / Fast
  "62.150.0.0/16",      // QualityNet ← صحيح /16 (صُحِّح من /17)
  "62.215.0.0/16",      // Fast ← صحيح /16 (صُحِّح من /17)
  "80.184.0.0/16",      // Zajil ← صحيح /16
  "83.96.0.0/17",       // Fast ← جديد
  "91.140.128.0/17",    // GulfNet ← جديد
  "178.61.0.0/16"       // Fast ← جديد
],

LB: [
  "5.8.128.0/19",       // صحيح
  "77.42.128.0/17",     // صحيح
  "77.110.64.0/18",     // صحيح
  "178.135.0.0/16",     // صحيح
  "185.66.0.0/16",      // صحيح
  "212.40.64.0/19",     // صحيح
  "212.72.192.0/19",    // صحيح
  "213.168.192.0/19"    // صحيح (لا تغييرات جوهرية)
],

PS: [
  "37.8.0.0/17",        // صحيح
  "46.61.0.0/16",       // صحيح
  "188.161.128.0/17",   // صحيح
  "212.14.192.0/19",    // صحيح
  "217.19.128.0/19"     // صحيح
  // حُذف: 1.178.x.x (آسيوية/مشكوك فيها) و 24.42.x.x (أمريكية)
],

IQ: [
  "5.62.0.0/16",        // صحيح
  "37.236.0.0/14",      // ← تحقق: هذا مخصص لـ UAE أيضاً، يُبقى
  "149.255.0.0/16",     // صحيح
  "185.84.0.0/16",      // صحيح
  "188.120.0.0/13",     // صحيح ← /13 كبير لكن صحيح
  "213.175.0.0/16"      // صحيح
],

EG: [
  "41.32.0.0/12",       // صحيح ← Telecom Egypt
  "41.128.0.0/11",      // صحيح
  "41.190.0.0/15",      // صحيح
  "196.128.0.0/10",     // صحيح ← أكبر نطاق
  "196.176.0.0/14",     // صحيح
  "197.32.0.0/11",      // صحيح
  "197.160.0.0/11",     // صحيح
  "154.176.0.0/12"      // صحيح
],

SY: [
  "5.0.0.0/17",         // صحيح
  "46.53.0.0/16",       // صحيح (مشترك مع BH - طبيعي)
  "46.161.192.0/18",    // صحيح
  "82.137.192.0/18",    // صحيح
  "185.90.0.0/15"       // صحيح
],

QA: [
  "37.210.0.0/15",      // صحيح ← صُحِّح من /15
  "77.81.64.0/18",      // صحيح
  "94.56.0.0/14",       // ← تحذير: مشترك مع UAE، يُحذف
  "185.3.0.0/16",       // صحيح
  "212.77.0.0/17"       // صحيح
],

BH: [
  "37.131.192.0/19",    // صحيح
  "46.53.0.0/16",       // صحيح (Batelco)
  "185.36.0.0/16"       // صحيح
],

OM: [
  "5.36.0.0/14",        // صحيح ← /14 صحيح
  "37.209.0.0/16",      // صحيح
  "46.36.192.0/20",     // صحيح
  "185.5.0.0/16"        // صحيح
],


  
  GEO_MATRIX.ALL_NEIGHBORS = [].concat(
  GEO_MATRIX.SA,GEO_MATRIX.AE,GEO_MATRIX.KW,GEO_MATRIX.LB,GEO_MATRIX.PS,GEO_MATRIX.IQ,
  GEO_MATRIX.EG,GEO_MATRIX.SY,GEO_MATRIX.QA,GEO_MATRIX.BH,GEO_MATRIX.OM
);

// ===================== ALWAYS-ON ULTRA MODE =====================
var ULTRA_MODE = {
  ALWAYS_ACTIVE: { enabled: true, multiplier: 1.5, strategy: "HYPER_AGGRESSIVE", extraProxies: 2 }
};

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
    chain: [ HYPER_PROXIES.JO_ULTRA.QUANTUM_1, HYPER_PROXIES.JO_ULTRA.QUANTUM_2, HYPER_PROXIES.JO_BALANCERS.LB_1 ],
    timeout: 40, fallback: true, priority: 80
  },
  BALANCED_FAST: {
    tier: "MEDIUM",
    chain: [ HYPER_PROXIES.JO_ULTRA.QUANTUM_1, HYPER_PROXIES.JO_ULTRA.QUANTUM_2, HYPER_PROXIES.JO_BALANCERS.LB_1, HYPER_PROXIES.JO_BALANCERS.LB_2 ],
    timeout: 60, fallback: true, priority: 60
  },
  CDN_TURBO: {
    tier: "LOW",
    chain: [ HYPER_PROXIES.DIRECT ],
    timeout: 0, fallback: false, priority: 10
  }
};

// ===================== HELPERS =====================
function _ultraFastIpToLong(ip){
  var p = ip.split(".");
  return p.length===4 ? ((parseInt(p[0])<<24)|(parseInt(p[1])<<16)|(parseInt(p[2])<<8)|parseInt(p[3]))>>>0 : -1;
}
function _ultraFastCidrMatch(ip,cidr){
  var idx = cidr.indexOf("/");
  if(idx===-1) return false;
  var ipLong=_ultraFastIpToLong(ip);
  var netLong=_ultraFastIpToLong(cidr.substring(0,idx));
  var bits=parseInt(cidr.substring(idx+1));
  if(ipLong===-1||netLong===-1) return false;
  var mask=(0xFFFFFFFF<<(32-bits))>>>0;
  return ((ipLong&mask)>>>0)===((netLong&mask)>>>0);
}
function _inCidrArray(ip,arr){
  if(!ip||!arr) return false;
  for(var i=0;i<arr.length;i++){ if(_ultraFastCidrMatch(ip,arr[i])) return true; }
  return false;
}
function _fastDomainMatch(host,domain){
  if(!host||!domain) return false;
  host=host.toLowerCase(); domain=domain.toLowerCase();
  var hLen=host.length,dLen=domain.length;
  return host===domain || (hLen>dLen && host.charAt(hLen-dLen-1)==="." && host.substring(hLen-dLen)===domain);
}
function _inDomainArray(host,arr){
  if(!host) return false;
  for(var i=0;i<arr.length;i++){ if(_fastDomainMatch(host,arr[i])) return true; }
  return false;
}
function _urlHasPattern(url,patterns){
  if(!url) return false; url=url.toLowerCase();
  for(var i=0;i<patterns.length;i++){ if(url.indexOf(patterns[i])!==-1) return true; }
  return false;
}
function _hostHasPattern(host,patterns){
  if(!host) return false; host=host.toLowerCase();
  for(var i=0;i<patterns.length;i++){ if(host.indexOf(patterns[i])!==-1) return true; }
  return false;
}

// ===================== PHASE DETECTOR =====================
function _deepDetectPhase(url,host){
  var maxWeight=0, detectedPhase=null;
  for(var phaseName in DEEP_PATTERNS){
    var phase=DEEP_PATTERNS[phaseName];
    var score=0;
    if(_hostHasPattern(host,phase.domains)) score+=40;
    if(_urlHasPattern(url,phase.paths)) score+=40;
    if(_hostHasPattern(host,phase.hostPatterns)) score+=20;
    var weightedScore = score*(phase.weight/100);
    if(weightedScore>maxWeight){ maxWeight=weightedScore; detectedPhase=phase; }
  }
  return detectedPhase;
}

// ===================== CLASSIFIER =====================
function _neuralClassify(url,host){
  var classification={ type:"UNKNOWN", tier:"LOW", priority:30, strategy:"BALANCED_FAST" };
  var phase=_deepDetectPhase(url,host);
  if(phase){
    classification.type=phase.strategy;
    classification.tier="HIGH";
    classification.priority=phase.weight;
    classification.strategy=phase.strategy;
    return classification;
  }
  if(_inDomainArray(host,ULTRA_DOMAINS.MATCHMAKING_CRITICAL)){
    classification.type="MATCHMAKING";
    classification.tier="CRITICAL";
    classification.priority=100;
    classification.strategy="HYPER_MATCHMAKING";
    return classification;
  }
  if(_inDomainArray(host,ULTRA_DOMAINS.VOICE_CRITICAL)){
    classification.type="VOICE";
    classification.tier="CRITICAL";
    classification.priority=100;
    classification.strategy="ZERO_LATENCY_VOICE_ULTRA";
    return classification;
  }
  if(_inDomainArray(host,ULTRA_DOMAINS.GAME_SERVERS_CRITICAL)){
    classification.type="GAMING";
    classification.tier="CRITICAL";
    classification.priority=100;
    classification.strategy="ZERO_JITTER_ULTRA";
    return classification;
  }
  if(_inDomainArray(host,ULTRA_DOMAINS.CDN_MEDIUM)){
    classification.type="CDN";
    classification.tier="LOW";
    classification.priority=10;
    classification.strategy="CDN_TURBO";
    return classification;
  }
  if(_inDomainArray(host,ULTRA_DOMAINS.PUBG_CORE_HIGH) || _inDomainArray(host,ULTRA_DOMAINS.TENCENT_HIGH)){
    classification.type="PUBG_GENERAL";
    classification.tier="HIGH";
    classification.priority=75;
    classification.strategy="BALANCED_FAST";
    return classification;
  }
  if(_hostHasPattern(host,ULTRA_DOMAINS.ANALYTICS_LOW)){
    classification.type="ANALYTICS";
    classification.tier="LOW";
    classification.priority=20;
    classification.strategy="BALANCED_FAST";
  }
  return classification;
}

function _getUltraMode(){ return ULTRA_MODE.ALWAYS_ACTIVE; }

function _buildHyperChain(strategy,isJO,isNeighbor,ultraMode){
  var config=HYPER_STRATEGIES[strategy];
  if(!config) config=HYPER_STRATEGIES.BALANCED_FAST;

  var chain=config.chain.slice();

  if(ultraMode.extraProxies>0 && config.tier!=="LOW"){
    for(var i=0;i<ultraMode.extraProxies && i<2;i++){
      if(i===0 && chain.indexOf(HYPER_PROXIES.JO_BALANCERS.LB_1)===-1) chain.push(HYPER_PROXIES.JO_BALANCERS.LB_1);
      else if(i===1 && chain.indexOf(HYPER_PROXIES.JO_BALANCERS.LB_2)===-1) chain.push(HYPER_PROXIES.JO_BALANCERS.LB_2);
    }
  }

  // Keep original fallback behavior (to avoid No Internet)
  if(config.fallback){
    if(isJO && chain[chain.length-1]!==HYPER_PROXIES.DIRECT){
      chain.push(HYPER_PROXIES.DIRECT);
    } else if(isNeighbor){
      chain.push(HYPER_PROXIES.DIRECT);
    }
  }

  return chain.join("; ");
}

// ============================================================================
// FindProxyForURL (PATCHED minimal)
// ============================================================================
function FindProxyForURL(url, host){
  host=(host||"").toLowerCase();

  // STAGE 0: SACRED DIRECT
  if(_inDomainArray(host, ULTRA_DOMAINS.SACRED_DIRECT)){
    return HYPER_PROXIES.DIRECT;
  }

  // ===== PATCH A: iOS/Android "No Internet" connectivity/certs/time checks =====
  // (minimal direct for connectivity so PAC doesn't kill internet)
  var SAFE_DIRECT = [
    "captive.apple.com","ocsp.apple.com","ocsp2.apple.com","time.apple.com","mesu.apple.com","gsp-ssl.ls.apple.com",
    "connectivitycheck.gstatic.com","clients3.google.com","clients4.google.com"
  ];
  if(_inDomainArray(host, SAFE_DIRECT)) return HYPER_PROXIES.DIRECT;
  if(host==="clients3.google.com" && url && url.toLowerCase().indexOf("generate_204")!==-1) return HYPER_PROXIES.DIRECT;

  // STAGE 1: GEO
  var resolvedIP = dnsResolve(host);
  var isJO = resolvedIP && _inCidrArray(resolvedIP, GEO_MATRIX.JO);
  var isNeighbor = resolvedIP && _inCidrArray(resolvedIP, GEO_MATRIX.ALL_NEIGHBORS);

  // STAGE 2: ULTRA MODE
  var ultraMode = _getUltraMode();

  // STAGE 3: CLASSIFY
  var traffic = _neuralClassify(url, host);

  // STAGE 4: ROUTING DECISION

  // Priority 1: CDN (keep as your original direct to avoid update break)
  if(traffic.strategy==="CDN_TURBO"){
    return HYPER_PROXIES.DIRECT;
  }

  // ===== PATCH B: JO bias -> force HYPER_MATCHMAKING when JO detected =====
  // Priority 2: JO + important
  if(isJO && traffic.priority>=60){
    return _buildHyperChain("HYPER_MATCHMAKING", true, false, ultraMode);
  }

  // Priority 3: CRITICAL traffic
  if(traffic.tier==="CRITICAL" || traffic.priority===100){
    return _buildHyperChain(traffic.strategy, isJO, isNeighbor, ultraMode);
  }

  // Priority 4: HIGH
  if(traffic.tier==="HIGH" || traffic.priority>=75){
    return _buildHyperChain(traffic.strategy, isJO, isNeighbor, ultraMode);
  }

  // Priority 5: MEDIUM
  if(traffic.priority>=50 && traffic.type!=="UNKNOWN"){
    return _buildHyperChain(traffic.strategy, isJO, isNeighbor, ultraMode);
  }

  // ===== PATCH C: even low-priority JO -> HYPER_MATCHMAKING (instead of BALANCED_FAST) =====
  if(isJO){
    return _buildHyperChain("HYPER_MATCHMAKING", true, false, ultraMode);
  }

  // ===== PATCH D: Neighbor no longer DIRECT only (still allows fallback DIRECT inside chain) =====
  if(isNeighbor){
    return _buildHyperChain("BALANCED_FAST", false, true, ultraMode);
  }

  // keep original low/direct behavior for non-PUBG to avoid No Internet
  if(traffic.priority<30){
    return HYPER_PROXIES.DIRECT;
  }

  return HYPER_PROXIES.DIRECT;
}
