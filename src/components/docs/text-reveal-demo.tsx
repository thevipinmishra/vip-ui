"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";

export function TextRevealDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="grid gap-2">
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          <TextReveal
            key={`kicker-${replay}`}
            text="Case study"
            split="characters"
          />
        </p>
        <p className="text-4xl leading-[1.15] font-semibold tracking-[-0.06em]">
          <TextReveal
            key={`title-${replay}`}
            text="Rebranding the Harbor Museum."
            delay={0.3}
          />
        </p>
      </div>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setReplay((value) => value + 1)}
        >
          Replay
        </Button>
      </div>
    </div>
  );
}
