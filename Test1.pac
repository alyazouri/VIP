/* ============================ CONFIG ==================================== */
var PROXY      = "SOCKS5 149.200.251.112:8888";
var DRY_RUN    = false;
var RESOLVE    = true;
var FAIL_OPEN  = true;
var HOST_RE    = new RegExp("(?:^|\\.)jo$", "i");

/* Always bypassed, even if they resolve into Jordan. */
var BYPASS = [
    "localhost"
];

/* Always proxied, even if they resolve outside Jordan. */
var ALWAYS_PROXY = [
];

/* ======================== END OF CONFIG ================================= */

/*
 * Jordanian IPv4 prefixes.
 * Compiled once and cached.
 */
var JO_PREFIXES = [
    "2.59.53.0/24",
    "5.45.128.0/20",
    "5.198.240.0/21",
    "5.199.184.0/22",
    "37.17.192.0/20",
    "37.44.32.0/21",
    "37.75.144.0/22",
    "37.75.149.0/24",
    "37.75.150.0/24",
    "37.123.64.0/19",
    "37.152.0.0/21",
    "37.202.64.0/18",
    "37.220.112.0/20",
    "37.252.222.0/24",
    "45.142.196.0/22",
    "46.23.112.0/20",
    "46.32.96.0/19",
    "46.185.128.0/17",
    "46.248.192.0/19",
    "62.72.161.0/24",
    "62.72.162.0/24",
    "62.72.170.0/23",
    "62.72.174.0/24",
    "62.72.187.0/24",
    "62.72.191.0/24",
    "77.245.0.0/20",
    "79.134.128.0/19",
    "79.173.192.0/18",
    "80.90.160.0/20",
    "81.21.0.0/20",
    "81.28.112.0/20",
    "82.212.64.0/18",
    "84.18.32.0/19",
    "84.18.64.0/19",
    "85.159.216.0/21",
    "86.108.0.0/17",
    "87.236.232.0/21",
    "87.238.128.0/21",
    "89.20.49.0/24",
    "89.28.216.0/21",
    "89.38.152.0/23",
    "91.106.96.0/20",
    "91.132.100.0/24",
    "91.186.224.0/19",
    "91.209.248.0/24",
    "91.212.0.0/24",
    "91.223.202.0/24",
    "92.241.32.0/19",
    "92.253.0.0/17",
    "93.93.144.0/21",
    "93.95.200.0/21",
    "93.115.2.0/24",
    "93.115.15.0/24",
    "93.191.176.0/21",
    "94.127.208.0/21",
    "94.142.32.0/19",
    "94.249.0.0/17",
    "95.141.208.0/20",
    "95.172.192.0/19",
    "109.107.224.0/19",
    "109.237.192.0/20",
    "141.0.0.0/21",
    "141.98.64.0/22",
    "141.105.56.0/21",
    "146.19.239.0/24",
    "149.200.128.0/17",
    "176.28.128.0/17",
    "176.29.0.0/16",
    "176.57.0.0/22",
    "176.57.56.0/23",
    "176.57.62.0/24",
    "176.118.39.0/24",
    "176.241.64.0/21",
    "178.20.184.0/21",
    "178.77.128.0/18",
    "178.238.176.0/20",
    "185.10.216.0/22",
    "185.12.244.0/22",
    "185.14.132.0/22",
    "185.19.112.0/22",
    "185.24.128.0/23",
    "185.24.130.0/24",
    "185.30.248.0/22",
    "185.33.28.0/22",
    "185.43.146.0/24",
    "185.51.212.0/22",
    "185.57.120.0/23",
    "185.57.122.0/24",
    "185.68.54.0/24",
    "185.80.24.0/22",
    "185.98.220.0/22",
    "185.98.224.0/22",
    "185.109.120.0/22",
    "185.109.192.0/22",
    "185.135.200.0/23",
    "185.139.220.0/22",
    "185.160.236.0/22",
    "185.163.205.0/24",
    "185.173.56.0/24",
    "185.173.58.0/23",
    "185.175.248.0/22",
    "185.176.44.0/22",
    "185.180.80.0/22",
    "185.182.136.0/22",
    "185.193.176.0/22",
    "185.197.176.0/22",
    "185.234.111.0/24",
    "185.241.62.0/24",
    "185.253.112.0/23",
    "185.253.114.0/24",
    "188.123.160.0/19",
    "188.247.64.0/19",
    "193.17.53.0/24",
    "193.108.134.0/23",
    "193.111.29.0/24",
    "193.188.64.0/19",
    "193.189.148.0/24",
    "193.203.24.0/24",
    "193.203.110.0/24",
    "194.165.128.0/19",
    "212.34.0.0/19",
    "212.35.64.0/19",
    "212.118.0.0/19",
    "213.139.32.0/19",
    "213.186.160.0/19",
    "217.23.32.0/20",
    "217.29.240.0/23",
    "217.144.0.0/20"
];

