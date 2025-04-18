import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  images: {
    domains: ['res.cloudinary.com','www.bing.com','static.vecteezy.com'],
  },

  // Experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb", // Optional: Increase body size limit for Server Actions
    },
 
  },

 
};

export default nextConfig;