function FindProxyForURL(url, host) {
  var h = host.toLowerCase();
  var u = url.toLowerCase();

  // 🎯 بروكسيات أردنية متخصصة
  var PROXY_JO_MATCH = "PROXY 46.185.131.218:20001";
  var PROXY_JO_LOBBY = "PROXY 91.106.109.12:9030";
  var PROXY_ME_MIXED = "PROXY 176.29.153.95:20001";
  var BLOCK = "PROXY 127.0.0.1:1";

  // 📍 نطاقات IPv4 أردنية بيور للمباريات
  var JORDAN_MATCH_IPV4 = [
    ["37.230.0.0", "255.254.0.0"],
    ["46.23.0.0", "255.255.0.0"],
    ["46.29.0.0", "255.255.252.0"],
    ["188.161.0.0", "255.255.252.0"],
    ["176.56.0.0", "255.248.0.0"],
    ["82.212.64.0", "255.255.192.0"],
    ["185.84.220.0", "255.255.252.0"],
    ["37.239.0.0", "255.255.254.0"],
    ["46.30.0.0", "255.255.254.0"],
    ["188.162.0.0", "255.255.254.0"],
    ["46.244.0.0", "255.252.0.0"],
    ["185.117.136.0", "255.255.248.0"],
    ["91.106.64.0", "255.255.192.0"]
  ];

  // 🌍 نطاقات شرق أوسط مختلطة مع hop أردني
  var MIDDLEEAST_MATCH_IPV4 = [
    ["185.85.0.0", "255.255.0.0"],
    ["188.163.0.0", "255.255.252.0"],
    ["37.228.0.0", "255.252.0.0"],
    ["46.31.0.0", "255.255.254.0"],
    ["176.58.0.0", "255.254.0.0"],
    ["46.240.0.0", "255.248.0.0"],
    ["188.164.0.0", "255.252.0.0"],
    ["85.185.0.0", "255.255.0.0"],
    ["5.62.0.0", "255.254.0.0"],
    ["94.201.0.0", "255.255.252.0"],
    ["41.33.0.0", "255.255.0.0"],
    ["197.50.0.0", "255.254.0.0"],
    ["149.255.0.0", "255.255.0.0"],
    ["185.82.0.0", "255.254.0.0"],
    ["188.165.0.0", "255.255.0.0"],
    ["213.6.0.0", "255.254.0.0"]
  ];

  // 🏛️ نطاقات واسعة للوبي
  var LOBBY_IPV4 = [
    ["37.230.0.0", "255.254.0.0"],
    ["46.23.0.0", "255.255.0.0"],
    ["46.29.0.0", "255.255.0.0"],
    ["188.161.0.0", "255.255.0.0"],
    ["176.56.0.0", "255.248.0.0"],
    ["82.212.0.0", "255.255.0.0"],
    ["185.84.0.0", "255.252.0.0"],
    ["5.0.0.0", "254.0.0.0"],
    ["37.200.0.0", "255.240.0.0"],
    ["41.0.0.0", "255.0.0.0"],
    ["46.0.0.0", "255.128.0.0"],
    ["78.100.0.0", "255.252.0.0"],
    ["85.0.0.0", "255.0.0.0"],
    ["94.200.0.0", "255.248.0.0"],
    ["149.0.0.0", "255.0.0.0"],
    ["151.232.0.0", "255.248.0.0"],
    ["185.0.0.0", "255.192.0.0"],
    ["188.160.0.0", "255.240.0.0"],
    ["197.0.0.0", "255.0.0.0"],
    ["213.0.0.0", "255.0.0.0"]
  ];

  // ❌ نطاقات أوروبية محظورة
  var EUROPE_BLOCK_IPV4 = [
    ["77.0.0.0", "255.0.0.0"],
    ["78.0.0.0", "255.128.0.0"],
    ["80.0.0.0", "255.192.0.0"],
    ["81.0.0.0", "255.0.0.0"],
    ["82.0.0.0", "255.128.0.0"],
    ["83.0.0.0", "255.0.0.0"],
    ["84.0.0.0", "255.0.0.0"],
    ["86.0.0.0", "255.0.0.0"],
    ["87.0.0.0", "255.0.0.0"],
    ["88.0.0.0", "255.0.0.0"],
    ["89.0.0.0", "255.0.0.0"],
    ["90.0.0.0", "255.0.0.0"],
    ["91.0.0.0", "255.0.0.0"],
    ["92.0.0.0", "255.0.0.0"],
    ["93.0.0.0", "255.0.0.0"],
    ["95.0.0.0", "255.0.0.0"],
    ["151.0.0.0", "255.192.0.0"],
    ["176.0.0.0", "255.128.0.0"],
    ["193.0.0.0", "255.0.0.0"],
    ["194.0.0.0", "255.0.0.0"],
    ["195.0.0.0", "255.0.0.0"]
  ];

  // 🔍 كشف PUBG
  if (!isPUBG(h)) {
    return PROXY_JO_LOBBY;
  }

  // 🎮 المباريات
  if (isMatch(u, h)) {
    if (isInRanges(h, JORDAN_MATCH_IPV4)) {
      return PROXY_JO_MATCH;
    }
    
    if (isInRanges(h, MIDDLEEAST_MATCH_IPV4)) {
      if (!isInRanges(h, EUROPE_BLOCK_IPV4)) {
        return PROXY_JO_MATCH + "; " + PROXY_ME_MIXED;
      }
    }
    
    if (isInRanges(h, EUROPE_BLOCK_IPV4)) {
      return BLOCK;
    }

    return PROXY_JO_MATCH;
  }

  // 🏛️ اللوبي
  if (isLobby(u, h)) {
    if (isInRanges(h, LOBBY_IPV4)) {
      return PROXY_JO_LOBBY;
    }
    return PROXY_JO_LOBBY;
  }

  // 👥 السوشال
  if (isSocial(u, h)) {
    return PROXY_JO_LOBBY;
  }

  // 📦 CDN
  if (isCDN(u, h)) {
    return PROXY_JO_LOBBY;
  }

  // 🌐 افتراضي
  return PROXY_JO_LOBBY;
}

