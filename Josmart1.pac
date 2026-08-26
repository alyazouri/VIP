/* =========================================================
   T | JORDAN TITANIUM CORE v9.0 — NO VPN EDITION
   MAXIMUM CONTROL WITHOUT VPN
   FORCES ALL POSSIBLE TRAFFIC THROUGH JORDAN
   ========================================================= */


/* =========================================================
   🇯🇴 JORDAN PROXY POOL
   ========================================================= */

var PROXIES = [
  {
    addr: "PROXY 86.108.11.20:443",
    weight: 100,
    name: "JO-UMNIAH-1",
    region: "JO",
    isp: "umniah"
  },
  {
    addr: "PROXY 86.108.108.68:80",
    weight: 95,
    name: "JO-UMNIAH-2",
    region: "JO",
    isp: "umniah"
  },
  {
    addr: "PROXY 79.173.249.116:8080",
    weight: 90,
    name: "JO-ORANGE-1",
    region: "JO",
    isp: "orange"
  },
  {
    addr: "PROXY 92.253.2.100:8080",
    weight: 85,
    name: "JO-DAMAMAX-1",
    region: "JO",
    isp: "damamax"
  }
];


/* =========================================================
   ⚙️ CONFIGURATION
   ========================================================= */

var CONFIG = {
  allowDirect: false,
  jordanOnly: true,
  blockIPv6: true,
  blockWebRTC: true,
  blockAnalytics: true,
  stickyTTL: 300000,
  failoverCooldown: 30000
};


/* =========================================================
   📊 SESSION
   ========================================================= */

var SESSION = {
  lockedProxy: null,
  lockedHost: null,
  lockedAt: 0,
  failedProxies: {},
  blockedCount: 0,
  leakAttempts: 0
};


/* =========================================================
   ⚡ HASH
   ========================================================= */

function ultraHash(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}


/* =========================================================
   🧹 NORMALIZE
   ========================================================= */

function normalizeHost(host) {
  host = host || "";
  host = host.toLowerCase();
  host = host.replace(/^\s+|\s+$/g, "");
  host = host.replace(/^\.+|\.+$/g, "");
  return host;
}


/* =========================================================
   🌐 IPv4
   ========================================================= */

function isIPv4(host) {
  if (!host) return false;
  var parts = host.split(".");
  if (parts.length !== 4) return false;
  for (var i = 0; i < 4; i++) {
    if (!/^\d+$/.test(parts[i])) return false;
    var n = parseInt(parts[i], 10);
    if (n < 0 || n > 255) return false;
  }
  return true;
}


/* =========================================================
   🇯🇴 JORDAN IP DATABASE
   ========================================================= */

