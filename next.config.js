/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@svg': `${__dirname}/components/assets/svg`,
      '@interfaces/*': `${__dirname}/types/interfaces`,
    };
    return config;
  },
};

module.exports = nextConfig;
