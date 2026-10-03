"use client";

import { Slider } from "@/components/ui/slider";

export function SliderDisabledDemo() {
  return (
    <Slider
      label="Locked volume"
      defaultValue={40}
      isDisabled
      className="w-full max-w-sm"
    />
  );
}
