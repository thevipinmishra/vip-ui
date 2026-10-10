"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextSwap } from "@/components/ui/text-swap";

const words = ["Gather", "Shape", "Release"];

export function TextSwapDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid justify-items-center gap-5 text-center">
      <p className="text-5xl leading-tight font-semibold tracking-[-0.06em]">
        <TextSwap value={words[index]} aria-live="polite" />
      </p>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setIndex((current) => (current + 1) % words.length)}
      >
        Next word
      </Button>
    </div>
  );
}
