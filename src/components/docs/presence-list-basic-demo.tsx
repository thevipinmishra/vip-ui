"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PresenceList } from "@/components/ui/presence-list";

const tasks = [
  "Review the onboarding copy",
  "Check the empty-state icons",
  "Publish the release note",
];

export function PresenceListBasicDemo() {
  const [items, setItems] = useState(tasks);

  const advance = () =>
    setItems((current) => (current.length ? current.slice(1) : tasks));

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <PresenceList
        items={items}
        getKey={(task) => task}
        aria-label="Release checklist"
        className="w-full"
      >
        {(task) => (
          <span className="block rounded-lg border border-border bg-card px-3 py-2.5 text-sm">
            {task}
          </span>
        )}
      </PresenceList>
      <div className="flex w-full items-center justify-between gap-3">
        <output aria-live="polite" className="text-sm text-muted-foreground">
          {items.length ? `${items.length} remaining` : "All done"}
        </output>
        <Button size="sm" variant="secondary" onPress={advance}>
          {items.length ? "Complete next" : "Restore checklist"}
        </Button>
      </div>
    </div>
  );
}
