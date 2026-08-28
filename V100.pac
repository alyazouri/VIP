// ============================================================================
//   PUBG MOBILE - ADVANCED ROUTING PAC SCRIPT (JORDAN VIP EDITION - V3.1)
//   Optimized for Umniah Jordan (109.107.236.46) | Ports: 20002, 8080
// ============================================================================

// ================= 1. PROXY CONFIGURATION =================
var PROXY_IP   = "109.107.236.46";            // سيرفر أمنية الأردن
var PORT_MATCH = "20002";                     // بورت خوادم المعركة والمباراة
var PORT_LOBBY = "8080";                      // بورت اللوبي والماتش ميكنج

var MATCH_JO   = "PROXY " + PROXY_IP + ":" + PORT_MATCH;
var LOBBY_JO   = "PROXY " + PROXY_IP + ":" + PORT_LOBBY;
var BLOCK      = "PROXY 127.0.0.1:9";
var DIRECT     = "DIRECT";

// ================= 2. ENGINE CONTROL =================
var CONFIG = {
  CDN_DIRECT: true,            // تنزيل الخرائط والتحديثات مباشرة (أقصى سرعة + حماية البروكسي)
  VOICE_DIRECT: false,         // false = صوت التيم عبر اللوبي الأردني | true = مباشر
  STRICT_LOW_PING: true,       // حظر أي سيرفر مباراة خارج النطاقات الذهبية والفضية
  ALLOW_GULF_TIER2: true,      // true = السماح بسيرفرات الخليج (دبي/الرياض 28-40ms) إذا لم يتوفر أردني
  IDLE_MATCH_RESET: 120000,    // 120 ثانية خمول في اللوبي تعيد تصفير القفل للقيم التالي
  MAX_MATCH_TIME: 2100000      // 35 دقيقة الحد الأقصى للمباراة الواحدة قبل التصفير التلقائي
};

// ================= 3. PING & JITTER ORDERED RANGES =================
// تم إعادة الترتيب بما يتناسب مع موقع السيرفر على شبكة أمنية الأردن (Umniah)

// 🥇 TIER 1: شبكة أمنية الأردن الداخلية (1ms - 8ms | Jitter: 0-1ms)
// On-Net بنفس مقسم وداتا سنتر السيرفر
var TIER1_UMNIAH_JO = [
  ["109.107.224.0","255.255.224.0"],   // النطاق الأساسي لمخدم البروكسي
  ["176.57.0.0",   "255.255.224.0"],
  ["176.57.48.0",  "255.255.240.0"],
  ["84.18.32.0",   "255.255.224.0"],
  ["84.18.64.0",   "255.255.224.0"],
  ["93.191.176.0", "255.255.248.0"],
  ["185.109.192.0","255.255.252.0"],
  ["185.253.112.0","255.255.252.0"]
];

// 🥈 TIER 2: باقي شبكات الأردن (زين، أورنج، فيتل) + فلسطين (8ms - 20ms | Jitter: 1-3ms)
// ربط محلي مباشر في عمّان (JOHX) وكوابل فايبر برية
var TIER2_LOCAL_JO = [
  // زين الأردن (Zain Jordan)
  ["176.29.0.0",   "255.255.0.0"],
  ["176.28.128.0", "255.255.128.0"],
  ["94.249.0.0",   "255.255.128.0"],
  ["82.212.64.0",  "255.255.192.0"],
  ["188.123.160.0","255.255.224.0"],
  ["46.185.128.0", "255.255.128.0"],
  ["92.253.0.0",   "255.255.128.0"],
  ["212.118.0.0",  "255.255.224.0"],
  ["217.144.0.0",  "255.255.240.0"],
  ["37.202.64.0",  "255.255.192.0"],
  ["178.77.128.0", "255.255.192.0"],
  // أورنج الأردن (Orange Telecom)
  ["86.108.0.0",   "255.255.128.0"],
  ["212.35.64.0",  "255.255.224.0"],
  ["91.186.224.0", "255.255.224.0"],
  ["149.200.128.0","255.255.128.0"],
  ["213.139.32.0", "255.255.224.0"],
  ["213.186.160.0","255.255.224.0"],
  ["95.172.192.0", "255.255.224.0"],
  ["80.90.160.0",  "255.255.240.0"],
  // فيتل وربط محلي (VTEL / Local)
  ["91.106.96.0",  "255.255.240.0"],
  ["188.247.64.0", "255.255.224.0"],
  // فلسطين - بالتل (Paltel)
  ["213.6.0.0",    "255.255.0.0"]
];

// 🥉 TIER 3: سيرفرات الخليج الرسمية (دبي والرياض) (28ms - 42ms | Jitter: 3-5ms)
// خوادم AWS Dubai (me-central-1) و موبايلي/STC الرياض
var TIER3_GULF_LOWPING = [
  ["195.229.0.0",  "255.254.0.0"],    // اتصالات الإمارات / دبي AWS
  ["31.153.0.0",   "255.255.0.0"]     // موبايلي السعودية / الرياض
];

// ================= 4. SESSION CONTROLLER =================
var SESSION = {
  matchNet: null,       // البادئة المقفولة لسيرفر المباراة الحالي (/24)
  matchHost: null,      // عنوان خادم المباراة الحالي
  matchStart: 0,        // توقيت بدء المباراة
  lastActivity: 0,      // توقيت آخر نشاط للمباراة
  dnsCache: {},         // ذاكرة التخزين المؤقت للأسماء
  dnsCount: 0
};

// ================= 5. UTILITY FUNCTIONS =================
function now() {
  return (new Date()).getTime();
}

function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isIPv4(h) {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h);
}

