"use client";

import { DotsThreeIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

export function ButtonGroupDemo() {
  return (
    <ButtonGroup aria-label="Draft actions">
      <Button variant="ghost">Save draft</Button>
      <MenuTrigger>
        <Button variant="ghost" size="icon" aria-label="More draft actions">
          <DotsThreeIcon size={18} aria-hidden="true" />
        </Button>
        <MenuPopover>
          <MenuContent>
            <MenuItem>Duplicate draft</MenuItem>
            <MenuItem>Archive draft</MenuItem>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
    </ButtonGroup>
  );
}
