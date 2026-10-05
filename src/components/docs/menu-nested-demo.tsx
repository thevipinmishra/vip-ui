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
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col items-start gap-3">
      <MenuTrigger>
        <Button variant="outline">More options</Button>
        <MenuPopover>
          <MenuContent aria-label="More options">
            <MenuItem onAction={() => setSaved((value) => !value)}>
              {saved ? "Remove bookmark" : "Bookmark this page"}
            </MenuItem>
            <SubmenuTrigger>
              <MenuItem>Components</MenuItem>
              <MenuPopover placement="right top" offset={-2}>
                <MenuContent aria-label="Component links">
                  <MenuItem href="/components/avatar">Avatar</MenuItem>
                  <MenuItem href="/components/pagination">Pagination</MenuItem>
                </MenuContent>
              </MenuPopover>
            </SubmenuTrigger>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
      <output className="text-sm text-muted-foreground">
        {saved ? "Bookmarked" : "Not bookmarked"}
      </output>
    </div>
  );
}
