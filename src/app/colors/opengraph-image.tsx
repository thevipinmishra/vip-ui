import { ogColors, ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui colors — ten OKLCH color scales with twelve steps each";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    eyebrow: "Colors",
    title: "Ten scales. Twelve steps each.",
    description:
      "Light and dark values for every step. Every scale passes the same contrast checks.",
    meta: "OKLCH / 12 steps",
    accent: ogColors.teal,
  });
}
