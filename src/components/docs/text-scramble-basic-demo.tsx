"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";

export function TextScrambleBasicDemo() {
  const [alternate, setAlternate] = useState(false);

  return (
    <div className="grid w-full max-w-md justify-items-start gap-5">
      <p className="text-3xl font-semibold tracking-tight">
        <TextScramble
          value={alternate ? "FIELD NOTES" : "STUDIO NOTES"}
          aria-live="polite"
        />
      </p>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setAlternate((value) => !value)}
      >
        Change title
      </Button>
    </div>
  );
}
