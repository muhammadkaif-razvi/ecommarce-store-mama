import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Ensures Node.js runtime, not Edge
  images: {
    domains: ["static.vecteezy.com",],
  },
  experimental: {
    serverActions: { bodySizeLimit: "2mb" }, // Optional
  },
};

export default nextConfig;
