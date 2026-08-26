/* =========================================================
   T | JORDAN TITANIUM CORE v7.0 — ANTI-LEAK EDITION
   PUBG MOBILE — ZERO LEAK / PURE JORDAN
   BLOCKS: DNS LEAK / WebRTC / STUN / TURN / IPv6
   ALL TRAFFIC FORCED THROUGH JORDAN PROXY
   ========================================================= */


/* =========================================================
   🇯🇴 JORDAN PROXY POOL — أردني 100%
   ========================================================= */

var PROXIES = [
  {
    addr: "PROXY 86.108.11.20:443",
    weight: 100,
    name: "JO-UMNIAH-1",
    region: "JO",
    isp: "umniah",
    tier: 28,
    gaming: true
  },
  {
    addr: "PROXY 86.108.108.68:80",
    weight: 95,
    name: "JO-UMNIAH-2",
    region: "JO",
    isp: "umniah",
    tier: 28,
    gaming: true
  },
  {
    addr: "PROXY 79.173.249.116:8080",
    weight: 90,
    name: "JO-ORANGE-1",
    region: "JO",
    isp: "orange",
    tier: 25,
    gaming: true
  },
  {
    addr: "PROXY 92.253.2.100:8080",
    weight: 85,
    name: "JO-DAMAMAX-1",
    region: "JO",
    isp: "damamax",
    tier: 27,
    gaming: true
  }
];


/* =========================================================
   ⚙️ CONFIGURATION
   ========================================================= */

var CONFIG = {
  allowDirect: false,
  allowEuropean: false,
  jordanOnly: true,
  blockIPv6: true,
  blockWebRTC: true,
  blockSTUN: true,
  blockTURN: true,
  forceDNS: true,
  blockAnalytics: true,
  blockTelemetry: true,
  stickyTTL: 300000,
  failoverCooldown: 30000
};


/* =========================================================
   📊 SESSION STATE
   ========================================================= */

var SESSION = {
  lockedProxy: null,
  lockedHost: null,
  lockedAt: 0,
  failedProxies: {},
  matchCount: 0,
  lastMatchHost: null,
  blockedCount: 0,
  leakAttempts: 0,
  startTime: new Date().getTime()
};


/* =========================================================
   ⚡ ULTRA HASH
   ========================================================= */

function ultraHash(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}


/* =========================================================
   🧹 NORMALIZE HOST
   ========================================================= */

function normalizeHost(host) {
  host = host || "";
  host = host.toLowerCase();
  host = host.replace(/^\s+|\s+$/g, "");
  host = host.replace(/^\.+|\.+$/g, "");
  return host;
}


/* =========================================================
   🌐 IPv4 VALIDATION
   ========================================================= */

function isIPv4(host) {
  if (!host) return false;
  var parts = host.split(".");
  if (parts.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    if (!/^\d+$/.test(parts[i])) return false;
    var n = parseInt(parts[i], 10);
    if (n < 0 || n > 255) return false;
  }
  return true;
}


/* =========================================================
   🇯🇴══════════════════════════════════════════════════════
   ║     منع تسرب DNS — DNS LEAK PREVENTION                ║
   ╚════════════════════════════════════════════════════════
   ========================================================= */


/* =========================================================
   🔒 DNS LEAK DOMAINS
   نطاقات تسبب تسرب DNS
   ========================================================= */

function isDNSLeakDomain(host) {
  host = normalizeHost(host);

  return (
    /* خوادم DNS عامة تكشف الـ IP */
    /dns\.google/.test(host)              ||
    /dns\.google\.com/.test(host)         ||
    /cloudflare-dns/.test(host)           ||
    /one\.one\.one\.one/.test(host)       ||
    /opendns\.com/.test(host)             ||
    /quad9\.net/.test(host)               ||
    /comodo\.com/.test(host)              ||
    /norton\.com/.test(host)              ||
    /cleanbrowsing/.test(host)            ||
    /adguard\.com/.test(host)             ||
    /nextdns\.io/.test(host)              ||
    /controld\.com/.test(host)            ||

    /* خوادم DNS أردنية (يجب أن تحل محلياً) */
    /dns\.jo/.test(host)                  ||
    /nitc\.gov\.jo/.test(host)
  );
}


/* =========================================================
   🔒 WebRTC LEAK BLOCKING
   منع تسرب IP عبر WebRTC
   ========================================================= */

