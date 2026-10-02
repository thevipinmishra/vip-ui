"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";
import { Stat, StatDetail, StatLabel, StatValue } from "@/components/ui/stat";

export function AnimatedNumberDemo() {
  const [count, setCount] = useState(248);
  return (
    <div className="grid w-full max-w-xl gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Stat>
          <StatLabel>Open tasks, count up</StatLabel>
          <StatValue>
            <AnimatedNumber value={count} />
          </StatValue>
          <StatDetail>Across your workspace</StatDetail>
        </Stat>
        <Stat>
          <StatLabel>Open tasks, digit slide</StatLabel>
          <StatValue>
            <AnimatedNumber value={count} variant="slide" />
          </StatValue>
          <StatDetail>Across your workspace</StatDetail>
        </Stat>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setCount((n) => Math.max(0, n - 1))}
        >
          Complete 1
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setCount((n) => n + 1)}
        >
          Add 1
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setCount((n) => n + 54)}
        >
          Add 54
        </Button>
      </div>
    </div>
  );
}
