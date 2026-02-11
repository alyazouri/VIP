/* =========================================================
   🏆 JORDAN TOURNAMENT TITANIUM – CLEAN EDITION
   Zero DIRECT | Zero Europe Logic | Tournament Stability
   Anti-Cheat Removed | Sticky Core | Gulf Bias
   ========================================================= */

var PROXY_A = "PROXY 176.29.153.95:20001";
var PROXY_B = "PROXY 176.29.153.95:20002";
var PROXY_C = "PROXY 176.29.153.95:20003";

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
   🌍 GULF RANGES
   ============================== */
function isGulf(host){
  return (
    isInNet(host,"5.0.0.0","255.128.0.0") ||
    isInNet(host,"188.245.0.0","255.255.0.0") ||
    isInNet(host,"213.42.0.0","255.254.0.0") ||
    isInNet(host,"31.222.0.0","255.254.0.0") ||
    isInNet(host,"37.210.0.0","255.254.0.0")
  );
}

/* ==============================
   🛡 REGION SCORING
   ============================== */
function regionTier(host){
  if (isJordan(host)) return 3;
  if (isGulf(host)) return 2;
  return 1;
}

/* ==============================
   🎮 PUBG TITANIUM DETECTION (CLEAN)
   ============================== */
function isPUBG(host, url){

  var h = (host||"").toLowerCase();
  var u = (url||"").toLowerCase();
  var s = h + " " + u;

  return (

    /* Core Game */
    /pubg|pubgm|pubgmobile|pubgsea|pubgkr|krafton/.test(s) ||

    /* Tencent Infra */
    /tencent|lightspeed|proximabeta|igame|qcloud|myqcloud|tencentcs/.test(s) ||

    /* Cloud Providers */
    /amazonaws|ap-south-1|me-south-1|aliyun|alibaba|gcloud/.test(s) ||

    /* Match / Session Systems */
    /battle|match|arena|allocation|dispatcher|router|session/.test(s) ||

    /* Gameplay Keywords */
    /erangel|tdm|payload|metro|rank|classic|combat|zone/.test(s)
  );
}

/* ==============================
   🔐 TOURNAMENT STICKY CORE
   ============================== */
var LOCKED_CORE = null;

function selectCore(host, url){

  if (LOCKED_CORE !== null)
    return LOCKED_CORE;

  var tier = regionTier(host);
  var hash = ultraHash(host + url);

  /* 🇯🇴 الأردن دائمًا CORE_A */
  if (tier === 3){
    LOCKED_CORE = PROXY_A;
    return LOCKED_CORE;
  }

  /* 🌍 الخليج توزيع ثابت */
  if (tier === 2){
    var mod = hash % 3;
    if (mod === 0) LOCKED_CORE = PROXY_A;
    else if (mod === 1) LOCKED_CORE = PROXY_B;
    else LOCKED_CORE = PROXY_C;
    return LOCKED_CORE;
  }

  /* 🛡 أي شيء غير معروف */
  LOCKED_CORE = (hash % 2 === 0) ? PROXY_A : PROXY_B;
  return LOCKED_CORE;
}

/* ==============================
   🚀 MAIN ENGINE – ZERO DIRECT
   ============================== */
function FindProxyForURL(url, host){

  if (isPUBG(host, url)){
    return selectCore(host, url);
  }

  /* لا DIRECT نهائيًا */
  return PROXY_A;
}