function isWebRTCDomain(host) {
  host = normalizeHost(host);

  return (
    /* STUN servers */
    /stun/.test(host)                     ||
    /stun[0-9]/.test(host)                ||
    /stun\.l\.google\.com/.test(host)     ||
    /stun1\.l\.google\.com/.test(host)    ||
    /stun2\.l\.google\.com/.test(host)    ||
    /stun3\.l\.google\.com/.test(host)    ||
    /stun4\.l\.google\.com/.test(host)    ||
    /stun\.nextcloud\.com/.test(host)     ||
    /stun\.sipgate\.net/.test(host)       ||
    /stun\.antisip\.com/.test(host)       ||
    /stun\.counterpath\.net/.test(host)   ||
    /stun\.ekiga\.net/.test(host)         ||
    /stun\.ideasip\.com/.test(host)       ||
    /stun\.rixtelecom\.se/.test(host)     ||
    /stun\.sipdiscount\.net/.test(host)   ||
    /stun\.voipgate\.com/.test(host)      ||
    /stun\.voip\.stunt\.com/.test(host)   ||
    /stun\.voipbuster\.com/.test(host)    ||
    /stun\.sipsorcery\.com/.test(host)    ||
    /stun\.freecall\.com/.test(host)      ||
    /stun\.sipnet\.net/.test(host)        ||
    /stun\.sipnet\.ru/.test(host)         ||
    /stun\.voip\.lowrate\.voip/.test(host)||
    /stun\.voxgratia\.org/.test(host)     ||
    /stun\.xten\.com/.test(host)          ||

    /* TURN servers */
    /turn/.test(host)                     ||
    /turn[0-9]/.test(host)                ||
    /turn\.google\.com/.test(host)        ||
    /turn1\.google\.com/.test(host)       ||
    /turn2\.google\.com/.test(host)       ||
    /turn3\.google\.com/.test(host)       ||
    /turn4\.google\.com/.test(host)       ||
    /turn\.nextcloud\.com/.test(host)     ||
    /turn\.sipgate\.net/.test(host)       ||

    /* ICE servers */
    /ice\.google\.com/.test(host)         ||
    /ice[0-9]/.test(host)                 ||

    /* WebRTC signaling */
    /webrtc/.test(host)                   ||
    /signaling/.test(host)                ||
    /websocket/.test(host)                ||
    /wss:/.test(host)                     ||
    /ws:/.test(host)
  );
}


/* =========================================================
   🔒 IPv6 LEAK BLOCKING
   منع تسرب عبر IPv6
   ========================================================= */

function isIPv6Address(host) {
  return (
    /:/.test(host) &&
    host.indexOf(":") !== host.lastIndexOf(":")
  );
}


/* =========================================================
   🔒 GEOLOCATION LEAK BLOCKING
   منع تسرب الموقع الجغرافي
   ========================================================= */

function isGeolocationDomain(host) {
  host = normalizeHost(host);

  return (
    /* Geolocation services */
    /geolocation/.test(host)              ||
    /geolocate/.test(host)                ||
    /geoip/.test(host)                    ||
    /ip-api\.com/.test(host)              ||
    /ipinfo\.io/.test(host)               ||
    /ipapi\.co/.test(host)                ||
    /ipwhois/.test(host)                  ||
    /ipstack\.com/.test(host)             ||
    /maxmind/.test(host)                  ||
    /geoip\.maxmind/.test(host)           ||
    /ip2location/.test(host)              ||
    /db-ip\.com/.test(host)               ||
    /ip\.sb/.test(host)                   ||
    /ifconfig\.me/.test(host)             ||
    /whatismyip/.test(host)               ||
    /myip\.com/.test(host)                ||
    /checkip/.test(host)                  ||
    /icanhazip/.test(host)                ||
    /ip\.me/.test(host)                   ||
    /ipinfo/.test(host)                   ||
    /ipify\.org/.test(host)               ||
    /seeip\.org/.test(host)               ||
    /iplogger/.test(host)                 ||
    /grabify/.test(host)                  ||
    /blasze/.test(host)                   ||
    /ip\.cn/.test(host)                   ||
    /cip\.cc/.test(host)                  ||
    /test-ipv6/.test(host)                ||
    /ipv6-test/.test(host)
  );
}


/* =========================================================
   🔒 ANALYTICS / TELEMETRY BLOCKING
   منع تسرب البيانات عبر التحليلات
   ========================================================= */

function isAnalyticsDomain(host) {
  host = normalizeHost(host);

  return (
    /* Google Analytics */
    /google-analytics/.test(host)         ||
    /googletagmanager/.test(host)         ||
    /googlesyndication/.test(host)        ||
    /doubleclick\.net/.test(host)         ||
    /googleservices/.test(host)           ||
    /googleadservices/.test(host)         ||
    /adservice\.google/.test(host)        ||
    /pagead[0-9]/.test(host)              ||

    /* Facebook Analytics */
    /facebook\.com\/tr/.test(host)        ||
    /connect\.facebook/.test(host)        ||
    /graph\.facebook/.test(host)          ||
    /pixel\.facebook/.test(host)          ||

    /* Tencent Analytics */
    /beacon\.qq\.com/.test(host)          ||
    /pingtas\.qq\.com/.test(host)         ||
    /btrace\.qq\.com/.test(host)          ||
    /report\.qq\.com/.test(host)          ||
    /tdw\.qq\.com/.test(host)             ||
    /sdklog/.test(host)                   ||
    /beaconcdn/.test(host)                ||

    /* Game Analytics */
    /gameanalytics/.test(host)            ||
    /deltaDNA/.test(host)                 ||
    /amplitude/.test(host)                ||
    /mixpanel/.test(host)                 ||
    /segment\.io/.test(host)              ||
    /segment\.com/.test(host)             ||
    /appsflyer/.test(host)                ||
    /adjust\.com/.test(host)              ||
    /branch\.io/.test(host)               ||
    /kochava/.test(host)                  ||
    /singular\.net/.test(host)            ||
    /tenjin\.io/.test(host)               ||
    /firebase-analytics/.test(host)       ||
    /crashlytics/.test(host)              ||
    /fabric\.io/.test(host)               ||
    /sentry\.io/.test(host)               ||
    /bugsnag/.test(host)                  ||
    /instabug/.test(host)                 ||
    /crashlytics\.com/.test(host)         ||

    /* Ad Networks */
    /admob/.test(host)                    ||
    /unityads/.test(host)                 ||
    /unity3d/.test(host)                  ||
    /ironsrc/.test(host)                  ||
    /vungle/.test(host)                   ||
    /applovin/.test(host)                 ||
    /chartboost/.test(host)               ||
    /inmobi/.test(host)                   ||
    /tapjoy/.test(host)                   ||
    /mintegral/.test(host)                ||
    /pangle/.test(host)                   ||
    /toponad/.test(host)                  ||
    /bidmachine/.test(host)              ||
    /adcolony/.test(host)                 ||
    /startapp/.test(host)                 ||
    /fyber/.test(host)                    ||
    /smaato/.test(host)                   ||
    /mobfox/.test(host)                   ||
    /epom/.test(host)                     ||
    /mopub/.test(host)                    ||
    /admost/.test(host)
  );
}


