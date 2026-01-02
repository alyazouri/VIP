var PROXIES = {
JO_1: “212.35.66.45”,
JO_2: “91.106.109.12”,
JO_3: “46.32.102.1”,
JO_4: “82.212.108.217”,
JO_5: “77.245.8.95”
};

// بورتات ذكية لأنواع مختلفة من الترافيك
var PORTS = {
MATCH: “5222”,      // للماتشات والتجنيد
VOICE: “20001”,     // للصوت
GAME: “10039”,      // للعب
LOBBY: “443”,       // للوبي
GENERAL: “8080”     // عام
};

// ============================================================================
// نطاقات IP الأردنية الشاملة والمحسّنة
// ============================================================================
var JO_NETWORKS = {
// شبكات رئيسية ضخمة
MAJOR: [
“176.29.0.0/16”, “46.185.128.0/17”, “86.108.0.0/17”, “92.253.0.0/17”,
“94.249.0.0/17”, “149.200.128.0/17”, “176.28.128.0/17”
],

// Orange Jordan (AS15975)
ORANGE: [
“212.35.0.0/16”, “212.34.0.0/19”, “82.212.64.0/18”, “212.118.0.0/19”,
“79.173.192.0/18”, “37.202.64.0/18”
],

// Zain Jordan (AS8376)
ZAIN: [
“188.161.0.0/16”, “212.118.0.0/19”, “213.186.160.0/19”,
“37.17.192.0/20”, “46.23.112.0/20”, “81.28.112.0/20”
],

// Umniah (AS47887)
UMNIAH: [
“46.185.128.0/17”, “176.29.0.0/16”, “91.106.96.0/20”,
“178.77.128.0/18”, “5.45.128.0/20”
],

// نطاقات حديثة (2024-2025)
MODERN: [
“37.220.112.0/20”, “95.141.208.0/21”, “176.241.64.0/21”,
“141.0.0.0/21”, “185.107.0.0/22”, “37.123.64.0/19”,
“46.248.192.0/19”, “62.72.160.0/19”, “79.134.128.0/19”,
“84.18.32.0/19”, “84.18.64.0/19”, “91.186.224.0/19”,
“92.241.32.0/19”, “95.172.192.0/19”, “176.57.0.0/19”
],

// نطاقات خاصة بالألعاب (مكتشفة)
GAMING: [
“212.35.66.0/24”, “91.106.109.0/24”, “46.185.131.0/24”,
“82.212.108.0/24”, “77.245.8.0/24”, “46.32.102.0/24”
]
};

// دمج جميع النطاقات في قائمة واحدة
var ALL_JO_RANGES = [].concat(
JO_NETWORKS.MAJOR,
JO_NETWORKS.ORANGE,
JO_NETWORKS.ZAIN,
JO_NETWORKS.UMNIAH,
JO_NETWORKS.MODERN,
JO_NETWORKS.GAMING
);

// ============================================================================
// نطاقات PUBG الحرجة
// ============================================================================
var PUBG_DOMAINS = {
CRITICAL: [
“pubgmobile.com”, “igamecj.com”, “proximabeta.com”, “gcloudsdk.com”,
“intlgame.com”, “tencent.com”, “qq.com”, “qcloud.com”, “tencentgcloud.com”
],

MATCH_KEYWORDS: [
“match”, “matchmaking”, “mm”, “lobby”, “queue”, “room”, “waiting”,
“findmatch”, “join”, “recruit”, “recruiting”, “teamup”
],

VOICE_KEYWORDS: [
“voice”, “rtc”, “gvoice”, “audio”, “voip”, “webrtc”, “call”,
“mic”, “speaker”, “talk”, “chat”
],

GAME_KEYWORDS: [
“game”, “server”, “battle”, “gs”, “play”, “pvp”, “combat”,
“loading”, “spawn”, “sync”, “state”, “action”, “fire”, “move”
],

LOW_PRIORITY: [
“cdn”, “static”, “img”, “image”, “asset”, “resource”, “download”,
“update”, “patch”, “analytics”, “telemetry”, “tracking”, “metrics”
],

ALWAYS_DIRECT: [
“captive.apple.com”, “ocsp.apple.com”, “time.apple.com”,
“connectivitycheck.gstatic.com”, “clients3.google.com”,
“google.com”, “youtube.com”, “facebook.com”, “whatsapp.com”
]
};

