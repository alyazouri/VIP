/* =========================================================
   JORDAN TITANIUM CORE v13.0 — UPDATED RANGES
   ═══════════════════════════════════════════════════════
   النطاقات الجديدة حسب Tier
   صفر تسريب
   ========================================================= */


/* ═══════════════════════════════════════════════════════════
   🇯🇴 البروكسيات الأردنية
   ═══════════════════════════════════════════════════════════ */

var JO1 = "PROXY 86.108.11.20:443";
var JO2 = "PROXY 86.108.108.68:80";
var JO3 = "PROXY 79.173.249.116:8080";
var JO4 = "PROXY 92.253.2.100:8080";
var KILL = "PROXY 0.0.0.0:1";


/* ═══════════════════════════════════════════════════════════
   📊 حالة الجلسة
   ═══════════════════════════════════════════════════════════ */

var _locked = null;
var _lockedHost = null;
var _lockedAt = 0;
var _failed = {};
var _blocked = 0;
var _leaks = 0;
var _total = 0;


/* ═══════════════════════════════════════════════════════════
   ⚡ دوال مساعدة
   ═══════════════════════════════════════════════════════════ */

function clean(h) {
  h = h || "";
  h = h.toLowerCase();
  h = h.replace(/^\s+|\s+$/g, "");
  h = h.replace(/^\.+|\.+$/g, "");
  return h;
}

function isIP(h) {
  if (!h) return false;
  var p = h.split(".");
  if (p.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    if (!/^\d+$/.test(p[i])) return false;
    var n = parseInt(p[i], 10);
    if (n < 0 || n > 255) return false;
  }
  return true;
}


/* ═══════════════════════════════════════════════════════════
   🇯🇴════════════════════════════════════════════════════
   ║   النطاقات الأردنية — 3 Tiers                         ║
   ║   Tier 1 = الأفضل للألعاب                             ║
   ║   Tier 2 = جيد                                        ║
   ║   Tier 3 = عادي                                       ║
   ╚══════════════════════════════════════════════════════
   ═══════════════════════════════════════════════════════════ */


/* ═══ TIER 1 — الأفضل ═══ */

function isJOTier1(h) {
  if (!isIP(h)) return false;
  return (
    isInNet(h, "86.108.0.0",    "255.255.128.0")  ||
    isInNet(h, "149.200.128.0", "255.255.128.0")  ||
    isInNet(h, "92.253.0.0",    "255.255.128.0")  ||
    isInNet(h, "94.249.0.0",    "255.255.128.0")
  );
}


/* ═══ TIER 2 — جيد ═══ */

function isJOTier2(h) {
  if (!isIP(h)) return false;
  return (
    isInNet(h, "188.247.64.0",  "255.255.224.0")  ||
    isInNet(h, "176.29.0.0",    "255.255.0.0")    ||
    isInNet(h, "46.32.96.0",    "255.255.224.0")  ||
    isInNet(h, "94.142.32.0",   "255.255.224.0")
  );
}


/* ═══ TIER 3 — عادي ═══ */

function isJOTier3(h) {
  if (!isIP(h)) return false;
  return (
    isInNet(h, "109.107.224.0", "255.255.224.0")  ||
    isInNet(h, "5.198.240.0",   "255.255.248.0")  ||
    isInNet(h, "37.152.0.0",    "255.255.248.0")  ||
    isInNet(h, "37.220.112.0",  "255.255.240.0")  ||
    isInNet(h, "37.17.192.0",   "255.255.240.0")  ||
    isInNet(h, "82.212.64.0",   "255.255.192.0")  ||
    isInNet(h, "217.144.0.0",   "255.255.240.0")
  );
}


/* ═══ أي نطاق أردني ═══ */

function isJOIP(h) {
  return isJOTier1(h) || isJOTier2(h) || isJOTier3(h);
}


/* ═══ Tier كرقم ═══ */

function getJOTier(h) {
  if (isJOTier1(h)) return 1;
  if (isJOTier2(h)) return 2;
  if (isJOTier3(h)) return 3;
  return 0;
}


