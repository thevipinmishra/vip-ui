"use client";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";
import { PopoverArrow } from "@/components/ui/popover";

const overlays = [
  { id: "dialog", label: "Dialog", href: "/components/dialog" },
  { id: "popover", label: "Popover", href: "/components/popover" },
  { id: "tooltip", label: "Tooltip", href: "/components/tooltip" },
];

export function MenuPlacementDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">Overlay docs</Button>
      <MenuPopover placement="bottom end" offset={10}>
        <PopoverArrow />
        <MenuContent aria-label="Overlay docs" items={overlays}>
          {(item) => <MenuItem href={item.href}>{item.label}</MenuItem>}
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}
