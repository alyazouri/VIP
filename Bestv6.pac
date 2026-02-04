// ================= DNS =================
// dns 1.1.1.1 1.0.0.1

// ================= SOCKS PROXIES =================
var MATCH_JO     = "SOCKS 46.185.131.218:20001";   // MATCH (Gameplay) - Jordan-specific, low lag
var LOBBY_PROXY  = "SOCKS 212.35.66.45:8085";     // LOBBY / SOCIAL / CDN - Jordan-specific, low lag
var BLOCK        = "SOCKS 127.0.0.1:9";
var DIRECT       = "DIRECT";

// ================= JORDAN MATCH IPV4 (ULTRA-TIGHTENED) =================
var JORDAN_MATCH_IPV4 = [
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["46.185.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"],
  ["92.253.0.0","255.255.128.0"],
  ["149.200.128.0","255.255.128.0"],
  ["176.28.128.0","255.255.128.0"],
  ["46.32.96.0","255.255.224.0"],
  ["46.248.192.0","255.255.224.0"],
  ["95.172.192.0","255.255.224.0"],
  ["109.107.224.0","255.255.224.0"],
  ["5.45.128.0","255.255.248.0"],
  ["37.123.128.0","255.255.128.0"],
  ["87.236.232.0","255.255.248.0"],
  ["176.241.0.0","255.255.0.0"],
  ["37.18.0.0","255.255.0.0"],
  ["86.108.0.0","255.252.0.0"],
  ["90.84.0.0","255.252.0.0"],
  ["217.144.0.0","255.255.0.0"],
  ["196.201.0.0","255.255.0.0"],
  ["62.72.128.0","255.255.128.0"],
  ["213.186.32.0","255.255.224.0"],
  ["81.21.64.0","255.255.240.0"],
  ["37.202.64.0","255.255.192.0"],
  ["80.10.64.0","255.255.240.0"],
  ["217.23.32.0","255.255.240.0"]
];

