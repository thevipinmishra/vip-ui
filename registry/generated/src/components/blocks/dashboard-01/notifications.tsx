"use client";

import {
  BellIcon,
  PackageIcon,
  ReceiptIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "../../vip-ui/button";
import {
  Popover,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "../../vip-ui/popover";
import { TooltipContent, TooltipTrigger } from "../../vip-ui/tooltip";
import { cn } from "../../vip-ui/utils";

const initialNotifications = [
  {
    id: "stock",
    icon: WarningIcon,
    title: "Low stock: Linen tote, natural",
    detail: "4 left. 31 sold in the last 7 days.",
    time: "12 min ago",
    unread: true,
  },
  {
    id: "payout",
    icon: ReceiptIcon,
    title: "Payout of $12,480 sent",
    detail: "It arrives in your bank account on Oct 2.",
    time: "1 h ago",
    unread: true,
  },
  {
    id: "review",
    icon: PackageIcon,
    title: "Order #3204 is late",
    detail: "The carrier has no scan for 3 days.",
    time: "Yesterday",
    unread: false,
  },
];

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unread = notifications.filter((item) => item.unread).length;

  return (
    <PopoverTrigger>
      <TooltipTrigger>
        <Button
          variant="ghost"
          iconOnly
          aria-label={
            unread ? `Notifications, ${unread} unread` : "Notifications"
          }
          className="relative"
        >
          <BellIcon size={19} aria-hidden="true" />
          {unread > 0 && (
            <span
              aria-hidden="true"
              className="absolute inset-e-2.5 top-2.5 size-2 rounded-full bg-destructive ring-2 ring-card"
            />
          )}
        </Button>
        <TooltipContent>Notifications</TooltipContent>
      </TooltipTrigger>
      <Popover placement="bottom end" className="w-88 p-0">
        <PopoverDialog aria-label="Notifications">
          <div className="flex items-center justify-between gap-3 border-b border-border/70 py-2 pe-2 ps-4">
            <PopoverTitle>Notifications</PopoverTitle>
            <Button
              variant="ghost"
              size="sm"
              isDisabled={unread === 0}
              onPress={(event) => {
                event.target.closest<HTMLElement>('[role="dialog"]')?.focus();
                setNotifications((current) =>
                  current.map((item) => ({ ...item, unread: false })),
                );
              }}
            >
              Mark all as read
            </Button>
          </div>
          <ul className="divide-y divide-border/70">
            {notifications.map((item) => (
              <li key={item.id} className="flex gap-3 px-4 py-3">
                <span
                  aria-hidden="true"
                  className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground"
                >
                  <item.icon size={16} />
                </span>
                <div className="min-w-0 flex-1 text-sm">
                  <p
                    className={cn(
                      "font-medium",
                      !item.unread && "text-muted-foreground",
                    )}
                  >
                    {item.unread && <span className="sr-only">Unread: </span>}
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-muted-foreground">{item.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.time}
                  </p>
                </div>
                {item.unread && (
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-2 shrink-0 rounded-full bg-primary"
                  />
                )}
              </li>
            ))}
          </ul>
        </PopoverDialog>
      </Popover>
    </PopoverTrigger>
  );
}
