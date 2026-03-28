// ======================================================
// PAC – PUBG Mobile الأردن (Zain JO) + UDP / HTTP Proxy
// نطاقات Zain Jordan فقط – AS8697
// IPv4: نطاقات Zain المُعلنة | IPv6: بادئات Zain
// ======================================================

var FORCE_ALL    = true;
var BLOCK_IR     = true;
var ENABLE_SOCKS = true;
var ENABLE_HTTP  = true;

var FIXED_PROXY = {
  ip: "91.106.109.50",
  socksPorts: [20000, 20001, 20002, 40000, 40001, 8000, 8001, 30000],
  httpPorts:  [8080, 8081, 8085, 8087, 8088, 8880],
  http3: true
};

// ===================== DOMAINS ========================
var GAME_DOMAINS = [
  "igamecj.com","igamepubg.com","pubgmobile.com","tencentgames.com",
  "proximabeta.com","proximabeta.net","tencentyun.com","qcloud.com",
  "qcloudcdn.com","gtimg.com","game.qq.com","cdn-ota.qq.com",
  "cdngame.tencentyun.com","gcloud.qq.com","gpubgm.com",
  "amsoveasea.com","dnsv1.com","myqcloud.com","tencentcloudapi.com"
];
var LOCAL_DOMAINS = [
  "pubg.jo","jo-gaming.net","localmatch.pubg.com",
  "matchmaking.jo","pubg-local.jo","jo-server.pubg.com",
  // نطاقات Zain الأردن الرسمية
  "zain.jo","jo.zain.com","zain.com","zainjordan.com",
  "myzain.jo","api.zain.jo","cdn.zain.jo"
];
var KEYWORDS = ["pubg","tencent","proximabeta","tencentyun","qcloud","gcloud","igamepubg"];

// ========= IPv4 – Zain Jordan (AS8697) فقط =========
var JO_IPV4 = [
  ["91.106.96.0",   "255.255.240.0"],   // 91.106.96.0/20  — يشمل البروكسي 91.106.109.x
  ["176.28.128.0",  "255.255.128.0"],   // 176.28.128.0/17
  ["82.212.64.0",   "255.255.192.0"],   // 82.212.64.0/18
  ["37.202.64.0",   "255.255.192.0"],   // 37.202.64.0/18
  ["94.249.0.0",    "255.255.128.0"],   // 94.249.0.0/17
  ["149.200.128.0", "255.255.128.0"],   // 149.200.128.0/17
  ["178.77.128.0",  "255.255.192.0"],   // 178.77.128.0/18
  ["37.152.0.0",    "255.255.248.0"],   // 37.152.0.0/21
  ["37.220.112.0",  "255.255.240.0"],   // 37.220.112.0/20
  ["46.185.128.0",  "255.255.128.0"],   // 46.185.128.0/17
  ["92.253.0.0",    "255.255.128.0"],   // 92.253.0.0/17
  ["95.172.192.0",  "255.255.224.0"],   // 95.172.192.0/19
  ["188.247.64.0",  "255.255.224.0"]    // 188.247.64.0/19
];

// ========= IPv6 – Zain Jordan (AS8697) فقط =========
var JO_IPV6 = [
  "2a00:18d0:",    // /32 — Zain JO
  "2a00:18d8:",    // /29 — Zain JO
  "2a01:9700:",    // /29
  "2a02:c040:",    // /29
  "2a05:74c0:"     // /29
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
    if (h === d || h.indexOf("." + d) !== -1
        || shExpMatch(h, "*." + d) || dnsDomainIs(h, d)) return true;
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
function isIranTLD(h) {
  h = (h || "").toLowerCase();
  return h === "ir" || h.slice(-3) === ".ir" || h.indexOf(".ir.") !== -1;
}
function isJoIPv4(host) {
  for (var i = 0; i < JO_IPV4.length; i++) {
    if (isInNet(host, JO_IPV4[i][0], JO_IPV4[i][1])) return true;
  }
  return false;
}
function isJoIPv6(host) {
  var h = (host || "").toLowerCase().replace(/^\[/,"").replace(/\]$/,"");
  if (h.indexOf(":") === -1) return false;
  for (var i = 0; i < JO_IPV6.length; i++) {
    if (h.indexOf(JO_IPV6[i].toLowerCase()) === 0) return true;
  }
  return false;
}
function isIPAddress(host) {
  return /^[\d.]+$/.test(host) || /^[\[0-9a-fA-F:]+\]?$/.test(host);
}

// ===================== BUILD PROXY =====================
function buildTokens(proxy) {
  if (!proxy) return [];
  var toks = [], host = bracketHost(proxy.ip);
  if (ENABLE_SOCKS) {
    var sp = proxy.socksPorts || [];
    for (var s = 0; s < sp.length; s++) toks.push("SOCKS5 " + host + ":" + sp[s]);
  }
  if (ENABLE_HTTP) {
    var hp = proxy.httpPorts || [];
    for (var h = 0; h < hp.length; h++) toks.push("PROXY " + host + ":" + hp[h]);
  }
  return toks;
}
function buildProxyChain() {
  var all = buildTokens(FIXED_PROXY);
  return all.length === 0 ? "PROXY 127.0.0.1:9" : all.join("; ");
}

// ======================= MAIN ==========================
function FindProxyForURL(url, host) {
  host = host || url;

  // 1. حظر إيران
  if (BLOCK_IR && isIranTLD(host)) return "PROXY 127.0.0.1:9";

  // 2. IP ضمن نطاقات Zain → بروكسي
  if (isIPAddress(host) && (isJoIPv4(host) || isJoIPv6(host)))
    return buildProxyChain();

  // 3. دومينات اللعبة / Zain / كلمات مفتاحية → بروكسي
  if (hostInList(host, GAME_DOMAINS) || hostInList(host, LOCAL_DOMAINS)
      || hasKeyword(host) || hasKeyword(url))
    return buildProxyChain();

  // 4. FORCE_ALL → كل شيء عبر البروكسي (تبدو الحركة صادرة من Zain)
  if (FORCE_ALL) return buildProxyChain();

  // 5. fallback
  return "PROXY 127.0.0.1:9";
}
