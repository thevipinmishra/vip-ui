"use client";

import { ArrowUpIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ScrollArea, useScrollArea } from "@/components/ui/scroll-area";

const releases = [
  {
    version: "2.6.0",
    date: "Nov 14",
    title: "Scroll area",
    note: "Custom scrollbars that follow the theme.",
  },
  {
    version: "2.5.0",
    date: "Nov 7",
    title: "Color picker",
    note: "Pick a color from a wheel, a slider, or a value.",
  },
  {
    version: "2.4.0",
    date: "Oct 31",
    title: "Command palette",
    note: "Search every action from the keyboard.",
  },
  {
    version: "2.3.0",
    date: "Oct 24",
    title: "Event calendar",
    note: "Plan a week or a day with overlapping events.",
  },
  {
    version: "2.2.0",
    date: "Oct 17",
    title: "Lightbox",
    note: "Open images in a dialog with a caption.",
  },
  {
    version: "2.1.0",
    date: "Oct 10",
    title: "Tree",
    note: "Move, rename, and select nested items.",
  },
  {
    version: "2.0.0",
    date: "Oct 3",
    title: "Data table",
    note: "Search, filter, and sort large sets of rows.",
  },
];

function ScrollToTop() {
  const { isAtTop, scrollToEdge } = useScrollArea();
  return (
    <Button
      size="xs"
      variant="outline"
      isDisabled={isAtTop}
      onPress={() => scrollToEdge({ edge: "top" })}
    >
      <ArrowUpIcon data-icon="inline-start" aria-hidden="true" />
      Top
    </Button>
  );
}

export function ScrollAreaToTopDemo() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <ScrollArea className="h-60" aria-label="Release notes">
        <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-2.5 backdrop-blur-sm">
          <p className="text-sm font-medium">Release notes</p>
          <ScrollToTop />
        </div>
        <ol className="grid gap-4 p-4 text-sm">
          {releases.map((release) => (
            <li key={release.version}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-medium">{release.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                  {release.date}
                </span>
              </div>
              <p className="mt-1 text-muted-foreground">{release.note}</p>
            </li>
          ))}
        </ol>
      </ScrollArea>
    </div>
  );
}
