"use client";

import { useId, useState } from "react";
import { Check, InfoCircle } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipActionsDemo() {
  const [reviewed, setReviewed] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const detailsId = useId();

  return (
    <div className="w-full max-w-md rounded-xl bg-card p-5 ring-1 ring-border/70">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-semibold">Homepage copy</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Assigned to Maya Chen · Due Oct 18
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <TooltipTrigger>
            <Button
              size="icon"
              variant="outline"
              aria-label={reviewed ? "Reopen review" : "Mark as reviewed"}
              onPress={() => setReviewed((value) => !value)}
            >
              <Check size={17} aria-hidden="true" />
            </Button>
            <TooltipContent>
              {reviewed ? "Reopen review" : "Mark as reviewed"}
            </TooltipContent>
          </TooltipTrigger>
          <TooltipTrigger>
            <Button
              size="icon"
              variant="ghost"
              aria-label={
                showDetails
                  ? "Hide assignment details"
                  : "Show assignment details"
              }
              aria-expanded={showDetails}
              aria-controls={detailsId}
              onPress={() => setShowDetails((value) => !value)}
            >
              <InfoCircle size={17} aria-hidden="true" />
            </Button>
            <TooltipContent>
              {showDetails
                ? "Hide assignment details"
                : "Show assignment details"}
            </TooltipContent>
          </TooltipTrigger>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-border pt-4">
        <Badge variant={reviewed ? "success" : "warning"} dot>
          {reviewed ? "Reviewed" : "Needs review"}
        </Badge>
        <span
          id={detailsId}
          hidden={!showDetails}
          className="text-xs text-muted-foreground"
        >
          Requested by Alex Kim · 2 comments
        </span>
      </div>
    </div>
  );
}
