import type { Metadata } from "next";
import { ButtonBasicDemo } from "@/components/docs/button-basic-demo";
import { ButtonDemo } from "@/components/docs/button-demo";
import { ButtonVariantsDemo } from "@/components/docs/button-variants-demo";
import { ComponentPage } from "@/components/docs/component-page";

export const metadata: Metadata = {
  title: "Button | vip/ui",
  description:
    "Accessible buttons with clear hierarchy and tactile press feedback.",
};

export default function ButtonPage() {
  return (
    <ComponentPage
      name="Button"
      description="Use Button for actions. Choose a variant for priority and a size for context. onPress handles pointer and keyboard activation."
      reactAriaDocsHref="https://react-aria.adobe.com/Button"
      preview={<ButtonBasicDemo />}
      previewHint="Press to save; the label confirms the action without adding a separate message."
      previewSourcePath="src/components/docs/button-basic-demo.tsx"
      examples={[
        {
          title: "Project actions",
          description:
            "Publish a draft, save another revision, or archive it. The status and revision update in the project card.",
          preview: <ButtonDemo />,
          sourcePath: "src/components/docs/button-demo.tsx",
        },
        {
          title: "Variants and sizes",
          description:
            "Use visual priority for actions and size for placement. Name icon-only actions and disable unavailable ones.",
          preview: <ButtonVariantsDemo />,
          sourcePath: "src/components/docs/button-variants-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/button.tsx"
      next={{ name: "Text field", href: "/components/text-field" }}
    />
  );
}
