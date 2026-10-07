"use client";

import { Button } from "@/components/ui/button";

export function ButtonVariantsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="minimal">Minimal</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
