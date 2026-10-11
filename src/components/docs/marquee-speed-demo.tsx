"use client";

import { Marquee } from "@/components/ui/marquee";

const tags = ["Serif", "Grotesk", "Mono", "Display", "Script", "Slab"];

export function MarqueeSpeedDemo() {
  return (
    <Marquee speed={25} className="w-full [--marquee-gap:0.5rem]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="whitespace-nowrap rounded-full border border-border bg-card px-3 py-1 text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </Marquee>
  );
}
