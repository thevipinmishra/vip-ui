"use client";

import {
  ChatCircleIcon,
  CheckCircleIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHandle,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const notifications = [
  {
    icon: ChatCircleIcon,
    title: "Leo commented on Onboarding flow",
    time: "2 min ago",
  },
  {
    icon: UserPlusIcon,
    title: "Ana joined the Design team",
    time: "1 hour ago",
  },
  {
    icon: CheckCircleIcon,
    title: "Release 2.4 passed all checks",
    time: "Yesterday",
  },
];

export function SheetInsetDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <SheetTrigger>
        <Button variant="outline">Notifications</Button>
        <Sheet position="right" size="sm" inset>
          <SheetHandle />
          <SheetHeader>
            <SheetTitle>Notifications</SheetTitle>
            <SheetDescription>3 new since your last visit.</SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody>
            <ul className="grid gap-1">
              {notifications.map(({ icon: Icon, title, time }) => (
                <li key={title} className="flex min-w-0 gap-3 rounded-lg p-2">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="grid min-w-0 gap-0.5">
                    <span className="text-sm">{title}</span>
                    <span className="text-xs text-muted-foreground">
                      {time}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </SheetBody>
          <SheetFooter>
            <SheetClose variant="outline">Mark all as read</SheetClose>
          </SheetFooter>
        </Sheet>
      </SheetTrigger>

      <SheetTrigger>
        <Button variant="outline">Quick actions</Button>
        <Sheet size="sm" inset>
          <SheetHandle />
          <SheetHeader>
            <SheetTitle>Quick actions</SheetTitle>
          </SheetHeader>
          <SheetBody className="grid gap-1 px-3 pb-4">
            {["Duplicate", "Move to folder", "Copy link"].map((action) => (
              <SheetClose
                key={action}
                variant="ghost"
                className="justify-start px-3"
              >
                {action}
              </SheetClose>
            ))}
          </SheetBody>
        </Sheet>
      </SheetTrigger>
    </div>
  );
}
