"use client";

import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

export function PopoverDemo() {
  return (
    <DialogTrigger>
      <Button variant="outline">View details</Button>
      <Popover placement="bottom start" className="w-72">
        <Dialog className="focus:outline-hidden">
          <Heading slot="title" className="text-sm font-semibold">
            Project details
          </Heading>
          <dl className="mbs-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 text-sm">
            <dt className="text-muted-foreground">Owner</dt>
            <dd>Maya Chen</dd>
            <dt className="text-muted-foreground">Status</dt>
            <dd>In review</dd>
            <dt className="text-muted-foreground">Due</dt>
            <dd>June 24</dd>
          </dl>
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
