import {
  ogAlt,
  ogChips,
  ogColors,
  ogContentType,
  ogSize,
  renderOgCard,
} from "@/lib/og";
import { site } from "@/lib/seo";

export const alt = ogAlt;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgCard({
    eyebrow: "React component registry",
    title: site.tagline,
    description: site.description,
    meta: site.domain,
    chips: ogChips.slice(0, 3),
    accent: ogColors.teal,
  });
}
