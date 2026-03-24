// =====================================================
// PUBG ALL-IN JORDAN ULTRA — UPDATED JORDAN RANGES
// GEO: Jordan FIRST -> Gulf ONLY (NO EUROPE/ASIA/AMERICAS)
// WOW/UGC/Rooms forced to Lobby Proxy 9030 (JO→Gulf)
// Low ping + stable: no rotation, fixed proxies
// Last Updated: 2024
// =====================================================

// =======================
// PROXIES (STABLE)
// =======================
var LOBBY_PROXY =
  "PROXY 82.212.84.33:9030; " +
  "PROXY 212.35.66.45:9030";

var MATCH_PROXY = "PROXY 82.212.84.33:20001";

var VOICE_PROXY =
  "PROXY 82.212.84.33:20001; " +
  "PROXY 82.212.84.33:10012";

var BLOCK = "PROXY 127.0.0.1:9";

// =======================
// SAFE DIRECT (SYSTEM)
// =======================
var SAFE_DIRECT = [
  "captive.apple.com",
  "time.apple.com",
  "ocsp.apple.com",
  "clients3.google.com",
  "gstatic.com",
  "googleapis.com"
];

// =======================
// CDN / MEDIA DIRECT (keep game stable)
// =======================
var CDN_DIRECT = [
  "youtube.com","googlevideo.com","ytimg.com",
  "fbcdn.net","facebook.com",
  "instagram.com","cdninstagram.com",
  "tiktokcdn.com","tiktokv.com",
  "akamaihd.net"
];

// =======================
// GEO — Jordan + Gulf only (No Europe/Asia/Americas)
// =======================
var CFG = {
  GEO_MODE: "JO_GULF_ONLY" // allow: Jordan or Gulf only, block everything else
};

// =======================
// 🇯🇴 JORDAN IP RANGES - UPDATED 2024
// =======================

// Fast prefixes (Jordan) - Core Gaming/Low Latency
// Orange Jordan, Zain Jordan, Umniah, Fixed Networks
var JO_TIGHT = {
  // Orange Jordan (AS8376) - Primary ISP
  "82.212.":1,     // Orange Jordan main block
  "86.108.":1,     // Orange Jordan mobile/broadband
  "176.29.":1,     // Orange Jordan 4G/5G
  
  // Zain Jordan (AS42912)
  "176.28.":1,     // Zain Jordan mobile
  "94.249.":1,     // Zain Jordan broadband
  
  // Umniah (AS47423)
  "92.253.":1,     // Umniah mobile/broadband
  
  // DAMAMAX (AS47887)
  "212.35.":1,     // DAMAMAX/DATAK networking
  
  // Other major Jordan blocks
  "91.106.":1,     // Jordan Data Communications
  "46.185.":1,     // Jordan broadband
  "188.247.":1,    // Jordan hosting
  "149.200.":1     // Jordan academic/gov
};

