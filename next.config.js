/** @type {import('next').NextConfig} */
const isProd = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  basePath: isProd ? '/identityv-guide' : '',
  assetPrefix: isProd ? '/identityv-guide/' : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? '/identityv-guide' : '',
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
