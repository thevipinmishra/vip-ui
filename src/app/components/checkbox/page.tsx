import { CheckboxBasicDemo } from "@/components/docs/checkbox-basic-demo";
import { CheckboxCardDemo } from "@/components/docs/checkbox-card-demo";
import { CheckboxDemo } from "@/components/docs/checkbox-demo";
import { CheckboxDescriptionDemo } from "@/components/docs/checkbox-description-demo";
import { CheckboxDisabledDemo } from "@/components/docs/checkbox-disabled-demo";
import { CheckboxRequiredDemo } from "@/components/docs/checkbox-required-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Checkbox",
  description: `${componentPageData.checkbox.description} Examples cover descriptions, required and disabled states, indeterminate state, and a card.`,
  path: "/components/checkbox",
});

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
        <CheckboxRequiredDemo key="required" />,
        <CheckboxDemo key="indeterminate" />,
        <CheckboxCardDemo key="card" />,
        <CheckboxDisabledDemo key="disabled" />,
      ])}
      sourcePath="src/components/ui/checkbox.tsx"
    />
  );
}
