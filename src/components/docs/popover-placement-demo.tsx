"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverDescription,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

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

export function PopoverPlacementDemo() {
  return (
    <div className="grid grid-cols-[repeat(3,6rem)] justify-center gap-2 py-6">
      {placements.map((item) => (
        <PopoverTrigger key={item.placement}>
          <Button variant="outline" className={item.cell}>
            {item.label}
          </Button>
          <Popover placement={item.placement} className="w-56 p-4">
            <PopoverArrow />
            <PopoverDialog>
              <PopoverTitle>{item.label}</PopoverTitle>
              <PopoverDescription>
                Opens {item.side} the trigger when there is room.
              </PopoverDescription>
            </PopoverDialog>
          </Popover>
        </PopoverTrigger>
      ))}
    </div>
  );
}
