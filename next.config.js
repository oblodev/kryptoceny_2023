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
  },
};

module.exports = nextConfig;
