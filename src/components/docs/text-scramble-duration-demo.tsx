"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";

const durations = [0.4, 1.2];

export function TextScrambleDurationDemo() {
  const [exporting, setExporting] = useState(false);

  return (
    <div className="grid w-full max-w-sm justify-items-start gap-4">
      <dl className="grid w-full grid-cols-2 gap-4">
        {durations.map((duration) => (
          <div key={duration} className="grid gap-1">
            <dt className="text-xs text-muted-foreground">
              {duration} seconds
            </dt>
            <dd className="text-xl font-semibold">
              <TextScramble
                value={exporting ? "Exporting" : "Exported"}
                duration={duration}
              />
            </dd>
          </div>
        ))}
      </dl>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setExporting((value) => !value)}
      >
        {exporting ? "Finish export" : "Start export"}
      </Button>
    </div>
  );
}
