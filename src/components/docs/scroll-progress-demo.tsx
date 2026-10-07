"use client";

import { useRef } from "react";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export function ScrollProgressDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <p className="text-sm text-muted-foreground">
        Scroll inside the article.
      </p>
      <ScrollProgress label="Reading progress" containerRef={containerRef} />
      <section
        ref={containerRef}
        aria-label="Article on light and form"
        className="h-56 overflow-y-auto rounded-xl border border-border bg-card px-6 shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <article className="space-y-8 py-8 text-sm leading-7">
          <h3 className="text-2xl font-semibold tracking-tight">
            Light and form
          </h3>
          <p>
            A change in light can shift the shape of an ordinary room. At noon,
            every edge is clear; by evening, the same surfaces meet in shadow.
          </p>
          <p>
            Try looking at one object across the day. Notice where the bright
            edge ends and the quieter details begin.
          </p>
          <p className="pb-16">
            The object stays still. What you see keeps changing.
          </p>
        </article>
      </section>
    </div>
  );
}
