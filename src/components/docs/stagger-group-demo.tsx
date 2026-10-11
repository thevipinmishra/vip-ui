"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";

const tasks = ["Write the brief", "Choose the typefaces", "Send the proofs"];

export function StaggerGroupDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <StaggerGroup
        key={replay}
        as="ol"
        className="divide-y divide-border rounded-xl border border-border bg-card shadow-[var(--shadow-card)]"
      >
        {tasks.map((task, index) => (
          <StaggerItem
            as="li"
            key={task}
            className="flex min-w-0 items-center gap-3 px-4 py-3 text-sm"
          >
            <span className="font-mono text-xs text-muted-foreground">
              0{index + 1}
            </span>
            <span className="min-w-0 [overflow-wrap:anywhere]">{task}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
      <div>
        <Button
          size="sm"
          variant="secondary"
          onPress={() => setReplay((value) => value + 1)}
        >
          Replay
        </Button>
      </div>
    </div>
  );
}
