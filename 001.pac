/* =========================================================
   JORDAN TITANIUM CORE v15.0 — PUBG COMPLETE EDITION
   ═══════════════════════════════════════════════════════
   كلشي داخل ببجي موبايل مربوط بالنطاقات الأردنية
   لا يوجد حجب — كل شيء يمر بالبروكسي
   النطاقات = الجوهر
   ========================================================= */


/* ═══════════════════════════════════════════════════════════
   🇯🇴 البروكسيات الأردنية
   ═══════════════════════════════════════════════════════════ */

var JO1 = "PROXY 86.108.11.20:443";
var JO2 = "PROXY 86.108.108.68:80";
var JO3 = "PROXY 79.173.249.116:8080";
var JO4 = "PROXY 92.253.2.100:8080";


/* ═══════════════════════════════════════════════════════════
   📊 حالة الجلسة
   ═══════════════════════════════════════════════════════════ */

var _locked = null;
var _lockedHost = null;
var _lockedAt = 0;
var _failed = {};


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
   ║                                                      ║
   ║   النطاقات الأردنية — جوهر السكربت                   ║
   ║   كل شيء يمر عبرها ويرجع لها                         ║
   ║                                                      ║
   ╚══════════════════════════════════════════════════════
   ═══════════════════════════════════════════════════════════ */


/* ═══ TIER 1 — Benchmark / Zain Broadband ═══ */

function isJOTier1(h) {
  if (!isIP(h)) return false;
  return (
    isInNet(h, "46.32.96.0", "255.255.224.0")
  );
}


/* ═══ TIER 2 — قوي جدًا ═══ */

function isJOTier2(h) {
  if (!isIP(h)) return false;
  return (
    isInNet(h, "109.107.224.0", "255.255.224.0") ||
    isInNet(h, "212.34.0.0",    "255.255.224.0")
  );
}


/* ═══ TIER 3 — قوي ═══ */

