"use client";

import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
  SubmenuTrigger,
} from "@/components/ui/menu";

export function MenuNestedDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">File actions</Button>
      <MenuPopover>
        <MenuContent aria-label="File actions">
          <MenuItem>Rename</MenuItem>
          <MenuItem>Duplicate</MenuItem>
          <SubmenuTrigger>
            <MenuItem>Move to</MenuItem>
            <MenuPopover>
              <MenuContent>
                <MenuItem>Design</MenuItem>
                <MenuItem>Engineering</MenuItem>
                <MenuItem>Marketing</MenuItem>
              </MenuContent>
            </MenuPopover>
          </SubmenuTrigger>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}
