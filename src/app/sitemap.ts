import type { MetadataRoute } from "next";
import { catalogComponents } from "@/lib/catalog";
import { docsGuides } from "@/lib/navigation";
import { siteUrl } from "@/lib/site-url";

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]["changeFrequency"]
>;

interface SitemapRoute {
  path: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

const staticRoutes: SitemapRoute[] = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/components", changeFrequency: "weekly", priority: 0.9 },
  ...docsGuides.map(
    (guide): SitemapRoute => ({
      path: guide.href,
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  ),
  { path: "/themes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/colors", changeFrequency: "monthly", priority: 0.8 },
  { path: "/charts", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blocks", changeFrequency: "weekly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const absolute = (path: string) =>
    path ? `${base}/${path.replace(/^\/+/, "")}` : base;

  return [
    ...staticRoutes.map((route) => ({
      url: absolute(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...catalogComponents.map((component) => ({
      url: absolute(`/components/${component.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
