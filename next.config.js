/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': `${__dirname}/components`,
      '@styles': `${__dirname}/styles`,
      '@svg': `${__dirname}/assets/svg`,
      '@interfaces/*': `${__dirname}/types/interfaces`,
    };
    return config;
  },
};

module.exports = nextConfig;