/* ============================ IP HELPERS ================================ */

function ipToInt(s) {
    var p = String(s).split(".");

    if (p.length !== 4) {
        return -1;
    }

    var v = 0;

    for (var i = 0; i < 4; i++) {
        if (!/^\d{1,3}$/.test(p[i])) {
            return -1;
        }

        var o = Number(p[i]);

        if (o > 255) {
            return -1;
        }

        v = v * 256 + o;
    }

    return v;
}

function isIpLiteral(s) {
    return /^\d{1,3}(\.\d{1,3}){3}$/.test(String(s));
}

/* ============================ CIDR TABLE ================================ */

var T = null;

function table() {
    if (T) {
        return T;
    }

    T = [];

    for (var i = 0; i < JO_PREFIXES.length; i++) {
        var bits = JO_PREFIXES[i].split("/");
        var start = ipToInt(bits[0]);
        var prefix = Number(bits[1]);

        T.push([
            start,
            Math.pow(2, 32 - prefix)
        ]);
    }

    return T;
}

/* =========================== JORDAN MATCH =============================== */

function inJordan(ip) {
    var x = ipToInt(ip);

    if (x < 0) {
        return false;
    }

    var J = table();

    var lo = 0;
    var hi = J.length - 1;

    while (lo <= hi) {
        var mid = (lo + hi) >> 1;

        var start = J[mid][0];
        var size  = J[mid][1];

        if (x < start) {
            hi = mid - 1;
        }
        else if (x - start >= size) {
            lo = mid + 1;
        }
        else {
            return true;
        }
    }

    return false;
}

/* =========================== HOST MATCH ================================= */

function suffixHit(list, host) {
    for (var i = 0; i < list.length; i++) {
        var e = String(list[i]).toLowerCase();

        if (
            host === e ||
            host.slice(-(e.length + 1)) === "." + e
        ) {
            return true;
        }
    }

    return false;
}

/* ============================ PROXY ===================================== */

/*
 * IMPORTANT:
 * This function now actually uses:
 *
 * SOCKS5 149.200.251.112:8888
 *
 * instead of the old 127.0.0.1:1080.
 */

function proxyOrDirect(matched) {
    if (DRY_RUN) {
        return "DIRECT";
    }

    if (matched) {
        return PROXY + "; DIRECT";
    }

    return "DIRECT";
}

/* ============================ MAIN PAC ================================== */

function FindProxyForURL(url, host) {

    var h = String(host || "").toLowerCase();

    if (!h) {
        return "DIRECT";
    }

    /*
     * Strip port if supplied in host.
     */
    var colon = h.lastIndexOf(":");

    if (
        colon > 0 &&
        h.indexOf("]") < 0 &&
        /^\d+$/.test(h.slice(colon + 1))
    ) {
        h = h.slice(0, colon);
    }

    /*
     * Explicit bypass.
     */
    if (suffixHit(BYPASS, h)) {
        return "DIRECT";
    }

    /*
     * Explicit proxy list.
     */
    if (suffixHit(ALWAYS_PROXY, h)) {
        return proxyOrDirect(true);
    }

    /*
     * .jo domains.
     */
    if (HOST_RE.test(h)) {
        return proxyOrDirect(true);
    }

    /*
     * Direct IPv4 address.
     */
    if (isIpLiteral(h)) {
        return proxyOrDirect(inJordan(h));
    }

    /*
     * Resolve hostname and check all returned IPv4 addresses.
     */
    if (
        RESOLVE &&
        typeof dnsResolve === "function"
    ) {

        var ips = null;

        try {

            if (typeof dnsResolveAll === "function") {
                ips = dnsResolveAll(h);
            }
            else {
                ips = dnsResolve(h);
            }

        }
        catch (e) {
            ips = null;
        }

        if (ips) {

            var parts = String(ips).split(";");

            for (var k = 0; k < parts.length; k++) {

                if (
                    parts[k] &&
                    inJordan(parts[k])
                ) {
                    return proxyOrDirect(true);
                }
            }

            return proxyOrDirect(false);
        }

        /*
         * DNS failure:
         * FAIL_OPEN = true → DIRECT
         */
        if (FAIL_OPEN) {
            return "DIRECT";
        }
    }

    /*
     * Non-Jordan destination.
     */
    return proxyOrDirect(false);
}
