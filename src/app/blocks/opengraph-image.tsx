import { blockCategories, blocks } from "@/lib/blocks";
import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui blocks — complete page sections built with accessible React components";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Blocks",
    title: "Full pages built with vip/ui",
    description: "Copy them into your app.",
    meta: `${blocks.length} blocks / ${blockCategories.length} categories`,
    accent: ogColors.amber,
  });
}
