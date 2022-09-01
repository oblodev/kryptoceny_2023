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
    ],
  },
};