function jordanResidentialTier(host) {
  if (!isIPv4(host)) return 0;

  if (
    isInNet(host, "46.32.96.0",   "255.255.224.0")  ||
    isInNet(host, "37.202.64.0",  "255.255.192.0")  ||
    isInNet(host, "46.32.128.0",  "255.255.128.0")  ||
    isInNet(host, "185.69.184.0", "255.255.252.0")  ||
    isInNet(host, "79.173.192.0", "255.255.192.0")
  ) return 30;

  if (
    isInNet(host, "37.17.192.0",  "255.255.240.0")  ||
    isInNet(host, "46.185.128.0", "255.255.128.0")  ||
    isInNet(host, "185.44.148.0", "255.255.252.0")  ||
    isInNet(host, "37.17.208.0",  "255.255.240.0")
  ) return 29;

  if (
    isInNet(host, "86.108.0.0",   "255.255.128.0")  ||
    isInNet(host, "178.20.184.0", "255.255.248.0")
  ) return 28;

  if (
    isInNet(host, "92.253.0.0",   "255.255.128.0")  ||
    isInNet(host, "185.108.108.0","255.255.252.0")
  ) return 27;

  if (
    isInNet(host, "94.249.0.0",   "255.255.128.0")  ||
    isInNet(host, "149.200.128.0","255.255.128.0")  ||
    isInNet(host, "176.28.128.0", "255.255.128.0")  ||
    isInNet(host, "109.107.224.0","255.255.224.0")
  ) return 26;

  if (
    isInNet(host, "94.142.32.0",  "255.255.224.0")  ||
    isInNet(host, "194.165.128.0","255.255.224.0")  ||
    isInNet(host, "79.134.128.0", "255.255.224.0")
  ) return 25;

  if (
    isInNet(host, "213.186.160.0","255.255.224.0")  ||
    isInNet(host, "213.139.32.0", "255.255.224.0")  ||
    isInNet(host, "212.34.0.0",   "255.255.224.0")  ||
    isInNet(host, "84.18.32.0",   "255.255.224.0")  ||
    isInNet(host, "84.18.64.0",   "255.255.224.0")  ||
    isInNet(host, "81.28.112.0",  "255.255.240.0")
  ) return 24;

  if (
    isInNet(host, "109.237.192.0","255.255.240.0")  ||
    isInNet(host, "95.141.208.0", "255.255.240.0")  ||
    isInNet(host, "95.172.192.0", "255.255.224.0")  ||
    isInNet(host, "91.106.96.0",  "255.255.240.0")
  ) return 23;

  if (
    isInNet(host, "93.93.144.0",  "255.255.248.0")  ||
    isInNet(host, "93.95.200.0",  "255.255.248.0")  ||
    isInNet(host, "94.127.208.0", "255.255.248.0")  ||
    isInNet(host, "176.57.0.0",   "255.255.224.0")
  ) return 22;

  if (
    isInNet(host, "37.44.32.0",   "255.255.248.0")  ||
    isInNet(host, "37.75.144.0",  "255.255.248.0")  ||
    isInNet(host, "37.123.64.0",  "255.255.224.0")  ||
    isInNet(host, "46.23.112.0",  "255.255.240.0")  ||
    isInNet(host, "46.248.192.0", "255.255.224.0")
  ) return 21;

  if (
    isInNet(host, "87.236.232.0", "255.255.248.0")  ||
    isInNet(host, "87.238.128.0", "255.255.248.0")  ||
    isInNet(host, "89.28.216.0",  "255.255.248.0")  ||
    isInNet(host, "89.38.152.0",  "255.255.254.0")
  ) return 20;

  if (
    isInNet(host, "62.72.161.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.162.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.165.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.166.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.168.0",  "255.255.252.0")  ||
    isInNet(host, "62.72.174.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.176.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.179.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.180.0",  "255.255.255.0")  ||
    isInNet(host, "62.72.184.0",  "255.255.252.0")  ||
    isInNet(host, "62.72.191.0",  "255.255.255.0")
  ) return 19;

  return 0;
}


/* =========================================================
   🌍 MIDDLE EAST
   ========================================================= */

function middleEastTier(host) {
  if (!isIPv4(host)) return 0;

  if (isInNet(host, "94.56.0.0",   "255.252.0.0")   ||
      isInNet(host, "91.72.0.0",   "255.252.0.0")   ||
      isInNet(host, "185.42.204.0","255.255.252.0")) return 10;

  if (isInNet(host, "188.52.0.0",  "255.252.0.0")   ||
      isInNet(host, "94.96.0.0",   "255.240.0.0")   ||
      isInNet(host, "212.89.160.0","255.255.224.0")) return 9;

  if (isInNet(host, "168.187.0.0", "255.255.0.0")   ||
      isInNet(host, "185.34.16.0", "255.255.252.0")) return 8;

  if (isInNet(host, "37.236.0.0",  "255.252.0.0")   ||
      isInNet(host, "185.8.160.0", "255.255.252.0")) return 7;

  if (isInNet(host, "178.120.0.0", "255.252.0.0")   ||
      isInNet(host, "82.137.192.0","255.255.192.0")) return 6;

  if (isInNet(host, "41.32.0.0",   "255.240.0.0")   ||
      isInNet(host, "196.202.0.0", "255.255.0.0"))   return 5;

  return 0;
}


