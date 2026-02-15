// ===============================================
// ULTIMATE PUBG SCRIPT V6.0 (STRICT WHITELIST)
// Logic: Whitelist Only (Zero Conflict)
// ===============================================

var MATCH_JO = "PROXY 37.44.38.20:443";
var LOBBY_PROXIES = ["PROXY 46.185.131.218:443"];
var BLOCK = "PROXY 0.0.0.0";
var DIRECT = "DIRECT";

// ================= WHITE LIST =================
var ALLOWED_REGIONS = [
["176.29.0.0", "255.255.0.0"],      // Zain Mobile
["5.45.128.0", "255.255.240.0"],    // Umniah Mobile
["178.238.176.0", "255.255.240.0"]  // Umniah Mobile
];

// ================= BLACKLIST (ASIA) =================
var ASIA_BLACKLIST = [
["1.0.0.0","255.0.0.0"],["14.0.0.0","255.0.0.0"],["27.0.0.0","255.0.0.0"],
["36.0.0.0","255.0.0.0"],["39.0.0.0","255.0.0.0"],["42.0.0.0","255.0.0.0"],
["49.0.0.0","255.0.0.0"],["58.0.0.0","255.0.0.0"],["59.0.0.0","255.0.0.0"],
["60.0.0.0","255.0.0.0"],["61.0.0.0","255.0.0.0"],["101.0.0.0","255.0.0.0"],
["106.0.0.0","255.0.0.0"],["110.0.0.0","255.0.0.0"],["111.0.0.0","255.0.0.0"],
["112.0.0.0","255.0.0.0"],["113.0.0.0","255.0.0.0"],["114.0.0.0","255.0.0.0"],
["115.0.0.0","255.0.0.0"],["116.0.0.0","255.0.0.0"],["117.0.0.0","255.0.0.0"],
["118.0.0.0","255.0.0.0"],["119.0.0.0","255.0.0.0"],["120.0.0.0","255.0.0.0"],
["121.0.0.0","255.0.0.0"],["122.0.0.0","255.0.0.0"],["123.0.0.0","255.0.0.0"],
["124.0.0.0","255.0.0.0"],["125.0.0.0","255.0.0.0"],["126.0.0.0","255.0.0.0"],
["133.0.0.0","255.0.0.0"],["202.0.0.0","255.0.0.0"],["203.0.0.0","255.0.0.0"],
["210.0.0.0","255.0.0.0"],["211.0.0.0","255.0.0.0"],["218.0.0.0","255.0.0.0"],
["219.0.0.0","255.0.0.0"],["220.0.0.0","255.0.0.0"],["221.0.0.0","255.0.0.0"],
["222.0.0.0","255.0.0.0"],["223.0.0.0","255.0.0.0"]
];

// ================= PUBG DOMAIN GROUPS =================
var PUBG_LOBBY_DOMAINS = [
"lobby.pubgmobile.com","matchmaking.pubgmobile.com","mm.pubgmobile.com",
"lobby-live.pubgmobile.com","matchmaker.pubgmobile.com","grover.pubgmobile.com",
"lobby-me.pubgmobile.com","lobby-asia.pubgmobile.com"
];

var PUBG_GAME_DOMAINS = [
"prodigy-live.pubgmobile.com","prodigy.pubgmobile.com","game.pubgmobile.com",
"gs.pubgmobile.com","gameserver.pubgmobile.com","playedge.pubgmobile.com",
"prodigy-me.pubgmobile.com","prodigy-asia.pubgmobile.com"
];

var PUBG_AUTH_DOMAINS = [
"accounts.krafton.com","account.pubg.com","login.pubgmobile.com",
"auth.pubgmobile.com","oauth.pubgmobile.com","token.pubgmobile.com","api.krafton.com"
];

var PUBG_CDN_DOMAINS = [
"cdn.pubgmobile.com","assets.pubgmobile.com","download.pubgmobile.com",
"patch.pubgmobile.com","resource.pubgmobile.com","static.pubgmobile.com",
"media.pubgmobile.com","akamai.net","akamaized.net","akamaicdn.com"
];

var PUBG_REGIONAL_DOMAINS = [
"me.pubgmobile.com","mena.pubgmobile.com","asia.pubgmobile.com",
"eu.pubgmobile.com","na.pubgmobile.com"
];

var UNITY_DOMAINS = [
"unity3d.com","unityads.unity3d.com","config.unity3d.com",
"cdp.cloud.unity3d.com","perf.cloud.unity3d.com","api.prd.cds.unity3d.com"
];

// ================= SESSION =================
var _Session = { ipCache:{}, matchNet:null };

// ================= HELPERS =================
function hostMatchesDomain(host, list) {
    for (var i=0;i<list.length;i++) {
        if (host===list[i] || host.endsWith("."+list[i])) return true;
    }
    return false;
}

function isAllowed(ip){
    for(var i=0;i<ALLOWED_REGIONS.length;i++)
        if(isInNet(ip,ALLOWED_REGIONS[i][0],ALLOWED_REGIONS[i][1])) return true;
    return false;
}

function isBlocked(ip){
    for(var i=0;i<ASIA_BLACKLIST.length;i++)
        if(isInNet(ip,ASIA_BLACKLIST[i][0],ASIA_BLACKLIST[i][1])) return true;
    return false;
}

function getIp(host){
    if(_Session.ipCache[host]) return _Session.ipCache[host];
    var ip=dnsResolve(host);
    if(ip) _Session.ipCache[host]=ip;
    return ip;
}

function getLobbyProxy(){ return LOBBY_PROXIES[0]; }

// ================= MAIN =================
function FindProxyForURL(url, host){

    host=host.toLowerCase();
    if(host.indexOf(":")!==-1) host=host.split(":")[0];

    var isLobby   = hostMatchesDomain(host,PUBG_LOBBY_DOMAINS);
    var isGame    = hostMatchesDomain(host,PUBG_GAME_DOMAINS);
    var isAuth    = hostMatchesDomain(host,PUBG_AUTH_DOMAINS);
    var isCDN     = hostMatchesDomain(host,PUBG_CDN_DOMAINS);
    var isRegion  = hostMatchesDomain(host,PUBG_REGIONAL_DOMAINS);
    var isUnity   = hostMatchesDomain(host,UNITY_DOMAINS);

    if(!(isLobby||isGame||isAuth||isCDN||isRegion||isUnity))
        return DIRECT;

    var ip=getIp(host);
    if(!ip) return BLOCK;

    if(isBlocked(ip)) return BLOCK;
    if(!isAllowed(ip)) return BLOCK;

    if(isCDN||isUnity) return DIRECT;
    if(isLobby||isAuth||isRegion) return getLobbyProxy();
    if(isGame){
        var net24=ip.split('.').slice(0,3).join('.');
        if(!_Session.matchNet) _Session.matchNet=net24;
        return MATCH_JO;
    }

    return BLOCK;
}
