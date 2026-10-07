"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextSwap } from "@/components/ui/text-swap";

const words = ["Gather", "Shape", "Release"];

export function TextSwapDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-6 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="grid gap-2">
        <p className="text-xs font-medium tracking-[0.12em] text-muted-foreground uppercase">
          Word {index + 1} / {words.length}
        </p>
        <p className="min-h-[1.2em] text-5xl leading-tight font-semibold tracking-[-0.06em] text-foreground">
          <TextSwap value={words[index]} aria-live="polite" />
        </p>
      </div>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setIndex((current) => (current + 1) % words.length)}
        >
          Next word
        </Button>
      </div>
    </div>
  );
}
