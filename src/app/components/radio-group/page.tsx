import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { RadioGroupCardDemo } from "@/components/docs/radio-group-card-demo";
import { RadioGroupDemo } from "@/components/docs/radio-group-demo";

export const metadata: Metadata = {
  title: "Radio group | vip/ui",
  description: "A single choice from a visible set of options.",
};

export default function RadioGroupPage() {
  return (
    <ComponentPage
      name="Radio group"
      reactAriaDocsHref="https://react-aria.adobe.com/RadioGroup"
      description="Groups options for choosing one item."
      preview={<RadioGroupDemo />}
      previewHint="Select a plan with a pointer or use Tab and the arrow keys."
      previewSourcePath="src/components/docs/radio-group-demo.tsx"
      examples={[
        {
          title: "Card options",
          description: "Use cards when each choice needs supporting context.",
          preview: <RadioGroupCardDemo />,
          sourcePath: "src/components/docs/radio-group-card-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/radio-group.tsx"
      previous={{ name: "Alert", href: "/components/alert" }}
      next={{ name: "Text area", href: "/components/text-area" }}
    />
  );
}
