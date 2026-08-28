// dns 1.1.1.1 + 1.0.0.1 
// ================= PROXIES =================
var MATCH_JO = "PROXY 46.32.102.10:20001";
var LOBBY_JO = "PROXY 46.32.102.10:9030";
var BLOCK    = "PROXY 127.0.0.1:9";
var DIRECT   = "DIRECT";

// ================= JORDAN IPV4 =================
// مرتبة: الأكبر / الأكثر استخداماً -> الأصغر / الأقل استخداماً
var JORDAN_IPV4 = [ 
  ["176.29.0.0","255.255.0.0"],// 65536 IP - Zain / JO-ZAIN broadband
  ["176.28.128.0","255.255.128.0"],// 32768 IP - Zain / JO-ZAIN
  ["94.249.0.0","255.255.128.0"],// 32768 IP - Orange / ADSL-LNS3
  ["46.185.128.0","255.255.128.0"],// 32768 IP - Orange / ORG-ADSL
  ["92.253.0.0","255.255.128.0"],// 32768 IP - Orange / ADSL-LNS4
  ["86.108.0.0","255.255.128.0"],// 32768 IP - Orange / ADSL
  ["149.200.128.0","255.255.128.0"],// 32768 IP - Orange / Jordan Telecom Group
  ["82.212.64.0","255.255.192.0"],// 16384 IP - Neu Telecom (Damamax)
  ["188.123.160.0","255.255.224.0"],// 8192 IP - Neu Telecom
  ["109.107.224.0","255.255.248.0"],// 2048 IP - Umniah WIMAX
  ["91.106.96.0","255.255.252.0"],// 1024 IP - Umniah Cloud
];
// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  lockUntil: 0,
  dnsCache: {},
  prewarmUntil: 0
};

// ================= HELPERS =================
function now(){ return Date.now(); }
function norm(h){ var i=h.indexOf(":"); return i>-1?h.substring(0,i):h; }

function isJordan(ip){
  for (var i=0;i<JORDAN_IPV4.length;i++)
    if (isInNet(ip, JORDAN_IPV4[i][0], JORDAN_IPV4[i][1])) return true;
  return false;
}

function resolvePinned(host){
  if (SESSION.matchNet && SESSION.dnsCache[host])
    return SESSION.dnsCache[host];
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

// ================= DETECTION =================
function isPUBG(h){ return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h); }
function isMatch(u,h){ return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(u+h); }
function isLobby(u,h){ return /lobby|matchmaking|queue|dispatch|gateway|region|join/i.test(u+h); }
function isSocial(u,h){ return /friend|invite|squad|team|party|clan|presence/i.test(u+h); }
function isCDN(u,h){ return /cdn|asset|resource|patch|update|media|content/i.test(u+h); }

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);
  if (!ip || ip.indexOf(":")>-1) return BLOCK;
  if (!isJordan(ip)) return BLOCK;

  if (isMatch(url, host)) {

    var net24 = ip.split('.').slice(0,3).join('.');

    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      SESSION.lockUntil = now() + 120000;
      SESSION.prewarmUntil = now() + 30000;
      return MATCH_JO;
    }

    if (host !== SESSION.matchHost) return BLOCK;
    if (now() < SESSION.lockUntil && net24 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  if (isLobby(url, host))  return LOBBY_JO;
  if (isSocial(url, host)) return LOBBY_JO;
  if (isCDN(url, host))    return LOBBY_JO;

  return LOBBY_JO;
}
