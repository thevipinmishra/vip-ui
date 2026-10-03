"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { Button } from "@/components/ui/button";

export function AnimatedNumberBasicDemo() {
  const [tasks, setTasks] = useState(1284);

  return (
    <div className="grid justify-items-center gap-5">
      <AnimatedNumber
        value={tasks}
        className="text-5xl font-semibold tracking-tight"
      />
      <Button
        variant="outline"
        size="sm"
        onPress={() => setTasks((value) => value + 125)}
      >
        Add 125 tasks
      </Button>
    </div>
  );
}
