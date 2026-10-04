import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SliderDemo } from "@/components/docs/slider-demo";
import { SliderDisabledDemo } from "@/components/docs/slider-disabled-demo";
import { SliderRangeDemo } from "@/components/docs/slider-range-demo";
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
        <SliderRangeDemo key="example-1" />,
        <SliderDisabledDemo key="example-2" />,
      ])}
      sourcePath="src/components/ui/slider.tsx"
    />
  );
}
