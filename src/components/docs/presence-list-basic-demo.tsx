"use client";

import { ArrowCounterClockwiseIcon, CheckIcon } from "@phosphor-icons/react";
import { useState } from "react";
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
          <span className="flex items-center gap-4 rounded-xl border border-border bg-card px-4 py-3 text-sm shadow-[var(--shadow-card)]">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent font-mono text-xs font-semibold text-accent-foreground">
              {String(tasks.indexOf(item) + 1).padStart(2, "0")}
            </span>
            <span className="font-medium">{item.title}</span>
          </span>
        )}
      </PresenceList>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <output aria-live="polite" className="text-sm text-muted-foreground">
          {items.length ? `${items.length} remaining` : "All done"}
        </output>
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setItems((current) => (current.length ? [] : tasks))}
        >
          {items.length ? (
            <CheckIcon size={16} aria-hidden="true" />
          ) : (
            <ArrowCounterClockwiseIcon size={16} aria-hidden="true" />
          )}
          {items.length ? "Complete tasks" : "Restore tasks"}
        </Button>
      </div>
    </div>
  );
}
