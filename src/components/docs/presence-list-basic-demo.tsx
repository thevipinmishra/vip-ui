"use client";

import { useState } from "react";
import { Check, Refresh } from "reicon-react";
import { Button } from "@/components/ui/button";
import { PresenceList } from "@/components/ui/presence-list";

const tasks = [
  { id: "copy", title: "Review copy" },
  { id: "icons", title: "Check icons" },
];

export function PresenceListBasicDemo() {
  const [items, setItems] = useState(tasks);

  return (
    <div className="grid w-full max-w-sm gap-4">
      <PresenceList items={items} getKey={(item) => item.id} aria-label="Tasks">
        {(item) => (
          <span className="flex items-center gap-3 rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-card)] ring-1 ring-border/70">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-primary"
            />
            {item.title}
          </span>
        )}
      </PresenceList>
      <div className="flex items-center justify-between gap-3">
        <output aria-live="polite" className="text-sm text-muted-foreground">
          {items.length ? `${items.length} remaining` : "All done"}
        </output>
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setItems((current) => (current.length ? [] : tasks))}
        >
          {items.length ? (
            <Check size={16} aria-hidden="true" />
          ) : (
            <Refresh size={16} aria-hidden="true" />
          )}
          {items.length ? "Complete tasks" : "Restore tasks"}
        </Button>
      </div>
    </div>
  );
}
