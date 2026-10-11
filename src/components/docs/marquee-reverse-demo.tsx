"use client";

import { Marquee } from "@/components/ui/marquee";

const disciplines = [
  "Typography",
  "Photography",
  "Editorial",
  "Illustration",
  "Motion",
];

export function MarqueeReverseDemo() {
  return (
    <Marquee reverse speed={60} className="w-full">
      {disciplines.map((discipline, index) => (
        <span
          key={discipline}
          className="inline-flex items-center gap-4 whitespace-nowrap rounded-xl border border-border bg-card px-5 py-4 text-sm font-medium shadow-[var(--shadow-card)]"
        >
          <span aria-hidden="true" className="font-mono text-xs text-primary">
            0{index + 1}
          </span>
          {discipline}
        </span>
      ))}
    </Marquee>
  );
}
