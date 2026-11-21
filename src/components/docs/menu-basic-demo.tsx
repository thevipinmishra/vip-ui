"use client";

import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";

export function MenuBasicDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">Open menu</Button>
      <Menu aria-label="Documentation">
        <MenuItem href="/components/button">Button</MenuItem>
        <MenuItem href="/components/popover">Popover</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
