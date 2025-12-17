import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    taint: true,
  },
  images: {
    // Use unoptimized for development with localhost Strapi
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  // Allow dev origins for cross-origin requests
  allowedDevOrigins: ['localhost', '127.0.0.1', '172.22.160.1'],
};

export default nextConfig;
