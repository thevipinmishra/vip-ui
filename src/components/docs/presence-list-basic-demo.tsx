"use client";

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
        {(item) => <span className="text-sm">{item.title}</span>}
      </PresenceList>
      <Button
        variant="secondary"
        size="sm"
        onPress={() => setItems((current) => (current.length ? [] : tasks))}
      >
        {items.length ? "Complete tasks" : "Restore tasks"}
      </Button>
    </div>
  );
}
