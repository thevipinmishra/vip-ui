"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";

export function TextScrambleDemo() {
  const [alternate, setAlternate] = useState(false);

  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="min-w-0 rounded-2xl bg-foreground p-6 text-background">
        <p className="break-words text-3xl leading-tight font-bold tracking-[-0.06em] sm:text-4xl">
          <TextScramble
            value={alternate ? "FIELD NOTES" : "STUDIO NOTES"}
            aria-live="polite"
          />
        </p>
      </div>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setAlternate((value) => !value)}
        >
          Change title
        </Button>
      </div>
    </div>
  );
}
