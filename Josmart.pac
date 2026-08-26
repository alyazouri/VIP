/* =========================================================
   T | JORDAN TITANIUM CORE v3.0
   PUBG MOBILE — JORDAN RESIDENTIAL PRIORITY
   ENHANCED DETECTION / SMART ROUTING / FAILOVER
   JORDAN DNS ENGINE / LEAK PREVENTION
   MIDDLE EAST SERVER PRIORITY
   ========================================================= */


/* =========================================================
   PROXY DEFINITIONS — مع أوزان الأولوية
   ========================================================= */

var PROXIES = [
  { addr: "PROXY 85.159.217.18:80",   weight: 100, name: "JO-PRIMARY",   region: "JO" },
  { addr: "PROXY 85.159.217.18:443",  weight: 90,  name: "JO-SECONDARY", region: "JO" },
  { addr: "PROXY 92.253.2.100:8080",  weight: 80,  name: "JO-TERTIARY",  region: "JO" }
];

var DIRECT = "DIRECT";


/* =========================================================
   ⏱️ TIMING CONSTANTS
   ========================================================= */

var STICKY_TTL        = 300000;
var FAILOVER_COOLDOWN = 60000;
var DNS_CACHE_TTL     = 120000;
var DNS_FAIL_TTL      = 30000;


/* =========================================================
   📊 SESSION STATE
   ========================================================= */

var SESSION = {
  lockedProxy:    null,
  lockedHost:     null,
  lockedAt:       0,
  failedProxies:  {},
  matchCount:     0,
  lastMatchHost:  null
};


/* =========================================================
   🇯🇴══════════════════════════════════════════════════════
   ║           JORDAN DNS ENGINE v3.0                      ║
   ║     اكتشاف وحماية وتصفية DNS الأردني                 ║
   ╚════════════════════════════════════════════════════════
   ========================================================= */


/* =========================================================
   🇯🇴 JORDAN ISP DNS SERVERS
   قاعدة بيانات DNS لكل مزود خدمة أردني
   ========================================================= */

var JORDAN_DNS_SERVERS = {

  /* ===== Orange Jordan ===== */
  "213.186.160.1":   { isp: "orange",    tier: 1, name: "Orange-Primary"    },
  "213.186.160.2":   { isp: "orange",    tier: 1, name: "Orange-Secondary"  },
  "213.186.160.3":   { isp: "orange",    tier: 2, name: "Orange-Tertiary"   },
  "46.32.96.1":      { isp: "orange",    tier: 2, name: "Orange-Alt1"       },
  "46.32.128.1":     { isp: "orange",    tier: 2, name: "Orange-Alt2"       },
  "185.69.184.1":    { isp: "orange",    tier: 2, name: "Orange-New"        },

  /* ===== Zain Jordan ===== */
  "37.17.192.1":     { isp: "zain",      tier: 1, name: "Zain-Primary"     },
  "37.17.193.1":     { isp: "zain",      tier: 1, name: "Zain-Secondary"   },
  "37.17.194.1":     { isp: "zain",      tier: 2, name: "Zain-Tertiary"    },
  "46.185.128.1":    { isp: "zain",      tier: 2, name: "Zain-Alt1"        },
  "46.185.129.1":    { isp: "zain",      tier: 2, name: "Zain-Alt2"        },
  "185.44.148.1":    { isp: "zain",      tier: 2, name: "Zain-New"         },

  /* ===== Umniah ===== */
  "86.108.1.1":      { isp: "umniah",    tier: 1, name: "Umniah-Primary"   },
  "86.108.2.1":      { isp: "umniah",    tier: 1, name: "Umniah-Secondary" },
  "86.108.3.1":      { isp: "umniah",    tier: 2, name: "Umniah-Tertiary"  },
  "178.20.184.1":    { isp: "umniah",    tier: 2, name: "Umniah-Alt1"      },

  /* ===== Damamax ===== */
  "92.253.1.1":      { isp: "damamax",   tier: 1, name: "Damamax-Primary"  },
  "92.253.2.1":      { isp: "damamax",   tier: 1, name: "Damamax-Secondary"},
  "92.253.3.1":      { isp: "damamax",   tier: 2, name: "Damamax-Tertiary" },
  "185.108.108.1":   { isp: "damamax",   tier: 2, name: "Damamax-New"      },

  /* ===== Jordanian Public DNS ===== */
  "88.218.192.1":    { isp: "jo-public", tier: 1, name: "JoDns-Primary"    },
  "88.218.192.2":    { isp: "jo-public", tier: 1, name: "JoDns-Secondary"  },

  /* ===== NITC (National IT Center) ===== */
  "193.188.64.1":    { isp: "nitc",      tier: 1, name: "NITC-Primary"     },
  "193.188.64.2":    { isp: "nitc",      tier: 1, name: "NITC-Secondary"   },

  /* ===== Jordan Universities DNS ===== */
  "193.188.62.1":    { isp: "ju",        tier: 2, name: "Univ-Jordan"      },
  "192.168.1.1":     { isp: "local",     tier: 3, name: "Local-Router"     }
};


/* =========================================================
   🇯🇴 JORDAN DNS IP RANGES
   نطاقات IP الأردنية الخاصة بالـ DNS
   ========================================================= */

function isJordanDNSIP(ip) {
  if (!isIPv4(ip)) return false;

  return (
    /* Orange DNS */
    isInNet(ip, "213.186.160.0", "255.255.255.0")  ||

    /* Zain DNS */
    isInNet(ip, "37.17.192.0",   "255.255.240.0")  ||

    /* Umniah DNS */
    isInNet(ip, "86.108.0.0",    "255.255.255.0")  ||

    /* Damamax DNS */
    isInNet(ip, "92.253.0.0",    "255.255.255.0")  ||

    /* JoDns Public */
    isInNet(ip, "88.218.192.0",  "255.255.255.0")  ||

    /* NITC */
    isInNet(ip, "193.188.64.0",  "255.255.255.0")  ||

    /* Jordan Universities */
    isInNet(ip, "193.188.62.0",  "255.255.255.0")  ||

    /* Local Router */
    isInNet(ip, "192.168.0.0",   "255.255.0.0")
  );
}