// ================= وظائف الكشف =================
function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite|proximabeta|intlgame|qq|igamecj|anticheatexpert|game\.gtimg|dlied|tdm|cdn\.tencent|wetest/i.test(h);
}

function isMatch(u, h) {
  return /match|battle|game-|combat|realtime|sync|udp|tick|room|arena|fight|war|session|instance|server-|play-|pvp|versus/i.test(u + h);
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|hall|waiting|prepare|login|auth|account|profile|inventory/i.test(u + h);
}

function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|voice|guild|group|message/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|download|static|image|video|texture|model/i.test(u + h);
}

// ================= فحص النطاقات =================
function isInRanges(host, ranges) {
  var ip = getIPFromHost(host);
  if (!ip) return false;
  
  for (var i = 0; i < ranges.length; i++) {
    if (isInNet(ip, ranges[i][0], ranges[i][1])) {
      return true;
    }
  }
  return false;
}

function getIPFromHost(host) {
  // إذا كان Host هو IP مباشرة
  if (/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
    return host;
  }
  
  // محاولة استخراج IP من النمط
  var ipMatch = host.match(/(\d+\.\d+\.\d+\.\d+)/);
  if (ipMatch) {
    return ipMatch[1];
  }
  
  // استخدام myIpAddress كبديل افتراضي
  return myIpAddress();
}

function isPrivateIP(ip) {
  if (!ip) return false;
  
  // فحص النطاقات الخاصة
  if (isInNet(ip, "10.0.0.0", "255.0.0.0")) return true;
  if (isInNet(ip, "172.16.0.0", "255.240.0.0")) return true;
  if (isInNet(ip, "192.168.0.0", "255.255.0.0")) return true;
  if (isInNet(ip, "127.0.0.0", "255.0.0.0")) return true;
  
  return false;
}
