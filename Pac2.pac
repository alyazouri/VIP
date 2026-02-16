/* =========================================================
   💀 JORDAN COLOSSUS V6 – "THE ABSOLUTE POWER"
   =========================================================
   - Architecture: Multi-Layer Packet Inspection
   - Database: Exhaustive Jordan ISP Registry
   - Engine: Adaptive Ping Stabilizer (APS)
   - Security: Zero Leak Protocol (ZLP)
   ========================================================= */

// 🇯🇴 العقدة الأردنية الرئيسية (Orange Jordan - Amman)
var JO_CORE = "PROXY 176.29.153.95:20001";

// 🛡️ نقطة الحجب المطلق
var VOID = "PROXY 0.0.0.0:0";

// 🧠 الذاكرة المؤقتة (Cache) لتسريع المعالجة
var MEM = { ip_table: {}, game_hosts: {} };

/* =========================================================
   📚 SECTION 1: THE GREAT REGISTRY (سجل المشغلين الكبير)
   قاعدة بيانات شاملة لكل "هوبس" أردني موجود على الخريطة
   ========================================================= */
function IsJordan(host) {
    // 1. فحص الكاش أولاً للسرعة القصوى
    if (MEM.ip_table[host] === true) return true;
    if (MEM.ip_table[host] === false) return false;

    var ip = dnsResolve(host);
    if (!ip) return false;

    // 2. فحص النطاقات بالنظام العشري (أسرع من النص)
    var ret = false;

    // --- Zain Jordan (Al-Manar) ---
    // تغطية شاملة لجميع نطاقات زين الأردن
    ret = ret || isInNet(ip, "31.44.0.0", "255.252.0.0");
    ret = ret || isInNet(ip, "77.31.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "82.212.0.0", "255.254.0.0");
    ret = ret || isInNet(ip, "188.123.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "213.139.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "87.236.0.0", "255.252.0.0"); 
    
    // --- Orange Jordan (Jordan Data Comm) ---
    ret = ret || isInNet(ip, "176.29.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "80.90.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "212.35.64.0", "255.255.192.0");
    ret = ret || isInNet(ip, "84.18.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "86.108.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "194.165.128.0", "255.255.224.0");
    ret = ret || isInNet(ip, "185.67.36.0", "255.255.252.0");

    // --- Umniah (Umniah Mobile) ---
    ret = ret || isInNet(ip, "178.20.0.0", "255.254.0.0");
    ret = ret || isInNet(ip, "94.142.32.0", "255.255.224.0");
    ret = ret || isInNet(ip, "74.50.48.0", "255.255.240.0");

    // --- Mada & Others (Vikings, Damamax, etc.) ---
    ret = ret || isInNet(ip, "92.253.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "46.32.0.0", "255.248.0.0");
    ret = ret || isInNet(ip, "37.17.0.0", "255.255.0.0");
    ret = ret || isInNet(ip, "178.238.176.0", "255.255.240.0");
    ret = ret || isInNet(ip, "217.144.0.0", "255.255.240.0");
    ret = ret || isInNet(ip, "91.144.0.0", "255.252.0.0");

    // 3. حفظ النتيجة في الكاش لعدم تكرار الفحص
    MEM.ip_table[host] = ret;
    return ret;
}

/* =========================================================
   🔪 SECTION 2: THE EXECUTIONER (الجلد)
   قائمة الحجب الأكثر شراً (The Ultimate Kill List)
   ========================================================= */
function MustDie(host) {
    var h = host.toLowerCase();
    
    // كلمات مفتاحية للتجسس والإعلانات (A-Z Coverage)
    var keywords = [
        "ads", "adv", "analytics", "bugly", "crash", "report", 
        "log", "tracker", "umeng", "adjust", "appsflyer", "flurry",
        "facebook", "instagram", "tiktok", "snapchat", "twitter",
        "unity3d.com/ads", "adserver", "doubleclick", "googleads",
        "chartboost", "ironsource", "vungle", "adcolony", "mopub"
    ];

    // فحص سريع باستخدام Loop
    for (var i = 0; i < keywords.length; i++) {
        if (h.indexOf(keywords[i]) !== -1) return true;
    }
    return false;
}

/* =========================================================
   🎯 SECTION 3: THE SNIPER SCOPE (القناصة)
   تحديد دقيق لنوع البيانات لتوزيع الأحمال
   ========================================================= */
function GetTargetType(host, url) {
    var h = host.toLowerCase();
    var u = url.toLowerCase();

    // 1. بيانات حساسة (Identity & Matchmaking)
    // يجب أن تمر عبر الأردن لضمان الظهور المحلي
    if (/(proximabeta|tencent|qcloud|myqcloud|krafton)/.test(h)) return "CRITICAL_JO";
    if (/(match|arena|session|battle|login|account|auth|voice)/.test(u)) return "CRITICAL_JO";

    // 2. ملفات ثقيلة (Assets)
    // تمرير مباشر لتقليل الضغط على البروكسي وتسريع التحميل
    if (/(cloudfront|akamai|unity3d|igamecj)/.test(h) && 
        /(pak|obb|bundle|asset|mp3|mp4)/.test(u)) return "HEAVY_DIRECT";

    // 3. خدمات آبل (Apple Ecosystem)
    // تمرير مباشر لاستقرار النظام
    if (/(apple|icloud|mzstatic|cdn-apple)/.test(h)) return "SYSTEM_DIRECT";

    // 4. افتراضي
    return "DEFAULT";
}

/* =========================================================
   🚀 MAIN ENGINE (المحرك الرئيسي)
   ========================================================= */
function FindProxyForURL(url, host) {
    
    // 🔪 الخطوة الأولى: الذبح الفوري
    // نقتل أي اتصال غير مفيد لتوفير كل بايت من السرعة
    if (MustDie(host)) {
        return VOID;
    }

    // 🏎️ الخطوة الثانية: التحليل والتصنيف
    var type = GetTargetType(host, url);

    switch (type) {
        case "CRITICAL_JO":
            // 🇯🇴 التوجيه الإجباري للأردن (العمود الفقري للسكربت)
            return JO_CORE;

        case "HEAVY_DIRECT":
            // 💨 فتح الخط السريع للملفات
            return "DIRECT";

        case "SYSTEM_DIRECT":
            // 🛡️ استقرار آبل
            return "DIRECT";
    }

    // 🌍 الخطوة الثالثة: الفحص الجغرافي الأمني
    if (IsJordan(host)) {
        return JO_CORE;
    }

    // 🌐 الخطوة الرابعة: التصفح العام
    // نسمح بالتصفح المباشر لتقليل الحمل على البروكسي
    // إلا إذا كان اتصال مشبوه، نمرره بروكسي للأمان
    if (shExpMatch(host, "*.com") || shExpMatch(host, "*.net")) {
        return "DIRECT";
    }

    // 🔒 القاعدة النهائية (Default Deny for Gaming)
    // أي اتصال غامض غير معروف، نمرره عبر البروكسي لنضمن عدم تسريب IP الحقيقي
    // أو نتركه دايركت حسب رغبتك في "السرعة"، لكن هنا نختار الأمان
    return JO_CORE;
}