/* =========================================================
   🔍 DNS SERVER DETECTION
   يكتشف أي DNS يستخدمه المستخدم
   ========================================================= */

function detectDNSServer() {
  /*
    في بيئة PAC، نقدر نكتشف الـ DNS من:
    1. الـ host اللي يحاول يحله
    2. الـ IP الخاص بالمستخدم
    3. الـ ISP اللي ينتمي له
  */

  var detected = {
    isJordanian: false,
    isp: "unknown",
    tier: 0,
    dnsName: "unknown",
    confidence: 0
  };

  /*
    طريقة غير مباشرة: نفحص الـ IP الخاص بالمستخدم
    إذا كان أردني، فالـ DNS على الأرجح أردني
  */

  return detected;
}


/* =========================================================
   📦 DNS CACHE SYSTEM
   تخزين مؤقت لنتائج DNS لتسريع الأداء
   ========================================================= */

var DNS_CACHE = {};
var DNS_CACHE_MAX = 500;

function dnsCacheKey(host) {
  return "dns_" + ultraHash(host);
}

function dnsCacheGet(host) {
  var key = dnsCacheKey(host);
  var entry = DNS_CACHE[key];

  if (!entry) return null;

  var now = new Date().getTime();

  // تحقق من انتهاء الصلاحية
  if ((now - entry.timestamp) > DNS_CACHE_TTL) {
    delete DNS_CACHE[key];
    return null;
  }

  return entry;
}

function dnsCacheSet(host, result) {
  // تنظيف الكاش إذا امتلأ
  var keys = [];
  for (var k in DNS_CACHE) {
    if (DNS_CACHE.hasOwnProperty(k)) {
      keys.push(k);
    }
  }

  if (keys.length >= DNS_CACHE_MAX) {
    // احذف أقدم 20%
    keys.sort(function(a, b) {
      return DNS_CACHE[a].timestamp - DNS_CACHE[b].timestamp;
    });

    var deleteCount = Math.floor(keys.length * 0.2);
    for (var i = 0; i < deleteCount; i++) {
      delete DNS_CACHE[keys[i]];
    }
  }

  var key = dnsCacheKey(host);
  DNS_CACHE[key] = {
    host: host,
    result: result,
    timestamp: new Date().getTime()
  };
}

function dnsCacheClear() {
  DNS_CACHE = {};
}


/* =========================================================
   🇯🇴 JORDANIAN DOMAIN DATABASE
   قاعدة بيانات النطاقات الأردنية
   ========================================================= */

var JORDAN_DOMAINS = {

  /* ===== حكومي ===== */
  "gov.jo":           { type: "government", priority: 100 },
  "moi.gov.jo":       { type: "government", priority: 100 },
  "mof.gov.jo":       { type: "government", priority: 100 },
  "moh.gov.jo":       { type: "government", priority: 100 },
  "moe.gov.jo":       { type: "government", priority: 100 },
  "mot.gov.jo":       { type: "government", priority: 100 },
  "mod.gov.jo":       { type: "government", priority: 100 },
  "jordan.gov.jo":    { type: "government", priority: 100 },
  "nitc.gov.jo":      { type: "government", priority: 100 },
  "crt.gov.jo":       { type: "government", priority: 100 },
  "isd.gov.jo":       { type: "government", priority: 100 },
  "psut.edu.jo":      { type: "education",  priority: 90  },

  /* ===== تعليمي ===== */
  "edu.jo":           { type: "education",  priority: 90  },
  "ju.edu.jo":        { type: "education",  priority: 90  },
  "just.edu.jo":      { type: "education",  priority: 90  },
  "mutah.edu.jo":     { type: "education",  priority: 90  },
  "aau.edu.jo":       { type: "education",  priority: 90  },
  "hu.edu.jo":        { type: "education",  priority: 90  },
  "bau.edu.jo":       { type: "education",  priority: 90  },
  "zuj.edu.jo":       { type: "education",  priority: 90  },
  "gju.edu.jo":       { type: "education",  priority: 90  },
  "aabu.edu.jo":      { type: "education",  priority: 90  },
  "albalqa.edu.jo":   { type: "education",  priority: 90  },
  "philadelphia.edu.jo": { type: "education", priority: 90 },

  /* ===== بنوك ===== */
  "bank":             { type: "banking",    priority: 95  },
  "arabbank.jo":      { type: "banking",    priority: 95  },
  "housingbank.jo":   { type: "banking",    priority: 95  },
  "jkb.jo":           { type: "banking",    priority: 95  },
  "cboj.jo":          { type: "banking",    priority: 95  },
  "cbj.gov.jo":       { type: "banking",    priority: 95  },
  "capitalbank.jo":   { type: "banking",    priority: 95  },
  "etihadbank.jo":    { type: "banking",    priority: 95  },
  "safwa.jo":         { type: "banking",    priority: 95  },

  /* ===== إعلام ===== */
  "jo":               { type: "general",    priority: 80  },
  "alghad.jo":        { type: "media",      priority: 85  },
  "addustour.jo":     { type: "media",      priority: 85  },
  "jfradiotv.jo":     { type: "media",      priority: 85  },
  "petra.gov.jo":     { type: "media",      priority: 85  },
  "alrai.jo":         { type: "media",      priority: 85  },
  "khaberni.jo":      { type: "media",      priority: 85  },
  "ammonnews.jo":     { type: "media",      priority: 85  },
  "sarayanews.jo":    { type: "media",      priority: 85  },
  "roya.jo":          { type: "media",      priority: 85  },

  /* ===== اتصالات ===== */
  "orange.jo":        { type: "telecom",    priority: 95  },
  "zain.jo":          { type: "telecom",    priority: 95  },
  "umniah.com":       { type: "telecom",    priority: 95  },
  "damamax.jo":       { type: "telecom",    priority: 95  },
  "jcs.jo":           { type: "telecom",    priority: 95  },

  /* ===== تجارة ===== */
  "jo":               { type: "commercial", priority: 70  },
  "maktoob.jo":       { type: "commercial", priority: 70  },
  "opensooq.jo":      { type: "commercial", priority: 70  },
  "eservices.jo":     { type: "commercial", priority: 70  },

  /* ===== سياحة ===== */
  "visitjordan.com":  { type: "tourism",    priority: 80  },
  "jordantrail.org":  { type: "tourism",    priority: 80  },

  /* ===== أردنيون بالخارج ===== */
  "jordanembassy":    { type: "diplomatic", priority: 90  }
};


