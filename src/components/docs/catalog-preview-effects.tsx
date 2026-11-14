"use client";

import { BorderBeam } from "@/components/ui/border-beam";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { SpotlightCard } from "@/components/ui/spotlight-card";

export function SpotlightCardPreview() {
  return (
    <div className="grid w-full grid-cols-2 gap-3">
      {["Drafts", "Reviews"].map((title) => (
        <SpotlightCard key={title}>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>Move the pointer here.</CardDescription>
          </CardHeader>
        </SpotlightCard>
      ))}
    </div>
  );
}

export function BorderBeamPreview() {
  return (
    <div className="relative w-full rounded-xl border border-border bg-card p-5 shadow-(--shadow-card)">
      <p className="text-sm font-medium">Pro plan</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">$24</p>
      <BorderBeam duration={4} />
    </div>
  );
}

export function ProgressiveBlurPreview() {
  return (
    <div className="relative h-36 w-full overflow-clip rounded-xl border border-border bg-card shadow-(--shadow-card)">
      <ul className="grid gap-2 p-4 text-sm">
        {["Version 2.4", "Version 2.3", "Version 2.2", "Version 2.1"].map(
          (item) => (
            <li key={item} className="font-medium">
              {item}
              <span className="block text-xs font-normal text-muted-foreground">
                Faster boards and shared comments.
              </span>
            </li>
          ),
        )}
      </ul>
      <ProgressiveBlur className="h-20" />
    </div>
  );
}
