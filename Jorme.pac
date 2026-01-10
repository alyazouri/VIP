// =====================================================
// PUBG JORDAN MAXIMUM FOCUS v3.0 - ULTRA AGGRESSIVE
// هدف: زيادة ملفتة للاعبين الأردنيين في كل مكان
// استراتيجية: حظر كل شي غير أردني تقريباً
// =====================================================

// =======================
// بروكسيات أردنية فقط - JORDAN ONLY PROXIES
// =======================
var JORDAN_PRIMARY =
“PROXY 176.29.153.95:9030; “ +
“PROXY 82.212.125.1:9030; “ +
“PROXY 188.123.200.50:9030; “ +
“PROXY 212.35.66.45:9030; “ +
“PROXY 37.202.100.25:9030”;

var JORDAN_SECONDARY =
“PROXY 91.106.50.10:9030; “ +
“PROXY 46.185.150.20:9030; “ +
“PROXY 86.108.100.30:9030”;

var JORDAN_MATCH =
“PROXY 176.29.153.95:20001; “ +
“PROXY 82.212.125.1:20001”;

var JORDAN_VOICE =
“PROXY 82.212.84.33:20001; “ +
“PROXY 176.29.153.95:20001”;

var BAHRAIN_EMERGENCY = “PROXY 185.125.190.10:9030”; // طوارئ فقط
var BLOCK = “PROXY 127.0.0.1:9”;

// =======================
// SAFE & CDN DIRECT
// =======================
var SAFE_DIRECT = [
“captive.apple.com”, “time.apple.com”, “ocsp.apple.com”,
“clients3.google.com”, “gstatic.com”, “googleapis.com”,
“apple.com”, “icloud.com”, “mzstatic.com”
];

var CDN_DIRECT = [
“youtube.com”, “googlevideo.com”, “ytimg.com”,
“fbcdn.net”, “facebook.com”, “instagram.com”,
“cdninstagram.com”, “tiktokcdn.com”, “whatsapp.com”
];

// =======================
// JORDAN IPs - EXPANDED MAXIMUM
// =======================
var JORDAN_CORE = {
// Orange Jordan (أكبر مشغل)
“82.212.”: 1, “176.29.”: 1, “176.28.”: 1,

// Zain Jordan
“188.123.”: 1, “188.247.”: 1, “188.161.”: 1,

// Umniah
“37.202.”: 1, “37.48.”: 1, “37.49.”: 1, “37.50.”: 1, “37.75.”: 1,

// Damamax / Batelco Jordan
“212.35.”: 1, “91.106.”: 1,

// Fixed broadband
“46.32.”: 1, “46.185.”: 1, “86.108.”: 1,
“92.253.”: 1, “94.249.”: 1, “149.200.”: 1,

// Government / University
“193.188.”: 1, “195.135.”: 1, “195.228.”: 1, “195.229.”: 1,

// Business ranges
“78.135.”: 1, “78.138.”: 1, “79.134.”: 1, “79.173.”: 1,
“80.90.”: 1, “81.21.”: 1, “81.28.”: 1,
“85.159.”: 1, “62.72.”: 1, “62.150.”: 1, “62.251.”: 1,

// Additional Jordan
“109.107.”: 1, “109.237.”: 1, “213.6.”: 1, “213.42.”: 1,
“213.139.”: 1, “217.23.”: 1, “217.29.”: 1,
“5.45.”: 1, “5.198.”: 1, “5.199.”: 1
};

// =======================
// BAHRAIN ONLY (emergency fallback بعد 15 دقيقة)
// =======================
var BAHRAIN_ONLY = {
“185.125.”: 1, “46.183.”: 1, “37.131.”: 1
};

