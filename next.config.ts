import type { NextConfig } from "next";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com data:;
  img-src 'self' data: blob: https://aqib-xyz.stackstaging.com https://blogitems.com https://www.blogitems.com https://images.unsplash.com https://assets.lottiefiles.com;
  connect-src 'self' https://aqib-xyz.stackstaging.com https://api.resend.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.upstash.io;
  worker-src 'self' blob:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`.replace(/\s{2,}/g, " ").trim();

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
        hostname: "www.blogitems.com",
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
            key: "Content-Security-Policy",
            value: cspHeader,
          },
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
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/journal",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/journal/:path*",
        destination: "/blog/:path*",
        permanent: true,
      },
      {
        source: "/posts",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/posts/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
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