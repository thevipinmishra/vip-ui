import { ComboBoxAsyncDemo } from "@/components/docs/combo-box-async-demo";
import { ComboBoxBasicDemo } from "@/components/docs/combo-box-basic-demo";
import { ComboBoxDemo } from "@/components/docs/combo-box-demo";
import { ComboBoxDisabledDemo } from "@/components/docs/combo-box-disabled-demo";
import { ComboBoxIconDemo } from "@/components/docs/combo-box-icon-demo";
import { ComboBoxMultipleDemo } from "@/components/docs/combo-box-multiple-demo";
import { ComboBoxSizesDemo } from "@/components/docs/combo-box-sizes-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Combo box",
  description: `${componentPageData["combo-box"].description} Examples cover async results, multiple selection, icons, sizes, and disabled fields.`,
  path: "/components/combo-box",
});

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
        <ComboBoxIconDemo key="leading-icon" />,
        <ComboBoxDisabledDemo key="disabled" />,
        <ComboBoxMultipleDemo key="multiple-selection" />,
        <ComboBoxAsyncDemo key="async-loading" />,
        <ComboBoxSizesDemo key="sizes" />,
      ])}
      sourcePath="src/components/ui/combo-box.tsx"
    />
  );
}
