"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StaggerGroup, StaggerItem } from "@/components/ui/stagger-group";

const days = Array.from({ length: 21 }, (_, index) => index + 1);

export function StaggerGroupTimingDemo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <StaggerGroup
        key={replay}
        as="ol"
        stagger={0.05}
        className="grid grid-cols-7 gap-1.5"
      >
        {days.map((day) => (
          <StaggerItem
            as="li"
            key={day}
            className="grid aspect-square place-items-center rounded-lg border border-border bg-card font-mono text-xs text-muted-foreground"
          >
            {day}
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
