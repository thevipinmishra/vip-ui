import { catalogDocComponents } from "@/lib/catalog";
import { componentOgCard, ogContentType, ogSize } from "@/lib/og";

export const alt =
  "vip/ui component — accessible React component documentation";
export const size = ogSize;
export const contentType = ogContentType;
export const dynamicParams = false;

export function generateStaticParams() {
  return catalogDocComponents.map((component) => ({ slug: component.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return componentOgCard(slug);
}
