// ============================================================
// GAME BOOSTER ALPHA v2.0
// Ultra-optimized PAC for PUBG Mobile
// Focus: Lobby Speed + In-Game Performance
// ============================================================

// ================= ADVANCED CONFIGURATION =================
var CONFIG = {
  // Match proxies - sorted by speed (fastest first)
  MATCH_TIER1: "PROXY 46.185.131.218:20001",    // أسرع - للماتش الحي
  MATCH_TIER2: "PROXY 212.35.66.45:8085",        // احتياطي سريع
  MATCH_TIER3: "PROXY 46.185.131.218:443",       // احتياطي ثانوي
  
  // Lobby proxies - optimized pool
  LOBBY_FAST: [
    "PROXY 212.35.66.45:8181",    // Port 8181 عادة أسرع للويب سوكت
    "PROXY 46.185.131.218:443",   // HTTPS port - استقرار عالي
    "PROXY 212.35.66.45:8085"     // احتياطي
  ],
  
  // Special channels
  VOICE_PROXY: "PROXY 46.185.131.218:20001",     // صوت عالي الجودة
  CDN_DIRECT: "DIRECT",                           // CDN مباشر لأقصى سرعة
  
  // Control
  BLOCK: "PROXY 127.0.0.1:9",
  DIRECT: "DIRECT",
  
  // Performance tuning
  DNS_CACHE_TIME: 600000,        // 10 دقائق
  STICKY_SESSION_TIME: 1800000,  // 30 دقيقة للماتش
  AGGRESSIVE_BLOCK: true          // حظر قوي للمناطق البعيدة
};

// ================= JORDAN IP RANGES (EXPANDED) =================
// هذه النطاقات تشمل جميع مزودي الخدمة الرئيسيين في الأردن
// مما يضمن توجيه صحيح لأي سيرفر محلي
var JORDAN_RANGES = [
  // 🟠 Orange Jordan (الأفضل والأكثر شيوعًا للألعاب)
  ["37.202.64.0",  "255.255.192.0"],   // /18
  ["37.252.0.0",   "255.254.0.0"],     // /15
  ["85.159.216.0", "255.255.248.0"],   // /21
  ["93.93.144.0",  "255.255.248.0"],   // /21
  ["93.95.200.0",  "255.255.248.0"],   // /21
  ["94.127.208.0", "255.255.248.0"],   // /21

  // 🔵 Zain Jordan (ممتاز لـ FPS)
  ["46.185.128.0", "255.255.128.0"],   // /17
  ["77.245.0.0",   "255.255.240.0"],   // /20
  ["176.28.128.0", "255.255.128.0"],   // /17
  ["178.77.128.0", "255.255.192.0"],   // /18

  // 🟣 Umniah (جيد – Ping متوسط)
  ["176.57.0.0",   "255.255.224.0"],   // /19
  ["176.57.48.0",  "255.255.240.0"],   // /20
  ["188.123.160.0","255.255.224.0"],   // /19

  // ⚪ نطاقات عامة تُستخدم كثيرًا في Steam / Epic
  ["79.134.128.0", "255.255.224.0"],   // /19
  ["79.173.192.0", "255.255.192.0"],   // /18
  ["149.200.128.0","255.255.128.0"]    // /17
];

