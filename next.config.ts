import type { NextConfig } from "next";
import blocksCatalog from "./src/lib/blocks.json";
import docGroups from "./src/lib/doc-groups.json";

const docAliasRedirects = docGroups.groups.flatMap((group) =>
  group.members
    .filter((member) => member !== group.slug)
    .flatMap((member) => [
      {
        source: `/components/${member}`,
        destination: `/components/${group.slug}#${member}`,
        permanent: true,
      },
      {
        source: `/components/${member}.md`,
        destination: `/components/${group.slug}.md`,
        permanent: true,
      },
      {
        source: `/components/${member}/markdown`,
        destination: `/components/${group.slug}/markdown`,
        permanent: true,
      },
    ]),
);

const nextConfig: NextConfig = {
  reactCompiler: true,
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
      ...docAliasRedirects,
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
        source: "/r/vip-password-strength-meter.json",
        destination: "/r/vip-password-field.json",
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
    return [
      {
        source: "/components/:slug.md",
        destination: "/components/:slug/markdown",
      },
    ];
  },
  async headers() {
    const robotsTag = (value: string) => [{ key: "X-Robots-Tag", value }];
    return [
      {
        source: "/r/:path*",
        headers: robotsTag("noindex, nofollow"),
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
