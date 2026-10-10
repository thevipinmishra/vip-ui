"use client";

import { Button } from "@/components/ui/button";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline" size="sm">
        Small
      </Button>
      <Button variant="outline">Default</Button>
      <Button variant="outline" size="lg">
        Large
      </Button>
    </div>
  );
}
