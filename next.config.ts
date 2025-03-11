import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        pathname: "/**", // Allow all paths under this domain
      },
    ],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Optional: Increase body size limit for Server Actions
    },
    typedRoutes: true, // Optional: Enable type-safe routes
  },

  // ESLint configuration (optional)
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
};

export default nextConfig;