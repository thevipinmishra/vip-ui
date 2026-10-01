"use client";

import { InfoCircle } from "reicon-react";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-5">
      <TooltipTrigger>
        <Button variant="outline">Save draft</Button>
        <TooltipContent>
          Keep your changes private until you publish.
        </TooltipContent>
      </TooltipTrigger>
      <TooltipTrigger>
        <Button variant="ghost" size="icon" aria-label="About automatic sync">
          <InfoCircle size={18} aria-hidden="true" />
        </Button>
        <TooltipContent>
          Changes sync automatically in this workspace.
        </TooltipContent>
      </TooltipTrigger>
    </div>
  );
}
