import { CheckIcon } from "@phosphor-icons/react/ssr";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "./utils";

export type TimelineStatus = "complete" | "latest" | "upcoming";

const statusLabels: Partial<Record<TimelineStatus, string>> = {
  latest: "Latest: ",
  upcoming: "Upcoming: ",
};

export function Timeline({ className, ...props }: ComponentProps<"ol">) {
  return (
    <ol {...props} data-slot="timeline" className={cn("w-full", className)} />
  );
}

export function TimelineItem({
  children,
  className,
  status = "complete",
  icon,
  ...props
}: ComponentProps<"li"> & { status?: TimelineStatus; icon?: ReactNode }) {
  return (
    <li
      {...props}
      data-slot="timeline-item"
      data-status={status}
      className={cn(
        "group/timeline-item relative min-w-0 ps-9 pb-6 before:absolute before:inset-s-2.75 before:top-7 before:bottom-1 before:w-px before:bg-primary/25 last:pb-0 last:before:hidden has-[+[data-status=upcoming]]:before:w-0 has-[+[data-status=upcoming]]:before:border-s has-[+[data-status=upcoming]]:before:border-dashed has-[+[data-status=upcoming]]:before:border-muted-foreground/45 has-[+[data-status=upcoming]]:before:bg-transparent data-[status=upcoming]:before:w-0 data-[status=upcoming]:before:border-s data-[status=upcoming]:before:border-dashed data-[status=upcoming]:before:border-muted-foreground/45 data-[status=upcoming]:before:bg-transparent forced-colors:before:bg-[CanvasText]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        data-slot="timeline-marker"
        className={cn(
          "absolute inset-s-0 top-0 grid size-6 place-items-center rounded-full [&_svg:not([class*='size-'])]:size-3.5",
          status === "complete" &&
            "bg-primary text-primary-foreground forced-colors:border",
          status === "latest" &&
            "border-2 border-primary bg-accent text-primary",
          status === "upcoming" &&
            "border-2 border-border bg-card text-muted-foreground",
        )}
      >
        {status === "latest" && (
          <span className="absolute inset-0.5 rounded-full bg-primary/25 motion-safe:animate-ping motion-safe:[animation-duration:2.4s] motion-reduce:hidden forced-colors:hidden" />
        )}
        {icon ??
          (status === "complete" ? (
            <CheckIcon weight="bold" />
          ) : status === "latest" ? (
            <span className="size-2 rounded-full bg-primary forced-colors:bg-[CanvasText]" />
          ) : null)}
      </span>
      {statusLabels[status] && (
        <span className="sr-only">{statusLabels[status]}</span>
      )}
      {children}
    </li>
  );
}

export function TimelineTitle({
  as: Heading = "h3",
  className,
  ...props
}: ComponentProps<"h3"> & { as?: "h2" | "h3" | "h4" }) {
  return (
    <Heading
      {...props}
      data-slot="timeline-title"
      className={cn(
        "text-sm font-semibold leading-6 tracking-[-0.01em] text-foreground wrap-anywhere group-data-[status=upcoming]/timeline-item:font-medium group-data-[status=upcoming]/timeline-item:text-muted-foreground",
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
        "mt-1 block text-xs leading-5 text-muted-foreground tabular-nums",
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
        "mt-1 text-sm leading-6 text-muted-foreground wrap-anywhere",
        className,
      )}
    />
  );
}
