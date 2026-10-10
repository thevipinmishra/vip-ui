"use client";

import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";

export function MenuBasicDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">Open menu</Button>
      <Menu aria-label="Actions">
        <MenuItem>Edit</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
