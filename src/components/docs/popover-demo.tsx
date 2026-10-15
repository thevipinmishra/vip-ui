"use client";

import { CalendarBlankIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverDescription,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

const details = [
  { label: "Room", value: "Studio B, 3rd floor" },
  { label: "Host", value: "Maya Chen" },
  { label: "Guests", value: "6 accepted, 2 pending" },
];

export function PopoverDemo() {
  return (
    <PopoverTrigger>
      <Button variant="outline">
        <CalendarBlankIcon size={17} aria-hidden="true" />
        Design review
      </Button>
      <Popover placement="bottom start" className="w-80">
        <PopoverDialog>
          <PopoverTitle>Design review</PopoverTitle>
          <PopoverDescription>
            Thursday, June 18 · 2:00–2:45 PM
          </PopoverDescription>
          <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 border-t border-border/70 pt-4 text-sm">
            {details.map((item) => (
              <div key={item.label} className="contents">
                <dt className="text-muted-foreground">{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
