// =====================================================
// PUBG JORDAN ULTIMATE - ENHANCED ISP DETECTION
// Expanded Jordan IP ranges for maximum coverage
// =====================================================

// =======================
// JORDAN ZONES & PROXIES
// =======================
var JORDAN_ZONES = {
AMMAN: {
proxies: [“82.212.84.33:8080”, “212.35.66.45:8080”],
backup: [“82.212.84.33:3128”, “212.35.66.45:3128”]
},
IRBID: {
proxies: [“91.106.109.12:8080”],
backup: [“91.106.109.12:3128”]
},
AQABA: {
proxies: [“46.32.102.152:8080”],
backup: [“46.32.102.152:3128”]
},
ZARQA: {
proxies: [“185.107.56.23:8080”],
backup: [“185.107.56.23:3128”]
}
};

// =======================
// EXPANDED JORDAN ISP RANGES
// =======================
var JORDAN_ISP_RANGES = {
// Zain Jordan (Massive expansion)
ZAIN: [
“82.212.”, “46.32.”, “78.135.”, “78.138.”,
“185.84.”, “185.85.”, “185.86.”, “185.87.”,
“37.48.”, “37.49.”, “37.50.”, “37.51.”,
“195.229.”, “195.135.”, “213.178.”, “213.244.”,
“178.135.”, “178.165.”, “193.188.”, “193.227.”,
“176.9.”, “176.10.”
],

// Orange Jordan (Massive expansion)
ORANGE: [
“212.35.”, “188.161.”, “188.247.”, “37.75.”,
“37.238.”, “37.239.”, “37.240.”, “37.241.”,
“185.22.”, “185.23.”, “185.24.”, “185.25.”,
“195.170.”, “195.228.”, “213.6.”, “213.42.”,
“185.107.”, “185.108.”, “217.171.”, “85.159.”,
“91.184.”, “91.185.”
],

// Umniah Jordan (Massive expansion)
UMNIAH: [
“91.106.”, “176.29.”, “176.30.”, “176.31.”,
“185.19.”, “185.20.”, “185.21.”, “185.26.”,
“37.252.”, “37.253.”, “37.254.”, “37.255.”,
“188.247.”, “193.178.”, “195.88.”, “195.89.”,
“213.5.”, “213.6.”, “217.144.”, “217.145.”
],

// Batelco Jordan
BATELCO: [
“185.193.”, “185.194.”, “185.195.”, “185.196.”
],

// Jordan Telecom (General)
JORDAN_TELECOM: [
“212.59.”, “212.118.”, “194.126.”, “195.229.”,
“213.6.”, “213.244.”, “217.171.”
]
};

// =======================
// DNS OVERRIDES (Force Middle East)
// =======================
var DNS_OVERRIDE = {
“matchmaking.pubgmobile.com”: “185.125.190.45”,
“ms.intlgame.com”: “185.125.190.45”,
“match.pubgm.com”: “185.125.190.45”,
“game.pubgmobile.com”: “185.125.190.100”,
“gs.intlgame.com”: “185.125.190.100”,
“voice.pubgmobile.com”: “185.125.190.50”,
“rtc.intlgame.com”: “185.125.190.50”,
“api.pubgmobile.com”: “46.183.216.75”,
“api.intlgame.com”: “46.183.216.75”
};

// =======================
// MIDDLE EAST SERVER IPs (Expanded)
// =======================
var ME_SERVERS = {
“185.125.190”: 1, “185.125.191”: 1, “185.125.192”: 1,
“46.183.216”: 1, “46.183.217”: 1, “46.183.218”: 1,
“5.62.60”: 1, “5.62.61”: 1, “5.62.62”: 1,
“185.193.68”: 1, “185.193.69”: 1, “185.193.70”: 1,
// Additional Bahrain ranges
“185.125.”: 1, “46.183.”: 1,
// UAE ranges
“5.62.”: 1, “31.192.”: 1,
// Saudi ranges
“185.193.”: 1, “212.71.”: 1
};

