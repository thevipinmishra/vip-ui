import type { Metadata } from "next";
import { AccordionBillingDemo } from "@/components/docs/accordion-billing-demo";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Accordion | vip/ui",
  description: "Reveal related content on demand.",
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
        <AccordionBillingDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/accordion.tsx"
    />
  );
}
