"use client";

import { Dialog, DialogTrigger, Heading } from "react-aria-components";
import { FileText, InfoCircle, Share, User } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";

const placements = [
  {
    label: "Notes",
    placement: "top",
    title: "Release notes",
    body: "Keyboard navigation is clearer in the latest update. Shortcuts now match the menu labels.",
    icon: InfoCircle,
  },
  {
    label: "Details",
    placement: "bottom",
    title: "Studio North",
    body: "Website refresh · Due October 18. Shared with Maya, Sam, and Jo.",
    icon: FileText,
  },
  {
    label: "Assignee",
    placement: "left",
    title: "Maya Chen",
    body: "Project lead. Available this afternoon for the homepage review.",
    icon: User,
  },
  {
    label: "Share",
    placement: "right",
    title: "Share access",
    body: "Invite a teammate or copy the project link. Editors can change files.",
    icon: Share,
  },
] as const;

export function PopoverPlacementDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-8">
      {placements.map((item) => {
        const Icon = item.icon;
        return (
          <DialogTrigger key={item.placement}>
            <Button variant="outline">
              <Icon size={16} aria-hidden="true" />
              {item.label}
            </Button>
            <Popover placement={item.placement} className="w-72">
              <Dialog className="outline-none">
                <div className="flex items-center gap-2">
                  <Icon
                    size={16}
                    aria-hidden="true"
                    className="text-muted-foreground"
                  />
                  <Heading slot="title" className="text-sm font-semibold">
                    {item.title}
                  </Heading>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.body}
                </p>
              </Dialog>
            </Popover>
          </DialogTrigger>
        );
      })}
    </div>
  );
}
