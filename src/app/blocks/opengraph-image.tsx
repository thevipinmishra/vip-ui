import { ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui blocks — complete pages built with accessible React components";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    label: "Blocks",
    title: "From components to complete experiences.",
    description:
      "Full pages and sections built with vip/ui. Copy them into your app.",
    art: "blocks",
  });
}