/* ═══════════════════════════════════════════════════════════
   🔒 حجب أنواع التسرب
   ═══════════════════════════════════════════════════════════ */

function isIPv6(h) {
  return /:/.test(h) && h.indexOf(":") !== h.lastIndexOf(":");
}

function isWebRTC(h) {
  return /stun/.test(h) || /turn/.test(h) || /webrtc/.test(h) ||
         /ice\./.test(h) || /signaling/.test(h);
}

function isGeo(h) {
  return /geoip/.test(h) || /geo.?loc/.test(h) || /ip-api/.test(h) ||
         /ipinfo/.test(h) || /ipapi/.test(h) || /ipwhois/.test(h) ||
         /ipstack/.test(h) || /maxmind/.test(h) || /whatismyip/.test(h) ||
         /checkip/.test(h) || /ifconfig/.test(h) || /icanhazip/.test(h) ||
         /ip\.me/.test(h) || /ipify/.test(h) || /iplogger/.test(h) ||
         /grabify/.test(h) || /blasze/.test(h) || /ip\.cn/.test(h) ||
         /cip\.cc/.test(h) || /test-ipv6/.test(h) || /ipv6-test/.test(h) ||
         /myip/.test(h) || /seeip/.test(h) || /ip\.sb/.test(h) ||
         /ipleak/.test(h) || /dnsleak/.test(h) || /browserleaks/.test(h) ||
         /whoer/.test(h) || /doileak/.test(h) || /ipx\.ac/.test(h) ||
         /ip2location/.test(h) || /db-ip/.test(h) || /ip\.qq/.test(h) ||
         /ipip\.net/.test(h);
}

function isDNSLeak(h) {
  return /dns\.google/.test(h) || /cloudflare-dns/.test(h) ||
         /opendns/.test(h) || /quad9/.test(h) ||
         /adguard/.test(h) || /nextdns/.test(h) ||
         /controld/.test(h) || /cleanbrowsing/.test(h) ||
         /comodo\.com/.test(h) || /norton\.com/.test(h) ||
         /dns\.verisign/.test(h) || /dns\.switch/.test(h) ||
         /fdns/.test(h) || /doh/.test(h) || /dot\./.test(h) ||
         /dns-over/.test(h);
}

function isAnalytics(h) {
  return /google-analytics/.test(h) || /googletagmanager/.test(h) ||
         /doubleclick/.test(h) || /beacon\.qq/.test(h) ||
         /pingtas\.qq/.test(h) || /btrace\.qq/.test(h) ||
         /report\.qq/.test(h) || /sdklog/.test(h) ||
         /gameanalytics/.test(h) || /amplitude/.test(h) ||
         /mixpanel/.test(h) || /appsflyer/.test(h) ||
         /adjust\.com/.test(h) || /crashlytics/.test(h) ||
         /sentry\.io/.test(h) || /admob/.test(h) ||
         /unityads/.test(h) || /ironsrc/.test(h) ||
         /vungle/.test(h) || /applovin/.test(h) ||
         /chartboost/.test(h) || /pangle/.test(h) ||
         /mintegral/.test(h) || /firebase-analytics/.test(h) ||
         /fabric\.io/.test(h) || /bugsnag/.test(h) ||
         /instabug/.test(h) || /kochava/.test(h) ||
         /singular\.net/.test(h) || /tenjin/.test(h) ||
         /branch\.io/.test(h) || /deltaDNA/.test(h) ||
         /segment\.io/.test(h) || /segment\.com/.test(h) ||
         /facebook\.com\/tr/.test(h) || /connect\.facebook/.test(h) ||
         /pixel\.facebook/.test(h) || /graph\.facebook/.test(h) ||
         /adservice\.google/.test(h) || /googleadservices/.test(h) ||
         /googlesyndication/.test(h) || /pagead/.test(h) ||
         /toponad/.test(h) || /bidmachine/.test(h) ||
         /adcolony/.test(h) || /startapp/.test(h) ||
         /fyber/.test(h) || /smaato/.test(h) ||
         /mobfox/.test(h) || /mopub/.test(h) ||
         /admost/.test(h) || /tapjoy/.test(h) ||
         /inmobi/.test(h);
}

