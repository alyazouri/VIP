/* =========================================================
   🇯🇴 PUBG OMEGA LOCK – JORDAN PRIORITY
   Jordan Range Boost | ME Core Only | Zero EU/Asia
   Sticky Session | No Direct | No Fallback
   ========================================================= */

var CORE_JO = "PROXY 176.29.153.95:20001";

/* ==============================
   🔒 SESSION LOCK
   ============================== */
var LOCK = CORE_JO;

/* ==============================
   🇯🇴 JORDAN IP RANGES
   ============================== */
function isJordan(host){
  return (
    isInNet(host,"46.32.0.0","255.248.0.0") ||
    isInNet(host,"37.17.0.0","255.255.0.0") ||
    isInNet(host,"31.44.0.0","255.252.0.0") ||
    isInNet(host,"94.249.0.0","255.255.0.0") ||
    isInNet(host,"188.161.0.0","255.255.0.0") ||
    isInNet(host,"89.28.0.0","255.248.0.0") ||
    isInNet(host,"102.64.0.0","255.192.0.0")
  );
}

/* ==============================
   🎮 PUBG DETECTION
   ============================== */
function isPUBG(host, url){
  var s = (host + " " + url).toLowerCase();

  return (
    /pubg|pubgm|krafton|lightspeed|proximabeta|igame/.test(s) ||
    /tencent|qcloud|myqcloud|gcloud|amazonaws|aws|cloudfront/.test(s) ||
    /battle|match|arena|allocation|dispatcher|router|session|lobby/.test(s) ||
    /erangel|livik|miramar|tdm|warehouse|rank|classic|zone/.test(s)
  );
}

/* ==============================
   🌍 FOREIGN REGION BLOCK
   ============================== */
function foreignRegion(host){
  var h = (host||"").toLowerCase();

  return (
    /eu-|europe|de-|fr-|nl-|uk-|it-|pl-|es-|se-|fi-/.test(h) ||
    /asia|ap-|sg-|jp-|kr-|hk-|tw-|india|in-/.test(h) ||
    /tr-|turkey|ru-|russia/.test(h)
  );
}

/* ==============================
   🚀 MAIN ENGINE
   ============================== */
function FindProxyForURL(url, host){

  if (isPUBG(host, url)){

    /* 🇯🇴 أولوية أردنية */
    if (isJordan(host)){
      return LOCK;
    }

    /* 🌍 منع أوروبا وآسيا */
    if (foreignRegion(host)){
      return LOCK;
    }

    /* تثبيت Middle East Core */
    return LOCK;
  }

  /* منع DIRECT نهائي */
  return CORE_JO;
}
