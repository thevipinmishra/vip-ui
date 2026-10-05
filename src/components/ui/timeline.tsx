import type { ComponentProps } from "react";
import { Check } from "reicon-react";
import { cn } from "@/lib/utils";

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
        "relative min-w-0 pb-8 pl-10 before:absolute before:top-7 before:bottom-0 before:left-[0.6875rem] before:w-px before:bg-primary/25 last:pb-0 last:before:hidden",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 grid size-6 place-items-center rounded-full ring-4 ring-card",
          status === "latest"
            ? "border-2 border-primary bg-accent text-primary"
            : "bg-primary text-primary-foreground",
        )}
      >
        {status === "latest" ? (
          <span className="size-2 rounded-full bg-primary" />
        ) : (
          <Check size={14} />
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
        "text-sm font-semibold leading-6 tracking-[-0.01em] text-foreground",
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
      className={cn("mt-2 text-sm leading-6 text-muted-foreground", className)}
    />
  );
}
