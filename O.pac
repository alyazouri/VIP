// ========================================
// PUBG Mobile Proxy - Auto-Updated from RIPE NCC
// Updated: 2025-01-21
// Source: RIPE NCC Database + ASN Data
// ========================================

var LOBBY_PROXY = “PROXY 176.29.153.95:9030; PROXY 212.35.66.45:9030”;
var MATCH_PROXY = “PROXY 176.29.153.95:20001”;
var VOICE_PROXY = “PROXY 82.212.84.33:20001; PROXY 82.212.84.33:10012”;
var BLOCK = “PROXY 127.0.0.1:9”;

// ========================================
// JORDAN PREFIXES (من RIPE NCC + ASN)
// AS48832 (Zain), AS8376 (Orange), AS47887 (Umniah)
// ========================================
var JO_PREFIXES = {
// Core Jordan ranges (RIPE verified)
“82.212.”: 1, “188.123.”: 1, “37.202.”: 1, “212.35.”: 1,
“176.29.”: 1, “91.106.”: 1, “46.32.”: 1, “46.185.”: 1,
“86.108.”: 1, “92.253.”: 1, “94.249.”: 1, “188.247.”: 1,
“149.200.”: 1, “176.28.”: 1,

// Zain Jordan (AS48832)
“185.117.”: 1, “185.183.”: 1, “5.104.”: 1, “185.23.”: 1,

// Orange Jordan (AS8376)
“78.135.”: 1, “78.138.”: 1, “37.48.”: 1, “37.49.”: 1,
“37.50.”: 1, “37.51.”: 1, “37.75.”: 1,

// Umniah (AS47887)
“77.44.”: 1, “185.107.”: 1,

// Additional Jordan ranges
“79.134.”: 1, “79.173.”: 1, “81.21.”: 1, “81.28.”: 1,
“80.90.”: 1, “62.72.”: 1, “62.150.”: 1, “62.251.”: 1,
“85.159.”: 1, “109.107.”: 1, “109.237.”: 1, “188.161.”: 1,
“193.188.”: 1, “193.227.”: 1, “195.135.”: 1, “195.170.”: 1,
“195.228.”: 1, “195.229.”: 1, “213.6.”: 1, “213.42.”: 1,
“213.139.”: 1, “213.186.”: 1, “217.23.”: 1, “217.29.”: 1,
“217.144.”: 1, “217.171.”: 1, “5.45.”: 1, “5.198.”: 1,
“5.199.”: 1
};

// ========================================
// GULF PREFIXES (من RIPE NCC)
// Saudi Arabia, UAE, Kuwait, Bahrain, Qatar, Oman
// ========================================
var GULF_PREFIXES = {
// Bahrain (أقرب دولة خليجية)
“185.125.”: 1, “46.183.”: 1, “37.131.”: 1, “80.241.”: 1,
“84.235.”: 1, “62.215.”: 1, “195.36.”: 1,

// Saudi Arabia
“212.71.”: 1, “185.193.”: 1, “185.194.”: 1, “185.195.”: 1,
“185.196.”: 1, “94.26.”: 1, “95.177.”: 1, “46.152.”: 1,
“37.224.”: 1, “188.245.”: 1, “37.104.”: 1, “151.236.”: 1,
“213.130.”: 1, “213.150.”: 1,

// UAE
“5.62.”: 1, “31.192.”: 1, “31.193.”: 1, “86.96.”: 1,
“94.200.”: 1, “94.201.”: 1, “94.202.”: 1, “217.164.”: 1,
“213.42.”: 1, “195.229.”: 1, “85.154.”: 1,

// Kuwait
“62.84.”: 1, “82.178.”: 1, “91.140.”: 1, “94.128.”: 1,
“151.232.”: 1,

// Qatar
“37.210.”: 1, “89.211.”: 1, “185.56.”: 1,

// Oman
“185.64.”: 1, “5.36.”: 1, “37.205.”: 1
};

