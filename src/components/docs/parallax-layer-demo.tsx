"use client";

import { useRef } from "react";
import { ParallaxLayer } from "@/components/ui/parallax-layer";

export function ParallaxLayerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-sm space-y-3">
      <p className="text-sm text-muted-foreground">Scroll inside the frame.</p>
      <section
        ref={containerRef}
        aria-label="Scroll through the parallax study"
        className="h-64 overflow-y-auto rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <p className="px-6 pt-8 pb-16 text-xs text-muted-foreground">
          01 / Light
        </p>
        <ParallaxLayer distance={28} containerRef={containerRef}>
          <div className="mx-6 grid h-52 place-items-center overflow-hidden rounded-xl bg-primary text-primary-foreground">
            <span
              aria-hidden="true"
              className="size-28 rounded-full border-[18px] border-current opacity-70"
            />
          </div>
        </ParallaxLayer>
        <p className="px-6 pt-16 pb-10 text-xs text-muted-foreground">
          02 / Shade
        </p>
      </section>
    </div>
  );
}
