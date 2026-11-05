"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextSwap } from "@/components/ui/text-swap";

const states = [
  "is ready to publish.",
  "needs one more review.",
  "has unpublished changes.",
];

export function TextSwapInlineDemo() {
  const [index, setIndex] = useState(0);

  return (
    <div className="grid w-full max-w-md gap-4">
      <p className="text-lg leading-7" aria-live="polite" aria-atomic="true">
        The Harbor Museum case study{" "}
        <TextSwap value={states[index]} className="font-medium" />
      </p>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setIndex((current) => (current + 1) % states.length)}
        >
          Change status
        </Button>
      </div>
    </div>
  );
}
