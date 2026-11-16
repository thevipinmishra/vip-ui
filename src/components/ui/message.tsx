"use client";

import {
  type ComponentProps,
  createContext,
  type ReactNode,
  useContext,
} from "react";
import { cn } from "@/lib/utils";

export const ConversationItemContext = createContext(false);

export interface MessageProps extends ComponentProps<"article"> {
  sender: string;
  side?: "incoming" | "outgoing" | "system";
  avatar?: ReactNode;
  timestamp?: string;
  dateTime?: string;
  status?: string;
  actions?: ReactNode;
}

const sideLayout = {
  incoming: undefined,
  outgoing: "justify-end",
  system: "justify-center",
} as const;

const bubbleStyles = {
  incoming: "rounded-ss-md border border-border bg-card text-card-foreground",
  outgoing: "rounded-se-md bg-accent text-accent-foreground",
  system: "bg-muted/70 text-muted-foreground",
} as const;

function MessageTime({
  timestamp,
  dateTime,
}: {
  timestamp: string;
  dateTime?: string;
}) {
  return dateTime ? (
    <time dateTime={dateTime} data-slot="message-time">
      {timestamp}
    </time>
  ) : (
    <span data-slot="message-time">{timestamp}</span>
  );
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
  const isConversationItem = useContext(ConversationItemContext);
  return (
    <article
      {...props}
      data-slot="message"
      data-side={side}
      data-conversation-item={isConversationItem ? "" : undefined}
      aria-label={props["aria-label"] ?? `Message from ${sender}`}
      className={cn(
        "group/message flex min-w-0 items-start gap-2",
        sideLayout[side],
        className,
      )}
    >
      {side === "incoming" && avatar}
      <div
        className={cn(
          "min-w-0 max-w-[88%] sm:max-w-[75%]",
          side === "incoming" && avatar && "max-w-[calc(100%-3rem)]",
          side === "system" && "max-w-full text-center",
        )}
      >
        {side === "incoming" && (
          <p
            data-slot="message-sender"
            className="mb-0.5 px-1 text-xs font-medium text-muted-foreground wrap-anywhere"
          >
            {sender}
          </p>
        )}
        <div
          data-slot="message-content"
          className={cn(
            "min-w-0 whitespace-pre-wrap wrap-anywhere rounded-2xl px-3.5 py-2 text-sm leading-6",
            bubbleStyles[side],
          )}
        >
          {children}
        </div>
        {(timestamp || status || actions) && (
          <div
            className={cn(
              "mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 px-1 text-xs text-muted-foreground",
              sideLayout[side],
            )}
          >
            {timestamp && (
              <MessageTime timestamp={timestamp} dateTime={dateTime} />
            )}
            {status && <span data-slot="message-status">{status}</span>}
            {actions && (
              <div
                data-slot="message-actions"
                className="-my-2.5 flex flex-wrap gap-1 transition-opacity duration-150 ease-out-quint group-focus-within/message:opacity-100 group-hover/message:opacity-100 [@media(hover:hover)]:opacity-0"
              >
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
