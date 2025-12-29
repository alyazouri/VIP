// =======================================
// PUBG Tuvalu MAX-STRICT PAC (NO DIRECT)
// DIRECT ONLY: GitHub + YouTube
// =======================================

// --- Tuvalu ranges to bypass (avoid proxy loop) ---
var TV_NETS = [
  ["202.2.120.0", "255.255.255.0"],   // 202.2.120.x
  ["202.2.96.0",  "255.255.240.0"],   // 202.2.96.0/20
  ["202.2.112.0", "255.255.240.0"]    // 202.2.112.0/20
];

// --- Proxies (failover chain) ---
var TV_MATCH = "SOCKS5 202.2.120.41:443; SOCKS5 202.2.120.40:443; SOCKS5 202.2.120.41:8080";
var TV_GAME  = "SOCKS5 202.2.120.40:8080; SOCKS5 202.2.120.41:8080; SOCKS5 202.2.120.40:443";

// --- DIRECT allowlist (ONLY) ---
var DIRECT_DOMAINS = [
  "github.com",
  "raw.githubusercontent.com",
  "gist.githubusercontent.com",
  "api.github.com",
  "githubusercontent.com",

  "youtube.com",
  "www.youtube.com",
  "youtu.be",
  "googlevideo.com",
  "ytimg.com",
  "youtubei.googleapis.com",
  "youtube.googleapis.com"
];

// --- PUBG Domains (general) ---
var PUBG_DOMAINS = [
  "pubgmobile.com",
  "pubgm",
  "gpubgm",
  "igamecj.com",
  "proximabeta.com",
  "tencent.com",
  "qcloud.com",
  "qq.com",
  "lightspeed.la",
  "helpshift.com",
  "clubopen",
  "amsoveasea.com"
];

// --- Lobby / matchmaking hints (prefer TV_MATCH) ---
var LOBBY_HINTS = [
  "amsoveasea.com",
  "broker.amsoveasea",
  "gcloudsdk.com",
  "passport",
  "account",
  "login",
  "auth",
  "match",
  "lobby",
  "mm",
  "teamfinder",
  "recruit",
  "rank",
  "friends",
  "social",
  "gateway",
  "route",
  "dispatch"
];

// --- In-game / realtime hints (prefer TV_GAME) ---
var GAME_HINTS = [
  "gameres",
  "game",
  "battle",
  "arena",
  "realtime",
  "relay",
  "p2p",
  "voice",
  "rtc"
];

// --- PUBG IP ranges you used (keep) ---
var PUBG_IP_NETS = [
  ["162.62.0.0",   "255.255.0.0"],
  ["119.28.0.0",   "255.255.0.0"],
  ["170.106.0.0",  "255.255.0.0"],
  ["45.197.79.0",  "255.255.255.0"],
  ["43.159.108.0", "255.255.255.0"]
];

// ===============================
// Helpers
// ===============================
var _dnsCache = {}; // host -> ip

function isIPv4Literal(h) {
  return (/^\d{1,3}(\.\d{1,3}){3}$/).test(h);
}

function dnsResolveCached(host) {
  if (_dnsCache[host]) return _dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) _dnsCache[host] = ip;
  return ip;
}

function inAnyNet(ip, nets) {
  if (!ip) return false;
  for (var i = 0; i < nets.length; i++) {
    if (isInNet(ip, nets[i][0], nets[i][1])) return true;
  }
  return false;
}

function hostHasAny(host, arr) {
  for (var i = 0; i < arr.length; i++) {
    if (host.indexOf(arr[i]) !== -1) return true;
  }
  return false;
}

function hostMatchesAnyDomain(host, arr) {
  for (var i = 0; i < arr.length; i++) {
    var d = arr[i];
    if (host === d) return true;
    if (shExpMatch(host, "*." + d)) return true;
    if (host.indexOf(d) !== -1) return true;
  }
  return false;
}

function isDirectAllowed(host) {
  // exact / subdomain match only
  for (var i = 0; i < DIRECT_DOMAINS.length; i++) {
    var d = DIRECT_DOMAINS[i];
    if (host === d) return true;
    if (shExpMatch(host, "*." + d)) return true;
  }
  return false;
}

// ===============================
// Main
// ===============================
function FindProxyForURL(url, host) {
  host = (host || "").toLowerCase();

  // 0) ONLY DIRECT allowlist: GitHub + YouTube
  if (isDirectAllowed(host)) {
    return "DIRECT";
  }

  // resolve IP if needed (cached)
  var ip = isIPv4Literal(host) ? host : (dnsResolveCached(host) || "");

  // 1) Avoid proxy loop to Tuvalu nets (must stay DIRECT)
  if (inAnyNet(ip, TV_NETS)) {
    return "DIRECT";
  }

  // 2) PUBG detection
  var isPubgHost = hostMatchesAnyDomain(host, PUBG_DOMAINS);
  var isPubgIP   = inAnyNet(ip, PUBG_IP_NETS);

  // 3) MAX-STRICT routing:
  // - PUBG: smart split (match vs game)
  // - Non-PUBG: still goes through proxy (NO DIRECT)
  if (isPubgHost || isPubgIP) {
    var isHttp = (url.substring(0, 6) === "https:" || url.substring(0, 5) === "http:");
    var lobbyish = hostHasAny(host, LOBBY_HINTS);
    var gameish  = hostHasAny(host, GAME_HINTS);

    if (lobbyish) return TV_MATCH;
    if (gameish)  return TV_GAME;
    if (isHttp)   return TV_MATCH;
    return TV_GAME;
  }

  // 4) Everything else: FORCE proxy (NO DIRECT)
  // Use TV_MATCH as default because it is usually more compatible for web browsing.
  return TV_MATCH;
}
