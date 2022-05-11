/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': `${__dirname}/components`,
      '@styles': `${__dirname}/styles`,
    };
    return config;
  },
};

module.exports = nextConfig;
