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
    isInNet(host, "31.44.0.0", "255.252.0.0") ||
    isInNet(host, "37.17.0.0", "255.255.0.0") ||
    isInNet(host, "46.32.0.0", "255.248.0.0") ||
    isInNet(host, "78.135.0.0", "255.255.0.0") ||
    isInNet(host, "85.94.0.0", "255.254.0.0") ||
    isInNet(host, "188.123.0.0", "255.255.0.0") ||
    isInNet(host, "94.249.0.0", "255.255.0.0") ||
    isInNet(host, "176.28.128.0", "255.255.128.0") ||
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
  
  if (shExpMatch(h, "*.eg") || /egypt|cairo|alexandria|giza/.test(h)) return true;
  if (shExpMatch(h, "*.ir") || /iran|tehran|isfahan|mashhad|tabriz/.test(h)) return true;
  if (shExpMatch(h, "*.af") || /afghan|kabul|kandahar|herat/.test(h)) return true;
  if (shExpMatch(h, "*.sy")) return true;

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
   🔐 نظام الجلسة الثابتة (محسن)
   ============================== */
var SESSION = {
  proxy: null,
  hostPattern: null,
  timestamp: 0,
  duration: 999999999999   // 🔥 جلسة شبه أبدية - لن تنتهي
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

  if (isJordan(host)) {
    var hash = ultraHash(host + url);
    var mod = hash % 3;
    var proxy = (mod === 0) ? PROXY_A :
                (mod === 1) ? PROXY_B :
                              PROXY_C;
    lockSession(proxy, host);
    return proxy;
  }

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

  if (dnsDomainIs(h, "github.com") ||
      shExpMatch(h, "*.github.com") ||
      dnsDomainIs(h, "githubusercontent.com") ||
      shExpMatch(h, "*.githubusercontent.com") ||
      dnsDomainIs(h, "githubassets.com") ||
      shExpMatch(h, "*.githubassets.com") ||
      dnsDomainIs(h, "github.dev") ||
      shExpMatch(h, "*.github.dev") ||
      dnsDomainIs(h, "api.github.com")) ||
      dnsDomainIs(h, "youtube.com") ||
      shExpMatch(h, "*.youtube.com") ||
      shExpMatch(h, "*.googlevideo.com")) {
    return "DIRECT";
  }

  if (isBlocked(host)) {
    return "PROXY 127.0.0.1:1";
  }

  if (isPUBG(host, url)) {
    return selectProxy(host, url);
  }

  return selectProxy(host, url);
}
