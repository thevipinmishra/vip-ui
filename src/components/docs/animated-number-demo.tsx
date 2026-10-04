"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";
import { Stat, StatLabel, StatValue } from "@/components/ui/stat";

export function AnimatedNumberDemo() {
  const [completed, setCompleted] = useState(1240);
  const [open, setOpen] = useState(198);

  return (
    <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
      <Stat className="flex min-w-0 flex-col">
        <StatLabel>Count · completed tasks</StatLabel>
        <StatValue className="text-4xl">
          <AnimatedNumber value={completed} />
        </StatValue>
        <div className="mt-auto pt-6">
          <Button
            variant="secondary"
            size="sm"
            onPress={() => setCompleted((value) => value + 375)}
          >
            Complete 375 tasks
          </Button>
        </div>
      </Stat>
      <Stat className="flex min-w-0 flex-col">
        <StatLabel>Digit slide · open tasks</StatLabel>
        <StatValue className="text-4xl">
          <AnimatedNumber value={open} variant="slide" />
        </StatValue>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          <Button
            variant="secondary"
            size="sm"
            onPress={() => setOpen((value) => value + 1)}
          >
            Add task
          </Button>
          <Button
            variant="outline"
            size="sm"
            isDisabled={open === 0}
            onPress={() => setOpen((value) => Math.max(0, value - 1))}
          >
            Complete task
          </Button>
        </div>
      </Stat>
    </div>
  );
}
