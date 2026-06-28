/*
 * ═══════════════════════════════════════════════════════════════════
 *  jordan_sovereign.pac  —  v2.0 (مصحح — يعمل فعلياً)
 *  الهدف: توجيه كل traffic игры عبر بروكسي أردني
 *         حتى يظهر الـ IP أردني لسيرفر PUBG
 *  ECMAScript 3 Strict
 * ═══════════════════════════════════════════════════════════════════
 */

/* ───────────────────────────────────────────────────────────────────
   §0  المتغيرات العامة
   ─────────────────────────────────────────────────────────────────── */

// ⚠️ عدّل هذا السطر بعنوان بروكسكك الأردني الفعلي
var PROXY_A = "212.35.66.45:1080";

var BLOCK  = "PROXY 0.0.0.0:0";
var DIRECT = "DIRECT";

/* ───────────────────────────────────────────────────────────────────
   §1  خوادم PUBG Mobile المعروفة (	actual servers	)
   ─────────────────────────────────────────────────────────────────── */

// خوادم ماتش مكتشفة فعلياً
var MATCH_SERVERS = [
    "94.127.211.6",
    "46.185.131.218"
];

// خوادم لوبي معروفة
var LOBBY_SERVERS = [
    "109.237.193.187"
];

var MATCH_PORT = 20005;
var LOBBY_PORT = 80;

/* ───────────────────────────────────────────────────────────────────
   §2  نطاقات PUBG / Tencent / Krafton (	domains	)
   ─────────────────────────────────────────────────────────────────── */

var PUBG_DOMAINS = [
    "pubgmobile.com",
    "tencent.com",
    "tencentgames.com",
    "igamecj.com",
    "gcloudsdk.com",
    "proximabeta.com",
    "level.infinite.com",
    "krafton.com",
    "qcloud.com",
    "tencent-cloud.com",
    "myqcloud.com",
    "gtimg.com",
    "gcloud.qq.com",
    "game.qq.com",
    "igamecj.com"
];

/* ───────────────────────────────────────────────────────────────────
   §3  نطاقات سحابية تُستخدم لاستضافة خوادم الألعاب
   ─────────────────────────────────────────────────────────────────── */

var GAME_CLOUD_RANGES = [
    // الماتش المكتشف
    ["46.185.0.0",  "255.255.0.0"],
    // Tencent Cloud
    ["43.0.0.0",    "255.255.0.0"],
    ["162.0.0.0",   "255.255.0.0"],
    ["101.0.0.0",   "255.255.0.0"],
    // AWS (regions قريبة)
    ["52.0.0.0",    "255.0.0.0"],
    ["54.0.0.0",    "255.0.0.0"],
    ["3.0.0.0",     "255.0.0.0"],
    ["13.0.0.0",    "255.0.0.0"],
    ["15.0.0.0",    "255.0.0.0"],
    ["18.0.0.0",    "255.0.0.0"],
    ["34.0.0.0",    "255.0.0.0"],
    ["35.0.0.0",    "255.0.0.0"],
    // Google Cloud
    ["34.0.0.0",    "255.128.0.0"],
    ["35.0.0.0",    "255.128.0.0"],
    ["104.0.0.0",   "255.0.0.0"],
    // Azure
    ["13.0.0.0",    "255.0.0.0"],
    ["20.0.0.0",    "255.0.0.0"],
    ["40.0.0.0",    "255.0.0.0"],
    ["52.0.0.0",    "255.0.0.0"]
];

/* ───────────────────────────────────────────────────────────────────
   §4  نطاقات أردنية (للاتصالات المحلية فقط)
   ─────────────────────────────────────────────────────────────────── */

