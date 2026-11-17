"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline" size="xs">
        <PlusIcon data-icon="inline-start" aria-hidden="true" />
        New project
      </Button>
      <Button variant="outline" size="sm">
        <PlusIcon data-icon="inline-start" aria-hidden="true" />
        New project
      </Button>
      <Button variant="outline">
        <PlusIcon data-icon="inline-start" aria-hidden="true" />
        New project
      </Button>
      <Button variant="outline" size="lg">
        <PlusIcon data-icon="inline-start" aria-hidden="true" />
        New project
      </Button>
      <Button variant="outline" size="xl">
        <PlusIcon data-icon="inline-start" aria-hidden="true" />
        New project
      </Button>
    </div>
  );
}
