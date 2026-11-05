"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

export function AnimatedNumberBasicDemo() {
  const [checkedIn, setCheckedIn] = useState(128);

  return (
    <div className="grid justify-items-center gap-4 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Guests checked in</p>
        <AnimatedNumber
          value={checkedIn}
          aria-live="polite"
          className="mt-1 block text-5xl font-semibold tracking-[-0.06em]"
        />
        <p className="text-sm text-muted-foreground">of 200 seats</p>
      </div>
      <Button
        variant="secondary"
        size="sm"
        isDisabled={checkedIn === 200}
        onPress={() => setCheckedIn((value) => value + 1)}
      >
        Check in guest
      </Button>
    </div>
  );
}
