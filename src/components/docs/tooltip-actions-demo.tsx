"use client";

import { CheckIcon, InfoIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipActionsDemo() {
  return (
    <div className="flex items-center gap-2">
      <TooltipTrigger>
        <Button iconOnly variant="outline" aria-label="Mark as reviewed">
          <CheckIcon aria-hidden="true" />
        </Button>
        <Tooltip>Mark as reviewed</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button iconOnly variant="ghost" aria-label="Show details">
          <InfoIcon aria-hidden="true" />
        </Button>
        <Tooltip placement="bottom">Show details</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
