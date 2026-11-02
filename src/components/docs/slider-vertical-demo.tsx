"use client";

import { Slider } from "@/components/ui/slider";

const bands = [
  { label: "Bass", value: 4 },
  { label: "Mid", value: -2 },
  { label: "Treble", value: 6 },
];

export function SliderVerticalDemo() {
  return (
    <div className="flex gap-8">
      {bands.map((band) => (
        <Slider
          key={band.label}
          label={band.label}
          orientation="vertical"
          defaultValue={band.value}
          minValue={-12}
          maxValue={12}
          fillOffset={0}
          formatOptions={{ signDisplay: "exceptZero" }}
          className="h-48"
        />
      ))}
    </div>
  );
}