var JORDAN_RANGES = [
    ["176.57.0.0",  "255.255.0.0"],
    ["109.237.0.0", "255.255.0.0"],
    ["82.212.0.0",  "255.255.0.0"],
    ["86.108.0.0",  "255.255.0.0"],
    ["188.161.0.0", "255.255.0.0"],
    ["193.188.0.0", "255.255.0.0"],
    ["79.173.0.0",  "255.255.0.0"],
    ["149.200.0.0", "255.255.0.0"],
    ["185.109.0.0", "255.255.0.0"],
    ["212.118.0.0", "255.255.0.0"]
];

/* ───────────────────────────────────────────────────────────────────
   §5  Anti-Leak: STUN/TURN + DNS خارجي محظور
   ─────────────────────────────────────────────────────────────────── */

var BLOCKED_DNS_IPS = [
    "8.8.8.8", "8.8.4.4",
    "1.1.1.1", "1.0.0.1",
    "208.67.222.222", "208.67.220.220",
    "9.9.9.9", "149.112.112.112"
];

/* ═══════════════════════════════════════════════════════════════════
   ██  الدوال المساعدة
   ═══════════════════════════════════════════════════════════════════ */

/* ── فحص: هل IP أردني؟ ── */
function isJordanianIP(ip) {
    var i;
    for (i = 0; i < JORDAN_RANGES.length; i = i + 1) {
        if (isInNet(ip, JORDAN_RANGES[i][0], JORDAN_RANGES[i][1])) {
            return true;
        }
    }
    return false;
}

/* ── فحص: هل IP ضمن نطاقات بنية سحابية للألعاب؟ ── */
function isGameCloudIP(ip) {
    var i;
    for (i = 0; i < GAME_CLOUD_RANGES.length; i = i + 1) {
        if (isInNet(ip, GAME_CLOUD_RANGES[i][0], GAME_CLOUD_RANGES[i][1])) {
            return true;
        }
    }
    return false;
}

/* ── فحص: هل هذا خادم ماتش معروف؟ ── */
function isKnownMatchServer(ip, port) {
    if (port !== MATCH_PORT) {
        return false;
    }
    var i;
    for (i = 0; i < MATCH_SERVERS.length; i = i + 1) {
        if (ip === MATCH_SERVERS[i]) {
            return true;
        }
    }
    return false;
}

/* ── فحص: هل هذا خادم لوبي معروف؟ ── */
function isKnownLobbyServer(ip, port) {
    if (port !== LOBBY_PORT) {
        return false;
    }
    var i;
    for (i = 0; i < LOBBY_SERVERS.length; i = i + 1) {
        if (ip === LOBBY_SERVERS[i]) {
            return true;
        }
    }
    return false;
}

/* ── فحص: هل Hostname تابع لـ PUBG؟ ── */
function isPUBGDomain(host) {
    var i;
    for (i = 0; i < PUBG_DOMAINS.length; i = i + 1) {
        if (shExpMatch(host, "*." + PUBG_DOMAINS[i]) ||
            host === PUBG_DOMAINS[i]) {
            return true;
        }
    }
    return false;
}

/* ── فحص: كلمات دلالية للألعاب في الـ Host ── */
function hasGameKeywords(host) {
    if (host.match(/match|battle|game|combat|realtime|sync|tick|room|ingame|gsvr|gameserver|gs|battlefield|arena|lobby|matchmaking|queue|dispatch|gateway|region|join|login|auth|account|session|token|pubg|tencent|krafton|lightspeed|infinite/)) {
        return true;
    }
    return false;
}

/* ── فحص: كلمات لوبي / مصادقة ── */
function hasLobbyKeywords(host) {
    if (host.match(/lobby|matchmaking|queue|dispatch|gateway|region|join|login|auth|account|session|token/)) {
        return true;
    }
    return false;
}

/* ── فحص: STUN/TURN (تسريب IP) ── */
function isSTUNorTURN(host) {
    if (host.match(/stun/) || host.match(/turn/)) {
        return true;
    }
    if (host === "stun.l.google.com" ||
        host === "stun1.l.google.com" ||
        host === "stun2.l.google.com" ||
        host === "stun3.l.google.com" ||
        host === "stun4.l.google.com" ||
        host === "stun.services.mozilla.com") {
        return true;
    }
    return false;
}

