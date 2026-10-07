"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

const views = [
  { id: "list", label: "List" },
  { id: "grid", label: "Grid" },
  { id: "board", label: "Board" },
];

const layers = [
  { id: "guides", label: "Guides" },
  { id: "rulers", label: "Rulers" },
  { id: "comments", label: "Comments", disabled: true },
];

export function MenuSelectionDemo() {
  const [view, setView] = useState<Selection>(new Set(["list"]));
  const [visible, setVisible] = useState<Selection>(new Set(["guides"]));
  const viewLabel =
    view === "all"
      ? "All"
      : (views.find((item) => view.has(item.id))?.label ?? "None");
  const layerLabel =
    visible === "all" ? "all layers" : [...visible].join(", ") || "no layers";

  return (
    <div className="grid w-full max-w-md justify-items-start gap-4">
      <div className="flex flex-wrap gap-2">
        <MenuTrigger>
          <Button variant="outline">View: {viewLabel}</Button>
          <MenuPopover>
            <MenuContent
              selectionMode="single"
              selectedKeys={view}
              onSelectionChange={setView}
            >
              {views.map((item) => (
                <MenuItem key={item.id} id={item.id}>
                  {item.label} view
                </MenuItem>
              ))}
            </MenuContent>
          </MenuPopover>
        </MenuTrigger>
        <MenuTrigger>
          <Button variant="outline">Layers</Button>
          <MenuPopover>
            <MenuContent
              selectionMode="multiple"
              selectedKeys={visible}
              onSelectionChange={setVisible}
            >
              {layers.map((item) => (
                <MenuItem key={item.id} id={item.id} isDisabled={item.disabled}>
                  {item.disabled ? "Comments (unavailable)" : item.label}
                </MenuItem>
              ))}
            </MenuContent>
          </MenuPopover>
        </MenuTrigger>
      </div>
      <output className="block w-full rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {viewLabel} view · Visible: {layerLabel}
      </output>
    </div>
  );
}
