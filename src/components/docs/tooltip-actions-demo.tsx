"use client";

import { CheckIcon, InfoIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipActionsDemo() {
  return (
    <div className="flex items-center gap-2">
      <TooltipTrigger>
        <Button
          size="icon"
          variant="outline"
          aria-label="Mark this item as reviewed"
        >
          <CheckIcon size={17} aria-hidden="true" />
        </Button>
        <TooltipContent placement="top">Mark as reviewed</TooltipContent>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Show assignment details"
        >
          <InfoIcon size={17} aria-hidden="true" />
        </Button>
        <TooltipContent placement="bottom">
          Show assignment details
        </TooltipContent>
      </TooltipTrigger>
    </div>
  );
}
