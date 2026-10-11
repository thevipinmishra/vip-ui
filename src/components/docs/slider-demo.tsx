"use client";

import { Slider } from "@/components/ui/slider";

export function SliderDemo() {
  return (
    <Slider
      label="Volume"
      minValue={0}
      maxValue={100}
      defaultValue={40}
      className="w-full max-w-sm"
    />
  );
}