// =======================
// BLOCKED - كل شي غير أردني
// =======================
var BLOCKED_PREFIXES = [
// Afghanistan
“58.147.”, “59.153.”, “61.5.”, “91.109.”, “103.5.”, “103.13.”,

// Pakistan
“39.32.”, “39.33.”, “111.68.”, “116.71.”, “182.176.”, “202.141.”,

// India
“106.51.”, “117.239.”, “122.166.”, “152.57.”, “14.139.”, “14.140.”,

// Saudi Arabia (نبعد عنها مؤقتاً)
“212.71.”, “185.193.”, “185.194.”, “94.26.”, “95.177.”,

// UAE (نبعد عنها مؤقتاً)
“5.62.”, “31.192.”, “31.193.”, “86.96.”, “94.200.”,

// Kuwait, Qatar, Oman (نبعد عنهم مؤقتاً)
“62.84.”, “82.178.”, “91.140.”, “37.210.”, “89.211.”, “5.36.”,

// Asia Pacific
“8.222.”, “47.245.”, “43.132.”, “18.163.”, “13.228.”, “52.220.”,
“54.169.”, “175.41.”, “103.28.”, “203.104.”, “210.16.”,
“43.254.”, “43.251.”, “47.52.”, “47.74.”, “121.40.”,

// Singapore/HK
“13.250.”, “13.229.”, “18.140.”, “18.141.”, “52.74.”, “54.251.”,
“8.210.”, “47.91.”, “119.81.”, “156.230.”,

// Europe
“18.185.”, “3.120.”, “52.58.”, “35.156.”, “18.194.”, “3.64.”,
“52.30.”, “18.196.”, “52.59.”, “18.157.”, “3.121.”,

// Americas
“54.218.”, “52.88.”, “34.208.”, “18.237.”, “54.85.”,
“34.192.”, “52.90.”, “44.228.”, “52.36.”,

// Turkey (بعيد)
“88.255.”, “78.186.”, “85.111.”, “176.41.”, “176.42.”,

// Egypt (نبعده مؤقتاً)
“41.32.”, “41.33.”, “41.176.”, “41.177.”, “196.218.”
];

// =======================
// HELPER FUNCTIONS
// =======================
function isPUBG(host) {
host = host.toLowerCase();
return /(pubg|pubgm|intlgame|igamecj|proximabeta|tencent|krafton|lightspeed|gme|vmp|qq|qcloud)/.test(host);
}

function isLobbyOrRecruit(url, host) {
var s = (url + host).toLowerCase();
return /(lobby|matchmaking|matching|queue|recruit|team|squad|party|invite|gate|dispatcher|router|region|allocation|join|findplayer|nearby|friend|social|presence|roster|group)/.test(s);
}

function isWOWOrRooms(url, host) {
var s = (url + host).toLowerCase();
return /(worldofwonder|wow|ugc|creative|room|custom|map|template|featured|community|workshop|arena|tdm|deathmatch|training|warehouse|hangar|mode|evo|metro)/.test(s);
}

function isVoice(url, host) {
var s = (url + host).toLowerCase();
return /(voice|rtc|voip|audio|mic|talk|channel|speech|gvoice|agora|gmesdk)/.test(s);
}

function isMatch(url, host) {
var s = (url + host).toLowerCase();
return /(game|battle|fight|gs.|gss.|gameserver|logic|session|instance|zone|shard|node|realtime|action|frame|scene|cell)/.test(s);
}

function startsWithAny(ip, table) {
for (var k in table)
if (ip.indexOf(k) === 0) return true;
return false;
}

function normalizeHost(host) {
var i = host.indexOf(”:”);
return i !== -1 ? host.substring(0, i) : host;
}

function isIPv4(ip) {
return ip && ip.indexOf(”.”) !== -1 && ip.indexOf(”:”) === -1;
}

function isPrivate(ip) {
return (
isInNet(ip, “10.0.0.0”, “255.0.0.0”) ||
isInNet(ip, “172.16.0.0”, “255.240.0.0”) ||
isInNet(ip, “192.168.0.0”, “255.255.0.0”) ||
isInNet(ip, “127.0.0.0”, “255.0.0.0”) ||
isInNet(ip, “169.254.0.0”, “255.255.0.0”)
);
}

function getIP(host) {
var ip = dnsResolve(host);
return isIPv4(ip) ? ip : null;
}

// =======================
// GEO CHECKS - STRICT
// =======================
function isJordan(ip) {
if (!ip) return false;

// Prefix check
if (startsWithAny(ip, JORDAN_CORE)) return true;

// CIDR checks - ALL major Jordan ranges
if (isInNet(ip, “176.28.128.0”, “255.255.128.0”)) return true; // /17
if (isInNet(ip, “176.29.0.0”, “255.255.0.0”)) return true;     // /16
if (isInNet(ip, “82.212.64.0”, “255.255.192.0”)) return true;  // /18
if (isInNet(ip, “188.123.160.0”, “255.255.224.0”)) return true; // /19
if (isInNet(ip, “188.247.64.0”, “255.255.224.0”)) return true;  // /19
if (isInNet(ip, “37.202.64.0”, “255.255.224.0”)) return true;   // /19
if (isInNet(ip, “91.106.0.0”, “255.255.0.0”)) return true;      // /16
if (isInNet(ip, “46.185.128.0”, “255.255.128.0”)) return true;  // /17
if (isInNet(ip, “86.108.0.0”, “255.255.128.0”)) return true;    // /17
if (isInNet(ip, “92.253.0.0”, “255.255.128.0”)) return true;    // /17
if (isInNet(ip, “94.249.0.0”, “255.255.128.0”)) return true;    // /17
if (isInNet(ip, “149.200.128.0”, “255.255.128.0”)) return true; // /17
if (isInNet(ip, “212.35.64.0”, “255.255.224.0”)) return true;   // /19

return false;
}

