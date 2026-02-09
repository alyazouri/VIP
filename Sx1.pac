// ================= PROXIES =================
var GAME_HTTP   = "PROXY 46.185.131.218:20001"; // gameplay
var AUX_SOCKS   = "SOCKS5 46.23.112.5:1080";   // lobby / social
var BLOCK_PROXY = "PROXY 127.0.0.1:9";         // hard block

// ================= STATE =================
var STICKY_NET24 = null;

// ================= DETECTION =================

// تعريف شامل لـ PUBG
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

// Classic / Ranked / Battle Royale
function isClassic(u,h){
  return /classic|rank|battle|match|royale|metro/i.test(u+h);
}

// TDM / Arena / Payload / Zombie / War
function isTDM(u,h){
  return /arena|tdm|teamdeathmatch|war|payload|zombie/i.test(u+h);
}

// Lobby / Squad / Party / Social
function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|party|team|squad|invite|friend|social|clan|presence/i.test(u+h);
}

// خدمات خلفية / تحديثات
function isService(u,h){
  return /config|telemetry|metric|log|trace|report|cdn|patch|update|download|asset|static|manifest/i.test(u+h);
}

// IPv4 check
function isIPv4(h){
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

    // ===== iOS / Local =====
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "captive.apple.com")) {
        return "DIRECT";
    }

    // ===== JORDAN IP RANGES (PRIMARY + SECONDARY) =====
    var isJordan =
        // ---- PRIMARY (Strong JO) ----
        isInNet(host, "37.44.32.0",   "255.255.248.0") || // /21
        isInNet(host, "37.75.144.0",  "255.255.248.0") || // /21
        isInNet(host, "37.123.64.0",  "255.255.224.0") || // /19
        isInNet(host, "37.152.0.0",   "255.255.248.0") || // /21
        isInNet(host, "37.202.64.0",  "255.255.192.0") || // /18
        isInNet(host, "37.220.112.0", "255.255.240.0") || // /20
        isInNet(host, "2.59.52.0",    "255.255.252.0") || // /22
        isInNet(host, "5.45.128.0",   "255.255.240.0") || // /20

        // ---- SECONDARY (JO Backup) ----
        isInNet(host, "37.17.192.0",  "255.255.240.0") || // /20
        isInNet(host, "37.75.160.0",  "255.255.248.0") || // /21
        isInNet(host, "37.44.40.0",   "255.255.252.0") || // /22
        isInNet(host, "5.198.240.0",  "255.255.248.0") || // /21
        isInNet(host, "5.199.184.0",  "255.255.252.0") || // /22
        isInNet(host, "46.248.192.0", "255.255.224.0") || // /19
        isInNet(host, "62.72.160.0",  "255.255.224.0") || // /19
        isInNet(host, "77.245.0.0",   "255.255.240.0");   // /20

    /* =================================================
       TDM / ARENA – JORDAN ONLY (STRICT)
       ================================================= */
    if (isPUBG(host) && isTDM(url, host)) {

        if (!isJordan) {
            return BLOCK_PROXY;
        }

        // بدون SOCKS – مسار ثابت
        return GAME_HTTP;
    }

    /* =================================================
       CLASSIC / RANKED – JORDAN + STICKY SERVER
       ================================================= */
    if (isPUBG(host) && isClassic(url, host)) {

        if (!isJordan) {
            return BLOCK_PROXY;
        }

        // تثبيت السيرفر /24
        var ip = host;
        if (!isIPv4(ip)) {
            ip = dnsResolve(host);
        }

        if (ip) {
            var net24 = ip.split('.').slice(0,3).join('.');
            if (!STICKY_NET24) {
                STICKY_NET24 = net24;
            }
            if (STICKY_NET24 !== net24) {
                return BLOCK_PROXY;
            }
        }

        return GAME_HTTP;
    }

    /* =================================================
       LOBBY / SOCIAL / SQUAD
       ================================================= */
    if (isPUBG(host) && isLobby(url, host)) {

        if (!isJordan) {
            return BLOCK_PROXY;
        }

        // SOCKS فقط هون
        return AUX_SOCKS;
    }

    /* =================================================
       BACKGROUND SERVICES / ASSETS
       ================================================= */
    if (isPUBG(host) && isService(url, host)) {

        if (!isJordan) {
            return BLOCK_PROXY;
        }

        return GAME_HTTP;
    }

    /* =================================================
       ANY OTHER PUBG TRAFFIC
       ================================================= */
    if (isPUBG(host)) {

        if (!isJordan) {
            return BLOCK_PROXY;
        }

        return GAME_HTTP;
    }

    /* =================================================
       NON PUBG
       ================================================= */
    return BLOCK_PROXY;
}
