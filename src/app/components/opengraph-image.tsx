import { catalogComponents } from "@/lib/catalog";
import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui components — accessible React components with live examples and API reference";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Components",
    title: "Accessible React components",
    description: "Examples, source, and an API reference for each.",
    meta: `${catalogComponents.length} components`,
    accent: ogColors.teal,
  });
}
