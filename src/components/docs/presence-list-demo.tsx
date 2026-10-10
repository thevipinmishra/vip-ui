"use client";

import {
  CaretDownIcon,
  CaretUpIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
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

  const move = (id: number, offset: number) => {
    setRows((current) => {
      const index = current.findIndex((row) => row.id === id);
      const target = index + offset;
      if (index < 0 || target < 0 || target >= current.length) return current;
      const next = [...current];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const add = () => {
    setRows((current) => {
      const id = current.reduce((max, row) => Math.max(max, row.id), 0) + 1;
      return [...current, { id, label: `Item ${id}` }];
    });
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
              variant="ghost"
              size="icon"
              aria-label={`Move ${row.label} up`}
              isDisabled={rows[0]?.id === row.id}
              onPress={() => move(row.id, -1)}
            >
              <CaretUpIcon size={16} aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Move ${row.label} down`}
              isDisabled={rows[rows.length - 1]?.id === row.id}
              onPress={() => move(row.id, 1)}
            >
              <CaretDownIcon size={16} aria-hidden="true" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Remove ${row.label}`}
              onPress={() =>
                setRows((current) =>
                  current.filter((item) => item.id !== row.id),
                )
              }
            >
              <TrashIcon size={16} aria-hidden="true" />
            </Button>
          </span>
        )}
      </PresenceList>
      <div>
        <Button variant="secondary" size="sm" onPress={add}>
          <PlusIcon size={16} aria-hidden="true" /> Add item
        </Button>
      </div>
    </div>
  );
}