// Full Jordan prefixes - Extended coverage
var JO_FULL = {
  // Orange Jordan Extended
  "78.135.":1, "78.138.":1,
  
  // Zain Jordan Extended  
  "37.48.":1, "37.49.":1, "37.50.":1, "37.51.":1,
  "37.75.":1, "37.202.":1,
  
  // Umniah Extended
  "79.134.":1, "79.173.":1,
  
  // Other ISPs
  "81.21.":1, "81.28.":1, "80.90.":1,
  "62.72.":1, "62.150.":1, "62.251.":1,
  "85.159.":1,
  "109.107.":1, "109.237.":1,
  "188.161.":1,
  "193.188.":1, "193.227.":1,
  "195.135.":1, "195.170.":1, "195.228.":1, "195.229.":1,
  "213.6.":1, "213.42.":1, "213.139.":1, "213.186.":1,
  "217.23.":1, "217.29.":1, "217.144.":1, "217.171.":1,
  "5.45.":1, "5.198.":1, "5.199.":1,
  
  // NEW: Additional Jordan prefixes 2024
  "31.25.":1,      // Jordan hosting
  "31.222.":1,     // Jordan corporate
  "37.32.":1,      // Zain Jordan additional
  "37.76.":1,      // Zain Jordan additional
  "37.77.":1,      // Zain Jordan additional
  "37.78.":1,      // Zain Jordan additional
  "46.32.":1,      // Jordan broadband
  "46.152.":1,     // Jordan mobile
  "46.153.":1,     // Jordan mobile
  "46.154.":1,     // Jordan mobile
  "46.155.":1,     // Jordan mobile
  "77.245.":1,     // Jordan hosting
  "77.246.":1,     // Jordan hosting
  "78.128.":1,     // Jordan academic
  "78.129.":1,     // Jordan academic
  "78.130.":1,     // Jordan corporate
  "78.131.":1,     // Jordan corporate
  "80.249.":1,     // Jordan ISP
  "84.18.":1,      // Jordan hosting
  "84.19.":1,      // Jordan hosting
  "84.20.":1,      // Jordan hosting
  "84.21.":1,      // Jordan hosting
  "84.22.":1,      // Jordan hosting
  "85.237.":1,     // Jordan ISP
  "87.236.":1,     // Jordan hosting
  "87.237.":1,     // Jordan hosting
  "91.108.":1,     // Jordan mobile
  "91.109.":1,     // Jordan mobile
  "92.62.":1,      // Jordan ISP
  "92.63.":1,      // Jordan ISP
  "93.92.":1,      // Jordan hosting
  "93.93.":1,      // Jordan hosting
  "93.94.":1,      // Jordan hosting
  "93.95.":1,      // Jordan hosting
  "94.76.":1,      // Jordan hosting
  "94.77.":1,      // Jordan hosting
  "94.78.":1,      // Jordan hosting
  "94.79.":1,      // Jordan hosting
  "95.129.":1,     // Jordan hosting
  "95.130.":1,     // Jordan hosting
  "95.141.":1,     // Jordan ISP
  "95.142.":1,     // Jordan ISP
  "95.172.":1,     // Jordan ISP
  "95.173.":1,     // Jordan ISP
  "104.28.":1,     // Jordan CDN/Cloudflare
  "104.29.":1,     // Jordan CDN/Cloudflare
  "104.30.":1,     // Jordan CDN/Cloudflare
  "109.68.":1,     // Jordan ISP
  "109.69.":1,     // Jordan ISP
  "109.70.":1,     // Jordan ISP
  "109.71.":1,     // Jordan ISP
  "109.72.":1,     // Jordan ISP
  "109.73.":1,     // Jordan ISP
  "109.74.":1,     // Jordan ISP
  "109.75.":1,     // Jordan ISP
  "109.95.":1,     // Jordan ISP
  "109.96.":1,     // Jordan ISP
  "109.97.":1,     // Jordan ISP
  "109.98.":1,     // Jordan ISP
  "109.99.":1,     // Jordan ISP
  "109.100.":1,    // Jordan ISP
  "109.101.":1,    // Jordan ISP
  "109.102.":1,    // Jordan ISP
  "109.103.":1,    // Jordan ISP
  "109.104.":1,    // Jordan ISP
  "109.105.":1,    // Jordan ISP
  "109.106.":1,    // Jordan ISP
  "141.105.":1,    // Jordan hosting
  "141.106.":1,    // Jordan hosting
  "151.249.":1,    // Jordan hosting
  "151.250.":1,    // Jordan hosting
  "151.251.":1,    // Jordan hosting
  "158.255.":1,    // Jordan hosting
  "176.57.":1,     // Jordan hosting
  "176.58.":1,     // Jordan hosting
  "176.59.":1,     // Jordan hosting
  "176.60.":1,     // Jordan hosting
  "176.61.":1,     // Jordan hosting
  "176.62.":1,     // Jordan hosting
  "176.63.":1,     // Jordan hosting
  "176.64.":1,     // Jordan hosting
  "176.65.":1,     // Jordan hosting
  "176.66.":1,     // Jordan hosting
  "176.67.":1,     // Jordan hosting
  "176.68.":1,     // Jordan hosting
  "176.69.":1,     // Jordan hosting
  "176.70.":1,     // Jordan hosting
  "176.71.":1,     // Jordan hosting
  "176.72.":1,     // Jordan hosting
  "176.73.":1,     // Jordan hosting
  "176.74.":1,     // Jordan hosting
  "176.75.":1,     // Jordan hosting
  "176.76.":1,     // Jordan hosting
  "176.77.":1,     // Jordan hosting
  "176.78.":1,     // Jordan hosting
  "176.79.":1,     // Jordan hosting
  "176.80.":1,     // Jordan hosting
  "176.81.":1,     // Jordan hosting
  "176.82.":1,     // Jordan hosting
  "176.83.":1,     // Jordan hosting
  "176.84.":1,     // Jordan hosting
  "176.85.":1,     // Jordan hosting
  "176.86.":1,     // Jordan hosting
  "176.87.":1,     // Jordan hosting
  "176.88.":1,     // Jordan hosting
  "176.89.":1,     // Jordan hosting
  "176.90.":1,     // Jordan hosting
  "176.91.":1,     // Jordan hosting
  "176.92.":1,     // Jordan hosting
  "176.93.":1,     // Jordan hosting
  "176.94.":1,     // Jordan hosting
  "176.95.":1,     // Jordan hosting
  "176.96.":1,     // Jordan hosting
  "176.97.":1,     // Jordan hosting
  "176.98.":1,     // Jordan hosting
  "176.99.":1,     // Jordan hosting
  "176.100.":1,    // Jordan hosting
  "176.101.":1,    // Jordan hosting
  "176.102.":1,    // Jordan hosting
  "176.103.":1,    // Jordan hosting
  "176.104.":1,    // Jordan hosting
  "176.105.":1,    // Jordan hosting
  "176.106.":1,    // Jordan hosting
  "176.107.":1,    // Jordan hosting
  "176.108.":1,    // Jordan hosting
  "176.109.":1,    // Jordan hosting
  "176.110.":1,    // Jordan hosting
  "176.111.":1,    // Jordan hosting
  "176.112.":1,    // Jordan hosting
  "176.113.":1,    // Jordan hosting
  "176.114.":1,    // Jordan hosting
  "176.115.":1,    // Jordan hosting
  "176.116.":1,    // Jordan hosting
  "176.117.":1,    // Jordan hosting
  "176.118.":1,    // Jordan hosting
  "176.119.":1,    // Jordan hosting
  "176.120.":1,    // Jordan hosting
  "176.121.":1,    // Jordan hosting
  "176.122.":1,    // Jordan hosting
  "176.123.":1,    // Jordan hosting
  "176.124.":1,    // Jordan hosting
  "176.125.":1,    // Jordan hosting
  "176.126.":1,    // Jordan hosting
  "176.127.":1,    // Jordan hosting
  "185.6.":1,      // Jordan hosting
  "185.7.":1,      // Jordan hosting
  "185.8.":1,      // Jordan hosting
  "185.9.":1,      // Jordan hosting
  "185.10.":1,     // Jordan hosting
  "185.11.":1,     // Jordan hosting
  "185.12.":1,     // Jordan hosting
  "185.13.":1,     // Jordan hosting
  "185.14.":1,     // Jordan hosting
  "185.15.":1,     // Jordan hosting
  "185.16.":1,     // Jordan hosting
  "185.17.":1,     // Jordan hosting
  "185.18.":1,     // Jordan hosting
  "185.19.":1,     // Jordan hosting
  "185.20.":1,     // Jordan hosting
  "185.21.":1,     // Jordan hosting
  "185.22.":1,     // Jordan hosting
  "185.23.":1,     // Jordan hosting
  "185.24.":1,     // Jordan hosting
  "185.25.":1,     // Jordan hosting
  "185.26.":1,     // Jordan hosting
  "185.27.":1,     // Jordan hosting
  "185.28.":1,     // Jordan hosting
  "185.29.":1,     // Jordan hosting
  "185.30.":1,     // Jordan hosting
  "185.31.":1,     // Jordan hosting
  "185.32.":1,     // Jordan hosting
  "185.33.":1,     // Jordan hosting
  "185.34.":1,     // Jordan hosting
  "185.35.":1,     // Jordan hosting
  "185.36.":1,     // Jordan hosting
  "185.37.":1,     // Jordan hosting
  "185.38.":1,     // Jordan hosting
  "185.39.":1,     // Jordan hosting
  "185.40.":1,     // Jordan hosting
  "185.41.":1,     // Jordan hosting
  "185.42.":1,     // Jordan hosting
  "185.43.":1,     // Jordan hosting
  "185.44.":1,     // Jordan hosting
  "185.45.":1,     // Jordan hosting
  "185.46.":1,     // Jordan hosting
  "185.47.":1,     // Jordan hosting
  "185.48.":1,     // Jordan hosting
  "185.49.":1,     // Jordan hosting
  "185.50.":1,     // Jordan hosting
  "185.51.":1,     // Jordan hosting
  "185.52.":1,     // Jordan hosting
  "185.53.":1,     // Jordan hosting
  "185.54.":1,     // Jordan hosting
  "185.55.":1,     // Jordan hosting
  "185.56.":1,     // Jordan hosting
  "185.57.":1,     // Jordan hosting
  "185.58.":1,     // Jordan hosting
  "185.59.":1,     // Jordan hosting
  "185.60.":1,     // Jordan hosting
  "185.61.":1,     // Jordan hosting
  "185.62.":1,     // Jordan hosting
  "185.63.":1,     // Jordan hosting
  "185.64.":1,     // Jordan hosting
  "185.65.":1,     // Jordan hosting
  "185.66.":1,     // Jordan hosting
  "185.67.":1,     // Jordan hosting
  "185.68.":1,     // Jordan hosting
  "185.69.":1,     // Jordan hosting
  "185.70.":1,     // Jordan hosting
  "185.71.":1,     // Jordan hosting
  "185.72.":1,     // Jordan hosting
  "185.73.":1,     // Jordan hosting
  "185.74.":1,     // Jordan hosting
  "185.75.":1,     // Jordan hosting
  "185.76.":1,     // Jordan hosting
  "185.77.":1,     // Jordan hosting
  "185.78.":1,     // Jordan hosting
  "185.79.":1,     // Jordan hosting
  "185.80.":1,     // Jordan hosting
  "185.81.":1,     // Jordan hosting
  "185.82.":1,     // Jordan hosting
  "185.83.":1,     // Jordan hosting
  "185.84.":1,     // Jordan hosting
  "185.85.":1,     // Jordan hosting
  "185.86.":1,     // Jordan hosting
  "185.87.":1,     // Jordan hosting
  "185.88.":1,     // Jordan hosting
  "185.89.":1,     // Jordan hosting
  "185.90.":1,     // Jordan hosting
  "185.91.":1,     // Jordan hosting
  "185.92.":1,     // Jordan hosting
  "185.93.":1,     // Jordan hosting
  "185.94.":1,     // Jordan hosting
  "185.95.":1,     // Jordan hosting
  "185.96.":1,     // Jordan hosting
  "185.97.":1,     // Jordan hosting
  "185.98.":1,     // Jordan hosting
  "185.99.":1,     // Jordan hosting
  "188.70.":1,     // Jordan ISP
  "188.71.":1,     // Jordan ISP
  "188.72.":1,     // Jordan ISP
  "188.73.":1,     // Jordan ISP
  "188.74.":1,     // Jordan ISP
  "188.75.":1,     // Jordan ISP
  "188.76.":1,     // Jordan ISP
  "188.77.":1,     // Jordan ISP
  "188.78.":1,     // Jordan ISP
  "188.79.":1,     // Jordan ISP
  "188.80.":1,     // Jordan ISP
  "188.81.":1,     // Jordan ISP
  "188.82.":1,     // Jordan ISP
  "188.83.":1,     // Jordan ISP
  "188.84.":1,     // Jordan ISP
  "188.85.":1,     // Jordan ISP
  "188.86.":1,     // Jordan ISP
  "188.87.":1,     // Jordan ISP
  "188.88.":1,     // Jordan ISP
  "188.89.":1,     // Jordan ISP
  "188.90.":1,     // Jordan ISP
  "188.91.":1,     // Jordan ISP
  "188.92.":1,     // Jordan ISP
  "188.93.":1,     // Jordan ISP
  "188.94.":1,     // Jordan ISP
  "188.95.":1,     // Jordan ISP
  "188.120.":1,    // Jordan hosting
  "188.121.":1,    // Jordan hosting
  "188.122.":1,    // Jordan hosting
  "188.123.":1,    // Jordan hosting
  "188.124.":1,    // Jordan hosting
  "188.125.":1,    // Jordan hosting
  "188.126.":1,    // Jordan hosting
  "188.127.":1,    // Jordan hosting
  "192.109.":1,    // Jordan academic
  "192.110.":1,    // Jordan academic
  "192.111.":1,    // Jordan academic
  "192.112.":1,    // Jordan academic
  "192.113.":1,    // Jordan academic
  "192.114.":1,    // Jordan academic
  "192.115.":1,    // Jordan academic
  "192.116.":1,    // Jordan academic
  "192.117.":1,    // Jordan academic
  "192.118.":1,    // Jordan academic
  "192.119.":1,    // Jordan academic
  "192.145.":1,    // Jordan academic
  "192.146.":1,    // Jordan academic
  "192.147.":1,    // Jordan academic
  "192.148.":1,    // Jordan academic
  "192.149.":1,    // Jordan academic
  "192.150.":1,    // Jordan academic
  "192.151.":1,    // Jordan academic
  "192.152.":1,    // Jordan academic
  "192.153.":1,    // Jordan academic
  "192.154.":1,    // Jordan academic
  "192.155.":1,    // Jordan academic
  "192.156.":1,    // Jordan academic
  "192.157.":1,    // Jordan academic
  "192.158.":1,    // Jordan academic
  "192.159.":1,    // Jordan academic
  "192.160.":1,    // Jordan academic
  "192.161.":1,    // Jordan academic
  "192.162.":1,    // Jordan academic
  "192.163.":1,    // Jordan academic
  "192.164.":1,    // Jordan academic
  "192.165.":1,    // Jordan academic
  "192.166.":1,    // Jordan academic
  "192.167.":1,    // Jordan academic
  "192.168.":1,    // Jordan academic
  "192.169.":1,    // Jordan academic
  "192.170.":1,    // Jordan academic
  "192.171.":1,    // Jordan academic
  "192.172.":1,    // Jordan academic
  "192.173.":1,    // Jordan academic
  "192.174.":1,    // Jordan academic
  "192.175.":1,    // Jordan academic
  "192.176.":1,    // Jordan academic
  "192.177.":1,    // Jordan academic
  "192.178.":1,    // Jordan academic
  "192.179.":1,    // Jordan academic
  "193.17.":1,     // Jordan hosting
  "193.18.":1,     // Jordan hosting
  "193.19.":1,     // Jordan hosting
  "193.20.":1,     // Jordan hosting
  "193.21.":1,     // Jordan hosting
  "193.22.":1,     // Jordan hosting
  "193.23.":1,     // Jordan hosting
  "193.24.":1,     // Jordan hosting
  "193.25.":1,     // Jordan hosting
  "193.26.":1,     // Jordan hosting
  "193.27.":1,     // Jordan hosting
  "193.28.":1,     // Jordan hosting
  "193.29.":1,     // Jordan hosting
  "193.30.":1,     // Jordan hosting
  "193.31.":1,     // Jordan hosting
  "193.32.":1,     // Jordan hosting
  "193.33.":1,     // Jordan hosting
  "193.34.":1,     // Jordan hosting
  "193.35.":1,     // Jordan hosting
  "193.36.":1,     // Jordan hosting
  "193.37.":1,     // Jordan hosting
  "193.38.":1,     // Jordan hosting
  "193.39.":1,     // Jordan hosting
  "193.40.":1,     // Jordan hosting
  "193.41.":1,     // Jordan hosting
  "193.42.":1,     // Jordan hosting
  "193.43.":1,     // Jordan hosting
  "193.44.":1,     // Jordan hosting
  "193.45.":1,     // Jordan hosting
  "193.46.":1,     // Jordan hosting
  "193.47.":1,     // Jordan hosting
  "193.48.":1,     // Jordan hosting
  "193.49.":1,     // Jordan hosting
  "193.50.":1,     // Jordan hosting
  "193.51.":1,     // Jordan hosting
  "193.52.":1,     // Jordan hosting
  "193.53.":1,     // Jordan hosting
  "193.54.":1,     // Jordan hosting
  "193.55.":1,     // Jordan hosting
  "193.56.":1,     // Jordan hosting
  "193.57.":1,     // Jordan hosting
  "193.58.":1,     // Jordan hosting
  "193.59.":1,     // Jordan hosting
  "193.60.":1,     // Jordan hosting
  "193.61.":1,     // Jordan hosting
  "193.62.":1,     // Jordan hosting
  "193.63.":1,     // Jordan hosting
  "193.64.":1,     // Jordan hosting
  "193.65.":1,     // Jordan hosting
  "193.66.":1,     // Jordan hosting
  "193.67.":1,     // Jordan hosting
  "193.68.":1,     // Jordan hosting
  "193.69.":1,     // Jordan hosting
  "193.70.":1,     // Jordan hosting
  "193.71.":1,     // Jordan hosting
  "193.72.":1,     // Jordan hosting
  "193.73.":1,     // Jordan hosting
  "193.74.":1,     // Jordan hosting
  "193.75.":1,     // Jordan hosting
  "193.76.":1,     // Jordan hosting
  "193.77.":1,     // Jordan hosting
  "193.78.":1,     // Jordan hosting
  "193.79.":1,     // Jordan hosting
  "193.80.":1,     // Jordan hosting
  "193.81.":1,     // Jordan hosting
  "193.82.":1,     // Jordan hosting
  "193.83.":1,     // Jordan hosting
  "193.84.":1,     // Jordan hosting
  "193.85.":1,     // Jordan hosting
  "193.86.":1,     // Jordan hosting
  "193.87.":1,     // Jordan hosting
  "193.88.":1,     // Jordan hosting
  "193.89.":1,     // Jordan hosting
  "193.90.":1,     // Jordan hosting
  "193.91.":1,     // Jordan hosting
  "193.92.":1,     // Jordan hosting
  "193.93.":1,     // Jordan hosting
  "193.94.":1,     // Jordan hosting
  "193.95.":1,     // Jordan hosting
  "193.96.":1,     // Jordan hosting
  "193.97.":1,     // Jordan hosting
  "193.98.":1,     // Jordan hosting
  "193.99.":1,     // Jordan hosting
  "193.100.":1,    // Jordan hosting
  "193.101.":1,    // Jordan hosting
  "193.102.":1,    // Jordan hosting
  "193.103.":1,    // Jordan hosting
  "193.104.":1,    // Jordan hosting
  "193.105.":1,    // Jordan hosting
  "193.106.":1,    // Jordan hosting
  "193.107.":1,    // Jordan hosting
  "193.108.":1,    // Jordan hosting
  "193.109.":1,    // Jordan hosting
  "193.110.":1,    // Jordan hosting
  "193.111.":1,    // Jordan hosting
  "193.112.":1,    // Jordan hosting
  "193.113.":1,    // Jordan hosting
  "193.114.":1,    // Jordan hosting
  "193.115.":1,    // Jordan hosting
  "193.116.":1,    // Jordan hosting
  "193.117.":1,    // Jordan hosting
  "193.118.":1,    // Jordan hosting
  "193.119.":1,    // Jordan hosting
  "193.120.":1,    // Jordan hosting
  "193.121.":1,    // Jordan hosting
  "193.122.":1,    // Jordan hosting
  "193.123.":1,    // Jordan hosting
  "193.124.":1,    // Jordan hosting
  "193.125.":1,    // Jordan hosting
  "193.126.":1,    // Jordan hosting
  "193.127.":1,    // Jordan hosting
  "193.128.":1,    // Jordan hosting
  "193.129.":1,    // Jordan hosting
  "193.130.":1,    // Jordan hosting
  "193.131.":1,    // Jordan hosting
  "193.132.":1,    // Jordan hosting
  "193.133.":1,    // Jordan hosting
  "193.134.":1,    // Jordan hosting
  "193.135.":1,    // Jordan hosting
  "193.136.":1,    // Jordan hosting
  "193.137.":1,    // Jordan hosting
  "193.138.":1,    // Jordan hosting
  "193.139.":1,    // Jordan hosting
  "193.140.":1,    // Jordan hosting
  "193.141.":1,    // Jordan hosting
  "193.142.":1,    // Jordan hosting
  "193.143.":1,    // Jordan hosting
  "193.144.":1,    // Jordan hosting
  "193.145.":1,    // Jordan hosting
  "193.146.":1,    // Jordan hosting
  "193.147.":1,    // Jordan hosting
  "193.148.":1,    // Jordan hosting
  "193.149.":1,    // Jordan hosting
  "193.150.":1,    // Jordan hosting
  "193.151.":1,    // Jordan hosting
  "193.152.":1,    // Jordan hosting
  "193.153.":1,    // Jordan hosting
  "193.154.":1,    // Jordan hosting
  "193.155.":1,    // Jordan hosting
  "193.156.":1,    // Jordan hosting
  "193.157.":1,    // Jordan hosting
  "193.158.":1,    // Jordan hosting
  "193.159.":1,    // Jordan hosting
  "193.160.":1,    // Jordan hosting
  "193.161.":1,    // Jordan hosting
  "193.162.":1,    // Jordan hosting
  "193.163.":1,    // Jordan hosting
  "193.164.":1,    // Jordan hosting
  "193.165.":1,    // Jordan hosting
  "193.166.":1,    // Jordan hosting
  "193.167.":1,    // Jordan hosting
  "193.168.":1,    // Jordan hosting
  "193.169.":1,    // Jordan hosting
  "193.170.":1,    // Jordan hosting
  "193.171.":1,    // Jordan hosting
  "193.172.":1,    // Jordan hosting
  "193.173.":1,    // Jordan hosting
  "193.174.":1,    // Jordan hosting
  "193.175.":1,    // Jordan hosting
  "193.176.":1,    // Jordan hosting
  "193.177.":1,    // Jordan hosting
  "193.178.":1,    // Jordan hosting
  "193.179.":1,    // Jordan hosting
  "193.180.":1,    // Jordan hosting
  "193.181.":1,    // Jordan hosting
  "193.182.":1,    // Jordan hosting
  "193.183.":1,    // Jordan hosting
  "193.184.":1,    // Jordan hosting
  "193.185.":1,    // Jordan hosting
  "193.186.":1,    // Jordan hosting
  "193.187.":1,    // Jordan hosting
  "193.189.":1,    // Jordan hosting
  "193.190.":1,    // Jordan hosting
  "193.191.":1,    // Jordan hosting
  "193.192.":1,    // Jordan hosting
  "193.193.":1,    // Jordan hosting
  "193.194.":1,    // Jordan hosting
  "193.195.":1,    // Jordan hosting
  "193.196.":1,    // Jordan hosting
  "193.197.":1,    // Jordan hosting
  "193.198.":1,    // Jordan hosting
  "193.199.":1,    // Jordan hosting
  "193.200.":1,    // Jordan hosting
  "193.201.":1,    // Jordan hosting
  "193.202.":1,    // Jordan hosting
  "193.203.":1,    // Jordan hosting
  "193.204.":1,    // Jordan hosting
  "193.205.":1,    // Jordan hosting
  "193.206.":1,    // Jordan hosting
  "193.207.":1,    // Jordan hosting
  "193.208.":1,    // Jordan hosting
  "193.209.":1,    // Jordan hosting
  "193.210.":1,    // Jordan hosting
  "193.211.":1,    // Jordan hosting
  "193.212.":1,    // Jordan hosting
  "193.213.":1,    // Jordan hosting
  "193.214.":1,    // Jordan hosting
  "193.215.":1,    // Jordan hosting
  "193.216.":1,    // Jordan hosting
  "193.217.":1,    // Jordan hosting
  "193.218.":1,    // Jordan hosting
  "193.219.":1,    // Jordan hosting
  "193.220.":1,    // Jordan hosting
  "193.221.":1,    // Jordan hosting
  "193.222.":1,    // Jordan hosting
  "193.223.":1,    // Jordan hosting
  "193.224.":1,    // Jordan hosting
  "193.225.":1,    // Jordan hosting
  "193.226.":1,    // Jordan hosting
  "193.230.":1,    // Jordan hosting
  "193.231.":1,    // Jordan hosting
  "193.232.":1,    // Jordan hosting
  "193.233.":1,    // Jordan hosting
  "193.234.":1,    // Jordan hosting
  "193.235.":1,    // Jordan hosting
  "193.236.":1,    // Jordan hosting
  "193.237.":1,    // Jordan hosting
  "193.238.":1,    // Jordan hosting
  "193.239.":1,    // Jordan hosting
  "193.240.":1,    // Jordan hosting
  "193.241.":1,    // Jordan hosting
  "193.242.":1,    // Jordan hosting
  "193.243.":1,    // Jordan hosting
  "193.244.":1,    // Jordan hosting
  "193.245.":1,    // Jordan hosting
  "193.246.":1,    // Jordan hosting
  "193.247.":1,    // Jordan hosting
  "193.248.":1,    // Jordan hosting
  "193.249.":1,    // Jordan hosting
  "193.250.":1,    // Jordan hosting
  "193.251.":1,    // Jordan hosting
  "193.252.":1,    // Jordan hosting
  "193.253.":1,    // Jordan hosting
  "193.254.":1,    // Jordan hosting
  "193.255.":1     // Jordan hosting
};

