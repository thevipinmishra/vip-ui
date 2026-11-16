"use client";

import {
  MarqueeContent,
  MarqueeContext,
  MarqueeEdge,
  MarqueeItem,
  MarqueePauseTrigger,
  MarqueeRoot,
  MarqueeViewport,
} from "@/components/ui/marquee";

const updates = [
  { version: "2.4", title: "Faster exports" },
  { version: "2.3", title: "Usage dashboard" },
  { version: "2.2", title: "Team roles" },
  { version: "2.1", title: "Comment search" },
  { version: "2.0", title: "New editor" },
];

export function MarqueeCompositionDemo() {
  return (
    <div className="grid w-full gap-2">
      <MarqueeRoot
        autoFill
        pauseOnInteraction
        speed={40}
        translations={{ root: "Latest product updates" }}
        className="rounded-lg border border-border bg-card"
        footer={
          <div className="flex justify-start">
            <MarqueePauseTrigger />
          </div>
        }
      >
        <MarqueeEdge side="start" />
        <MarqueeViewport>
          <MarqueeContext>
            {(api) =>
              Array.from({ length: api.contentCount }, (_, index) => (
                <MarqueeContent
                  // biome-ignore lint/suspicious/noArrayIndexKey: copies are identical and only change in count.
                  key={index}
                  index={index}
                >
                  {updates.map((update) => (
                    <MarqueeItem
                      key={update.title}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        v{update.version}
                      </span>
                      <span className="font-medium whitespace-nowrap">
                        {update.title}
                      </span>
                    </MarqueeItem>
                  ))}
                </MarqueeContent>
              ))
            }
          </MarqueeContext>
        </MarqueeViewport>
        <MarqueeEdge side="end" />
      </MarqueeRoot>
    </div>
  );
}
