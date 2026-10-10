import { CheckIcon } from "@phosphor-icons/react/ssr";
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
  status = "complete",
  ...props
}: ComponentProps<"li"> & { status?: "latest" | "complete" }) {
  return (
    <li
      {...props}
      data-slot="timeline-item"
      data-status={status}
      className={cn(
        "relative min-w-0 ps-10 pb-8 before:absolute before:start-[0.6875rem] before:top-7 before:bottom-0 before:w-px before:bg-primary/25 last:pb-0 last:before:hidden forced-colors:before:bg-[CanvasText]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute start-0 top-0 grid size-6 place-items-center rounded-full ring-4 ring-card",
          status === "latest"
            ? "border-2 border-primary bg-accent text-primary"
            : "bg-primary text-primary-foreground forced-colors:border",
        )}
      >
        {status === "latest" ? (
          <span className="size-2 rounded-full bg-primary forced-colors:bg-[CanvasText]" />
        ) : (
          <CheckIcon size={14} weight="bold" />
        )}
      </span>
      {status === "latest" && <span className="sr-only">Latest: </span>}
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
        "text-sm font-semibold leading-6 tracking-[-0.01em] text-foreground [overflow-wrap:anywhere]",
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
      className={cn(
        "mt-1 block text-xs leading-5 text-muted-foreground",
        className,
      )}
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
      className={cn(
        "mt-2 text-sm leading-6 text-muted-foreground [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}
