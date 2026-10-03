import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface MessageProps extends ComponentProps<"article"> {
  sender: string;
  side?: "incoming" | "outgoing" | "system";
  avatar?: ReactNode;
  timestamp?: string;
  dateTime?: string;
  status?: string;
  actions?: ReactNode;
}

export function Message({
  sender,
  side = "incoming",
  avatar,
  timestamp,
  dateTime,
  status,
  actions,
  children,
  className,
  ...props
}: MessageProps) {
  return (
    <article
      {...props}
      data-slot="message"
      data-side={side}
      aria-label={props["aria-label"] ?? `${sender} message`}
      className={cn(
        "flex min-w-0 items-start gap-2.5",
        side === "outgoing" && "justify-end",
        side === "system" && "justify-center",
        className,
      )}
    >
      {side === "incoming" && avatar}
      <div
        className={cn(
          "min-w-0 max-w-[88%] sm:max-w-[75%]",
          side === "incoming" && avatar && "max-w-[calc(100%_-_3.25rem)]",
          side === "system" && "max-w-full text-center",
        )}
      >
        {side !== "system" && (
          <p
            data-slot="message-sender"
            className="mb-1 px-1 text-xs font-medium text-muted-foreground"
          >
            {sender}
          </p>
        )}
        <div
          data-slot="message-content"
          className={cn(
            "min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere] rounded-2xl px-4 py-3 text-sm leading-6",
            side === "outgoing" &&
              "rounded-tr-md bg-accent text-accent-foreground",
            side === "incoming" &&
              "rounded-tl-md border border-border bg-card text-card-foreground shadow-[var(--shadow-card)]",
            side === "system" && "bg-muted/70 text-muted-foreground",
          )}
        >
          {children}
        </div>
        {(timestamp || status || actions) && (
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-xs text-muted-foreground">
            {timestamp && (
              <time dateTime={dateTime} data-slot="message-time">
                {timestamp}
              </time>
            )}
            {status && <span data-slot="message-status">{status}</span>}
            {actions && (
              <div data-slot="message-actions" className="flex gap-1">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
