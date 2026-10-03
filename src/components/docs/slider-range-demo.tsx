"use client";

import {
  Slider,
  SliderHandle,
  SliderLabel,
  SliderRail,
  SliderRange,
  SliderTrack,
  SliderValue,
} from "@/components/ui/slider";

export function SliderRangeDemo() {
  return (
    <Slider
      defaultValue={[25, 75]}
      minValue={0}
      maxValue={100}
      className="w-full max-w-sm"
    >
      <div className="flex items-center justify-between gap-4 text-sm">
        <SliderLabel>Price range ($)</SliderLabel>
        <SliderValue />
      </div>
      <SliderTrack>
        <SliderRail>
          <SliderRange />
        </SliderRail>
        <SliderHandle index={0} aria-label="Minimum price" />
        <SliderHandle index={1} aria-label="Maximum price" />
      </SliderTrack>
    </Slider>
  );
}
