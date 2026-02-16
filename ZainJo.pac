/* =========================================================
   🏆 JORDAN TOURNAMENT TITANIUM – ULTRA FINAL
   IP + NET + HOST + PORT LOCK
   Zero DIRECT | Sticky Core | Gulf Bias
   ========================================================= */

/* ✅ بروكسي واحد فقط */
var PROXY_A = "PROXY 46.185.131.218:20001";

/* ==============================
   ⚡ FAST DNS CACHE
   ============================== */
var DNS_CACHE = {};

function fastResolve(host){
  if (DNS_CACHE[host])
    return DNS_CACHE[host];

  var ip = dnsResolve(host);
  DNS_CACHE[host] = ip;
  return ip;
}

/* ==============================
   ⚡ ULTRA HASH ENGINE
   ============================== */
function ultraHash(str){
  var h = 2166136261;
  for (var i = 0; i < str.length; i++){
    h ^= str.charCodeAt(i);
    h += (h<<1) + (h<<4) + (h<<7) + (h<<8) + (h<<24);
  }
  return (h >>> 0);
}

/* ==============================
   🇯🇴 JORDAN RANGES
   ============================== */
function isJordan(host){
  var ip = fastResolve(host);
  if (!ip) return false;

  return (
    isInNet(ip,"188.123.0.0","255.255.0.0") ||
    isInNet(ip,"212.35.0.0","255.255.0.0") ||
    isInNet(ip,"94.249.0.0","255.255.0.0") ||
    isInNet(ip,"176.28.0.0","255.255.0.0") ||
    isInNet(ip,"82.212.0.0","255.255.0.0")
  );
}

/* ==============================
   🇸🇾 SYRIA BLOCK
   ============================== */
function isSyria(host){
  var ip = fastResolve(host);
  if (!ip) return false;

  return (
    isInNet(ip,"5.0.0.0","255.0.0.0") ||
    isInNet(ip,"31.9.0.0","255.255.0.0") ||
    isInNet(ip,"37.48.0.0","255.240.0.0") ||
    isInNet(ip,"82.137.192.0","255.255.192.0") ||
    isInNet(ip,"91.144.0.0","255.252.0.0") ||
    isInNet(ip,"176.29.0.0","255.255.0.0")
  );
}

/* ==============================
   🌍 GULF RANGES
   ============================== */
function isGulf(host){
  var ip = fastResolve(host);
  if (!ip) return false;

  return (
    isInNet(ip,"188.123.0.0","255.255.0.0") ||
    isInNet(ip,"212.35.0.0","255.255.0.0") ||
    isInNet(ip,"94.249.0.0","255.255.0.0") ||
    isInNet(ip,"176.28.0.0","255.255.0.0") ||
    isInNet(ip,"82.212.0.0","255.255.0.0")
  );
}

/* ==============================
   🛡 REGION TIER
   ============================== */
function regionTier(host){
  if (isJordan(host)) return 3;
  if (isGulf(host)) return 2;
  return 1;
}

/* ==============================
   🔐 STICKY CORE
   ============================== */
var LOCKED_CORE = null;

function selectCore(host, url){

  if (LOCKED_CORE !== null)
    return LOCKED_CORE;

  var tier = regionTier(host);

  if (tier === 3){
    LOCKED_CORE = PROXY_A;
    return LOCKED_CORE;
  }

  if (tier === 2){
    LOCKED_CORE = PROXY_A;
    return LOCKED_CORE;
  }

  LOCKED_CORE = PROXY_A;
  return LOCKED_CORE;
}

/* ==============================
   🔒 ULTRA SESSION LOCK
   ============================== */
var SESSION = {
  matchIP: null,
  matchNet: null,
  matchHost: null,
  matchPort: null
};

var BLOCK = "PROXY 0.0.0.0:0";

function extractPort(url){

  if (!url) return "80";

  var parts = url.split(":");

  if (parts.length > 2){
    return parts[2].split("/")[0];
  }

  if (url.substring(0,5) === "https")
    return "443";

  return "80";
}

function enforceUltraSession(host, url){

  var ip = fastResolve(host);
  if (!ip) return PROXY_A;

  var port = extractPort(url);
  var net24 = ip.split('.').slice(0,2).join('.');

  if (!SESSION.matchIP){

    SESSION.matchIP   = ip;
    SESSION.matchNet  = net24;
    SESSION.matchHost = host;
    SESSION.matchPort = port;

    return PROXY_A;
  }

  if (ip   !== SESSION.matchIP)   return BLOCK;
  if (net24!== SESSION.matchNet)  return BLOCK;
  if (host !== SESSION.matchHost) return BLOCK;
  if (port !== SESSION.matchPort) return BLOCK;

  return PROXY_A;
}

/* ==============================
   🚀 MAIN ENGINE
   ============================== */
function FindProxyForURL(url, host){

  var h = host.toLowerCase();

  if (dnsDomainIs(h,"github.com") ||
      dnsDomainIs(h,"www.github.com") ||
      shExpMatch(h,"*.github.com") ||
      dnsDomainIs(h,"youtube.com") ||
      dnsDomainIs(h,"www.youtube.com") ||
      shExpMatch(h,"*.youtube.com")){
        return "DIRECT";
  }

  if (shExpMatch(h,"*.sy") || isSyria(host)){
    return BLOCK;
  }

  if (isPUBG(host, url)){

    var tier = regionTier(host);

    if (tier === 3){
      return enforceUltraSession(host, url);
    }

    return selectCore(host, url);
  }

  return PROXY_A; 
}
