import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Asset studio | vip/ui",
  description: "Organize a local asset workspace with five vip/ui components.",
};

export default function StudioLayout({
  children,
}: LayoutProps<"/examples/studio">) {
  return children;
}
