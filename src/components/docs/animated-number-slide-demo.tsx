"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

export function AnimatedNumberSlideDemo() {
  const [open, setOpen] = useState(198);

  return (
    <div className="grid justify-items-center gap-4 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Open tasks</p>
        <AnimatedNumber
          value={open}
          variant="slide"
          aria-live="polite"
          className="mt-1 block text-5xl font-semibold tracking-[-0.06em]"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setOpen((value) => value + 1)}
        >
          Add task
        </Button>
        <Button
          variant="outline"
          size="sm"
          isDisabled={open === 0}
          onPress={() => setOpen((value) => Math.max(0, value - 1))}
        >
          Complete task
        </Button>
      </div>
    </div>
  );
}