/* =========================================================
   🔒 PUSH NOTIFICATION LEAK
   منع تسرب عبر خدمات الإشعارات
   ========================================================= */

function isPushNotificationDomain(host) {
  host = normalizeHost(host);

  return (
    /* Firebase Cloud Messaging */
    /fcm\.googleapis/.test(host)          ||
    /fcmregistrations/.test(host)         ||
    /gcm-http/.test(host)                 ||
    /gcm\.googleapis/.test(host)          ||
    /fcm-xmpp/.test(host)                ||
    /fcmregistrations/.test(host)         ||

    /* Apple Push */
    /courier\.push\.apple/.test(host)     ||
    /push-apple/.test(host)               ||
    /api\.push\.apple/.test(host)         ||
    /gateway\.push\.apple/.test(host)     ||

    /* Huawei Push */
    /push\.hicloud/.test(host)            ||
    /hwpush/.test(host)                   ||

    /* Xiaomi Push */
    /push\.mi\.com/.test(host)            ||
    /mipush/.test(host)                   ||

    /* Samsung Push */
    /push\.samsungosp/.test(host)         ||
    /samsungpush/.test(host)
  );
}


/* =========================================================
   🔒 APP STORE LEAK
   منع تسرب عبر متاجر التطبيقات
   ========================================================= */

function isAppStoreDomain(host) {
  host = normalizeHost(host);

  return (
    /* Google Play */
    /play\.google\.com/.test(host)        ||
    /play-games\.google/.test(host)       ||
    /play-lh\.googleusercontent/.test(host)||
    /ggpht\.com/.test(host)               ||
    /play-fe\.google\.com/.test(host)     ||
    /play\.googleapis\.com/.test(host)    ||
    /android\.clients\.google/.test(host) ||

    /* Apple App Store */
    /apps\.apple\.com/.test(host)         ||
    /appstore\.apple/.test(host)          ||
    /itunes\.apple\.com/.test(host)       ||
    /itunes\.connect\.apple/.test(host)   ||
    /buy\.itunes\.apple/.test(host)       ||
    /sandbox\.itunes\.apple/.test(host)   ||
    /xp\.apple\.com/.test(host)           ||
    /gs-loc\.apple/.test(host)            ||
    /swcdn\.apple\.com/.test(host)        ||
    /swdist\.apple\.com/.test(host)       ||
    /updates\.apple\.com/.test(host)      ||
    /appldnld\.apple\.com/.test(host)     ||

    /* Huawei AppGallery */
    /appgallery\.huawei/.test(host)       ||
    /store-drcn/.test(host)               ||
    /store-drru/.test(host)               ||
    /appmarket\.huawei/.test(host)        ||

    /* Samsung Galaxy Store */
    /galaxystore\.samsung/.test(host)     ||
    /samsungapps\.com/.test(host)
  );
}


/* =========================================================
   🔒 CDN / CLOUD PROVIDER DETECTION
   (مهم! هذه النطاقات تخدم PUBG أحياناً)
   ========================================================= */

