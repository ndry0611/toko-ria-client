import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/public/uploads/**',
        port: '8080',
      },
      {
        protocol: 'https',
        hostname: 'toko-ria-server-production.up.railway.app',
        pathname: '/public/uploads/**',
      }
    ],
  },
};

export default withVanillaExtract(nextConfig);
