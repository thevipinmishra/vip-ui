import { ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt =
  "vip/ui components — accessible React components with examples and API reference";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    label: "Components",
    title: "Components, crafted with intention.",
    description:
      "Accessible React components with examples, source, and an API reference for each.",
    art: "controls",
  });
}
