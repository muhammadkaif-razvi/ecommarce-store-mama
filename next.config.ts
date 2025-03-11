import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
        pathname: "/**",
      },
    ],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Optional: Increase body size limit for Server Actions
    },
 
  },

  // ESLint configuration (optional)
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
};

export default nextConfig;