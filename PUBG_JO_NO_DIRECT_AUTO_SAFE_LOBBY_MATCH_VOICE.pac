// ============================================================================
// 🇯🇴 PUBG JO — NO DIRECT ANYWHERE — AUTO SAFE + LOBBY/MATCH/VOICE split
// Generated: 2025-12-30 18:40:09.210570
// CIDRs: only /20 /19 /18 derived from JO working IPs per role
// SAFE_DOMAINS => SAFE_CHAIN (NOT DIRECT)
// PUBG:
//   - Matchmaking/Lobby => LOBBY_SOFT/HARD (HARD includes SOFTBLOCK escalation)
//   - Match servers      => MATCH_CHAIN (stable)
//   - Voice              => VOICE_CHAIN (calm)
// ============================================================================

var SOFTBLOCK   = "PROXY 0.0.0.0:0";
var SAFE_CHAIN  = "PROXY 176.29.199.163:443";
var LOBBY_PROXY = "PROXY 176.29.199.163:443";
var MATCH_PROXY = "PROXY 176.29.199.163:443";
var VOICE_PROXY = "PROXY 176.29.199.163:443";

var LOBBY_SOFT  = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443";
var LOBBY_HARD  = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 0.0.0.0:0";
var MATCH_CHAIN = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443";
var VOICE_CHAIN = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443";

var SAFE_DOMAINS = [
  "captive.apple.com",
  "connectivitycheck.apple.com",
  "www.apple.com",
  "apple.com",
  "icloud.com",
  "configuration.apple.com",
  "time.apple.com",
  "time-ios.apple.com",
  "mesu.apple.com",
  "swscan.apple.com",
  "swcdn.apple.com",
  "swdownload.apple.com",
  "gs.apple.com",
  "github.com",
  "raw.githubusercontent.com",
  "api.github.com",
  "youtube.com",
  "googlevideo.com",
  "ytimg.com",
  "youtubei.googleapis.com"
];

var MATCHMAKING_CRITICAL = ['igamecj.com', 'gcloudsdk.com', 'proximabeta.com', 'match.pubgmobile.com', 'matchmaking.pubgmobile.com', 'mm.pubgmobile.com', 'lobby.pubgmobile.com', 'queue.pubgmobile.com', 'room.pubgmobile.com'];
var GAME_SERVERS_CRITICAL = ['game.pubgmobile.com', 'gs.pubgmobile.com', 'server.pubgmobile.com', 'battle.pubgmobile.com', 'play.pubgmobile.com', 'combat.pubgmobile.com', 'pvp.pubgmobile.com'];
var VOICE_CRITICAL = ['voice.pubgmobile.com', 'rtc.igamecj.com', 'gvoice.qq.com', 'voip.pubgmobile.com', 'audio.pubgmobile.com', 'rtc.pubgmobile.com'];
var PUBG_CORE_HIGH = ['pubgmobile.com', 'pubgm.com', 'proximabeta.com', 'pubgmobile.proximabeta.com'];
var TENCENT_HIGH = ['tencent.com', 'qq.com', 'qcloud.com', 'tencentgcloud.com', 'myqcloud.com'];
var CDN_MEDIUM = ['cdnpubg.com', 'pubgcdn.com', 'cdn.pubgmobile.com', 'static.pubgmobile.com', 'img.pubgmobile.com', 'image.pubgmobile.com', 'res.pubgmobile.com'];

var JO_CIDRS_LOBBY = [
  "176.28.192.0/20",
  "176.29.192.0/20",
  "176.28.192.0/19",
  "176.29.192.0/19",
  "176.28.192.0/18",
  "176.29.192.0/18"
];

var JO_CIDRS_MATCH = [
  "176.28.192.0/20",
  "176.29.192.0/20",
  "176.28.192.0/19",
  "176.29.192.0/19",
  "176.28.192.0/18",
  "176.29.192.0/18"
];

var JO_CIDRS_VOICE = [
  "176.28.192.0/20",
  "176.29.192.0/20",
  "176.28.192.0/19",
  "176.29.192.0/19",
  "176.28.192.0/18",
  "176.29.192.0/18"
];

function lc(s){return (s||"").toLowerCase();}
function endsWithDomain(host, domain){
  host=lc(host); domain=lc(domain);
  return host===domain || (host.length>domain.length && host.slice(-1-domain.length)===("." + domain));
}
function inDomains(host, arr){
  for (var i=0;i<arr.length;i++) if (endsWithDomain(host, arr[i])) return true;
  return false;
}
function isIP4(s){
  var p=s.split(".");
  if (p.length!==4) return false;
  for (var i=0;i<4;i++){var n=parseInt(p[i],10); if(isNaN(n)||n<0||n>255) return false;}
  return true;
}
function ip2l(ip){
  var p=ip.split(".");
  return ((+p[0]<<24)>>>0)+((+p[1]<<16)>>>0)+((+p[2]<<8)>>>0)+((+p[3])>>>0);
}
function inCIDR(ip,cidr){
  var a=cidr.split("/");
  if (a.length!==2) return false;
  var bits=parseInt(a[1],10);
  if (isNaN(bits)||bits<0||bits>32) return false;
  var mask=(bits===0)?0:((0xFFFFFFFF<<(32-bits))>>>0);
  return ((ip2l(ip)&mask)>>>0)===((ip2l(a[0])&mask)>>>0);
}
function inAnyJO(ip, arr){
  for (var i=0;i<arr.length;i++) if (inCIDR(ip, arr[i])) return true;
  return false;
}

function FindProxyForURL(url, host){
  host = lc(host);
  var ip = dnsResolve(host);

  // SAFE (no direct)
  if (inDomains(host, SAFE_DOMAINS)) return SAFE_CHAIN;

  // Voice
  if (inDomains(host, VOICE_CRITICAL)) {
    // if resolved IP exists and not in VOICE JO CIDRs => still allow VOICE_CHAIN (calm), no hard block
    return VOICE_CHAIN;
  }

  // Match servers (stable)
  if (inDomains(host, GAME_SERVERS_CRITICAL)) {
    // if resolved and clearly NOT JO path => still keep stable match chain (avoid disconnects)
    return MATCH_CHAIN;
  }

  // Matchmaking/Lobby (pressure + escalation)
  if (inDomains(host, MATCHMAKING_CRITICAL)) {
    if (!ip || !isIP4(ip)) return LOBBY_HARD;
    if (!inAnyJO(ip, JO_CIDRS_LOBBY)) return LOBBY_HARD;
    return LOBBY_SOFT;
  }

  // Core/Tencent/CDN => match chain
  if (inDomains(host, PUBG_CORE_HIGH) || inDomains(host, TENCENT_HIGH) || inDomains(host, CDN_MEDIUM)) {
    return MATCH_CHAIN;
  }

  // Everything else => SAFE (no direct)
  return SAFE_CHAIN;
}
