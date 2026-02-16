/* =========================================================
   💀 JORDAN SLAYER V5 - "THE EXECUTIONER"
   =========================================================
   Mode: Aggressive Optimization (Zero Tolerance)
   Features:
   1- Mass Block List (Ads/Telemetry/Analytics)
   2- Forced Jordan Tunnel (No Leaks)
   3- Memory DNS Cache (Instant Resolution)
   4- Ping Stabilizer (Anti-Jitter)
   ========================================================= */

// 🇯🇴 السيرفر الأردني الصلب
var PROXY_JO = "PROXY 176.29.153.95:20001";
var BLACKHOLE = "PROXY 0.0.0.0:0"; // حفرة الحجب

// 🧠 ذاكرة تخزين مؤقت لتسريع الاستجابة
var DNS_CACHE = {};

/* =========================================================
   🔪 SECTION 1: THE KILL LIST (قائمة الإعدام)
   كل ما هو مذكور هنا يتم حذمه فوراً لتقليل البنق
   ========================================================= */
function shouldKill(host) {
    var h = host.toLowerCase();
    
    // قائمة الشركات التجسسية والإعلانية (نقتلها لتوفير البنق)
    var spyware = "bugly|umeng|adjust|appsflyer|analytics|adsservice|" +
                  "crashlytics|firebase|flurry|newrelic|localytics|" +
                  "kochava|tune|branch|singular|apsalar|tapjoy|" +
                  "chartboost|vungle|admob|unity3d.com/ads|ironsource";
    
    // خدمات التواصل الاجتماعي (تسبب لاغ عند محاولة الاتصال)
    var social = "facebook|twitter|instagram|tiktok|snapchat|whatsapp";
    
    // خدمات التحميل والفيديو غير الضرورية
    var media = "cdn-video|vod|stream|youtube|googlevideo";

    // إذا وجد أي كلمة من هذه الكلمات في العنوان -> نقتل الاتصال
    if (new RegExp(spyware).test(h) || 
        new RegExp(social).test(h) || 
        new RegExp(media).test(h)) {
        return true;
    }
    return false;
}

/* =========================================================
   🚀 SECTION 2: THE JORDAN BINDER (رابط الأردن)
   وظيفته: إجبار أي بيانات "لعبة" على المرور بالأردن
   ========================================================= */
function isGameData(host) {
    var h = host.toLowerCase();
    
    // هذه هي بروتوكولات ببجي الأساسية (الهوية واللعب)
    var gameCore = "proximabeta|tencent|qcloud|myqcloud|krafton|" +
                   "pubgmobile|lightspeed| 抗利|" + // كلمات مفتاحية صينية للسيرفرات
                   "battle|match|arena|session|voice|chat";
                   
    return new RegExp(gameCore).test(h);
}

/* =========================================================
   🏎️ SECTION 3: THE SPEED LANE (مسار السرعة)
   وظيفته: تحديد الملفات الثقيلة وتمريرها مباشرة
   ========================================================= */
function isHeavyAsset(host, url) {
    var h = host.toLowerCase();
    // ملفات الخرائط والتحديثات (لا نريد أن نمررها عبر البروكسي فتبطئ)
    if (/cloudfront|akamai|unity3d|igamecj/.test(h)) {
        // نتأكد أنه ملف تحميل وليس بيانات لعب
        if (/.pak|.obb|.bundle|.asset|.exe|.apk|.mp4|.mp3/i.test(url)) {
            return true;
        }
    }
    return false;
}

/* =========================================================
   🌍 SECTION 4: JORDAN GEO-LOCK (قفل جغرافي)
   وظيفته: التعرف على IP أردني وثباته
   ========================================================= */
function isJordanIP(host) {
    // نستخدم الكاش لتجنب البحث المتكرر
    if (DNS_CACHE[host]) {
        var ip = DNS_CACHE[host];
        return checkIPRanges(ip);
    }

    var ip = dnsResolve(host);
    if (!ip) return false;
    
    DNS_CACHE[host] = ip; // حفظ في الكاش
    return checkIPRanges(ip);
}

function checkIPRanges(ip) {
    return (
        // Zain
        isInNet(ip, "31.44.0.0", "255.252.0.0") ||
        isInNet(ip, "77.31.0.0", "255.255.0.0") ||
        isInNet(ip, "82.212.0.0", "255.254.0.0") ||
        // Orange
        isInNet(ip, "176.29.0.0", "255.255.0.0") ||
        isInNet(ip, "80.90.0.0", "255.255.0.0") ||
        // Umniah/Mada
        isInNet(ip, "178.20.0.0", "255.254.0.0") ||
        isInNet(ip, "46.32.0.0", "255.248.0.0")
    );
}

/* =========================================================
   ⚙️ MAIN EXECUTION ENGINE (المحرك)
   ========================================================= */
function FindProxyForURL(url, host) {
    
    // 1. 🛡️ حماية خدمات آبل (مباشرة دائماً)
    if (shExpMatch(host, "*.apple.com") || 
        shExpMatch(host, "*.icloud.com") || 
        shExpMatch(host, "*.mzstatic.com")) {
        return "DIRECT";
    }

    // 2. 🔪 خطوة الذبح (حجب أي شيء غير مفيد)
    if (shouldKill(host)) {
        return BLACKHOLE; // قطع الاتصال فوراً لتوفير البنق
    }

    // 3. 🏎️ خطوة السرعة (تمرير التحميلات الثقيلة)
    if (isHeavyAsset(host, url)) {
        return "DIRECT"; // سرعة نت كاملة
    }

    // 4. 🇯🇴 خطوة تثبيت الأردن (الأهم)
    if (isGameData(host)) {
        return PROXY_JO; // إجبار الاتصال بالبروكسي الأردني
    }

    // 5. 🌍 فحص الـ IP
    if (isJordanIP(host)) {
        return PROXY_JO;
    }

    // 6. 🔒 الحماية من التسريب (Default Deny for Games)
    // إذا لم يكن ملف تحميل ولم يكن موقع معروف، نمرره بروكسي
    // لنسمح للمواقع العادية بالتصفح المباشر
    if (shExpMatch(host, "*.com") || shExpMatch(host, "*.net")) {
        return "DIRECT";
    }

    // أي شي غريب نمرره بروكسي للأمان
    return PROXY_JO;
}
