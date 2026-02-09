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

function isClassic(u,h){
  return /classic|rank|battle|match|royale|metro/i.test(u+h);
}

function isTDM(u,h){
  return /arena|tdm|teamdeathmatch|payload|zombie|war/i.test(u+h);
}

function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|party|team|squad|invite|friend|social|clan|presence/i.test(u+h);
}

function isService(u,h){
  return /config|telemetry|metric|log|trace|report|cdn|patch|update|download|asset|static|manifest/i.test(u+h);
}

function isIPv4(h){
  return /^\d{1,3}(\.\d{1,3}){3}$/.test(h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

    // ================= LOCAL / LAN =================
    if (isPlainHostName(host) ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "captive.apple.com") ||
        isInNet(host, "10.0.0.0",    "255.0.0.0") ||
        isInNet(host, "172.16.0.0",  "255.240.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0")) {
        return "DIRECT";
    }

    // ================= JORDAN DOMAINS =================
    // مواقع وخدمات داخل الأردن
    if (
        shExpMatch(host, "*.jo") ||
        shExpMatch(host, "*.gov.jo") ||
        shExpMatch(host, "*.edu.jo") ||
        shExpMatch(host, "*.org.jo") ||
        shExpMatch(host, "*.net.jo") ||

        // مزودي الخدمة
        shExpMatch(host, "*.orange.jo") ||
        shExpMatch(host, "*.zain.jo")   ||
        shExpMatch(host, "*.umniah.com")||
        shExpMatch(host, "*.umniah.jo")
    ) {
        return "DIRECT";
    }

    // ================= JORDAN IP RANGES =================
    var isJordan =
        isInNet(host, "82.212.64.0",   "255.255.192.0") ||
        isInNet(host, "94.249.0.0",    "255.255.128.0") ||
        isInNet(host, "176.29.0.0",    "255.255.0.0")   ||
        isInNet(host, "46.185.128.0",  "255.255.128.0") ||
        isInNet(host, "213.6.0.0",     "255.255.0.0")   ||
        isInNet(host, "92.253.0.0",    "255.255.128.0") ||
        isInNet(host, "149.200.128.0", "255.255.128.0") ||
        isInNet(host, "176.28.128.0",  "255.255.128.0") ||
        isInNet(host, "46.32.96.0",    "255.255.224.0") ||
        isInNet(host, "46.248.192.0",  "255.255.224.0") ||
        isInNet(host, "95.172.192.0",  "255.255.224.0") ||
        isInNet(host, "109.107.224.0", "255.255.224.0") ||
        isInNet(host, "5.45.128.0",    "255.255.248.0") ||
        isInNet(host, "37.123.128.0",  "255.255.128.0") ||
        isInNet(host, "87.236.232.0",  "255.255.248.0") ||
        isInNet(host, "176.241.0.0",   "255.255.0.0")   ||
        isInNet(host, "37.18.0.0",     "255.255.0.0")   ||
        isInNet(host, "86.108.0.0",    "255.252.0.0")   ||
        isInNet(host, "90.84.0.0",     "255.252.0.0")   ||
        isInNet(host, "217.144.0.0",   "255.255.0.0")   ||
        isInNet(host, "196.201.0.0",   "255.255.0.0")   ||
        isInNet(host, "62.72.128.0",   "255.255.128.0") ||
        isInNet(host, "213.186.32.0",  "255.255.224.0") ||
        isInNet(host, "81.21.64.0",    "255.255.240.0") ||
        isInNet(host, "37.202.64.0",   "255.255.192.0") ||
        isInNet(host, "80.10.64.0",    "255.255.240.0") ||
        isInNet(host, "217.23.32.0",   "255.255.240.0");

    // ================= PUBG RULES =================
    if (isPUBG(host) && isTDM(url, host)) {
        if (!isJordan) return BLOCK_PROXY;
        return GAME_HTTP;
    }

    if (isPUBG(host) && isClassic(url, host)) {
        if (!isJordan) return BLOCK_PROXY;

        if (isIPv4(host)) {
            var net24 = host.split('.').slice(0,3).join('.');
            if (!STICKY_NET24) STICKY_NET24 = net24;
            if (STICKY_NET24 !== net24) return BLOCK_PROXY;
        }
        return GAME_HTTP;
    }

    if (isPUBG(host) && isLobby(url, host)) {
        if (!isJordan) return BLOCK_PROXY;
        return AUX_SOCKS;
    }

    if (isPUBG(host) && isService(url, host)) {
        if (!isJordan) return BLOCK_PROXY;
        return GAME_HTTP;
    }

    if (isPUBG(host)) {
        if (!isJordan) return BLOCK_PROXY;
        return GAME_HTTP;
    }

    // ================= NON-JORDAN =================
    return BLOCK_PROXY;
}
