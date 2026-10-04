import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TextFieldBasicDemo } from "@/components/docs/text-field-basic-demo";
import { TextFieldDemo } from "@/components/docs/text-field-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Text field | vip/ui",
  description: "A labeled text field with help and validation states.",
};

export default function TextFieldPage() {
  const page = componentPageData["text-field"];
  return (
    <ComponentPage
      name="Text field"
      description={page.description}
      preview={<TextFieldBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <TextFieldDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/text-field.tsx"
    />
  );
}