// ================= PRIORITY BLACKLIST =================
// هذه القائمة تحتوي على نطاقات السيرفرات البعيدة التي تسبب ping عالي
// الحظر هنا يجبر اللعبة على استخدام سيرفرات أقرب
var HIGH_LATENCY_RANGES = [
  // Europe West (France, Germany, UK)
  ["2.0.0.0", "255.0.0.0"],
  ["5.0.0.0", "254.0.0.0"],          // نطاق كبير لأوروبا
  ["31.0.0.0", "255.0.0.0"],
  ["37.0.0.0", "255.0.0.0"],
  ["46.0.0.0", "255.240.0.0"],       // تجنب تداخل مع الأردن
  ["51.0.0.0", "255.0.0.0"],
  ["62.0.0.0", "255.0.0.0"],
  ["78.0.0.0", "255.0.0.0"],
  ["80.0.0.0", "255.240.0.0"],       // تجنب تداخل مع الأردن
  ["82.0.0.0", "255.0.0.0"],
  ["83.0.0.0", "255.0.0.0"],
  ["84.0.0.0", "255.0.0.0"],
  ["85.0.0.0", "255.240.0.0"],       // تجنب تداخل مع الأردن
  ["86.0.0.0", "255.0.0.0"],
  ["87.0.0.0", "255.0.0.0"],
  ["88.0.0.0", "255.0.0.0"],
  ["89.0.0.0", "255.0.0.0"],
  ["90.0.0.0", "255.0.0.0"],
  ["91.0.0.0", "255.0.0.0"],
  ["92.0.0.0", "255.0.0.0"],
  ["93.0.0.0", "255.0.0.0"],
  ["94.0.0.0", "255.0.0.0"],
  ["95.0.0.0", "255.0.0.0"],
  
  // Russia & Eastern Europe  
  ["77.88.0.0", "255.248.0.0"],
  ["94.100.0.0", "255.252.0.0"],
  ["95.24.0.0", "255.248.0.0"],
  ["109.0.0.0", "255.0.0.0"],
  ["176.0.0.0", "255.240.0.0"],      // تجنب تداخل مع الأردن
  ["178.0.0.0", "255.0.0.0"],
  ["185.0.0.0", "255.240.0.0"],      // تجنب تداخل مع الأردن
  ["188.0.0.0", "255.240.0.0"],      // تجنب تداخل مع الأردن
  
  // Asia Pacific (high latency from Middle East)
  ["1.0.0.0", "255.0.0.0"],          // China/Asia
  ["14.0.0.0", "255.0.0.0"],
  ["27.0.0.0", "255.0.0.0"],
  ["36.0.0.0", "255.0.0.0"],
  ["39.0.0.0", "255.0.0.0"],
  ["42.0.0.0", "255.0.0.0"],
  ["43.0.0.0", "255.0.0.0"],
  ["49.0.0.0", "255.0.0.0"],
  ["58.0.0.0", "255.254.0.0"],
  ["59.0.0.0", "255.0.0.0"],
  ["60.0.0.0", "255.252.0.0"],
  ["61.0.0.0", "255.0.0.0"],
  ["101.0.0.0", "255.0.0.0"],
  ["103.0.0.0", "255.0.0.0"],
  ["106.0.0.0", "255.254.0.0"],
  ["110.0.0.0", "255.252.0.0"],
  ["111.0.0.0", "255.0.0.0"],
  ["112.0.0.0", "255.248.0.0"],
  ["113.0.0.0", "255.0.0.0"],
  ["114.0.0.0", "255.254.0.0"],
  ["115.0.0.0", "255.0.0.0"],
  ["116.0.0.0", "255.252.0.0"],
  ["117.0.0.0", "255.0.0.0"],
  ["118.0.0.0", "255.254.0.0"],
  ["119.0.0.0", "255.0.0.0"],
  ["120.0.0.0", "255.248.0.0"],
  ["121.0.0.0", "255.0.0.0"],
  ["122.0.0.0", "255.254.0.0"],
  ["123.0.0.0", "255.0.0.0"],
  ["124.0.0.0", "255.252.0.0"],
  ["125.0.0.0", "255.0.0.0"],
  ["126.0.0.0", "255.0.0.0"],
  ["127.0.0.0", "255.0.0.0"],        // Loopback
  ["128.0.0.0", "255.0.0.0"],
  ["129.0.0.0", "255.0.0.0"],
  ["130.0.0.0", "255.0.0.0"],
  ["131.0.0.0", "255.0.0.0"],
  ["132.0.0.0", "255.0.0.0"],
  ["133.0.0.0", "255.0.0.0"],
  ["134.0.0.0", "255.0.0.0"],
  ["135.0.0.0", "255.0.0.0"],
  
  // Southeast Asia
  ["163.0.0.0", "255.0.0.0"],
  ["182.0.0.0", "255.0.0.0"],
  ["183.0.0.0", "255.0.0.0"],
  ["202.0.0.0", "255.0.0.0"],
  ["203.0.0.0", "255.0.0.0"],
  ["210.0.0.0", "255.0.0.0"],
  ["211.0.0.0", "255.0.0.0"],
  ["218.0.0.0", "255.0.0.0"],
  ["219.0.0.0", "255.0.0.0"],
  ["220.0.0.0", "255.0.0.0"],
  ["221.0.0.0", "255.0.0.0"],
  ["222.0.0.0", "255.0.0.0"],
  ["223.0.0.0", "255.0.0.0"]
];