function isDeviceLeak(h) {
  return (
    /fcm\.googleapis/.test(h) || /fcmregistrations/.test(h) ||
    /gcm-http/.test(h) || /gcm\.googleapis/.test(h) ||
    /courier\.push\.apple/.test(h) || /push-apple/.test(h) ||
    /api\.push\.apple/.test(h) || /gateway\.push\.apple/.test(h) ||
    /push\.hicloud/.test(h) || /hwpush/.test(h) ||
    /push\.mi\.com/.test(h) || /mipush/.test(h) ||
    /push\.samsungosp/.test(h) || /samsungpush/.test(h) ||
    /play\.google\.com/.test(h) || /play-games\.google/.test(h) ||
    /play-fe\.google/.test(h) || /play\.googleapis/.test(h) ||
    /android\.clients\.google/.test(h) ||
    /apps\.apple\.com/.test(h) || /appstore\.apple/.test(h) ||
    /itunes\.apple\.com/.test(h) || /itunes\.connect\.apple/.test(h) ||
    /buy\.itunes\.apple/.test(h) || /sandbox\.itunes\.apple/.test(h) ||
    /xp\.apple\.com/.test(h) || /gs-loc\.apple/.test(h) ||
    /swcdn\.apple/.test(h) || /swdist\.apple/.test(h) ||
    /updates\.apple/.test(h) || /appldnld\.apple/.test(h) ||
    /appgallery\.huawei/.test(h) || /store-drcn/.test(h) ||
    /store-drru/.test(h) || /appmarket\.huawei/.test(h) ||
    /galaxystore\.samsung/.test(h) || /samsungapps/.test(h) ||
    /time\.android/.test(h) || /time\.google/.test(h) ||
    /ntp\.org/.test(h) ||
    /connectivitycheck/.test(h) || /generate_204/.test(h) ||
    /captiveportal/.test(h) || /network-test/.test(h) ||
    /clients3\.google/.test(h) || /clients[0-9]\.google/.test(h) ||
    /carrier/.test(h) || /operator/.test(h) ||
    /cellular/.test(h) || /mobileconfig/.test(h)
  );
}

