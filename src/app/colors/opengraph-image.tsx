import { ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui colors — accessible OKLCH color scales for light and dark mode";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    label: "Colors",
    title: "Color, with every detail considered.",
    description: "Accessible OKLCH color scales for light and dark mode.",
    art: "scale",
  });
}
