"use client";

import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

export function PopoverDemo() {
  return (
    <DialogTrigger>
      <Button variant="outline">Project details</Button>
      <Popover placement="bottom start">
        <Dialog className="outline-none">
          <Heading slot="title" className="text-sm font-semibold">
            Studio North
          </Heading>
          <p className="mt-2 max-w-56 text-sm leading-6 text-muted-foreground">
            Updated today. Shared with four team members.
          </p>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
