"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";

const codes = ["482 109", "735 284", "196 803"];

export function TextScrambleDemo() {
  const [code, setCode] = useState(0);

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-4">
      <div>
        <p className="text-sm text-muted-foreground">Verification code</p>
        <p className="mt-1 text-4xl font-semibold tracking-[0.16em]">
          <TextScramble
            value={codes[code]}
            glyphs="0123456789"
            aria-live="polite"
          />
        </p>
      </div>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setCode((current) => (current + 1) % codes.length)}
      >
        Send new code
      </Button>
    </div>
  );
}
