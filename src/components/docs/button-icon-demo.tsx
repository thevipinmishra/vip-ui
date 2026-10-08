"use client";

import { Plus, Search, Trash } from "reicon-react";
import { Button } from "@/components/ui/button";

export function ButtonIconDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon" aria-label="Add item">
        <Plus size={18} aria-hidden="true" />
      </Button>
      <Button variant="minimal" size="icon" aria-label="Search">
        <Search size={18} aria-hidden="true" />
      </Button>
      <Button variant="destructive" size="icon" aria-label="Delete item">
        <Trash size={18} aria-hidden="true" />
      </Button>
    </div>
  );
}
