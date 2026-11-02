"use client";

import { ProgressRing } from "@/components/ui/progress-ring";

export function ProgressRingSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-8">
      <ProgressRing label="Small" value={30} size="sm" />
      <ProgressRing label="Medium" value={55} />
      <ProgressRing label="Large" value={80} size="lg" />
    </div>
  );
}
