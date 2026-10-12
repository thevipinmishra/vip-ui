import type { Metadata } from "next";
import { BlocksGallery } from "@/components/blocks/blocks-gallery";

export const metadata: Metadata = {
  title: "Blocks | vip/ui",
  description:
    "Complete page sections, built with vip/ui. Add a block to your app. Change it to suit your product.",
};

export default function BlocksPage() {
  return <BlocksGallery category={null} />;
}