/* =========================================================
   🔒 LEAK BLOCKING
   ========================================================= */

function isIPv6Address(host) {
  return /:/.test(host) && host.indexOf(":") !== host.lastIndexOf(":");
}

function isWebRTCDomain(host) {
  host = normalizeHost(host);
  return (
    /stun/.test(host)                     ||
    /turn/.test(host)                     ||
    /ice\./.test(host)                    ||
    /webrtc/.test(host)                   ||
    /signaling/.test(host)
  );
}

function isGeolocationDomain(host) {
  host = normalizeHost(host);
  return (
    /geolocation/.test(host)              ||
    /geolocate/.test(host)                ||
    /geoip/.test(host)                    ||
    /ip-api\.com/.test(host)              ||
    /ipinfo\.io/.test(host)               ||
    /ipapi\.co/.test(host)                ||
    /ipwhois/.test(host)                  ||
    /ipstack/.test(host)                  ||
    /maxmind/.test(host)                  ||
    /whatismyip/.test(host)               ||
    /checkip/.test(host)                  ||
    /ifconfig\.me/.test(host)             ||
    /icanhazip/.test(host)                ||
    /ip\.me/.test(host)                   ||
    /ipify/.test(host)                    ||
    /iplogger/.test(host)                 ||
    /grabify/.test(host)
  );
}

function isDNSLeakDomain(host) {
  host = normalizeHost(host);
  return (
    /dns\.google/.test(host)              ||
    /cloudflare-dns/.test(host)           ||
    /opendns/.test(host)                  ||
    /quad9/.test(host)                    ||
    /adguard/.test(host)                  ||
    /nextdns/.test(host)
  );
}

function isAnalyticsDomain(host) {
  host = normalizeHost(host);
  return (
    /google-analytics/.test(host)         ||
    /googletagmanager/.test(host)         ||
    /doubleclick/.test(host)              ||
    /beacon\.qq/.test(host)               ||
    /pingtas\.qq/.test(host)              ||
    /btrace\.qq/.test(host)               ||
    /report\.qq/.test(host)               ||
    /sdklog/.test(host)                   ||
    /gameanalytics/.test(host)            ||
    /amplitude/.test(host)                ||
    /mixpanel/.test(host)                 ||
    /appsflyer/.test(host)                ||
    /adjust\.com/.test(host)              ||
    /firebase-analytics/.test(host)       ||
    /crashlytics/.test(host)              ||
    /sentry\.io/.test(host)               ||
    /admob/.test(host)                    ||
    /unityads/.test(host)                 ||
    /ironsrc/.test(host)                  ||
    /vungle/.test(host)                   ||
    /applovin/.test(host)                 ||
    /chartboost/.test(host)               ||
    /pangle/.test(host)                   ||
    /mintegral/.test(host)
  );
}


/* =========================================================
   🎮 PUBG DETECTION
   ========================================================= */

function isPUBGDirect(s) {
  return (
    /pubg/.test(s)                ||
    /pubgm/.test(s)               ||
    /pubgmobile/.test(s)          ||
    /pubgsea/.test(s)             ||
    /pubgkr/.test(s)              ||
    /pubgcs/.test(s)              ||
    /pubgme/.test(s)              ||
    /pubgmena/.test(s)            ||
    /pubglite/.test(s)            ||
    /newstate/.test(s)
  );
}

function isPUBGPublisher(s) {
  return (
    /krafton/.test(s)             ||
    /tencent/.test(s)             ||
    /lightspeed/.test(s)          ||
    /proximabeta/.test(s)         ||
    /igame/.test(s)               ||
    /garena/.test(s)              ||
    /levelinfinite/.test(s)       ||
    /vng/.test(s)                 ||
    /timi/.test(s)                ||
    /quantum/.test(s)
  );
}

