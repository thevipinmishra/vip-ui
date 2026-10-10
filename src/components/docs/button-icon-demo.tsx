"use client";

import {
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ButtonIconDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="icon" aria-label="Add item">
        <PlusIcon size={18} aria-hidden="true" />
      </Button>
      <Button variant="minimal" size="icon" aria-label="Search">
        <MagnifyingGlassIcon size={18} aria-hidden="true" />
      </Button>
      <Button variant="destructive" size="icon" aria-label="Delete item">
        <TrashIcon size={18} aria-hidden="true" />
      </Button>
    </div>
  );
}