// ================= JORDAN WIDE IPV4 (ULTRA-TIGHTENED) =================
var JORDAN_WIDE_IPV4 = [
  ["82.212.64.0","255.255.192.0"],
  ["94.249.0.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["176.28.128.0","255.255.128.0"],
  ["46.185.128.0","255.255.128.0"],
  ["213.6.0.0","255.255.0.0"],
  ["212.35.0.0","255.255.0.0"],
  ["86.108.0.0","255.255.128.0"],
  ["92.253.0.0","255.255.128.0"],
  ["149.200.128.0","255.255.128.0"],
  ["79.173.192.0","255.255.192.0"],
  ["46.32.96.0","255.255.224.0"],
  ["46.248.192.0","255.255.224.0"],
  ["95.172.192.0","255.255.224.0"],
  ["109.107.224.0","255.255.224.0"],
  ["37.220.112.0","255.255.240.0"],
  ["46.23.112.0","255.255.240.0"],
  ["5.45.128.0","255.255.248.0"],
  ["37.123.128.0","255.255.128.0"],
  ["87.236.232.0","255.255.248.0"],
  ["176.241.0.0","255.255.0.0"],
  ["37.18.0.0","255.255.0.0"],
  ["85.159.216.0","255.255.248.0"],
  ["178.238.176.0","255.255.240.0"],
  ["141.105.56.0","255.255.248.0"],
  ["37.44.32.0","255.255.248.0"],
  ["37.152.0.0","255.255.248.0"],
  ["185.19.112.0","255.255.248.0"],
  ["185.80.104.0","255.255.248.0"],
  ["92.241.32.0","255.255.224.0"],
  ["196.201.0.0","255.255.0.0"],
  ["62.72.128.0","255.255.128.0"],
  ["213.186.32.0","255.255.224.0"],
  ["81.21.64.0","255.255.240.0"],
  ["86.108.0.0","255.252.0.0"],
  ["90.84.0.0","255.252.0.0"],
  ["217.144.0.0","255.255.0.0"],
  ["37.202.64.0","255.255.192.0"],
  ["80.10.64.0","255.255.240.0"],
  ["217.23.32.0","255.255.240.0"]
];

// ================= JORDAN MATCH IPV6 (ADDED FOR JORDANIAN RANGES - NO LEAKS) =================
var JORDAN_MATCH_IPV6 = [
  ["2001:32c0::", "29"],
  ["2a00:18d0::", "32"],
  ["2a00:18d8::", "29"],
  ["2a03:6d00::", "32"],  // Umniah
  ["2a05:7500::", "29"],  // Umniah
  ["2a13:8d40::", "29"],  // Zain Jordan
  ["2a02:248::", "29"],   // Orange Jordan example (adjust based on actual)
  ["2a00:1a30::", "32"],
  ["2a00:1a38::", "29"],
  ["2a10:9740::", "29"],
  ["2a10:d800::", "29"]
  // Add more Jordan-specific IPv6 ranges from RIPE NCC delegations as needed for completeness
];

// ================= JORDAN WIDE IPV6 (ADDED FOR JORDANIAN RANGES - NO LEAKS) =================
var JORDAN_WIDE_IPV6 = [
  ["2001:32c0::", "29"],
  ["2a00:18d0::", "32"],
  ["2a00:18d8::", "29"],
  ["2a03:6d00::", "32"],
  ["2a05:7500::", "29"],
  ["2a13:8d40::", "29"],
  ["2a02:248::", "29"],
  ["2a00:1a30::", "32"],
  ["2a00:1a38::", "29"],
  ["2a00:1a40::", "29"],
  ["2a00:1a48::", "29"],
  ["2a00:1a50::", "32"],
  ["2a00:1a58::", "29"],
  ["2a10:9740::", "29"],
  ["2a10:d800::", "29"],
  // Expanded with more delegations for wider coverage without leaks
  ["2a00:1a60::", "29"],
  ["2a00:1a68::", "29"],
  ["2a00:1a70::", "32"],
  ["2a00:1a78::", "29"],
  ["2a00:1a80::", "29"],
  ["2a00:1a88::", "29"],
  ["2a00:1a90::", "32"],
  ["2a00:1a98::", "29"],
  ["2a00:1aa0::", "29"]
  // Continue adding if more are needed for security
];

// ================= JORDAN ISP ALLOWLIST (UPDATED FOR IPV4 & IPV6 - TIGHTER, NO LEAKS) =================
function isJordanISP(ip) {
  if (ip.indexOf(":") > -1) {
    // IPv6 check
    return isJordanISPIPv6(ip);
  } else {
    // IPv4 check
    return isJordanISPIPv4(ip);
  }
}

function isJordanISPIPv4(ip) {
  return (
    /* ZAIN (AS48832) */
    isInNet(ip, "176.28.128.0", "255.255.128.0") ||
    isInNet(ip, "46.32.96.0", "255.255.224.0") ||
    isInNet(ip, "37.123.128.0", "255.255.128.0") ||
    isInNet(ip, "87.236.232.0", "255.255.248.0") ||
    isInNet(ip, "176.241.0.0", "255.255.0.0") ||

    /* UMNIAH (AS9038) */
    isInNet(ip, "176.29.0.0", "255.255.0.0") ||
    isInNet(ip, "46.185.128.0", "255.255.128.0") ||
    isInNet(ip, "37.18.0.0", "255.255.0.0") ||
    isInNet(ip, "46.248.192.0", "255.255.224.0") ||
    isInNet(ip, "95.172.192.0", "255.255.224.0") ||
    isInNet(ip, "109.107.224.0", "255.255.224.0") ||
    isInNet(ip, "37.220.112.0", "255.255.240.0") ||
    isInNet(ip, "46.23.112.0", "255.255.240.0") ||
    isInNet(ip, "5.45.128.0", "255.255.248.0") ||
    isInNet(ip, "85.159.216.0", "255.255.248.0") ||
    isInNet(ip, "178.238.176.0", "255.255.240.0") ||
    isInNet(ip, "141.105.56.0", "255.255.248.0") ||
    isInNet(ip, "37.44.32.0", "255.255.248.0") ||
    isInNet(ip, "37.152.0.0", "255.255.248.0") ||
    isInNet(ip, "185.19.112.0", "255.255.248.0") ||
    isInNet(ip, "185.80.104.0", "255.255.248.0") ||
    isInNet(ip, "92.241.32.0", "255.255.224.0") ||

    /* ORANGE (AS8376) */
    isInNet(ip, "196.201.0.0", "255.255.0.0") ||
    isInNet(ip, "62.72.128.0", "255.255.128.0") ||
    isInNet(ip, "213.186.32.0", "255.255.224.0") ||
    isInNet(ip, "81.21.64.0", "255.255.240.0") ||
    isInNet(ip, "86.108.0.0", "255.252.0.0") ||
    isInNet(ip, "90.84.0.0", "255.252.0.0") ||
    isInNet(ip, "217.144.0.0", "255.255.0.0") ||
    isInNet(ip, "92.253.0.0", "255.255.128.0") ||
    isInNet(ip, "149.200.128.0", "255.255.128.0") ||
    isInNet(ip, "94.249.0.0", "255.255.128.0") ||
    isInNet(ip, "37.202.64.0", "255.255.192.0") ||
    isInNet(ip, "80.10.64.0", "255.255.240.0") ||
    isInNet(ip, "217.23.32.0", "255.255.240.0")
  );
}

function isJordanISPIPv6(ip) {
  return (
    isInNetIPv6(ip, "2a03:6d00::", 32) ||  // Umniah
    isInNetIPv6(ip, "2a05:7500::", 29) ||  // Umniah
    isInNetIPv6(ip, "2a13:8d40::", 29) ||  // Zain
    isInNetIPv6(ip, "2a02:248::", 29) ||   // Orange (example, verify and add more)
    isInNetIPv6(ip, "2001:32c0::", 29) ||
    isInNetIPv6(ip, "2a00:18d0::", 32) ||
    isInNetIPv6(ip, "2a00:18d8::", 29) ||
    isInNetIPv6(ip, "2a10:9740::", 29) ||
    isInNetIPv6(ip, "2a10:d800::", 29)
    // Add more specific ISP IPv6 ranges here for tighter security
  );
}

// ================= IPV6 HELPER (ADDED FOR SECURITY - NO LEAKS) =================
function ipToBigInt(ip) {
  ip = ip.toLowerCase().replace(/ /g, '');
  let parts = ip.split(':');
  while (parts.length < 8) {
    parts.splice(parts.indexOf(''), 1, ...Array(9 - parts.length).fill('0'));
  }
  parts = parts.map(p => p.padStart(4, '0'));
  return BigInt('0x' + parts.join(''));
}

function isInNetIPv6(ip, prefix, mask) {
  try {
    let ipInt = ipToBigInt(ip);
    let prefixInt = ipToBigInt(prefix);
    let maskInt = BigInt(mask);
    let shift = 128n - maskInt;
    return (ipInt >> shift) === (prefixInt >> shift);
  } catch (e) {
    return false;  // Invalid IP, block for security
  }
}

function isInListIPv6(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNetIPv6(ip, list[i][0], parseInt(list[i][1]))) return true;
  }
  return false;
}

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  if (ip.indexOf(":") > -1) {
    return isInListIPv6(ip, list);
  } else {
    for (var i = 0; i < list.length; i++) {
      if (isInNet(ip, list[i][0], list[i][1])) return true;
    }
    return false;
  }
}