/* ── فحص: DNS خارجي محظور ── */
function isBlockedDNS(ip) {
    var i;
    for (i = 0; i < BLOCKED_DNS_IPS.length; i = i + 1) {
        if (ip === BLOCKED_DNS_IPS[i]) {
            return true;
        }
    }
    return false;
}

/* ── استخراج البورت من الرابط ── */
function extractPort(url) {
    var protocol, h, slashPos, hostPart, colonPos;
    if (url.toLowerCase().indexOf("https://") === 0) {
        protocol = "https";
        h = url.substring(8);
    } else if (url.toLowerCase().indexOf("http://") === 0) {
        protocol = "http";
        h = url.substring(7);
    } else {
        return 80;
    }
    slashPos = h.indexOf("/");
    hostPart = (slashPos !== -1) ? h.substring(0, slashPos) : h;
    colonPos = hostPart.indexOf(":");
    if (colonPos !== -1) {
        return parseInt(hostPart.substring(colonPos + 1), 10);
    }
    return (protocol === "https") ? 443 : 80;
}

/* ═══════════════════════════════════════════════════════════════════
   ██  القفل الجلسي (Session Lock)
   ═══════════════════════════════════════════════════════════════════ */

var SESSION = {
    matchIP: null,
    matchHost: null,
    matchPort: null,
    locked: false,
    timestamp: 0
};

function lockSession(ip, host, port) {
    SESSION.matchIP = ip;
    SESSION.matchHost = host;
    SESSION.matchPort = port;
    SESSION.locked = true;
    SESSION.timestamp = new Date().getTime();
}

function isSessionExpired() {
    if (!SESSION.locked) {
        return true;
    }
    var now = new Date().getTime();
    // صلاحية 30 دقيقة
    return ((now - SESSION.timestamp) > 1800000);
}

function resetSession() {
    SESSION.matchIP = null;
    SESSION.matchHost = null;
    SESSION.matchPort = null;
    SESSION.locked = false;
    SESSION.timestamp = 0;
}

/* ═══════════════════════════════════════════════════════════════════
   ██  الدالة الرئيسية
   ═══════════════════════════════════════════════════════════════════ */

