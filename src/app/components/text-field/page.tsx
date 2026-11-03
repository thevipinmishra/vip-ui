import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TextFieldBasicDemo } from "@/components/docs/text-field-basic-demo";
import { TextFieldDescriptionDemo } from "@/components/docs/text-field-description-demo";
import { TextFieldDisabledDemo } from "@/components/docs/text-field-disabled-demo";
import { TextFieldInvalidDemo } from "@/components/docs/text-field-invalid-demo";
import { TextFieldReadOnlyDemo } from "@/components/docs/text-field-read-only-demo";
import { TextFieldSizesDemo } from "@/components/docs/text-field-sizes-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Text field",
  description: `${componentPageData["text-field"].description} Examples cover sizes, descriptions, read-only, disabled, and invalid states.`,
  path: "/components/text-field",
});

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
        <TextFieldSizesDemo key="sizes" />,
      ])}
      sourcePath="src/components/ui/text-field.tsx"
    />
  );
}
