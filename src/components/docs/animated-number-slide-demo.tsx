"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

export function AnimatedNumberSlideDemo() {
  const [stock, setStock] = useState(198);

  return (
    <div className="grid justify-items-center gap-4 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Units in stock</p>
        <AnimatedNumber
          value={stock}
          variant="slide"
          aria-live="polite"
          className="mt-1 block text-5xl font-semibold tracking-[-0.06em]"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setStock((value) => value + 1)}
        >
          Receive one
        </Button>
        <Button
          variant="outline"
          size="sm"
          isDisabled={stock === 0}
          onPress={() => setStock((value) => Math.max(0, value - 1))}
        >
          Sell one
        </Button>
      </div>
    </div>
  );
}
