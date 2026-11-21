"use client";

import { Button } from "@/components/ui/button";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="xs">New project</Button>
      <Button size="sm">New project</Button>
      <Button>New project</Button>
      <Button size="lg">New project</Button>
      <Button size="xl">New project</Button>
    </div>
  );
}
