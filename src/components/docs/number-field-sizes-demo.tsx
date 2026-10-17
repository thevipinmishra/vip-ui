"use client";

import { NumberField } from "@/components/ui/number-field";

export function NumberFieldSizesDemo() {
  return (
    <div className="grid w-full max-w-48 gap-3">
      <NumberField size="xs" aria-label="Seats" defaultValue={2} />
      <NumberField size="sm" aria-label="Seats" defaultValue={2} />
      <NumberField size="md" aria-label="Seats" defaultValue={2} />
      <NumberField aria-label="Seats" defaultValue={2} />
    </div>
  );
}