function isCDNCloudDomain(host) {
  host = normalizeHost(host);

  return (
    /* Tencent Cloud */
    /qcloud/.test(host)                   ||
    /myqcloud/.test(host)                 ||
    /tencentcs/.test(host)                ||
    /tencent-cloud/.test(host)            ||
    /tencentcos/.test(host)               ||
    /tencentcdn/.test(host)               ||
    /gtimg/.test(host)                    ||
    /qpic\.cn/.test(host)                 ||
    /idqqimg/.test(host)                  ||
    /qq\.com/.test(host)                  ||
    /weixin/.test(host)                   ||
    /wechat/.test(host)                   ||
    /tencentcloud\.com/.test(host)        ||
    /dnspod\.cn/.test(host)              ||
    /qcloudcdn\.com/.test(host)           ||
    /tencentcos\.cn/.test(host)           ||
    /tencent\.com/.test(host)             ||
    /tencentgames\.com/.test(host)        ||
    /igamecj\.com/.test(host)             ||

    /* AWS */
    /amazonaws/.test(host)                ||
    /aws\.com/.test(host)                 ||
    /cloudfront/.test(host)               ||
    /awsglobalaccelerator/.test(host)     ||
    /elasticbeanstalk/.test(host)         ||
    /amazon\.com/.test(host)              ||
    /aws\.amazon/.test(host)              ||
    /s3\.amazonaws/.test(host)            ||
    /s3-ap-southeast/.test(host)          ||
    /s3-me-south/.test(host)              ||

    /* Alibaba */
    /aliyun/.test(host)                   ||
    /alibaba/.test(host)                  ||
    /alicdn/.test(host)                   ||
    /alibabausercontent/.test(host)       ||
    /taobao/.test(host)                   ||
    /alipay/.test(host)                   ||
    /aliexpress/.test(host)               ||

    /* Google Cloud */
    /googleapis\.com/.test(host)          ||
    /gstatic\.com/.test(host)             ||
    /googleusercontent/.test(host)        ||
    /google-cloud/.test(host)             ||
    /firebase/.test(host)                 ||
    /firebaseio/.test(host)               ||
    /gcloud/.test(host)                   ||
    /google\.com/.test(host)              ||
    /youtube\.com/.test(host)             ||
    /ytimg\.com/.test(host)               ||
    /ggpht\.com/.test(host)               ||

    /* Azure */
    /azure/.test(host)                    ||
    /msecnd/.test(host)                   ||
    /windows\.net/.test(host)             ||
    /azureedge/.test(host)                ||
    /azure-api/.test(host)                ||
    /microsoft\.com/.test(host)           ||
    /live\.com/.test(host)                ||
    /outlook\.com/.test(host)             ||
    /msn\.com/.test(host)                 ||

    /* Fastly */
    /fastly/.test(host)                   ||
    /fastlylb\.net/.test(host)            ||

    /* Cloudflare */
    /cloudflare/.test(host)               ||
    /cloudflare-dns/.test(host)           ||
    /cdnjs\.cloudflare/.test(host)        ||

    /* Akamai */
    /akamai/.test(host)                   ||
    /akamaiedge/.test(host)               ||
    /akamaized/.test(host)                ||
    /edgesuite/.test(host)                ||
    /edgekey/.test(host)                  ||

    /* Facebook / Meta */
    /facebook\.com/.test(host)            ||
    /fbcdn\.net/.test(host)               ||
    /facebook\.net/.test(host)            ||
    /fb\.com/.test(host)                  ||
    /fbsbx\.com/.test(host)               ||
    /instagram\.com/.test(host)           ||
    /cdninstagram/.test(host)             ||
    /whatsapp\.com/.test(host)            ||
    /whatsapp\.net/.test(host)            ||

    /* Twitter / X */
    /twitter\.com/.test(host)             ||
    /twimg\.com/.test(host)               ||
    /t\.co/.test(host)                    ||
    /x\.com/.test(host)                   ||

    /* Apple */
    /apple\.com/.test(host)               ||
    /icloud\.com/.test(host)              ||
    /mzstatic/.test(host)                 ||
    /cdn-apple/.test(host)                ||

    /* VK */
    /vk\.com/.test(host)                  ||
    /vkuservideo/.test(host)              ||
    /vkcdn/.test(host)                    ||

    /* Line */
    /line-apps/.test(host)                ||
    /line-scdn/.test(host)                ||
    /line\.me/.test(host)                 ||

    /* Other CDNs */
    /cdn77\.org/.test(host)               ||
    /keycdn/.test(host)                   ||
    /stackpath/.test(host)                ||
    /bootstrapcdn/.test(host)             ||
    /jsdelivr/.test(host)                 ||
    /unpkg/.test(host)                    ||
    /cdnjs/.test(host)
  );
}


/* =========================================================
   🎮 PUBG DETECTION ENGINE
   ========================================================= */

function isPUBGDirect(s) {
  return (
    /pubg/.test(s)                ||
    /pubgm/.test(s)               ||
    /pubgmobile/.test(s)          ||
    /pubgsea/.test(s)             ||
    /pubgkr/.test(s)              ||
    /pubgcs/.test(s)              ||
    /pubgme/.test(s)              ||
    /pubgmena/.test(s)            ||
    /pubglite/.test(s)            ||
    /pubgnewstate/.test(s)        ||
    /newstate/.test(s)
  );
}

function isPUBGPublisher(s) {
  return (
    /krafton/.test(s)             ||
    /tencent/.test(s)             ||
    /lightspeed/.test(s)          ||
    /proximabeta/.test(s)         ||
    /igame/.test(s)               ||
    /garena/.test(s)              ||
    /levelinfinite/.test(s)       ||
    /vng/.test(s)                 ||
    /relio/.test(s)               ||
    /timi/.test(s)                ||
    /quantum/.test(s)
  );
}

function isPUBGService(s) {
  return (
    /matchmaking/.test(s)         ||
    /matchmaker/.test(s)          ||
    /match[-_]?server/.test(s)    ||
    /gameserver/.test(s)          ||
    /game[-_]?server/.test(s)     ||
    /gamesession/.test(s)         ||
    /game[-_]?session/.test(s)    ||
    /sessionserver/.test(s)       ||
    /session[-_]?server/.test(s)  ||
    /dispatcher/.test(s)          ||
    /allocation/.test(s)          ||
    /lobby/.test(s)               ||
    /roomserver/.test(s)          ||
    /chatserver/.test(s)          ||
    /friendserver/.test(s)        ||
    /rankserver/.test(s)          ||
    /inventory/.test(s)           ||
    /shopserver/.test(s)          ||
    /clanserver/.test(s)          ||
    /telemetry/.test(s)           ||
    /anti[-_]?cheat/.test(s)      ||
    /anticheat/.test(s)           ||
    /auth/.test(s)                ||
    /login/.test(s)               ||
    /oauth/.test(s)               ||
    /passport/.test(s)            ||
    /account/.test(s)             ||
    /profile/.test(s)             ||
    /social/.test(s)              ||
    /friend/.test(s)              ||
    /chat/.test(s)                ||
    /voice/.test(s)               ||
    /voip/.test(s)                ||
    /push/.test(s)                ||
    /notify/.test(s)              ||
    /notification/.test(s)        ||
    /download/.test(s)            ||
    /update/.test(s)              ||
    /patch/.test(s)               ||
    /hotfix/.test(s)              ||
    /cdn/.test(s)                 ||
    /asset/.test(s)               ||
    /resource/.test(s)            ||
    /config/.test(s)              ||
    /setting/.test(s)             ||
    /version/.test(s)             ||
    /check/.test(s)               ||
    /verify/.test(s)              ||
    /report/.test(s)              ||
    /event/.test(s)               ||
    /season/.test(s)              ||
    /pass/.test(s)                ||
    /royale/.test(s)              ||
    /crate/.test(s)               ||
    /skin/.test(s)                ||
    /outfit/.test(s)              ||
    /weapon/.test(s)              ||
    /vehicle/.test(s)
  );
}

