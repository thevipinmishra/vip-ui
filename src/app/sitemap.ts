import type { MetadataRoute } from "next";
import { catalogComponents } from "@/lib/catalog";
import { siteUrl } from "@/lib/site-url";

const staticRoutes = [
  { path: "", priority: 1 },
  { path: "/components", priority: 0.9 },
  { path: "/components/installation", priority: 0.9 },
  { path: "/themes", priority: 0.8 },
  { path: "/charts", priority: 0.8 },
  { path: "/examples", priority: 0.7 },
  { path: "/license", priority: 0.3 },
];

const exampleRoutes = [
  "/examples/repository",
  "/examples/repository/issues",
  "/examples/repository/pulls",
  "/examples/repository/commits",
  "/examples/repository/releases",
  "/examples/repository/contributors",
  "/examples/business",
  "/examples/business/customers",
  "/examples/business/subscriptions",
  "/examples/business/invoices",
  "/examples/business/payments",
  "/examples/business/reports",
  "/examples/business/settings",
  "/examples/chat",
  "/examples/studio",
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
    ...exampleRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