function isPUBGInfra(s) {
  return (
    /qcloud/.test(s)              ||
    /myqcloud/.test(s)            ||
    /tencentcs/.test(s)           ||
    /tencent-cloud/.test(s)       ||
    /tencentcos/.test(s)          ||
    /tencentcdn/.test(s)          ||
    /gtimg/.test(s)               ||
    /qpic\.cn/.test(s)            ||
    /idqqimg/.test(s)             ||
    /qq\.com/.test(s)             ||
    /amazonaws/.test(s)           ||
    /aws\.com/.test(s)            ||
    /cloudfront/.test(s)          ||
    /awsglobalaccelerator/.test(s)||
    /aliyun/.test(s)              ||
    /alibaba/.test(s)             ||
    /alicdn/.test(s)              ||
    /alibabausercontent/.test(s)  ||
    /googleapis\.com/.test(s)     ||
    /gstatic\.com/.test(s)        ||
    /googleusercontent/.test(s)   ||
    /firebase/.test(s)            ||
    /firebaseio/.test(s)          ||
    /azure/.test(s)               ||
    /msecnd/.test(s)              ||
    /windows\.net/.test(s)        ||
    /azureedge/.test(s)           ||
    /fastly/.test(s)              ||
    /cloudflare/.test(s)          ||
    /akamai/.test(s)              ||
    /akamaiedge/.test(s)          ||
    /akamaized/.test(s)
  );
}

function isPUBGService(s) {
  return (
    /matchmaking/.test(s)         ||
    /matchmaker/.test(s)          ||
    /match[-_]?server/.test(s)    ||
    /gameserver/.test(s)          ||
    /game[-_]?server/.test(s)     ||
    /gamesession/.test(s)         ||
    /game[-_]?session/.test(s)    ||
    /sessionserver/.test(s)       ||
    /session[-_]?server/.test(s)  ||
    /dispatcher/.test(s)          ||
    /allocation/.test(s)          ||
    /lobby/.test(s)               ||
    /roomserver/.test(s)          ||
    /chatserver/.test(s)          ||
    /friendserver/.test(s)        ||
    /rankserver/.test(s)          ||
    /inventory/.test(s)           ||
    /shopserver/.test(s)          ||
    /clanserver/.test(s)          ||
    /telemetry/.test(s)           ||
    /anti[-_]?cheat/.test(s)      ||
    /anticheat/.test(s)           ||
    /auth/.test(s)                ||
    /login/.test(s)               ||
    /oauth/.test(s)               ||
    /passport/.test(s)            ||
    /account/.test(s)             ||
    /profile/.test(s)             ||
    /social/.test(s)              ||
    /friend/.test(s)              ||
    /chat/.test(s)                ||
    /voice/.test(s)               ||
    /push/.test(s)                ||
    /notify/.test(s)              ||
    /download/.test(s)            ||
    /update/.test(s)              ||
    /patch/.test(s)               ||
    /hotfix/.test(s)              ||
    /cdn/.test(s)                 ||
    /asset/.test(s)               ||
    /resource/.test(s)            ||
    /config/.test(s)              ||
    /version/.test(s)             ||
    /check/.test(s)               ||
    /verify/.test(s)              ||
    /report/.test(s)              ||
    /event/.test(s)               ||
    /season/.test(s)              ||
    /pass/.test(s)                ||
    /royale/.test(s)              ||
    /crate/.test(s)               ||
    /skin/.test(s)                ||
    /outfit/.test(s)              ||
    /weapon/.test(s)              ||
    /vehicle/.test(s)
  );
}