// ================= SMART SESSION MANAGER =================
// هذا الكائن يحفظ معلومات الجلسة الحالية لتحسين الأداء
// الفكرة هي أن نتذكر اختياراتنا السابقة ونعيد استخدامها
var SESSION = {
  // Match session tracking (حفظ معلومات المباراة الحالية)
  match: {
    networkPrefix: null,    // أول 24 بت من IP (مثال: 46.185.131)
    hostname: null,         // اسم المضيف الأساسي للماتش
    proxy: null,           // البروكسي المستخدم
    startTime: 0,          // وقت بداية الماتش
    locked: false          // هل المباراة مقفلة؟
  },
  
  // DNS cache (ذاكرة مؤقتة لتسريع البحث)
  dns: {},
  
  // Lobby proxy rotation (تتبع البروكسيات المستخدمة للوبي)
  lobbyIndex: 0,
  lobbyLastSwitch: 0,
  
  // Performance metrics (قياسات الأداء)
  counters: {
    matchRequests: 0,
    lobbyRequests: 0,
    blockedRequests: 0,
    directRequests: 0
  }
};

// ================= ULTRA-FAST HELPERS =================

// تنظيف اسم المضيف - نسخة محسّنة بدون regex
function cleanHost(host) {
  var colonPos = host.indexOf(':');
  if (colonPos === -1) return host;
  return host.substring(0, colonPos);
}

// فحص النطاق - نسخة محسّنة مع early exit
function matchesNetwork(ip, network, mask) {
  // التحقق السريع من صحة الـ IP
  if (!ip || ip.length < 7 || ip.length > 15) return false;
  
  var ipBytes = ip.split('.');
  var netBytes = network.split('.');
  var maskBytes = mask.split('.');
  
  // نفحص بايت بايت ونخرج فوراً عند أول عدم تطابق
  for (var i = 0; i < 4; i++) {
    var ipByte = parseInt(ipBytes[i], 10);
    var netByte = parseInt(netBytes[i], 10);
    var maskByte = parseInt(maskBytes[i], 10);
    
    // إذا كان الماسك صفر، لا نحتاج للفحص
    if (maskByte === 0) continue;
    
    // فحص التطابق
    if ((ipByte & maskByte) !== (netByte & maskByte)) {
      return false;
    }
  }
  
  return true;
}

// فحص القائمة مع تحسين ترتيب العناصر الأكثر احتمالاً
function isInRangeList(ip, rangeList) {
  // نفحص أولاً النطاقات الأكثر احتمالاً (Orange و Zain)
  // هذا يقلل عدد المقارنات في المتوسط
  var listLength = rangeList.length;
  
  for (var i = 0; i < listLength; i++) {
    if (matchesNetwork(ip, rangeList[i][0], rangeList[i][1])) {
      return true;
    }
  }
  
  return false;
}

// DNS resolver مع cache ذكي جداً
function fastResolve(hostname) {
  var currentTime = new Date().getTime();
  
  // نتحقق من الـ cache أولاً
  var cached = SESSION.dns[hostname];
  if (cached) {
    // إذا كان الـ cache حديث (أقل من 10 دقائق)
    if (currentTime - cached.time < CONFIG.DNS_CACHE_TIME) {
      return cached.ip;
    }
  }
  
  // نحاول الحصول على IP جديد
  var resolvedIP = null;
  try {
    resolvedIP = dnsResolve(hostname);
    
    // نتأكد أنه IPv4 صحيح
    if (resolvedIP && resolvedIP.indexOf(':') === -1 && resolvedIP.indexOf('.') > -1) {
      // نحفظ في الـ cache
      SESSION.dns[hostname] = {
        ip: resolvedIP,
        time: currentTime
      };
      return resolvedIP;
    }
  } catch (error) {
    // في حالة الخطأ، نستخدم القيمة القديمة إن وجدت
  }
  
  // إذا فشلنا ولكن لدينا cache قديم، نستخدمه
  if (cached && cached.ip) {
    return cached.ip;
  }
  
  return null;
}

