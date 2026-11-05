"use client";

import { ArrowCounterClockwiseIcon, XIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { PresenceList } from "@/components/ui/presence-list";

type Attachment = { id: string; name: string; size: string };

const attachments: Attachment[] = [
  { id: "brand", name: "brand-guide.pdf", size: "2.4 MB" },
  { id: "hero", name: "hero-shot.png", size: "1.8 MB" },
  { id: "pricing", name: "pricing-sheet.pdf", size: "640 KB" },
];

export function PresenceListRemoveDemo() {
  const [items, setItems] = useState(attachments);
  const controls = useRef(new Map<string, HTMLButtonElement>());

  const control = (key: string) => (node: HTMLButtonElement | null) => {
    if (node) controls.current.set(key, node);
    else controls.current.delete(key);
  };

  const remove = (id: string) => {
    const index = items.findIndex((file) => file.id === id);
    const next = items.filter((file) => file.id !== id);
    const neighbor = next[index] ?? next[index - 1];

    if (neighbor) {
      controls.current.get(`remove-${neighbor.id}`)?.focus();
      setItems(next);
      return;
    }

    flushSync(() => setItems(next));
    controls.current.get("restore")?.focus();
  };

  const restore = () => {
    const first = attachments[0];
    if (!first) return;
    flushSync(() => setItems(attachments));
    controls.current.get(`remove-${first.id}`)?.focus();
  };

  return (
    <div className="grid w-full max-w-sm gap-3">
      <PresenceList
        items={items}
        getKey={(file) => file.id}
        aria-label="Draft attachments"
      >
        {(file) => (
          <span className="flex min-w-0 items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 text-sm">
            <span className="grid min-w-0 flex-1 gap-0.5">
              <span className="truncate font-medium">{file.name}</span>
              <span className="text-xs text-muted-foreground">{file.size}</span>
            </span>
            <Button
              ref={control(`remove-${file.id}`)}
              variant="ghost"
              iconOnly
              aria-label={`Remove ${file.name}`}
              onPress={() => remove(file.id)}
            >
              <XIcon aria-hidden="true" />
            </Button>
          </span>
        )}
      </PresenceList>
      {items.length ? null : (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">No files attached.</p>
          <Button
            ref={control("restore")}
            size="sm"
            variant="secondary"
            onPress={restore}
          >
            <ArrowCounterClockwiseIcon aria-hidden="true" />
            Restore files
          </Button>
        </div>
      )}
    </div>
  );
}
