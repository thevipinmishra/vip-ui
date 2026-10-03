import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { SliderDemo } from "@/components/docs/slider-demo";
import { SliderDisabledDemo } from "@/components/docs/slider-disabled-demo";
import { SliderRangeDemo } from "@/components/docs/slider-range-demo";

export const metadata: Metadata = {
  title: "Slider | vip/ui",
  description: "Choose a value along a range.",
};

export default function SliderPage() {
  return (
    <ComponentPage
      name="Slider"
      reactAriaDocsHref="https://react-aria.adobe.com/Slider"
      description="A control for choosing a value or range on a track."
      preview={<SliderDemo />}
      previewHint="Drag the thumb or use arrow keys to change the volume."
      previewSourcePath="src/components/docs/slider-demo.tsx"
      examples={[
        {
          title: "Price range",
          description:
            "Use two thumbs to set a minimum and maximum. The value updates as you move either thumb.",
          preview: <SliderRangeDemo />,
          sourcePath: "src/components/docs/slider-range-demo.tsx",
        },
        {
          title: "Disabled slider",
          description:
            "Keep the current volume visible when it cannot be changed.",
          preview: <SliderDisabledDemo />,
          sourcePath: "src/components/docs/slider-disabled-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/slider.tsx"
      previous={{ name: "Text area", href: "/components/text-area" }}
      next={{ name: "Tabs", href: "/components/tabs" }}
    />
  );
}
