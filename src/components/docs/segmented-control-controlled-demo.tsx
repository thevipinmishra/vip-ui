"use client";

import { useState } from "react";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@/components/ui/segmented-control";

const ranges = {
  day: "24 hours",
  week: "7 days",
  month: "30 days",
} as const;

type Range = keyof typeof ranges;

export function SegmentedControlControlledDemo() {
  const [range, setRange] = useState<Range>("week");

  return (
    <div className="grid w-full max-w-sm gap-4">
      <SegmentedControl
        aria-label="Chart range"
        value={range}
        onChange={(value) => setRange(value as Range)}
      >
        <SegmentedControlItem value="day">Day</SegmentedControlItem>
        <SegmentedControlItem value="week">Week</SegmentedControlItem>
        <SegmentedControlItem value="month">Month</SegmentedControlItem>
      </SegmentedControl>
      <div className="rounded-lg border border-border bg-card p-4 shadow-(--shadow-card)">
        <p className="text-xs text-muted-foreground">Showing</p>
        <p className="mt-1 text-sm font-medium">Last {ranges[range]}</p>
      </div>
    </div>
  );
}
