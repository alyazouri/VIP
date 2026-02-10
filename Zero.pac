var PROXY = {
  // ===================================
  // 🎮 MATCH ZONE - اللعب الفعلي
  // ===================================
  MATCH_JO_1   : "PROXY 176.29.153.95:20001",
  MATCH_JO_2   : "PROXY 176.29.153.95:20002",
  MATCH_JO_3   : "PROXY 176.29.153.95:20003",
  
  // ===================================
  // 🏠 LOBBY ZONE - التصفح
  // ===================================
  LOBBY_MAIN   : "PROXY 212.35.66.45:9030"
};

/* ========================================
   🚫 TOTAL EUROPE BLACKLIST
   أي نطاق فيه حتى HOP واحد أوروبي
   ======================================== */
function hasEuropeHop(host){
  return (
    // 🇩🇪 Germany (كل النطاقات)
    isInNet(host, "2.0.0.0",     "254.0.0.0") ||
    isInNet(host, "5.0.0.0",     "255.0.0.0") ||    // إلا إذا UAE
    isInNet(host, "31.0.0.0",    "255.0.0.0") ||
    isInNet(host, "46.0.0.0",    "254.0.0.0") ||
    isInNet(host, "77.0.0.0",    "255.0.0.0") ||
    isInNet(host, "78.0.0.0",    "254.0.0.0") ||
    isInNet(host, "80.0.0.0",    "248.0.0.0") ||
    isInNet(host, "81.0.0.0",    "255.0.0.0") ||
    isInNet(host, "82.0.0.0",    "254.0.0.0") ||
    isInNet(host, "83.0.0.0",    "255.0.0.0") ||
    isInNet(host, "84.0.0.0",    "252.0.0.0") ||
    isInNet(host, "85.0.0.0",    "255.0.0.0") ||
    isInNet(host, "86.0.0.0",    "254.0.0.0") ||
    isInNet(host, "87.0.0.0",    "255.0.0.0") ||
    isInNet(host, "88.0.0.0",    "248.0.0.0") ||
    isInNet(host, "89.0.0.0",    "255.0.0.0") ||
    isInNet(host, "90.0.0.0",    "254.0.0.0") ||
    isInNet(host, "91.0.0.0",    "255.0.0.0") ||
    isInNet(host, "92.0.0.0",    "252.0.0.0") ||
    isInNet(host, "93.0.0.0",    "255.0.0.0") ||
    isInNet(host, "94.0.0.0",    "254.0.0.0") ||
    isInNet(host, "95.0.0.0",    "255.0.0.0") ||
    isInNet(host, "109.0.0.0",   "255.0.0.0") ||
    isInNet(host, "128.0.0.0",   "192.0.0.0") ||
    isInNet(host, "134.0.0.0",   "254.0.0.0") ||
    isInNet(host, "141.0.0.0",   "255.0.0.0") ||
    isInNet(host, "145.0.0.0",   "255.0.0.0") ||
    isInNet(host, "151.0.0.0",   "255.0.0.0") ||
    isInNet(host, "176.0.0.0",   "240.0.0.0") ||
    isInNet(host, "185.0.0.0",   "255.0.0.0") ||
    isInNet(host, "188.0.0.0",   "252.0.0.0") ||
    isInNet(host, "193.0.0.0",   "255.0.0.0") ||
    isInNet(host, "194.0.0.0",   "254.0.0.0") ||
    isInNet(host, "195.0.0.0",   "255.0.0.0") ||
    isInNet(host, "212.0.0.0",   "252.0.0.0") ||
    isInNet(host, "213.0.0.0",   "255.0.0.0") ||
    isInNet(host, "217.0.0.0",   "255.0.0.0")
  );
}

/* ========================================
   🇯🇴 JORDAN ABSOLUTE PATHS
   كل نطاق مضمون 100% أردني
   ======================================== */
