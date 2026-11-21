"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/ui/menu";

export function MenuDemo() {
  const [isPinned, setPinned] = useState(false);

  return (
    <MenuTrigger>
      <Button variant="outline">Component actions</Button>
      <Menu aria-label="Component actions">
        <MenuItem onAction={() => setPinned(!isPinned)}>
          {isPinned ? "Unpin component" : "Pin component"}
        </MenuItem>
        <MenuItem href="/components/button">Open Button docs</MenuItem>
        <MenuItem isDisabled>Archive component</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
