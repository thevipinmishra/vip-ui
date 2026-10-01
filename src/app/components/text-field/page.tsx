import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
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
      description="Use Text field for a single line of text. Add help text when the expected value needs explanation and show errors near the input."
      preview={<TextFieldDemo />}
      previewHint="Type a name and see the preview update below the field."
      previewSourcePath="src/components/docs/text-field-demo.tsx"
      sourcePath="src/components/ui/text-field.tsx"
      previous={{ name: "Button", href: "/components/button" }}
      next={{ name: "Select", href: "/components/select" }}
    />
  );
}
