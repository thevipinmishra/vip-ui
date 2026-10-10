import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlocksGallery } from "@/components/blocks/blocks-gallery";
import { blockCategories } from "@/lib/blocks";

export const dynamicParams = false;

export function generateStaticParams() {
  return blockCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blocks/[category]">): Promise<Metadata> {
  const { category } = await params;
  const label = blockCategories.find((item) => item.slug === category)?.label;
  return {
    title: `${label ?? "Blocks"} blocks | vip/ui`,
    description: `Install ${label?.toLowerCase() ?? ""} blocks built with vip/ui components.`,
  };
}

export default async function BlockCategoryPage({
  params,
}: PageProps<"/blocks/[category]">) {
  const { category } = await params;
  if (!blockCategories.some((item) => item.slug === category)) notFound();
  return <BlocksGallery category={category} />;
}