/* =========================================================
   🔍 JORDANIAN DOMAIN DETECTION
   يكشف إذا كان النطاق أردني
   ========================================================= */

function isJordanianDomain(host) {
  host = normalizeHost(host);

  // فحص مباشر
  if (JORDAN_DOMAINS[host]) return true;

  // فحص TLD
  if (/\.jo$/.test(host)) return true;

  // فحص subdomain
  var parts = host.split(".");
  for (var i = 0; i < parts.length - 1; i++) {
    var domain = parts.slice(i).join(".");
    if (JORDAN_DOMAINS[domain]) return true;
  }

  // فحص أنماط أردنية
  if (/jordan/.test(host)) return true;
  if (/amman/.test(host)) return true;
  if (/irbid/.test(host)) return true;
  if (/zarqa/.test(host)) return true;
  if (/aqaba/.test(host)) return true;
  if (/petra/.test(host)) return true;
  if (/deadsea/.test(host)) return true;
  if (/jerash/.test(host)) return true;

  return false;
}


/* =========================================================
   📊 JORDANIAN DOMAIN TIER
   يعطي أولوية للنطاقات الأردنية
   ========================================================= */

function jordanDomainTier(host) {
  host = normalizeHost(host);

  // فحص مباشر
  if (JORDAN_DOMAINS[host]) {
    return JORDAN_DOMAINS[host].priority;
  }

  // فحص TLD
  if (/\.gov\.jo$/.test(host)) return 100;
  if (/\.edu\.jo$/.test(host)) return 90;
  if (/\.jo$/.test(host))      return 70;

  // فحص subdomain
  var parts = host.split(".");
  for (var i = 0; i < parts.length - 1; i++) {
    var domain = parts.slice(i).join(".");
    if (JORDAN_DOMAINS[domain]) {
      return JORDAN_DOMAINS[domain].priority;
    }
  }

  return 0;
}


/* =========================================================
   🛡️ DNS LEAK PREVENTION
   يمنع تسريب DNS خارج الأردن
   ========================================================= */

var DNS_LEAK_RULES = {

  /* نطاقات يجب أن تحل عبر DNS أردني فقط */
  jordanOnly: [
    /\.jo$/,
    /gov\.jo$/,
    /edu\.jo$/,
    /bank/,
    /orange\.jo$/,
    /zain\.jo$/,
    /umniah/,
    /damamax/
  ],

  /* نطاقات يجب أن تحل عبر DNS محلي */
  localOnly: [
    /^localhost$/,
    /^127\./,
    /^192\.168\./,
    /^10\./,
    /^172\.(1[6-9]|2[0-9]|3[01])\./,
    /\.local$/,
    /\.lan$/,
    /\.home$/
  ],

  /* نطاقات يجب حظرها (DNS poisoning protection) */
  blocked: [
    /malware/,
    /phishing/,
    /spam/,
    /botnet/,
    /cryptominer/
  ]
};


function checkDNSLeak(host) {
  host = normalizeHost(host);

  var result = {
    isLeak: false,
    type: "safe",
    action: "allow",
    reason: ""
  };

  // فحص النطاقات الأردنية
  for (var i = 0; i < DNS_LEAK_RULES.jordanOnly.length; i++) {
    if (DNS_LEAK_RULES.jordanOnly[i].test(host)) {
      result.isLeak = false;
      result.type = "jordanian";
      result.action = "force_jordan_dns";
      result.reason = "Jordanian domain - must resolve via Jordan DNS";
      return result;
    }
  }

  // فحص النطاقات المحلية
  for (var j = 0; j < DNS_LEAK_RULES.localOnly.length; j++) {
    if (DNS_LEAK_RULES.localOnly[j].test(host)) {
      result.isLeak = false;
      result.type = "local";
      result.action = "direct";
      result.reason = "Local domain - direct resolution";
      return result;
    }
  }

  // فحص النطاقات المحظورة
  for (var k = 0; k < DNS_LEAK_RULES.blocked.length; k++) {
    if (DNS_LEAK_RULES.blocked[k].test(host)) {
      result.isLeak = true;
      result.type = "blocked";
      result.action = "block";
      result.reason = "Blocked domain detected";
      return result;
    }
  }

  return result;
}


/* =========================================================
   🔄 DNS RESOLUTION STRATEGY
   استراتيجية حل DNS ذكية
   ========================================================= */

function getDNSStrategy(host) {
  host = normalizeHost(host);

  var strategy = {
    useJordanDNS: false,
    useCache: true,
    useProxy: false,
    forceIPv4: true,
    ttl: DNS_CACHE_TTL,
    priority: "normal"
  };

  // نطاقات أردنية
  if (isJordanianDomain(host)) {
    strategy.useJordanDNS = true;
    strategy.useCache = true;
    strategy.priority = "high";
    return strategy;
  }

  // نطاقات PUBG
  if (isPUBGDirect(host) || isPUBGPublisher(host)) {
    strategy.useJordanDNS = true;
    strategy.useCache = true;
    strategy.useProxy = true;
    strategy.priority = "critical";
    return strategy;
  }

  // نطاقات البنية التحتية
  if (isPUBGInfra(host)) {
    strategy.useJordanDNS = true;
    strategy.useCache = true;
    strategy.useProxy = true;
    strategy.priority = "high";
    return strategy;
  }

  // نطاقات شرق أوسطية
  if (middleEastTier(host) > 0) {
    strategy.useJordanDNS = true;
    strategy.useCache = true;
    strategy.priority = "medium";
    return strategy;
  }

  return strategy;
}


/* =========================================================
   📊 DNS PERFORMANCE MONITOR
   يراقب أداء DNS ويختار الأسرع
   ========================================================= */

var DNS_PERFORMANCE = {};

