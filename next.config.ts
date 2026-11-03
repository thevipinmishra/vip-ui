import type { NextConfig } from "next";
import blocksCatalog from "./src/lib/blocks.json";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@phosphor-icons/react/ssr",
    ],
  },
  compress: process.env.NODE_ENV !== "development",
  async redirects() {
    return [
      ...blocksCatalog.categories.map((category) => ({
        source: `/blocks/${category.slug}`,
        destination: `/blocks?category=${category.slug}`,
        permanent: true,
      })),
      {
        source: "/components/chart",
        destination: "/charts#documentation",
        permanent: true,
      },
      {
        source: "/components/drawer",
        destination: "/components/sheet",
        permanent: true,
      },
      {
        source: "/examples/:path*",
        destination: "/blocks",
        permanent: true,
      },
      {
        source: "/r/vip-drawer.json",
        destination: "/r/vip-sheet.json",
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
