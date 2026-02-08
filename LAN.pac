var DIRECT = "DIRECT";
var BLOCK  = "PROXY 127.0.0.1:9";

// ================= INTERNAL IPV4 =================
var INTERNAL_IPV4 = [
  ["10.0.0.0",    "255.0.0.0"],
  ["172.16.0.0",  "255.240.0.0"],
  ["192.168.0.0", "255.255.0.0"],
  ["127.0.0.0",   "255.0.0.0"],
  ["169.254.0.0", "255.255.0.0"]
];

// ================= SESSION (PINNED MATCH) =================
var SESSION = {
  pinnedIP: null,
  pinnedHost: null
};

// ================= HELPERS =================
function norm(h){
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list){
  for (var i = 0; i < list.length; i++)
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  return false;
}

// ================= PUBG DETECTION =================
function isPUBG(h){
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function isLobby(u,h){
  return /lobby|matchmaking|queue|dispatch|gateway|region|join/i.test(u+h);
}

function isMatch(u,h){
  return /match|battle|game|combat|realtime|sync|udp|tick|room/i.test(u+h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  // فقط PUBG
  if (!isPUBG(host)) return BLOCK;

  var ip = dnsResolve(host);
  if (!ip) return BLOCK;

  // منع IPv6
  if (ip.indexOf(":") > -1) return BLOCK;

  // لازم يكون LAN
  if (!isInList(ip, INTERNAL_IPV4)) return BLOCK;

  // ================= MATCH PINNING =================
  if (isMatch(url, host)) {

    // أول Match LAN → تسجيل وتثبيت
    if (!SESSION.pinnedIP) {
      SESSION.pinnedIP   = ip;
      SESSION.pinnedHost = host;
      return DIRECT;
    }

    // أي تغيير = حظر
    if (ip !== SESSION.pinnedIP)   return BLOCK;
    if (host !== SESSION.pinnedHost) return BLOCK;

    return DIRECT;
  }

  // ================= LOBBY (LAN ONLY) =================
  if (isLobby(url, host)) {
    return DIRECT;
  }

  // أي شيء آخر من PUBG
  return BLOCK;
}
