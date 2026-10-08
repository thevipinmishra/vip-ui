"use client";

import { SubmenuTrigger } from "react-aria-components";
import {
  Bookmark,
  ChevronRight,
  Layers,
  Link as LinkIcon,
  Pin,
} from "reicon-react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";

const iconClass = "shrink-0 text-muted-foreground";

export function MenuNestedDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">
        <Bookmark size={16} aria-hidden="true" />
        More options
      </Button>
      <MenuPopover>
        <MenuContent aria-label="More options">
          <MenuItem>
            <Pin size={16} aria-hidden="true" className={iconClass} />
            Bookmark this page
          </MenuItem>
          <SubmenuTrigger>
            <MenuItem>
              <Layers size={16} aria-hidden="true" className={iconClass} />
              <span className="min-w-0 flex-1">Components</span>
              <ChevronRight
                size={16}
                aria-hidden="true"
                className={iconClass}
              />
            </MenuItem>
            <MenuPopover placement="right top" offset={-2}>
              <MenuContent aria-label="Component links">
                <MenuItem href="/components/avatar">
                  <LinkIcon
                    size={16}
                    aria-hidden="true"
                    className={iconClass}
                  />
                  Avatar
                </MenuItem>
                <MenuItem href="/components/badge">
                  <LinkIcon
                    size={16}
                    aria-hidden="true"
                    className={iconClass}
                  />
                  Badge
                </MenuItem>
                <MenuItem href="/components/pagination">
                  <LinkIcon
                    size={16}
                    aria-hidden="true"
                    className={iconClass}
                  />
                  Pagination
                </MenuItem>
              </MenuContent>
            </MenuPopover>
          </SubmenuTrigger>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}
