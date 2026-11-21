import type { Metadata } from "next";
import { BlockThemeStyle } from "@/components/blocks/block-theme";
import { noIndexMetadata } from "@/lib/seo";

export const metadata: Metadata = noIndexMetadata;

export default function BlocksLayout({ children }: LayoutProps<"/blocks">) {
  return (
    <>
      <BlockThemeStyle />
      {children}
    </>
  );
}