// ========================================
// AFGHANISTAN PREFIXES (للحظر - من RIPE)
// ========================================
var AF_PREFIXES = {
“58.147.”: 1, “59.153.”: 1, “61.5.”: 1, “91.109.”: 1,
“103.5.”: 1, “103.13.”: 1, “103.17.”: 1, “103.18.”: 1,
“103.23.”: 1, “103.28.”: 1, “45.65.”: 1, “45.116.”: 1,
“175.107.”: 1, “202.79.”: 1
};

// ========================================
// FAR-REGION BLOCKS (آسيا، أوروبا، أمريكا)
// ========================================
var BLOCKED_PREFIXES = [
// Asia Pacific
“8.222.”, “47.245.”, “43.132.”, “18.163.”, “13.228.”, “13.229.”,
“13.250.”, “52.220.”, “54.169.”, “54.251.”, “175.41.”, “119.81.”,
“103.28.”, “103.29.”, “203.104.”, “210.16.”, “52.74.”, “52.77.”,
“8.210.”, “47.74.”, “47.88.”, “120.76.”, “121.40.”, “139.224.”,

// Europe
“18.185.”, “3.120.”, “52.58.”, “35.156.”, “52.28.”, “52.29.”,
“18.194.”, “3.64.”, “3.65.”, “3.66.”, “52.30.”, “18.196.”,
“52.59.”, “18.157.”, “3.121.”, “3.122.”, “3.123.”,

// Americas
“54.218.”, “52.88.”, “34.208.”, “18.237.”, “52.36.”, “54.244.”,
“35.162.”, “44.228.”, “34.220.”, “54.200.”, “52.24.”, “18.232.”,
“54.85.”, “34.192.”, “52.90.”, “34.224.”
];

// ========================================
// SAFE DIRECT (System & CDN)
// ========================================
var SAFE_DIRECT = [
“captive.apple.com”, “time.apple.com”, “ocsp.apple.com”,
“clients3.google.com”, “gstatic.com”, “googleapis.com”
];

var CDN_DIRECT = [
“youtube.com”, “googlevideo.com”, “ytimg.com”,
“fbcdn.net”, “facebook.com”, “instagram.com”,
“cdninstagram.com”, “tiktokcdn.com”, “tiktokv.com”,
“akamaihd.net”, “cloudfront.net”
];

// ========================================
// HELPER FUNCTIONS
// ========================================
function startsWithAny(ip, table) {
for (var k in table) {
if (ip.indexOf(k) === 0) return true;
}
return false;
}

function isJordanIP(ip) {
if (!ip) return false;

if (startsWithAny(ip, JO_PREFIXES)) return true;

// CIDR verification (major ranges)
if (isInNet(ip, “176.28.128.0”, “255.255.128.0”)) return true; // /17
if (isInNet(ip, “176.29.0.0”, “255.255.0.0”)) return true;     // /16
if (isInNet(ip, “46.185.128.0”, “255.255.128.0”)) return true; // /17
if (isInNet(ip, “86.108.0.0”, “255.255.128.0”)) return true;   // /17
if (isInNet(ip, “92.253.0.0”, “255.255.128.0”)) return true;   // /17
if (isInNet(ip, “94.249.0.0”, “255.255.128.0”)) return true;   // /17
if (isInNet(ip, “212.35.64.0”, “255.255.224.0”)) return true;  // /19
if (isInNet(ip, “188.247.64.0”, “255.255.224.0”)) return true; // /19
if (isInNet(ip, “91.106.0.0”, “255.255.0.0”)) return true;     // /16
if (isInNet(ip, “82.212.64.0”, “255.255.192.0”)) return true;  // /18
if (isInNet(ip, “149.200.128.0”, “255.255.128.0”)) return true;// /17

return false;
}

