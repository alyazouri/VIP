// ============================================================================
// 🇯🇴 PUBG JO — SMART SOFTBLOCK (NO DIRECT for PUBG) — iOS FIXED
// Generated: 2025-12-30 18:23:52.872398
// CIDRs: ONLY /20 /19 /18
// - iOS connectivity + GitHub + YouTube => DIRECT
// - PUBG: NO DIRECT (MM escalates + Match stable + Voice calm)
// ============================================================================

var DIRECT_ALLOW = [
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

var SOFTBLOCK = "PROXY 0.0.0.0:0";

var LOBBY_SOFT = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.28.201.117:443";
var LOBBY_HARD = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.28.201.117:443; PROXY 0.0.0.0:0";
var MATCH_CHAIN = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443";
var VOICE_CHAIN = "PROXY 176.29.199.163:443; PROXY 176.29.199.163:443; PROXY 176.29.199.163:443";

var MATCH_PROXY = "PROXY 176.29.199.163:443";
var VOICE_PROXY = "PROXY 176.29.199.163:443";

var JO_CIDRS = [
  "176.28.192.0/20",
  "176.29.192.0/20",
  "176.28.192.0/19",
  "176.29.192.0/19",
  "176.28.192.0/18",
  "176.29.192.0/18"
];

var MATCHMAKING_CRITICAL = ['igamecj.com', 'gcloudsdk.com', 'proximabeta.com', 'match.pubgmobile.com', 'matchmaking.pubgmobile.com', 'mm.pubgmobile.com', 'lobby.pubgmobile.com', 'queue.pubgmobile.com', 'room.pubgmobile.com'];
var GAME_SERVERS_CRITICAL = ['game.pubgmobile.com', 'gs.pubgmobile.com', 'server.pubgmobile.com', 'battle.pubgmobile.com', 'play.pubgmobile.com', 'combat.pubgmobile.com', 'pvp.pubgmobile.com'];
var VOICE_CRITICAL = ['voice.pubgmobile.com', 'rtc.igamecj.com', 'gvoice.qq.com', 'voip.pubgmobile.com', 'audio.pubgmobile.com', 'rtc.pubgmobile.com'];
var PUBG_CORE_HIGH = ['pubgmobile.com', 'pubgm.com', 'proximabeta.com', 'pubgmobile.proximabeta.com'];
var TENCENT_HIGH = ['tencent.com', 'qq.com', 'qcloud.com', 'tencentgcloud.com', 'myqcloud.com'];
var CDN_MEDIUM = ['cdnpubg.com', 'pubgcdn.com', 'cdn.pubgmobile.com', 'static.pubgmobile.com', 'img.pubgmobile.com', 'image.pubgmobile.com', 'res.pubgmobile.com'];

function lc(s) { return (s||"").toLowerCase(); }
function endsWithDomain(host, domain) {
  host = lc(host); domain = lc(domain);
  return host === domain || (host.length > domain.length && host.slice(-1-domain.length) === ("."+domain));
}
function inDomains(host, arr) {
  for (var i=0;i<arr.length;i++) if (endsWithDomain(host, arr[i])) return true;
  return false;
}
function isIP4(s) {
  var p=s.split(".");
  if(p.length!==4) return false;
  for(var i=0;i<4;i++){var n=parseInt(p[i],10); if(isNaN(n)||n<0||n>255) return false;}
  return true;
}
function ip2l(ip) {
  var p=ip.split(".");
  return ((+p[0]<<24)>>>0)+((+p[1]<<16)>>>0)+((+p[2]<<8)>>>0)+((+p[3])>>>0);
}
function inCIDR(ip,cidr) {
  var a=cidr.split("/");
  if(a.length!==2) return false;
  var bits=parseInt(a[1],10);
  if(isNaN(bits)||bits<0||bits>32) return false;
  var mask=(bits===0)?0:((0xFFFFFFFF<<(32-bits))>>>0);
  return ((ip2l(ip)&mask)>>>0)===((ip2l(a[0])&mask)>>>0);
}
function inJO(ip) {
  for(var i=0;i<JO_CIDRS.length;i++) if(inCIDR(ip,JO_CIDRS[i])) return true;
  return false;
}
function isClearFail(ip) {
  if(!ip) return true;
  if(!isIP4(ip)) return true;
  return !inJO(ip);
}

function FindProxyForURL(url, host) {
  host = lc(host);
  var ip = dnsResolve(host);

  if (inDomains(host, DIRECT_ALLOW)) return "DIRECT";

  if (inDomains(host, VOICE_CRITICAL)) return VOICE_CHAIN;
  if (inDomains(host, GAME_SERVERS_CRITICAL)) return MATCH_CHAIN;

  if (inDomains(host, MATCHMAKING_CRITICAL)) {
    if (isClearFail(ip)) return LOBBY_HARD;
    return LOBBY_SOFT;
  }

  if (inDomains(host, PUBG_CORE_HIGH) || inDomains(host, TENCENT_HIGH) || inDomains(host, CDN_MEDIUM)) return MATCH_CHAIN;

  if (isClearFail(ip)) return LOBBY_SOFT;

  return MATCH_CHAIN;
}