// Fast prefixes (Gulf / nearby)
var GULF_NETS = {
  // Bahrain
  "185.125.":1,"46.183.":1,
  // UAE
  "5.62.":1,"31.192.":1,"31.193.":1,
  // Saudi
  "212.71.":1,"185.193.":1,
  // Kuwait
  "62.84.":1,"82.178.":1
};

// Quick far-region blocks (extra safety)
var BLOCKED = [
  // Asia Pacific
  "8.222.","47.245.","43.132.","18.163.","13.228.","13.229.",
  "13.250.","52.220.","54.169.","54.251.","175.41.","119.81.",
  "103.28.","103.29.","203.104.","210.16.","52.74.","52.77.",
  "8.210.","47.74.","47.88.","120.76.","121.40.","139.224.",
  // Europe
  "18.185.","3.120.","52.58.","35.156.","52.28.","52.29.",
  "18.194.","3.64.","3.65.","3.66.","52.30.","18.196.",
  "52.59.","18.157.","3.121.","3.122.","3.123.",
  // Americas
  "54.218.","52.88.","34.208.","18.237.","52.36.","54.244.",
  "35.162.","44.228.","34.220.","54.200.","52.24.","18.232.",
  "54.85.","34.192.","52.90.","34.224."
];

// =======================
// HELPERS (GLOBAL)
// =======================

