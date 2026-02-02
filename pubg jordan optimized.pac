// ═══════════════════════════════════════════════════════════════════
// PUBG MOBILE - JORDAN OPTIMIZED (Simplified for Best Performance)
// ═══════════════════════════════════════════════════════════════════
// تعليمات الاستخدام:
// 1. اختبر أولاً بدون بروكسي للمقارنة
// 2. تأكد من سرعة اتصالك الأساسية جيدة
// 3. أعد تشغيل الجهاز بعد التطبيق
// ═══════════════════════════════════════════════════════════════════

// الإعدادات الأساسية
var CONFIG = {
  PRIMARY_MATCH: "PROXY 46.185.131.218:20001",    // الخادم الرئيسي للعب
  BACKUP_MATCH: "PROXY 212.35.66.45:20001",       // الخادم الاحتياطي
  LOBBY_SERVER: "PROXY 212.35.66.45:8085",        // خادم اللوبي
  USE_DIRECT: true  // استخدام DIRECT للطلبات غير المهمة بدلاً من BLOCK
};

// ذاكرة التخزين المؤقت البسيطة
var cache = {
  dns: {},
  matchServer: null,
  lastCheck: 0
};

// نطاقات IP الأردنية (مبسطة)
var JO_RANGES = [
  ["46.185.0.0", "255.255.0.0"],     // Orange
  ["212.35.0.0", "255.255.0.0"],     // Orange
  ["176.28.0.0", "255.252.0.0"],     // Zain
  ["82.212.0.0", "255.252.0.0"],     // Umniah
  ["94.249.0.0", "255.255.0.0"],     // Batelco
  ["149.200.0.0", "255.255.0.0"],    // Fiber
  ["188.161.0.0", "255.255.0.0"]     // Jordan ISP
];

// دالة مساعدة: تنظيف اسم المضيف
function cleanHost(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i).toLowerCase() : h.toLowerCase();
}

// دالة مساعدة: فحص IP في القائمة
function isJordanIP(ip) {
  for (var i = 0; i < JO_RANGES.length; i++) {
    if (isInNet(ip, JO_RANGES[i][0], JO_RANGES[i][1])) {
      return true;
    }
  }
  return false;
}

// دالة مساعدة: DNS مع تخزين مؤقت بسيط
function resolveHost(host) {
  // تخزين مؤقت لمدة دقيقتين فقط
  var now = Date.now();
  if (cache.dns[host] && (now - cache.dns[host].time < 120000)) {
    return cache.dns[host].ip;
  }
  
  var ip = dnsResolve(host);
  if (ip) {
    cache.dns[host] = {ip: ip, time: now};
  }
  return ip;
}

// الدالة الرئيسية
function FindProxyForURL(url, host) {
  host = cleanHost(host);
  
  // السماح المباشر للمواقع العامة (مهم جداً)
  if (/shahid|mbc|youtube|google|facebook|instagram|twitter|whatsapp|github/i.test(host)) {
    return "DIRECT";
  }
  
  // فحص إذا كان متعلق بـ PUBG
  var isPUBG = /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(host);
  if (!isPUBG) {
    return "DIRECT";  // اترك كل شيء آخر مباشر
  }
  
  // حل DNS
  var ip = resolveHost(host);
  if (!ip || ip.indexOf(":") > -1) {
    return CONFIG.USE_DIRECT ? "DIRECT" : "PROXY 127.0.0.1:9";
  }
  
  // فحص إذا كان IP أردني
  var isJordan = isJordanIP(ip);
  
  // تحديد نوع الطلب
  var urlLower = url.toLowerCase();
  var isMatchReq = /match|battle|game|combat|realtime|sync/i.test(urlLower + host);
  var isLobbyReq = /lobby|matchmaking|queue|dispatch|gateway/i.test(urlLower + host);
  
  // معالجة طلبات المباراة (الأهم)
  if (isMatchReq) {
    // إذا لم يكن IP أردني، استخدم DIRECT لتجنب التأخير
    if (!isJordan) {
      return "DIRECT";
    }
    
    // استخدام نفس الخادم طوال المباراة
    if (!cache.matchServer) {
      cache.matchServer = CONFIG.PRIMARY_MATCH;
      cache.lastCheck = Date.now();
    }
    
    // إعادة التحقق كل 5 دقائق
    if (Date.now() - cache.lastCheck > 300000) {
      cache.matchServer = null;
      return FindProxyForURL(url, host);
    }
    
    return cache.matchServer + "; " + CONFIG.BACKUP_MATCH + "; DIRECT";
  }
  
  // معالجة طلبات اللوبي
  if (isLobbyReq) {
    // إعادة تعيين خادم المباراة عند العودة للوبي
    cache.matchServer = null;
    
    if (!isJordan) {
      return "DIRECT";
    }
    
    return CONFIG.LOBBY_SERVER + "; DIRECT";
  }
  
  // كل شيء آخر: مباشر أو حسب الإعدادات
  return "DIRECT";
}
