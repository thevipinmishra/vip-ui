"use client";

import { Plus } from "reicon-react";
import { Button } from "@/components/ui/button";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Add">
        <Plus size={17} aria-hidden="true" />
      </Button>
    </div>
  );
}
