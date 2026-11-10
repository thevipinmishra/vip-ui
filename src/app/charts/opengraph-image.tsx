import { ogContentType, ogSize, renderOgCard } from "@/lib/og";

export const alt = "vip/ui charts — React charts built with TanStack Charts";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOgCard({
    label: "Charts",
    title: "Data, presented beautifully.",
    description:
      "Customizable React charts built with TanStack Charts. Copy the source into your app.",
    art: "chart",
  });
}
