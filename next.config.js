/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/toolhive',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
