"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export function MenuDemo() {
  const [reviewed, setReviewed] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <MenuTrigger>
        <Button variant="outline">Project actions</Button>
        <MenuPopover>
          <MenuContent aria-label="Component links and actions">
            <MenuItem href="/components/avatar">Avatar docs</MenuItem>
            <MenuItem href="/components/attachment">Attachment docs</MenuItem>
            <MenuSeparator />
            <MenuItem onAction={() => setReviewed((value) => !value)}>
              {reviewed ? "Mark as unread" : "Mark as reviewed"}
            </MenuItem>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
      <output className="text-sm text-muted-foreground">
        {reviewed ? "Reviewed" : "Not reviewed"}
      </output>
    </div>
  );
}
