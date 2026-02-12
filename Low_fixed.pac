/* =========================================================
   👑 ULTRA AGGRESSIVE LOW PING MODE – GOLD EDITION
   Zero DIRECT | Single Core Lock | Ultra Stable
   Jordan Hard Priority | Tournament Optimized
   ========================================================= */

/* === PRIMARY CORE ONLY (أقصى ثبات) === */
var CORE = "PROXY 176.29.153.95:20001";

/* ==============================
   🇯🇴 JORDAN RANGES (FAST CHECK)
   ============================== */
function isJordan(host){

  var ip = dnsResolve(host);
  if (!ip) return false;

  return (
    isInNet(ip,"46.32.0.0","255.248.0.0") ||
    isInNet(ip,"37.17.0.0","255.255.0.0") ||
    isInNet(ip,"31.44.0.0","255.252.0.0") ||
    isInNet(ip,"94.249.0.0","255.255.0.0") ||
    isInNet(ip,"188.161.0.0","255.255.0.0") ||
    isInNet(ip,"89.28.0.0","255.248.0.0") ||
    isInNet(ip,"102.64.0.0","255.192.0.0") ||
    isInNet(ip,"176.28.0.0","255.255.128.0")
  );
}

/* ==============================
   🌍 GULF RANGES (STRICT)
   ============================== */
function isGulf(host){

  var ip = dnsResolve(host);
  if (!ip) return false;

  return (
    isInNet(ip,"5.0.0.0","255.128.0.0") ||
    isInNet(ip,"188.245.0.0","255.255.0.0") ||
    isInNet(ip,"213.42.0.0","255.254.0.0") ||
    isInNet(ip,"31.222.0.0","255.254.0.0") ||
    isInNet(ip,"37.210.0.0","255.254.0.0")
  );
}

/* ==============================
   🎮 ULTRA LIGHT PUBG DETECTION
   (أخف وأسرع من regex الثقيل)
   ============================== */
function isPUBG(host, url){

  var s = (host + url).toLowerCase();

  if (s.indexOf("pubg") !== -1) return true;
  if (s.indexOf("krafton") !== -1) return true;
  if (s.indexOf("tencent") !== -1) return true;
  if (s.indexOf("lightspeed") !== -1) return true;
  if (s.indexOf("qcloud") !== -1) return true;
  if (s.indexOf("proximabeta") !== -1) return true;

  if (s.indexOf("battle") !== -1) return true;
  if (s.indexOf("match") !== -1) return true;
  if (s.indexOf("arena") !== -1) return true;

  return false;
}

/* ==============================
   🚀 MAIN ENGINE – MAXIMUM STABILITY
   ============================== */
function FindProxyForURL(url, host){

  /* لا DIRECT نهائيًا */

  /* 🎮 إذا PUBG */
  if (isPUBG(host, url)){

    /* 🇯🇴 الأردن = نفس CORE */
    if (isJordan(host))
      return CORE;

    /* 🌍 الخليج = نفس CORE */
    if (isGulf(host))
      return CORE;

    /* أي شيء غير معروف */
    return CORE;
  }

  /* كل شيء يمر عبر نفس CORE */
  return CORE;
}
