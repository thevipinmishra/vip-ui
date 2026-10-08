"use client";

import {
  Archive,
  Copy,
  Edit,
  Eye,
  Link as LinkIcon,
  More,
} from "reicon-react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

const iconClass = "shrink-0 text-muted-foreground";

export function MenuDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">
        <More size={16} aria-hidden="true" />
        Project actions
      </Button>
      <MenuPopover>
        <MenuContent aria-label="Project actions">
          <MenuItem href="/examples/repository">
            <Eye size={16} aria-hidden="true" className={iconClass} />
            View project
          </MenuItem>
          <MenuItem>
            <Edit size={16} aria-hidden="true" className={iconClass} />
            Rename
          </MenuItem>
          <MenuItem>
            <Copy size={16} aria-hidden="true" className={iconClass} />
            <span className="min-w-0 flex-1">Duplicate</span>
            <Kbd>Ctrl D</Kbd>
          </MenuItem>
          <MenuItem>
            <LinkIcon size={16} aria-hidden="true" className={iconClass} />
            <span className="min-w-0 flex-1">Copy link</span>
            <Kbd>Ctrl L</Kbd>
          </MenuItem>
          <MenuSeparator />
          <MenuItem isDisabled>
            <Archive size={16} aria-hidden="true" className={iconClass} />
            Archive
          </MenuItem>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}
