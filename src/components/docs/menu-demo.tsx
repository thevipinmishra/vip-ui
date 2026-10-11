"use client";

import {
  ArchiveIcon,
  CopyIcon,
  DotsThreeIcon,
  EyeIcon,
  LinkIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

const iconClass = "text-muted-foreground";

export function MenuDemo() {
  return (
    <MenuTrigger>
      <Button variant="outline">
        <DotsThreeIcon size={16} aria-hidden="true" />
        Project actions
      </Button>
      <MenuPopover>
        <MenuContent aria-label="Project actions">
          <MenuItem href="/blocks/dashboard-01">
            <EyeIcon size={16} aria-hidden="true" className={iconClass} />
            View project
          </MenuItem>
          <MenuItem>
            <PencilSimpleIcon
              size={16}
              aria-hidden="true"
              className={iconClass}
            />
            Rename
          </MenuItem>
          <MenuItem>
            <CopyIcon size={16} aria-hidden="true" className={iconClass} />
            Duplicate
            <Kbd>Ctrl D</Kbd>
          </MenuItem>
          <MenuItem>
            <LinkIcon size={16} aria-hidden="true" className={iconClass} />
            Copy link
            <Kbd>Ctrl L</Kbd>
          </MenuItem>
          <MenuSeparator />
          <MenuItem isDisabled>
            <ArchiveIcon size={16} aria-hidden="true" className={iconClass} />
            Archive
          </MenuItem>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}
