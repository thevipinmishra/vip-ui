"use client";

import { NumberField } from "@/components/ui/number-field";

export function NumberFieldBasicDemo() {
  return (
    <NumberField label="Seats" defaultValue={2} className="w-full max-w-xs" />
  );
}
