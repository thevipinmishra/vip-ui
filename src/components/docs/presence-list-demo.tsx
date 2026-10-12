"use client";

import {
  CaretDownIcon,
  CaretUpIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Button } from "@/components/ui/button";
import { PresenceList } from "@/components/ui/presence-list";

type Row = { id: number; label: string };

const initialRows: Row[] = [
  { id: 1, label: "First item" },
  { id: 2, label: "Second item" },
  { id: 3, label: "Third item" },
];

export function PresenceListDemo() {
  const [rows, setRows] = useState(initialRows);
  const controls = useRef(new Map<string, HTMLButtonElement>());

  const control = (key: string) => (node: HTMLButtonElement | null) => {
    if (node) controls.current.set(key, node);
    else controls.current.delete(key);
  };

  const update = (next: Row[], focusKey?: string) => {
    flushSync(() => setRows(next));
    if (focusKey) controls.current.get(focusKey)?.focus();
  };

  const move = (id: number, offset: number) => {
    const index = rows.findIndex((row) => row.id === id);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    update(
      next,
      target === 0
        ? `down-${id}`
        : target === rows.length - 1
          ? `up-${id}`
          : undefined,
    );
  };

  const remove = (id: number) => {
    const index = rows.findIndex((row) => row.id === id);
    const next = rows.filter((row) => row.id !== id);
    const neighbor = next[index] ?? next[index - 1];
    update(next, neighbor ? `remove-${neighbor.id}` : "add");
  };

  const add = () => {
    const id = rows.reduce((max, row) => Math.max(max, row.id), 0) + 1;
    setRows([...rows, { id, label: `Item ${id}` }]);
  };

  return (
    <div className="grid w-full max-w-sm gap-4">
      <PresenceList
        items={rows}
        getKey={(row) => row.id}
        aria-label="Reorderable list"
      >
        {(row) => (
          <span className="flex min-w-0 items-center gap-2 rounded-lg bg-card px-3 py-2 text-sm shadow-[var(--shadow-card)] ring-1 ring-border/70">
            <span className="min-w-0 flex-1 truncate">{row.label}</span>
            <Button
              ref={control(`up-${row.id}`)}
              variant="ghost"
              size="icon"
              aria-label={`Move ${row.label} up`}
              isDisabled={rows[0]?.id === row.id}
              onPress={() => move(row.id, -1)}
            >
              <CaretUpIcon size={16} aria-hidden="true" />
            </Button>
            <Button
              ref={control(`down-${row.id}`)}
              variant="ghost"
              size="icon"
              aria-label={`Move ${row.label} down`}
              isDisabled={rows[rows.length - 1]?.id === row.id}
              onPress={() => move(row.id, 1)}
            >
              <CaretDownIcon size={16} aria-hidden="true" />
            </Button>
            <Button
              ref={control(`remove-${row.id}`)}
              variant="ghost"
              size="icon"
              aria-label={`Remove ${row.label}`}
              onPress={() => remove(row.id)}
            >
              <TrashIcon size={16} aria-hidden="true" />
            </Button>
          </span>
        )}
      </PresenceList>
      <div>
        <Button
          ref={control("add")}
          variant="secondary"
          size="sm"
          onPress={add}
        >
          <PlusIcon size={16} aria-hidden="true" /> Add item
        </Button>
      </div>
    </div>
  );
}