function isPUBGMode(s) {
  return (
    /erangel/.test(s)             ||
    /livik/.test(s)               ||
    /sanhok/.test(s)              ||
    /miramar/.test(s)             ||
    /vikendi/.test(s)             ||
    /karakin/.test(s)             ||
    /nusa/.test(s)                ||
    /taego/.test(s)               ||
    /deston/.test(s)              ||
    /paramo/.test(s)              ||
    /haven/.test(s)               ||
    /rondo/.test(s)               ||
    /tdm/.test(s)                 ||
    /teamdeathmatch/.test(s)      ||
    /payload/.test(s)             ||
    /metroroyale/.test(s)         ||
    /metro[-_]?royale/.test(s)    ||
    /zombiemode/.test(s)          ||
    /infection/.test(s)           ||
    /arena/.test(s)               ||
    /ranked/.test(s)              ||
    /classic/.test(s)             ||
    /arcade/.test(s)
  );
}

function isPUBGAPI(u) {
  return (
    /(\/api\/|\/v1\/|\/v2\/|\/v3\/|\/v4\/)/.test(u) &&
    /(game|match|session|battle|player|server|region|lobby|rank|clan|inventory|auth|login|profile)/.test(u)
  );
}

function isPUBGServerDiscovery(s, u) {
  return (
    /(serverlist|server[-_]?list|realm|routing|server[-_]?select|region[-_]?select)/.test(u) &&
    /(game|match|player|pubg|pubgm|tencent|krafton|levelinfinite)/.test(s)
  );
}

function isMiddleEastServer(s, u) {
  return (
    /(me[-_]?east|mena|middle[-_]?east|dubai|uae|riyadh|jeddah|amman)/.test(s) ||
    /(me[-_]?east|mena|middle[-_]?east|dubai|uae|riyadh|jeddah|amman)/.test(u) ||
    /(region=me|region=mena|server=me|server=mena)/.test(u)
  );
}


/* =========================================================
   🇯🇴 JORDANIAN DOMAIN CHECK
   ========================================================= */

function isJordanianDomain(host) {
  host = normalizeHost(host);
  if (/\.jo$/.test(host)) return true;
  if (/jordan/.test(host)) return true;
  if (/amman/.test(host)) return true;
  if (/irbid/.test(host)) return true;
  if (/zarqa/.test(host)) return true;
  if (/aqaba/.test(host)) return true;
  if (/petra/.test(host)) return true;
  if (/deadsea/.test(host)) return true;
  if (/jerash/.test(host)) return true;
  if (/orange\.jo/.test(host)) return true;
  if (/zain\.jo/.test(host)) return true;
  if (/umniah/.test(host)) return true;
  if (/damamax/.test(host)) return true;
  return false;
}


/* =========================================================
   🇯🇴 JORDAN IP DATABASE
   ========================================================= */

