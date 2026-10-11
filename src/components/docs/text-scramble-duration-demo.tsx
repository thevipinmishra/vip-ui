"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TextScramble } from "@/components/ui/text-scramble";

const durations = [0.4, 1.2];

export function TextScrambleDurationDemo() {
  const [alternate, setAlternate] = useState(false);

  return (
    <div className="grid w-full max-w-md justify-items-start gap-5">
      <dl className="grid gap-3">
        {durations.map((duration) => (
          <div key={duration} className="grid gap-1">
            <dt className="text-xs text-muted-foreground">
              {duration} seconds
            </dt>
            <dd className="text-xl font-semibold">
              <TextScramble
                value={alternate ? "UP TO DATE" : "SYNCING"}
                duration={duration}
              />
            </dd>
          </div>
        ))}
      </dl>
      <Button
        size="sm"
        variant="secondary"
        onPress={() => setAlternate((value) => !value)}
      >
        Change status
      </Button>
    </div>
  );
}