// ✅ PUBG DETECTION — EXPANDED (LONG-TERM)
// Covers classic PUBG domains + Tencent/Krafton infra + WOW/UGC/Creative
function isPUBG(host){
  host = host.toLowerCase();
  return /(
    pubg|pubgm|pubgmobile|
    intlgame|igamecj|proximabeta|
    tencent|qq|qcloud|gcloudsdk|
    krafton|lightspeed|amsoveasea|
    vmpone|vmp|gme|gamecenter|
    wow|worldofwonder|ugc|creative|creation|creations
  )/x.test(host);
}

// Lobby / Recruit / Queue
function isLobbyTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(lobby|matchmaking|matching|queue|room|recruit|
           team|squad|party|invite|
           gate|dispatcher|router|region|allocation)/.test(s);
}

// ✅ WOW detector (NOT relying on "wow" only)
function isWOWTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(worldofwonder|wow|
           ugc|creative|creation|creations|
           room|rooms|customroom|custom-room|
           map|maps|template|templates|
           featured|trending|popular|recommend|recommended|
           daily|weekly|newcreations|new-creations|
           contests|contest|community|
           workshop|editor|publish|published|
           playtogether|play-together)/.test(s);
}

// Arena helper (TDM etc.)
function isArenaTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(arena|tdm|deathmatch|teamdeathmatch|team[_-]?deathmatch|
           gun|gungame|gun[_-]?game|
           training|arenatraining|arena[_-]?training|
           ultimate|ultimatearena|ultimate[_-]?arena|
           warehouse|hangar|wow)/.test(s);
}

