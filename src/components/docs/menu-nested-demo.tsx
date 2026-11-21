"use client";

import { Button } from "@/components/ui/button";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  SubmenuTrigger,
} from "@/components/ui/menu";

export function MenuNestedDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">Browse docs</Button>
      <Menu aria-label="Documentation">
        <MenuItem href="/components/button">Button</MenuItem>
        <SubmenuTrigger>
          <MenuItem>Overlays</MenuItem>
          <Menu aria-label="Overlays">
            <MenuItem href="/components/dialog">Dialog</MenuItem>
            <MenuItem href="/components/popover">Popover</MenuItem>
          </Menu>
        </SubmenuTrigger>
      </Menu>
    </MenuTrigger>
  );
}
