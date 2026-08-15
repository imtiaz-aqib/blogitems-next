import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "blogitems.local",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "aqib-xyz.stackstaging.com",
      },
      {
        protocol: "https",
        hostname: "aqib-xyz.stackstaging.com",
      },
      {
        protocol: "https",
        hostname: "blogitems.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;