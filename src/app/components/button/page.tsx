import type { Metadata } from "next";
import { ButtonBasicDemo } from "@/components/docs/button-basic-demo";
import { ButtonDemo } from "@/components/docs/button-demo";
import { ButtonSizesDemo } from "@/components/docs/button-sizes-demo";
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
      description="Displays a button or a component that looks like a button."
      reactAriaDocsHref="https://react-aria.adobe.com/Button"
      preview={<ButtonBasicDemo />}
      previewHint="Press to save; the label confirms the action without adding a separate message."
      previewSourcePath="src/components/docs/button-basic-demo.tsx"
      examples={[
        {
          title: "Variants",
          description:
            "Choose a variant to match the action's priority. Use destructive for actions that remove data.",
          preview: <ButtonVariantsDemo />,
          sourcePath: "src/components/docs/button-variants-demo.tsx",
        },
        {
          title: "Sizes",
          description:
            "Use size for placement. Give an icon-only button an accessible name.",
          preview: <ButtonSizesDemo />,
          sourcePath: "src/components/docs/button-sizes-demo.tsx",
        },
        {
          title: "Project actions",
          description:
            "Publish a draft, save another revision, or archive it. The status and revision update in the project card.",
          preview: <ButtonDemo />,
          sourcePath: "src/components/docs/button-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/button.tsx"
      next={{ name: "Text field", href: "/components/text-field" }}
    />
  );
}
