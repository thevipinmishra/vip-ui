"use client";

import { useState } from "react";
import { Meter } from "@/components/ui/meter";
import { Slider } from "@/components/ui/slider";

export function MeterDemo() {
  const [value, setValue] = useState(65);
  return (
    <div className="grid w-full max-w-sm gap-6">
      <Meter
        label="Storage used"
        value={value}
        valueLabel={`${value} GB of 100 GB`}
      />
      <Slider
        label="Adjust usage"
        value={value}
        onChange={(next) => setValue(Number(next))}
      />
    </div>
  );
}
