import type { Metadata } from "next";
import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { CheckboxDemo } from "@/components/docs/checkbox-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Checkbox | vip/ui",
  description: "An accessible checkbox for independent choices.",
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
        <CheckboxDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/checkbox.tsx"
    />
  );
}