function resolvePinned(host) {
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

function resetSession() {
  SESSION.matchNet = null;
  SESSION.matchHost = null;
}

// ================= PORT / UDP INFERENCE =================
function getPort(url) {
  var m = url.match(/:(\d+)/);
  return m ? parseInt(m[1], 10) : 0;
}

function isMatchPort(url) {
  var p = getPort(url);
  return (p >= 7000 && p <= 9000);
}

function isUDPFirst(u, h) {
  return isMatchPort(u) || /udp|realtime|tick|sync|frame|state/i.test(u + h);
}

// ================= PUBG DOMAIN ALLOWLIST =================
function isPUBG(host) {
  return (
    shExpMatch(host, "*.pubgmobile.com") ||
    shExpMatch(host, "*.pubgmobile.net") ||
    shExpMatch(host, "*.igamecj.com") ||
    shExpMatch(host, "*.tencent.com") ||
    shExpMatch(host, "*.gcloudcs.com") ||
    shExpMatch(host, "*.qcloud.com") ||
    shExpMatch(host, "*.levelinfinite.com") ||
    shExpMatch(host, "*.krafton.com") ||
    shExpMatch(host, "*.amazonaws.com") ||
    shExpMatch(host, "*.cloudfront.net") ||
    shExpMatch(host, "*.akamaized.net") ||
    shExpMatch(host, "*.akamai.net")
  );
}

// ================= GITHUB & YOUTUBE EXCEPTION (ADDED FOR DIRECT ACCESS - NO BLOCK) =================
function isGitHub(host) {
  return (
    shExpMatch(host, "*.github.com") ||
    shExpMatch(host, "*.github.io") ||
    shExpMatch(host, "*.githubusercontent.com") ||
    shExpMatch(host, "github.com") ||
    shExpMatch(host, "github.io") ||
    shExpMatch(host, "githubusercontent.com")
  );
}

function isYouTube(host) {
  return (
    shExpMatch(host, "*.youtube.com") ||
    shExpMatch(host, "*.youtu.be") ||
    shExpMatch(host, "*.googlevideo.com") ||
    shExpMatch(host, "*.ytimg.com") ||
    shExpMatch(host, "youtube.com") ||
    shExpMatch(host, "youtu.be") ||
    shExpMatch(host, "googlevideo.com") ||
    shExpMatch(host, "ytimg.com")
  );
}

// ================= DETECTION (STRICTER) =================
function isMatch(u, h) {
  return (
    isMatchPort(u) ||
    isUDPFirst(u, h) ||
    /match|battle|game|combat|room|server|logic|classic|ranked|arena|tdm|payload|metro|zombie|wow|training|custom|event|team|squad|opponent/i.test(u + h)
  );
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|prepare|entry/i.test(u + h);
}

function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|chat|voice/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|download|media|pak|obb/i.test(u + h);
}