function isBahrain(ip) {
if (!ip) return false;
if (startsWithAny(ip, BAHRAIN_ONLY)) return true;
if (isInNet(ip, “185.125.188.0”, “255.255.252.0”)) return true;
if (isInNet(ip, “46.183.216.0”, “255.255.252.0”)) return true;
return false;
}

function isHardBlocked(ip) {
for (var i = 0; i < BLOCKED_PREFIXES.length; i++)
if (ip.indexOf(BLOCKED_PREFIXES[i]) === 0) return true;

// Afghanistan CIDR blocks
if (isInNet(ip, “58.147.128.0”, “255.255.224.0”)) return true;
if (isInNet(ip, “103.5.172.0”, “255.255.252.0”)) return true;
if (isInNet(ip, “103.13.64.0”, “255.255.252.0”)) return true;

return false;
}

// =======================
// TIMING LOGIC - ULTRA STRICT
// =======================
var SESSION_START = Date.now();
var JO_ONLY_PHASE = 600000;      // 10 دقائق أردن صرف
var JO_PRIORITY_PHASE = 900000;  // 15 دقيقة أردن أولوية قصوى
var ALLOW_BAHRAIN_AFTER = 900000; // بعد 15 دقيقة نفتح البحرين بس

function getPhase() {
var elapsed = Date.now() - SESSION_START;
if (elapsed < JO_ONLY_PHASE) return “JO_ONLY”;
if (elapsed < JO_PRIORITY_PHASE) return “JO_PRIORITY”;
return “JO_OR_BAHRAIN”;
}

// =======================
// MAIN ROUTING - ULTRA AGGRESSIVE
// =======================
function FindProxyForURL(url, host) {
host = normalizeHost(host.toLowerCase());

// Safe direct
for (var i = 0; i < SAFE_DIRECT.length; i++)
if (dnsDomainIs(host, SAFE_DIRECT[i])) return “DIRECT”;

for (var j = 0; j < CDN_DIRECT.length; j++)
if (shExpMatch(host, “*” + CDN_DIRECT[j])) return “DIRECT”;

if (isPlainHostName(host)) return BLOCK;

// Non-PUBG = direct
if (!isPUBG(host)) return “DIRECT”;

// Resolve IP
var ip = getIP(host);
if (!ip || isPrivate(ip)) return BLOCK;

// HARD BLOCK non-Jordan/Bahrain
if (isHardBlocked(ip)) return BLOCK;

var JO = isJordan(ip);
var BH = isBahrain(ip);
var phase = getPhase();

// Block EVERYTHING except Jordan/Bahrain
if (!(JO || BH)) return BLOCK;

// ==========================================
// LOBBY & RECRUIT - أقصى تركيز أردني
// ==========================================
if (isLobbyOrRecruit(url, host)) {
if (phase === “JO_ONLY”) {
// أول 10 دقائق: أردن فقط
if (JO) return JORDAN_PRIMARY;
return BLOCK;
}

```
if (phase === "JO_PRIORITY") {
  // 10-15 دقيقة: أردن أولوية 100%
  if (JO) return JORDAN_PRIMARY;
  return BLOCK;
}

// بعد 15 دقيقة: أردن أولاً، البحرين طوارئ
if (JO) return JORDAN_PRIMARY;
if (BH) return BAHRAIN_EMERGENCY;
return BLOCK;
```

}

// ==========================================
// WOW / ROOMS / ARENA - أردن فقط
// ==========================================
if (isWOWOrRooms(url, host)) {
if (phase === “JO_ONLY” || phase === “JO_PRIORITY”) {
if (JO) return JORDAN_PRIMARY;
return BLOCK;
}

```
if (JO) return JORDAN_PRIMARY;
if (BH) return BAHRAIN_EMERGENCY;
return BLOCK;
```

}

// ==========================================
// VOICE - أردني بحت
// ==========================================
if (isVoice(url, host)) {
if (JO) return JORDAN_VOICE;
if (BH && phase === “JO_OR_BAHRAIN”) return JORDAN_VOICE;
return BLOCK;
}

// ==========================================
// MATCH - اللعب نفسه
// ==========================================
if (isMatch(url, host)) {
if (JO) return JORDAN_MATCH;
if (BH && phase === “JO_OR_BAHRAIN”) return JORDAN_MATCH;
return BLOCK;
}

// Default PUBG
if (JO) return JORDAN_MATCH;
if (BH && phase === “JO_OR_BAHRAIN”) return BAHRAIN_EMERGENCY;
return BLOCK;
}
