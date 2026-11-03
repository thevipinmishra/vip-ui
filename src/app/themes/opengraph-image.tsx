import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui themes — ten themes made from the vip/ui color scales";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "Themes",
    title: "Ten themes, one system",
    description:
      "Live previews on real product screens. Copy the CSS into any shadcn/ui project.",
    meta: "10 themes",
    accent: ogColors.amber,
  });
}
