"use client";

import { Slider } from "@/components/ui/slider";

export function SliderDisabledDemo() {
  return (
    <Slider
      label="Boost spend"
      defaultValue={20}
      minValue={0}
      maxValue={100}
      isDisabled
      className="w-full max-w-sm"
    />
  );
}
