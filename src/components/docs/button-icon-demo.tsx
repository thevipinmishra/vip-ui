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
      <Button iconOnly aria-label="Add item">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" iconOnly aria-label="Search">
        <MagnifyingGlassIcon aria-hidden="true" />
      </Button>
      <Button variant="destructive" iconOnly aria-label="Delete item">
        <TrashIcon aria-hidden="true" />
      </Button>
    </div>
  );
}
