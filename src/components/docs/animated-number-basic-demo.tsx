"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

export function AnimatedNumberBasicDemo() {
  const [tasks, setTasks] = useState(24);

  return (
    <div className="flex items-center gap-5">
      <span className="text-3xl font-semibold tabular-nums">
        <AnimatedNumber value={tasks} />
      </span>
      <Button
        variant="outline"
        size="sm"
        onPress={() => setTasks((value) => value + 1)}
      >
        Add task
      </Button>
    </div>
  );
}
