"use client";

import {
  Slider,
  SliderHandle,
  SliderLabel,
  SliderRail,
  SliderRange,
  SliderTrack,
} from "@/components/ui/slider";

export function SliderRangeDemo() {
  return (
    <div className="w-full max-w-sm space-y-7">
      <Slider defaultValue={[25, 75]} minValue={0} maxValue={100}>
        <div className="flex items-center justify-between gap-4 text-[13px]">
          <SliderLabel>Price range</SliderLabel>
          <span className="text-muted-foreground">$0–$100</span>
        </div>
        <SliderTrack>
          <SliderRail>
            <SliderRange />
          </SliderRail>
          <SliderHandle index={0} aria-label="Minimum price" />
          <SliderHandle index={1} aria-label="Maximum price" />
        </SliderTrack>
      </Slider>
      <Slider label="Locked volume" defaultValue={40} isDisabled />
    </div>
  );
}
