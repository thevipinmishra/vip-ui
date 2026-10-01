"use client";

import { Plus } from "reicon-react";
import { Button } from "@/components/ui/button";

export function ButtonVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="outline" aria-label="Add item">
        <Plus size={17} aria-hidden="true" />
      </Button>
      <Button isDisabled>Unavailable</Button>
    </div>
  );
}
