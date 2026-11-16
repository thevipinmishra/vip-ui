"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  ScrollAreaContent,
  ScrollAreaContext,
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@/components/ui/scroll-area";

const messages = [
  {
    initials: "MC",
    name: "Maya Chen",
    subject: "Checkout copy review",
    preview: "I tightened the delivery step and removed the email reminder.",
    time: "9:12",
  },
  {
    initials: "LP",
    name: "Leo Park",
    subject: "Billing portal handoff",
    preview: "The invoice table now keeps its column widths on resize.",
    time: "9:04",
  },
  {
    initials: "AR",
    name: "Ana Ruiz",
    subject: "Product shots",
    preview: "Six retouched angles are in the launch folder.",
    time: "8:48",
  },
  {
    initials: "SI",
    name: "Sam Ito",
    subject: "Launch email",
    preview: "Moved the draft to review and tagged the legal approver.",
    time: "8:31",
  },
  {
    initials: "JK",
    name: "Jo Kim",
    subject: "Weekly metrics",
    preview: "Activation is up two points after the onboarding change.",
    time: "8:02",
  },
  {
    initials: "MC",
    name: "Maya Chen",
    subject: "Design system office hours",
    preview: "Bring the new splitter and scroll area examples.",
    time: "7:46",
  },
  {
    initials: "LP",
    name: "Leo Park",
    subject: "Accessibility pass",
    preview: "Two focus rings need a stronger offset in forced colors.",
    time: "7:20",
  },
  {
    initials: "AR",
    name: "Ana Ruiz",
    subject: "Research notes",
    preview: "Five checkout sessions flagged the account prompt.",
    time: "6:58",
  },
];

export function ScrollAreaContextDemo() {
  return (
    <div className="@container w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <ScrollAreaRoot orientation="both" className="h-72">
        <div className="flex h-12 items-center justify-between gap-3 border-b border-border px-4">
          <div className="shrink-0">
            <p className="text-sm font-medium whitespace-nowrap">
              Shared inbox
            </p>
            <p className="text-xs whitespace-nowrap text-muted-foreground">
              {messages.length} conversations
            </p>
          </div>
          <ScrollAreaContext>
            {(api) => {
              const progress = api.getScrollProgress();
              const scrollbar = api.getScrollbarState({
                orientation: "vertical",
              });
              return (
                <div className="flex items-center gap-1.5">
                  <span className="hidden text-xs text-muted-foreground tabular-nums @[17.5rem]:inline">
                    {Math.round(progress.y * 100)}%
                  </span>
                  <Button
                    size="xs"
                    variant="outline"
                    isDisabled={api.isAtTop}
                    onPress={() => api.scrollToEdge({ edge: "top" })}
                  >
                    <ArrowUpIcon aria-hidden="true" />
                    <span className="sr-only @[17.5rem]:not-sr-only">Top</span>
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    isDisabled={api.isAtBottom}
                    onPress={() => api.scrollToEdge({ edge: "bottom" })}
                  >
                    <ArrowDownIcon aria-hidden="true" />
                    <span className="sr-only @[17.5rem]:not-sr-only">
                      Bottom
                    </span>
                  </Button>
                  <span className="sr-only">
                    {scrollbar.hidden
                      ? "Vertical scrollbar hidden"
                      : "Vertical scrollbar visible"}
                  </span>
                </div>
              );
            }}
          </ScrollAreaContext>
        </div>
        <ScrollAreaViewport
          aria-label="Shared inbox conversations"
          className="h-[calc(100%-3rem)]"
        >
          <ScrollAreaContent>
            <ul className="grid w-[34rem] divide-y divide-border/60">
              {messages.map((message) => (
                <li
                  key={`${message.name}-${message.time}`}
                  className="flex gap-3 px-4 py-3"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-muted text-xs font-medium">
                    {message.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="truncate text-sm font-medium">
                        {message.name}
                      </p>
                      <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                        {message.time}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">
                      {message.subject}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      {message.preview}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollAreaContent>
        </ScrollAreaViewport>
        <ScrollAreaScrollbar orientation="vertical" style={{ top: "3rem" }}>
          <ScrollAreaThumb orientation="vertical" />
        </ScrollAreaScrollbar>
        <ScrollAreaScrollbar orientation="horizontal" />
        <ScrollAreaCorner />
      </ScrollAreaRoot>
    </div>
  );
}
