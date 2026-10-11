import type { Metadata } from "next";
import { AttachmentBasicDemo } from "@/components/docs/attachment-basic-demo";
import { AttachmentDemo } from "@/components/docs/attachment-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Attachment | vip/ui",
  description: componentPageData.attachment.description,
};

export default function AttachmentPage() {
  const page = componentPageData.attachment;
  return (
    <ComponentPage
      name="Attachment"
      description={page.description}
      preview={<AttachmentBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <AttachmentDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/attachment.tsx"
    />
  );
}
