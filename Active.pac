/* =========================================================
   🏆 JORDAN TITANIUM – GAMING SINGLE PROXY v14
   Ultra Stable | Low Latency | Single Route
   ========================================================= */

/* ==============================
   🌐 PROXY CONFIG
   ============================== */
var PROXY = "PROXY 46.185.131.218:20001";

/* ==============================
   🎮 GAMING DOMAINS (Direct)
   ============================== */
function isGaming(host){

  return (
    /* Steam */
    dnsDomainIs(host,"steampowered.com") ||
    shExpMatch(host,"*.steamcontent.com") ||
    shExpMatch(host,"*.steamstatic.com") ||

    /* Riot */
    dnsDomainIs(host,"riotgames.com") ||
    shExpMatch(host,"*.riotgames.com") ||

    /* Epic */
    dnsDomainIs(host,"epicgames.com") ||
    shExpMatch(host,"*.epicgames.com") ||

    /* PlayStation */
    shExpMatch(host,"*.playstation.net") ||

    /* Xbox */
    shExpMatch(host,"*.xboxlive.com") ||

    /* Tencent */
    shExpMatch(host,"*.tencent.com")
  );
}

/* ==============================
   🚀 MAIN ENGINE
   ============================== */
function FindProxyForURL(url, host){

  host = host.toLowerCase();

  /* ✅ Local مباشر */
  if (isPlainHostName(host))
    return "DIRECT";

  /* 🎮 الألعاب Direct (أهم نقطة للبنق) */
  if (isGaming(host))
    return "DIRECT";

  /* ✅ GitHub مباشر */
  if (dnsDomainIs(host,"github.com") ||
      shExpMatch(host,"*.githubusercontent.com"))
      return "DIRECT";

  /* ✅ YouTube مباشر لتخفيف الضغط */
  if (dnsDomainIs(host,"youtube.com") ||
      shExpMatch(host,"*.googlevideo.com") ||
      shExpMatch(host,"*.ytimg.com"))
      return "DIRECT";

  /* 🌐 باقي التصفح عبر بروكسي واحد ثابت */
  return PROXY;
}
