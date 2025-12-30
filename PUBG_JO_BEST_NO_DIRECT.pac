// 🇯🇴 PUBG JO BEST – NO DIRECT (Lobby/Match ALL JO + Soft Voice)
// Generated: 2025-12-30 17:43:40.865480
// NO DIRECT ANYWHERE

var LOBBY_PROXY  = "PROXY 176.29.199.163:20001; PROXY 176.29.199.163:20001; PROXY 176.29.199.163:20001";
var MATCH_PROXY  = "PROXY 176.29.199.163:20001";
var VOICE_PROXY  = "PROXY 176.29.199.163:20001; PROXY 176.29.199.163:20001";

// ===== JO CIDRs (base + derived from working proxies) =====
var JO_ALL = [
  "176.28.201.0/24",
  "176.29.199.0/24",
  "176.28.200.0/22",
  "176.29.196.0/22",
  "176.28.192.0/20",
  "176.29.192.0/20",
  "176.28.192.0/19",
  "176.29.192.0/19",
  "176.28.192.0/18",
  "176.29.192.0/18",
  "176.28.128.0/17",
  "176.29.128.0/17",
  "176.28.0.0/16",
  "176.29.0.0/16",
  "46.185.0.0/16",
  "46.185.128.0/17",
  "212.35.0.0/16",
  "212.118.0.0/16",
  "188.247.0.0/16",
  "5.0.0.0/16"
];

// ===== DOMAIN GROUPS =====
var MATCHMAKING_CRITICAL = ['igamecj.com', 'gcloudsdk.com', 'proximabeta.com', 'match.pubgmobile.com', 'matchmaking.pubgmobile.com', 'mm.pubgmobile.com', 'lobby.pubgmobile.com', 'queue.pubgmobile.com', 'room.pubgmobile.com'];
var GAME_SERVERS_CRITICAL = ['game.pubgmobile.com', 'gs.pubgmobile.com', 'server.pubgmobile.com', 'battle.pubgmobile.com', 'play.pubgmobile.com', 'combat.pubgmobile.com', 'pvp.pubgmobile.com'];
var VOICE_CRITICAL = ['voice.pubgmobile.com', 'rtc.igamecj.com', 'gvoice.qq.com', 'voip.pubgmobile.com', 'audio.pubgmobile.com', 'rtc.pubgmobile.com'];
var PUBG_CORE_HIGH = ['pubgmobile.com', 'pubgm.com', 'proximabeta.com', 'pubgmobile.proximabeta.com'];
var TENCENT_HIGH = ['tencent.com', 'qq.com', 'qcloud.com', 'tencentgcloud.com', 'myqcloud.com'];
var CDN_MEDIUM = ['cdnpubg.com', 'pubgcdn.com', 'cdn.pubgmobile.com', 'static.pubgmobile.com', 'img.pubgmobile.com', 'image.pubgmobile.com', 'res.pubgmobile.com'];

function lc(s){return (s||"").toLowerCase();}
function endsWith(h,d){h=lc(h);d=lc(d);return h===d|| (h.length>d.length && h.slice(-1-d.length)==="."+d);}
function inDomains(h,arr){for(var i=0;i<arr.length;i++) if(endsWith(h,arr[i])) return true; return false;}
function isIP(h){var p=h.split("."); if(p.length!=4) return false; for(var i=0;i<4;i++){var n=parseInt(p[i],10); if(isNaN(n)||n<0||n>255) return false;} return true;}
function ip2l(ip){var p=ip.split("."); return ((+p[0]<<24)>>>0)+((+p[1]<<16)>>>0)+((+p[2]<<8)>>>0)+(+p[3]>>>0);}
function inCIDR(ip,c){var a=c.split("/"); var bits=parseInt(a[1],10); var m=(bits===0)?0:((0xffffffff<<(32-bits))>>>0); return ((ip2l(ip)&m)>>>0)===((ip2l(a[0])&m)>>>0);}
function inJO(ip){for(var i=0;i<JO_ALL.length;i++) if(inCIDR(ip,JO_ALL[i])) return true; return false;}

function FindProxyForURL(url, host) {
  host = lc(host);
  var ip = dnsResolve(host);

  // Lobby / Matchmaking -> pressure
  if(inDomains(host, MATCHMAKING_CRITICAL)) {
    // إذا resolve طلع IP مش ضمن JO -> ضغط (Retry) لرفع احتمال مسار قريب/JO
    if(ip && isIP(ip) && !inJO(ip)) return LOBBY_PROXY;
    return LOBBY_PROXY;
  }

  // Voice -> soft
  if(inDomains(host, VOICE_CRITICAL)) return VOICE_PROXY;

  // Match servers -> stable
  if(inDomains(host, GAME_SERVERS_CRITICAL)) return MATCH_PROXY;

  // Core/CDN/Tencent -> stable
  if(inDomains(host, PUBG_CORE_HIGH) || inDomains(host, TENCENT_HIGH) || inDomains(host, CDN_MEDIUM)) return MATCH_PROXY;

  // أي IP مش JO -> pressure
  if(ip && isIP(ip) && !inJO(ip)) return LOBBY_PROXY;

  // كل شيء يبقى داخل المسار (NO DIRECT)
  return MATCH_PROXY;
}