// اختيار بروكسي اللوبي بذكاء
function selectLobbyProxy(hostname, ip) {
  var now = new Date().getTime();
  
  // نحسب hash من الـ hostname و IP معاً للحصول على توزيع أفضل
  // هذه الطريقة تضمن أن نفس الخدمة تستخدم دائماً نفس البروكسي
  var hashValue = 0;
  var combined = hostname + ip;
  
  for (var i = 0; i < combined.length; i++) {
    var char = combined.charCodeAt(i);
    hashValue = ((hashValue << 5) - hashValue) + char;
    hashValue = hashValue & hashValue; // تحويل لـ 32 bit integer
  }
  
  // نتأكد من أن القيمة موجبة
  if (hashValue < 0) hashValue = -hashValue;
  
  // نختار من pool البروكسيات
  var poolSize = CONFIG.LOBBY_FAST.length;
  var selectedIndex = hashValue % poolSize;
  
  return CONFIG.LOBBY_FAST[selectedIndex];
}

// استخراج network prefix (أول 24 بت من IP)
function getNetworkPrefix(ip) {
  var parts = ip.split('.');
  if (parts.length !== 4) return null;
  return parts[0] + '.' + parts[1] + '.' + parts[2];
}

// ================= TRAFFIC DETECTION (ULTRA PRECISE) =================

// هذه الدوال تحدد نوع الترافيك بدقة عالية
// كلما كان التحديد أدق، كان التوجيه أفضل

