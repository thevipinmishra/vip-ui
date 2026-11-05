import { BlocksGallery } from "@/components/blocks/blocks-gallery";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Blocks",
  description:
    "Carefully composed React UI blocks for dashboards, AI interfaces, authentication, onboarding, and commerce. Ready to customize.",
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
