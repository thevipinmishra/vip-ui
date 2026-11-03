import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui themes — ten themes made from the vip/ui color scales";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Themes",
    title: "Ten themes",
    description: "For vip/ui and shadcn/ui. Copy the CSS into your project.",
    meta: "10 themes",
    accent: ogColors.amber,
  });
}
