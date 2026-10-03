"use client";

import { useState } from "react";
import { More } from "reicon-react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

export function ButtonGroupDemo() {
  const [status, setStatus] = useState("Draft ready to save.");

  return (
    <div className="grid justify-items-center gap-3">
      <ButtonGroup aria-label="Draft actions">
        <Button variant="ghost" onPress={() => setStatus("Draft saved.")}>
          Save draft
        </Button>
        <MenuTrigger>
          <Button variant="ghost" size="icon" aria-label="More draft actions">
            <More size={18} aria-hidden="true" />
          </Button>
          <MenuPopover>
            <MenuContent>
              <MenuItem onAction={() => setStatus("Draft duplicated.")}>
                Duplicate draft
              </MenuItem>
              <MenuItem onAction={() => setStatus("Draft archived.")}>
                Archive draft
              </MenuItem>
            </MenuContent>
          </MenuPopover>
        </MenuTrigger>
      </ButtonGroup>
      <output className="text-sm text-muted-foreground">{status}</output>
    </div>
  );
}