function isJOTier3(h) {
  if (!isIP(h)) return false;
  return (
    isInNet(h, "212.35.64.0",   "255.255.224.0") ||
    isInNet(h, "212.118.0.0",   "255.255.224.0") ||
    isInNet(h, "213.139.32.0",  "255.255.224.0") ||
    isInNet(h, "213.186.160.0", "255.255.224.0") ||
    isInNet(h, "194.165.128.0", "255.255.224.0")
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
   🇯🇴════════════════════════════════════════════════════
   ║   فحص النطاقات الأردنية                              ║
   ╚══════════════════════════════════════════════════════
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
   🎮══════════════════════════════════════════════════════
   ║                                                      ║
   ║   كلشي داخل ببجي موبايل                              ║
   ║   كل خدمة وكل نطاق وكل اتصال                        ║
   ║                                                      ║
   ╚══════════════════════════════════════════════════════
   ═══════════════════════════════════════════════════════════ */


/* ═══════════════════════════════════════════════════════════
   🎮 1. نطاقات PUBG المباشرة
   ═══════════════════════════════════════════════════════════ */

function isPUBGDirect(h) {
  h = clean(h);
  return (
    /pubg/.test(h) || /pubgm/.test(h) || /pubgmobile/.test(h) ||
    /pubgsea/.test(h) || /pubgkr/.test(h) || /pubgcs/.test(h) ||
    /pubgme/.test(h) || /pubgmena/.test(h) || /pubglite/.test(h) ||
    /pubgnewstate/.test(h) || /newstate/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 2. الناشرين والمطورين
   ═══════════════════════════════════════════════════════════ */

function isPublisher(h) {
  h = clean(h);
  return (
    /krafton/.test(h) || /tencent/.test(h) || /lightspeed/.test(h) ||
    /proximabeta/.test(h) || /igame/.test(h) || /garena/.test(h) ||
    /levelinfinite/.test(h) || /vng/.test(h) || /timi/.test(h) ||
    /quantum/.test(h) || /dreamwork/.test(h) || /relio/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 3. خدمات اللعب (Matchmaking / Game Server / Lobby)
   ═══════════════════════════════════════════════════════════ */

function isGameService(h, u) {
  h = clean(h);
  u = (u || "").toLowerCase();
  var s = h + " " + u;

  return (
    /* Matchmaking */
    /matchmaking/.test(s) || /matchmaker/.test(s) ||
    /match[-_]?server/.test(s) || /match[-_]?service/.test(s) ||

    /* Game Server */
    /gameserver/.test(s) || /game[-_]?server/.test(s) ||
    /gameservice/.test(s) || /game[-_]?service/.test(s) ||
    /gamesession/.test(s) || /game[-_]?session/.test(s) ||

    /* Session */
    /sessionserver/.test(s) || /session[-_]?server/.test(s) ||
    /session[-_]?service/.test(s) ||

    /* Dispatcher */
    /dispatcher/.test(s) || /allocation/.test(s) ||
    /allocator/.test(s) || /loadbalancer/.test(s) ||

    /* Lobby */
    /lobby/.test(s) || /lobbyservice/.test(s) ||
    /lobby[-_]?server/.test(s) ||

    /* Room */
    /roomserver/.test(s) || /room[-_]?server/.test(s) ||
    /roomservice/.test(s) ||

    /* Chat */
    /chatserver/.test(s) || /chat[-_]?server/.test(s) ||
    /chatservice/.test(s) || /chat\.service/.test(s) ||

    /* Voice */
    /voiceserver/.test(s) || /voice[-_]?server/.test(s) ||
    /voip/.test(s) || /voipservice/.test(s) ||
    /rtc\.service/.test(s) || /rtcserver/.test(s) ||

    /* Friend */
    /friendserver/.test(s) || /friend[-_]?server/.test(s) ||
    /friendservice/.test(s) || /social[-_]?server/.test(s) ||

    /* Rank */
    /rankserver/.test(s) || /rank[-_]?server/.test(s) ||
    /rankservice/.test(s) || /ranking/.test(s) ||

    /* Inventory */
    /inventory/.test(s) || /inventoryserver/.test(s) ||
    /inventory[-_]?service/.test(s) ||

    /* Shop */
    /shopserver/.test(s) || /shop[-_]?server/.test(s) ||
    /shopservice/.test(s) || /store[-_]?server/.test(s) ||

    /* Clan */
    /clanserver/.test(s) || /clan[-_]?server/.test(s) ||
    /clanservice/.test(s) || /guildserver/.test(s) ||

    /* Anti-Cheat */
    /anticheat/.test(s) || /anti[-_]?cheat/.test(s) ||
    /anticheatservice/.test(s) || /hackshield/.test(s) ||
    /battleye/.test(s) || /easyanticheat/.test(s) ||

    /* Telemetry */
    /telemetry/.test(s) || /telemetryserver/.test(s) ||
    /telemetry[-_]?service/.test(s) ||

    /* Auth */
    /authserver/.test(s) || /auth[-_]?server/.test(s) ||
    /authservice/.test(s) || /auth[-_]?service/.test(s) ||
    /loginserver/.test(s) || /login[-_]?server/.test(s) ||
    /loginservice/.test(s) || /oauth/.test(s) ||
    /passport/.test(s) || /accountserver/.test(s) ||
    /account[-_]?server/.test(s) || /accountservice/.test(s) ||

    /* Profile */
    /profileserver/.test(s) || /profile[-_]?server/.test(s) ||
    /profileservice/.test(s) ||

    /* Event */
    /eventserver/.test(s) || /event[-_]?server/.test(s) ||
    /eventservice/.test(s) ||

    /* Season */
    /seasonserver/.test(s) || /season[-_]?server/.test(s) ||
    /seasonservice/.test(s) ||

    /* Pass */
    /passserver/.test(s) || /royalepass/.test(s) ||
    /royale[-_]?pass/.test(s) ||

    /* Crate */
    /crateserver/.test(s) || /crate[-_]?server/.test(s) ||
    /crateservice/.test(s) ||

    /* Skin / Outfit / Weapon / Vehicle */
    /skinserver/.test(s) || /outfitserver/.test(s) ||
    /weaponserver/.test(s) || /vehicleserver/.test(s) ||

    /* Download / Update / Patch */
    /downloadserver/.test(s) || /download[-_]?server/.test(s) ||
    /updateserver/.test(s) || /update[-_]?server/.test(s) ||
    /patchserver/.test(s) || /patch[-_]?server/.test(s) ||
    /hotfixserver/.test(s) || /hotfix[-_]?server/.test(s) ||

    /* CDN */
    /cdnserver/.test(s) || /cdn[-_]?server/.test(s) ||
    /cdnservice/.test(s) ||

    /* Asset / Resource */
    /assetserver/.test(s) || /asset[-_]?server/.test(s) ||
    /assetservice/.test(s) || /resourceserver/.test(s) ||
    /resource[-_]?server/.test(s) ||

    /* Config / Setting */
    /configserver/.test(s) || /config[-_]?server/.test(s) ||
    /configservice/.test(s) || /settingserver/.test(s) ||

    /* Version */
    /versionserver/.test(s) || /version[-_]?server/.test(s) ||
    /versionservice/.test(s) ||

    /* Check / Verify */
    /checkserver/.test(s) || /verifyserver/.test(s) ||
    /verifyservice/.test(s) ||

    /* Report / Feedback */
    /reportserver/.test(s) || /report[-_]?server/.test(s) ||
    /feedbackserver/.test(s) || /feedback[-_]?server/.test(s) ||

    /* Push / Notify */
    /pushserver/.test(s) || /push[-_]?server/.test(s) ||
    /pushservice/.test(s) || /notifyserver/.test(s) ||
    /notificationserver/.test(s) || /notificationservice/.test(s)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 4. خرائط وأوضاع اللعب
   ═══════════════════════════════════════════════════════════ */

function isGameMode(h, u) {
  h = clean(h);
  u = (u || "").toLowerCase();
  var s = h + " " + u;

  return (
    /* خرائط */
    /erangel/.test(s) || /livik/.test(s) || /sanhok/.test(s) ||
    /miramar/.test(s) || /vikendi/.test(s) || /karakin/.test(s) ||
    /nusa/.test(s) || /taego/.test(s) || /deston/.test(s) ||
    /paramo/.test(s) || /haven/.test(s) || /rondo/.test(s) ||

    /* أوضاع */
    /tdm/.test(s) || /teamdeathmatch/.test(s) || /team[-_]?death/.test(s) ||
    /payload/.test(s) || /metroroyale/.test(s) || /metro[-_]?royale/.test(s) ||
    /zombiemode/.test(s) || /infection/.test(s) ||
    /arena/.test(s) || /ranked/.test(s) || /classic/.test(s) ||
    /arcade/.test(s) || /war/.test(s) || /conquest/.test(s) ||
    /domination/.test(s) || /assault/.test(s) || /rush/.test(s)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 5. البنية التحتية (CDN / Cloud)
   ═══════════════════════════════════════════════════════════ */

function isInfra(h) {
  h = clean(h);
  return (
    /* Tencent Cloud */
    /qcloud/.test(h) || /myqcloud/.test(h) || /tencentcs/.test(h) ||
    /tencent-cloud/.test(h) || /tencentcos/.test(h) || /tencentcdn/.test(h) ||
    /tencentcloud\.com/.test(h) || /dnspod\.cn/.test(h) ||
    /qcloudcdn\.com/.test(h) || /tencentcos\.cn/.test(h) ||
    /gtimg/.test(h) || /qpic\.cn/.test(h) || /idqqimg/.test(h) ||
    /qq\.com/.test(h) || /weixin/.test(h) || /wechat/.test(h) ||
    /tencent\.com/.test(h) || /tencentgames\.com/.test(h) ||
    /igamecj\.com/.test(h) ||

    /* AWS */
    /amazonaws/.test(h) || /aws\.com/.test(h) || /cloudfront/.test(h) ||
    /awsglobalaccelerator/.test(h) || /elasticbeanstalk/.test(h) ||
    /amazon\.com/.test(h) ||

    /* Alibaba */
    /aliyun/.test(h) || /alibaba/.test(h) || /alicdn/.test(h) ||
    /alibabausercontent/.test(h) || /taobao/.test(h) ||

    /* Google Cloud */
    /googleapis\.com/.test(h) || /gstatic\.com/.test(h) ||
    /googleusercontent/.test(h) || /google-cloud/.test(h) ||
    /firebase\.com/.test(h) || /firebaseio\.com/.test(h) ||
    /firebase\.google/.test(h) || /gcloud/.test(h) ||
    /google\.com/.test(h) ||

    /* Azure */
    /azure/.test(h) || /msecnd/.test(h) || /windows\.net/.test(h) ||
    /azureedge/.test(h) || /microsoft\.com/.test(h) ||

    /* CDN */
    /fastly/.test(h) || /cloudflare/.test(h) ||
    /akamai/.test(h) || /akamaiedge/.test(h) || /akamaized/.test(h) ||
    /cdn77/.test(h) || /keycdn/.test(h) || /stackpath/.test(h) ||
    /bootstrapcdn/.test(h) || /jsdelivr/.test(h) || /unpkg/.test(h) ||
    /cdnjs/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 6. Social Login (Facebook / Google / Twitter / Apple)
   ═══════════════════════════════════════════════════════════ */

function isSocialLogin(h) {
  h = clean(h);
  return (
    /* Facebook */
    /facebook\.com/.test(h) || /fbcdn\.net/.test(h) ||
    /facebook\.net/.test(h) || /fb\.com/.test(h) ||
    /fbsbx\.com/.test(h) || /graph\.facebook/.test(h) ||
    /m\.facebook/.test(h) || /www\.facebook/.test(h) ||
    /connect\.facebook/.test(h) || /pixel\.facebook/.test(h) ||

    /* Google */
    /google\.com/.test(h) || /googleapis\.com/.test(h) ||
    /gstatic\.com/.test(h) || /googleusercontent/.test(h) ||
    /accounts\.google/.test(h) || /play[-_]?google/.test(h) ||
    /play-games/.test(h) || /google[-_]?play/.test(h) ||

    /* Twitter / X */
    /twitter\.com/.test(h) || /twimg\.com/.test(h) ||
    /t\.co/.test(h) || /x\.com/.test(h) ||

    /* Apple */
    /apple\.com/.test(h) || /icloud\.com/.test(h) ||
    /mzstatic/.test(h) || /cdn-apple/.test(h) ||

    /* VK */
    /vk\.com/.test(h) || /vkuservideo/.test(h) || /vkcdn/.test(h) ||

    /* Line */
    /line-apps/.test(h) || /line-scdn/.test(h) || /line\.me/.test(h) ||

    /* Email */
    /mail\.google/.test(h) || /outlook/.test(h) ||
    /hotmail/.test(h) || /yahoo\.com/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 7. Push Notifications
   ═══════════════════════════════════════════════════════════ */

function isPush(h) {
  h = clean(h);
  return (
    /* Firebase */
    /fcm\.googleapis/.test(h) || /fcmregistrations/.test(h) ||
    /gcm-http/.test(h) || /gcm\.googleapis/.test(h) ||
    /firebase/.test(h) ||

    /* Apple */
    /courier\.push\.apple/.test(h) || /push-apple/.test(h) ||
    /api\.push\.apple/.test(h) || /gateway\.push\.apple/.test(h) ||

    /* Huawei */
    /push\.hicloud/.test(h) || /hwpush/.test(h) ||

    /* Xiaomi */
    /push\.mi\.com/.test(h) || /mipush/.test(h) ||

    /* Samsung */
    /push\.samsungosp/.test(h) || /samsungpush/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 8. App Store
   ═══════════════════════════════════════════════════════════ */

function isAppStore(h) {
  h = clean(h);
  return (
    /* Google Play */
    /play\.google\.com/.test(h) || /play-games\.google/.test(h) ||
    /play-fe\.google/.test(h) || /play\.googleapis/.test(h) ||
    /android\.clients\.google/.test(h) ||

    /* Apple */
    /apps\.apple\.com/.test(h) || /appstore\.apple/.test(h) ||
    /itunes\.apple\.com/.test(h) || /itunes\.connect\.apple/.test(h) ||
    /buy\.itunes\.apple/.test(h) || /sandbox\.itunes\.apple/.test(h) ||
    /xp\.apple\.com/.test(h) || /gs-loc\.apple/.test(h) ||
    /swcdn\.apple/.test(h) || /swdist\.apple/.test(h) ||
    /updates\.apple/.test(h) || /appldnld\.apple/.test(h) ||

    /* Huawei */
    /appgallery\.huawei/.test(h) || /store-drcn/.test(h) ||
    /store-drru/.test(h) || /appmarket\.huawei/.test(h) ||

    /* Samsung */
    /galaxystore\.samsung/.test(h) || /samsungapps/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 9. Analytics / Telemetry / Ads
   ═══════════════════════════════════════════════════════════ */

function isAnalytics(h) {
  h = clean(h);
  return (
    /* Google */
    /google-analytics/.test(h) || /googletagmanager/.test(h) ||
    /doubleclick/.test(h) || /adservice\.google/.test(h) ||
    /googleadservices/.test(h) || /googlesyndication/.test(h) ||
    /pagead/.test(h) ||

    /* Facebook */
    /facebook\.com\/tr/.test(h) || /connect\.facebook/.test(h) ||
    /pixel\.facebook/.test(h) || /graph\.facebook/.test(h) ||

    /* Tencent */
    /beacon\.qq/.test(h) || /pingtas\.qq/.test(h) ||
    /btrace\.qq/.test(h) || /report\.qq/.test(h) ||
    /sdklog/.test(h) ||

    /* Game Analytics */
    /gameanalytics/.test(h) || /amplitude/.test(h) ||
    /mixpanel/.test(h) || /appsflyer/.test(h) ||
    /adjust\.com/.test(h) || /crashlytics/.test(h) ||
    /sentry\.io/.test(h) || /fabric\.io/.test(h) ||
    /bugsnag/.test(h) || /instabug/.test(h) ||
    /kochava/.test(h) || /singular\.net/.test(h) ||
    /tenjin/.test(h) || /branch\.io/.test(h) ||
    /deltaDNA/.test(h) || /segment\.io/.test(h) ||
    /segment\.com/.test(h) || /firebase-analytics/.test(h) ||

    /* Ad Networks */
    /admob/.test(h) || /unityads/.test(h) || /ironsrc/.test(h) ||
    /vungle/.test(h) || /applovin/.test(h) || /chartboost/.test(h) ||
    /pangle/.test(h) || /mintegral/.test(h) || /toponad/.test(h) ||
    /bidmachine/.test(h) || /adcolony/.test(h) || /startapp/.test(h) ||
    /fyber/.test(h) || /smaato/.test(h) || /mobfox/.test(h) ||
    /mopub/.test(h) || /admost/.test(h) || /tapjoy/.test(h) ||
    /inmobi/.test(h) || /unity3d/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 10. WebRTC / STUN / TURN
   ═══════════════════════════════════════════════════════════ */

function isWebRTC(h) {
  h = clean(h);
  return (
    /stun/.test(h) || /turn/.test(h) || /webrtc/.test(h) ||
    /ice\./.test(h) || /signaling/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 11. API Calls
   ═══════════════════════════════════════════════════════════ */

function isAPI(u) {
  u = (u || "").toLowerCase();
  return (
    /(\/api\/|\/v1\/|\/v2\/|\/v3\/|\/v4\/)/.test(u) &&
    /(game|match|session|battle|player|server|region|lobby|rank|clan|inventory|auth|login|profile|friend|chat|voice|shop|event|season|pass|crate|skin|weapon|vehicle|download|update|patch|hotfix|cdn|asset|resource|config|setting|version|check|verify|report|feedback|push|notify)/.test(u)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 12. Server Discovery / Region Select
   ═══════════════════════════════════════════════════════════ */

function isServerDiscovery(h, u) {
  h = clean(h);
  u = (u || "").toLowerCase();
  return (
    /(serverlist|server[-_]?list|realm|routing|server[-_]?select|region[-_]?select)/.test(u) &&
    /(game|match|player|pubg|tencent|krafton|levelinfinite)/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 13. Middle East Server
   ═══════════════════════════════════════════════════════════ */

function isMEServer(h, u) {
  h = clean(h);
  u = (u || "").toLowerCase();
  return (
    /(me[-_]?east|mena|middle[-_]?east|dubai|uae|riyadh|jeddah|amman)/.test(h) ||
    /(me[-_]?east|mena|middle[-_]?east|dubai|uae|riyadh|jeddah|amman)/.test(u) ||
    /(region=me|region=mena|server=me|server=mena)/.test(u)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 14. System Services
   ═══════════════════════════════════════════════════════════ */

function isSystem(h) {
  h = clean(h);
  return (
    /time\.android/.test(h) || /time\.google/.test(h) ||
    /ntp\.org/.test(h) ||
    /connectivitycheck/.test(h) || /generate_204/.test(h) ||
    /captiveportal/.test(h) || /network-test/.test(h) ||
    /clients3\.google/.test(h) || /clients[0-9]\.google/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 15. Geolocation / IP Check
   ═══════════════════════════════════════════════════════════ */

function isGeo(h) {
  h = clean(h);
  return (
    /geoip/.test(h) || /geo.?loc/.test(h) || /ip-api/.test(h) ||
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
    /ipip\.net/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 16. DNS Leak
   ═══════════════════════════════════════════════════════════ */

function isDNSLeak(h) {
  h = clean(h);
  return (
    /dns\.google/.test(h) || /cloudflare-dns/.test(h) ||
    /opendns/.test(h) || /quad9/.test(h) ||
    /adguard/.test(h) || /nextdns/.test(h) ||
    /controld/.test(h) || /cleanbrowsing/.test(h) ||
    /doh/.test(h) || /dns-over/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 17. Weather / Maps / Location
   ═══════════════════════════════════════════════════════════ */

function isLocation(h) {
  h = clean(h);
  return (
    /weather/.test(h) || /accuweather/.test(h) ||
    /weather\.com/.test(h) || /openweathermap/.test(h) ||
    /maps\.google/.test(h) || /maps\.apple/.test(h) ||
    /waze\.com/.test(h) || /here\.com/.test(h) ||
    /mapbox/.test(h) || /tomtom/.test(h)
  );
}


/* ═══════════════════════════════════════════════════════════
   🎮 18. نطاقات PUBG المعروفة
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
   🎯══════════════════════════════════════════════════════
   ║   التصنيف الرئيسي — كلشي مربوط بالنطاقات            ║
   ║   النطاقات = الجوهر                                   ║
   ║   كل شيء يمر بالبروكسي الأردني                       ║
   ╚══════════════════════════════════════════════════════
   ═══════════════════════════════════════════════════════════ */

function classify(h, u) {
  h = clean(h);
  u = (u || "").toLowerCase();


  /* ═══════════════════════════════════════════════════════
     المستوى 1: نطاقات PUBG المباشرة
     ═══════════════════════════════════════════════════════ */

  if (isKnownPUBG(h)) {
    return { cat: "PUBG-KNOWN", tier: 1, desc: "نطاق PUBG معروف" };
  }

  if (isPUBGDirect(h)) {
    return { cat: "PUBG-DIRECT", tier: 1, desc: "نطاق PUBG مباشر" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 2: الناشرين والمطورين
     ═══════════════════════════════════════════════════════ */

  if (isPublisher(h)) {
    return { cat: "PUBLISHER", tier: 1, desc: "ناشر/مطور PUBG" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 3: خدمات اللعب
     ═══════════════════════════════════════════════════════ */

  if (isGameService(h, u)) {
    return { cat: "GAME-SERVICE", tier: 1, desc: "خدمة لعب PUBG" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 4: خرائط وأوضاع اللعب
     ═══════════════════════════════════════════════════════ */

  if (isGameMode(h, u)) {
    return { cat: "GAME-MODE", tier: 1, desc: "خريطة/وضع لعب" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 5: البنية التحتية
     ═══════════════════════════════════════════════════════ */

  if (isInfra(h)) {
    return { cat: "INFRA", tier: 2, desc: "بنية تحتية CDN/Cloud" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 6: Social Login
     ═══════════════════════════════════════════════════════ */

  if (isSocialLogin(h)) {
    return { cat: "SOCIAL-LOGIN", tier: 2, desc: "تسجيل دخول اجتماعي" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 7: Push Notifications
     ═══════════════════════════════════════════════════════ */

  if (isPush(h)) {
    return { cat: "PUSH", tier: 2, desc: "إشعارات" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 8: App Store
     ═══════════════════════════════════════════════════════ */

  if (isAppStore(h)) {
    return { cat: "APP-STORE", tier: 2, desc: "متجر تطبيقات" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 9: Analytics / Telemetry / Ads
     ═══════════════════════════════════════════════════════ */

  if (isAnalytics(h)) {
    return { cat: "ANALYTICS", tier: 3, desc: "تحليلات/إعلانات" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 10: WebRTC / STUN / TURN
     ═══════════════════════════════════════════════════════ */

  if (isWebRTC(h)) {
    return { cat: "WEBRTC", tier: 3, desc: "WebRTC/STUN/TURN" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 11: API Calls
     ═══════════════════════════════════════════════════════ */

  if (isAPI(u)) {
    return { cat: "API", tier: 2, desc: "API call" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 12: Server Discovery
     ═══════════════════════════════════════════════════════ */

  if (isServerDiscovery(h, u)) {
    return { cat: "SERVER-DISCOVERY", tier: 1, desc: "اكتشاف سيرفر" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 13: Middle East Server
     ═══════════════════════════════════════════════════════ */

  if (isMEServer(h, u)) {
    return { cat: "ME-SERVER", tier: 1, desc: "سيرفر شرق أوسط" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 14: System Services
     ═══════════════════════════════════════════════════════ */

  if (isSystem(h)) {
    return { cat: "SYSTEM", tier: 3, desc: "خدمة نظام" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 15: Geolocation / IP Check
     ═══════════════════════════════════════════════════════ */

  if (isGeo(h)) {
    return { cat: "GEO", tier: 3, desc: "تحديد موقع" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 16: DNS Leak
     ═══════════════════════════════════════════════════════ */

  if (isDNSLeak(h)) {
    return { cat: "DNS-LEAK", tier: 3, desc: "DNS" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 17: Weather / Maps / Location
     ═══════════════════════════════════════════════════════ */

  if (isLocation(h)) {
    return { cat: "LOCATION", tier: 3, desc: "خرائط/طقس" };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 18: نطاقات أردنية
     ═══════════════════════════════════════════════════════ */

  if (isJO(h)) {
    return { cat: "JORDAN", tier: 1, desc: "نطاق أردني" };
  }

  if (isJOIP(h)) {
    return { cat: "JO-IP", tier: getJOTier(h), desc: "IP أردني Tier " + getJOTier(h) };
  }


  /* ═══════════════════════════════════════════════════════
     المستوى 19: الباقي
     ═══════════════════════════════════════════════════════ */

  return { cat: "UNKNOWN", tier: 4, desc: "غير معروف" };
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
   🚀══════════════════════════════════════════════════════
   ║   FindProxyForURL — المحرك الرئيسي                    ║
   ║   كلشي داخل ببجي موبايل مربوط بالنطاقات الأردنية     ║
   ╚══════════════════════════════════════════════════════
   ═══════════════════════════════════════════════════════════ */

function FindProxyForURL(url, host) {

  host = clean(host);
  url = url || "";


  /* ──── مرحلة 1: تصنيف ──── */

  var info = classify(host, url);


  /* ──── مرحلة 2: Sticky ──── */

  var s = sticky(host);
  if (s !== null) {
    return s;
  }


  /* ──── مرحلة 3: بروكسي أردني ──── */

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
  var info = classify(host, url);
  return {
    host: host,
    url: url,
    classification: info,
    proxy: FindProxyForURL(url, host),
    jordanTier: getJOTier(host),
    checks: {
      isKnownPUBG: isKnownPUBG(host),
      isPUBGDirect: isPUBGDirect(host),
      isPublisher: isPublisher(host),
      isGameService: isGameService(host, url),
      isGameMode: isGameMode(host, url),
      isInfra: isInfra(host),
      isSocialLogin: isSocialLogin(host),
      isPush: isPush(host),
      isAppStore: isAppStore(host),
      isAnalytics: isAnalytics(host),
      isWebRTC: isWebRTC(host),
      isAPI: isAPI(url),
      isServerDiscovery: isServerDiscovery(host, url),
      isMEServer: isMEServer(host, url),
      isSystem: isSystem(host),
      isGeo: isGeo(host),
      isDNSLeak: isDNSLeak(host),
      isLocation: isLocation(host),
      isJordanDomain: isJO(host),
      isJordanIP: isJOIP(host)
    },
    tiers: {
      tier1: "46.32.96.0/19 (Benchmark)",
      tier2: "109.107.224.0/19, 212.34.0.0/19 (قوي جدًا)",
      tier3: "212.35.64.0/19, 212.118.0.0/19, 213.139.32.0/19, 213.186.160.0/19, 194.165.128.0/19 (قوي)"
    }
  };
}
