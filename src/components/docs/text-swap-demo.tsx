"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextSwap } from "@/components/ui/text-swap";

const services = ["Identity", "Editorial", "Motion"];

export function TextSwapDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid justify-items-center gap-4 text-center">
      <p className="text-sm text-muted-foreground">Studio services</p>
      <p className="text-5xl leading-tight font-semibold tracking-[-0.06em]">
        <TextSwap value={services[index]} aria-live="polite" />
      </p>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setIndex((current) => (current + 1) % services.length)}
      >
        Next service
      </Button>
    </div>
  );
}
