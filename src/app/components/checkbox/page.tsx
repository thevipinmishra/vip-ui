import type { Metadata } from "next";
import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { CheckboxDemo } from "@/components/docs/checkbox-demo";
import { CheckboxDescriptionDemo } from "@/components/docs/checkbox-description-demo";
import { CheckboxDisabledDemo } from "@/components/docs/checkbox-disabled-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Checkbox | vip/ui",
  description: componentPageData.checkbox.description,
};

export default function CheckboxPage() {
  const page = componentPageData.checkbox;

  return (
    <ComponentPage
      name="Checkbox"
      description={page.description}
      preview={<CheckboxBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <CheckboxDescriptionDemo key="description" />,
        <CheckboxDisabledDemo key="disabled" />,
        <CheckboxDemo key="indeterminate" />,
      ])}
      sourcePath="src/components/ui/checkbox.tsx"
    />
  );
}
