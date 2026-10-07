"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Grid, Layers, List, Message, Pin, Ruler } from "reicon-react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

const views = [
  { id: "list", label: "List", icon: List },
  { id: "grid", label: "Grid", icon: Grid },
  { id: "board", label: "Board", icon: Layers },
];

const layers = [
  { id: "guides", label: "Guides", icon: Pin },
  { id: "rulers", label: "Rulers", icon: Ruler },
  { id: "comments", label: "Comments", icon: Message, disabled: true },
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
              {views.map((item) => {
                const Icon = item.icon;
                return (
                  <MenuItem key={item.id} id={item.id}>
                    <Icon size={16} aria-hidden="true" className="shrink-0" />
                    <span className="min-w-0 flex-1">{item.label} view</span>
                  </MenuItem>
                );
              })}
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
              {layers.map((item) => {
                const Icon = item.icon;
                return (
                  <MenuItem
                    key={item.id}
                    id={item.id}
                    isDisabled={item.disabled}
                  >
                    <Icon size={16} aria-hidden="true" className="shrink-0" />
                    <span className="min-w-0 flex-1">
                      {item.disabled ? "Comments (unavailable)" : item.label}
                    </span>
                  </MenuItem>
                );
              })}
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
