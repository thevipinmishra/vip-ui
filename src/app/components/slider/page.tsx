import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SliderBudgetDemo } from "@/components/docs/slider-budget-demo";
import { SliderDemo } from "@/components/docs/slider-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Slider | vip/ui",
  description: "Choose a value along a range.",
};

export default function SliderPage() {
  const page = componentPageData.slider;
  return (
    <ComponentPage
      name="Slider"
      description={page.description}
      preview={<SliderDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <SliderBudgetDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/slider.tsx"
    />
  );
}