function isPUBGTraffic(hostname) {
  // نبحث عن أي كلمة مرتبطة بـ PUBG أو الناشرين
  var keywords = [
    'pubg', 'pubgm', 'pubgmobile',
    'tencent', 'krafton', 'proximabeta',
    'lightspeed', 'quantum', 'levelinfinite',
    'intl', 'igame', 'gameloop'
  ];
  
  var lowerHost = hostname.toLowerCase();
  for (var i = 0; i < keywords.length; i++) {
    if (lowerHost.indexOf(keywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isMatchTraffic(url, hostname) {
  // هذه الكلمات تدل على ترافيك المباراة الحية
  // نبحث في الـ URL والـ hostname معاً
  var combined = (url + hostname).toLowerCase();
  
  var matchKeywords = [
    'match', 'game', 'battle', 'combat',
    'realtime', 'rt-', 'sync', 'live',
    'play', 'arena', 'room', 'session',
    'udp', 'server', 'pvp', 'versus'
  ];
  
  for (var i = 0; i < matchKeywords.length; i++) {
    if (combined.indexOf(matchKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isLobbyTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var lobbyKeywords = [
    'lobby', 'matchmaking', 'mm-', 'queue',
    'dispatch', 'gateway', 'entrance', 'portal',
    'region', 'join', 'connect', 'recruit',
    'waiting', 'ready', 'prepare'
  ];
  
  for (var i = 0; i < lobbyKeywords.length; i++) {
    if (combined.indexOf(lobbyKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isVoiceTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var voiceKeywords = [
    'voice', 'audio', 'rtc', 'webrtc',
    'agora', 'voip', 'call', 'speak',
    'mic', 'sound', 'talk', 'chat'
  ];
  
  for (var i = 0; i < voiceKeywords.length; i++) {
    if (combined.indexOf(voiceKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isSocialTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var socialKeywords = [
    'friend', 'social', 'squad', 'team',
    'party', 'clan', 'guild', 'group',
    'invite', 'presence', 'status', 'profile',
    'message', 'notification'
  ];
  
  for (var i = 0; i < socialKeywords.length; i++) {
    if (combined.indexOf(socialKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isCDNTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var cdnKeywords = [
    'cdn', 'content', 'asset', 'resource',
    'static', 'media', 'download', 'dl-',
    'patch', 'update', 'file', 'data'
  ];
  
  for (var i = 0; i < cdnKeywords.length; i++) {
    if (combined.indexOf(cdnKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

function isAnalyticsTraffic(url, hostname) {
  var combined = (url + hostname).toLowerCase();
  
  var analyticsKeywords = [
    'analytics', 'telemetry', 'metrics',
    'track', 'beacon', 'stats', 'report',
    'log', 'crash', 'error', 'monitor'
  ];
  
  for (var i = 0; i < analyticsKeywords.length; i++) {
    if (combined.indexOf(analyticsKeywords[i]) !== -1) {
      return true;
    }
  }
  
  return false;
}

// ================= MAIN ROUTING ENGINE =================

function FindProxyForURL(url, host) {
  
  // ===== STEP 1: NORMALIZE INPUT =====
  // نقوم بتنظيف الـ host وتحويله للأحرف الصغيرة
  host = cleanHost(host.toLowerCase());
  
  // ===== STEP 2: FILTER NON-GAME TRAFFIC =====
  // نسمح بمرور مباشر لأي شيء غير متعلق بـ PUBG
  if (!isPUBGTraffic(host)) {
    return CONFIG.DIRECT;
  }
  
  // ===== STEP 3: DNS RESOLUTION =====
  // نحل اسم المضيف للحصول على IP
  var ipAddress = fastResolve(host);
  
  // إذا فشل الـ DNS أو كان IPv6، نحظر
  if (!ipAddress || ipAddress.indexOf(':') !== -1) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 4: GEOGRAPHIC BLOCKING =====
  // نحظر أي IP في نطاقات عالية الـ latency
  if (CONFIG.AGGRESSIVE_BLOCK && isInRangeList(ipAddress, HIGH_LATENCY_RANGES)) {
    SESSION.counters.blockedRequests++;
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 5: MATCH TRAFFIC HANDLING (HIGHEST PRIORITY) =====
  // هذا هو أهم جزء - ترافيك المباراة الحية
  if (isMatchTraffic(url, host)) {
    SESSION.counters.matchRequests++;
    
    // نتأكد أن السيرفر في الأردن
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      return CONFIG.BLOCK;
    }
    
    var networkPrefix = getNetworkPrefix(ipAddress);
    var now = new Date().getTime();
    
    // إذا كانت هذه أول طلب ماتش في الجلسة
    if (!SESSION.match.locked) {
      SESSION.match.networkPrefix = networkPrefix;
      SESSION.match.hostname = host;
      SESSION.match.proxy = CONFIG.MATCH_TIER1;
      SESSION.match.startTime = now;
      SESSION.match.locked = true;
      
      // نرجع البروكسي الأسرع مع fallback
      return CONFIG.MATCH_TIER1 + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
    }
    
    // إذا كانت الجلسة مقفلة، نتحقق من التطابق
    // هذا يمنع التبديل بين سيرفرات مختلفة أثناء المباراة
    if (host === SESSION.match.hostname && networkPrefix === SESSION.match.networkPrefix) {
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2 + "; " + CONFIG.MATCH_TIER3;
    }
    
    // إذا كان الطلب من نفس الشبكة لكن مضيف مختلف
    // قد يكون voice أو sync server ثانوي
    if (networkPrefix === SESSION.match.networkPrefix) {
      return SESSION.match.proxy + "; " + CONFIG.MATCH_TIER2;
    }
    
    // إذا لم يتطابق، نحظره لمنع lag
    return CONFIG.BLOCK;
  }
  
  // ===== STEP 6: VOICE TRAFFIC (HIGH PRIORITY) =====
  // الصوت مهم جداً للتواصل في الفريق
  if (isVoiceTraffic(url, host)) {
    // نسمح للصوت حتى في أثناء الماتش المقفل
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      // إذا كان خارج الأردن، نحاول المرور المباشر (قد يكون أسرع)
      return CONFIG.DIRECT + "; " + CONFIG.VOICE_PROXY;
    }
    
    // صوت من سيرفر أردني - نستخدم أفضل بروكسي
    return CONFIG.VOICE_PROXY + "; " + CONFIG.MATCH_TIER1;
  }
  
  // إذا وصلنا هنا ولدينا ماتش مقفل، نحظر أي ترافيك غير ضروري
  // هذا يحافظ على bandwidth للماتش فقط
  if (SESSION.match.locked) {
    var timeSinceMatch = new Date().getTime() - SESSION.match.startTime;
    
    // إذا كان الماتش لا يزال نشط (أقل من 30 دقيقة)
    if (timeSinceMatch < CONFIG.STICKY_SESSION_TIME) {
      // نسمح فقط بـ CDN للتحديثات الضرورية
      if (isCDNTraffic(url, host)) {
        return CONFIG.CDN_DIRECT;
      }
      
      // نحظر أي شيء آخر
      SESSION.counters.blockedRequests++;
      return CONFIG.BLOCK;
    } else {
      // إذا مر أكثر من 30 دقيقة، نفتح الجلسة (انتهى الماتش)
      SESSION.match.locked = false;
      SESSION.match.networkPrefix = null;
      SESSION.match.hostname = null;
    }
  }
  
  // ===== STEP 7: LOBBY TRAFFIC (MEDIUM PRIORITY) =====
  // ترافيك اللوبي مهم للعثور على مباريات بسرعة
  if (isLobbyTraffic(url, host)) {
    SESSION.counters.lobbyRequests++;
    
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      return CONFIG.BLOCK;
    }
    
    // نختار بروكسي بذكاء ونضيف fallbacks
    var selectedProxy = selectLobbyProxy(host, ipAddress);
    return selectedProxy + "; " + CONFIG.LOBBY_FAST[0] + "; " + CONFIG.MATCH_TIER1;
  }
  
  // ===== STEP 8: SOCIAL TRAFFIC (MEDIUM PRIORITY) =====
  if (isSocialTraffic(url, host)) {
    if (!isInRangeList(ipAddress, JORDAN_RANGES)) {
      // Social يمكن أن يكون عالمي، نسمح بـ direct
      return CONFIG.DIRECT + "; " + CONFIG.LOBBY_FAST[0];
    }
    
    return selectLobbyProxy(host, ipAddress) + "; " + CONFIG.LOBBY_FAST[0];
  }
  
  // ===== STEP 9: CDN TRAFFIC (LOW PRIORITY) =====
  if (isCDNTraffic(url, host)) {
    // CDN عادة أسرع مباشرة بدون بروكسي
    return CONFIG.CDN_DIRECT;
  }
  
  // ===== STEP 10: ANALYTICS (LOWEST PRIORITY) =====
  if (isAnalyticsTraffic(url, host)) {
    // يمكن تمرير Analytics مباشرة أو حظرها لتوفير bandwidth
    SESSION.counters.directRequests++;
    return CONFIG.DIRECT;
  }
  
  // ===== STEP 11: JORDAN GENERAL TRAFFIC =====
  // أي ترافيك PUBG آخر من الأردن
  if (isInRangeList(ipAddress, JORDAN_RANGES)) {
    var generalProxy = selectLobbyProxy(host, ipAddress);
    return generalProxy + "; " + CONFIG.LOBBY_FAST[0] + "; " + CONFIG.DIRECT;
  }
  
  // ===== STEP 12: DEFAULT BLOCK =====
  // أي شيء آخر نحظره لضمان أقصى أداء
  SESSION.counters.blockedRequests++;
  return CONFIG.BLOCK;
}

// ================= SESSION RESET HELPER =================
// هذه الدالة للتوضيح فقط - في PAC الحقيقي، المتصفح يعيد تحميل السكربت دورياً
function resetSession() {
  SESSION.match.locked = false;
  SESSION.match.networkPrefix = null;
  SESSION.match.hostname = null;
  SESSION.match.proxy = null;
  SESSION.match.startTime = 0;
}

// ================= PERFORMANCE MONITORING =================
// هذه الدالة للتوضيح - توضح كيف يمكن مراقبة الأداء
function getSessionStats() {
  return {
    matchRequests: SESSION.counters.matchRequests,
    lobbyRequests: SESSION.counters.lobbyRequests,
    blockedRequests: SESSION.counters.blockedRequests,
    directRequests: SESSION.counters.directRequests,
    cacheSize: Object.keys(SESSION.dns).length,
    matchLocked: SESSION.match.locked
  };
}