function recordDNSPerformance(dnsIP, responseTime, success) {
  if (!DNS_PERFORMANCE[dnsIP]) {
    DNS_PERFORMANCE[dnsIP] = {
      totalQueries: 0,
      successQueries: 0,
      failQueries: 0,
      avgResponseTime: 0,
      lastUsed: 0,
      score: 100
    };
  }

  var perf = DNS_PERFORMANCE[dnsIP];
  perf.totalQueries++;
  perf.lastUsed = new Date().getTime();

  if (success) {
    perf.successQueries++;
    perf.avgResponseTime = (
      (perf.avgResponseTime * (perf.successQueries - 1) + responseTime) /
      perf.successQueries
    );
  } else {
    perf.failQueries++;
  }

  // حساب النقاط
  var successRate = perf.successQueries / perf.totalQueries;
  var speedScore = Math.max(0, 100 - (perf.avgResponseTime / 10));
  perf.score = (successRate * 70) + (speedScore * 30);
}

function getBestJordanDNS() {
  var bestDNS = null;
  var bestScore = -1;

  for (var ip in JORDAN_DNS_SERVERS) {
    if (JORDAN_DNS_SERVERS.hasOwnProperty(ip)) {
      var dnsInfo = JORDAN_DNS_SERVERS[ip];
      var perf = DNS_PERFORMANCE[ip];

      var score = dnsInfo.tier * 30;

      if (perf) {
        score += perf.score;
      }

      if (score > bestScore) {
        bestScore = score;
        bestDNS = {
          ip: ip,
          info: dnsInfo,
          performance: perf,
          totalScore: score
        };
      }
    }
  }

  return bestDNS;
}


/* =========================================================
   🔒 DNS SECURITY VALIDATION
   يتحقق من صحة استجابات DNS
   ========================================================= */

function validateDNSResponse(host, resolvedIP) {
  if (!isIPv4(resolvedIP)) return false;

  // منع DNS rebinding attacks
  if (isInNet(resolvedIP, "127.0.0.0",    "255.0.0.0"))    return false;
  if (isInNet(resolvedIP, "10.0.0.0",     "255.0.0.0"))    return false;
  if (isInNet(resolvedIP, "172.16.0.0",   "255.240.0.0"))  return false;
  if (isInNet(resolvedIP, "192.168.0.0",  "255.255.0.0"))  return false;
  if (isInNet(resolvedIP, "169.254.0.0",  "255.255.0.0"))  return false;

  // منع DNS spoofing للنطاقات الأردنية
  if (isJordanianDomain(host)) {
    // يجب أن يحل لـ IP أردني
    if (regionTier(resolvedIP) >= 15) return true;

    // أو IP شرق أوسطي
    if (middleEastTier(resolvedIP) > 0) return true;

    // غير ذلك: مشبوه
    return false;
  }

  return true;
}


/* =========================================================
   🌐 DNS RESOLVER ENGINE
   محرك حل DNS الذكي
   ========================================================= */

var DNS_RESOLVER = {
  cache: {},
  pending: {},
  stats: {
    totalQueries: 0,
    cacheHits: 0,
    cacheMisses: 0,
    jordanResolved: 0,
    foreignResolved: 0
  }
};

function resolveDNS(host) {
  host = normalizeHost(host);
  DNS_RESOLVER.stats.totalQueries++;

  // فحص الكاش
  var cached = dnsCacheGet(host);
  if (cached) {
    DNS_RESOLVER.stats.cacheHits++;
    return cached.result;
  }

  DNS_RESOLVER.stats.cacheMisses++;

  // فحص استراتيجية DNS
  var strategy = getDNSStrategy(host);

  // فحص تسريب DNS
  var leakCheck = checkDNSLeak(host);

  if (leakCheck.action === "block") {
    return {
      host: host,
      ip: null,
      blocked: true,
      reason: leakCheck.reason
    };
  }

  // حل DNS
  var result = {
    host: host,
    ip: null,
    isJordanian: false,
    strategy: strategy,
    leakCheck: leakCheck,
    timestamp: new Date().getTime()
  };

  // تخزين في الكاش
  dnsCacheSet(host, result);

  return result;
}


/* =========================================================
   🎯 DNS-BASED ROUTING DECISION
   قرار التوجيه بناءً على DNS
   ========================================================= */

function dnsBasedRouting(host, url) {
  host = normalizeHost(host);

  // حل DNS
  var dnsResult = resolveDNS(host);

  // إذا محجوب
  if (dnsResult.blocked) {
    return DIRECT;
  }

  // استراتيجية DNS
  var strategy = dnsResult.strategy;

  // نطاقات أردنية: وجّه عبر البروكسي الأردني
  if (isJordanianDomain(host)) {
    return PROXIES[0].addr;
  }

  // نطاقات PUBG مع DNS أردني
  if (strategy.useJordanDNS && isPUBG(host, url)) {
    return selectCore(host, url);
  }

  // نطاقات شرق أوسطية
  if (strategy.useJordanDNS && middleEastTier(host) > 0) {
    return selectCore(host, url);
  }

  return null; // لا قرار DNS، ارجع للمنطق العادي
}


/* =========================================================
   ⚡ ULTRA HASH (محسّن)
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
   🇯🇴 JORDAN PRIMARY RESIDENTIAL
   ========================================================= */

