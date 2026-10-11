"use client";

import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

const placements = [
  {
    label: "Top",
    placement: "top",
    title: "Top placement",
    body: "The panel opens above the trigger.",
  },
  {
    label: "Bottom",
    placement: "bottom",
    title: "Bottom placement",
    body: "The panel opens below the trigger.",
  },
  {
    label: "Left",
    placement: "left",
    title: "Left placement",
    body: "The panel opens to the left of the trigger.",
  },
  {
    label: "Right",
    placement: "right",
    title: "Right placement",
    body: "The panel opens to the right of the trigger.",
  },
] as const;

export function PopoverPlacementDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8">
      {placements.map((item) => (
        <DialogTrigger key={item.placement}>
          <Button variant="outline">{item.label}</Button>
          <Popover placement={item.placement} className="w-64">
            <Dialog className="outline-none">
              <Heading slot="title" className="text-sm font-semibold">
                {item.title}
              </Heading>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
            </Dialog>
          </Popover>
        </DialogTrigger>
      ))}
    </div>
  );
}
