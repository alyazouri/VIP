/* ==============================
   🔥 JORDAN-ONLY ULTIMATE SYSTEM
   Dynamic IP Ready - No DNS Lookups
   ============================== */

// Proxy Configuration
var PROXY_HOST = "176.29.153.95"; // غيّرها لـ DDNS إذا Dynamic IP
var PROXY_PORT = "20001";
var SOCKS_PORT = "1080";

var PRIMARY = "SOCKS5 " + PROXY_HOST + ":" + SOCKS_PORT;
var SECONDARY = "PROXY " + PROXY_HOST + ":" + PROXY_PORT;
var CHAIN = PRIMARY + "; " + SECONDARY;

/* ==============================
   💾 ULTRA-FAST CACHE
   ============================== */
var matchCache = {};
var hostCache = {};
var blockList = {};
var allowList = {};

/* ==============================
   🇯🇴 JORDAN FINGERPRINT SCANNER
   يكشف أي شيء أردني بدون DNS
   ============================== */
function isJordanFingerprint(host) {
  // Quick cache lookup
  if (allowList[host] === true) return true;
  if (allowList[host] === false) return false;
  
  var h = host.toLowerCase();
  var isJO = false;
  
  // Level 1: Domain TLD
  if (/\.jo$/i.test(h)) {
    isJO = true;
  }
  
  // Level 2: Explicit Jordan markers
  else if (/\bjordan\b|^jo-|^jo\d|-jo-|-jo\d|\.jo-|_jo_|jordan-|jordanian/i.test(h)) {
    isJO = true;
  }
  
  // Level 3: City names
  else if (/\bamman\b|irbid|zarqa|aqaba|madaba|jerash|karak|mafraq|ajloun|salt/i.test(h)) {
    isJO = true;
  }
  
  // Level 4: ISP signatures (بدون DNS)
  else if (/orange.*jo|umniah|zain.*jo|batelco.*jo|jpp|linkdot.*jo|mada.*jo/i.test(h)) {
    isJO = true;
  }
  
  // Level 5: IP patterns in hostname
  else if (/176[.-]29[.-]|46[.-]3[2-9][.-]|37[.-]17[.-]|31[.-]4[4-7][.-]|94[.-]249[.-]|188[.-]161[.-]|89[.-]2[89][.-]|89[.-]3[0-5][.-]|185[.-]88[.-]|185[.-]117[.-]/i.test(h)) {
    isJO = true;
  }
  
  // Level 6: Palestine (close proximity)
  else if (/\.ps$|palestine|^ps-|-ps-|ramallah|gaza|westbank|185[.-]98[.-]/i.test(h)) {
    isJO = true;
  }
  
  // Level 7: Levant region markers
  else if (/^levant-|^sham-|-levant-|-sham-|\.levant\.|bilad.*sham/i.test(h)) {
    isJO = true;
  }
  
  // Cache result
  allowList[host] = isJO;
  return isJO;
}

/* ==============================
   🌍 NEUTRAL SERVER DETECTION
   سيرفرات عامة ممكن تكون قريبة
   ============================== */
function isNeutralServer(host) {
  var h = host.toLowerCase();
  
  // Generic server names without region
  if (/^(server|game|match|node|lb|proxy|cdn|edge|relay)\d*\./i.test(h)) {
    // Make sure it has NO foreign markers
    if (!hasForeignMarker(h)) {
      return true;
    }
  }
  
  // ME region without sub-region
  if (/^me-|^mena-|^middleeast-/i.test(h)) {
    if (!/-eu|-us|-ap|-asia|-sa|-ae|-eg|-iq|-tr|-africa/i.test(h)) {
      return true;
    }
  }
  
  // IP-based hostnames (no DNS needed)
  if (/^\d{1,3}[.-]\d{1,3}[.-]\d{1,3}[.-]\d{1,3}/i.test(h)) {
    return true;
  }
  
  return false;
}

/* ==============================
   🚫 FOREIGN MARKER DETECTION
   ============================== */
function hasForeignMarker(host) {
  // Quick cache
  if (blockList[host] === true) return true;
  if (blockList[host] === false) return false;
  
  var h = host.toLowerCase();
  var isForeign = false;
  
  // Ultra-fast substring checks
  var forbidden = [
    "-eu-", "-us-", "-ap-", "-asia-", 
    "-de-", "-fr-", "-uk-", "-sg-", "-jp-", "-kr-", 
    "-sa-", "-ae-", "-eg-", "-tr-", "-ru-", "-br-", "-au-",
    "-cn-", "-in-", "-kw-", "-qa-", "-bh-", "-om-"
  ];
  
  for (var i = 0; i < forbidden.length; i++) {
    if (h.indexOf(forbidden[i]) > -1) {
      isForeign = true;
      break;
    }
  }
  
  // Pattern checks (if not already marked)
  if (!isForeign) {
    // European countries
    if (/-(de|fr|nl|uk|gb|it|es|se|fi|no|dk|pl|be|ch|ie|at|pt|cz|gr|ro|hu|bg|hr|sk|si|lt|lv|ee)-/i.test(h)) {
      isForeign = true;
    }
    // Asian countries (non-ME)
    else if (/-(sg|jp|kr|hk|tw|cn|in|th|vn|id|my|ph|bd|pk|lk|np|mm|kh)-/i.test(h)) {
      isForeign = true;
    }
    // Americas
    else if (/-(us|usa|ca|br|mx|ar|cl|co|pe|ve)-/i.test(h)) {
      isForeign = true;
    }
    // Gulf states
    else if (/-(sa|ksa|saudi|uae|ae|kw|kuwait|qa|qatar|bh|bahrain|om|oman)-/i.test(h)) {
      isForeign = true;
    }
    // Other MENA
    else if (/-(eg|egypt|cairo|iq|iraq|baghdad|tr|turkey|istanbul|sy|syria|damascus|lb|lebanon|beirut)-/i.test(h)) {
      isForeign = true;
    }
    // Others
    else if (/-(ru|russia|moscow|au|australia|sydney|nz|za|africa)-/i.test(h)) {
      isForeign = true;
    }
    // Continents
    else if (/\b(europe|america|americas|asiapac|apac|oceania|africa)\b/i.test(h)) {
      isForeign = true;
    }
    // Major cities
    else if (/frankfurt|london|paris|dublin|amsterdam|madrid|stockholm|tokyo|singapore|seoul|hongkong|mumbai|bangalore|sydney|melbourne|seattle|virginia|oregon|california|newyork|saopaulo|toronto|riyadh|dubai|abudhabi|doha|muscat|manama|jeddah|cairo|istanbul|moscow|beijing|shanghai/i.test(h)) {
      isForeign = true;
    }
  }
  
  // Cache result
  blockList[host] = isForeign;
  return isForeign;
}

