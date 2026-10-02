import type { ComponentProps } from "react";
import { cn } from "./utils";

export function Timeline({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol {...props} data-slot="timeline" className={cn("w-full", className)} />
  );
}

export function TimelineItem({
  children,
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      {...props}
      data-slot="timeline-item"
      className={cn(
        "relative min-w-0 pb-7 pl-9 before:absolute before:top-5 before:-bottom-1.5 before:left-[0.4375rem] before:w-px before:bg-border last:pb-0 last:before:hidden",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 left-0 grid size-4 place-items-center rounded-full bg-card ring-1 ring-border"
      >
        <span className="size-1.5 rounded-full bg-primary" />
      </span>
      {children}
    </li>
  );
}

export function TimelineTitle({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      {...props}
      data-slot="timeline-title"
      className={cn(
        "text-sm font-semibold leading-6 text-foreground",
        className,
      )}
    />
  );
}

export function TimelineTime({ className, ...props }: ComponentProps<"time">) {
  return (
    <time
      {...props}
      data-slot="timeline-time"
      className={cn("block text-xs leading-5 text-muted-foreground", className)}
    />
  );
}

export function TimelineDescription({
  className,
  ...props
}: ComponentProps<"p">) {
  return (
    <p
      {...props}
      data-slot="timeline-description"
      className={cn("mt-1 text-sm leading-6 text-muted-foreground", className)}
    />
  );
}
