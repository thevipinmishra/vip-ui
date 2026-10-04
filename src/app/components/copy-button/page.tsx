import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { CopyButtonDemo } from "@/components/docs/copy-button-demo";
import { CopyButtonIconDemo } from "@/components/docs/copy-button-icon-demo";
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
      previewHint="The button fits its current label. Press Copy to see it change without reserving space for the longest message."
      previewSourcePath="src/components/docs/copy-button-demo.tsx"
      examples={[
        {
          title: "Text-only action",
          description:
            "Render each status as text. The button grows or shrinks with the label, and a failed write offers a retry.",
          preview: <CopyButtonLinkDemo />,
          sourcePath: "src/components/docs/copy-button-link-demo.tsx",
        },
        {
          title: "Icon action",
          description:
            "Use the shared icon size for compact actions. Give an icon-only button a specific accessible name; the live region announces the result.",
          preview: <CopyButtonIconDemo />,
          sourcePath: "src/components/docs/copy-button-icon-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/copy-button.tsx"
      previous={{ name: "Password field", href: "/components/password-field" }}
    />
  );
}
