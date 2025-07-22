/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your original settings
  reactStrictMode: true,
  swcMinify: true,

  // Your images configuration, all in one place
  images: {
    // I've removed the duplicate domain names for you
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
      'eu-central-1.graphassets.com',
    ],
    // Re-adding the settings to allow SVGs securely
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;