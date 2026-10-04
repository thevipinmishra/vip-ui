import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { RadioGroupCardDemo } from "@/components/docs/radio-group-card-demo";
import { RadioGroupDemo } from "@/components/docs/radio-group-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Radio group | vip/ui",
  description: "A single choice from a visible set of options.",
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
        <RadioGroupCardDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/radio-group.tsx"
    />
  );
}