function FindProxyForURL(url, host) {

    var h    = host.toLowerCase();
    var u    = url.toLowerCase();
    var port = extractPort(u);
    var ip   = null;

    /* ───────────────────────────────────────────────────────────────
       §0  الشبكات المحلية → DIRECT
       ─────────────────────────────────────────────────────────────── */
    if (isPlainHostName(h) ||
        h === "localhost" ||
        isInNet(h, "127.0.0.0", "255.0.0.0") ||
        isInNet(h, "192.168.120.0", "255.255.255.0") ||
        isInNet(h, "10.0.0.0", "255.0.0.0") ||
        isInNet(h, "172.16.0.0", "255.240.0.0") ||
        isInNet(h, "169.254.0.0", "255.255.0.0") ||
        isInNet(h, "224.0.0.0", "240.0.0.0")) {
        return DIRECT;
    }

    /* ───────────────────────────────────────────────────────────────
       §1  Anti-Leak: STUN/TURN → BLOCK
       ─────────────────────────────────────────────────────────────── */
    if (isSTUNorTURN(h)) {
        return BLOCK;
    }

    /* ───────────────────────────────────────────────────────────────
       §2  تحليل DNS
       ─────────────────────────────────────────────────────────────── */
    ip = dnsResolve(h);

    /* إذا تعذّر التحليل */
    if (!ip) {
        /* نطاقات PUBG غير المحلولة → حاول عبر البروكسي */
        if (isPUBGDomain(h) || hasGameKeywords(h)) {
            return PROXY_A;
        }
        return BLOCK;
    }

    /* ───────────────────────────────────────────────────────────────
       §3  Anti-Leak: DNS خارجي محظور → BLOCK
       ─────────────────────────────────────────────────────────────── */
    if (isBlockedDNS(ip)) {
        /* استثناء: DNS أردني */
        if (isJordanianIP(ip)) {
            return DIRECT;
        }
        return BLOCK;
    }

    /* ───────────────────────────────────────────────────────────────
       §4  خوادم الماتش المعروفة → PROXY + LOCK
           ⚡ هذا هو القلب — كل traffic الماتش يمر عبر البروكسي
       ─────────────────────────────────────────────────────────────── */
    if (isKnownMatchServer(ip, port)) {
        lockSession(ip, h, port);
        return PROXY_A;
    }

    /* ───────────────────────────────────────────────────────────────
       §5  خوادم اللوبي المعروفة → PROXY
       ─────────────────────────────────────────────────────────────── */
    if (isKnownLobbyServer(ip, port)) {
        return PROXY_A;
    }

    /* ───────────────────────────────────────────────────────────────
       §6  نطاقات PUBG / Tencent → PROXY
           (Ӈڬڛكل traffic اللعبة يظهر من الأردن)
       ─────────────────────────────────────────────────────────────── */
    if (isPUBGDomain(h)) {
        return PROXY_A;
    }

    /* ───────────────────────────────────────────────────────────────
       §7  كلمات دلالية للعبة + IP سحابي → PROXY
       ─────────────────────────────────────────────────────────────── */
    if (hasGameKeywords(h) && isGameCloudIP(ip)) {
        lockSession(ip, h, port);
        return PROXY_A;
    }

    /* ───────────────────────────────────────────────────────────────
       §8  أي بورت UDP/TCP شائع للألعاب → PROXY
           (	PUBG يستخدم بورتات 20000-20005, 8080, 443	)
       ─────────────────────────────────────────────────────────────── */
    if (port === 20000 || port === 20001 || port === 20002 ||
        port === 20003 || port === 20004 || port === 20005 ||
        port === 8080 || port === 8443) {
        /* إذا كان IP غير أردني → وجّه عبر البروكسي */
        if (!isJordanianIP(ip)) {
            return PROXY_A;
        }
    }

    /* ───────────────────────────────────────────────────────────────
       §9  القفل الجلسي: إذا كانت جلسة نشطة
           أي اتصال لـ IP سحابي → PROXY (قد يكون سيرفر ماتش إضافي)
       ─────────────────────────────────────────────────────────────── */
    if (SESSION.locked && !isSessionExpired()) {
        if (isGameCloudIP(ip)) {
            return PROXY_A;
        }
    }
    if (isSessionExpired()) {
        resetSession();
    }

    /* ───────────────────────────────────────────────────────────────
       §10  نطاقات أردنية → DIRECT
       ─────────────────────────────────────────────────────────────── */
    if (isJordanianIP(ip)) {
        return DIRECT;
    }

    /* ───────────────────────────────────────────────────────────────
       §11  نطاقات معروفة (Apple, Google, Microsoft) → DIRECT
       ─────────────────────────────────────────────────────────────── */
    if (shExpMatch(h, "*.apple.com") || shExpMatch(h, "*.icloud.com") ||
        shExpMatch(h, "*.mzstatic.com") || h === "captive.apple.com" ||
        shExpMatch(h, "*.google.com") || shExpMatch(h, "*.googleapis.com") ||
        shExpMatch(h, "*.gstatic.com") || shExpMatch(h, "*.googleusercontent.com") ||
        shExpMatch(h, "*.microsoft.com") || shExpMatch(h, "*.windows.com") ||
        shExpMatch(h, "*.windowsupdate.com") || shExpMatch(h, "*.msftconnecttest.com")) {
        return DIRECT;
    }

    /* ───────────────────────────────────────────────────────────────
       §12  كل شيء آخر → DIRECT
           (أفضل من الحظر الكامل — السكربت يحمي خوادم اللعبة فقط)
       ─────────────────────────────────────────────────────────────── */
    return DIRECT;
}
