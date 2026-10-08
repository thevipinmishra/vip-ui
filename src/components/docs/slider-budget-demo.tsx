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

export function SliderBudgetDemo() {
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Slider defaultValue={[25, 75]} minValue={0} maxValue={100}>
        <div className="flex items-center justify-between gap-4 text-sm">
          <SliderLabel>Daily spend ($)</SliderLabel>
          <SliderValue />
        </div>
        <SliderTrack>
          <SliderRail>
            <SliderRange />
          </SliderRail>
          <SliderHandle index={0} aria-label="Minimum daily spend" />
          <SliderHandle index={1} aria-label="Maximum daily spend" />
        </SliderTrack>
      </Slider>
      <Slider
        label="Boost spend"
        defaultValue={20}
        isDisabled
        minValue={0}
        maxValue={100}
      />
    </div>
  );
}
