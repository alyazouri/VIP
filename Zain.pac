// =====================================================
// PUBG GLOBAL – GOLDEN JORDAN LOCK (ULTRA HARD)
// Maximum Jordanian Matchmaking – Long Term
// =====================================================

// =====================================================
// 🔥 SINGLE JORDAN IDENTITY (ASN UNIFICATION)
// =====================================================
// أعلى كثافة لاعبين بالأردن (فعلياً)
var JO_IDENTITY = "PROXY 82.212.84.33:8080"; // Zain Core ASN

// أردني فقط – احتياط صامت (لا يستخدم إلا إذا الأساسي سقط)
var JO_BACKUP   = "PROXY 212.35.66.45:8080"; // Orange

// قطع كامل
var BLOCK = "PROXY 127.0.0.1:9";

// =====================================================
// PUBG GLOBAL DOMAINS (STABLE – LONG TERM)
// =====================================================
function isPUBG(host) {
  return shExpMatch(host, "*.pubgmobile.com") ||
         shExpMatch(host, "*.intlgame.com") ||
         shExpMatch(host, "*.tencent.com") ||
         shExpMatch(host, "*.proximabeta.com") ||
         shExpMatch(host, "*.igamecj.com");
}

// =====================================================
// MATCH / REGION DECISION POINTS
// =====================================================
function isCritical(url) {
  return /match|queue|recruit|lobby|room|rank|elite|competitive|season/i.test(url);
}

function isVoice(url) {
  return /voice|rtc|webrtc|voip|audio|mic/i.test(url);
}

// =====================================================
// MAIN PAC LOGIC
// =====================================================
function FindProxyForURL(url, host) {

  host = host.toLowerCase();

  // 🚫 DNS / LOCAL / LEAK
  if (isPlainHostName(host)) {
    return BLOCK;
  }

  // 🚫 أي شيء غير PUBG
  if (!isPUBG(host)) {
    return BLOCK;
  }

  // ===================================================
  // 🔒 GOLDEN RULE:
  // Matchmaking + Lobby + Voice = SAME ASN ALWAYS
  // ===================================================

  // 🧲 مرحلة تحديد السيرفر (الأهم)
  if (isCritical(url)) {
    return JO_IDENTITY;
  }

  // 🎙 Voice Chat – نفس الهوية (مهم جدًا)
  if (isVoice(url)) {
    return JO_IDENTITY;
  }

  // 🎮 أي TCP آخر داخل PUBG
  return JO_IDENTITY;
}
