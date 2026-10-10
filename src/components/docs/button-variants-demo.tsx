"use client";

import { Button } from "@/components/ui/button";

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="minimal">Minimal</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
