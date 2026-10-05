"use client";

import { useState } from "react";
import { ArrowUp, Check, Plus } from "reicon-react";
import { Button } from "@/components/ui/button";
import { PresenceList } from "@/components/ui/presence-list";

const backlog = [
  { id: "copy", title: "Review release copy" },
  { id: "icons", title: "Check new icons" },
  { id: "docs", title: "Publish the docs" },
  { id: "notes", title: "Send release notes" },
];

export function PresenceListDemo() {
  const [items, setItems] = useState(backlog.slice(0, 2));
  const [nextIndex, setNextIndex] = useState(2);
  const [message, setMessage] = useState("Reorder or update the list.");
  return (
    <div className="grid w-full max-w-sm gap-4">
      <PresenceList
        items={items}
        getKey={(item) => item.id}
        aria-label="Release checklist"
      >
        {(item) => (
          <span className="flex min-w-0 items-center gap-3 rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-card)] ring-1 ring-border/70">
            <span
              aria-hidden="true"
              className="size-2 shrink-0 rounded-full bg-primary"
            />
            <span className="min-w-0 flex-1 truncate">{item.title}</span>
            <span className="shrink-0 text-xs text-muted-foreground">
              To do
            </span>
          </span>
        )}
      </PresenceList>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          isDisabled={items.length === 0}
          onPress={() => {
            setMessage(`${items[0].title} completed.`);
            setItems((current) => current.slice(1));
          }}
        >
          <Check size={16} aria-hidden="true" /> Complete first
        </Button>
        <Button
          variant="secondary"
          size="sm"
          isDisabled={nextIndex >= backlog.length}
          onPress={() => {
            setItems((current) => [...current, backlog[nextIndex]]);
            setNextIndex((current) => current + 1);
            setMessage(`${backlog[nextIndex].title} added.`);
          }}
        >
          <Plus size={16} aria-hidden="true" /> Add task
        </Button>
        <Button
          variant="outline"
          size="sm"
          isDisabled={items.length < 2}
          onPress={() => {
            setItems((current) => [
              current[current.length - 1],
              ...current.slice(0, -1),
            ]);
            setMessage("Last task moved to the top.");
          }}
        >
          <ArrowUp size={16} aria-hidden="true" /> Move last to top
        </Button>
      </div>
      <output aria-live="polite" className="text-xs text-muted-foreground">
        {message}
      </output>
    </div>
  );
}
