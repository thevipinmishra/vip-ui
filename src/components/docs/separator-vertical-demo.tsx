"use client";

import { Separator } from "@/components/ui/separator";

export function SeparatorVerticalDemo() {
  return (
    <div className="flex min-h-11 items-center gap-4 text-sm">
      <span>Profile</span>
      <Separator orientation="vertical" />
      <span>Security</span>
    </div>
  );
}
