"use client";

import { NumberField } from "@/components/ui/number-field";

export function NumberFieldLimitsDemo() {
  return (
    <NumberField
      label="Team members"
      description="Choose 1 to 10 members."
      defaultValue={4}
      minValue={1}
      maxValue={10}
      className="w-full max-w-xs"
    />
  );
}
