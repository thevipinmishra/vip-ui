import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { CopyButtonDemo } from "@/components/docs/copy-button-demo";
import { CopyButtonShareDemo } from "@/components/docs/copy-button-share-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Copy button | vip/ui",
  description: componentPageData["copy-button"].description,
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
        <CopyButtonShareDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/copy-button.tsx"
    />
  );
}
