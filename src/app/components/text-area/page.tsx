import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TextAreaBasicDemo } from "@/components/docs/text-area-basic-demo";
import { TextAreaDescriptionDemo } from "@/components/docs/text-area-description-demo";
import { TextAreaDisabledDemo } from "@/components/docs/text-area-disabled-demo";
import { TextAreaInvalidDemo } from "@/components/docs/text-area-invalid-demo";
import { TextAreaReadOnlyDemo } from "@/components/docs/text-area-read-only-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Text area | vip/ui",
  description: componentPageData["text-area"].description,
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
        <TextAreaDescriptionDemo key="description" />,
        <TextAreaDisabledDemo key="disabled" />,
        <TextAreaReadOnlyDemo key="read-only" />,
        <TextAreaInvalidDemo key="invalid" />,
      ])}
      sourcePath="src/components/ui/text-area.tsx"
    />
  );
}
