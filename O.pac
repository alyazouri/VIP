// ======================================================
// PAC – PUBG Mobile الأردن (محلي) + UDP / HTTP Proxy
// تحديث: نطاقات IPv4 & IPv6 كاملة لـ Tencent / PUBG
// ======================================================

var FORCE_ALL   = true;   // إجبار كل الاتصالات على البروكسي
var BLOCK_IR    = true;   // حظر نطاقات .ir
var ENABLE_SOCKS = true;  // تفعيل SOCKS5
var ENABLE_HTTP  = true;  // تفعيل HTTP Proxy

// البروكسي المحلي + بورتات UDP للعبة
var FIXED_PROXY = {
  ip: "91.106.109.12",
  socksPorts: [20000, 20001, 20002, 40000, 40001, 8000, 8001, 30000],
  httpPorts:  [8080, 8081, 8085, 8087, 8088, 8880],
  http3: true
};

// ===================== DOMAINS ========================
var GAME_DOMAINS = [
  "igamecj.com", "igamepubg.com", "pubgmobile.com", "tencentgames.com",
  "proximabeta.com", "proximabeta.net", "tencentyun.com", "qcloud.com",
  "qcloudcdn.com", "gtimg.com", "game.qq.com", "cdn-ota.qq.com",
  "cdngame.tencentyun.com", "gcloud.qq.com", "gpubgm.com",
  "amsoveasea.com", "dnsv1.com", "myqcloud.com", "dnspod.com",
  "tencent-cloud.net", "tencentcloudapi.com", "tcloudbaseapp.com"
];

var LOCAL_DOMAINS = [
  "pubg.jo", "jo-gaming.net", "localmatch.pubg.com",
  "matchmaking.jo", "pubg-local.jo", "jo-server.pubg.com"
];

var KEYWORDS = [
  "pubg", "tencent", "proximabeta", "tencentyun",
  "qcloud", "gcloud", "gpubgm", "igamepubg"
];

// ==================== IPv4 CIDR =======================
// نطاقات Tencent Cloud الرئيسية (AS132203 / AS133478)
// تغطي خوادم PUBG Mobile في آسيا / الشرق الأوسط / عالمياً
var IPV4_RANGES = [
  // --- Tencent Cloud International ---
  ["1.12.0.0",    "255.252.0.0"],   // 1.12.0.0/14
  ["43.128.0.0",  "255.252.0.0"],   // 43.128.0.0/14
  ["43.132.0.0",  "255.252.0.0"],   // 43.132.0.0/14
  ["43.136.0.0",  "255.252.0.0"],   // 43.136.0.0/14
  ["43.140.0.0",  "255.252.0.0"],   // 43.140.0.0/14
  ["43.148.0.0",  "255.252.0.0"],   // 43.148.0.0/14
  ["43.152.0.0",  "255.252.0.0"],   // 43.152.0.0/14  (Singapore/SEA)
  ["43.156.0.0",  "255.252.0.0"],   // 43.156.0.0/14
  ["43.158.0.0",  "255.254.0.0"],   // 43.158.0.0/15
  ["43.160.0.0",  "255.252.0.0"],   // 43.160.0.0/14
  ["43.164.0.0",  "255.252.0.0"],   // 43.164.0.0/14  (Singapore/SEA)
  ["43.168.0.0",  "255.252.0.0"],   // 43.168.0.0/14
  ["43.172.0.0",  "255.252.0.0"],   // 43.172.0.0/14
  ["43.176.0.0",  "255.240.0.0"],   // 43.176.0.0/12  (بلوك كبير)
  ["49.51.0.0",   "255.255.128.0"], // 49.51.0.0/17
  // --- Tencent Cloud China/HK ---
  ["101.32.0.0",  "255.248.0.0"],   // 101.32.0.0/13
  ["103.41.133.0","255.255.255.0"], // 103.41.133.0/24
  ["119.28.0.0",  "255.252.0.0"],   // 119.28.0.0/14
  ["120.232.0.0", "255.252.0.0"],   // 120.232.0.0/14
  ["124.156.0.0", "255.252.0.0"],   // 124.156.0.0/14
  ["129.226.0.0", "255.252.0.0"],   // 129.226.0.0/14
  ["150.109.0.0", "255.255.0.0"],   // 150.109.0.0/16
  ["156.240.0.0", "255.255.0.0"],   // 156.240.0.0/16
  ["162.62.0.0",  "255.254.0.0"],   // 162.62.0.0/15  (PUBG Mobile معروف)
  ["170.106.0.0", "255.255.0.0"],   // 170.106.0.0/16
  ["175.27.0.0",  "255.255.0.0"],   // 175.27.0.0/16
  ["203.205.0.0", "255.255.192.0"], // 203.205.0.0/18
  ["211.152.0.0", "255.255.192.0"], // 211.152.0.0/18
  // --- نطاقات إضافية موثقة في PUBG Mobile ---
  ["134.175.0.0", "255.255.0.0"],   // 134.175.0.0/16
  ["140.143.0.0", "255.255.0.0"],   // 140.143.0.0/16
  ["193.112.0.0", "255.255.0.0"],   // 193.112.0.0/16
  ["212.129.0.0", "255.255.0.0"],   // 212.129.0.0/16
  ["119.29.0.0",  "255.255.0.0"],   // 119.29.0.0/16
  ["125.94.0.0",  "255.254.0.0"],   // 125.94.0.0/15
  ["43.159.0.0",  "255.255.0.0"]    // 43.159.0.0/16  (Anycast CDN موثق)
];

