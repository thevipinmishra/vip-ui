import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TextFieldBasicDemo } from "@/components/docs/text-field-basic-demo";
import { TextFieldDescriptionDemo } from "@/components/docs/text-field-description-demo";
import { TextFieldDisabledDemo } from "@/components/docs/text-field-disabled-demo";
import { TextFieldInvalidDemo } from "@/components/docs/text-field-invalid-demo";
import { TextFieldReadOnlyDemo } from "@/components/docs/text-field-read-only-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Text field | vip/ui",
  description: componentPageData["text-field"].description,
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
        <TextFieldDescriptionDemo key="description" />,
        <TextFieldDisabledDemo key="disabled" />,
        <TextFieldReadOnlyDemo key="read-only" />,
        <TextFieldInvalidDemo key="invalid" />,
      ])}
      sourcePath="src/components/ui/text-field.tsx"
    />
  );
}