function isPUBGMode(s) {
  return (
    /erangel/.test(s)             ||
    /livik/.test(s)               ||
    /sanhok/.test(s)              ||
    /miramar/.test(s)             ||
    /vikendi/.test(s)             ||
    /karakin/.test(s)             ||
    /nusa/.test(s)                ||
    /taego/.test(s)               ||
    /deston/.test(s)              ||
    /paramo/.test(s)              ||
    /haven/.test(s)               ||
    /rondo/.test(s)               ||
    /tdm/.test(s)                 ||
    /teamdeathmatch/.test(s)      ||
    /payload/.test(s)             ||
    /metroroyale/.test(s)         ||
    /arena/.test(s)               ||
    /ranked/.test(s)              ||
    /classic/.test(s)             ||
    /arcade/.test(s)
  );
}

function isPUBGAPI(u) {
  return (
    /(\/api\/|\/v1\/|\/v2\/|\/v3\/|\/v4\/)/.test(u) &&
    /(game|match|session|battle|player|server|region|lobby|rank|clan|inventory|auth|login|profile)/.test(u)
  );
}

function isPUBGServerDiscovery(s, u) {
  return (
    /(serverlist|server[-_]?list|realm|routing|server[-_]?select|region[-_]?select)/.test(u) &&
    /(game|match|player|pubg|pubgm|tencent|krafton|levelinfinite)/.test(s)
  );
}

function isMiddleEastServer(s, u) {
  return (
    /(me[-_]?east|mena|middle[-_]?east|dubai|uae|riyadh|jeddah|amman)/.test(s) ||
    /(me[-_]?east|mena|middle[-_]?east|dubai|uae|riyadh|jeddah|amman)/.test(u) ||
    /(region=me|region=mena|server=me|server=mena)/.test(u)
  );
}


/* =========================================================
   🇯🇴 JORDANIAN DOMAIN
   ========================================================= */

function isJordanianDomain(host) {
  host = normalizeHost(host);
  if (/\.jo$/.test(host)) return true;
  if (/jordan/.test(host)) return true;
  if (/amman/.test(host)) return true;
  if (/irbid/.test(host)) return true;
  if (/zarqa/.test(host)) return true;
  if (/aqaba/.test(host)) return true;
  if (/petra/.test(host)) return true;
  if (/deadsea/.test(host)) return true;
  if (/jerash/.test(host)) return true;
  if (/orange\.jo/.test(host)) return true;
  if (/zain\.jo/.test(host)) return true;
  if (/umniah/.test(host)) return true;
  if (/damamax/.test(host)) return true;
  return false;
}


/* =========================================================
   🧠 PUBG SCORE
   ========================================================= */

function getPUBGScore(host, url) {
  var h = normalizeHost(host);
  var u = (url || "").toLowerCase();
  u = u.replace(/[\r\n\t]/g, "");
  var s = h + " " + u;
  var score = 0;

  if (isPUBGDirect(s)) score += 100;
  if (isPUBGPublisher(s)) score += 85;
  if (isPUBGInfra(h)) score += 25;
  if (isPUBGService(s)) score += 70;
  if (isPUBGMode(s)) score += 45;
  if (isPUBGAPI(u)) score += 35;
  if (isPUBGServerDiscovery(s, u)) score += 40;
  if (isMiddleEastServer(s, u)) score += 50;
  if (/match/.test(s) && /(game|session|battle|server)/.test(s)) score += 15;
  if (/battle/.test(s) && /(game|match|session|server)/.test(s)) score += 15;
  if (/lobby/.test(s) && /(game|match|session|server)/.test(s)) score += 15;

  return score;
}

function isPUBG(host, url) {
  return getPUBGScore(host, url) >= 60;
}


/* =========================================================
   🎮 KNOWN PUBG DOMAINS
   ========================================================= */

