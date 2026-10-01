import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { TextAreaDemo } from "@/components/docs/text-area-demo";

export const metadata: Metadata = {
  title: "Text area | vip/ui",
  description: "A labeled field for longer text.",
};

export default function TextAreaPage() {
  return (
    <ComponentPage
      name="Text area"
      reactAriaDocsHref="https://react-aria.adobe.com/TextField#textarea"
      description="A field for longer answers, with a visible label, optional guidance, and room to resize."
      preview={<TextAreaDemo />}
      previewHint="Type a description and see the character count update."
      previewSourcePath="src/components/docs/text-area-demo.tsx"
      sourcePath="src/components/ui/text-area.tsx"
      previous={{ name: "Radio group", href: "/components/radio-group" }}
      next={{ name: "Slider", href: "/components/slider" }}
    />
  );
}
