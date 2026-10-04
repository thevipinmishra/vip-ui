import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TextAreaBasicDemo } from "@/components/docs/text-area-basic-demo";
import { TextAreaDemo } from "@/components/docs/text-area-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Text area | vip/ui",
  description: "A labeled field for longer text.",
};

export default function TextAreaPage() {
  const page = componentPageData["text-area"];
  return (
    <ComponentPage
      name="Text area"
      description={page.description}
      preview={<TextAreaBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <TextAreaDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/text-area.tsx"
    />
  );
}
