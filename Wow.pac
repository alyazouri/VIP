// =====================================================
// PUBG GLOBAL – JORDAN ONLY EXTREME (ISP-AWARE FINAL)
// ROUTE BY ISP | PEAK SAFE | FAIL FAST | NO FOREIGN
// =====================================================

// =======================
// JORDAN CORE PROXIES
// =======================

// 🔥 8080 – PRIMARY (ALL ISPs)
var ZAIN_8080     = ["PROXY 82.212.84.33:8080"];
var ORANGE_8080   = ["PROXY 212.35.66.45:8080"];
var UMNIAH_8080   = ["PROXY 91.106.109.12:8080"];
var FALLBACK_8080 = ["PROXY 46.32.102.152:8080"];

// ⏱ 3128 – OFF PEAK (NO UMNIAH)
var ZAIN_3128     = ["PROXY 82.212.84.33:3128"];
var ORANGE_3128   = ["PROXY 212.35.66.45:3128"];
var FALLBACK_3128 = ["PROXY 46.32.102.152:3128"];

// ⛔ HARD BLOCK (FAIL FAST)
var BLOCK = "PROXY 127.0.0.1:9";

// =======================
// PUBG DOMAINS (STRICT)
// =======================
function isPUBG(host) {
  return shExpMatch(host, "*.pubgmobile.com") ||
         shExpMatch(host, "*.intlgame.com") ||
         shExpMatch(host, "*.tencent.com") ||
         shExpMatch(host, "*.proximabeta.com") ||
         shExpMatch(host, "*.igamecj.com");
}

// =======================
// TRAFFIC CLASSIFICATION
// =======================
function isMatchmaking(url) {
  return /match|queue|recruit|lobby|room|rank|elite|competitive/i.test(url);
}

function isVoice(url) {
  return /voice|rtc|webrtc|voip|audio|mic/i.test(url);
}

// =======================
// ISP DETECTION (STABLE)
// =======================
function detectISP(ip) {
  if (ip.indexOf("82.212.") === 0 || ip.indexOf("46.32.") === 0)
    return "ZAIN";

  if (ip.indexOf("212.35.") === 0 || ip.indexOf("188.161.") === 0)
    return "ORANGE";

  if (ip.indexOf("91.106.") === 0 || ip.indexOf("176.29.") === 0)
    return "UMNIAH";

  return "OTHER";
}

// =======================
// PEAK TIME – JORDAN
// 16:00 → 01:00
// =======================
function isPeakHour() {
  var h = new Date().getHours();
  return (h >= 16 || h <= 1);
}

// =======================
// ISP-AWARE CHAINS
// =======================
function chain8080ByISP(isp) {
  if (isp === "ZAIN")
    return ZAIN_8080.concat(ORANGE_8080, UMNIAH_8080, FALLBACK_8080).join("; ");

  if (isp === "ORANGE")
    return ORANGE_8080.concat(ZAIN_8080, UMNIAH_8080, FALLBACK_8080).join("; ");

  if (isp === "UMNIAH")
    return UMNIAH_8080.concat(ZAIN_8080, ORANGE_8080, FALLBACK_8080).join("; ");

  return FALLBACK_8080.join("; ");
}

function chain3128ByISP(isp) {
  if (isp === "ZAIN")
    return ZAIN_3128.concat(ORANGE_3128, FALLBACK_3128).join("; ");

  if (isp === "ORANGE")
    return ORANGE_3128.concat(ZAIN_3128, FALLBACK_3128).join("; ");

  return FALLBACK_3128.join("; ");
}

// =======================
// MAIN FUNCTION
// =======================
function FindProxyForURL(url, host) {

  host = host.toLowerCase();

  // 🚫 DNS / LOCAL LEAK
  if (isPlainHostName(host)) {
    return BLOCK;
  }

  // 🚫 NON-PUBG TRAFFIC
  if (!isPUBG(host)) {
    return BLOCK;
  }

  var ip  = dnsResolve(host) || "";
  var isp = detectISP(ip);

  // 🔒 MATCHMAKING / RANKED / LOBBY
  if (isMatchmaking(url)) {
    return chain8080ByISP(isp);
  }

  // 🎙 VOICE CHAT
  if (isVoice(url)) {
    return chain8080ByISP(isp);
  }

  // ⏱ NORMAL PUBG TRAFFIC
  if (isPeakHour()) {
    return chain8080ByISP(isp);
  } else {
    return chain3128ByISP(isp);
  }
}
