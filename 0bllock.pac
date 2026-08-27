/*
============================================================
🇯🇴 JORDAN GAMING AUTO PAC — MODE 1: BLOCK GAMES ONLY
============================================================
السلوك:
  • شبكات محلية          → DIRECT (مباشر)
  • مواقع أردنية          → DIRECT (مباشر)
  • سيرفرات الألعاب       → BLOCK  (محجوبة)
  • كل شي آخر (تصفح...)  → DIRECT (يعمل طبيعي)

للإيقاف المؤقت (لتشغيل اللعبة):
  الإعدادات → Wi-Fi → (i) → Configure Proxy → Off
============================================================
*/

var BLOCK  = "PROXY 0.0.0.0:0";
var DIRECT = "DIRECT";

/* ── DNS Cache ── */
var dnsCache = {};

function resolveIP(host) {
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(host)) return host;
    if (dnsCache[host] !== undefined) return dnsCache[host];
    var ip = "";
    try { ip = dnsResolve(host) || ""; } catch (e) { ip = ""; }
    dnsCache[host] = ip;
    return ip;
}

/* ── النطاقات الأردنية ── */
var JORDAN_NETS = [
    ["46.32.96.0",     "255.255.224.0"],
    ["176.28.128.0",   "255.255.128.0"],
    ["188.247.64.0",   "255.255.240.0"],
    ["188.247.80.0",   "255.255.248.0"],
    ["188.247.88.0",   "255.255.252.0"],
    ["37.202.64.0",    "255.255.192.0"],
    ["46.185.128.0",   "255.255.128.0"],
    ["79.173.192.0",   "255.255.192.0"],
    ["82.212.64.0",    "255.255.192.0"],
    ["86.108.0.0",     "255.255.128.0"],
    ["92.253.0.0",     "255.255.128.0"],
    ["94.249.0.0",     "255.255.128.0"],
    ["149.200.128.0",  "255.255.128.0"],
    ["176.29.0.0",     "255.255.0.0"],
    ["178.77.128.0",   "255.255.192.0"],
    ["37.44.32.0",     "255.255.248.0"],
    ["37.75.144.0",    "255.255.248.0"],
    ["37.152.0.0",     "255.255.248.0"],
    ["91.106.96.0",    "255.255.240.0"],
    ["95.141.208.0",   "255.255.240.0"],
    ["109.107.224.0",  "255.255.224.0"],
    ["212.118.0.0",    "255.255.224.0"],
    ["46.23.112.0",    "255.255.240.0"],
    ["84.18.32.0",     "255.255.224.0"],
    ["84.18.64.0",     "255.255.224.0"],
    ["92.241.32.0",    "255.255.224.0"],
    ["93.93.144.0",    "255.255.248.0"],
    ["93.95.200.0",    "255.255.248.0"],
    ["94.127.208.0",   "255.255.248.0"],
    ["95.172.192.0",   "255.255.224.0"],
    ["176.241.64.0",   "255.255.248.0"],
    ["178.238.176.0",  "255.255.240.0"],
    ["212.34.0.0",     "255.255.224.0"],
    ["213.139.32.0",   "255.255.224.0"]
];

function inJordan(ip) {
    if (!ip || ip.indexOf(":") !== -1) return false;
    for (var i = 0; i < JORDAN_NETS.length; i++) {
        if (isInNet(ip, JORDAN_NETS[i][0], JORDAN_NETS[i][1])) return true;
    }
    return false;
}

/* ── سيرفرات الألعاب (كشف بالدومين — دقيق) ── */
var GAME_HOSTS = [
    "*.pubgmobile.com",
    "*.proximabeta.com",
    "*.igamecj.com",
    "*.pubg.com",
    "*.krafton.com",
    "*.tencentgames.com",
    "*.gcloud.qq.com",
    "*.qcloud.com",
    "*.midasbuy.com",
    "*.levelinfinite.com"
];

function isGameHost(host) {
    host = String(host).toLowerCase();
    for (var i = 0; i < GAME_HOSTS.length; i++) {
        if (shExpMatch(host, GAME_HOSTS[i])) return true;
    }
    return /(pubg|krafton|proximabeta|igamecj|levelinfinite)/.test(host);
}

/* ── شبكات خاصة + CGNAT ── */
function isPrivate(host) {
    if (isPlainHostName(host)) return true;
    var ip = resolveIP(host);
    if (!ip) return false;
    return (
        isInNet(ip, "10.0.0.0",    "255.0.0.0")    ||
        isInNet(ip, "172.16.0.0",  "255.240.0.0")  ||
        isInNet(ip, "192.168.0.0", "255.255.0.0")  ||
        isInNet(ip, "127.0.0.0",   "255.0.0.0")    ||
        isInNet(ip, "169.254.0.0", "255.255.0.0")  ||
        isInNet(ip, "100.64.0.0",  "255.192.0.0")
    );
}

/* ── الرئيسية ── */
function FindProxyForURL(url, host) {
    var h = String(host).toLowerCase();

    if (isPrivate(h)) return DIRECT;      /* محلي → مباشر   */
    if (isGameHost(h)) return BLOCK;      /* لعبة → محجوب   */

    var ip = resolveIP(h);
    if (inJordan(ip)) return DIRECT;      /* أردني → مباشر  */

    return DIRECT;                        /* الباقي يعمل    */
}
