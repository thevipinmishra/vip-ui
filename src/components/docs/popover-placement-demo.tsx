"use client";

import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

const placements = [
  {
    label: "Notes",
    placement: "top",
    title: "Release notes",
    body: "Keyboard navigation is clearer in the latest update.",
  },
  {
    label: "Details",
    placement: "bottom",
    title: "Studio North",
    body: "Updated today. Shared with four team members.",
  },
  {
    label: "Assignee",
    placement: "left",
    title: "Maya Chen",
    body: "Project lead. Available this afternoon.",
  },
  {
    label: "Share",
    placement: "right",
    title: "Share access",
    body: "Invite a teammate or copy the project link.",
  },
] as const;

export function PopoverPlacementDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8">
      {placements.map((item) => (
        <DialogTrigger key={item.placement}>
          <Button variant="outline">{item.label}</Button>
          <Popover placement={item.placement}>
            <Dialog className="outline-none">
              <Heading slot="title" className="text-sm font-semibold">
                {item.title}
              </Heading>
              <p className="mt-2 max-w-56 text-sm leading-6 text-muted-foreground">
                {item.body}
              </p>
            </Dialog>
          </Popover>
        </DialogTrigger>
      ))}
    </div>
  );
}
