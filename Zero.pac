/************************************************************
 *  FINAL PAC – PUBG MOBILE (iOS)
 *  Jordan MENA-Biased – FINAL CLEAN BUILD
 ************************************************************/

/* =========================
   PROXIES
   ========================= */
var PROXY = {
  JORDAN_ARENA : "PROXY 176.29.153.95:9030",
  LOBBY_ALT    : "PROXY 212.35.66.45:9030",
  MATCH_MAIN   : "PROXY 176.29.153.95:20001",
  MATCH_ALT    : "PROXY 212.35.66.45:20001"
};

/* =========================
   JORDAN STRONG PATH
   (ME-biased, narrowed, no EU)
   ========================= */
function isJordanStrongPath(host){
  return (
    // 46.32.0.0/16 (split)
    isInNet(host, "46.32.64.0",   "255.255.192.0") ||
    isInNet(host, "46.32.128.0",  "255.255.128.0") ||

    // 37.17.0.0/16 (split)
    isInNet(host, "37.17.64.0",   "255.255.192.0") ||
    isInNet(host, "37.17.128.0",  "255.255.128.0") ||

    // 31.44.0.0/16 (split)
    isInNet(host, "31.44.64.0",   "255.255.192.0") ||
    isInNet(host, "31.44.128.0",  "255.255.128.0") ||

    // 94.249.0.0/16 (split)
    isInNet(host, "94.249.64.0",  "255.255.192.0") ||
    isInNet(host, "94.249.128.0", "255.255.128.0") ||

    // 45.128.0.0/16 (split)
    isInNet(host, "45.128.64.0",  "255.255.192.0") ||
    isInNet(host, "45.128.128.0", "255.255.128.0") ||

    // 89.28.0.0/16 (split)
    isInNet(host, "89.28.64.0",   "255.255.192.0") ||
    isInNet(host, "89.28.128.0",  "255.255.128.0") ||

    // 102.64.0.0/16 (split)
    isInNet(host, "102.64.64.0",  "255.255.192.0") ||
    isInNet(host, "102.64.128.0", "255.255.128.0") ||

    // 196.204.0.0/16 (split)
    isInNet(host, "196.204.64.0", "255.255.192.0") ||
    isInNet(host, "196.204.128.0","255.255.128.0") ||

    // Additional JO-used ME-leaning blocks (narrow)
    isInNet(host, "23.250.128.0", "255.255.128.0") ||
    isInNet(host, "66.96.128.0",  "255.255.128.0") ||
    isInNet(host, "151.252.128.0","255.255.128.0") ||
    isInNet(host, "62.84.128.0",  "255.255.128.0") ||
    isInNet(host, "78.108.128.0", "255.255.128.0") ||
    isInNet(host, "109.107.128.0","255.255.128.0") ||
    isInNet(host, "41.222.128.0", "255.255.128.0") ||
    isInNet(host, "197.237.128.0","255.255.128.0") ||
    isInNet(host, "160.238.128.0","255.255.128.0")
  );
}

/* =========================
   PUBG MOBILE DETECTION
   ========================= */
function isPUBG(host, url){
  var s = ((host || "") + " " + (url || "")).toLowerCase();
  return (
    s.indexOf("pubg") !== -1 ||
    s.indexOf("pubgm") !== -1 ||
    s.indexOf("pubgmobile") !== -1 ||
    s.indexOf("intlgame") !== -1 ||
    s.indexOf("igamecj") !== -1 ||
    s.indexOf("tencent") !== -1 ||
    s.indexOf("krafton") !== -1 ||
    s.indexOf("lightspeed") !== -1 ||
    s.indexOf("proximabeta") !== -1 ||
    s.indexOf("amsoveasea") !== -1 ||
    s.indexOf("gcloud") !== -1 ||
    s.indexOf("qcloud") !== -1 ||
    s.indexOf("vmp") !== -1 ||
    s.indexOf("gme") !== -1 ||
    s.indexOf("gamecenter") !== -1
  );
}

/* =========================
   MODE CLASSIFIERS
   ========================= */
function isLobby(url){
  return /(lobby|matchmaking|matching|queue|room|rooms|customroom|recruit|team|squad|party|invite|dispatcher|router|region|allocation)/i.test(url || "");
}

function isWOW(url){
  return /(worldofwonder|wow|ugc|creative|creation|creations|template|templates|map|maps|featured|trending|popular|recommend|contest|community|workshop|editor|publish)/i.test(url || "");
}

function isArena(url){
  return /(arena|tdm|deathmatch|teamdeathmatch|gun|gungame|training|warehouse|hangar|evo|evoground|infection)/i.test(url || "");
}

function isSpecial(url){
  return /(metro|metroroyale|payload|helicopter|zombie|pve|mission|survive)/i.test(url || "");
}

/* =========================
   STABLE FINGERPRINT
   ========================= */
function fingerprint(host, url){
  var s = (host || "") + "|" + ((url || "").length);
  var score = 0;
  for (var i = 0; i < s.length; i++){
    var c = s.charCodeAt(i);
    score += (c % 23) * 3;
    score += (c % 13) * 2;
    score += (c % 7);
  }
  return score;
}

/* =========================
   MATCH BACKBONE PICKER
   ========================= */
function pickMatchProxy(host, fp){
  if (isJordanStrongPath(host)) return PROXY.MATCH_MAIN;
  return (fp % 2 === 0) ? PROXY.MATCH_MAIN : PROXY.MATCH_ALT;
}

/* =========================
   FINAL CLASSIFIER
   ========================= */
function classifyRoute(host, url){
  var fp = fingerprint(host, url);

  if (isWOW(url)) return pickMatchProxy(host, fp);     // WOW → Match proxy
  if (isArena(url)) return PROXY.JORDAN_ARENA;         // Arena → Jordan proxy
  if (isSpecial(url)) return PROXY.LOBBY_ALT;          // Special modes
  if (isLobby(url)) return (fp % 4 === 0) ? PROXY.LOBBY_ALT : PROXY.JORDAN_ARENA;

  return pickMatchProxy(host, fp); // Match
}

/* =========================
   PAC ENTRY POINT
   ========================= */
function FindProxyForURL(url, host){
  if (isPUBG(host, url)) {
    return classifyRoute(host, url);
  }
  return PROXY.JORDAN_ARENA; // Hard mode: no DIRECT
}