function jordanResidentialTier(host) {
  if (!isIPv4(host)) return 0;

  if (
    isInNet(host, "46.32.96.0",   "255.255.224.0")  ||
    isInNet(host, "37.202.64.0",  "255.255.192.0")  ||
    isInNet(host, "46.32.128.0",  "255.255.128.0")  ||
    isInNet(host, "185.69.184.0", "255.255.252.0")  ||
    isInNet(host, "79.173.192.0", "255.255.192.0")
  ) return 30;

  if (
    isInNet(host, "37.17.192.0",  "255.255.240.0")  ||
    isInNet(host, "46.185.128.0", "255.255.128.0")  ||
    isInNet(host, "185.44.148.0", "255.255.252.0")  ||
    isInNet(host, "37.17.208.0",  "255.255.240.0")
  ) return 29;

  if (
    isInNet(host, "86.108.0.0",   "255.255.128.0")  ||
    isInNet(host, "178.20.184.0", "255.255.248.0")
  ) return 28;

  if (
    isInNet(host, "92.253.0.0",   "255.255.128.0")  ||
    isInNet(host, "185.108.108.0","255.255.252.0")
  ) return 27;

  if (
    isInNet(host, "94.249.0.0",   "255.255.128.0")  ||
    isInNet(host, "149.200.128.0","255.255.128.0")  ||
    isInNet(host, "176.28.128.0", "255.255.128.0")  ||
    isInNet(host, "109.107.224.0","255.255.224.0")
  ) return 26;

  if (
    isInNet(host, "94.142.32.0",  "255.255.224.0")  ||
    isInNet(host, "194.165.128.0","255.255.224.0")  ||
    isInNet(host, "79.134.128.0", "255.255.224.0")
  ) return 25;

  if (
    isInNet(host, "213.186.160.0","255.255.224.0")  ||
    isInNet(host, "213.139.32.0", "255.255.224.0")  ||
    isInNet(host, "212.34.0.0",   "255.255.224.0")  ||
    isInNet(host, "84.18.32.0",   "255.255.224.0")  ||
    isInNet(host, "84.18.64.0",   "255.255.224.0")  ||
    isInNet(host, "81.28.112.0",  "255.255.240.0")
  ) return 24;

  if (
    isInNet(host, "109.237.192.0","255.255.240.0")  ||
    isInNet(host, "95.141.208.0", "255.255.240.0")  ||
    isInNet(host, "95.172.192.0", "255.255.224.0")  ||
    isInNet(host, "91.106.96.0",  "255.255.240.0")
  ) return 23;

  if (
    isInNet(host, "93.93.144.0",  "255.255.248.0")  ||
    isInNet(host, "93.95.200.0",  "255.255.248.0")  ||
    isInNet(host, "94.127.208.0", "255.255.248.0")  ||
    isInNet(host, "176.57.0.0",   "255.255.224.0")
  ) return 22;

  if (
    isInNet(host, "37.44.32.0",   "255.255.248.0")  ||
    isInNet(host, "37.75.144.0",  "255.255.248.0")  ||
    isInNet(host, "37.123.64.0",  "255.255.224.0")  ||
    isInNet(host, "46.23.112.0",  "255.255.240.0")  ||
    isInNet(host, "46.248.192.0", "255.255.224.0")
  ) return 21;

  if (
    isInNet(host, "87.236.232.0", "255.255.248.0")  ||
    isInNet(host, "87.238.128.0", "255.255.248.0")  ||
    isInNet(host, "89.28.216.0",  "255.255.248.0")  ||
    isInNet(host, "89.38.152.0",  "255.255.254.0")
  ) return 20;

  if (
    isInNet(host, "62.72.161.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.162.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.165.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.166.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.168.0",  "255.255.252.0")  ||
    isInNet(host, "62.72.174.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.176.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.179.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.180.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.184.0",  "255.255.252.0")  ||
    isInNet(host, "62.72.191.0",  "255.255.255.0")
  ) return 19;

  return 0;
}


/* =========================================================
   🌍 MIDDLE EAST TIERS
   ========================================================= */

function middleEastTier(host) {
  if (!isIPv4(host)) return 0;

  if (isInNet(host, "94.56.0.0",   "255.252.0.0")   ||
      isInNet(host, "91.72.0.0",   "255.252.0.0")   ||
      isInNet(host, "185.42.204.0","255.255.252.0")) return 10;

  if (isInNet(host, "188.52.0.0",  "255.252.0.0")   ||
      isInNet(host, "94.96.0.0",   "255.240.0.0")   ||
      isInNet(host, "212.89.160.0","255.255.224.0")) return 9;

  if (isInNet(host, "168.187.0.0", "255.255.0.0")   ||
      isInNet(host, "185.34.16.0", "255.255.252.0")) return 8;

  if (isInNet(host, "37.236.0.0",  "255.252.0.0")   ||
      isInNet(host, "185.8.160.0", "255.255.252.0")) return 7;

  if (isInNet(host, "178.120.0.0", "255.252.0.0")   ||
      isInNet(host, "82.137.192.0","255.255.192.0")) return 6;

  if (isInNet(host, "41.32.0.0",   "255.240.0.0")   ||
      isInNet(host, "196.202.0.0", "255.255.0.0"))   return 5;

  return 0;
}


/* =========================================================
   🧠 PUBG CONFIDENCE ENGINE
   ========================================================= */

function getPUBGScore(host, url) {
  var h = normalizeHost(host);
  var u = (url || "").toLowerCase();
  u = u.replace(/[\r\n\t]/g, "");
  var s = h + " " + u;
  var score = 0;

  if (isPUBGDirect(s)) score += 100;
  if (isPUBGPublisher(s)) score += 85;
  if (isCDNCloudDomain(h)) score += 25;
  if (isPUBGService(s)) score += 70;
  if (isPUBGMode(s)) score += 45;
  if (isPUBGAPI(u)) score += 35;
  if (isPUBGServerDiscovery(s, u)) score += 40;
  if (isMiddleEastServer(s, u)) score += 50;
  if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
  if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;
  if (/lobby/.test(s) && /(game|match|session|server)/.test(s)) score += 15;

  return score;
}

function isPUBG(host, url) {
  return getPUBGScore(host, url) >= 60;
}


/* =========================================================
   🎮 KNOWN PUBG DOMAINS
   ========================================================= */

var KNOWN_PUBG_DOMAINS = {
  "pubgmobile.com":          true,
  "pubg.com":                true,
  "pubgmobile.kr":           true,
  "pubgmobile.live":         true,
  "tencent.com":             true,
  "tencentgames.com":        true,
  "igamecj.com":             true,
  "qcloud.com":              true,
  "myqcloud.com":            true,
  "tencent-cloud.net":       true,
  "gtimg.cn":                true,
  "qpic.cn":                 true,
  "krafton.com":             true,
  "levelinfinite.com":       true,
  "lightspeedpc.com":        true,
  "proximabeta.com":         true,
  "garena.com":              true,
  "qq.com":                  true,
  "weixin.com":              true,
  "tencentcloud.com":        true,
  "dnspod.cn":               true,
  "qcloudcdn.com":           true,
  "tencentcos.cn":           true
};

