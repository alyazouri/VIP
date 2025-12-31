// ============================================================================
// PUBG MOBILE - JO PATH ONLY (WORKING LIKE ORIGINAL) + JO CIDRs (DEDUP)
// - Removed ANY neighbor/outside logic completely
// - Added your Jordan CIDRs (no duplicates)
// - PUBG traffic: ALWAYS via JO proxies (NO DIRECT for PUBG)
// - Matchmaking: pulsed soft-block pressure (safe, not permanent)
// - DIRECT فقط: YouTube + GitHub + Shahid + SAFE_DIRECT (No-Internet fix)
// Generated: 2025-12-31
// ============================================================================

var HYPER_PROXIES = {
  JO_ULTRA: {
    QUANTUM_1: "PROXY 212.35.66.45:20020",
    QUANTUM_2: "PROXY 46.185.131.218:20001",
    QUANTUM_3: "PROXY 212.35.66.46:443",
    QUANTUM_4: "PROXY 91.106.109.12:20004"
  },
  JO_SPECIALIZED: {
    MATCH_ALPHA: "PROXY 212.35.66.45:20020",
    MATCH_BETA:  "PROXY 46.185.131.218:20001",

    VOICE_ALPHA: "PROXY 46.185.131.222:20001",
    VOICE_BETA:  "PROXY 46.185.131.223:20001",

    GAME_ALPHA:  "PROXY 91.106.109.12:20001",
    GAME_BETA:   "PROXY 91.106.109.25:20001"
  },
  DIRECT: "DIRECT",
  BLOCK:  "PROXY 0.0.0.0:0"
};

// ===================== DOMAIN INTELLIGENCE =====================
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
  SACRED_DIRECT: [
    "youtube.com","googlevideo.com","ytimg.com","ggpht.com",
    "github.com","githubusercontent.com","gitlab.com",
    "shahid.net","shahid.mbc.net"
  ]
};

// ===================== GEO MATRIX (JO ONLY, DEDUP) =====================
var GEO_MATRIX = {
  JO: [
    "2.59.52.0/22",
    "5.45.128.0/20",
    "5.198.240.0/21",
    "5.199.184.0/22",
    "37.17.192.0/20",
    "37.44.32.0/21",
    "37.75.144.0/21",
    "37.123.64.0/19",
    "37.152.0.0/21",
    "37.202.64.0/18",
    "37.220.112.0/20",
    "37.252.222.0/24",
    "45.142.196.0/22",
    "46.23.112.0/20",
    "46.32.96.0/19",
    "46.185.128.0/17",
    "46.248.192.0/19",
    "62.72.160.0/19",
    "77.245.0.0/20",
    "79.134.128.0/19",
    "79.173.192.0/18",
    "80.90.160.0/20",
    "81.21.0.0/20",
    "81.28.112.0/20",
    "82.212.64.0/18",
    "84.18.32.0/19",
    "84.18.64.0/19",
    "84.252.106.0/24",
    "85.159.216.0/21",
    "86.108.0.0/17",
    "87.236.232.0/21",
    "87.238.128.0/21",
    "89.20.49.0/24",
    "89.28.216.0/21",
    "89.38.152.0/23",
    "91.106.96.0/20",
    "91.132.100.0/24",
    "91.186.224.0/19",
    "91.212.0.0/24",
    "91.223.202.0/24",
    "92.241.32.0/19",
    "92.253.0.0/17",
    "93.93.144.0/21",
    "93.95.200.0/21",
    "93.115.2.0/24",
    "93.115.3.0/24",
    "93.115.15.0/24",
    "93.191.176.0/21",
    "94.127.208.0/21",
    "94.142.32.0/19",
    "94.249.0.0/17",
    "95.141.208.0/20",
    "95.172.192.0/19",
    "109.107.224.0/19",
    "109.237.192.0/20",
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
    "193.188.64.0/19",
    "193.203.24.0/23",
    "193.203.110.0/23",
    "194.104.95.0/24",
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
  ]
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
  if(!host||!arr) return false;
  for(var i=0;i<arr.length;i++){ if(_fastDomainMatch(host,arr[i])) return true; }
  return false;
}
function _hostHasAny(host, parts){
  if(!host) return false;
  host = host.toLowerCase();
  for(var i=0;i<parts.length;i++){
    if(host.indexOf(parts[i])!==-1) return true;
  }
  return false;
}
function _isPubgLikeHost(host){
  return _hostHasAny(host, ["pubg","pubgm","igamecj","proximabeta","tencent","qcloud","qq.com","gcloudsdk"]);
}
function _nowPulse(){
  // Safe matchmaking pressure: 1/3 BLOCK
  var s = (new Date()).getSeconds();
  return (s % 3) === 0;
}

