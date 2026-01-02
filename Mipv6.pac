// ============================================================================
// PUBG MOBILE HYPER-QUANTUM PAC - ULTIMATE EDITION  (PATCHED: JO+NO-INTERNET FIX)
// + SOCKS5 SUPPORT (ADDITIVE PATCH ONLY)
// + JO IPv4 EXPANDED (NO DUPLICATES)
// + JO IPv6 SUPPORT (ADDITIVE)
// ============================================================================

// ===================== SOCKS5 ADDITIVE CFG (NEW) =====================
var SOCKS5_CFG = {
  USE_SOCKS5: false,     // true = يرجّع SOCKS5 بدل PROXY (بدون تغيير أي منطق)
  USE_SOCKS5H: false     // true = SOCKS5H (DNS عبر البروكسي) بدل SOCKS5
};

// ===================== ORIGINAL SCRIPT (UNCHANGED CONTENT) =====================

var HYPER_PROXIES = {
  JO_ULTRA: {
    QUANTUM_1: "PROXY 212.35.66.45:33434",
    QUANTUM_2: "PROXY 46.185.131.218:20003",
    QUANTUM_3: "PROXY 212.35.66.45:5222",
    QUANTUM_4: "PROXY 91.106.109.12:20004"
  },
  JO_SPECIALIZED: {
    MATCH_ALPHA: "PROXY 212.35.66.45:33434",
    MATCH_BETA: "PROXY 46.185.131.218:20001",
    VOICE_ALPHA: "PROXY 212.35.66.45:20001",
    VOICE_BETA: "PROXY 212.35.66.45:20002",
    GAME_ALPHA:  "PROXY 91.106.109.12:5222",
    GAME_BETA:   "PROXY 91.106.109.12:1080"
  },
  JO_BALANCERS: {
    LB_1: "PROXY 212.35.66.45:33434",
    LB_2: "PROXY 46.185.131.218:20001",
    LB_3: "PROXY 212.35.66.45:10039"
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
  // JO IPv4 = original list + additions (NO duplicates)
  JO: [
    // === original (as provided) ===
    "46.185.128.0/17","86.108.0.0/17","92.253.0.0/17","94.249.0.0/17",
    "82.212.64.0/18","79.173.192.0/18","37.202.64.0/18","94.142.32.0/19",
    "46.32.96.0/19","109.107.224.0/19","80.90.160.0/20","77.245.0.0/20",
    "81.21.0.0/20","109.237.192.0/20",

    // === added JO IPv4 (no repeats of the above) ===
    "2.59.52.0/22",
    "5.45.128.0/20",
    "5.198.240.0/21",
    "5.199.184.0/22",
    "37.17.192.0/20",
    "37.44.32.0/21",
    "37.75.144.0/21",
    "37.123.64.0/19",
    "37.152.0.0/21",
    "37.220.112.0/20",
    "37.252.222.0/24",
    "45.142.196.0/22",
    "46.23.112.0/20",
    "46.248.192.0/19",
    "62.72.160.0/19",
    "79.134.128.0/19",
    "81.28.112.0/20",
    "84.18.32.0/19",
    "84.18.64.0/19",
    "84.252.106.0/24",
    "85.159.216.0/21",
    "87.236.232.0/21",
    "87.238.128.0/21",
    "89.20.49.0/24",
    "89.28.216.0/21",
    "89.38.152.0/23",
    "91.106.96.0/20",
    "91.132.100.0/24",
    "91.186.224.0/19",
    "91.209.248.0/24",
    "91.212.0.0/24",
    "91.220.195.0/24",
    "91.223.202.0/24",
    "92.241.32.0/19",
    "93.93.144.0/21",
    "93.95.200.0/21",
    "93.115.2.0/24",
    "93.115.3.0/24",
    "93.115.15.0/24",
    "93.191.176.0/21",
    "94.127.208.0/21",
    "95.141.208.0/20",
    "95.172.192.0/19",
    "141.0.0.0/21",
    "141.98.64.0/22",
    "141.105.56.0/21",
    "146.19.239.0/24",
    "146.19.246.0/24",
    "149.200.128.0/17",
    "176.28.128.0/17",
    "176.29.0.0/16",
    "176.57.0.0/19",
    "176.57.48.0/20",
    "176.118.39.0/24",
    "176.241.64.0/21",
    "178.20.184.0/21",
    "178.77.128.0/18",
    "178.238.176.0/20",
    "185.10.216.0/22",
    "185.12.244.0/22",
    "185.14.132.0/22",
    "185.19.112.0/22",
    "185.24.128.0/22",
    "185.30.248.0/22",
    "185.33.28.0/22",
    "185.40.19.0/24",
    "185.43.146.0/24",
    "185.51.212.0/22",
    "185.57.120.0/22",
    "185.80.24.0/22",
    "185.80.104.0/22",
    "185.98.220.0/22",
    "185.98.224.0/22",
    "185.109.120.0/22",
    "185.109.192.0/22",
    "185.135.200.0/22",
    "185.139.220.0/22",
    "185.159.180.0/22",
    "185.160.236.0/22",
    "185.163.205.0/24",
    "185.173.56.0/22",
    "185.175.248.0/22",
    "185.176.44.0/22",
    "185.180.80.0/22",
    "185.182.136.0/22",
    "185.193.176.0/22",
    "185.197.176.0/22",
    "185.200.128.0/22",
    "185.234.111.0/24",
    "185.241.62.0/24",
    "185.253.112.0/22",
    "188.123.160.0/19",
    "188.247.64.0/19",
    "193.17.53.0/24",
    "193.108.134.0/23",
    "193.111.29.0/24",
    "193.188.64.0/19",
    "193.189.148.0/24",
    "193.203.24.0/23",
    "193.203.110.0/23",
    "194.104.95.0/24",
    "194.110.236.0/24",
    "194.165.128.0/19",
    "195.18.9.0/24",
    "212.34.0.0/19",
    "212.35.64.0/19",
    "212.118.0.0/19",
    "213.139.32.0/19",
    "213.186.160.0/19",
    "217.23.32.0/20",
    "217.29.240.0/20",
    "217.144.0.0/20"
  ],

  // JO IPv6 (NEW, ADDITIVE)
  JO6: [
    "2001:32c0::/29",
    "2a00:18d0::/32",
    "2a00:18d8::/29",
    "2a00:4620::/32",
    "2a00:76e0::/32",
    "2a00:b860::/32",
    "2a00:caa0::/32",
    "2a01:1d0::/29",
    "2a01:9700::/29",
    "2a01:e240::/29",
    "2a01:ee40::/29",
    "2a02:9c0::/29",
    "2a02:2558::/29",
    "2a02:25d8::/32",
    "2a02:5b60::/32",
    "2a02:c040::/29",
    "2a02:e680::/29",
    "2a02:f0c0::/29",
    "2a03:6b00::/29",
    "2a03:6d00::/32",
    "2a03:b640::/32",
    "2a04:6200::/29",
    "2a05:74c0::/29",
    "2a05:7500::/29",
    "2a06:9bc0::/29",
    "2a06:bd80::/29",
    "2a07:140::/29",
    "2a0a:2740::/29",
    "2a0c:39c0::/29",
    "2a0d:cf40::/29",
    "2a10:1100::/29",
    "2a10:9740::/29",
    "2a10:d800::/29",
    "2a11:d180::/29",
    "2a13:1f00::/29",
    "2a13:5c00::/29",
    "2a13:8d40::/29",
    "2a14:1a40::/29",
    "2a14:2840::/29",
    "2001:67c:2124::/48"
  ],

  SA: ["5.108.0.0/14","31.166.0.0/15","37.208.0.0/13","46.28.0.0/16","46.234.0.0/15","78.93.0.0/16","82.205.128.0/17","91.102.0.0/16","109.107.32.0/19","151.232.0.0/14","188.245.0.0/16","212.138.64.0/19"],
  AE: ["62.215.128.0/17","78.84.0.0/15","84.17.96.0/19","85.115.0.0/16"],
  KW: ["62.215.0.0/17","80.184.0.0/15","85.25.0.0/16","188.246.128.0/17","213.180.128.0/17"],
  LB: ["212.40.64.0/19","212.72.192.0/19","213.168.192.0/19"],
  PS: ["1.178.112.0/20","1.178.128.0/20","24.42.64.0/18"],
  IQ: ["5.62.0.0/16","37.236.0.0/14"],
  EG: ["197.160.0.0/11","196.176.0.0/14"],
  SY: ["5.0.0.0/17","46.53.0.0/16","46.161.192.0/18","82.137.192.0/18"],
  QA: ["77.81.64.0/18","185.3.0.0/16","212.77.0.0/17"],
  BH: ["37.131.192.0/19","46.53.0.0/16"],
  OM: ["37.209.0.0/16","46.36.192.0/20"]
};

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

// ===================== IPv6 HELPERS (NEW, ADDITIVE) =====================
function _isIPv6(ip){ return ip && ip.indexOf(":") !== -1; }

function _expandIPv6(ip){
  ip = (ip || "").toLowerCase();

  // strip zone id (e.g., fe80::1%en0)
  var z = ip.indexOf("%");
  if(z !== -1) ip = ip.substring(0, z);

  // handle IPv4-mapped tail ::ffff:1.2.3.4
  var lastColon = ip.lastIndexOf(":");
  var lastPart = ip.substring(lastColon + 1);
  if(lastPart.indexOf(".") !== -1){
    var v4 = lastPart.split(".");
    if(v4.length === 4){
      var a = (parseInt(v4[0])<<8) | parseInt(v4[1]);
      var b = (parseInt(v4[2])<<8) | parseInt(v4[3]);
      ip = ip.substring(0, lastColon) + ":" + a.toString(16) + ":" + b.toString(16);
    }
  }

  var parts = ip.split("::");
  var left = parts[0] ? parts[0].split(":") : [];
  var right = (parts.length > 1 && parts[1]) ? parts[1].split(":") : [];

  if(left.length===1 && left[0]==="") left=[];
  if(right.length===1 && right[0]==="") right=[];

  var missing = 8 - (left.length + right.length);
  if(parts.length === 1) missing = 0; // no ::

  var full = [];
  for(var i=0;i<left.length;i++) full.push(left[i]);
  for(var k=0;k<missing;k++) full.push("0");
  for(var j=0;j<right.length;j++) full.push(right[j]);

  while(full.length < 8) full.push("0");
  if(full.length > 8) full = full.slice(0,8);

  for(var t=0;t<8;t++){
    var h = full[t] || "0";
    full[t] = ("0000" + h).slice(-4);
  }
  return full;
}

function _ipv6ToParts(ip){
  var h = _expandIPv6(ip);
  var p0 = (parseInt(h[0],16)<<16) | parseInt(h[1],16);
  var p1 = (parseInt(h[2],16)<<16) | parseInt(h[3],16);
  var p2 = (parseInt(h[4],16)<<16) | parseInt(h[5],16);
  var p3 = (parseInt(h[6],16)<<16) | parseInt(h[7],16);
  return [p0>>>0, p1>>>0, p2>>>0, p3>>>0];
}

function _ipv6CidrMatch(ip, cidr){
  if(!ip || !cidr) return false;
  var idx = cidr.indexOf("/");
  if(idx === -1) return false;

  var net = cidr.substring(0, idx);
  var bits = parseInt(cidr.substring(idx+1), 10);
  if(!(bits >= 0 && bits <= 128)) return false;

  var ipP = _ipv6ToParts(ip);
  var netP = _ipv6ToParts(net);

  var full = Math.floor(bits / 32);
  var rem  = bits % 32;

  for(var i=0;i<full;i++){
    if(ipP[i] !== netP[i]) return false;
  }
  if(rem === 0) return true;

  var mask = (0xFFFFFFFF << (32 - rem)) >>> 0;
  return ((ipP[full] & mask)>>>0) === ((netP[full] & mask)>>>0);
}

function _inV6CidrArray(ip, arr){
  if(!ip || !arr) return false;
  if(!_isIPv6(ip)) return false;
  for(var i=0;i<arr.length;i++){
    if(_ipv6CidrMatch(ip, arr[i])) return true;
  }
  return false;
}

// ===================== SOCKS5 ADAPTER (NEW, ADDITIVE) =====================
// يحول فقط "PROXY " إلى "SOCKS5 " أو "SOCKS5H " داخل أي chain بدون تغيير المنطق
function _maybeSocks(chainStr){
  if(!SOCKS5_CFG || !SOCKS5_CFG.USE_SOCKS5) return chainStr;
  if(!chainStr) return chainStr;

  // لا تلمس DIRECT
  // بدّل كل "PROXY " إلى "SOCKS5 " (أو SOCKS5H)
  var scheme = (SOCKS5_CFG.USE_SOCKS5H ? "SOCKS5H " : "SOCKS5 ");
  return chainStr.split("PROXY ").join(scheme);
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
// + SOCKS5 WRAPPER (ADDITIVE)
// ============================================================================
function FindProxyForURL(url, host){
  host=(host||"").toLowerCase();

  // STAGE 0: SACRED DIRECT
  if(_inDomainArray(host, ULTRA_DOMAINS.SACRED_DIRECT)){
    return _maybeSocks(HYPER_PROXIES.DIRECT);
  }

  // ===== PATCH A: iOS/Android "No Internet" connectivity/certs/time checks =====
  // (minimal direct for connectivity so PAC doesn't kill internet)
  var SAFE_DIRECT = [
    "captive.apple.com","ocsp.apple.com","ocsp2.apple.com","time.apple.com","mesu.apple.com","gsp-ssl.ls.apple.com",
    "connectivitycheck.gstatic.com","clients3.google.com","clients4.google.com"
  ];
  if(_inDomainArray(host, SAFE_DIRECT)) return _maybeSocks(HYPER_PROXIES.DIRECT);
  if(host==="clients3.google.com" && url && url.toLowerCase().indexOf("generate_204")!==-1) return _maybeSocks(HYPER_PROXIES.DIRECT);

  // STAGE 1: GEO
  var resolvedIP = dnsResolve(host);

  // IPv4+IPv6 JO detection (ADDITIVE)
  var isJO = resolvedIP && ( _inCidrArray(resolvedIP, GEO_MATRIX.JO) || _inV6CidrArray(resolvedIP, GEO_MATRIX.JO6) );
  var isNeighbor = resolvedIP && _inCidrArray(resolvedIP, GEO_MATRIX.ALL_NEIGHBORS);

  // STAGE 2: ULTRA MODE
  var ultraMode = _getUltraMode();

  // STAGE 3: CLASSIFY
  var traffic = _neuralClassify(url, host);

  // STAGE 4: ROUTING DECISION

  // Priority 1: CDN (keep as your original direct to avoid update break)
  if(traffic.strategy==="CDN_TURBO"){
    return _maybeSocks(HYPER_PROXIES.DIRECT);
  }

  // ===== PATCH B: JO bias -> force HYPER_MATCHMAKING when JO detected =====
  // Priority 2: JO + important
  if(isJO && traffic.priority>=60){
    return _maybeSocks(_buildHyperChain("HYPER_MATCHMAKING", true, false, ultraMode));
  }

  // Priority 3: CRITICAL traffic
  if(traffic.tier==="CRITICAL" || traffic.priority===100){
    return _maybeSocks(_buildHyperChain(traffic.strategy, isJO, isNeighbor, ultraMode));
  }

  // Priority 4: HIGH
  if(traffic.tier==="HIGH" || traffic.priority>=75){
    return _maybeSocks(_buildHyperChain(traffic.strategy, isJO, isNeighbor, ultraMode));
  }

  // Priority 5: MEDIUM
  if(traffic.priority>=50 && traffic.type!=="UNKNOWN"){
    return _maybeSocks(_buildHyperChain(traffic.strategy, isJO, isNeighbor, ultraMode));
  }

  // ===== PATCH C: even low-priority JO -> HYPER_MATCHMAKING (instead of BALANCED_FAST) =====
  if(isJO){
    return _maybeSocks(_buildHyperChain("HYPER_MATCHMAKING", true, false, ultraMode));
  }

  // ===== PATCH D: Neighbor no longer DIRECT only (still allows fallback DIRECT inside chain) =====
  if(isNeighbor){
    return _maybeSocks(_buildHyperChain("BALANCED_FAST", false, true, ultraMode));
  }

  // keep original low/direct behavior for non-PUBG to avoid No Internet
  if(traffic.priority<30){
    return _maybeSocks(HYPER_PROXIES.DIRECT);
  }

  return _maybeSocks(HYPER_PROXIES.DIRECT);
}
