"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

export function AnimatedNumberBasicDemo() {
  const [views, setViews] = useState(1284);

  return (
    <div className="grid justify-items-center gap-4 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Views today</p>
        <AnimatedNumber
          value={views}
          aria-live="polite"
          className="mt-1 block text-5xl font-semibold tracking-[-0.06em]"
        />
      </div>
      <Button
        variant="secondary"
        size="sm"
        onPress={() => setViews((value) => value + 125)}
      >
        Add 125 views
      </Button>
    </div>
  );
}
