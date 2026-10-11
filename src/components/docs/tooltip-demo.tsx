"use client";

import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button variant="outline">Save draft</Button>
      <TooltipContent>Keep changes private until you publish.</TooltipContent>
    </TooltipTrigger>
  );
}
