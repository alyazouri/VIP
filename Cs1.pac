// ===============================================
// ULTIMATE PUBG SCRIPT V7.0 (HARDCORE STRICT)
// Zero DNS Leak + Fixed Match /24 + Whitelist Only
// ===============================================

var MATCH_JO = "PROXY 37.44.38.20:443";
var LOBBY_PROXIES = ["PROXY 46.185.131.218:443"];
var BLOCK = "PROXY 0.0.0.0";
var DIRECT = "DIRECT";

// ================= WHITE LIST =================
var ALLOWED_REGIONS = [
// Orange
["82.212.64.0","255.255.192.0"],
["86.108.0.0","255.255.0.0"],
["94.249.0.0","255.255.0.0"],
["92.253.0.0","255.255.0.0"],
["212.34.0.0","255.255.224.0"],
["213.139.32.0","255.255.224.0"],
["194.165.128.0","255.255.128.0"],
// Zain
["176.29.0.0","255.255.0.0"],
["188.123.160.0","255.255.224.0"],
// Umniah
["5.45.128.0","255.255.240.0"],
["178.238.176.0","255.255.240.0"],
["109.107.224.0","255.255.224.0"],
["46.248.192.0","255.255.224.0"],
["92.241.32.0","255.255.224.0"],
// DAMAMAX
["176.28.128.0","255.255.192.0"],
["77.245.0.0","255.255.240.0"],
// VTEL
["81.21.0.0","255.255.240.0"]
];

// ================= ASIA HARD BLOCK =================
var ASIA_BLACKLIST = [
["1.0.0.0","255.0.0.0"],["14.0.0.0","255.0.0.0"],["27.0.0.0","255.0.0.0"],
["36.0.0.0","255.0.0.0"],["39.0.0.0","255.0.0.0"],["42.0.0.0","255.0.0.0"],
["49.0.0.0","255.0.0.0"],["58.0.0.0","255.0.0.0"],["59.0.0.0","255.0.0.0"],
["60.0.0.0","255.0.0.0"],["61.0.0.0","255.0.0.0"],["101.0.0.0","255.0.0.0"],
["106.0.0.0","255.0.0.0"],["110.0.0.0","255.0.0.0"],["111.0.0.0","255.0.0.0"],
["112.0.0.0","255.0.0.0"],["113.0.0.0","255.0.0.0"],["114.0.0.0","255.0.0.0"],
["115.0.0.0","255.0.0.0"],["116.0.0.0","255.0.0.0"],["117.0.0.0","255.0.0.0"],
["118.0.0.0","255.0.0.0"],["119.0.0.0","255.0.0.0"],["120.0.0.0","255.0.0.0"],
["121.0.0.0","255.0.0.0"],["122.0.0.0","255.0.0.0"],["123.0.0.0","255.0.0.0"],
["124.0.0.0","255.0.0.0"],["125.0.0.0","255.0.0.0"],["126.0.0.0","255.0.0.0"],
["133.0.0.0","255.0.0.0"],["202.0.0.0","255.0.0.0"],["203.0.0.0","255.0.0.0"],
["210.0.0.0","255.0.0.0"],["211.0.0.0","255.0.0.0"],["218.0.0.0","255.0.0.0"],
["219.0.0.0","255.0.0.0"],["220.0.0.0","255.0.0.0"],["221.0.0.0","255.0.0.0"],
["222.0.0.0","255.0.0.0"],["223.0.0.0","255.0.0.0"]
];

// ================= STRICT ROOT DOMAINS =================
var ROOT_ALLOWED = [
".pubgmobile.com",
".pubg.com",
".krafton.com",
".levelinfinite.com",
".proximabeta.com",
".lightspeed-studios.com",
".unity3d.com",
".cloud.unity3d.com",
".akamaized.net",
".akamai.net",
".akamaicdn.com"
];

// ================= SESSION =================
var _Session = {
ipCache:{},
matchNet:null
};

// ================= HELPERS =================
function hostAllowed(host){
for(var i=0;i<ROOT_ALLOWED.length;i++)
if(host.endsWith(ROOT_ALLOWED[i])) return true;
return false;
}

function isAllowed(ip){
for(var i=0;i<ALLOWED_REGIONS.length;i++)
if(isInNet(ip,ALLOWED_REGIONS[i][0],ALLOWED_REGIONS[i][1])) return true;
return false;
}

function isBlocked(ip){
for(var i=0;i<ASIA_BLACKLIST.length;i++)
if(isInNet(ip,ASIA_BLACKLIST[i][0],ASIA_BLACKLIST[i][1])) return true;
return false;
}

function getIp(host){
if(_Session.ipCache[host]) return _Session.ipCache[host];
var ip=dnsResolve(host);
if(ip) _Session.ipCache[host]=ip;
return ip;
}

// ================= MAIN =================
function FindProxyForURL(url,host){

host=host.toLowerCase();
if(host.indexOf(":")!==-1) host=host.split(":")[0];

// 🔒 منع أي دومين خارج PUBG roots
if(!hostAllowed(host)) return DIRECT;

var ip=getIp(host);
if(!ip) return BLOCK;

// 🔒 منع آسيا
if(isBlocked(ip)) return BLOCK;

// 🔒 Whitelist Only
if(!isAllowed(ip)) return BLOCK;

// 🔒 تثبيت /24 للماتش
var isMatch = host.indexOf("game")!=-1 ||
host.indexOf("battle")!=-1 ||
host.indexOf("match")!=-1 ||
host.indexOf("realtime")!=-1;

if(isMatch){
var net24=ip.split('.').slice(0,3).join('.');
if(!_Session.matchNet) _Session.matchNet=net24;
if(_Session.matchNet!==net24) return BLOCK;
return MATCH_JO;
}

// Lobby/Auth
if(host.indexOf("lobby")!=-1 ||
host.indexOf("auth")!=-1 ||
host.indexOf("login")!=-1)
return LOBBY_PROXIES[0];

// CDN & Unity
if(host.indexOf("cdn")!=-1 ||
host.indexOf("asset")!=-1 ||
host.indexOf("patch")!=-1 ||
host.indexOf("unity")!=-1)
return DIRECT;

return LOBBY_PROXIES[0];
}
