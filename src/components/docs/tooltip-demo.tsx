"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button variant="outline">Save draft</Button>
      <Tooltip>Keep changes private until you publish.</Tooltip>
    </TooltipTrigger>
  );
}
