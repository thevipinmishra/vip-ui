import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { CopyButtonDemo } from "@/components/docs/copy-button-demo";
import { CopyButtonIconDemo } from "@/components/docs/copy-button-icon-demo";
import { CopyButtonLinkDemo } from "@/components/docs/copy-button-link-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Copy button | vip/ui",
  description: "Copy text with visible success and failure feedback.",
};

export default function CopyButtonPage() {
  const page = componentPageData["copy-button"];
  return (
    <ComponentPage
      name="Copy button"
      description={page.description}
      preview={<CopyButtonDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <CopyButtonLinkDemo key="example-1" />,
        <CopyButtonIconDemo key="example-2" />,
      ])}
      sourcePath="src/components/ui/copy-button.tsx"
    />
  );
}
