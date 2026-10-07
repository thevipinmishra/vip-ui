"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";

export function TextRevealDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
        <p className="text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          <TextReveal
            key={`kicker-${replay}`}
            text="Studio notes"
            split="characters"
            trigger="mount"
          />
        </p>
        <p className="mt-3 text-4xl leading-[1.15] font-semibold tracking-[-0.06em] text-foreground">
          <TextReveal
            key={`title-${replay}`}
            text="Make room for the unusual."
            split="words"
            trigger="mount"
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