function isJordanAbsolute(host){
  return (
    // 🟢 Orange Jordan - Core ASN
    isInNet(host, "46.32.0.0",   "255.248.0.0") ||
    isInNet(host, "37.17.0.0",   "255.255.0.0") ||
    isInNet(host, "31.44.0.0",   "255.252.0.0") ||
    isInNet(host, "94.249.0.0",  "255.255.0.0") ||
    isInNet(host, "188.161.0.0", "255.255.0.0") ||
    isInNet(host, "78.135.0.0",  "255.255.0.0") ||
    isInNet(host, "91.144.0.0",  "255.248.0.0") ||
    isInNet(host, "176.10.0.0",  "255.254.0.0") ||
    isInNet(host, "185.88.0.0",  "255.252.0.0") ||

    // 🟡 Zain Jordan - Core ASN
    isInNet(host, "89.28.0.0",   "255.248.0.0") ||
    isInNet(host, "45.128.0.0",  "255.252.0.0") ||
    isInNet(host, "185.5.156.0", "255.255.252.0") ||
    isInNet(host, "185.117.8.0", "255.255.248.0") ||
    isInNet(host, "37.44.0.0",   "255.252.0.0") ||

    // 🟣 Umniah - Core ASN
    isInNet(host, "102.64.0.0",  "255.192.0.0") ||
    isInNet(host, "185.127.76.0","255.255.252.0") ||
    isInNet(host, "37.48.0.0",   "255.252.0.0") ||
    isInNet(host, "185.20.224.0","255.255.224.0") ||

    // 🔵 Batelco Jordan
    isInNet(host, "46.244.0.0",  "255.252.0.0") ||

    // 🏛️ Jordan Gov / Universities
    isInNet(host, "196.204.0.0", "255.252.0.0") ||
    isInNet(host, "212.100.0.0", "255.254.0.0") ||
    isInNet(host, "193.188.0.0", "255.252.0.0")
  );
}

/* ========================================
   🌐 CDN with Jordan POP (مضمون)
   فقط الـ ranges اللي فيها POP عمّان
   ======================================== */
function hasJordanPOP(host){
  return (
    // ☁️ Cloudflare - Amman POP confirmed
    (isInNet(host, "104.16.0.0",  "255.240.0.0") && !hasEuropeHop(host)) ||
    (isInNet(host, "172.64.0.0",  "255.192.0.0") && !hasEuropeHop(host)) ||
    (isInNet(host, "188.114.96.0","255.255.224.0") && !hasEuropeHop(host)) ||

    // 🔍 Google - Amman Cache confirmed
    (isInNet(host, "142.250.0.0", "255.254.0.0") && !hasEuropeHop(host)) ||
    (isInNet(host, "142.251.0.0", "255.255.0.0") && !hasEuropeHop(host)) ||
    (isInNet(host, "172.217.0.0", "255.255.0.0") && !hasEuropeHop(host)) ||

    // 📘 Meta - ME POP
    (isInNet(host, "157.240.0.0", "255.252.0.0") && !hasEuropeHop(host))
  );
}

/* ========================================
   🌍 GULF TIER 1 (بدون أوروبا)
   ======================================== */
function isGulfDirect(host){
  if (hasEuropeHop(host)) return false;
  
  return (
    // 🇦🇪 UAE - Direct only
    isInNet(host, "5.0.0.0",     "255.128.0.0") ||
    isInNet(host, "213.42.0.0",  "255.254.0.0") ||
    isInNet(host, "31.222.0.0",  "255.254.0.0") ||
    isInNet(host, "85.15.0.0",   "255.255.0.0") ||

    // 🇸🇦 Saudi - Direct only
    isInNet(host, "85.25.0.0",   "255.255.0.0") ||
    isInNet(host, "188.245.0.0", "255.255.0.0") ||
    isInNet(host, "213.130.0.0", "255.254.0.0") ||

    // 🇰🇼 Kuwait - Direct only
    isInNet(host, "87.236.0.0",  "255.254.0.0") ||

    // 🇧🇭 Bahrain - Direct only
    isInNet(host, "37.223.0.0",  "255.255.0.0") ||

    // 🇶🇦 Qatar - Direct only
    isInNet(host, "37.210.0.0",  "255.254.0.0")
  );
}

/* ========================================
   🎯 ASIA-PACIFIC TIER (لببجي)
   مسارات آسيوية مباشرة بدون أوروبا
   ======================================== */
