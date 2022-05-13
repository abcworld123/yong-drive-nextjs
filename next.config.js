/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@svg': `${__dirname}/assets/svg`,
      '@interfaces/*': `${__dirname}/types/interfaces`,
    };
    return config;
  },
};

module.exports = nextConfig;
