// =====================================================
// PUBG Mobile PAC – FINAL ULTIMATE
// Jordan Recruit FIX + Stable Match + No Ping Spike
// =====================================================

// =======================
// PROXIES
// =======================
var LOBBY_PROXY =
"PROXY 82.212.84.33:9030; PROXY 212.35.66.45:9030";

var MATCH_PROXY =
"PROXY 82.212.84.33:20001";

var VOICE_PROXY =
"PROXY 82.212.84.33:10012; DIRECT";

var BLOCK =
"PROXY 127.0.0.1:9";

// =======================
// SAFE / CDN DIRECT
// =======================
var SAFE_DIRECT = [
"captive.apple.com","time.apple.com","ocsp.apple.com",
"clients3.google.com","gstatic.com","googleapis.com"
];

var CDN_DIRECT = [
"youtube.com","googlevideo.com","ytimg.com",
"fbcdn.net","facebook.com","instagram.com",
"cdninstagram.com","tiktokcdn.com","tiktokv.com",
"akamaihd.net"
];

// =======================
// 🇯🇴 JORDAN MATCH (STRICT)
// =======================
var JO_CORE = {
"82.212.":1,"212.35.":1,"86.108.":1,
"46.185.":1,"92.253.":1,"94.249.":1
};

// =======================
// 🇯🇴 JORDAN LOBBY (WIDE)
// =======================
var JO_LOBBY = {
"82.212.":1,"212.35.":1,"86.108.":1,"46.185.":1,
"92.253.":1,"94.249.":1,
"176.29.":1,"91.106.":1,"188.247.":1,"149.200.":1,
"78.135.":1,"78.138.":1,"78.139.":1,
"37.202.":1,"37.238.":1,
"79.134.":1,"79.173.":1,
"81.21.":1,"81.28.":1,
"62.72.":1,"62.150.":1,"62.251.":1
};

// =======================
// 🌍 ANYCAST (RECRUIT POOL FIX)
// =======================
var JO_ANYCAST = {
"13.":1,"15.":1,"18.":1,"52.":1
};

// =======================
// 🌍 GULF (SECONDARY)
// =======================
var GULF = {
"185.125.":1,"46.183.":1,
"212.71.":1,"185.193.":1,"94.26.":1,"95.177.":1,
"5.62.":1,"31.192.":1,"86.96.":1,
"62.84.":1,"82.178.":1,"91.140.":1,
"37.210.":1,"89.211.":1,
"185.64.":1,"5.36.":1
};

// =======================
// 🚫 AFGHANISTAN BLOCK
// =======================
var AFG = {
"58.147.":1,"59.153.":1,"61.5.":1,"91.109.":1,
"103.5.":1,"103.13.":1,"103.17.":1,"103.18.":1,
"103.23.":1,"45.65.":1,"45.116.":1,"202.88.":1
};

// =======================
// HELPERS
// =======================
function sw(ip,t){for(var k in t)if(ip.indexOf(k)===0)return true;return false;}
function isIPv4(ip){return ip && ip.indexOf(".")!==-1;}
function normalize(h){var i=h.indexOf(":");return i!==-1?h.substring(0,i):h;}
function getIP(h){var i=dnsResolve(h);return isIPv4(i)?i:null;}
function isPrivate(ip){
return isInNet(ip,"10.0.0.0","255.0.0.0") ||
isInNet(ip,"172.16.0.0","255.240.0.0") ||
isInNet(ip,"192.168.0.0","255.255.0.0") ||
isInNet(ip,"127.0.0.0","255.0.0.0");
}

// =======================
// PUBG DETECTION
// =======================
function isPUBG(h){
return /(pubg|pubgm|tencent|krafton|lightspeed|intlgame|qcloud|gcloud)/i.test(h);
}

// =======================
// TRAFFIC TYPES
// =======================
function isLobby(s){return /(lobby|matchmaking|recruit|team|party|invite)/i.test(s);}
function isArena(s){return /(arena|tdm|training)/i.test(s);}
function isWOW(s){return /(wow|ugc|custom|room|map)/i.test(s);}
function isMatch(s){return /(game|battle|session|realtime|zone|gs)/i.test(s);}
function isVoice(s){return /(voice|rtc|webrtc|voip)/i.test(s);}

// =======================
// MATCH LOCK (ANTI PING SPIKE)
// =======================
var MATCH_LOCK=null;
function lockMatch(p){
if(!MATCH_LOCK) MATCH_LOCK=p;
return MATCH_LOCK;
}

// =======================
// MAIN ENGINE
// =======================
function FindProxyForURL(url, host) {

host = normalize(host.toLowerCase());

// SAFE
for(var i=0;i<SAFE_DIRECT.length;i++)
if(dnsDomainIs(host,SAFE_DIRECT[i])) return "DIRECT";

for(var j=0;j<CDN_DIRECT.length;j++)
if(shExpMatch(host,"*"+CDN_DIRECT[j])) return "DIRECT";

if(!isPUBG(host)) return "DIRECT";

var ip = getIP(host);
if(!ip || isPrivate(ip)) return BLOCK;

// BLOCK AFG
if(sw(ip,AFG)) return BLOCK;

// GEO FLAGS
var JO_MATCH = sw(ip,JO_CORE);
var JO_LBY   = sw(ip,JO_LOBBY);
var GF       = sw(ip,GULF);
var ANY      = sw(ip,JO_ANYCAST);

// =======================
// LOBBY / RECRUIT (JO + ANYCAST)
// =======================
if(isLobby(url+host))
return (JO_LBY || GF || ANY) ? LOBBY_PROXY : BLOCK;

// =======================
// ARENA / WOW (JO STRICT)
// =======================
if(isArena(url+host) || isWOW(url+host))
return JO_MATCH ? LOBBY_PROXY : BLOCK;

// =======================
// VOICE
// =======================
if(isVoice(url+host))
return VOICE_PROXY;

// =======================
// MATCH (JO ONLY + LOCK)
// =======================
if(isMatch(url+host))
return JO_MATCH ? lockMatch(MATCH_PROXY) : BLOCK;

// DEFAULT
return MATCH_PROXY;
}