function isAsiaDirectPath(host){
  if (hasEuropeHop(host)) return false;
  
  return (
    // 🇨🇳 China Telecom / Unicom (Tencent backbone)
    isInNet(host, "58.0.0.0",    "254.0.0.0") ||
    isInNet(host, "59.0.0.0",    "255.0.0.0") ||
    isInNet(host, "60.0.0.0",    "252.0.0.0") ||
    isInNet(host, "61.0.0.0",    "255.0.0.0") ||
    isInNet(host, "106.0.0.0",   "254.0.0.0") ||
    isInNet(host, "110.0.0.0",   "254.0.0.0") ||
    isInNet(host, "111.0.0.0",   "255.0.0.0") ||
    isInNet(host, "112.0.0.0",   "248.0.0.0") ||
    isInNet(host, "113.0.0.0",   "255.0.0.0") ||
    isInNet(host, "114.0.0.0",   "254.0.0.0") ||
    isInNet(host, "115.0.0.0",   "255.0.0.0") ||
    isInNet(host, "116.0.0.0",   "252.0.0.0") ||
    isInNet(host, "117.0.0.0",   "255.0.0.0") ||
    isInNet(host, "118.0.0.0",   "254.0.0.0") ||
    isInNet(host, "119.0.0.0",   "255.0.0.0") ||
    isInNet(host, "120.0.0.0",   "248.0.0.0") ||
    isInNet(host, "121.0.0.0",   "255.0.0.0") ||
    isInNet(host, "122.0.0.0",   "254.0.0.0") ||
    isInNet(host, "123.0.0.0",   "255.0.0.0") ||
    isInNet(host, "124.0.0.0",   "252.0.0.0") ||
    isInNet(host, "125.0.0.0",   "255.0.0.0") ||

    // 🇸🇬 Singapore (SEA servers)
    isInNet(host, "103.0.0.0",   "255.0.0.0") ||
    isInNet(host, "202.0.0.0",   "254.0.0.0") ||

    // 🇯🇵 Japan (TYO servers)
    isInNet(host, "126.0.0.0",   "254.0.0.0") ||
    isInNet(host, "133.0.0.0",   "255.0.0.0") ||
    isInNet(host, "153.0.0.0",   "255.0.0.0") ||
    isInNet(host, "163.0.0.0",   "255.0.0.0") ||

    // 🇮🇳 India (Mumbai)
    isInNet(host, "14.0.0.0",    "254.0.0.0") ||
    isInNet(host, "27.0.0.0",    "255.0.0.0") ||
    isInNet(host, "49.0.0.0",    "255.0.0.0") ||
    isInNet(host, "106.0.0.0",   "254.0.0.0")
  );
}

/* ========================================
   🎮 PUBG DETECTION (شامل)
   ======================================== */
function isPUBG(host, url){
  var s = ((host || "") + " " + (url || "")).toLowerCase();
  return (
    // Domain keywords
    /pubg|pubgm|pubgmobile|intlgame|igamecj|krafton/i.test(s) ||
    /tencent|qq\.com|lightspeed|proximabeta|amsoveasea/i.test(s) ||
    /gcloud|qcloud|tencentcs|myqcloud/i.test(s) ||
    
    // Game services
    /vmp|gme|gamecenter|voice|voip|anticheat|pandora|bugly/i.test(s) ||
    
    // Analytics
    /adjust|appsflyer|analytics|firebase|crashlytics/i.test(s)
  );
}

/* ========================================
   🎮 GAMEPLAY vs 🏠 LOBBY
   ======================================== */
function isGameplay(url){
  var u = (url || "").toLowerCase();
  return (
    // Gameplay keywords
    /arena|tdm|deathmatch|domination|gun|gungame|training|warehouse|hangar|runic|library/i.test(u) ||
    /wow|ugc|creative|creation|template|map|featured|trending|workshop|editor|publish/i.test(u) ||
    /classic|erangel|miramar|sanhok|vikendi|livik|karakin|taego|deston|nusa/i.test(u) ||
    /evo|evoground|payload|infection|zombie|metro|metroroyale|survivor|pve/i.test(u) ||
    /match|game|play|battle|combat|fight|versus|vs|enemy|kill|weapon|loot|drop|zone|circle/i.test(u) ||
    /stats|rank|tier|rating|leaderboard|achievement|medal|title|frame|outfit|skin/i.test(u)
  );
}

