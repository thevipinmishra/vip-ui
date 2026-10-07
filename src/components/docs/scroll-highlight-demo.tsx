"use client";

import { useRef } from "react";
import { ScrollHighlight } from "@/components/ui/scroll-highlight";

export function ScrollHighlightDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-md space-y-3">
      <p className="text-sm text-muted-foreground">
        Scroll inside the passage.
      </p>
      <section
        ref={containerRef}
        aria-label="Scroll to highlight the passage"
        className="h-64 overflow-y-auto rounded-2xl border border-border bg-card px-6 shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <p className="pt-20 pb-12 text-sm text-muted-foreground">
          A note on what we notice when we slow down.
        </p>
        <p className="py-8 text-2xl leading-relaxed font-medium tracking-tight">
          <ScrollHighlight
            containerRef={containerRef}
            text="The smallest details often give a place its character. Watch the light move across a surface and a familiar room becomes new."
          />
        </p>
        <p className="pt-12 pb-32 text-sm text-muted-foreground">
          End of the passage.
        </p>
      </section>
    </div>
  );
}
