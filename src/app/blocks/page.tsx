import { BlocksGallery } from "@/components/blocks/blocks-gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blocks",
  description:
    "Full pages built with vip/ui components. Copy them into your app.",
  path: "/blocks",
  image: "file",
});

export default async function BlocksPage({
  searchParams,
}: PageProps<"/blocks">) {
  const { category } = await searchParams;
  return (
    <BlocksGallery category={typeof category === "string" ? category : null} />
  );
}