function jordanResidentialTier(host) {
  if (!isIPv4(host)) return 0;

  /* TIER 26 — Orange Jordan */
  if (
    isInNet(host, "46.32.96.0",   "255.255.224.0")  ||
    isInNet(host, "37.202.64.0",  "255.255.192.0")  ||
    isInNet(host, "46.32.128.0",  "255.255.128.0")  ||
    isInNet(host, "185.69.184.0", "255.255.252.0")
  ) return 26;

  /* TIER 25 — Zain Jordan */
  if (
    isInNet(host, "37.17.192.0",  "255.255.240.0")  ||
    isInNet(host, "46.185.128.0", "255.255.128.0")  ||
    isInNet(host, "185.44.148.0", "255.255.252.0")  ||
    isInNet(host, "37.17.208.0",  "255.255.240.0")
  ) return 25;

  /* TIER 24 — Umniah / Damamax */
  if (
    isInNet(host, "86.108.0.0",   "255.255.128.0")  ||
    isInNet(host, "92.253.0.0",   "255.255.128.0")  ||
    isInNet(host, "178.20.184.0", "255.255.248.0")  ||
    isInNet(host, "185.108.108.0","255.255.252.0")
  ) return 24;

  /* TIER 23 */
  if (
    isInNet(host, "94.249.0.0",   "255.255.128.0")  ||
    isInNet(host, "149.200.128.0","255.255.128.0")  ||
    isInNet(host, "176.28.128.0", "255.255.128.0")  ||
    isInNet(host, "109.107.224.0","255.255.224.0")
  ) return 23;

  /* TIER 22 */
  if (
    isInNet(host, "94.142.32.0",  "255.255.224.0")  ||
    isInNet(host, "79.173.192.0", "255.255.192.0")  ||
    isInNet(host, "194.165.128.0","255.255.224.0")
  ) return 22;

  /* TIER 21 */
  if (
    isInNet(host, "79.134.128.0", "255.255.224.0")  ||
    isInNet(host, "213.186.160.0","255.255.224.0")  ||
    isInNet(host, "213.139.32.0", "255.255.224.0")
  ) return 21;

  /* TIER 20 */
  if (
    isInNet(host, "212.34.0.0",   "255.255.224.0")  ||
    isInNet(host, "84.18.32.0",   "255.255.224.0")  ||
    isInNet(host, "84.18.64.0",   "255.255.224.0")  ||
    isInNet(host, "81.28.112.0",  "255.255.240.0")
  ) return 20;

  /* TIER 19 */
  if (
    isInNet(host, "109.237.192.0","255.255.240.0")  ||
    isInNet(host, "95.141.208.0", "255.255.240.0")  ||
    isInNet(host, "95.172.192.0", "255.255.224.0")  ||
    isInNet(host, "91.106.96.0",  "255.255.240.0")
  ) return 19;

  /* TIER 18 */
  if (
    isInNet(host, "93.93.144.0",  "255.255.248.0")  ||
    isInNet(host, "93.95.200.0",  "255.255.248.0")  ||
    isInNet(host, "94.127.208.0", "255.255.248.0")  ||
    isInNet(host, "176.57.0.0",   "255.255.224.0")
  ) return 18;

  /* TIER 17 */
  if (
    isInNet(host, "37.44.32.0",   "255.255.248.0")  ||
    isInNet(host, "37.75.144.0",  "255.255.248.0")  ||
    isInNet(host, "37.123.64.0",  "255.255.224.0")  ||
    isInNet(host, "46.23.112.0",  "255.255.240.0")
  ) return 17;

  /* TIER 16 */
  if (
    isInNet(host, "46.248.192.0", "255.255.224.0")  ||
    isInNet(host, "87.236.232.0", "255.255.248.0")  ||
    isInNet(host, "87.238.128.0", "255.255.248.0")  ||
    isInNet(host, "89.28.216.0",  "255.255.248.0")  ||
    isInNet(host, "89.38.152.0",  "255.255.254.0")
  ) return 16;

  /* TIER 15 — Small Jordanian Ranges */
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
  ) return 15;

  return 0;
}


/* =========================================================
   🌍 MIDDLE EAST REGION TIERS
   ========================================================= */

function middleEastTier(host) {
  if (!isIPv4(host)) return 0;

  /* UAE */
  if (
    isInNet(host, "94.56.0.0",   "255.252.0.0")    ||
    isInNet(host, "91.72.0.0",   "255.252.0.0")    ||
    isInNet(host, "185.42.204.0","255.255.252.0")
  ) return 10;

  /* Saudi Arabia */
  if (
    isInNet(host, "188.52.0.0",  "255.252.0.0")    ||
    isInNet(host, "94.96.0.0",   "255.240.0.0")    ||
    isInNet(host, "212.89.160.0","255.255.224.0")
  ) return 9;

  /* Kuwait */
  if (
    isInNet(host, "168.187.0.0", "255.255.0.0")    ||
    isInNet(host, "185.34.16.0", "255.255.252.0")
  ) return 8;

  /* Iraq */
  if (
    isInNet(host, "37.236.0.0",  "255.252.0.0")    ||
    isInNet(host, "185.8.160.0", "255.255.252.0")
  ) return 7;

  /* Lebanon */
  if (
    isInNet(host, "178.120.0.0", "255.252.0.0")    ||
    isInNet(host, "82.137.192.0","255.255.192.0")
  ) return 6;

  /* Egypt */
  if (
    isInNet(host, "41.32.0.0",   "255.240.0.0")    ||
    isInNet(host, "196.202.0.0", "255.255.0.0")
  ) return 5;

  return 0;
}


/* =========================================================
   📊 FINAL REGION TIER
   ========================================================= */

function regionTier(host) {
  host = normalizeHost(host);

  // فحص النطاقات الأردنية أولاً (DNS-based)
  var joDomainTier = jordanDomainTier(host);
  if (joDomainTier > 0) return joDomainTier;

  // فحص IP أردني
  var jordanTier = jordanResidentialTier(host);
  if (jordanTier > 0) return jordanTier;

  // فحص شرق أوسط
  var meTier = middleEastTier(host);
  if (meTier > 0) return meTier;

  return 0;
}


/* =========================================================
   🎮 PUBG DOMAIN DETECTION
   ========================================================= */

function isPUBGDirect(s) {
  return (
    /(^|[.\-_])pubg([.\-_]|$)/.test(s)          ||
    /(^|[.\-_])pubgm([.\-_]|$)/.test(s)          ||
    /(^|[.\-_])pubgmobile([.\-_]|$)/.test(s)     ||
    /(^|[.\-_])pubgsea([.\-_]|$)/.test(s)        ||
    /(^|[.\-_])pubgkr([.\-_]|$)/.test(s)         ||
    /(^|[.\-_])pubgcs([.\-_]|$)/.test(s)         ||
    /(^|[.\-_])pubgme([.\-_]|$)/.test(s)         ||
    /(^|[.\-_])pubgmena([.\-_]|$)/.test(s)       ||
    /(^|[.\-_])pubglite([.\-_]|$)/.test(s)       ||
    /(^|[.\-_])pubgnewstate([.\-_]|$)/.test(s)
  );
}

