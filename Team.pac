// ============================================================================
// PUBG MOBILE ULTIMATE PAC - FINAL VERSION 2025
// ============================================================================

// ======================= PROXIES =======================
var PROXIES = {
  JO_MAIN_1: "212.35.66.45",
  JO_MAIN_2: "91.106.109.12",
  JO_MAIN_3: "46.32.102.1",

  JO_SEC_1: "82.212.84.33",
  JO_SEC_2: "77.245.9.11",
  JO_SEC_3: "188.161.23.54",
  JO_SEC_4: "176.29.88.92",

  JO_BACKUP_1: "46.185.131.220",
  JO_BACKUP_2: "79.173.192.100"
};

// ======================= PORTS =======================
var PORTS = {
  ULTRA_MATCH: "10012",
  ULTRA_VOICE: "20001",
  ULTRA_GAME:  "10039",
  FAST_LOBBY:  "443",
  TURBO:       "8080",
  SPEED_1:     "3128",
  SPEED_2:     "8888"
};

// ======================= JORDAN IP RANGES =======================
var ALL_JO_RANGES = [
  "176.29.0.0/16","188.161.0.0/16","46.185.128.0/17",
  "212.35.0.0/16","82.212.64.0/18","79.173.192.0/18",
  "212.118.0.0/19","37.202.64.0/18",
  "188.161.23.0/24","91.106.109.0/24","46.185.131.0/24",
  "82.212.108.0/24","176.29.88.0/24"
];

// ======================= PUBG DOMAINS =======================
var PUBG_DOMAINS = {
  CRITICAL: [
    "pubgmobile.com","pubgm.com","igamecj.com",
    "proximabeta.com","gcloudsdk.com","intlgame.com",
    "tencent.com","qq.com","qcloud.com",
    "tencentgcloud.com","krafton.com"
  ],
  MATCH: ["match","matchmaking","lobby","queue","room","join"],
  VOICE: ["voice","rtc","gvoice","voip","webrtc","mic"],
  GAME:  ["game","server","battle","pvp","sync","fire"],
  LOW:   ["cdn","static","img","update","patch","analytics"]
};

// ======================= AI LEARNING =======================
var AI_LEARNING = {
  perf: {},

  init: function () {
    for (var k in PROXIES) {
      this.perf[PROXIES[k]] = { score: 100, latency: 50, success: 1 };
    }
  },

  best: function (count) {
    var arr = [];
    for (var p in this.perf) {
      arr.push({ ip: p, score: this.perf[p].score });
    }
    arr.sort(function (a, b) { return b.score - a.score; });

    var res = [];
    for (var i = 0; i < Math.min(count, arr.length); i++) {
      res.push(arr[i].ip);
    }
    return res;
  },

  ultraFast: function () {
    return this.best(1)[0] || PROXIES.JO_MAIN_1;
  }
};

// ======================= SESSION LOCK =======================
var SESSION_LOCK = {
  sessions: {},

  id: function (host) {
    return host.replace(/[^a-z0-9]/gi, "_");
  },

  get: function (host) {
    return this.sessions[this.id(host)];
  },

  create: function (host, proxies) {
    this.sessions[this.id(host)] = {
      proxies: proxies,
      time: new Date().getTime()
    };
  }
};

// ======================= HELPERS =======================
function ipToNum(ip) {
  var p = ip.split(".");
  return ((p[0]<<24)|(p[1]<<16)|(p[2]<<8)|p[3])>>>0;
}

function inCidr(ip, cidr) {
  var a = cidr.split("/");
  var mask = 0xffffffff << (32 - parseInt(a[1]));
  return (ipToNum(ip) & mask) === (ipToNum(a[0]) & mask);
}

function isJordan(ip) {
  if (!ip) return false;
  for (var i = 0; i < ALL_JO_RANGES.length; i++) {
    if (inCidr(ip, ALL_JO_RANGES[i])) return true;
  }
  return false;
}

function matchDomain(host, d) {
  return host === d || host.endsWith("." + d);
}

function inList(host, list) {
  for (var i = 0; i < list.length; i++) {
    if (matchDomain(host, list[i])) return true;
  }
  return false;
}

function hasKeyword(text, list) {
  for (var i = 0; i < list.length; i++) {
    if (text.indexOf(list[i]) !== -1) return true;
  }
  return false;
}

function proxyChain(list, port) {
  var out = [];
  for (var i = 0; i < list.length; i++) {
    out.push("PROXY " + list[i] + ":" + port);
  }
  return out.join("; ");
}

// ======================= TRAFFIC CLASSIFIER =======================
function classify(host, url) {
  var t = (host + " " + url).toLowerCase();

  if (hasKeyword(t, PUBG_DOMAINS.MATCH))
    return { port: PORTS.ULTRA_MATCH, count: 3 };

  if (hasKeyword(t, PUBG_DOMAINS.VOICE))
    return { port: PORTS.ULTRA_VOICE, count: 3 };

  if (hasKeyword(t, PUBG_DOMAINS.GAME))
    return { port: PORTS.ULTRA_GAME, count: 3 };

  if (inList(host, PUBG_DOMAINS.CRITICAL))
    return { port: PORTS.FAST_LOBBY, count: 2 };

  return { port: PORTS.TURBO, count: 1 };
}

// ======================= MAIN FUNCTION =======================
function FindProxyForURL(url, host) {
  host = host.toLowerCase();

  var ip = dnsResolve(host);
  var cls = classify(host, url);

  var s = SESSION_LOCK.get(host);
  if (s) {
    return proxyChain(s.proxies, cls.port);
  }

  var proxies;
  if (isJordan(ip)) {
    proxies = AI_LEARNING.best(cls.count);
  } else {
    proxies = [AI_LEARNING.ultraFast()];
  }

  SESSION_LOCK.create(host, proxies);
  return proxyChain(proxies, cls.port);
}

// ======================= INIT =======================
AI_LEARNING.init();
