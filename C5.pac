/* =========================================================
   🏆 MADABA – ULTIMATE OPERATOR CORE + JORDAN HOPS
   Tier-1 ISP Architecture
   Zero DIRECT | Geo Aware | Deterministic | Hardened
   ========================================================= */

/* Local (Jordan) Proxy Pool */
var LOCAL_PROXY_POOL = [
  "PROXY 176.29.153.95:21001",
  "PROXY 176.29.153.95:21002"
];

/* Global Proxy Pool */
var GLOBAL_PROXY_POOL = [
  "PROXY 176.29.153.95:20001",
  "PROXY 176.29.153.95:20002",
  "PROXY 176.29.153.95:20003",
  "PROXY 176.29.153.95:20004"
];

/* =========================================================
   🇯🇴 JORDAN IPv4 CORE RANGES
   (Major ASN allocations – summarized)
   ========================================================= */

var JORDAN_NETS = [

  ["37.75.144.0","255.255.248.0"],
  ["37.123.64.0","255.255.224.0"],
  ["37.202.64.0","255.255.192.0"],
  ["46.32.96.0","255.255.224.0"],
  ["46.185.128.0","255.255.128.0"],
  ["79.134.128.0","255.255.224.0"],
  ["82.212.64.0","255.255.192.0"],
  ["86.108.0.0","255.255.128.0"],
  ["92.241.32.0","255.255.224.0"],
  ["94.249.0.0","255.255.128.0"],
  ["109.107.224.0","255.255.224.0"],
  ["149.200.128.0","255.255.128.0"],
  ["176.28.128.0","255.255.128.0"],
  ["176.29.0.0","255.255.0.0"],
  ["188.247.64.0","255.255.224.0"],
  ["212.118.0.0","255.255.224.0"],
  ["213.139.32.0","255.255.224.0"]

];

/* =========================================================
   🔒 SECURITY LAYER
   ========================================================= */

function isIPv4(h) {
  return /^\d+\.\d+\.\d+\.\d+$/.test(h);
}

function isIPv6(h) {
  return h.indexOf(":") !== -1;
}

function isInternal(ip) {
  return (
    isInNet(ip, "127.0.0.0", "255.0.0.0") ||
    isInNet(ip, "10.0.0.0", "255.0.0.0") ||
    isInNet(ip, "172.16.0.0", "255.240.0.0") ||
    isInNet(ip, "192.168.0.0", "255.255.0.0") ||
    isInNet(ip, "169.254.0.0", "255.255.0.0")
  );
}

/* =========================================================
   🇯🇴 JORDAN DETECTION
   ========================================================= */

function isJordanIP(ip) {

  for (var i = 0; i < JORDAN_NETS.length; i++) {
    if (isInNet(ip, JORDAN_NETS[i][0], JORDAN_NETS[i][1])) {
      return true;
    }
  }

  return false;
}

/* =========================================================
   🧠 HASH ENGINE
   ========================================================= */

function hashHost(host) {
  var h = 0;
  for (var i = 0; i < host.length; i++) {
    h = ((h << 5) - h) + host.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function buildChain(pool, index) {

  var chain = [];
  chain.push(pool[index]);

  for (var i = 0; i < pool.length; i++) {
    if (i !== index) {
      chain.push(pool[i]);
    }
  }

  return chain.join("; ");
}

/* =========================================================
   🚀 MAIN ROUTING ENGINE
   ========================================================= */

function FindProxyForURL(url, host) {

  if (!host || isIPv6(host)) {
    return GLOBAL_PROXY_POOL.join("; ");
  }

  var ip;

  if (isIPv4(host)) {
    ip = host;
  } else {
    ip = dnsResolve(host);
  }

  if (!ip || isInternal(ip)) {
    return GLOBAL_PROXY_POOL.join("; ");
  }

  /* 🇯🇴 Local Jordan Traffic */
  if (isJordanIP(ip)) {
    var localIndex = hashHost(host) % LOCAL_PROXY_POOL.length;
    return buildChain(LOCAL_PROXY_POOL, localIndex);
  }

  /* 🌍 Global Traffic */
  var globalIndex = hashHost(host) % GLOBAL_PROXY_POOL.length;
  return buildChain(GLOBAL_PROXY_POOL, globalIndex);
}