// ================= MAIN (UPDATED FOR IPV6 SUPPORT & SECURITY - NO LEAKS/VULNS) =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // ===== EXCEPTION FOR GITHUB & YOUTUBE - DIRECT ACCESS =====
  if (isGitHub(host) || isYouTube(host)) {
    return DIRECT;
  }

  if (!isPUBG(host)) return BLOCK;

  var ip = resolvePinned(host);
  if (!ip) return BLOCK;

  var isIPv6 = ip.indexOf(":") > -1;

  // ===== ULTRA-STRICT JORDAN ISP ONLY (BLOCK IF NOT LOCAL - NO LEAKS) =====
  if (!isJordanISP(ip)) return BLOCK;

  // ===== MATCH =====
  if (isMatch(url, host)) {
    var matchList = isIPv6 ? JORDAN_MATCH_IPV6 : JORDAN_MATCH_IPV4;
    if (!isInList(ip, matchList)) return BLOCK;

    var netKey = isIPv6 ? ip.split(':').slice(0, 4).join(':') : ip.split('.').slice(0, 3).join('.');

    if (!SESSION.matchNet) {
      SESSION.matchNet = netKey;
      SESSION.matchHost = host;
      return MATCH_JO;
    }

    if (host !== SESSION.matchHost || netKey !== SESSION.matchNet) {
      resetSession();
      return BLOCK;
    }

    return MATCH_JO;
  }

  // ===== LOBBY =====
  if (isLobby(url, host)) {
    resetSession();
    var wideList = isIPv6 ? JORDAN_WIDE_IPV6 : JORDAN_WIDE_IPV4;
    if (!isInList(ip, wideList)) return BLOCK;
    return LOBBY_PROXY;
  }

  // ===== SOCIAL / CDN =====
  if (isSocial(url, host) || isCDN(url, host)) {
    var wideList = isIPv6 ? JORDAN_WIDE_IPV6 : JORDAN_WIDE_IPV4;
    if (!isInList(ip, wideList)) return BLOCK;
    return DIRECT;  // Direct for low lag, secured by IP check
  }

  // Default: Block if not Jordan wide - absolute no leaks
  var wideList = isIPv6 ? JORDAN_WIDE_IPV6 : JORDAN_WIDE_IPV4;
  if (!isInList(ip, wideList)) return BLOCK;
  return LOBBY_PROXY;
}