/* ==============================
   🎮 PUBG SIGNATURE SCANNER
   يكشف أي شيء متعلق بـ PUBG
   ============================== */
function isPUBGSignature(host, url) {
  // Fast path - check cache
  var cacheKey = host.substring(0, 40);
  if (matchCache[cacheKey]) return true;
  
  var h = host.toLowerCase();
  var u = url.toLowerCase();
  
  // Lightning-fast substring checks
  if (h.indexOf("pubg") > -1) { matchCache[cacheKey] = true; return true; }
  if (h.indexOf("krafton") > -1) { matchCache[cacheKey] = true; return true; }
  if (h.indexOf("tencent") > -1) { matchCache[cacheKey] = true; return true; }
  if (h.indexOf("qcloud") > -1) { matchCache[cacheKey] = true; return true; }
  if (h.indexOf("proximabeta") > -1) { matchCache[cacheKey] = true; return true; }
  if (u.indexOf("pubg") > -1) { matchCache[cacheKey] = true; return true; }
  
  var combined = h + u;
  
  // Comprehensive pattern matching
  var isPUBG = /pubg|krafton|proximabeta|igame|pubgm|battlegrounds|playerunknown/.test(combined) ||
               /tencent|qcloud|myqcloud|tencentcs|gcloud/.test(combined) ||
               /gameserver|gamematch|match-\d+|lobby-\d+|dispatcher|allocation|session-\d+|router-\d+/.test(combined) ||
               /battle-|arena-|combat-|war-|fight-|tdm-|deathmatch|tournament/.test(combined) ||
               /erangel|miramar|sanhok|livik|vikendi|karakin|taego|haven|deston|rondo/.test(combined) ||
               /squad|duo|solo|fpp|tpp|classic|arcade|training|warehouse|cheer/.test(combined) ||
               /rank-|tier-|season-\d+|leaderboard|stats-|profile-|achievement/.test(combined) ||
               /voip|voice-|chat-|agora|vivox|photon|rtc/.test(combined) ||
               /update-|patch-|cdn-|asset-|resource-|download-|content-/.test(combined) ||
               /matchmaking|queue|spawn|parachute|loot|circle|zone|redzone/.test(combined);
  
  if (isPUBG) matchCache[cacheKey] = true;
  return isPUBG;
}

/* ==============================
   🧠 SMART ROUTING BRAIN
   ============================== */
function routingDecision(host) {
  // Priority 1: Jordan confirmed
  if (isJordanFingerprint(host)) {
    return "ROUTE_JO";
  }
  
  // Priority 2: Neutral (no foreign markers)
  if (isNeutralServer(host)) {
    return "ROUTE_JO";
  }
  
  // Priority 3: Has foreign markers
  if (hasForeignMarker(host)) {
    return "FORCE_JO";
  }
  
  // Priority 4: Unknown but safe
  // If hostname is very short/generic, allow
  if (host.length < 15 && !/[a-z]{2}-[a-z]{2}/.test(host)) {
    return "ROUTE_JO";
  }
  
  // Default: Force through Jordan proxy
  return "FORCE_JO";
}

/* ==============================
   🚀 MAIN ROUTING ENGINE
   كل شيء يمر عبر الأردن
   ============================== */
function FindProxyForURL(url, host) {
  
  // ========== PUBG TRAFFIC ==========
  if (isPUBGSignature(host, url)) {
    
    // Get routing decision
    var decision = routingDecision(host);
    
    // ALL decisions route through Jordan
    // This is the KEY to seeing only Jordanians
    return CHAIN;
  }
  
  // ========== ALL OTHER TRAFFIC ==========
  // Route everything through Jordan for IP consistency
  // This makes YOU always appear as Jordan IP
  return CHAIN;
}

/* ==============================
   🧹 AUTO CACHE MAINTENANCE
   ============================== */
var requestCounter = 0;
function maintainCache() {
  requestCounter++;
  
  // Clear caches every 2000 requests
  if (requestCounter > 2000) {
    matchCache = {};
    hostCache = {};
    blockList = {};
    allowList = {};
    requestCounter = 0;
  }
}

// Call maintenance on each request
maintainCache();
