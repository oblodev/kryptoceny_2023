/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
module.exports = {
  images: {
    domains: [
      "assets.coingecko.com",
      "media.graphassets.com",
      "cdn.coinranking.com",
      "assets.coingecko.com",
      "cdn.benchmark.pl",
      "galeria.bankier.pl",
      "tvn24.pl",
      "img.joemonster.org",
      "antyweb.pl",
      "m.natemat.pl",
    ],
  },
};