// فحص تدرج البنق حسب ترتيب الأولويات الفيزيائية
function isLowPingServer(ip) {
  var i;
  // أولوية 1: سيرفرات شبكة أمنية الأردن (On-Net)
  for (i = 0; i < TIER1_UMNIAH_JO.length; i++) {
    if (isInNet(ip, TIER1_UMNIAH_JO[i][0], TIER1_UMNIAH_JO[i][1])) return true;
  }
  // أولوية 2: سيرفرات باقي شبكات الأردن (زين، أورنج) وفلسطين
  for (i = 0; i < TIER2_LOCAL_JO.length; i++) {
    if (isInNet(ip, TIER2_LOCAL_JO[i][0], TIER2_LOCAL_JO[i][1])) return true;
  }
  // أولوية 3: خوادم الخليج (دبي والرياض)
  if (CONFIG.ALLOW_GULF_TIER2) {
    for (i = 0; i < TIER3_GULF_LOWPING.length; i++) {
      if (isInNet(ip, TIER3_GULF_LOWPING[i][0], TIER3_GULF_LOWPING[i][1])) return true;
    }
  }
  return false;
}

// حل العناوين مع التخزين المؤقت السريع
function resolvePinned(host) {
  if (isIPv4(host)) return host;

  if (SESSION.dnsCache[host]) {
    return SESSION.dnsCache[host];
  }

  var ip = dnsResolve(host);
  if (ip && ip.indexOf(":") === -1) {
    if (SESSION.dnsCount > 250) {
      SESSION.dnsCache = {};
      SESSION.dnsCount = 0;
    }
    SESSION.dnsCache[host] = ip;
    SESSION.dnsCount++;
  }
  return ip;
}

// التصفير الذكي للجلسة عند انتهاء المباراة أو الخمول في اللوبي
function refreshSession() {
  var t = now();
  if (SESSION.matchNet) {
    if ((t - SESSION.matchStart > CONFIG.MAX_MATCH_TIME) || 
        (t - SESSION.lastActivity > CONFIG.IDLE_MATCH_RESET)) {
      SESSION.matchNet = null;
      SESSION.matchHost = null;
      SESSION.matchStart = 0;
      SESSION.lastActivity = 0;
    }
  }
}

// ================= 6. TRAFFIC CLASSIFICATION =================
function isPUBG(h, u) {
  // فحص نطاقات ببجي والشركات الناشرة
  if (/pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|igamecj|gcloudcs|amsoveasea|anticheatexpert|gameloop|syzs\.qq/i.test(h)) {
    return true;
  }
  // فحص الاتصال المباشر بالآي بي ومنافذ خوادم اللعبة
  if (isIPv4(h)) {
    if (/(2000[0-5]|8080|9030|10012|17500|7086|8011)/.test(u)) return true;
    if (SESSION.matchNet && h.indexOf(SESSION.matchNet) === 0) return true;
  }
  return false;
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|package|filedownload|down\.anticheatexpert|dlied|down\.igamecj/i.test(u + h);
}

function isVoice(u, h) {
  return /gvoice|vivox|voice/i.test(u + h);
}

function isMatch(u, h) {
  // منافذ خوادم المعركة (بما في ذلك 20002)
  if (/(2000[0-5]|10012|17500|7086|8011)/.test(u)) return true;
  // كلمات خوادم اللعب والمباراة
  return /match|battle|combat|game|realtime|sync|udp|tick|zone|pzone|relay|room|session/i.test(u + h);
}

// ================= 7. MAIN DISPATCHER =================
function FindProxyForURL(url, host) {
  var rawHost = host.toLowerCase();
  host = norm(rawHost);
  var target = (url + " " + host).toLowerCase();

  // تحديث حالة الجلسة تلقائياً
  refreshSession();

  // 1. أي ترافيك خارج ببجي (يوتيوب، جوجل، واتساب...) يمر مباشر 100%
  if (!isPUBG(host, url)) {
    return DIRECT;
  }

  // 2. التحديثات والخرائط تمر مباشر لأقصى سرعة وعدم خنق البروكسي
  if (isCDN(target, host)) {
    return CONFIG.CDN_DIRECT ? DIRECT : LOBBY_JO;
  }

  // 3. المحادثات الصوتية
  if (isVoice(target, host)) {
    return CONFIG.VOICE_DIRECT ? DIRECT : LOBBY_JO;
  }

  // 4. حل الآي بي المستهدف
  var ip = resolvePinned(host);
  if (!ip) return DIRECT;

  // 5. حظر تسريب IPv6 لضمان ثبات التوجيه
  if (ip.indexOf(":") > -1) {
    return BLOCK;
  }

  // 6. توجيه وفلترة خادم المباراة (Battle / Match Server)
  if (isMatch(target, host)) {
    var net24 = ip.split('.').slice(0, 3).join('.');
    var t = now();

    // حظر السيرفرات البعيدة (أوروبا 70ms+) لإجبار اللعبة على سيرفرات الأردن/الخليج
    if (CONFIG.STRICT_LOW_PING && !isLowPingServer(ip)) {
      return BLOCK;
    }

    // أول اتصال بسيرفر المباراة: قفل الجلسة على هذا النطاق
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      SESSION.matchStart = t;
      SESSION.lastActivity = t;
      return MATCH_JO;
    }

    // أثناء استمرار الجيم: التحقق من التواجد على نفس السيرفر والنطاق
    if (host === SESSION.matchHost || net24 === SESSION.matchNet) {
      SESSION.lastActivity = t;
      return MATCH_JO;
    }

    // محاولة تغيير السيرفر أثناء القيم: حظر لمنع الانتقال لسيرفر أبعد
    return BLOCK;
  }

  // 7. جميع طلبات اللوبي والماتش ميكنج والأصدقاء تمر عبر بروكسي أمنية بورت 8080
  return LOBBY_JO;
}