var KNOWN_PUBG_DOMAINS = {
  "pubgmobile.com":          true,
  "pubg.com":                true,
  "pubgmobile.kr":           true,
  "pubgmobile.live":         true,
  "tencent.com":             true,
  "tencentgames.com":        true,
  "igamecj.com":             true,
  "qcloud.com":              true,
  "myqcloud.com":            true,
  "tencent-cloud.net":       true,
  "gtimg.cn":                true,
  "qpic.cn":                 true,
  "krafton.com":             true,
  "levelinfinite.com":       true,
  "lightspeedpc.com":        true,
  "proximabeta.com":         true,
  "garena.com":              true,
  "qq.com":                  true,
  "weixin.com":              true,
  "tencentcloud.com":        true,
  "dnspod.cn":               true,
  "qcloudcdn.com":           true,
  "tencentcos.cn":           true
};

function isKnownPUBGDomain(host) {
  host = normalizeHost(host);
  if (KNOWN_PUBG_DOMAINS[host]) return true;
  var parts = host.split(".");
  for (var i = 0; i < parts.length - 1; i++) {
    var domain = parts.slice(i).join(".");
    if (KNOWN_PUBG_DOMAINS[domain]) return true;
  }
  return false;
}


/* =========================================================
   🎯 TRAFFIC CLASSIFIER
   ========================================================= */

function classifyTraffic(host, url) {
  host = normalizeHost(host);
  url = (url || "").toLowerCase();

  var c = {
    category: "unknown",
    blocked: false,
    reason: ""
  };

  if (CONFIG.blockIPv6 && isIPv6Address(host)) {
    c.category = "blocked-ipv6";
    c.blocked = true;
    c.reason = "IPv6 blocked";
    SESSION.blockedCount++;
    return c;
  }

  if (CONFIG.blockWebRTC && isWebRTCDomain(host)) {
    c.category = "blocked-webrtc";
    c.blocked = true;
    c.reason = "WebRTC blocked";
    SESSION.blockedCount++;
    SESSION.leakAttempts++;
    return c;
  }

  if (isGeolocationDomain(host)) {
    c.category = "blocked-geo";
    c.blocked = true;
    c.reason = "Geolocation blocked";
    SESSION.blockedCount++;
    SESSION.leakAttempts++;
    return c;
  }

  if (CONFIG.forceDNS && isDNSLeakDomain(host)) {
    c.category = "blocked-dns";
    c.blocked = true;
    c.reason = "DNS leak blocked";
    SESSION.blockedCount++;
    SESSION.leakAttempts++;
    return c;
  }

  if (CONFIG.blockAnalytics && isAnalyticsDomain(host)) {
    c.category = "blocked-analytics";
    c.blocked = true;
    c.reason = "Analytics blocked";
    SESSION.blockedCount++;
    return c;
  }

  if (isKnownPUBGDomain(host)) {
    c.category = "pubg-known";
    c.reason = "Known PUBG domain";
    return c;
  }

  if (isPUBG(host, url)) {
    c.category = "pubg-detected";
    c.reason = "PUBG detected";
    return c;
  }

  if (isPUBGInfra(host)) {
    c.category = "cdn-cloud";
    c.reason = "CDN/Cloud";
    return c;
  }

  if (isJordanianDomain(host)) {
    c.category = "jordanian";
    c.reason = "Jordanian domain";
    return c;
  }

  c.category = "unknown";
  c.reason = "Unknown - forced Jordan proxy";
  return c;
}


/* =========================================================
   🔄 FAILOVER
   ========================================================= */

function markFailed(proxyAddr) {
  SESSION.failedProxies[proxyAddr] = new Date().getTime();
}

function isFailed(proxyAddr) {
  var failTime = SESSION.failedProxies[proxyAddr];
  if (!failTime) return false;
  var now = new Date().getTime();
  if ((now - failTime) > CONFIG.failoverCooldown) {
    delete SESSION.failedProxies[proxyAddr];
    return false;
  }
  return true;
}

function getAvailableProxies() {
  var available = [];
  for (var i = 0; i < PROXIES.length; i++) {
    if (!isFailed(PROXIES[i].addr)) {
      available.push(PROXIES[i]);
    }
  }
  return available;
}


/* =========================================================
   🎯 PROXY SELECTION
   ========================================================= */

