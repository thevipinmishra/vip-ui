import { ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt = "vip/ui themes — themes for vip/ui and shadcn/ui";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    label: "Themes",
    title: "A visual language of your own.",
    description:
      "Themes for vip/ui and shadcn/ui. Preview complete interfaces, then copy the CSS into your project.",
    art: "swatches",
  });
}
