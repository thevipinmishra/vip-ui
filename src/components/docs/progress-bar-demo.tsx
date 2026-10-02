"use client";

import { useState } from "react";
import { ArrowRight, Upload } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

export function ProgressBarDemo() {
  const [value, setValue] = useState(40);
  return (
    <div className="grid w-full max-w-md gap-5 rounded-xl bg-card p-5 ring-1 ring-border/70">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold">Campaign assets</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Studio North · 3 files
          </p>
        </div>
        <Badge variant={value >= 100 ? "success" : "accent"} dot>
          {value >= 100 ? "Ready" : "Uploading"}
        </Badge>
      </div>
      <ProgressBar label="Cover.png · 2.4 MB" value={value} />
      <div className="border-t border-border pt-4">
        <ProgressBar
          label={
            value >= 100
              ? "Preview thumbnails ready"
              : "Preparing preview thumbnails"
          }
          isIndeterminate={value < 100}
          value={value >= 100 ? 100 : undefined}
        />
      </div>
      <div>
        <Button
          variant="secondary"
          size="sm"
          onPress={() =>
            setValue((current) => (current >= 100 ? 0 : current + 20))
          }
        >
          {value >= 100 ? (
            <Upload size={16} aria-hidden="true" />
          ) : (
            <ArrowRight size={16} aria-hidden="true" />
          )}
          {value >= 100 ? "Restart upload" : "Advance upload"}
        </Button>
      </div>
    </div>
  );
}
