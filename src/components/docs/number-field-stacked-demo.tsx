"use client";

import { NumberField } from "@/components/ui/number-field";

export function NumberFieldStackedDemo() {
  return (
    <NumberField
      label="Opacity"
      steppers="stacked"
      defaultValue={0.8}
      minValue={0}
      maxValue={1}
      step={0.05}
      formatOptions={{ style: "percent" }}
      className="w-full max-w-48"
    />
  );
}
