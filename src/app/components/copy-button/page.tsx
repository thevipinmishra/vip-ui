import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { CopyButtonDemo } from "@/components/docs/copy-button-demo";
import { CopyButtonLinkDemo } from "@/components/docs/copy-button-link-demo";

export const metadata: Metadata = {
  title: "Copy button | vip/ui",
  description: "Copy text with visible success and failure feedback.",
};

export default function CopyButtonPage() {
  return (
    <ComponentPage
      name="Copy button"
      description="Copies a value and confirms whether the clipboard write succeeded."
      preview={<CopyButtonDemo />}
      previewHint="Press Copy; a success label replaces the action briefly, without hiding the copied value."
      previewSourcePath="src/components/docs/copy-button-demo.tsx"
      examples={[
        {
          title: "Share a link",
          description:
            "Show the destination in text as well as the copy action. If clipboard access fails, the button offers a retry instead of claiming success.",
          preview: <CopyButtonLinkDemo />,
          sourcePath: "src/components/docs/copy-button-link-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/copy-button.tsx"
      previous={{ name: "Password field", href: "/components/password-field" }}
    />
  );
}