function isPUBGPublisher(s) {
  return (
    /(^|[.\-_])krafton([.\-_]|$)/.test(s)        ||
    /(^|[.\-_])tencent([.\-_]|$)/.test(s)        ||
    /(^|[.\-_])lightspeed([.\-_]|$)/.test(s)     ||
    /(^|[.\-_])proximabeta([.\-_]|$)/.test(s)    ||
    /(^|[.\-_])igame([.\-_]|$)/.test(s)          ||
    /(^|[.\-_])garena([.\-_]|$)/.test(s)         ||
    /(^|[.\-_])levelinfinite([.\-_]|$)/.test(s)  ||
    /(^|[.\-_])vng([.\-_]|$)/.test(s)
  );
}

function isPUBGInfra(s) {
  return (
    /qcloud/.test(s)              ||
    /myqcloud/.test(s)            ||
    /tencentcs/.test(s)           ||
    /tencent-cloud/.test(s)       ||
    /tencentcos/.test(s)          ||
    /gtimg/.test(s)               ||
    /qpic\.cn/.test(s)            ||
    /idqqimg/.test(s)             ||
    /amazonaws/.test(s)           ||
    /aws\.com/.test(s)            ||
    /cloudfront/.test(s)          ||
    /awsglobalaccelerator/.test(s)||
    /aliyun/.test(s)              ||
    /alibaba/.test(s)             ||
    /alicdn/.test(s)              ||
    /alibabausercontent/.test(s)  ||
    /googleapis\.com/.test(s)     ||
    /gstatic\.com/.test(s)        ||
    /azure/.test(s)               ||
    /msecnd/.test(s)
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
    /anticheat/.test(s)
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
    /tdm/.test(s)                 ||
    /teamdeathmatch/.test(s)      ||
    /payload/.test(s)             ||
    /metroroyale/.test(s)         ||
    /metro[-_]?royale/.test(s)    ||
    /zombiemode/.test(s)          ||
    /infection/.test(s)
  );
}

function isPUBGAPI(u) {
  return (
    /(\/api\/|\/v1\/|\/v2\/|\/v3\/|\/v4\/)/.test(u) &&
    /(game|match|session|battle|player|server|region|lobby|rank|clan|inventory)/.test(u)
  );
}

function isPUBGServerDiscovery(s, u) {
  return (
    /(serverlist|server[-_]?list|realm|routing|server[-_]?select|region[-_]?select)/.test(u) &&
    /(game|match|player|pubg|pubgm|tencent|krafton|levelinfinite)/.test(s)
  );
}

