import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { CopyButtonDemo } from "@/components/docs/copy-button-demo";
import { CopyButtonShareDemo } from "@/components/docs/copy-button-share-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Copy button",
  description: `${componentPageData["copy-button"].description} Examples cover a custom label and an icon button, plus installation and the API reference.`,
  path: "/components/copy-button",
});

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
