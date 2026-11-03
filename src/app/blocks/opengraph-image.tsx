import { blockCategories, blocks } from "@/lib/blocks";
import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui blocks — complete page sections built with accessible React components";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Blocks",
    title: "Complete page sections, ready to adapt",
    description:
      "Full product screens built with vip/ui. Add a block to your app, then change it to suit your product.",
    meta: `${blocks.length} blocks / ${blockCategories.length} categories`,
    accent: ogColors.amber,
  });
}