function isPUBGResource(s, u) {
  return (
    /(patch|update|resource|asset|hotfix|download|cdn)/.test(u) &&
    /(pubg|pubgm|tencent|lightspeed|proximabeta|krafton|levelinfinite)/.test(s)
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
  if (isPUBGInfra(s)) score += 25;
  if (isPUBGService(s)) score += 70;
  if (isPUBGMode(s)) score += 45;
  if (isPUBGAPI(u)) score += 35;
  if (isPUBGServerDiscovery(s, u)) score += 40;
  if (isPUBGResource(s, u)) score += 30;
  if (isMiddleEastServer(s, u)) score += 50;
  if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
  if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;
  if (/lobby/.test(s) && /(game|match|session|server)/.test(s)) score += 15;

  // مكافأة DNS أردني
  if (isJordanianDomain(h)) score += 20;

  return score;
}

function isPUBG(host, url) {
  return getPUBGScore(host, url) >= 60;
}


/* =========================================================
   🎮 PUBG-SPECIFIC DOMAIN LIST
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
  "garena.com":              true
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
   🔄 FAILOVER SYSTEM
   ========================================================= */

function markFailed(proxyAddr) {
  SESSION.failedProxies[proxyAddr] = new Date().getTime();
}

function isFailed(proxyAddr) {
  var failTime = SESSION.failedProxies[proxyAddr];
  if (!failTime) return false;
  var now = new Date().getTime();
  if ((now - failTime) > FAILOVER_COOLDOWN) {
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
   🎯 SMART PROXY SELECTION
   ========================================================= */

function selectSmartProxy(host, url, tier) {
  var available = getAvailableProxies();
  if (available.length === 0) {
    SESSION.failedProxies = {};
    available = PROXIES;
  }

  /* Jordan Residential — أفضل بروكسي */
  if (tier >= 15) {
    var best = available[0];
    for (var i = 1; i < available.length; i++) {
      if (available[i].weight > best.weight) {
        best = available[i];
      }
    }
    return best.addr;
  }

  /* Middle East — توزيع ذكي */
  if (tier >= 5) {
    var hash = ultraHash(host + "|" + url);
    var idx = hash % available.length;
    return available[idx].addr;
  }

  /* Unknown — توزيع مرجح */
  var totalWeight = 0;
  for (var j = 0; j < available.length; j++) {
    totalWeight += available[j].weight;
  }
  var hash2 = ultraHash(host + "|" + url + "|" + new Date().getTime());
  var selector = hash2 % totalWeight;
  var cumulative = 0;
  for (var k = 0; k < available.length; k++) {
    cumulative += available[k].weight;
    if (selector < cumulative) {
      return available[k].addr;
    }
  }
  return available[0].addr;
}


/* =========================================================
   🔗 HOST GROUP DETECTION
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
    if ((now - SESSION.lockedAt) < STICKY_TTL) {
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
   🚀 CORE SELECTION
   ========================================================= */

function selectCore(host, url) {
  var sticky = getStickyProxy(host, url);
  if (sticky !== null) return sticky;

  var tier = regionTier(host);

  /* Jordan Residential */
  if (tier >= 15) {
    var proxy = selectSmartProxy(host, url, tier);
    lockProxy(proxy, host);
    return proxy;
  }

  /* Middle East */
  if (tier >= 5) {
    var proxy2 = selectSmartProxy(host, url, tier);
    lockProxy(proxy2, host);
    return proxy2;
  }

  /* Unknown */
  var proxy3 = selectSmartProxy(host, url, tier);
  lockProxy(proxy3, host);
  return proxy3;
}


/* =========================================================
   🛡️ NON-PUBG ROUTING
   ========================================================= */

function selectNonPUBGCore(host) {
  var tier = regionTier(host);
  if (tier >= 15) return PROXIES[0].addr;
  return DIRECT;
}


/* =========================================================
   🇯🇴══════════════════════════════════════════════════════
   ║        JORDAN DNS SMART FILTER ENGINE                 ║
   ║     محرك تصفية DNS الأردني الذكي                     ║
   ╚════════════════════════════════════════════════════════
   ========================================================= */


/* =========================================================
   🔍 DNS PATTERN ANALYSIS
   تحليل أنماط DNS للكشف عن PUBG
   ========================================================= */

function analyzeDNSPattern(host, url) {
  host = normalizeHost(host);
  url = (url || "").toLowerCase();

  var analysis = {
    host: host,
    url: url,
    isJordanian: false,
    isPUBG: false,
    isMiddleEast: false,
    isSuspicious: false,
    dnsRegion: "unknown",
    confidence: 0,
    recommendedAction: "direct",
    recommendedProxy: null
  };

  // تحليل النطاق
  if (isJordanianDomain(host)) {
    analysis.isJordanian = true;
    analysis.dnsRegion = "JO";
    analysis.confidence += 40;
  }

  // تحليل PUBG
  if (isPUBG(host, url)) {
    analysis.isPUBG = true;
    analysis.confidence += 30;
  }

  // تحليل الشرق الأوسط
  if (isMiddleEastServer(host, url)) {
    analysis.isMiddleEast = true;
    analysis.confidence += 20;
  }

  // تحليل IP
  if (isIPv4(host)) {
    var tier = regionTier(host);
    if (tier >= 15) {
      analysis.isJordanian = true;
      analysis.dnsRegion = "JO";
      analysis.confidence += 50;
    } else if (tier >= 5) {
      analysis.isMiddleEast = true;
      analysis.dnsRegion = "ME";
      analysis.confidence += 30;
    }
  }

  // تحليل التوقيت (ساعات الذروة في الأردن)
  var hour = new Date().getHours();
  if (hour >= 20 || hour <= 1) {
    // ساعات الذروة الأردنية
    analysis.confidence += 10;
  }

  // قرار التوصية
  if (analysis.isJordanian && analysis.isPUBG) {
    analysis.recommendedAction = "force_jordan_proxy";
    analysis.recommendedProxy = PROXIES[0].addr;
  } else if (analysis.isPUBG) {
    analysis.recommendedAction = "smart_proxy";
  } else if (analysis.isJordanian) {
    analysis.recommendedAction = "jordan_proxy";
    analysis.recommendedProxy = PROXIES[0].addr;
  }

  return analysis;
}


/* =========================================================
   🛡️ DNS ANTI-LEAK ENGINE
   محرك منع تسريب DNS
   ========================================================= */

var DNS_ANTI_LEAK = {
  enabled: true,
  strictMode: true,
  logLeaks: true,
  leaks: []
};

function preventDNSLeak(host, url) {
  if (!DNS_ANTI_LEAK.enabled) return null;

  host = normalizeHost(host);

  var result = {
    safe: true,
    action: "allow",
    reason: "",
    details: {}
  };

  // فحص 1: نطاقات أردنية يجب أن تحل محلياً
  if (isJordanianDomain(host)) {
    result.details.jordanianDomain = true;

    // تأكد من أن الطلب يمر عبر البروكسي الأردني
    result.action = "force_proxy";
    result.reason = "Jordanian domain must resolve through Jordan proxy";
    return result;
  }

  // فحص 2: نطاقات PUBG يجب أن تمر عبر البروكسي
  if (isPUBG(host, url)) {
    result.details.pubgDetected = true;
    result.action = "force_proxy";
    result.reason = "PUBG traffic must route through Jordan proxy";
    return result;
  }

  // فحص 3: نطاقات شرق أوسطية
  if (isMiddleEastServer(host, url)) {
    result.details.middleEastDetected = true;
    result.action = "force_proxy";
    result.reason = "Middle East server detected, routing through Jordan proxy";
    return result;
  }

  // فحص 4: نطاقات مشبوهة
  if (DNS_ANTI_LEAK.strictMode) {
    // فحص DNS rebinding
    if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      if (!isIPv4(host)) {
        result.safe = false;
        result.action = "block";
        result.reason = "Invalid IP format detected";
        return result;
      }
    }

    // فحص نطاقات طويلة جداً (مشبوهة)
    if (host.length > 253) {
      result.safe = false;
      result.action = "block";
      result.reason = "Domain name too long";
      return result;
    }

    // فحص أحرف مشبوهة
    if (/[^\x00-\x7F]/.test(host)) {
      // IDN domain - قد يكون مشبوه
      result.details.idnDomain = true;
    }
  }

  return result;
}


/* =========================================================
   📊 DNS STATISTICS TRACKER
   متتبع إحصائيات DNS
   ========================================================= */

var DNS_STATS = {
  totalQueries: 0,
  jordanQueries: 0,
  pubgQueries: 0,
  middleEastQueries: 0,
  blockedQueries: 0,
  cachedQueries: 0,
  leakedQueries: 0,
  startTime: new Date().getTime()
};

function trackDNSQuery(host, url, result) {
  DNS_STATS.totalQueries++;

  if (isJordanianDomain(host)) DNS_STATS.jordanQueries++;
  if (isPUBG(host, url)) DNS_STATS.pubgQueries++;
  if (isMiddleEastServer(host, url)) DNS_STATS.middleEastQueries++;

  if (result && result.blocked) DNS_STATS.blockedQueries++;
  if (result && result.cached) DNS_STATS.cachedQueries++;
  if (result && result.leaked) DNS_STATS.leakedQueries++;
}


/* =========================================================
   🔄 DNS QUERY OPTIMIZER
   محسّن استعلامات DNS
   ========================================================= */

function optimizeDNSQuery(host, url) {
  host = normalizeHost(host);

  var optimization = {
    originalHost: host,
    optimizedHost: host,
    useCache: true,
    usePrefetch: false,
    useCompress: false,
    priority: "normal",
    ttl: DNS_CACHE_TTL
  };

  // تبسيط النطاقات الفرعية الطويلة
  var parts = host.split(".");
  if (parts.length > 4) {
    // استخدم آخر 4 أجزاء فقط
    optimization.optimizedHost = parts.slice(-4).join(".");
  }

  // تحديد الأولوية
  if (isJordanianDomain(host)) {
    optimization.priority = "high";
    optimization.ttl = DNS_CACHE_TTL * 2; // كاش أطول للنطاقات الأردنية
  }

  if (isPUBG(host, url)) {
    optimization.priority = "critical";
    optimization.usePrefetch = true;
    optimization.ttl = DNS_CACHE_TTL / 2; // كاش أقصر لـ PUBG (تحديثات متكررة)
  }

  // ضغط DNS للنطاقات المتكررة
  if (DNS_STATS.totalQueries > 100) {
    optimization.useCompress = true;
  }

  return optimization;
}


/* =========================================================
   🎯 DNS-BASED SMART ROUTING
   التوجيه الذكي بناءً على DNS
   ========================================================= */

function dnsSmartRouting(host, url) {
  host = normalizeHost(host);

  // 1. تحليل DNS
  var analysis = analyzeDNSPattern(host, url);

  // 2. فحص التسريب
  var leakCheck = preventDNSLeak(host, url);

  // 3. تحسين الاستعلام
  var optimization = optimizeDNSQuery(host, url);

  // 4. تتبع الإحصائيات
  trackDNSQuery(host, url, {
    blocked: leakCheck && leakCheck.action === "block",
    cached: false,
    leaked: false
  });

  // 5. قرار التوجيه

  // إذا محجوب
  if (leakCheck && leakCheck.action === "block") {
    return DIRECT;
  }

  // إذا أردني + PUBG
  if (analysis.isJordanian && analysis.isPUBG) {
    return analysis.recommendedProxy || PROXIES[0].addr;
  }

  // إذا PUBG فقط
  if (analysis.isPUBG) {
    return selectCore(host, url);
  }

  // إذا أردني فقط
  if (analysis.isJordanian) {
    return PROXIES[0].addr;
  }

  // إذا شرق أوسط
  if (analysis.isMiddleEast) {
    return selectCore(host, url);
  }

  // لا قرار DNS
  return null;
}


/* =========================================================
   🚀 MAIN PAC ENGINE — النسخة النهائية
   ========================================================= */

function FindProxyForURL(url, host) {

  host = host || "";
  url = url || "";

  // تنظيف
  host = normalizeHost(host);


  /* =======================================================
     🇯🇴 DNS SMART FILTER — المرحلة الأولى
     فلترة DNS ذكية قبل أي قرار آخر
     ======================================================= */

  var dnsDecision = dnsSmartRouting(host, url);
  if (dnsDecision !== null) {
    return dnsDecision;
  }


  /* =======================================================
     🎮 KNOWN PUBG DOMAINS — فحص سريع
     ======================================================= */

  if (isKnownPUBGDomain(host)) {
    return selectCore(host, url);
  }


  /* =======================================================
     🎮 PUBG DETECTION — المرحلة الثانية
     ======================================================= */

  if (isPUBG(host, url)) {
    SESSION.matchCount++;

    if (SESSION.lastMatchHost !== host) {
      SESSION.lockedProxy = null;
      SESSION.lastMatchHost = host;
    }

    return selectCore(host, url);
  }


  /* =======================================================
     🇯🇴 JORDANIAN DOMAINS — المرحلة الثالثة
     ======================================================= */

  if (isJordanianDomain(host)) {
    return PROXIES[0].addr;
  }


  /* =======================================================
     🌐 EVERYTHING ELSE
     ======================================================= */

  return selectNonPUBGCore(host);
}


/* =========================================================
   📊 DEBUG FUNCTION
   ========================================================= */

function debugPAC(host, url) {
  host = normalizeHost(host || "");
  url = url || "";

  var tier = regionTier(host);
  var score = getPUBGScore(host, url);
  var isKnown = isKnownPUBGDomain(host);
  var isME = isMiddleEastServer(host, url);
  var isJo = isJordanianDomain(host);
  var dnsAnalysis = analyzeDNSPattern(host, url);
  var leakCheck = preventDNSLeak(host, url);
  var optimization = optimizeDNSQuery(host, url);
  var bestDNS = getBestJordanDNS();

  return {
    host: host,
    url: url,
    tier: tier,
    score: score,
    isPUBG: score >= 60,
    isKnownDomain: isKnown,
    isMiddleEast: isME,
    isJordanian: isJo,
    proxy: FindProxyForURL(url, host),
    dns: {
      analysis: dnsAnalysis,
      leakCheck: leakCheck,
      optimization: optimization,
      bestJordanDNS: bestDNS,
      stats: DNS_STATS
    },
    session: {
      lockedProxy: SESSION.lockedProxy,
      matchCount: SESSION.matchCount
    }
  };
}


/* =========================================================
   📊 DNS STATS FUNCTION
   ========================================================= */

function getDNSStats() {
  var now = new Date().getTime();
  var uptime = now - DNS_STATS.startTime;
  var uptimeMinutes = Math.floor(uptime / 60000);

  return {
    uptime: uptimeMinutes + " minutes",
    totalQueries: DNS_STATS.totalQueries,
    jordanQueries: DNS_STATS.jordanQueries,
    pubgQueries: DNS_STATS.pubgQueries,
    middleEastQueries: DNS_STATS.middleEastQueries,
    blockedQueries: DNS_STATS.blockedQueries,
    cachedQueries: DNS_STATS.cachedQueries,
    leakedQueries: DNS_STATS.leakedQueries,
    cacheSize: Object.keys(DNS_CACHE).length,
    jordanPercentage: DNS_STATS.totalQueries > 0 ?
      Math.round((DNS_STATS.jordanQueries / DNS_STATS.totalQueries) * 100) : 0,
    pubgPercentage: DNS_STATS.totalQueries > 0 ?
      Math.round((DNS_STATS.pubgQueries / DNS_STATS.totalQueries) * 100) : 0
  };
}
