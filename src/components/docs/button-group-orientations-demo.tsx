"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupOrientationsDemo() {
  const [saved, setSaved] = useState(false);
  const [status, setStatus] = useState("Draft");

  return (
    <div className="grid w-full max-w-sm gap-4 rounded-xl bg-card p-5 shadow-[var(--shadow-card)] ring-1 ring-border/70">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold">Autumn campaign</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {saved ? "Draft saved on this page." : "Unsaved changes."}
          </p>
        </div>
        <ButtonGroup aria-label="Save draft">
          <Button variant="ghost" onPress={() => setSaved(true)}>
            Save
          </Button>
          <Button
            variant="ghost"
            isDisabled={!saved}
            onPress={() => setSaved(false)}
          >
            Discard
          </Button>
        </ButtonGroup>
      </div>
      <ButtonGroup orientation="vertical" aria-label="Draft status">
        <Button
          variant="ghost"
          isDisabled={status === "Ready for review"}
          onPress={() => setStatus("Ready for review")}
        >
          Mark for review
        </Button>
        <Button
          variant="ghost"
          isDisabled={status === "Archived"}
          onPress={() => setStatus("Archived")}
        >
          Archive draft
        </Button>
      </ButtonGroup>
      <output className="text-sm text-muted-foreground">
        Status: {status}
      </output>
    </div>
  );
}
