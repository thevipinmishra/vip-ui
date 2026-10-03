import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { TextFieldBasicDemo } from "@/components/docs/text-field-basic-demo";
import { TextFieldDemo } from "@/components/docs/text-field-demo";

export const metadata: Metadata = {
  title: "Text field | vip/ui",
  description: "A labeled text field with help and validation states.",
};

export default function TextFieldPage() {
  return (
    <ComponentPage
      name="Text field"
      reactAriaDocsHref="https://react-aria.adobe.com/TextField"
      description="A field for entering a single line of text."
      preview={<TextFieldBasicDemo />}
      previewHint="A visible label identifies the input even when its placeholder disappears."
      previewSourcePath="src/components/docs/text-field-basic-demo.tsx"
      examples={[
        {
          title: "Live project name",
          description:
            "The project list reflects the value as it changes, including an empty-name fallback.",
          preview: <TextFieldDemo />,
          sourcePath: "src/components/docs/text-field-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/text-field.tsx"
      previous={{ name: "Button", href: "/components/button" }}
      next={{ name: "Select", href: "/components/select" }}
    />
  );
}
