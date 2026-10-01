"use client";

import { useState } from "react";
import { SubmenuTrigger } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

export function MenuNestedDemo() {
  const [action, setAction] = useState("Choose where to share the project.");

  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-4">
      <MenuTrigger>
        <Button variant="outline">Project actions</Button>
        <MenuPopover>
          <MenuContent>
            <MenuItem onAction={() => setAction("Opened Studio North.")}>
              Open project
            </MenuItem>
            <SubmenuTrigger>
              <MenuItem>Share with</MenuItem>
              <MenuPopover placement="right top" offset={-2}>
                <MenuContent>
                  <MenuItem onAction={() => setAction("Sharing by email.")}>
                    Email
                  </MenuItem>
                  <MenuItem onAction={() => setAction("Copied a share link.")}>
                    Copy link
                  </MenuItem>
                </MenuContent>
              </MenuPopover>
            </SubmenuTrigger>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
      <output className="block w-full rounded-lg bg-card px-4 py-3 text-[13px] text-muted-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70">
        {action}
      </output>
    </div>
  );
}
