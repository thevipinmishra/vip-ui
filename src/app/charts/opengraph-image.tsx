import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui charts — accessible charts with motion, built with TanStack Charts";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Charts",
    title: "Accessible charts, with motion built in",
    description:
      "Built with TanStack Charts. Copy the source, then make the chart yours.",
    meta: "TanStack Charts",
    accent: ogColors.amber,
  });
}
