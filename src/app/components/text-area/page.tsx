import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { TextAreaBasicDemo } from "@/components/docs/text-area-basic-demo";
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
      preview={<TextAreaBasicDemo />}
      previewHint="Use a visible label for a longer answer."
      previewSourcePath="src/components/docs/text-area-basic-demo.tsx"
      examples={[
        {
          title: "Review thread",
          description:
            "Add a note to a project review with a character limit. The new note appears with the existing discussion.",
          preview: <TextAreaDemo />,
          sourcePath: "src/components/docs/text-area-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/text-area.tsx"
      previous={{ name: "Radio group", href: "/components/radio-group" }}
      next={{ name: "Slider", href: "/components/slider" }}
    />
  );
}
