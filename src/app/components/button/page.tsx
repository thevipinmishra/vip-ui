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
      previewHint="Press the button to see its feedback."
      previewSourcePath="src/components/docs/button-basic-demo.tsx"
      examples={[
        {
          title: "Actions and feedback",
          description:
            "Use the appropriate visual priority and confirm the result of an action.",
          preview: <ButtonDemo />,
          sourcePath: "src/components/docs/button-demo.tsx",
        },
        {
          title: "Variants, sizes, and disabled",
          description:
            "Choose the visual priority and size that fits the action. Disabled buttons cannot be pressed.",
          preview: <ButtonVariantsDemo />,
          sourcePath: "src/components/docs/button-variants-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/button.tsx"
      next={{ name: "Text field", href: "/components/text-field" }}
    />
  );
}
