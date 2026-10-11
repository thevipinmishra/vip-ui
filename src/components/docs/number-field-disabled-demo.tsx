"use client";

import { NumberField } from "@/components/ui/number-field";

export function NumberFieldDisabledDemo() {
  return (
    <NumberField
      label="Storage (GB)"
      defaultValue={50}
      isDisabled
      className="w-full max-w-xs"
    />
  );
}