// ===================== CHAINS (SHORT = LOWER PING) =====================
function _chainMatch(){
  return [HYPER_PROXIES.JO_SPECIALIZED.MATCH_ALPHA, HYPER_PROXIES.JO_SPECIALIZED.MATCH_BETA].join("; ");
}
function _chainGame(){
  return [HYPER_PROXIES.JO_SPECIALIZED.GAME_ALPHA, HYPER_PROXIES.JO_SPECIALIZED.GAME_BETA].join("; ");
}
function _chainVoice(){
  return [HYPER_PROXIES.JO_SPECIALIZED.VOICE_ALPHA, HYPER_PROXIES.JO_SPECIALIZED.VOICE_BETA].join("; ");
}
function _chainGeneralPubg(){
  return [HYPER_PROXIES.JO_ULTRA.QUANTUM_1, HYPER_PROXIES.JO_ULTRA.QUANTUM_2].join("; ");
}

// ============================================================================
// FindProxyForURL
// ============================================================================
function FindProxyForURL(url, host){
  host=(host||"").toLowerCase();
  url =(url ||"");

  // DIRECT only for: YouTube/GitHub/Shahid
  if(_inDomainArray(host, ULTRA_DOMAINS.SACRED_DIRECT)){
    return HYPER_PROXIES.DIRECT;
  }

  // SAFE_DIRECT (system checks) to prevent "No Internet"
  var SAFE_DIRECT = [
    "captive.apple.com","ocsp.apple.com","ocsp2.apple.com","time.apple.com","mesu.apple.com","gsp-ssl.ls.apple.com",
    "connectivitycheck.gstatic.com","clients3.google.com","clients4.google.com"
  ];
  if(_inDomainArray(host, SAFE_DIRECT)) return HYPER_PROXIES.DIRECT;
  if(host==="clients3.google.com" && url.toLowerCase().indexOf("generate_204")!==-1) return HYPER_PROXIES.DIRECT;

  // CDN stays DIRECT
  if(_inDomainArray(host, ULTRA_DOMAINS.CDN_MEDIUM)){
    return HYPER_PROXIES.DIRECT;
  }

  // PUBG detection
  var isPUBG = _isPubgLikeHost(host) ||
               _inDomainArray(host, ULTRA_DOMAINS.PUBG_CORE_HIGH) ||
               _inDomainArray(host, ULTRA_DOMAINS.TENCENT_HIGH) ||
               _inDomainArray(host, ULTRA_DOMAINS.MATCHMAKING_CRITICAL) ||
               _inDomainArray(host, ULTRA_DOMAINS.GAME_SERVERS_CRITICAL) ||
               _inDomainArray(host, ULTRA_DOMAINS.VOICE_CRITICAL);

  if(isPUBG){
    var isMM = _inDomainArray(host, ULTRA_DOMAINS.MATCHMAKING_CRITICAL) || _hostHasAny(host, ["lobby","queue","room","match","mm"]);

    // JO CIDRs as hint only (NOT a requirement)
    var ip = dnsResolve(host);
    var isJO = ip && _inCidrArray(ip, GEO_MATRIX.JO);

    // Matchmaking pressure:
    if(isMM){
      if(!isJO && _nowPulse()){
        return HYPER_PROXIES.BLOCK;
      }
      return _chainMatch();
    }

    // Voice
    if(_inDomainArray(host, ULTRA_DOMAINS.VOICE_CRITICAL) || _hostHasAny(host, ["voice","rtc","voip","webrtc","audio"])){
      return _chainVoice();
    }

    // Active game servers
    if(_inDomainArray(host, ULTRA_DOMAINS.GAME_SERVERS_CRITICAL) || _hostHasAny(host, ["game","battle","combat","pvp","server","gs."])){
      return _chainGame();
    }

    // Other PUBG/Tencent traffic
    return _chainGeneralPubg();
  }

  // Non-PUBG
  return HYPER_PROXIES.DIRECT;
}
