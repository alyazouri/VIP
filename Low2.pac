/* ==============================
   🎯 إعدادات البروكسي
   ============================== */
var PROXY_A = "PROXY 46.185.131.218:20001";
var PROXY_B = "PROXY 91.106.109.12:20001";
var PROXY_C = "PROXY 176.29.153.95:20001";

/* ==============================
   ⚡ محرك الهاش
   ============================== */
function ultraHash(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return (h >>> 0);
}

/* ==============================
   🇯🇴 نطاقات الأردن فقط - موسعة
   ============================== */
function isJordanDomain(host) {
  var h = host.toLowerCase();
  
  if (shExpMatch(h, "*.jo") ||
      shExpMatch(h, "*.orange.jo") ||
      shExpMatch(h, "*.zain.jo") ||
      shExpMatch(h, "*.umniah.com") ||
      shExpMatch(h, "*.umniah.jo")) {
    return true;
  }
  
  if (/jordan|amman|zarqa|irbid|aqaba|mafraq|ajloun|jerash|madaba|karak|tafilah|maan/.test(h)) {
    return true;
  }
  
  return false;
}

function isJordanIP(host) {
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
    return false;
  }
  
  return (
    // Orange Jordan
    isInNet(host, "31.44.0.0", "255.252.0.0") ||
    isInNet(host, "37.17.0.0", "255.255.0.0") ||
    isInNet(host, "46.32.0.0", "255.248.0.0") ||
    isInNet(host, "78.135.0.0", "255.255.0.0") ||
    isInNet(host, "85.94.0.0", "255.254.0.0") ||
    
    // Zain Jordan
    isInNet(host, "188.123.0.0", "255.255.0.0") ||
    isInNet(host, "94.249.0.0", "255.255.0.0") ||
    isInNet(host, "176.28.128.0", "255.255.128.0") ||
    
    // Umniah Jordan
    isInNet(host, "46.185.128.0", "255.255.128.0") ||
    isInNet(host, "82.212.0.0", "255.255.0.0")
  );
}

function isJordan(host) {
  if (isJordanDomain(host)) return true;
  if (isJordanIP(host)) return true;
  return false;
}

/* ==============================
   🚫 حظر مصر و إيران و أفغانستان
   ============================== */
function isBlocked(host) {
  var h = host.toLowerCase();
  
  // 🇪🇬 حظر مصر
  if (shExpMatch(h, "*.eg") ||
      /egypt|cairo|alexandria|giza/.test(h)) {
    return true;
  }
  
  // فحص IP مصري
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
    if (isInNet(host, "41.32.0.0", "255.224.0.0") ||
        isInNet(host, "41.64.0.0", "255.192.0.0") ||
        isInNet(host, "41.128.0.0", "255.192.0.0") ||
        isInNet(host, "41.196.0.0", "255.252.0.0") ||
        isInNet(host, "41.200.0.0", "255.248.0.0") ||
        isInNet(host, "41.232.0.0", "255.248.0.0") ||
        isInNet(host, "196.128.0.0", "255.192.0.0") ||
        isInNet(host, "197.32.0.0", "255.224.0.0") ||
        isInNet(host, "197.160.0.0", "255.224.0.0")) {
      return true;
    }
  }
  
  // 🇮🇷 حظر إيران
  if (shExpMatch(h, "*.ir") ||
      /iran|tehran|isfahan|mashhad|tabriz/.test(h)) {
    return true;
  }
  
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
    if (isInNet(host, "2.176.0.0", "255.240.0.0") ||
        isInNet(host, "5.22.0.0", "255.254.0.0") ||
        isInNet(host, "5.56.0.0", "255.248.0.0") ||
        isInNet(host, "37.32.0.0", "255.224.0.0") ||
        isInNet(host, "46.18.0.0", "255.254.0.0") ||
        isInNet(host, "46.224.0.0", "255.224.0.0") ||
        isInNet(host, "31.2.0.0", "255.254.0.0") ||
        isInNet(host, "78.38.0.0", "255.254.0.0") ||
        isInNet(host, "79.127.0.0", "255.255.0.0") ||
        isInNet(host, "80.66.0.0", "255.254.0.0") ||
        isInNet(host, "80.191.0.0", "255.255.0.0") ||
        isInNet(host, "82.99.192.0", "255.255.192.0") ||
        isInNet(host, "85.9.0.0", "255.255.0.0") ||
        isInNet(host, "85.133.128.0", "255.255.128.0") ||
        isInNet(host, "86.57.0.0", "255.255.0.0") ||
        isInNet(host, "87.236.0.0", "255.252.0.0") ||
        isInNet(host, "89.32.0.0", "255.224.0.0") ||
        isInNet(host, "91.98.0.0", "255.254.0.0") ||
        isInNet(host, "91.106.64.0", "255.255.192.0") ||
        isInNet(host, "92.114.16.0", "255.255.240.0") ||
        isInNet(host, "92.119.56.0", "255.255.248.0") ||
        isInNet(host, "93.88.0.0", "255.248.0.0") ||
        isInNet(host, "94.182.0.0", "255.254.0.0") ||
        isInNet(host, "95.80.0.0", "255.248.0.0")) {
      return true;
    }
  }
  
  // 🇦🇫 حظر أفغانستان
  if (shExpMatch(h, "*.af") ||
      /afghan|kabul|kandahar|herat/.test(h)) {
    return true;
  }
  
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
    if (isInNet(host, "43.245.8.0", "255.255.248.0") ||
        isInNet(host, "49.156.0.0", "255.254.0.0") ||
        isInNet(host, "103.3.224.0", "255.255.224.0") ||
        isInNet(host, "103.11.220.0", "255.255.252.0") ||
        isInNet(host, "103.16.220.0", "255.255.252.0") ||
        isInNet(host, "103.31.80.0", "255.255.240.0") ||
        isInNet(host, "103.54.84.0", "255.255.252.0") ||
        isInNet(host, "103.255.4.0", "255.255.252.0") ||
        isInNet(host, "119.160.64.0", "255.255.192.0") ||
        isInNet(host, "149.54.0.0", "255.255.0.0") ||
        isInNet(host, "175.107.192.0", "255.255.192.0") ||
        isInNet(host, "182.52.0.0", "255.254.0.0") ||
        isInNet(host, "202.93.0.0", "255.255.0.0")) {
      return true;
    }
  }
  
  // 🇸🇾 حظر سوريا
  if (shExpMatch(h, "*.sy")) return true;
  
  if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) {
    if (isInNet(host, "5.0.0.0", "255.0.0.0") ||
        isInNet(host, "31.9.0.0", "255.255.0.0") ||
        isInNet(host, "37.48.0.0", "255.240.0.0") ||
        isInNet(host, "82.137.192.0", "255.255.192.0") ||
        isInNet(host, "91.144.0.0", "255.252.0.0")) {
      return true;
    }
  }
  
  return false;
}

