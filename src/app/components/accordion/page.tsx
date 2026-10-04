import type { Metadata } from "next";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import { AccordionDisabledDemo } from "@/components/docs/accordion-disabled-demo";
import { AccordionDividedDemo } from "@/components/docs/accordion-divided-demo";
import { AccordionMultipleDemo } from "@/components/docs/accordion-multiple-demo";
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
        <AccordionMultipleDemo key="example-1" />,
        <AccordionDisabledDemo key="example-2" />,
        <AccordionDividedDemo key="example-3" />,
      ])}
      sourcePath="src/components/ui/accordion.tsx"
    />
  );
}
