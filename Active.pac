/* =========================================================
   🏆 JORDAN TITANIUM – ULTRA ACTIVE v10
   Fully Active Logic | Sticky | Session | Tier | Failover
   GitHub + YouTube Direct
   ========================================================= */

/* ==============================
   🌐 PROXY CONFIG
   ============================== */
var PROXY_MAIN   = "PROXY 46.185.131.218:20001";
var PROXY_BACKUP = "PROXY 91.106.109.12:20001";
var BLOCK        = "PROXY 0.0.0.0:0";

/* ==============================
   ⚡ ULTRA HASH
   ============================== */
function ultraHash(str){
  var h = 2166136261;
  for (var i = 0; i < str.length; i++){
    h ^= str.charCodeAt(i);
    h = (h * 16777619) >>> 0;
  }
  return h >>> 0;
}

/* ==============================
   🧠 DNS ENGINE (Active)
   ============================== */
var DNS_CACHE = {};
var DNS_FAIL  = {};
var DNS_MAX   = 200;

function isIPv4(host){
  return /^\d+\.\d+\.\d+\.\d+$/.test(host);
}

function collapseHost(host){
  var p = host.split(".");
  if (p.length > 2)
    return p.slice(p.length - 2).join(".");
  return host;
}

function safeResolve(host){

  if (isPlainHostName(host))
    return null;

  if (isIPv4(host))
    return host;

  if (DNS_FAIL[host])
    return null;

  if (DNS_CACHE[host])
    return DNS_CACHE[host];

  var collapsed = collapseHost(host);

  if (DNS_CACHE[collapsed]){
    DNS_CACHE[host] = DNS_CACHE[collapsed];
    return DNS_CACHE[collapsed];
  }

  var ip = dnsResolve(host);

  if (!ip){
    DNS_FAIL[host] = true;
    return null;
  }

  DNS_CACHE[host] = ip;
  DNS_CACHE[collapsed] = ip;

  if (Object.keys(DNS_CACHE).length > DNS_MAX)
    DNS_CACHE = {};

  return ip;
}

/* ==============================
   🇯🇴 JORDAN TIER (Active)
   ============================== */
function isJordanIP(ip){
  return (
    isInNet(ip,"188.123.0.0","255.255.0.0") ||
    isInNet(ip,"212.35.0.0","255.255.0.0") ||
    isInNet(ip,"94.249.0.0","255.255.0.0") ||
    isInNet(ip,"176.28.0.0","255.255.0.0") ||
    isInNet(ip,"82.212.0.0","255.255.0.0")
  );
}

function regionTier(ip){
  return isJordanIP(ip) ? 3 : 1;
}

/* ==============================
   🔐 STICKY CORE (Active)
   ============================== */
var LOCKED_PROXY = null;

function selectCore(ip, host, url){

  if (LOCKED_PROXY !== null)
    return LOCKED_PROXY;

  var hash = ultraHash(ip + host + url);
  var tier = regionTier(ip);

  /* الأردن يحصل على أولوية البروكسي الرئيسي */
  if (tier === 3){
    LOCKED_PROXY = PROXY_MAIN;
  } else {
    /* توزيع بسيط بين الرئيسي والاحتياطي */
    LOCKED_PROXY = (hash % 2 === 0) ? PROXY_MAIN : PROXY_BACKUP;
  }

  return LOCKED_PROXY;
}

/* ==============================
   🔒 SESSION LOCK (Active)
   ============================== */
var SESSION = {
  ip: null,
  net24: null,
  host: null,
  port: null
};

function getNet24(ip){
  return ip.split('.').slice(0,3).join('.');
}

function extractPort(url){
  var m = url.match(/:(\d+)\//);
  if (m) return m[1];
  return (url.substring(0,5) === "https") ? "443" : "80";
}

function enforceSession(ip, host, port, proxy){

  if (!SESSION.ip){
    SESSION.ip    = ip;
    SESSION.net24 = getNet24(ip);
    SESSION.host  = host;
    SESSION.port  = port;
    return proxy;
  }

  if (ip !== SESSION.ip ||
      getNet24(ip) !== SESSION.net24 ||
      host !== SESSION.host ||
      port !== SESSION.port){

      /* إعادة تثبيت الجلسة بدون تغيير البروكسي */
      SESSION.ip    = ip;
      SESSION.net24 = getNet24(ip);
      SESSION.host  = host;
      SESSION.port  = port;
  }

  return proxy;
}

/* ==============================
   🚀 MAIN ENGINE
   ============================== */
function FindProxyForURL(url, host){

  var h = host.toLowerCase();

  /* ✅ GitHub Direct */
  if (dnsDomainIs(h,"github.com") ||
      shExpMatch(h,"*.github.com") ||
      dnsDomainIs(h,"githubusercontent.com") ||
      shExpMatch(h,"*.githubusercontent.com")){
        return "DIRECT";
  }

  /* ✅ YouTube Direct */
  if (dnsDomainIs(h,"youtube.com") ||
      shExpMatch(h,"*.youtube.com") ||
      dnsDomainIs(h,"youtu.be") ||
      shExpMatch(h,"*.googlevideo.com") ||
      shExpMatch(h,"*.ytimg.com")){
        return "DIRECT";
  }

  var ip = safeResolve(host);
  if (!ip)
    return PROXY_MAIN + "; " + PROXY_BACKUP;

  var proxy = selectCore(ip, host, url);
  var port  = extractPort(url);

  return enforceSession(ip, host, port, proxy);
}
