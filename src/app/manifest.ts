import type { MetadataRoute } from "next";
import { site, themeColor } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: themeColor.light,
    theme_color: themeColor.light,
    lang: "en",
    categories: ["developer", "design"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
        purpose: "any",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
