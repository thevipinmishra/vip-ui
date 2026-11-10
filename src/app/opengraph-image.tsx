import { ogAlt, ogContentType, ogSize, renderOgCard } from "@/lib/og";
import { site } from "@/lib/seo";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    title: site.tagline,
    description:
      "Built with React Aria, Tailwind CSS, and Motion. Add them with the shadcn CLI.",
  });
}