function isGulfIP(ip) {
if (!ip) return false;

if (startsWithAny(ip, GULF_PREFIXES)) return true;

// CIDR verification (major Gulf ranges)
// Bahrain
if (isInNet(ip, “185.125.188.0”, “255.255.252.0”)) return true;

// Saudi Arabia
if (isInNet(ip, “212.71.0.0”, “255.255.0.0”)) return true;
if (isInNet(ip, “185.193.64.0”, “255.255.192.0”)) return true;
if (isInNet(ip, “94.26.0.0”, “255.255.0.0”)) return true;

// UAE
if (isInNet(ip, “31.192.0.0”, “255.254.0.0”)) return true;
if (isInNet(ip, “86.96.0.0”, “255.255.0.0”)) return true;

// Kuwait
if (isInNet(ip, “62.84.0.0”, “255.255.0.0”)) return true;
if (isInNet(ip, “82.178.0.0”, “255.255.0.0”)) return true;

// Qatar
if (isInNet(ip, “37.210.0.0”, “255.255.0.0”)) return true;

// Oman
if (isInNet(ip, “185.64.0.0”, “255.255.0.0”)) return true;

return false;
}

function isAfghanistanIP(ip) {
if (!ip) return false;

if (startsWithAny(ip, AF_PREFIXES)) return true;

// CIDR confirmation
if (isInNet(ip, “58.147.128.0”, “255.255.224.0”)) return true;
if (isInNet(ip, “59.153.124.0”, “255.255.252.0”)) return true;
if (isInNet(ip, “61.5.192.0”, “255.255.240.0”)) return true;
if (isInNet(ip, “91.109.216.0”, “255.255.248.0”)) return true;

return false;
}

function isPUBG(host) {
host = host.toLowerCase();
return /(pubg|pubgm|pubgmobile|intlgame|igamecj|proximabeta|tencent|qq|qcloud|gcloudsdk|krafton|lightspeed|amsoveasea|vmpone|vmp|gme|gamecenter|wow|worldofwonder|ugc|creative|creation|creations)/.test(host);
}

function isLobbyTraffic(url, host) {
var s = (url + host).toLowerCase();
return /(lobby|matchmaking|matching|queue|room|recruit|team|squad|party|invite|gate|dispatcher|router|region|allocation)/.test(s);
}

function isWOWTraffic(url, host) {
var s = (url + host).toLowerCase();
return /(worldofwonder|wow|ugc|creative|creation|creations|room|rooms|customroom|custom-room|map|maps|template|templates|featured|trending|popular|recommend|daily|weekly|community|workshop|editor|publish)/.test(s);
}

function isArenaTraffic(url, host) {
var s = (url + host).toLowerCase();
return /(arena|tdm|deathmatch|teamdeathmatch|team[*-]?deathmatch|gun|gungame|gun[*-]?game|training|arenatraining|arena[_-]?training|ultimate|ultimatearena|warehouse|hangar)/.test(s);
}

function isMatchTraffic(url, host) {
var s = (url + host).toLowerCase();
return /(game|battle|fight|combat|play|gs.|gss|gameserver|logic|session|instance|zone|shard|node|cell|scene|realtime|action|frame)/.test(s);
}

function isVoiceTraffic(url, host) {
var s = (url + host).toLowerCase();
return /(voice|rtc|webrtc|voip|audio|mic|talk|channel|stream|speech|sound)/.test(s);
}

function normalizeHost(host) {
var i = host.indexOf(”:”);
if (i !== -1) return host.substring(0, i);
return host;
}

function isIPv4(ip) {
return ip && ip.indexOf(”.”) !== -1;
}

function getRealIPv4(host) {
var ip = dnsResolve(host);
if (isIPv4(ip)) return ip;
return null;
}

function isPrivateOrLocalIP(ip) {
if (!isIPv4(ip)) return false;
return (
isInNet(ip, “10.0.0.0”, “255.0.0.0”) ||
isInNet(ip, “172.16.0.0”, “255.240.0.0”) ||
isInNet(ip, “192.168.0.0”, “255.255.0.0”) ||
isInNet(ip, “127.0.0.0”, “255.0.0.0”) ||
isInNet(ip, “169.254.0.0”, “255.255.0.0”)
);
}

