"use client";

import { useState } from "react";
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
  return (
    <div className="grid w-full max-w-sm gap-4">
      <PresenceList
        items={items}
        getKey={(item) => item.id}
        aria-label="Release checklist"
      >
        {(item) => (
          <span className="block rounded-lg bg-card px-4 py-3 text-sm shadow-[var(--shadow-card)] ring-1 ring-border/70">
            {item.title}
          </span>
        )}
      </PresenceList>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          isDisabled={items.length === 0}
          onPress={() => setItems((current) => current.slice(1))}
        >
          Complete first
        </Button>
        <Button
          variant="secondary"
          size="sm"
          isDisabled={nextIndex >= backlog.length}
          onPress={() => {
            setItems((current) => [...current, backlog[nextIndex]]);
            setNextIndex((current) => current + 1);
          }}
        >
          Add task
        </Button>
      </div>
    </div>
  );
}