function isLocationLeak(h) {
  return (
    /weather/.test(h) || /accuweather/.test(h) ||
    /weather\.com/.test(h) || /openweathermap/.test(h) ||
    /wunderground/.test(h) || /yr\.no/.test(h) ||
    /maps\.google/.test(h) || /maps\.apple/.test(h) ||
    /waze\.com/.test(h) || /here\.com/.test(h) ||
    /mapbox/.test(h) || /tomtom/.test(h) ||
    /news\.google/.test(h) || /news\.apple/.test(h) ||
    /ads\.google/.test(h) || /adservice/.test(h) ||
    /ads\.yahoo/.test(h) || /ads\.facebook/.test(h) ||
    /ad\.doubleclick/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🇯🇴 فحص النطاقات الأردنية
   ═══════════════════════════════════════════════════════════ */

function isJO(h) {
  h = clean(h);
  return /\.jo$/.test(h) || /jordan/.test(h) || /amman/.test(h) ||
         /irbid/.test(h) || /zarqa/.test(h) || /aqaba/.test(h) ||
         /petra/.test(h) || /deadsea/.test(h) || /jerash/.test(h) ||
         /orange\.jo/.test(h) || /zain\.jo/.test(h) ||
         /umniah/.test(h) || /damamax/.test(h);
}


/* ═══════════════════════════════════════════════════════════
   🎮 كشف PUBG
   ═══════════════════════════════════════════════════════════ */

function isPUBG(h, u) {
  h = clean(h);
  u = (u || "").toLowerCase();
  var s = h + " " + u;

  return (
    /pubg/.test(s) || /pubgm/.test(s) || /pubgmobile/.test(s) ||
    /pubgsea/.test(s) || /pubgkr/.test(s) || /pubgcs/.test(s) ||
    /newstate/.test(s) ||
    /krafton/.test(s) || /tencent/.test(s) || /lightspeed/.test(s) ||
    /proximabeta/.test(s) || /igame/.test(s) || /garena/.test(s) ||
    /levelinfinite/.test(s) || /timi/.test(s) || /quantum/.test(s) ||
    /qcloud/.test(s) || /myqcloud/.test(s) || /tencentcs/.test(s) ||
    /tencent-cloud/.test(s) || /tencentcos/.test(s) || /tencentcdn/.test(s) ||
    /gtimg/.test(s) || /qpic\.cn/.test(s) || /idqqimg/.test(s) ||
    /amazonaws/.test(s) || /cloudfront/.test(s) || /awsglobalaccelerator/.test(s) ||
    /aliyun/.test(s) || /alibaba/.test(s) || /alicdn/.test(s) ||
    /googleapis/.test(s) || /gstatic/.test(s) || /googleusercontent/.test(s) ||
    /firebase/.test(s) || /azure/.test(s) || /msecnd/.test(s) ||
    /fastly/.test(s) || /cloudflare/.test(s) || /akamai/.test(s) ||
    /matchmaking/.test(s) || /matchmaker/.test(s) || /gameserver/.test(s) ||
    /gamesession/.test(s) || /sessionserver/.test(s) || /dispatcher/.test(s) ||
    /lobby/.test(s) || /roomserver/.test(s) || /chatserver/.test(s) ||
    /friendserver/.test(s) || /rankserver/.test(s) || /inventory/.test(s) ||
    /shopserver/.test(s) || /clanserver/.test(s) || /telemetry/.test(s) ||
    /anticheat/.test(s) || /anti[-_]?cheat/.test(s) ||
    /erangel/.test(s) || /livik/.test(s) || /sanhok/.test(s) ||
    /miramar/.test(s) || /vikendi/.test(s) || /karakin/.test(s) ||
    /nusa/.test(s) || /taego/.test(s) || /deston/.test(s) ||
    /paramo/.test(s) || /haven/.test(s) || /rondo/.test(s) ||
    /tdm/.test(s) || /teamdeathmatch/.test(s) || /payload/.test(s) ||
    /metroroyale/.test(s) || /arena/.test(s) || /ranked/.test(s) ||
    /classic/.test(s) || /arcade/.test(s) ||
    (/(\/api\/|\/v1\/|\/v2\/|\/v3\/)/.test(u) &&
     /(game|match|session|battle|player|server|region)/.test(u)) ||
    (/(serverlist|routing|server[-_]?select|region[-_]?select)/.test(u) &&
     /(game|match|player|pubg|tencent|krafton)/.test(s)) ||
    /(me[-_]?east|mena|middle[-_]?east|dubai|uae|riyadh|jeddah|amman)/.test(s) ||
    /(region=me|region=mena|server=me)/.test(u)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 نطاقات PUBG المعروفة
   ═══════════════════════════════════════════════════════════ */

var PUBG_DOMAINS = {
  "pubgmobile.com": true, "pubg.com": true, "pubgmobile.kr": true,
  "pubgmobile.live": true, "tencent.com": true, "tencentgames.com": true,
  "igamecj.com": true, "qcloud.com": true, "myqcloud.com": true,
  "tencent-cloud.net": true, "gtimg.cn": true, "qpic.cn": true,
  "krafton.com": true, "levelinfinite.com": true, "lightspeedpc.com": true,
  "proximabeta.com": true, "garena.com": true, "qq.com": true,
  "weixin.com": true, "tencentcloud.com": true, "dnspod.cn": true,
  "qcloudcdn.com": true, "tencentcos.cn": true
};

function isKnownPUBG(h) {
  h = clean(h);
  if (PUBG_DOMAINS[h]) return true;
  var p = h.split(".");
  for (var i = 0; i < p.length - 1; i++) {
    if (PUBG_DOMAINS[p.slice(i).join(".")]) return true;
  }
  return false;
}


/* ═══════════════════════════════════════════════════════════
   🎯 تصنيف حركة المرور
   ═══════════════════════════════════════════════════════════ */

function classify(h, u) {
  h = clean(h);
  u = (u || "").toLowerCase();
  _total++;

  if (isIPv6(h))          { _blocked++; _leaks++; return "KILL"; }
  if (isWebRTC(h))        { _blocked++; _leaks++; return "KILL"; }
  if (isGeo(h))           { _blocked++; _leaks++; return "KILL"; }
  if (isDNSLeak(h))       { _blocked++; _leaks++; return "KILL"; }
  if (isAnalytics(h))     { _blocked++; return "KILL"; }
  if (isDeviceLeak(h))    { _blocked++; _leaks++; return "KILL"; }
  if (isLocationLeak(h))  { _blocked++; _leaks++; return "KILL"; }

  return "PROXY";
}


/* ═══════════════════════════════════════════════════════════
   🔄 Failover
   ═══════════════════════════════════════════════════════════ */

function isOK(proxy) {
  var f = _failed[proxy];
  if (!f) return true;
  if ((new Date().getTime() - f) > 30000) {
    delete _failed[proxy];
    return true;
  }
  return false;
}


/* ═══════════════════════════════════════════════════════════
   🎯 اختيار البروكسي
   ═══════════════════════════════════════════════════════════ */

function pickProxy() {
  if (isOK(JO1)) return JO1;
  if (isOK(JO2)) return JO2;
  if (isOK(JO3)) return JO3;
  if (isOK(JO4)) return JO4;
  _failed = {};
  return JO1;
}


/* ═══════════════════════════════════════════════════════════
   🔗 Sticky Session
   ═══════════════════════════════════════════════════════════ */

function getGroup(h) {
  h = clean(h);
  if (/pubg/.test(h)) return "pubg";
  if (/tencent/.test(h)) return "tencent";
  if (/krafton/.test(h)) return "krafton";
  if (/lightspeed/.test(h)) return "lightspeed";
  if (/proximabeta/.test(h)) return "proximabeta";
  if (/qcloud/.test(h)) return "qcloud";
  if (/amazonaws/.test(h)) return "aws";
  if (/aliyun/.test(h)) return "aliyun";
  if (/facebook/.test(h)) return "facebook";
  if (/google/.test(h)) return "google";
  if (isJO(h)) return "jordan";
  return h;
}

function sticky(h) {
  if (_locked !== null) {
    if ((new Date().getTime() - _lockedAt) < 300000) {
      if (getGroup(h) === getGroup(_lockedHost)) {
        return _locked;
      }
    }
    _locked = null;
  }
  return null;
}

function lock(proxy, h) {
  _locked = proxy;
  _lockedHost = h;
  _lockedAt = new Date().getTime();
}


/* ═══════════════════════════════════════════════════════════
   🚀 FindProxyForURL
   ═══════════════════════════════════════════════════════════ */

function FindProxyForURL(url, host) {

  host = clean(host);
  url = url || "";

  var action = classify(host, url);

  if (action === "KILL") {
    return KILL;
  }

  var s = sticky(host);
  if (s !== null) {
    return s;
  }

  var proxy = pickProxy();
  lock(proxy, host);
  return proxy;
}


/* ═══════════════════════════════════════════════════════════
   📊 Debug
   ═══════════════════════════════════════════════════════════ */

function debugPAC(host, url) {
  host = clean(host || "");
  url = url || "";
  return {
    host: host,
    url: url,
    action: classify(host, url),
    proxy: FindProxyForURL(url, host),
    isPUBG: isPUBG(host, url),
    isKnownPUBG: isKnownPUBG(host),
    isJordanian: isJO(host),
    isJordanIP: isJOIP(host),
    jordanTier: getJOTier(host),
    isIPv6: isIPv6(host),
    isWebRTC: isWebRTC(host),
    isGeo: isGeo(host),
    isDNSLeak: isDNSLeak(host),
    isAnalytics: isAnalytics(host),
    isDeviceLeak: isDeviceLeak(host),
    isLocationLeak: isLocationLeak(host),
    stats: {
      total: _total,
      blocked: _blocked,
      leaks: _leaks
    }
  };
}
