"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";

const stages = ["Draft", "In review", "Published"] as const;

export function TextScrambleBasicDemo() {
  const [stage, setStage] = useState(0);

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Release status</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight">
          <TextScramble value={stages[stage]} aria-live="polite" />
        </p>
      </div>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setStage((current) => (current + 1) % stages.length)}
      >
        Advance release
      </Button>
    </div>
  );
}
