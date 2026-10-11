"use client";

import {
  ChatCircleIcon,
  GridFourIcon,
  KanbanIcon,
  ListBulletsIcon,
  RulerIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
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
  { id: "list", label: "List", icon: ListBulletsIcon },
  { id: "grid", label: "Grid", icon: SquaresFourIcon },
  { id: "board", label: "Board", icon: KanbanIcon },
];

const layers = [
  { id: "guides", label: "Guides", icon: GridFourIcon },
  { id: "rulers", label: "Rulers", icon: RulerIcon },
  { id: "comments", label: "Comments", icon: ChatCircleIcon, disabled: true },
];

export function MenuSelectionDemo() {
  const [view, setView] = useState<Selection>(new Set(["list"]));
  const [visible, setVisible] = useState<Selection>(new Set(["guides"]));
  const viewLabel =
    view === "all"
      ? "All"
      : (views.find((item) => view.has(item.id))?.label ?? "None");

  return (
    <div className="flex flex-wrap justify-center gap-2">
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
                  <Icon size={16} aria-hidden="true" />
                  {item.label} view
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
                <MenuItem key={item.id} id={item.id} isDisabled={item.disabled}>
                  <Icon size={16} aria-hidden="true" />
                  {item.disabled ? "Comments (unavailable)" : item.label}
                </MenuItem>
              );
            })}
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
    </div>
  );
}