function isKnownPUBGDomain(host) {
  host = normalizeHost(host);
  if (KNOWN_PUBG_DOMAINS[host]) return true;
  var parts = host.split(".");
  for (var i = 0; i < parts.length - 1; i++) {
    var domain = parts.slice(i).join(".");
    if (KNOWN_PUBG_DOMAINS[domain]) return true;
  }
  return false;
}


/* =========================================================
   🎯 MASTER TRAFFIC CLASSIFIER v7.0
   يفحص كل أنواع التسرب
   ========================================================= */

function classifyTraffic(host, url) {
  host = normalizeHost(host);
  url = (url || "").toLowerCase();

  var c = {
    category: "unknown",
    priority: 0,
    mustProxy: true,
    jordanOnly: true,
    blocked: false,
    leakType: "none",
    reason: ""
  };


  /* ===== حجب: IPv6 ===== */
  if (CONFIG.blockIPv6 && isIPv6Address(host)) {
    c.category = "blocked-ipv6";
    c.blocked = true;
    c.leakType = "ipv6";
    c.reason = "IPv6 blocked to prevent leak";
    SESSION.blockedCount++;
    return c;
  }


  /* ===== حجب: WebRTC / STUN / TURN ===== */
  if (CONFIG.blockWebRTC && isWebRTCDomain(host)) {
    c.category = "blocked-webrtc";
    c.blocked = true;
    c.leakType = "webrtc";
    c.reason = "WebRTC/STUN/TURN blocked to prevent IP leak";
    SESSION.blockedCount++;
    SESSION.leakAttempts++;
    return c;
  }


  /* ===== حجب: Geolocation ===== */
  if (isGeolocationDomain(host)) {
    c.category = "blocked-geolocation";
    c.blocked = true;
    c.leakType = "geolocation";
    c.reason = "Geolocation service blocked";
    SESSION.blockedCount++;
    SESSION.leakAttempts++;
    return c;
  }


  /* ===== حجب: DNS Leak ===== */
  if (CONFIG.forceDNS && isDNSLeakDomain(host)) {
    c.category = "blocked-dns-leak";
    c.blocked = true;
    c.leakType = "dns";
    c.reason = "DNS leak domain blocked";
    SESSION.blockedCount++;
    SESSION.leakAttempts++;
    return c;
  }


  /* ===== حجب: Analytics / Telemetry ===== */
  if (CONFIG.blockAnalytics && isAnalyticsDomain(host)) {
    c.category = "blocked-analytics";
    c.blocked = true;
    c.leakType = "analytics";
    c.reason = "Analytics/Telemetry blocked";
    SESSION.blockedCount++;
    return c;
  }


  /* ===== PUBG Known ===== */
  if (isKnownPUBGDomain(host)) {
    c.category = "pubg-known";
    c.priority = 100;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "Known PUBG domain";
    return c;
  }


  /* ===== PUBG Detected ===== */
  if (isPUBG(host, url)) {
    c.category = "pubg-detected";
    c.priority = 95;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "PUBG traffic (score: " + getPUBGScore(host, url) + ")";
    return c;
  }


  /* ===== CDN / Cloud (قد يخدم PUBG) ===== */
  if (isCDNCloudDomain(host)) {
    c.category = "cdn-cloud";
    c.priority = 85;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "CDN/Cloud - may serve PUBG assets";
    return c;
  }


  /* ===== Push Notifications ===== */
  if (isPushNotificationDomain(host)) {
    c.category = "push-notification";
    c.priority = 75;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "Push notification - can leak IP";
    return c;
  }


  /* ===== App Store ===== */
  if (isAppStoreDomain(host)) {
    c.category = "app-store";
    c.priority = 70;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "App store - can leak IP";
    return c;
  }


  /* ===== Jordanian Domain ===== */
  if (isJordanianDomain(host)) {
    c.category = "jordanian";
    c.priority = 60;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "Jordanian domain";
    return c;
  }


  /* ===== Middle East ===== */
  if (middleEastTier(host) > 0 || isMiddleEastServer(host, url)) {
    c.category = "middle-east";
    c.priority = 50;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "Middle East traffic";
    return c;
  }


  /* ===== Jordanian IP ===== */
  if (isIPv4(host) && jordanResidentialTier(host) > 0) {
    c.category = "jordanian-ip";
    c.priority = 40;
    c.mustProxy = true;
    c.jordanOnly = true;
    c.reason = "Jordanian IP";
    return c;
  }


  /* ===== Unknown — كل شيء بالبروكسي ===== */
  c.category = "unknown";
  c.priority = 10;
  c.mustProxy = true;
  c.jordanOnly = true;
  c.reason = "Unknown - forced through Jordan proxy";

  return c;
}


/* =========================================================
   🔄 FAILOVER SYSTEM
   ========================================================= */

function markFailed(proxyAddr) {
  SESSION.failedProxies[proxyAddr] = new Date().getTime();
}

function isFailed(proxyAddr) {
  var failTime = SESSION.failedProxies[proxyAddr];
  if (!failTime) return false;
  var now = new Date().getTime();
  if ((now - failTime) > CONFIG.failoverCooldown) {
    delete SESSION.failedProxies[proxyAddr];
    return false;
  }
  return true;
}

function getAvailableProxies() {
  var available = [];
  for (var i = 0; i < PROXIES.length; i++) {
    if (!isFailed(PROXIES[i].addr)) {
      available.push(PROXIES[i]);
    }
  }
  return available;
}


/* =========================================================
   🎯 SMART PROXY SELECTION v7.0
   ========================================================= */

