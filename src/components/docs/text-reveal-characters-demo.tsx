"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/ui/text-reveal";

export function TextRevealCharactersDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-md justify-items-start gap-5">
      <p className="text-3xl font-semibold tracking-[0.12em] uppercase">
        <TextReveal key={replay} text="Studio notes" split="characters" />
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
