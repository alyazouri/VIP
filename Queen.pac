// =====================================================
// PUBG GLOBAL – JORDAN CORE ONLY PAC
// NO DIRECT | NO FOREIGN | LONG-TERM STABLE
// =====================================================

// =======================
// JORDAN CORE PROXIES
// (Ordered by player density)
// =======================
var JO_CORE = [
  "PROXY 82.212.84.33:8080",   // Zain – highest density
  "PROXY 212.35.66.45:8080",   // Orange
  "PROXY 91.106.109.12:8080",  // Umniah
  "PROXY 46.32.102.152:8080"   // Jordan fallback
];

var BLOCK = "PROXY 127.0.0.1:9";

// =======================
// PUBG GLOBAL DOMAINS
// =======================
function isPUBG(host) {
  return shExpMatch(host, "*.pubgmobile.com") ||
         shExpMatch(host, "*.intlgame.com") ||
         shExpMatch(host, "*.tencent.com") ||
         shExpMatch(host, "*.proximabeta.com") ||
         shExpMatch(host, "*.igamecj.com");
}

// =======================
// TRAFFIC DETECTION
// =======================
function isMatchmaking(url) {
  return /match|queue|recruit|lobby|room|rank|elite|competitive/i.test(url);
}

function isVoice(url) {
  return /voice|rtc|webrtc|voip|audio|mic/i.test(url);
}

// =======================
// ISP DETECTION (LONG TERM SAFE)
// =======================
function detectISP(ip) {
  if (ip.indexOf("46.32.")  === 0 || ip.indexOf("188.161.") === 0) return "ZAIN";
  if (ip.indexOf("82.212.") === 0 || ip.indexOf("212.35.")  === 0) return "ORANGE";
  if (ip.indexOf("91.106.") === 0 || ip.indexOf("176.29.")  === 0) return "UMNIAH";
  return "OTHER";
}

// =======================
// STRONGEST JORDAN ROUTE
// =======================
function jordanChain() {
  return JO_CORE.join("; ");
}

// =======================
// MAIN FUNCTION
// =======================
function FindProxyForURL(url, host) {

  host = host.toLowerCase();

  // DNS LEAK / LOCAL BLOCK
  if (isPlainHostName(host)) {
    return BLOCK;
  }

  // ONLY PUBG IS ALLOWED
  if (!isPUBG(host)) {
    return BLOCK;
  }

  var ip  = dnsResolve(host) || "";
  var isp = detectISP(ip);

  // 🚫 Any foreign resolution → still force Jordan core
  // 🔒 Matchmaking / Ranked / Lobby
  if (isMatchmaking(url)) {
    return jordanChain();
  }

  // 🎙 Voice Chat – same identity
  if (isVoice(url)) {
    return jordanChain();
  }

  // 🎮 Any other PUBG TCP
  return jordanChain();
}
