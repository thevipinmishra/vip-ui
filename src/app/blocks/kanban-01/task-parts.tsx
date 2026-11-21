"use client";

import {
  CellSignalHighIcon,
  CellSignalLowIcon,
  CellSignalMediumIcon,
  WarningOctagonIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { type Label, labels, type Priority, priorities } from "./data";

const priorityIcons = {
  urgent: WarningOctagonIcon,
  high: CellSignalHighIcon,
  medium: CellSignalMediumIcon,
  low: CellSignalLowIcon,
} satisfies Record<Priority, unknown>;

export function PriorityIcon({
  priority,
  className,
}: {
  priority: Priority;
  className?: string;
}) {
  const Icon = priorityIcons[priority];
  return (
    <Icon
      size={16}
      weight={priority === "urgent" ? "fill" : "bold"}
      aria-hidden="true"
      className={cn(
        "shrink-0",
        priority === "urgent" ? "text-destructive" : "text-muted-foreground",
        className,
      )}
    />
  );
}

export function priorityName(priority: Priority) {
  return priorities.find((item) => item.id === priority)?.name ?? "";
}

export function labelName(label: Label) {
  return labels.find((item) => item.id === label)?.name ?? "";
}
