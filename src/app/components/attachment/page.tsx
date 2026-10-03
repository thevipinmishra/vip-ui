import type { Metadata } from "next";
import { AttachmentBasicDemo } from "@/components/docs/attachment-basic-demo";
import { AttachmentDemo } from "@/components/docs/attachment-demo";
import { ComponentPage } from "@/components/docs/component-page";

export const metadata: Metadata = {
  title: "Attachment | vip/ui",
  description: "File previews, upload states, and removable attachments.",
};

export default function AttachmentPage() {
  return (
    <ComponentPage
      name="Attachment"
      description="Displays a file's name, size, preview, and current state."
      preview={<AttachmentBasicDemo />}
      previewHint="Long filenames wrap so the full name stays available at phone width."
      previewSourcePath="src/components/docs/attachment-basic-demo.tsx"
      examples={[
        {
          title: "Add files to a request",
          description:
            "Drop a PNG, JPEG, or PDF, or browse on a touch device. Remove a file before submitting; selections stay local and no upload is started.",
          preview: <AttachmentDemo />,
          sourcePath: "src/components/docs/attachment-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/attachment.tsx"
      previous={{ name: "File trigger", href: "/components/file-trigger" }}
      next={{ name: "Native select", href: "/components/native-select" }}
    />
  );
}
