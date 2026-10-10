import type { MetadataRoute } from "next";
import { blockCategories } from "@/lib/blocks";
import { catalogComponents } from "@/lib/catalog";
import { siteUrl } from "@/lib/site-url";

const staticRoutes = [
  { path: "", priority: 1 },
  { path: "/components", priority: 0.9 },
  { path: "/components/installation", priority: 0.9 },
  { path: "/components/react-aria", priority: 0.8 },
  { path: "/themes", priority: 0.8 },
  { path: "/charts", priority: 0.8 },
  { path: "/blocks", priority: 0.8 },
  { path: "/license", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route.path}`,
      changeFrequency: "weekly" as const,
      priority: route.priority,
    })),
    ...catalogComponents.map((component) => ({
      url: `${base}/components/${component.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blockCategories.map((category) => ({
      url: `${base}/blocks/${category.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
