import type { Metadata } from "next";
import { BlocksGallery } from "@/components/blocks/blocks-gallery";

export const metadata: Metadata = {
  title: "Blocks | vip/ui",
  description:
    "Install complete page sections built with vip/ui: dashboards, sign-in forms, settings, pricing, and team management.",
};

export default function BlocksPage() {
  return <BlocksGallery category={null} />;
}
