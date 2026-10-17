import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { RadioGroupCardDemo } from "@/components/docs/radio-group-card-demo";
import { RadioGroupDemo } from "@/components/docs/radio-group-demo";
import { RadioGroupDescriptionDemo } from "@/components/docs/radio-group-description-demo";
import { RadioGroupDisabledDemo } from "@/components/docs/radio-group-disabled-demo";
import { RadioGroupHorizontalDemo } from "@/components/docs/radio-group-horizontal-demo";
import { RadioGroupRequiredDemo } from "@/components/docs/radio-group-required-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Radio group | vip/ui",
  description: componentPageData["radio-group"].description,
};

export default function RadioGroupPage() {
  const page = componentPageData["radio-group"];

  return (
    <ComponentPage
      name="Radio group"
      description={page.description}
      preview={<RadioGroupDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <RadioGroupDescriptionDemo key="described-options" />,
        <RadioGroupHorizontalDemo key="horizontal" />,
        <RadioGroupCardDemo key="card-options" />,
        <RadioGroupDisabledDemo key="disabled" />,
        <RadioGroupRequiredDemo key="required" />,
      ])}
      sourcePath="src/components/ui/radio-group.tsx"
    />
  );
}