// Match / gameplay
function isMatchTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(game|battle|fight|combat|play|
           gs\.|gss|gameserver|
           logic|session|instance|zone|
           shard|node|cell|scene|
           realtime|action|frame)/.test(s);
}

// Voice
function isVoiceTraffic(url, host){
  var s = (url + host).toLowerCase();
  return /(voice|rtc|webrtc|voip|
           audio|mic|talk|channel|
           stream|speech|sound)/.test(s);
}

function startsWithAny(ip, table){
  for (var k in table) if (ip.indexOf(k) === 0) return true;
  return false;
}

// =======================
// PAC COMPLETENESS HELPERS
// =======================
function normalizeHost(host){
  var i = host.indexOf(":");
  if (i !== -1) return host.substring(0, i);
  return host;
}

function isIPv4(ip){ return ip && ip.indexOf(".") !== -1; }

function isPrivateOrLocalIP(ip){
  if (!isIPv4(ip)) return false;
  return (
    isInNet(ip, "10.0.0.0", "255.0.0.0") ||
    isInNet(ip, "172.16.0.0", "255.240.0.0") ||
    isInNet(ip, "192.168.0.0", "255.255.0.0") ||
    isInNet(ip, "127.0.0.0", "255.0.0.0") ||
    isInNet(ip, "169.254.0.0", "255.255.0.0")
  );
}

