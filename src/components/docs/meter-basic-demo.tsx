"use client";

import { Meter } from "@/components/ui/meter";

export function MeterBasicDemo() {
  return (
    <Meter
      label="Storage used"
      value={65}
      valueLabel="65 GB of 100 GB"
      className="w-full max-w-sm"
    />
  );
}
