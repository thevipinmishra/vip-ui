"use client";

import { Slider } from "@/components/ui/slider";

export function SliderStepDemo() {
  return (
    <Slider
      label="Opacity"
      defaultValue={0.5}
      minValue={0}
      maxValue={1}
      step={0.1}
      formatOptions={{ style: "percent" }}
      className="w-full max-w-sm"
    />
  );
}
