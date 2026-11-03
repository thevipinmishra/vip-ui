import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Machine endpoints and raw mirrors are not search landing pages.
      disallow: [
        "/api/",
        "/r/",
        "/og",
        "/components/*/markdown",
        "/components/*.md",
      ],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