// ==================== IPv6 PREFIXES ===================
// نطاقات IPv6 لـ Tencent Cloud (AS132203 / AS133478)
var IPV6_PREFIXES = [
  "2402:4e00:",   // Tencent Cloud International /32
  "2402:4e00:1",  // sub-range /40
  "2402:4e00:2",  // sub-range /40
  "2409:8c00:",   // Tencent Cloud China
  "2409:8c1e:",   // Tencent Cloud
  "2409:8c54:",   // Tencent Cloud
  "2409:8c80:",   // Tencent Cloud
  "2409:8c08:",   // Tencent Cloud
  "240e:0:a:",    // Tencent CDN
  "2408:871a:",   // Tencent / QQ
  "2408:8756:",   // Tencent Cloud
  "2a0a:e5c0:",   // Tencent Cloud EU
  "2a0a:e5c1:",   // Tencent Cloud EU
  "2603:1020:200:", // Tencent Cloud region
  "2001:250:",    // CERNET China (بعض خوادم QQ)
  "240c::",       // Tencent-affiliated
  "2001:4860:"    // Google/Anycast (CDN مستخدم أحياناً)
];

// ======================= HELPERS =======================
function bracketHost(ip) {
  return (ip.indexOf(":") !== -1 && ip.indexOf(".") === -1)
    ? "[" + ip + "]" : ip;
}

function hostInList(h, list) {
  h = (h || "").toLowerCase();
  for (var i = 0; i < list.length; i++) {
    var d = list[i].toLowerCase();
    if (h === d || h === d + ":" || h.indexOf("." + d) !== -1
        || shExpMatch(h, "*." + d) || dnsDomainIs(h, d)) {
      return true;
    }
  }
  return false;
}

function hasKeyword(s) {
  s = (s || "").toLowerCase();
  for (var i = 0; i < KEYWORDS.length; i++) {
    if (s.indexOf(KEYWORDS[i]) !== -1) return true;
  }
  return false;
}

function isIranTLD(host) {
  host = (host || "").toLowerCase();
  return host === "ir" || host.slice(-3) === ".ir"
      || host.indexOf(".ir.") !== -1;
}

// فحص IPv4 ضمن CIDR باستخدام isInNet
function isIPv4InRanges(host) {
  for (var i = 0; i < IPV4_RANGES.length; i++) {
    if (isInNet(host, IPV4_RANGES[i][0], IPV4_RANGES[i][1])) {
      return true;
    }
  }
  return false;
}

// فحص IPv6 بمطابقة البادئة (Prefix match)
// PAC لا يدعم isInNet لـ IPv6 — نستخدم مقارنة النص
function isIPv6InRanges(host) {
  // إزالة الأقواس إن وجدت
  var h = (host || "").toLowerCase()
           .replace(/^\[/, "").replace(/\]$/, "");
  // يجب أن يحتوي على ":" ليكون IPv6
  if (h.indexOf(":") === -1) return false;
  for (var i = 0; i < IPV6_PREFIXES.length; i++) {
    if (h.indexOf(IPV6_PREFIXES[i].toLowerCase()) === 0) {
      return true;
    }
  }
  return false;
}

// هل العنوان IP مباشرة (وليس اسم نطاق)؟
function isIPAddress(host) {
  return /^[\d.]+$/.test(host) || /^[\[0-9a-fA-F:]+\]?$/.test(host);
}

// ===================== BUILD PROXY =====================
function buildTokens(proxy) {
  if (!proxy) return [];
  var toks = [];
  var host = bracketHost(proxy.ip);
  if (ENABLE_SOCKS) {
    var sp = proxy.socksPorts || [];
    for (var s = 0; s < sp.length; s++) {
      toks.push("SOCKS5 " + host + ":" + sp[s]);
    }
  }
  if (ENABLE_HTTP) {
    var hp = proxy.httpPorts || [];
    for (var h = 0; h < hp.length; h++) {
      toks.push("PROXY " + host + ":" + hp[h]);
    }
  }
  return toks;
}

function buildProxyChain() {
  var all = buildTokens(FIXED_PROXY);
  return (all.length === 0) ? "PROXY 127.0.0.1:9" : all.join("; ");
}

// ======================= MAIN ==========================
function FindProxyForURL(url, host) {
  host = host || url;

  // 1. حظر نطاقات إيران
  if (BLOCK_IR && isIranTLD(host)) return "PROXY 127.0.0.1:9";

  // 2. عناوين IP مباشرة → فحص النطاقات
  if (isIPAddress(host)) {
    if (isIPv4InRanges(host) || isIPv6InRanges(host)) {
      return buildProxyChain();
    }
  }

  // 3. دومينات اللعبة / الكلمات المفتاحية
  if (hostInList(host, GAME_DOMAINS)
   || hostInList(host, LOCAL_DOMAINS)
   || hasKeyword(host)
   || hasKeyword(url)) {
    return buildProxyChain();
  }

  // 4. باقي المواقع إجبارياً (FORCE_ALL)
  if (FORCE_ALL) return buildProxyChain();

  // 5. قطع الاتصال (fallback)
  return "PROXY 127.0.0.1:9";
}
