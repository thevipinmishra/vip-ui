"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

const euro: Intl.NumberFormatOptions = { style: "currency", currency: "EUR" };

export function AnimatedNumberFormatDemo() {
  const [budget, setBudget] = useState(1249.5);

  return (
    <div className="grid justify-items-center gap-4 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Monthly budget</p>
        <AnimatedNumber
          value={budget}
          locale="de-DE"
          formatOptions={euro}
          aria-live="polite"
          className="mt-1 block text-5xl font-semibold tracking-[-0.06em]"
        />
      </div>
      <Button
        variant="secondary"
        size="sm"
        onPress={() => setBudget((value) => value + 250.75)}
      >
        Increase budget
      </Button>
    </div>
  );
}
