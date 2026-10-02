"use client";

import { useState } from "react";
import { Archive, Check } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupVerticalDemo() {
  const [status, setStatus] = useState<"draft" | "review" | "archived">(
    "draft",
  );

  return (
    <div className="flex w-full max-w-md flex-wrap items-center justify-between gap-5 rounded-xl bg-card p-5 ring-1 ring-border/70">
      <div className="min-w-0">
        <p className="text-sm font-semibold">Homepage copy</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Autumn campaign · Maya Chen
        </p>
        <div className="mt-3">
          <Badge variant={status === "review" ? "accent" : "neutral"} dot>
            {status === "review"
              ? "Ready for review"
              : status === "archived"
                ? "Archived"
                : "Draft"}
          </Badge>
        </div>
      </div>
      <ButtonGroup orientation="vertical" aria-label="Homepage copy actions">
        <Button
          size="sm"
          variant="ghost"
          isDisabled={status === "review"}
          onPress={() => setStatus("review")}
        >
          <Check size={16} aria-hidden="true" /> Mark for review
        </Button>
        <Button
          size="sm"
          variant="ghost"
          isDisabled={status === "archived"}
          onPress={() => setStatus("archived")}
        >
          <Archive size={16} aria-hidden="true" /> Archive draft
        </Button>
        <Button
          size="sm"
          variant="ghost"
          isDisabled={status === "draft"}
          onPress={() => setStatus("draft")}
        >
          Restore draft
        </Button>
      </ButtonGroup>
    </div>
  );
}
