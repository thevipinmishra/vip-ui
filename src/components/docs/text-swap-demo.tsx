"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TextSwap } from "@/components/ui/text-swap";

const statuses = [
  { label: "Draft", variant: "neutral" },
  { label: "In review", variant: "warning" },
  { label: "Approved", variant: "success" },
] as const;

export function TextSwapDemo() {
  const [index, setIndex] = useState(0);
  const status = statuses[index];

  return (
    <div className="grid justify-items-center gap-5">
      <Badge variant={status.variant} dot>
        <TextSwap value={status.label} aria-live="polite" />
      </Badge>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setIndex((current) => (current + 1) % statuses.length)}
      >
        Change status
      </Button>
    </div>
  );
}
