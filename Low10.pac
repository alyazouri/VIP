/* =========================================================
   🏆 JORDAN TOURNAMENT TITANIUM – ULTRA ELITE v4
   Full Optimized PAC | Elite DNS | Ultra Lock | Zero Waste
   ========================================================= */

/* ==============================
   🌐 PROXY POOL
   ============================== */
var PROXY_A = "PROXY 46.185.131.218:20001";
var PROXY_B = "PROXY 91.106.109.12:20001";
var PROXY_C = "PROXY 176.29.153.95:20001";
var BLOCK   = "PROXY 0.0.0.0:0";

/* ==============================
   ⚡ ULTRA HASH (FNV-1a)
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
   🧠 TITANIUM DNS ENGINE
   ============================== */

var DNS_CACHE = {};
var DNS_FAIL_CACHE = {};
var DNS_MAX_CACHE = 200;

function isIPv4(host){
  return /^\d+\.\d+\.\d+\.\d+$/.test(host);
}

function isPrivateIP(ip){
  return (
    isInNet(ip,"10.0.0.0","255.0.0.0") ||
    isInNet(ip,"172.16.0.0","255.240.0.0") ||
    isInNet(ip,"192.168.0.0","255.255.0.0") ||
    isInNet(ip,"127.0.0.0","255.0.0.0")
  );
}

function collapseHost(host){
  var parts = host.split(".");
  if (parts.length > 2)
    return parts.slice(parts.length - 2).join(".");
  return host;
}

function safeResolve(host){

  if (isPlainHostName(host))
    return null;

  if (isIPv4(host))
    return host;

  if (DNS_FAIL_CACHE[host])
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
    DNS_FAIL_CACHE[host] = true;
    return null;
  }

  if (!isPrivateIP(ip)){
    DNS_CACHE[host] = ip;
    DNS_CACHE[collapsed] = ip;

    if (Object.keys(DNS_CACHE).length > DNS_MAX_CACHE)
      DNS_CACHE = {};
  }

  return ip;
}

/* ==============================
   🇯🇴 JORDAN TIER
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
  if (isJordanIP(ip)) return 3;
  return 1;
}

/* ==============================
   🎮 PUBG DETECTION
   ============================== */

function isPUBG(host, url){
  var s = (host + " " + url).toLowerCase();
  return (
    /pubg|pubgm|bgmi|krafton|lightspeed|proximabeta/.test(s) ||
    /tencent|qcloud|myqcloud/.test(s) ||
    /battle|match|arena|lobby|gamecore|dispatcher/.test(s) ||
    /erangel|miramar|sanhok|vikendi|karakin|livik|deston|nusa/.test(s) ||
    /rank|season|leaderboard|tier|conqueror|ace/.test(s) ||
    /payload|metro|infection|zombie/.test(s)
  );
}

/* ==============================
   🔐 STICKY CORE
   ============================== */

var LOCKED_CORE = null;

function selectCore(ip, host, url){

  if (LOCKED_CORE !== null)
    return LOCKED_CORE;

  var tier = regionTier(ip);
  var hash = ultraHash(ip + host + url);

  if (tier === 3){
    LOCKED_CORE = PROXY_A;
    return LOCKED_CORE;
  }

  var mod = hash % 3;
  LOCKED_CORE = (mod === 0) ? PROXY_A :
                (mod === 1) ? PROXY_B :
                              PROXY_C;
  return LOCKED_CORE;
}

/* ==============================
   🔒 ULTRA SESSION LOCK
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

  if (!url) return "80";

  var m = url.match(/:(\d+)\//);
  if (m) return m[1];

  if (url.substring(0,5) === "https")
    return "443";

  return "80";
}

function enforceSession(ip, host, port){

  if (!SESSION.ip){

    SESSION.ip    = ip;
    SESSION.net24 = getNet24(ip);
    SESSION.host  = host;
    SESSION.port  = port;

    return PROXY_A;
  }

  if (ip !== SESSION.ip) return BLOCK;
  if (getNet24(ip) !== SESSION.net24) return BLOCK;
  if (host !== SESSION.host) return BLOCK;
  if (port !== SESSION.port) return BLOCK;

  return PROXY_A;
}

/* ==============================
   🚀 MAIN ENGINE
   ============================== */

function FindProxyForURL(url, host){

  var h = host.toLowerCase();

  /* ✅ Trusted Direct */
  if (dnsDomainIs(h,"github.com") ||
      shExpMatch(h,"*.github.com") ||
      dnsDomainIs(h,"youtube.com") ||
      shExpMatch(h,"*.youtube.com")){
        return "DIRECT";
  }

  var ip = safeResolve(host);
  if (!ip) return PROXY_A;

  /* 🎮 PUBG Traffic */
  if (isPUBG(host, url)){

    var port = extractPort(url);

    if (regionTier(ip) === 3)
      return enforceSession(ip, host, port);

    return selectCore(ip, host, url);
  }

  /* 🌍 Default Routing */
  return PROXY_A;
}
