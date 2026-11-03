import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui charts — accessible charts with motion, built with TanStack Charts";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Charts",
    title: "Chart examples",
    description: "Built on TanStack Charts. Copy the source into your app.",
    meta: "TanStack Charts",
    accent: ogColors.amber,
  });
}