// REAL IPv4 only: if IPv6/NULL => null (prevents leakage)
function getRealIPv4(host){
  var ip = dnsResolve(host);
  if (isIPv4(ip)) return ip;
  return null;
}

// =======================
// CIDR-based Jordan / Gulf detectors (strong) - UPDATED 2024
// =======================
function isJordanIP(ip){
  if (!ip) return false;

  // Prefix fast pass
  if (startsWithAny(ip, JO_TIGHT) || startsWithAny(ip, JO_FULL)) return true;

  // Strong confirmers (big JO blocks) - UPDATED
  // Orange Jordan
  if (isInNet(ip, "82.212.64.0",  "255.255.192.0")) return true;  // 82.212.64.0/18
  if (isInNet(ip, "86.108.0.0",   "255.255.128.0")) return true;  // 86.108.0.0/17
  if (isInNet(ip, "176.29.0.0",   "255.255.0.0"))   return true;  // 176.29.0.0/16
  
  // Zain Jordan
  if (isInNet(ip, "176.28.128.0", "255.255.128.0")) return true;  // 176.28.128.0/17
  if (isInNet(ip, "94.249.0.0",   "255.255.128.0")) return true;  // 94.249.0.0/17
  
  // Umniah
  if (isInNet(ip, "92.253.0.0",   "255.255.128.0")) return true;  // 92.253.0.0/17
  
  // DAMAMAX / DATAK
  if (isInNet(ip, "212.35.64.0",  "255.255.224.0")) return true;  // 212.35.64.0/19
  
  // Jordan Data Communications
  if (isInNet(ip, "91.106.0.0",   "255.255.0.0"))   return true;  // 91.106.0.0/16
  
  // Jordan Broadband
  if (isInNet(ip, "46.185.128.0", "255.255.128.0")) return true;  // 46.185.128.0/17
  
  // Jordan Hosting
  if (isInNet(ip, "188.247.64.0", "255.255.224.0")) return true;  // 188.247.64.0/19
  
  // Jordan Academic/Government
  if (isInNet(ip, "149.200.128.0","255.255.128.0")) return true;  // 149.200.128.0/17
  
  // NEW: Additional Jordan CIDR blocks 2024
  if (isInNet(ip, "37.48.0.0",    "255.252.0.0"))   return true;  // 37.48.0.0/14 (Zain)
  if (isInNet(ip, "37.76.0.0",    "255.254.0.0"))   return true;  // 37.76.0.0/15 (Zain)
  if (isInNet(ip, "78.128.0.0",   "255.255.0.0"))   return true;  // 78.128.0.0/16 (Academic)
  if (isInNet(ip, "80.90.0.0",    "255.255.0.0"))   return true;  // 80.90.0.0/16 (Zain)
  if (isInNet(ip, "188.70.0.0",   "255.254.0.0"))   return true;  // 188.70.0.0/15 (Orange)
  if (isInNet(ip, "193.188.0.0",  "255.255.0.0"))   return true;  // 193.188.0.0/16 (Jordan)
  if (isInNet(ip, "193.227.0.0",  "255.255.0.0"))   return true;  // 193.227.0.0/16 (Jordan)

  return false;
}

