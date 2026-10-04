import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Next's dev compression can retain drain listeners on its Gzip stream
  // while streaming React responses. Keep gzip enabled in production.
  compress: process.env.NODE_ENV !== "development",
  async redirects() {
    return [
      {
        source: "/components/chart",
        destination: "/charts#documentation",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/components/:slug.md",
        destination: "/components/:slug/markdown",
      },
    ];
  },
};

export default nextConfig;
