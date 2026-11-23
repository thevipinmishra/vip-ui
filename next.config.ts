import type { NextConfig } from "next";
import blocksCatalog from "./src/lib/blocks.json";

const deployOrigin =
  process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    BUILD_DATE: new Date().toISOString().slice(0, 10),
    NEXT_PUBLIC_DEPLOY_ORIGIN: deployOrigin,
  },
  experimental: {
    optimizePackageImports: [
      "@phosphor-icons/react",
      "@phosphor-icons/react/ssr",
    ],
  },
  compress: process.env.NODE_ENV !== "development",
  outputFileTracingIncludes: {
    "/og": [
      "./node_modules/geist/dist/fonts/geist-sans/Geist-Regular.ttf",
      "./node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.ttf",
    ],
  },
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
        source: "/components/motion",
        destination: "/components/styling",
        permanent: true,
      },
      {
        source: "/components/from-shadcn",
        destination: "/components/installation",
        permanent: true,
      },
      {
        source: "/components/ai-and-mcp/:path*",
        destination: "/components/agents",
        permanent: true,
      },
      {
        source: "/components/typography",
        destination: "/typography",
        permanent: true,
      },
      {
        source: "/components/updating",
        destination: "/components/installation#update",
        permanent: true,
      },
      {
        source: "/examples/:path*",
        destination: "/blocks",
        permanent: true,
      },
      {
        source: "/components/password-strength-meter",
        destination: "/components/password-field",
        permanent: true,
      },
      {
        source: "/components/password-strength-meter.md",
        destination: "/components/password-field.md",
        permanent: true,
      },
      {
        source: "/components/password-strength-meter/markdown",
        destination: "/components/password-field/markdown",
        permanent: true,
      },
      {
        source: "/license",
        destination:
          "https://github.com/thevipinmishra/vip-ui/blob/main/LICENSE",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const beforeFiles = deployOrigin
      ? [{ source: "/r/:item.json", destination: "/api/r/:item" }]
      : [];
    const afterFiles = [
      {
        source: "/components/:slug.md",
        destination: "/components/:slug/markdown",
      },
      {
        source: "/blocks/:block.md",
        destination: "/api/blocks/:block/markdown",
      },
      {
        source: "/charts.md",
        destination: "/charts/markdown",
      },
      {
        source: "/typography.md",
        destination: "/typography/markdown",
      },
      {
        source: "/themes.md",
        destination: "/themes/markdown",
      },
    ];
    return { beforeFiles, afterFiles };
  },
  async headers() {
    const robotsTag = (value: string) => [{ key: "X-Robots-Tag", value }];
    return [
      {
        source: "/r/:path*",
        headers: [
          ...robotsTag("noindex, nofollow"),
          {
            key: "Cache-Control",
            value:
              "public, max-age=0, must-revalidate, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
      {
        source: "/components/:slug/markdown",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/components/:slug.md",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/api/blocks/:name/markdown",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/blocks/:block.md",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/charts/markdown",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/charts.md",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/typography/markdown",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/typography.md",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/themes/markdown",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/themes.md",
        headers: robotsTag("noindex, nofollow"),
      },
      {
        source: "/llms.txt",
        headers: robotsTag("noindex"),
      },
      {
        source: "/og",
        headers: robotsTag("noindex"),
      },
    ];
  },
};

export default nextConfig;