// =======================
// BLOCKED REGIONS (Expanded)
// =======================
var BLOCKED_REGIONS = {
// Asia Pacific (Expanded)
“8.222”: 1, “47.245”: 1, “43.132”: 1, “18.163”: 1,
“13.228”: 1, “13.229”: 1, “13.250”: 1, “52.220”: 1,
“54.169”: 1, “54.251”: 1, “175.41”: 1, “119.81”: 1,
// Europe (Expanded)
“18.185”: 1, “3.120”: 1, “52.58”: 1, “35.156”: 1,
“52.28”: 1, “52.29”: 1, “18.194”: 1, “3.64”: 1,
// Americas (Expanded)
“54.218”: 1, “52.88”: 1, “34.208”: 1, “18.237”: 1,
“52.36”: 1, “54.244”: 1, “35.162”: 1, “44.228”: 1
};

// =======================
// TRAFFIC CLASSIFICATION
// =======================
var TRAFFIC_PATTERNS = {
CRITICAL: /match|queue|lobby|room|recruit|rank|elite|competitive/i,
VOICE: /voice|rtc|webrtc|voip|audio|mic/i,
GAMEPLAY: /game|gs.|battle|fight|play/i,
SOCIAL: /friend|clan|team|squad|chat|social/i,
MEDIA: /cdn|image|video|stream|download/i
};

function classifyTraffic(url, host) {
var combined = url.toLowerCase() + host.toLowerCase();

if (TRAFFIC_PATTERNS.CRITICAL.test(combined)) return “CRITICAL”;
if (TRAFFIC_PATTERNS.VOICE.test(combined)) return “VOICE”;
if (TRAFFIC_PATTERNS.GAMEPLAY.test(combined)) return “GAMEPLAY”;
if (TRAFFIC_PATTERNS.SOCIAL.test(combined)) return “SOCIAL”;
if (TRAFFIC_PATTERNS.MEDIA.test(combined)) return “MEDIA”;

return “GENERAL”;
}

// =======================
// PUBG DETECTION (Expanded)
// =======================
function isPUBG(host) {
return /pubgmobile|intlgame|tencent|proximabeta|igamecj|pubgm|qq|pubg|krafton/.test(host);
}

// =======================
// DNS RESOLVER WITH OVERRIDE
// =======================
function smartResolve(host) {
if (DNS_OVERRIDE[host]) {
return DNS_OVERRIDE[host];
}

if (/match|queue|lobby/.test(host)) return “185.125.190.45”;
if (/voice|rtc/.test(host)) return “185.125.190.50”;
if (/game|gs./.test(host)) return “185.125.190.100”;

return dnsResolve(host) || “”;
}

// =======================
// REGION CHECKER
// =======================
function isMiddleEast(ip) {
if (!ip) return false;

var parts = ip.split(”.”);

// Check /16 subnet
var subnet16 = parts[0] + “.” + parts[1] + “.”;
if (ME_SERVERS[subnet16]) return true;

// Check /24 subnet
var subnet24 = parts[0] + “.” + parts[1] + “.” + parts[2];
if (ME_SERVERS[subnet24]) return true;

return false;
}

function isBlocked(ip) {
if (!ip) return false;
var subnet = ip.split(”.”).slice(0, 2).join(”.”);
return BLOCKED_REGIONS[subnet] || false;
}

// =======================
// ENHANCED ISP DETECTION
// =======================
function detectISP(ip) {
if (!ip) return “JORDAN_FALLBACK”;

// Try all ISP ranges
for (var isp in JORDAN_ISP_RANGES) {
var ranges = JORDAN_ISP_RANGES[isp];
for (var i = 0; i < ranges.length; i++) {
if (ip.indexOf(ranges[i]) === 0) {
return isp;
}
}
}

// If not detected but looks like Jordan range, mark as Jordan
if (isLikelyJordan(ip)) {
return “JORDAN_GENERIC”;
}

return “FOREIGN”;
}

// =======================
// DETECT IF LIKELY JORDAN IP
// =======================
function isLikelyJordan(ip) {
var parts = ip.split(”.”);
var first = parseInt(parts[0]);
var second = parseInt(parts[1]);

// Common Jordan AS ranges
if (first === 82 || first === 212 || first === 91 ||
first === 185 || first === 188 || first === 176) {
return true;
}

// Specific high-probability ranges
if (first === 37 && (second >= 48 && second <= 255)) return true;
if (first === 195 && (second >= 88 && second <= 229)) return true;
if (first === 213 && (second >= 5 && second <= 244)) return true;

return false;
}

