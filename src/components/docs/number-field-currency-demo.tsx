"use client";

import { useState } from "react";
import { NumberField } from "@/components/ui/number-field";

export function NumberFieldCurrencyDemo() {
  const [budget, setBudget] = useState(4800);

  return (
    <div className="w-full max-w-xs">
      <NumberField
        label="Monthly budget"
        description="Adjust the amount in steps of 100."
        minValue={0}
        step={100}
        value={budget}
        onChange={setBudget}
        formatOptions={{
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }}
      />
    </div>
  );
}