// ============================================================================
// 1️⃣ DNS CACHE SYSTEM (فكرة 2)
// ============================================================================
var DNS_CACHE = {
cache: {},
order: [],
maxSize: 500,
hits: 0,
misses: 0,

get: function(host) {
if (this.cache[host]) {
this.hits++;
return this.cache[host];
}
this.misses++;
return null;
},

set: function(host, ip) {
if (this.order.length >= this.maxSize) {
var oldest = this.order.shift();
delete this.cache[oldest];
}
this.cache[host] = ip;
this.order.push(host);
},

resolve: function(host) {
var cached = this.get(host);
if (cached) return cached;

```
var ip = dnsResolve(host);
if (ip && ip !== "0.0.0.0") {
  this.set(host, ip);
}
return ip;
```

}
};

// ============================================================================
// 2️⃣ KNOWN IPS FOR PUBG SERVERS (فكرة 3)
// ============================================================================
var PUBG_KNOWN_IPS = {
// IPs أردنية معروفة لسيرفرات PUBG (سيتم تحديثها تلقائياً)
“match.pubgmobile.com”: “212.35.66.45”,
“voice.igamecj.com”: “91.106.109.12”,
“game.pubgmobile.com”: “46.185.131.220”
};

// ============================================================================
// 3️⃣ ROUTE LEARNING ENGINE (فكرة 1 - DRO)
// ============================================================================
var ROUTE_LEARNING = {
routes: {},
maxRoutes: 300,

record: function(host, proxy, success, latency) {
if (!this.routes[host]) {
this.routes[host] = { proxies: {}, best: null };
}

```
var route = this.routes[host];
if (!route.proxies[proxy]) {
  route.proxies[proxy] = {
    success: 0, fail: 0, totalLatency: 0, avgLatency: 0, score: 50
  };
}

var p = route.proxies[proxy];

if (success) {
  p.success++;
  p.totalLatency += latency;
  p.avgLatency = p.totalLatency / p.success;
  
  var successRate = p.success / (p.success + p.fail);
  var latencyScore = Math.max(0, 100 - (p.avgLatency / 10));
  p.score = (successRate * 70) + (latencyScore * 0.3);
} else {
  p.fail++;
  p.score = Math.max(0, p.score - 15);
}

this.updateBest(host);
```

},

updateBest: function(host) {
var route = this.routes[host];
var best = null;
var bestScore = -1;

```
for (var proxy in route.proxies) {
  var score = route.proxies[proxy].score;
  if (score > bestScore) {
    bestScore = score;
    best = proxy;
  }
}

route.best = best;
```

},

getBest: function(host) {
return (this.routes[host] && this.routes[host].best) || null;
}
};

// ============================================================================
// 4️⃣ SESSION PERSISTENCE (فكرة 4)
// ============================================================================
var SESSION = {
proxy: null,
start: 0,
duration: 900000, // 15 دقيقة
matchId: null,
matchProxy: null,

getProxy: function(isMatch) {
var now = new Date().getTime();

```
// إذا ماتش، استخدم مسار ثابت للماتش
if (isMatch && this.matchProxy) {
  return this.matchProxy;
}

// جلسة عادية
if (this.proxy && (now - this.start < this.duration)) {
  return this.proxy;
}

return null;
```

},

setProxy: function(proxy, isMatch) {
var now = new Date().getTime();

```
if (isMatch) {
  this.matchProxy = proxy;
} else {
  this.proxy = proxy;
  this.start = now;
}
```

},

setMatch: function(matchId, proxy) {
this.matchId = matchId;
this.matchProxy = proxy;
},

clearMatch: function() {
this.matchId = null;
this.matchProxy = null;
}
};

