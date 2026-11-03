import type { Metadata } from "next";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata;

export default function BlocksLayout({ children }: LayoutProps<"/blocks">) {
  return children;
}
