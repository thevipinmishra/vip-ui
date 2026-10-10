"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";

export function TextRevealBasicDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-md justify-items-start gap-5">
      <p className="text-4xl leading-[1.15] font-semibold tracking-[-0.06em]">
        <TextReveal key={replay} text="Make room for the unusual." />
      </p>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setReplay((value) => value + 1)}
      >
        Replay
      </Button>
    </div>
  );
}