// ============================================================================
// 5️⃣ PREDICTIVE ENGINE (فكرة 2)
// ============================================================================
var PREDICTOR = {
patterns: {},
history: [],
depth: 5,

record: function(host) {
if (this.history.length > 0) {
var prev = this.history[this.history.length - 1];

```
  if (!this.patterns[prev]) {
    this.patterns[prev] = {};
  }
  
  if (!this.patterns[prev][host]) {
    this.patterns[prev][host] = 0;
  }
  
  this.patterns[prev][host]++;
}

this.history.push(host);
if (this.history.length > this.depth) {
  this.history.shift();
}
```

},

predict: function() {
if (this.history.length === 0) return null;

```
var last = this.history[this.history.length - 1];
var next = this.patterns[last];

if (!next) return null;

var best = null;
var maxCount = 0;

for (var host in next) {
  if (next[host] > maxCount) {
    maxCount = next[host];
    best = host;
  }
}

return best;
```

}
};

// ============================================================================
// 6️⃣ MULTI-PATH SYSTEM (فكرة 3 - MPTCP)
// ============================================================================
var MULTIPATH = {
paths: {
PRIMARY: {
proxies: [PROXIES.JO_1, PROXIES.JO_2],
weight: 60,
priority: 1,
failures: 0
},
SECONDARY: {
proxies: [PROXIES.JO_3, PROXIES.JO_4],
weight: 30,
priority: 2,
failures: 0
},
TERTIARY: {
proxies: [PROXIES.JO_5],
weight: 10,
priority: 3,
failures: 0
}
},

current: “PRIMARY”,
failThreshold: 5,

select: function(urgent) {
if (urgent) {
return this.paths.PRIMARY;
}

```
var rand = Math.random() * 100;
var sum = 0;

for (var name in this.paths) {
  var path = this.paths[name];
  sum += path.weight;
  if (rand < sum) {
    return path;
  }
}

return this.paths.PRIMARY;
```

},

recordFailure: function(pathName) {
var path = this.paths[pathName];
if (path) {
path.failures++;
if (path.failures >= this.failThreshold) {
this.switchPath();
path.failures = 0;
}
}
},

switchPath: function() {
if (this.current === “PRIMARY”) {
this.current = “SECONDARY”;
} else if (this.current === “SECONDARY”) {
this.current = “TERTIARY”;
} else {
this.current = “PRIMARY”;
}
}
};

// ============================================================================
// 7️⃣ GEO ROUTER (فكرة 4 - Geographic Proximity)
// ============================================================================
var GEO_ROUTER = {
proxyLocations: {
“212.35.66.45”: { lat: 31.9454, lon: 35.9284, name: “Amman-C” },
“91.106.109.12”: { lat: 32.0167, lon: 35.8833, name: “Zarqa” },
“46.32.102.1”: { lat: 31.9500, lon: 35.9300, name: “Amman-N” },
“82.212.108.217”: { lat: 31.9400, lon: 35.9250, name: “Amman-S” },
“77.245.8.95”: { lat: 32.5500, lon: 35.8500, name: “Irbid” }
},

serverRegions: {
“ME”: { lat: 25.2048, lon: 55.2708, name: “Dubai” },
“EU”: { lat: 52.5200, lon: 13.4050, name: “Berlin” },
“AS”: { lat: 1.3521, lon: 103.8198, name: “Singapore” }
},

distance: function(lat1, lon1, lat2, lon2) {
var R = 6371;
var dLat = (lat2 - lat1) * (Math.PI / 180);
var dLon = (lon2 - lon1) * (Math.PI / 180);

```
var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
return R * c;
```

},

findNearest: function(region) {
var serverLoc = this.serverRegions[region];
if (!serverLoc) return null;

```
var nearest = null;
var minDist = Infinity;

for (var proxy in this.proxyLocations) {
  var loc = this.proxyLocations[proxy];
  var dist = this.distance(loc.lat, loc.lon, serverLoc.lat, serverLoc.lon);
  
  if (dist < minDist) {
    minDist = dist;
    nearest = proxy;
  }
}

return nearest;
```

},

detectRegion: function(host, url) {
var text = (host + url).toLowerCase();

```
if (text.indexOf("-me-") !== -1 || text.indexOf("dubai") !== -1) {
  return "ME";
}
if (text.indexOf("-eu-") !== -1 || text.indexOf("europe") !== -1) {
  return "EU";
}
if (text.indexOf("-as-") !== -1 || text.indexOf("asia") !== -1) {
  return "AS";
}

return "ME"; // افتراضي للشرق الأوسط
```

}
};
// ============================================================================
// PUBG MOBILE ULTIMATE PAC SYSTEM - PART 2: ADVANCED ENGINE + EXECUTION
// تكملة الجزء الأول - المحركات المتقدمة والتنفيذ
// ============================================================================

// ملاحظة: ضع هذا الكود بعد الجزء الأول مباشرة

// ============================================================================
// 8️⃣ BANDWIDTH MANAGER (فكرة 7)
// ============================================================================
var BANDWIDTH = {
quotas: {
CRITICAL: { allocated: 70, used: 0, priority: 1 },
HIGH: { allocated: 20, used: 0, priority: 2 },
NORMAL: { allocated: 10, used: 0, priority: 3 }
},

total: 100,
current: 0,

allocate: function(priority, size) {
var quota = this.quotas[priority] || this.quotas.NORMAL;
var available = quota.allocated - quota.used;

```
if (size <= available) {
  quota.used += size;
  this.current += size;
  return true;
}

return this.borrow(priority, size);
```

},

borrow: function(fromPriority, amount) {
var fromQuota = this.quotas[fromPriority];

```
for (var p in this.quotas) {
  var quota = this.quotas[p];
  if (quota.priority > fromQuota.priority) {
    var available = quota.allocated - quota.used;
    if (available >= amount) {
      quota.used += amount;
      this.current += amount;
      return true;
    }
  }
}

return false;
```

},

release: function(priority, size) {
var quota = this.quotas[priority];
if (quota) {
quota.used = Math.max(0, quota.used - size);
this.current = Math.max(0, this.current - size);
}
},

rebalance: function() {
var critUsage = (this.quotas.CRITICAL.used / this.quotas.CRITICAL.allocated) * 100;

```
if (critUsage > 80 && this.quotas.NORMAL.allocated > 5) {
  var steal = Math.min(5, this.quotas.NORMAL.allocated);
  this.quotas.CRITICAL.allocated += steal;
  this.quotas.NORMAL.allocated -= steal;
}

if (critUsage < 30 && this.quotas.CRITICAL.allocated > 60) {
  var give = Math.min(5, this.quotas.CRITICAL.allocated - 60);
  this.quotas.CRITICAL.allocated -= give;
  this.quotas.NORMAL.allocated += give;
}
```

}
};

// ============================================================================
// 9️⃣ AI ANOMALY DETECTOR (فكرة 6)
// ============================================================================
var AI_DETECTOR = {
baseline: { avgLatency: 50, avgLoss: 0.01 },
metrics: { latency: [], loss: [] },
threshold: { latencySpike: 2.5, lossSpike: 5 },
suspicious: [],

analyze: function(latency, loss) {
this.metrics.latency.push(latency);
this.metrics.loss.push(loss);

```
if (this.metrics.latency.length > 100) {
  this.metrics.latency.shift();
  this.metrics.loss.shift();
}

var avgLat = this.avg(this.metrics.latency);
var avgLoss = this.avg(this.metrics.loss);

var anomalous = false;

if (avgLat > this.baseline.avgLatency * this.threshold.latencySpike) {
  anomalous = true;
}

if (avgLoss > this.baseline.avgLoss * this.threshold.lossSpike) {
  anomalous = true;
}

return {
  isAnomalous: anomalous,
  severity: this.severity(avgLat, avgLoss),
  action: anomalous ? "SWITCH_PATH" : "CONTINUE"
};
```

},

avg: function(arr) {
if (arr.length === 0) return 0;
var sum = 0;
for (var i = 0; i < arr.length; i++) sum += arr[i];
return sum / arr.length;
},

severity: function(lat, loss) {
var latScore = (lat / this.baseline.avgLatency) * 50;
var lossScore = (loss / this.baseline.avgLoss) * 50;
return Math.min(100, latScore + lossScore);
}
};

// ============================================================================
// 🔟 PROXY HEALTH MONITOR (فكرة 5)
// ============================================================================
var HEALTH_MONITOR = {
proxies: {},

init: function() {
for (var name in PROXIES) {
this.proxies[PROXIES[name]] = {
score: 100,
lastFail: 0,
failures: 0,
successes: 0
};
}
},

record: function(proxy, success) {
if (!this.proxies[proxy]) {
this.proxies[proxy] = { score: 100, lastFail: 0, failures: 0, successes: 0 };
}

```
var health = this.proxies[proxy];
var now = new Date().getTime();

if (success) {
  health.successes++;
  health.score = Math.min(100, health.score + 5);
} else {
  health.failures++;
  health.lastFail = now;
  health.score = Math.max(0, health.score - 20);
}
```

},

getBest: function() {
var best = null;
var bestScore = -1;
var now = new Date().getTime();

```
for (var proxy in this.proxies) {
  var health = this.proxies[proxy];
  
  // استرداد النقاط بمرور الوقت
  if (now - health.lastFail > 60000) {
    health.score = Math.min(100, health.score + 2);
  }
  
  if (health.score > bestScore) {
    bestScore = health.score;
    best = proxy;
  }
}

return best;
```

}
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// تحويل IP إلى رقم
function ipToNum(ip) {
var p = ip.split(”.”);
if (p.length !== 4) return 0;
return ((parseInt(p[0]) << 24) | (parseInt(p[1]) << 16) |
(parseInt(p[2]) << 8) | parseInt(p[3])) >>> 0;
}

// فحص CIDR
function inCidr(ip, cidr) {
var idx = cidr.indexOf(”/”);
if (idx === -1) return false;

var net = cidr.substring(0, idx);
var bits = parseInt(cidr.substring(idx + 1));

var ipNum = ipToNum(ip);
var netNum = ipToNum(net);
var mask = (0xFFFFFFFF << (32 - bits)) >>> 0;

return ((ipNum & mask) === (netNum & mask));
}

// فحص IP أردني (محسّن)
function isJordanian(ip) {
if (!ip || ip === “0.0.0.0”) return false;

for (var i = 0; i < ALL_JO_RANGES.length; i++) {
if (inCidr(ip, ALL_JO_RANGES[i])) {
return true;
}
}
return false;
}

// مطابقة النطاق
function matchDomain(host, domain) {
if (!host || !domain) return false;
host = host.toLowerCase();
domain = domain.toLowerCase();

if (host === domain) return true;

if (host.length > domain.length) {
var suffix = host.substring(host.length - domain.length);
if (suffix === domain && host.charAt(host.length - domain.length - 1) === “.”) {
return true;
}
}
return false;
}

// فحص قائمة نطاقات
function inDomainList(host, list) {
for (var i = 0; i < list.length; i++) {
if (matchDomain(host, list[i])) return true;
}
return false;
}

// فحص كلمات مفتاحية
function hasKeyword(text, keywords) {
if (!text) return false;
text = text.toLowerCase();

for (var i = 0; i < keywords.length; i++) {
if (text.indexOf(keywords[i]) !== -1) return true;
}
return false;
}

// بناء سلسلة البروكسي
function buildChain(proxies, port, includeDirect) {
var chain = [];

for (var i = 0; i < proxies.length; i++) {
chain.push(“PROXY “ + proxies[i] + “:” + port);
}

if (includeDirect) {
chain.push(“DIRECT”);
}

return chain.join(”; “);
}

// استخراج Match ID من URL
function extractMatchId(url) {
var patterns = [
/match[*-]?id[=:]([a-zA-Z0-9-]+)/i,
/room[*-]?id[=:]([a-zA-Z0-9-]+)/i,
/game[_-]?id[=:]([a-zA-Z0-9-]+)/i
];

for (var i = 0; i < patterns.length; i++) {
var match = url.match(patterns[i]);
if (match) return match[1];
}

return null;
}

// ============================================================================
// MAIN ROUTING LOGIC
// ============================================================================

function classifyTraffic(host, url) {
var urlLower = url.toLowerCase();
var combined = host + “ “ + urlLower;

// فحص نوع الترافيك
var isMatch = hasKeyword(combined, PUBG_DOMAINS.MATCH_KEYWORDS);
var isVoice = hasKeyword(combined, PUBG_DOMAINS.VOICE_KEYWORDS);
var isGame = hasKeyword(combined, PUBG_DOMAINS.GAME_KEYWORDS);
var isPubg = inDomainList(host, PUBG_DOMAINS.CRITICAL);
var isLowPrio = hasKeyword(host, PUBG_DOMAINS.LOW_PRIORITY);

// تصنيف الأولوية
if (isMatch || (isPubg && isMatch)) {
return { type: “MATCH”, priority: “CRITICAL”, port: PORTS.MATCH, urgent: true };
}

if (isVoice || (isPubg && isVoice)) {
return { type: “VOICE”, priority: “CRITICAL”, port: PORTS.VOICE, urgent: true };
}

if (isGame || (isPubg && isGame)) {
return { type: “GAME”, priority: “CRITICAL”, port: PORTS.GAME, urgent: true };
}

if (isPubg && !isLowPrio) {
return { type: “PUBG”, priority: “HIGH”, port: PORTS.LOBBY, urgent: false };
}

if (isLowPrio) {
return { type: “LOW”, priority: “NORMAL”, port: PORTS.GENERAL, urgent: false };
}

return { type: “UNKNOWN”, priority: “NORMAL”, port: PORTS.GENERAL, urgent: false };
}

// ============================================================================
// FindProxyForURL - الدالة الرئيسية
// ============================================================================
function FindProxyForURL(url, host) {
host = host.toLowerCase();

// المرحلة 0: نطاقات تمر مباشرة دائماً
if (inDomainList(host, PUBG_DOMAINS.ALWAYS_DIRECT)) {
return “DIRECT”;
}

// فحص خاص لـ Google connectivity
if (host === “clients3.google.com” && url.toLowerCase().indexOf(“generate_204”) !== -1) {
return “DIRECT”;
}

// المرحلة 1: تصنيف الترافيك
var traffic = classifyTraffic(host, url);

// المرحلة 2: أولوية منخفضة = مباشر
if (traffic.priority === “NORMAL” && traffic.type === “LOW”) {
return “DIRECT”;
}

// المرحلة 3: كشف IP الأردني (مع Cache)
var resolvedIP = PUBG_KNOWN_IPS[host] || DNS_CACHE.resolve(host);
var isJO = isJordanian(resolvedIP);

// المرحلة 4: تسجيل في المحركات
PREDICTOR.record(host);

// المرحلة 5: استخراج Match ID إن وجد
var matchId = extractMatchId(url);

// المرحلة 6: قرار التوجيه

// حالة حرجة: ماتش أو صوت أو لعب + IP أردني
if (isJO && traffic.urgent) {
// هل يوجد مسار متعلم؟
var learned = ROUTE_LEARNING.getBest(host);
if (learned) {
return “PROXY “ + learned + “:” + traffic.port + “; DIRECT”;
}

```
// هل يوجد جلسة ماتش نشطة؟
if (matchId) {
  var matchProxy = SESSION.getProxy(true);
  if (matchProxy) {
    return matchProxy;
  }
  
  // إنشاء جلسة ماتش جديدة
  var region = GEO_ROUTER.detectRegion(host, url);
  var nearestProxy = GEO_ROUTER.findNearest(region);
  
  if (nearestProxy) {
    var matchChain = buildChain([nearestProxy, PROXIES.JO_1, PROXIES.JO_2], traffic.port, true);
    SESSION.setMatch(matchId, matchChain);
    return matchChain;
  }
}

// اختيار متعدد المسارات
var path = MULTIPATH.select(true);
var chain = buildChain(path.proxies, traffic.port, true);

// حفظ في الجلسة
if (traffic.type === "MATCH") {
  SESSION.setProxy(chain, true);
}

return chain;
```

}

// حالة عالية: PUBG + IP أردني
if (isJO && traffic.priority === “HIGH”) {
var bestProxy = HEALTH_MONITOR.getBest();
if (bestProxy) {
return buildChain([bestProxy, PROXIES.JO_1], traffic.port, true);
}

```
return buildChain([PROXIES.JO_1, PROXIES.JO_2], traffic.port, true);
```

}

// حالة PUBG عام + أولوية عالية
if (traffic.urgent && traffic.type !== “UNKNOWN”) {
var region = GEO_ROUTER.detectRegion(host, url);
var nearest = GEO_ROUTER.findNearest(region);

```
if (nearest) {
  return buildChain([nearest], traffic.port, true);
}

return buildChain([PROXIES.JO_1], traffic.port, true);
```

}

// حالة PUBG عام
if (traffic.type === “PUBG” || inDomainList(host, PUBG_DOMAINS.CRITICAL)) {
return buildChain([PROXIES.JO_1], traffic.port, true);
}

// افتراضي: مباشر
return “DIRECT”;
}

// ============================================================================
// INITIALIZATION
// ============================================================================
HEALTH_MONITOR.init();

// ============================================================================
// END OF PART 2 - COMPLETE SYSTEM
// ============================================================================