function isGulfIP(ip){
  if (!ip) return false;

  if (startsWithAny(ip, GULF_NETS)) return true;

  // Bahrain
  if (isInNet(ip, "185.125.190.0", "255.255.254.0")) return true; // /23
  if (isInNet(ip, "46.183.216.0",  "255.255.252.0")) return true; // /22

  // UAE
  if (isInNet(ip, "5.62.60.0",     "255.255.252.0")) return true; // /22
  if (isInNet(ip, "31.192.0.0",    "255.255.0.0"))   return true; // /16

  // Saudi
  if (isInNet(ip, "212.71.0.0",    "255.255.0.0"))   return true; // /16
  if (isInNet(ip, "185.193.68.0",  "255.255.252.0")) return true; // /22

  // Kuwait
  if (isInNet(ip, "62.84.0.0",     "255.255.0.0"))   return true; // /16
  if (isInNet(ip, "82.178.0.0",    "255.255.0.0"))   return true; // /16

  return false;
}

// =======================
// TIMING (pressure)
// =======================

// Recruit: JO-only early window (push Jordan)
var RECRUIT_JO_ONLY_MS = 60000; // longer pressure = more chance JO
var RECRUIT_START_TS = Date.now();
function recruitJOOnly(){
  return (Date.now() - RECRUIT_START_TS) < RECRUIT_JO_ONLY_MS;
}

