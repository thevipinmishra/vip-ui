import type { Metadata } from "next";
import { AccordionDemo } from "@/components/docs/accordion-demo";
import { AccordionDividedDemo } from "@/components/docs/accordion-divided-demo";
import { ComponentPage } from "@/components/docs/component-page";

export const metadata: Metadata = {
  title: "Accordion | vip/ui",
  description: "Reveal related content on demand.",
};

export default function AccordionPage() {
  return (
    <ComponentPage
      name="Accordion"
      reactAriaDocsHref="https://react-aria.adobe.com/DisclosureGroup"
      description="A set of questions that expands in place. Each heading remains available as a keyboard accessible button."
      preview={<AccordionDemo />}
      previewHint="Open a question to read its answer."
      previewSourcePath="src/components/docs/accordion-demo.tsx"
      examples={[
        {
          title: "Divided",
          description:
            'Use variant="divided" for rows separated by a single line, without individual cards. Open either row to see the content expand.',
          preview: <AccordionDividedDemo />,
          sourcePath: "src/components/docs/accordion-divided-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/accordion.tsx"
      previous={{ name: "Tabs", href: "/components/tabs" }}
      next={{ name: "Dialog", href: "/components/dialog" }}
    />
  );
}
