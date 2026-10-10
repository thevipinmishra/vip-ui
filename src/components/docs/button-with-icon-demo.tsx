"use client";

import { ArrowRightIcon, GitBranchIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export function ButtonWithIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button variant="outline">
        <GitBranchIcon size={16} aria-hidden="true" />
        New branch
      </Button>
      <Button>
        Continue
        <ArrowRightIcon size={16} aria-hidden="true" />
      </Button>
    </div>
  );
}
