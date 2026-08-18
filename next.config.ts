import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "aqib-xyz.stackstaging.com",
      },
      {
        protocol: "https",
        hostname: "aqib-xyz.stackstaging.com",
      },
      {
        protocol: "http",
        hostname: "blogitems.local",
      },
      {
        protocol: "http",
        hostname: "localhost",
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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/hello-world",
        destination: "/",
        permanent: true,
      },
      {
        source: "/hello-world/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/courses",
        destination: "/",
        permanent: true,
      },
      {
        source: "/courses/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2021/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2022/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2023/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2024/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/2025/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;