function isLobby(url){
  var u = (url || "").toLowerCase();
  return (
    /lobby|matchmaking|queue|waiting|search|finding|join/i.test(u) ||
    /room|customroom|recruit|team|squad|party|invite|friend|clan|crew/i.test(u) ||
    /dispatcher|router|region|allocation|server|ping|latency|connection/i.test(u) ||
    /shop|store|mall|purchase|buy|item|crate|chest|box|spin|draw/i.test(u) ||
    /inventory|backpack|locker|warehouse|stash|collection/i.test(u) ||
    /news|event|notice|announcement|update|patch|season|pass|mission|quest|task/i.test(u) ||
    /setting|config|preference|option|control|graphic|audio|sensitivity/i.test(u) ||
    /share|facebook|twitter|youtube|instagram|discord|link|url|web/i.test(u)
  );
}

/* ========================================
   🎲 FINGERPRINT (stable hash)
   ======================================== */
function fingerprint(host, url){
  var s = (host || "").substring(0, 30) + "|" + ((url || "").substring(0, 50));
  var hash = 5381;
  
  for (var i = 0; i < s.length; i++){
    hash = ((hash << 5) + hash) + s.charCodeAt(i);
  }
  
  return Math.abs(hash) >>> 0; // unsigned 32-bit
}

/* ========================================
   💎 ADVANCED MATCH PICKER
   توزيع ذكي على 3 بروكسيات
   ======================================== */
function pickMatchProxy(host, fp){
  var score = 0;
  
  // 🥇 Tier 1: Jordan Absolute (100% أردني مضمون)
  if (isJordanAbsolute(host)) score += 1000;
  
  // 🥈 Tier 2: CDN with Jordan POP
  if (hasJordanPOP(host)) score += 500;
  
  // 🥉 Tier 3: Gulf Direct (خليجي بدون أوروبا)
  if (isGulfDirect(host)) score += 250;
  
  // 🏅 Tier 4: Asia Direct (آسيوي بدون أوروبا)
  if (isAsiaDirectPath(host)) score += 100;
  
  // 🚫 Penalty: Europe detected
  if (hasEuropeHop(host)) score = 0;
  
  // توزيع حسب الـ score
  if (score >= 500) {
    // Tier 1-2: توزيع متساوي على البروكسيات الثلاثة
    var mod = fp % 3;
    if (mod === 0) return PROXY.MATCH_JO_1;
    if (mod === 1) return PROXY.MATCH_JO_2;
    return PROXY.MATCH_JO_3;
  }
  
  if (score >= 100) {
    // Tier 3-4: 70% JO_1 / 20% JO_2 / 10% JO_3
    var mod = fp % 10;
    if (mod < 7) return PROXY.MATCH_JO_1;
    if (mod < 9) return PROXY.MATCH_JO_2;
    return PROXY.MATCH_JO_3;
  }
  
  // Unknown/Low score: 50% JO_1 / 30% JO_2 / 20% JO_3
  var mod = fp % 10;
  if (mod < 5) return PROXY.MATCH_JO_1;
  if (mod < 8) return PROXY.MATCH_JO_2;
  return PROXY.MATCH_JO_3;
}

/* ========================================
   🧠 MAIN CLASSIFIER
   ======================================== */
function classifyRoute(host, url){
  var fp = fingerprint(host, url);
  
  // 🎮 Gameplay → MATCH proxies
  if (isGameplay(url)) {
    return pickMatchProxy(host, fp);
  }
  
  // 🏠 Lobby → LOBBY proxy
  if (isLobby(url)) {
    return PROXY.LOBBY_MAIN;
  }
  
  // 🤔 Undefined → check IP quality
  if (isJordanAbsolute(host) || hasJordanPOP(host)) {
    return pickMatchProxy(host, fp);
  }
  
  // Default: Lobby
  return PROXY.LOBBY_MAIN;
}

/* ========================================
   🚀 PAC ENTRY POINT
   ======================================== */
function FindProxyForURL(url, host){
  // ✅ PUBG → Smart routing
  if (isPUBG(host, url)) {
    return classifyRoute(host, url);
  }
  
  // ❌ Non-PUBG → DIRECT
  return "DIRECT";
}
