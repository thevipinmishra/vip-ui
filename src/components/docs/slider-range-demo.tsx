"use client";

import { Slider } from "@/components/ui/slider";

export function SliderRangeDemo() {
  return (
    <Slider
      label="Price"
      defaultValue={[200, 800]}
      minValue={0}
      maxValue={1000}
      step={10}
      thumbLabels={["Minimum price", "Maximum price"]}
      formatOptions={{
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }}
      className="w-full max-w-sm"
    />
  );
}
