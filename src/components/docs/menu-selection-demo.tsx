"use client";

import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";

export function MenuSelectionDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <MenuTrigger>
        <Button variant="outline">Layout</Button>
        <Menu
          aria-label="Layout"
          selectionMode="single"
          defaultSelectedKeys={["list"]}
          disallowEmptySelection
        >
          <MenuItem id="list">List</MenuItem>
          <MenuItem id="grid">Grid</MenuItem>
        </Menu>
      </MenuTrigger>
      <MenuTrigger>
        <Button variant="outline">Visible details</Button>
        <Menu
          aria-label="Visible details"
          selectionMode="multiple"
          defaultSelectedKeys={["size"]}
          shouldCloseOnSelect={false}
        >
          <MenuItem id="size">File size</MenuItem>
          <MenuItem id="modified">Date modified</MenuItem>
        </Menu>
      </MenuTrigger>
    </div>
  );
}
