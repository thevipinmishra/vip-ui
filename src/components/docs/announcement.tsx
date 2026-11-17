import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { isBefore } from "@/lib/whats-new";

export function Announcement({
  until,
  className,
  ...props
}: ComponentProps<typeof Link> & { until?: string }) {
  if (!isBefore(until)) return null;
  return (
    <Link
      data-slot="announcement"
      className={cn(
        "inline-flex h-7 max-w-full items-center gap-2 rounded-full bg-card/70 ps-1 pe-3 text-xs font-medium text-muted-foreground ring-1 ring-border/70 backdrop-blur transition-colors duration-150 ease-out-quint hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring focus-visible:outline-solid",
        className,
      )}
      {...props}
    />
  );
}

export function AnnouncementTag({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="announcement-tag"
      className={cn(
        "shrink-0 rounded-full bg-foreground px-2 py-0.5 text-[0.6875rem] text-background",
        className,
      )}
      {...props}
    />
  );
}

export function AnnouncementTitle({
  className,
  ...props
}: ComponentProps<"span">) {
  return (
    <span
      data-slot="announcement-title"
      className={cn("min-w-0 truncate", className)}
      {...props}
    />
  );
}
