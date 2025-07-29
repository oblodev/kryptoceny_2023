/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    // Only the domains you actually use
    domains: [
      "assets.coingecko.com",
      "media.graphassets.com",
      "cdn.coinranking.com",
      "cdn.benchmark.pl",
      "galeria.bankier.pl",
      "tvn24.pl",
      "img.joemonster.org",
      "antyweb.pl",
      "m.natemat.pl",
      "coin-images.coingecko.com",
      "eu-central-1.graphassets.com",
    ],

    // Secure SVG support
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    // ——————————————
    // CACHE & TRANSFORMATION TUNING
    // ——————————————

    // Keep each transformed image in cache for 31 days
    minimumCacheTTL: 2678400,

    // Only output WebP (removes AVIF duplicates)
    formats: ["image/webp"],

    // Restrict to the widths your UI actually uses
    deviceSizes: [320, 640, 1024],    // for responsive <Image> breakpoints
    imageSizes: [16, 32, 48],         // for icon‑sized <Image> uses

    // If you want even tighter control than domains:
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "assets.coingecko.com",
    //     port: "",
    //     pathname: "/**",
    //   },
    //   // …add only the patterns you truly need
    // ],

    // For any static‐imported images (in /public or imported via ES modules),
    // Next.js will automatically serve them with long‐term caching.
  },
};

module.exports = nextConfig;