/* ==============================
   🎮 كشف PUBG
   ============================== */
function isPUBG(host, url) {
  var combined = (host + " " + url).toLowerCase();

  if (/pubg|pubgm|krafton|proximabeta|lightspeed/.test(combined)) return true;
  if (/tencent|qcloud|myqcloud|tencentcs|tdm/.test(combined)) return true;
  if (/amazonaws|aliyun|gcloud/.test(combined)) {
    if (/me-south|ap-south|eu-west|us-east/.test(combined)) return true;
  }
  if (/battle|match|arena|session|dispatcher|allocation/.test(combined)) return true;
  if (/erangel|miramar|sanhok|vikendi|livik|karakin|metro|payload/.test(combined)) return true;

  return false;
}

/* ==============================
   🔐 نظام الجلسة الثابتة
   ============================== */
var SESSION = {
  proxy: null,
  hostPattern: null,
  timestamp: 0,
  duration: 400000
};

function getTime() {
  return new Date().getTime();
}

function isExpired() {
  return (getTime() - SESSION.timestamp) > SESSION.duration;
}

function lockSession(proxy, host) {
  SESSION.proxy = proxy;
  SESSION.hostPattern = host.substring(0, 20);
  SESSION.timestamp = getTime();
}

function getSession(host) {
  if (!SESSION.proxy) return null;
  if (isExpired()) {
    SESSION.proxy = null;
    return null;
  }
  
  if (host.indexOf(SESSION.hostPattern) === 0) {
    SESSION.timestamp = getTime();
    return SESSION.proxy;
  }
  
  return null;
}

/* ==============================
   🎯 اختيار البروكسي - أردن فقط
   ============================== */
function selectProxy(host, url) {
  var locked = getSession(host);
  if (locked) return locked;

  // 🇯🇴 الأردن فقط - أولوية قصوى
  if (isJordan(host)) {
    var hash = ultraHash(host + url);
    var mod = hash % 3;
    var proxy = (mod === 0) ? PROXY_A :
                (mod === 1) ? PROXY_B :
                              PROXY_C;
    lockSession(proxy, host);
    return proxy;
  }

  // 🌐 باقي الدول - توزيع عشوائي
  var hash = ultraHash(host + url + getTime().toString());
  var mod = hash % 3;
  var proxy = (mod === 0) ? PROXY_A :
              (mod === 1) ? PROXY_B :
                            PROXY_C;
  lockSession(proxy, host);
  return proxy;
}

/* ==============================
   🚀 المحرك الرئيسي
   ============================== */
function FindProxyForURL(url, host) {
  var h = host.toLowerCase();

  // ✅ استثناءات
  if (dnsDomainIs(h, "github.com") ||
      shExpMatch(h, "*.github.com") ||
      dnsDomainIs(h, "youtube.com") ||
      shExpMatch(h, "*.youtube.com") ||
      shExpMatch(h, "*.googlevideo.com")) {
    return "DIRECT";
  }

  // 🚫 حظر الدول المحظورة
  if (isBlocked(host)) {
    return "PROXY 127.0.0.1:1";
  }

  // 🎮 PUBG
  if (isPUBG(host, url)) {
    return selectProxy(host, url);
  }

  return selectProxy(host, url);
}