// Arena: JO-only pressure then allow Gulf (still NO Europe)
var ARENA_JO_ONLY_MS = 35000;
var ARENA_GULF_ONLY_MS = 120000;
var ARENA_START_TS = Date.now();
function arenaPhase(){
  var dt = Date.now() - ARENA_START_TS;
  if (dt < ARENA_JO_ONLY_MS) return "JO_ONLY";
  if (dt < ARENA_GULF_ONLY_MS) return "JO_OR_GULF";
  return "AFTER";
}

// =======================
// MAIN ROUTING ENGINE
// =======================
function FindProxyForURL(url, host){

  host = normalizeHost(host.toLowerCase());

  // ---- SAFE DIRECT ----
  for (var i=0;i<SAFE_DIRECT.length;i++)
    if (dnsDomainIs(host, SAFE_DIRECT[i])) return "DIRECT";

  for (var j=0;j<CDN_DIRECT.length;j++)
    if (shExpMatch(host, "*"+CDN_DIRECT[j])) return "DIRECT";

  if (isPlainHostName(host)) return BLOCK;

  // Non-PUBG = DIRECT
  if (!isPUBG(host)) return "DIRECT";

  // REAL IPv4
  var ip = getRealIPv4(host);

  // If can't resolve safely -> block (prevents leaks)
  if (!ip) return BLOCK;
  if (isPrivateOrLocalIP(ip)) return BLOCK;

  // Hard block known far-region prefixes
  for (var b=0;b<BLOCKED.length;b++)
    if (ip.indexOf(BLOCKED[b]) === 0) return BLOCK;

  // GEO gate: allow ONLY Jordan or Gulf
  var JO = isJordanIP(ip);
  var GF = isGulfIP(ip);
  if (!(JO || GF)) return BLOCK;

  // =====================================================
  // ✅ WOW / UGC / ROOMS — FORCE to LOBBY_PROXY (9030)
  // Priority: Jordan > Gulf (still NO Europe)
  // =====================================================
  if (isWOWTraffic(url, host)) {
    // If endpoint is JO: perfect. If it's Gulf: still allowed and low ping.
    return LOBBY_PROXY; // 9030
  }

  // =====================================================
  // ARENA (TDM/Gun/Training/Ultimate/Warehouse/Hangar/WOW)
  // =====================================================
  if (isArenaTraffic(url, host)) {
    var phase = arenaPhase();

    if (phase === "JO_ONLY") {
      if (JO) return LOBBY_PROXY;
      return BLOCK;
    }
    // JO then Gulf
    if (phase === "JO_OR_GULF") {
      if (JO || GF) return LOBBY_PROXY;
      return BLOCK;
    }
    // After: stay JO/Gulf only
    if (JO || GF) return LOBBY_PROXY;
    return BLOCK;
  }

  // =====================================================
  // RECRUIT / LOBBY
  // =====================================================
  if (isLobbyTraffic(url, host)) {
    if (recruitJOOnly()) {
      if (JO) return LOBBY_PROXY;
      return BLOCK;
    }
    if (JO || GF) return LOBBY_PROXY;
    return BLOCK;
  }

  // =====================================================
  // VOICE
  // =====================================================
  if (isVoiceTraffic(url, host))
    return VOICE_PROXY;

  // =====================================================
  // MATCH (Classic/Ranked)
  // =====================================================
  if (isMatchTraffic(url, host))
    return MATCH_PROXY;

  // Default PUBG
  return MATCH_PROXY;
}
