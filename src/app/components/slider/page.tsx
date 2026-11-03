import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SliderCustomDemo } from "@/components/docs/slider-custom-demo";
import { SliderDemo } from "@/components/docs/slider-demo";
import { SliderDisabledDemo } from "@/components/docs/slider-disabled-demo";
import { SliderRangeDemo } from "@/components/docs/slider-range-demo";
import { SliderStepDemo } from "@/components/docs/slider-step-demo";
import { SliderVerticalDemo } from "@/components/docs/slider-vertical-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Slider",
  description: `${componentPageData.slider.description} Examples cover ranges, marks, vertical layout, custom layouts, and disabled state.`,
  path: "/components/slider",
});

export default function SliderPage() {
  const page = componentPageData.slider;

  return (
    <ComponentPage
      name="Slider"
      description={page.description}
      preview={<SliderDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <SliderRangeDemo key="range" />,
        <SliderStepDemo key="marks" />,
        <SliderVerticalDemo key="vertical" />,
        <SliderCustomDemo key="custom-layout" />,
        <SliderDisabledDemo key="disabled" />,
      ])}
      sourcePath="src/components/ui/slider.tsx"
    />
  );
}
