"use client";

import { ArrowRightIcon, GitBranchIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ButtonWithIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline">
        <GitBranchIcon aria-hidden="true" />
        New branch
      </Button>
      <Button>
        Continue
        <ArrowRightIcon aria-hidden="true" />
      </Button>
    </div>
  );
}
