import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { SliderDemo } from "@/components/docs/slider-demo";
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
      description="Choose a value in a bounded range. The current value stays beside the label while the thumb responds to pointer and keyboard input."
      preview={<SliderDemo />}
      previewHint="Drag the thumb or use arrow keys to change the volume."
      previewSourcePath="src/components/docs/slider-demo.tsx"
      examples={[
        {
          title: "Range and disabled",
          description:
            "Use two thumbs to set a minimum and maximum, or lock a value when it cannot be edited.",
          preview: <SliderRangeDemo />,
          sourcePath: "src/components/docs/slider-range-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/slider.tsx"
      previous={{ name: "Text area", href: "/components/text-area" }}
      next={{ name: "Tabs", href: "/components/tabs" }}
    />
  );
}
