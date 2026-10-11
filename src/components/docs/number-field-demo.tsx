"use client";

import { useState } from "react";
import { NumberField } from "@/components/ui/number-field";

export function NumberFieldDemo() {
  const [quantity, setQuantity] = useState(2);
  return (
    <div className="w-full max-w-xs">
      <NumberField
        label="Seats"
        description="Choose between 1 and 10 seats."
        minValue={1}
        maxValue={10}
        value={quantity}
        onChange={setQuantity}
      />
    </div>
  );
}