// =======================
// PROXY CHAIN BUILDER (Enhanced for Jordan)
// =======================
var ROTATION_COUNTER = 0;

function buildProxyChain(traffic_type, isp) {
var chain = [];

// CRITICAL: Use all zones in parallel
if (traffic_type === “CRITICAL”) {
for (var zone in JORDAN_ZONES) {
chain = chain.concat(formatProxies(JORDAN_ZONES[zone].proxies));
}
chain = chain.concat(formatProxies(getAllBackups()));
return chain.join(”; “);
}

// VOICE: Low latency - Amman only
if (traffic_type === “VOICE”) {
chain = formatProxies(JORDAN_ZONES.AMMAN.proxies);
chain = chain.concat(formatProxies(JORDAN_ZONES.IRBID.proxies));
chain = chain.concat(formatProxies(JORDAN_ZONES.AMMAN.backup));
return chain.join(”; “);
}

// GAMEPLAY: Fast zones
if (traffic_type === “GAMEPLAY”) {
chain = formatProxies(JORDAN_ZONES.AMMAN.proxies);
chain = chain.concat(formatProxies(JORDAN_ZONES.IRBID.proxies));
chain = chain.concat(formatProxies(JORDAN_ZONES.AQABA.proxies));
return chain.join(”; “);
}

// For detected Jordan ISPs: prioritize same ISP zone
if (isp === “ZAIN”) {
chain = formatProxies(JORDAN_ZONES.AMMAN.proxies);
} else if (isp === “ORANGE”) {
chain = formatProxies(JORDAN_ZONES.IRBID.proxies);
} else if (isp === “UMNIAH” || isp === “BATELCO”) {
chain = formatProxies(JORDAN_ZONES.AQABA.proxies);
}

// Add all other zones as fallback
var zones = [“AMMAN”, “IRBID”, “AQABA”, “ZARQA”];
for (var i = 0; i < zones.length; i++) {
chain = chain.concat(formatProxies(JORDAN_ZONES[zones[i]].proxies));
}

return chain.join(”; “);
}

function formatProxies(proxyList) {
var formatted = [];
for (var i = 0; i < proxyList.length; i++) {
formatted.push(“PROXY “ + proxyList[i]);
}
return formatted;
}

function getAllBackups() {
var backups = [];
for (var zone in JORDAN_ZONES) {
backups = backups.concat(JORDAN_ZONES[zone].backup);
}
return backups;
}

// =======================
// AGGRESSIVE JORDAN ROUTING
// Force Jordan for ANY detected Jordanian IP
// =======================
function forceJordanRouting() {
var all = [];

// Add all primary proxies
for (var zone in JORDAN_ZONES) {
all = all.concat(formatProxies(JORDAN_ZONES[zone].proxies));
}

// Add all backups
all = all.concat(formatProxies(getAllBackups()));

return all.join(”; “);
}

// =======================
// MAIN ROUTING ENGINE
// =======================
function FindProxyForURL(url, host) {

host = host.toLowerCase();

// 🚫 Block local/private
if (isPlainHostName(host)) {
return “PROXY 127.0.0.1:9”;
}

// 🚫 Non-PUBG traffic = direct
if (!isPUBG(host)) {
return “DIRECT”;
}

// 🔍 Smart DNS resolution (force Middle East)
var ip = smartResolve(host);

// 🛑 Block non-Middle East servers
if (isBlocked(ip)) {
return “PROXY 127.0.0.1:9”;
}

// ✅ Detect traffic type
var traffic_type = classifyTraffic(url, host);

// 🌍 Enhanced ISP detection
var isp = detectISP(ip);

// 🇯🇴 If detected as Jordan: aggressive routing
if (isp !== “FOREIGN”) {
return forceJordanRouting();
}

// 🚀 Build optimal proxy chain
return buildProxyChain(traffic_type, isp);
}

// =======================
// DEBUG FUNCTION (Optional)
// =======================
function debugInfo(ip) {
var isp = detectISP(ip);
var isJordan = isLikelyJordan(ip);
var isME = isMiddleEast(ip);
var blocked = isBlocked(ip);

return “IP: “ + ip + “ | ISP: “ + isp + “ | Jordan: “ + isJordan +
“ | ME: “ + isME + “ | Blocked: “ + blocked;
}
