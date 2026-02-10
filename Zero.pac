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
// 🟢 Jordan ISPs (ASN Jordan)
        isInNet(host, "46.32.0.0",   "255.255.0.0") || // Orange
        isInNet(host, "37.17.0.0",   "255.255.0.0") ||
        isInNet(host, "31.44.0.0",   "255.255.0.0") ||
        isInNet(host, "94.249.0.0",  "255.255.0.0") ||
        isInNet(host, "89.28.0.0",   "255.255.0.0") || // Zain
        isInNet(host, "45.128.0.0",  "255.255.0.0") ||
        isInNet(host, "102.64.0.0",  "255.255.0.0") || // Umniah
        isInNet(host, "196.204.0.0", "255.255.0.0") || // Gov / NITC

        // 🟡 CDN (local POPs in Jordan)
        // Cloudflare
        isInNet(host, "104.16.0.0",  "255.240.0.0") ||
        isInNet(host, "172.64.0.0",  "255.192.0.0") ||

        // Google
        isInNet(host, "142.250.0.0", "255.254.0.0") ||
        isInNet(host, "216.239.32.0","255.255.224.0") ||

        // Akamai
        isInNet(host, "23.32.0.0",   "255.224.0.0") ||
        isInNet(host, "23.64.0.0",   "255.192.0.0") ||

        // Fastly
        isInNet(host, "151.101.0.0", "255.255.0.0") ||

        // Meta (FB / IG)
        isInNet(host, "157.240.0.0", "255.255.0.0") ||

        // 🟠 International Transit (used by JO ISPs)
        // Lumen / Level3
        isInNet(host, "4.0.0.0",     "252.0.0.0") ||

        // Telia
        isInNet(host, "62.115.0.0",  "255.255.0.0") ||
        isInNet(host, "213.248.0.0", "255.255.0.0") ||

        // GTT
        isInNet(host, "89.149.0.0",  "255.255.0.0") ||

        // AT&T
        isInNet(host, "12.0.0.0",    "255.0.0.0") ||

        // Tata
        isInNet(host, "203.0.0.0",   "255.0.0.0")
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