// ========================================
// TIMING PRESSURE (Jordan priority)
// ========================================
var RECRUIT_JO_ONLY_MS = 90000;
var RECRUIT_START_TS = Date.now();
function recruitJOOnly() {
return (Date.now() - RECRUIT_START_TS) < RECRUIT_JO_ONLY_MS;
}

var ARENA_JO_ONLY_MS = 45000;
var ARENA_GULF_ONLY_MS = 180000;
var ARENA_START_TS = Date.now();
function arenaPhase() {
var dt = Date.now() - ARENA_START_TS;
if (dt < ARENA_JO_ONLY_MS) return “JO_ONLY”;
if (dt < ARENA_GULF_ONLY_MS) return “JO_OR_GULF”;
return “AFTER”;
}

var WOW_JO_ONLY_MS = 60000;
var WOW_START_TS = Date.now();
function wowJOOnly() {
return (Date.now() - WOW_START_TS) < WOW_JO_ONLY_MS;
}

// ========================================
// MAIN ROUTING FUNCTION
// ========================================
function FindProxyForURL(url, host) {
host = normalizeHost(host.toLowerCase());

// SAFE DIRECT
for (var i = 0; i < SAFE_DIRECT.length; i++) {
if (dnsDomainIs(host, SAFE_DIRECT[i])) return “DIRECT”;
}

// CDN DIRECT
for (var j = 0; j < CDN_DIRECT.length; j++) {
if (shExpMatch(host, “*” + CDN_DIRECT[j])) return “DIRECT”;
}

if (isPlainHostName(host)) return BLOCK;

// Non-PUBG traffic
if (!isPUBG(host)) return “DIRECT”;

// Resolve IPv4
var ip = getRealIPv4(host);
if (!ip) return BLOCK;
if (isPrivateOrLocalIP(ip)) return BLOCK;

// Hard block Afghanistan
if (isAfghanistanIP(ip)) return BLOCK;

// Quick block far regions
for (var b = 0; b < BLOCKED_PREFIXES.length; b++) {
if (ip.indexOf(BLOCKED_PREFIXES[b]) === 0) return BLOCK;
}

// GEO gate: Jordan or Gulf only
var JO = isJordanIP(ip);
var GF = isGulfIP(ip);

if (!(JO || GF)) return BLOCK;

// ========================================
// WOW / UGC / ROOMS
// ========================================
if (isWOWTraffic(url, host)) {
if (wowJOOnly()) {
if (JO) return LOBBY_PROXY;
return BLOCK;
}
if (JO || GF) return LOBBY_PROXY;
return BLOCK;
}

// ========================================
// ARENA (TDM/Gun/Training)
// ========================================
if (isArenaTraffic(url, host)) {
var phase = arenaPhase();

```
if (phase === "JO_ONLY") {
  if (JO) return LOBBY_PROXY;
  return BLOCK;
}

if (phase === "JO_OR_GULF") {
  if (JO || GF) return LOBBY_PROXY;
  return BLOCK;
}

if (JO || GF) return LOBBY_PROXY;
return BLOCK;
```

}

// ========================================
// RECRUIT / LOBBY
// ========================================
if (isLobbyTraffic(url, host)) {
if (recruitJOOnly()) {
if (JO) return LOBBY_PROXY;
return BLOCK;
}
if (JO || GF) return LOBBY_PROXY;
return BLOCK;
}

// ========================================
// VOICE
// ========================================
if (isVoiceTraffic(url, host)) {
return VOICE_PROXY;
}

// ========================================
// MATCH (Classic/Ranked)
// ========================================
if (isMatchTraffic(url, host)) {
return MATCH_PROXY;
}

// Default PUBG
return MATCH_PROXY;
}
