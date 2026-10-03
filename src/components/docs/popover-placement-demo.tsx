"use client";

import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

export function PopoverPlacementDemo() {
  return (
    <DialogTrigger>
      <Button variant="outline">View release notes</Button>
      <Popover placement="top start">
        <Dialog className="outline-none">
          <Heading slot="title" className="text-sm font-semibold">
            Release notes
          </Heading>
          <p className="mt-2 max-w-56 text-sm leading-6 text-muted-foreground">
            The latest update includes improved keyboard navigation.
          </p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
