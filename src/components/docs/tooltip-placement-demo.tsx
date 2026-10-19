"use client";

import { Button } from "@/components/ui/button";
import {
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const placements = [
  { placement: "top", label: "Top", side: "above", cell: "col-start-2" },
  {
    placement: "left",
    label: "Left",
    side: "to the left of",
    cell: "col-start-1 row-start-2",
  },
  {
    placement: "right",
    label: "Right",
    side: "to the right of",
    cell: "col-start-3 row-start-2",
  },
  {
    placement: "bottom",
    label: "Bottom",
    side: "below",
    cell: "col-start-2 row-start-3",
  },
] as const;

export function TooltipPlacementDemo() {
  return (
    <div className="grid grid-cols-[repeat(3,6rem)] justify-center gap-2 py-4">
      {placements.map((item) => (
        <TooltipTrigger key={item.placement}>
          <Button variant="outline" className={item.cell}>
            {item.label}
          </Button>
          <TooltipContent placement={item.placement}>
            <TooltipArrow />
            Opens {item.side} the trigger.
          </TooltipContent>
        </TooltipTrigger>
      ))}
    </div>
  );
}
