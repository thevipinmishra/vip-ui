"use client";

import { CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { PresenceList } from "@/components/ui/presence-list";

type Task = { id: string; title: string };

const plan: Task[] = [
  { id: "copy", title: "Review the homepage copy" },
  { id: "assets", title: "Export the brand assets" },
  { id: "update", title: "Send the client update" },
];

export function PresenceListDemo() {
  const [items, setItems] = useState(plan);
  const controls = useRef(new Map<string, HTMLButtonElement>());

  const control = (key: string) => (node: HTMLButtonElement | null) => {
    if (node) controls.current.set(key, node);
    else controls.current.delete(key);
  };

  const move = (id: string, offset: number) => {
    const index = items.findIndex((item) => item.id === id);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= items.length) return;

    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];

    if (target === 0) controls.current.get(`down-${id}`)?.focus();
    if (target === items.length - 1) controls.current.get(`up-${id}`)?.focus();
    setItems(next);
  };

  return (
    <div className="grid w-full max-w-sm gap-3">
      <PresenceList
        items={items}
        getKey={(item) => item.id}
        aria-label="Today's priorities"
      >
        {(item) => (
          <span className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <span className="min-w-0 flex-1 wrap-anywhere">{item.title}</span>
            <Button
              ref={control(`up-${item.id}`)}
              variant="ghost"
              iconOnly
              aria-label={`Move ${item.title} up`}
              isDisabled={items[0]?.id === item.id}
              onPress={() => move(item.id, -1)}
            >
              <CaretUpIcon aria-hidden="true" />
            </Button>
            <Button
              ref={control(`down-${item.id}`)}
              variant="ghost"
              iconOnly
              aria-label={`Move ${item.title} down`}
              isDisabled={items[items.length - 1]?.id === item.id}
              onPress={() => move(item.id, 1)}
            >
              <CaretDownIcon aria-hidden="true" />
            </Button>
          </span>
        )}
      </PresenceList>
    </div>
  );
}