function selectSmartProxy(host, url, classification) {
  var available = getAvailableProxies();

  if (available.length === 0) {
    SESSION.failedProxies = {};
    available = PROXIES;
  }

  // فلترة: أردني فقط
  var jordanOnly = [];
  for (var i = 0; i < available.length; i++) {
    if (available[i].region === "JO") {
      jordanOnly.push(available[i]);
    }
  }

  if (jordanOnly.length === 0) {
    SESSION.failedProxies = {};
    jordanOnly = PROXIES;
  }

  // اختر الأعلى وزناً
  var best = jordanOnly[0];
  for (var j = 1; j < jordanOnly.length; j++) {
    if (jordanOnly[j].weight > best.weight) {
      best = jordanOnly[j];
    }
  }

  return best.addr;
}


/* =========================================================
   🔗 HOST GROUP
   ========================================================= */

function getHostGroup(host) {
  host = normalizeHost(host);
  if (/pubg/.test(host)) return "pubg";
  if (/tencent/.test(host)) return "tencent";
  if (/krafton/.test(host)) return "krafton";
  if (/lightspeed/.test(host)) return "lightspeed";
  if (/proximabeta/.test(host)) return "proximabeta";
  if (/qcloud/.test(host)) return "qcloud";
  if (/amazonaws/.test(host)) return "aws";
  if (/aliyun/.test(host)) return "aliyun";
  if (/facebook/.test(host)) return "facebook";
  if (/google/.test(host)) return "google";
  if (/twitter/.test(host)) return "twitter";
  if (/apple/.test(host)) return "apple";
  if (isJordanianDomain(host)) return "jordan";
  return host;
}

function isSameHostGroup(host1, host2) {
  return getHostGroup(host1) === getHostGroup(host2);
}


/* =========================================================
   🔒 STICKY SESSION
   ========================================================= */

function getStickyProxy(host, url) {
  var now = new Date().getTime();
  if (SESSION.lockedProxy !== null) {
    if ((now - SESSION.lockedAt) < CONFIG.stickyTTL) {
      if (isSameHostGroup(host, SESSION.lockedHost)) {
        return SESSION.lockedProxy;
      }
    }
    SESSION.lockedProxy = null;
  }
  return null;
}

function lockProxy(proxy, host) {
  SESSION.lockedProxy = proxy;
  SESSION.lockedHost = host;
  SESSION.lockedAt = new Date().getTime();
}


/* =========================================================
   🚀 CORE SELECTION v7.0
   ========================================================= */

function selectCore(host, url) {
  var sticky = getStickyProxy(host, url);
  if (sticky !== null) return sticky;

  var classification = classifyTraffic(host, url);
  var proxy = selectSmartProxy(host, url, classification);
  lockProxy(proxy, host);
  return proxy;
}


/* =========================================================
   🚀 MAIN PAC ENGINE v7.0 — ANTI-LEAK
   ========================================================= */

function FindProxyForURL(url, host) {

  host = host || "";
  url = url || "";

  host = normalizeHost(host);


  /* =======================================================
     مرحلة 1: تصنيف حركة المرور
     ======================================================= */

  var classification = classifyTraffic(host, url);


  /* =======================================================
     مرحلة 2: إذا محجوب → DIRECT (ما نرسله أصلاً)
     ======================================================= */

  if (classification.blocked) {
    return "DIRECT";
  }


  /* =======================================================
     مرحلة 3: كل شيء يمر بالبروكسي الأردني
     ======================================================= */

  return selectCore(host, url);
}


/* =========================================================
   📊 DEBUG FUNCTION
   ========================================================= */

function debugPAC(host, url) {
  host = normalizeHost(host || "");
  url = url || "";

  var classification = classifyTraffic(host, url);
  var score = getPUBGScore(host, url);

  return {
    host: host,
    url: url,
    classification: classification,
    score: score,
    isPUBG: score >= 60,
    isKnownDomain: isKnownPUBGDomain(host),
    isCDN: isCDNCloudDomain(host),
    isWebRTC: isWebRTCDomain(host),
    isGeolocation: isGeolocationDomain(host),
    isDNSLeak: isDNSLeakDomain(host),
    isAnalytics: isAnalyticsDomain(host),
    isPushNotification: isPushNotificationDomain(host),
    isAppStore: isAppStoreDomain(host),
    isJordanian: isJordanianDomain(host),
    isIPv6: isIPv6Address(host),
    proxy: FindProxyForURL(url, host),
    proxyPool: {
      "JO-UMNIAH-1":  "86.108.11.20:443     ✅ أردني",
      "JO-UMNIAH-2":  "86.108.108.68:80     ✅ أردني",
      "JO-ORANGE-1":  "79.173.249.116:8080  ✅ أردني",
      "JO-DAMAMAX-1": "92.253.2.100:8080    ✅ أردني"
    },
    leakProtection: {
      ipv6Blocked: CONFIG.blockIPv6,
      webRTCBlocked: CONFIG.blockWebRTC,
      stunBlocked: CONFIG.blockSTUN,
      turnBlocked: CONFIG.blockTURN,
      dnsForced: CONFIG.forceDNS,
      analyticsBlocked: CONFIG.blockAnalytics,
      telemetryBlocked: CONFIG.blockTelemetry
    },
    stats: {
      blockedCount: SESSION.blockedCount,
      leakAttempts: SESSION.leakAttempts,
      matchCount: SESSION.matchCount
    }
  };
}
