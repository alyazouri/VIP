// ================= PROXIES =================
var GAME_HTTP   = "PROXY 46.185.131.218:20001"; // gameplay
var AUX_SOCKS   = "SOCKS5 46.23.112.5:1080";   // lobby / social
var BLOCK_PROXY = "PROXY 127.0.0.1:9";         // block fallback

// ================= STATE =================
var STICKY_NET24 = null;

// ================= DETECTION =================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

// Classic / Ranked / Battle Royale
function isClassic(u,h){
  return /classic|rank|battle|match|royale|metro/i.test(u+h);
}

// TDM / Arena / Payload / Zombie / War
function isTDM(u,h){
  return /arena|tdm|teamdeathmatch|payload|zombie|war/i.test(u+h);
}

// Lobby / Squad / Party / Social
function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|party|team|squad|invite|friend|social|clan|presence/i.test(u+h);
}

// Background services / assets
function isService(u,h){
  return /config|telemetry|metric|log|trace|report|cdn|patch|update|download|asset|static|manifest/i.test(u+h);
}

function isIPv4(h){
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

    // iOS / local
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "captive.apple.com")) {
        return "DIRECT";
    }

    // ===== JORDAN ISP RANGES (AS REQUESTED) =====
    var isJordan =
        isInNet(host, "82.212.64.0",   "255.255.192.0") ||  // Orange core
        isInNet(host, "94.249.0.0",    "255.255.128.0") ||  // Orange
        isInNet(host, "176.29.0.0",    "255.255.0.0")   ||  // Umniah
        isInNet(host, "46.185.128.0",  "255.255.128.0") ||  // Orange/Umniah
        isInNet(host, "213.6.0.0",     "255.255.0.0")   ||  // General Jordan
        isInNet(host, "92.253.0.0",    "255.255.128.0") ||  // Orange new 2026
        isInNet(host, "149.200.128.0", "255.255.128.0") ||  // Orange new 2026
        isInNet(host, "176.28.128.0",  "255.255.128.0") ||  // Zain core
        isInNet(host, "46.32.96.0",    "255.255.224.0") ||  // Zain
        isInNet(host, "46.248.192.0",  "255.255.224.0") ||  // Umniah
        isInNet(host, "95.172.192.0",  "255.255.224.0") ||  // Umniah
        isInNet(host, "109.107.224.0", "255.255.224.0") ||  // Umniah
        isInNet(host, "5.45.128.0",    "255.255.248.0") ||  // Umniah
        isInNet(host, "37.123.128.0",  "255.255.128.0") ||  // Zain
        isInNet(host, "87.236.232.0",  "255.255.248.0") ||  // Zain
        isInNet(host, "176.241.0.0",   "255.255.0.0")   ||  // Zain
        isInNet(host, "37.18.0.0",     "255.255.0.0")   ||  // Umniah
        isInNet(host, "86.108.0.0",    "255.252.0.0")   ||  // Orange
        isInNet(host, "90.84.0.0",     "255.252.0.0")   ||  // Orange
        isInNet(host, "217.144.0.0",   "255.255.0.0")   ||  // Orange
        isInNet(host, "196.201.0.0",   "255.255.0.0")   ||  // Orange
        isInNet(host, "62.72.128.0",   "255.255.128.0") ||  // Orange
        isInNet(host, "213.186.32.0",  "255.255.224.0") ||  // Orange
        isInNet(host, "81.21.64.0",    "255.255.240.0") ||  // Orange
        isInNet(host, "37.202.64.0",   "255.255.192.0") ||  // Orange (updated)
        isInNet(host, "80.10.64.0",    "255.255.240.0") ||  // Orange
        isInNet(host, "217.23.32.0",   "255.255.240.0");    // Orange

    /* =========================
       TDM / ARENA – JORDAN ONLY
       ========================= */
    if (isPUBG(host) && isTDM(url, host)) {
        if (!isJordan) return BLOCK_PROXY;
        return GAME_HTTP;
    }

    /* =========================
       CLASSIC / RANKED – STICKY /24
       ========================= */
    if (isPUBG(host) && isClassic(url, host)) {

        if (!isJordan) return BLOCK_PROXY;

        var ip = host;
        if (!isIPv4(ip)) ip = dnsResolve(host);

        if (ip) {
            var net24 = ip.split('.').slice(0,3).join('.');
            if (!STICKY_NET24) STICKY_NET24 = net24;
            if (STICKY_NET24 !== net24) return BLOCK_PROXY;
        }

        return GAME_HTTP;
    }

    /* =========================
       LOBBY / SOCIAL – SOCKS
       ========================= */
    if (isPUBG(host) && isLobby(url, host)) {
        if (!isJordan) return BLOCK_PROXY;
        return AUX_SOCKS;
    }

    /* =========================
       SERVICES / ASSETS
       ========================= */
    if (isPUBG(host) && isService(url, host)) {
        if (!isJordan) return BLOCK_PROXY;
        return GAME_HTTP;
    }

    /* =========================
       ANY OTHER PUBG
       ========================= */
    if (isPUBG(host)) {
        if (!isJordan) return BLOCK_PROXY;
        return GAME_HTTP;
    }

    // NON PUBG
    return BLOCK_PROXY;
}
