import type { Metadata } from "next";
import { ComboBoxBasicDemo } from "@/components/docs/combo-box-basic-demo";
import { ComboBoxDemo } from "@/components/docs/combo-box-demo";
import { ComboBoxDisabledDemo } from "@/components/docs/combo-box-disabled-demo";
import { ComboBoxMultipleDemo } from "@/components/docs/combo-box-multiple-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Combo box | vip/ui",
  description: componentPageData["combo-box"].description,
};

export default function ComboBoxPage() {
  const page = componentPageData["combo-box"];

  return (
    <ComponentPage
      name="Combo box"
      description={page.description}
      preview={<ComboBoxBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <ComboBoxDemo key="described-options" />,
        <ComboBoxDisabledDemo key="disabled" />,
        <ComboBoxMultipleDemo key="multiple-selection" />,
      ])}
      sourcePath="src/components/ui/combo-box.tsx"
    />
  );
}