function selectProxy() {
  var available = getAvailableProxies();

  if (available.length === 0) {
    SESSION.failedProxies = {};
    available = PROXIES;
  }

  var jordanOnly = [];
  for (var i = 0; i < available.length; i++) {
    if (available[i].region === "JO") {
      jordanOnly.push(available[i]);
    }
  }

  if (jordanOnly.length === 0) {
    SESSION.failedProxies = {};
    jordanOnly = PROXIES;
  }

  var best = jordanOnly[0];
  for (var j = 1; j < jordanOnly.length; j++) {
    if (jordanOnly[j].weight > best.weight) {
      best = jordanOnly[j];
    }
  }

  return best.addr;
}


/* =========================================================
   🔗 HOST GROUP
   ========================================================= */

function getHostGroup(host) {
  host = normalizeHost(host);
  if (/pubg/.test(host)) return "pubg";
  if (/tencent/.test(host)) return "tencent";
  if (/krafton/.test(host)) return "krafton";
  if (/lightspeed/.test(host)) return "lightspeed";
  if (/proximabeta/.test(host)) return "proximabeta";
  if (/qcloud/.test(host)) return "qcloud";
  if (/amazonaws/.test(host)) return "aws";
  if (/aliyun/.test(host)) return "aliyun";
  if (/facebook/.test(host)) return "facebook";
  if (/google/.test(host)) return "google";
  if (isJordanianDomain(host)) return "jordan";
  return host;
}

function isSameHostGroup(host1, host2) {
  return getHostGroup(host1) === getHostGroup(host2);
}


/* =========================================================
   🔒 STICKY SESSION
   ========================================================= */

function getStickyProxy(host) {
  var now = new Date().getTime();
  if (SESSION.lockedProxy !== null) {
    if ((now - SESSION.lockedAt) < CONFIG.stickyTTL) {
      if (isSameHostGroup(host, SESSION.lockedHost)) {
        return SESSION.lockedProxy;
      }
    }
    SESSION.lockedProxy = null;
  }
  return null;
}

function lockProxy(proxy, host) {
  SESSION.lockedProxy = proxy;
  SESSION.lockedHost = host;
  SESSION.lockedAt = new Date().getTime();
}


/* =========================================================
   🚀 MAIN PAC ENGINE v9.0
   ========================================================= */

function FindProxyForURL(url, host) {

  host = host || "";
  url = url || "";

  host = normalizeHost(host);


  /* مرحلة 1: تصنيف */

  var classification = classifyTraffic(host, url);


  /* مرحلة 2: محجوب → DIRECT */

  if (classification.blocked) {
    return "DIRECT";
  }


  /* مرحلة 3: Sticky */

  var sticky = getStickyProxy(host);
  if (sticky !== null) {
    return sticky;
  }


  /* مرحلة 4: بروكسي أردني */

  var proxy = selectProxy();
  lockProxy(proxy, host);
  return proxy;
}


/* =========================================================
   📊 DEBUG
   ========================================================= */

function debugPAC(host, url) {
  host = normalizeHost(host || "");
  url = url || "";

  var classification = classifyTraffic(host, url);
  var score = getPUBGScore(host, url);

  return {
    host: host,
    url: url,
    classification: classification,
    score: score,
    isPUBG: score >= 60,
    isKnownDomain: isKnownPUBGDomain(host),
    isCDN: isPUBGInfra(host),
    isWebRTC: isWebRTCDomain(host),
    isGeolocation: isGeolocationDomain(host),
    isDNSLeak: isDNSLeakDomain(host),
    isAnalytics: isAnalyticsDomain(host),
    isJordanian: isJordanianDomain(host),
    isIPv6: isIPv6Address(host),
    proxy: FindProxyForURL(url, host),
    stats: {
      blocked: SESSION.blockedCount,
      leakAttempts: SESSION.leakAttempts
    }
  };
}
