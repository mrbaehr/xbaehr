/** @type {import('next').NextConfig} */
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

const nextConfig = {
  output: 'export',
  basePath: isCustomDomain ? '' : '/xbaehr',
  trailingSlash: true,
};

module.exports = nextConfig;
