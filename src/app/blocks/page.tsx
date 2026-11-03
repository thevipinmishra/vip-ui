import { BlocksGallery } from "@/components/blocks/blocks-gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blocks",
  description:
    "Complete page sections built with vip/ui. Preview each block, copy the install command or source, and open it live in a new tab.",
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
