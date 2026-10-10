import type { Metadata } from "next";
import { AccordionBillingDemo } from "@/components/docs/accordion-billing-demo";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import { AccordionDisabledDemo } from "@/components/docs/accordion-disabled-demo";
import { AccordionMultipleDemo } from "@/components/docs/accordion-multiple-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Accordion | vip/ui",
  description: componentPageData.accordion.description,
};

export default function AccordionPage() {
  const page = componentPageData.accordion;
  return (
    <ComponentPage
      name="Accordion"
      description={page.description}
      preview={<AccordionDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <AccordionBillingDemo key="divided" />,
        <AccordionMultipleDemo key="multiple" />,
        <AccordionDisabledDemo key="disabled" />,
      ])}
      sourcePath="src/components/ui/accordion.tsx"
    />
  );
}
