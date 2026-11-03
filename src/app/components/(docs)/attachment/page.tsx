import { AttachmentBasicDemo } from "@/components/docs/attachment-basic-demo";
import { AttachmentDemo } from "@/components/docs/attachment-demo";
import { AttachmentUploadDemo } from "@/components/docs/attachment-upload-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Attachment",
  description: `${componentPageData.attachment.description} Examples cover adding and removing files and each upload state.`,
  path: "/components/attachment",
});

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
        <AttachmentUploadDemo key="example-2" />,
      ])}
      sourcePath="src/components/ui/attachment.tsx"
    />
  );
}
