"use client";

import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

export function PopoverDemo() {
  return (
    <DialogTrigger>
      <Button variant="outline">View details</Button>
      <Popover placement="bottom start" className="w-72">
        <Dialog className="outline-none">
          <Heading slot="title" className="text-sm font-semibold">
            Project details
          </Heading>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Anchored content stays open until you click outside or press
            Escape.
          </p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
