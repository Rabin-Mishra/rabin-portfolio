import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // TypeScript strict checking is enabled in tsconfig.json
    // We ignore unused vars / imports according to the requirements
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
