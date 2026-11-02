"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/ui/progress-ring";

const total = 5;

export function ProgressRingLabelDemo() {
  const [done, setDone] = useState(3);

  return (
    <div className="grid justify-items-center gap-4">
      <ProgressRing
        label="Setup steps"
        value={done}
        maxValue={total}
        valueLabel={`${done} of ${total}`}
        size="lg"
      />
      <Button
        variant="secondary"
        size="sm"
        onPress={() =>
          setDone((current) => (current >= total ? 0 : current + 1))
        }
      >
        {done >= total ? "Restart" : "Complete a step"}
      </Button>
    </div>
  );
}
