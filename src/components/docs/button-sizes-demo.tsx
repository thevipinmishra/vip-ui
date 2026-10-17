"use client";

import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="xs">
          <PlusIcon aria-hidden="true" />
          New project
        </Button>
        <Button variant="outline" size="xs" iconOnly aria-label="New project">
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <PlusIcon aria-hidden="true" />
          New project
        </Button>
        <Button variant="outline" size="sm" iconOnly aria-label="New project">
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline">
          <PlusIcon aria-hidden="true" />
          New project
        </Button>
        <Button variant="outline" iconOnly aria-label="New project">
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="lg">
          <PlusIcon aria-hidden="true" />
          New project
        </Button>
        <Button variant="outline" size="lg" iconOnly aria-label="New project">
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="xl">
          <PlusIcon aria-hidden="true" />
          New project
        </Button>
        <Button variant="outline" size="xl" iconOnly aria-label="New project">
          <PlusIcon aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
