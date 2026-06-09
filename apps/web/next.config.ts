import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents:true,
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
