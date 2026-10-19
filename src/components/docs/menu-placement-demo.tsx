"use client";

import {
  DotsThreeIcon,
  DownloadSimpleIcon,
  FileTextIcon,
  LinkIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";
import { PopoverArrow } from "@/components/ui/popover";

const iconClass = "text-muted-foreground";

export function MenuPlacementDemo() {
  return (
    <div className="flex w-full max-w-sm items-center gap-3 rounded-xl border border-border px-3 py-2">
      <FileTextIcon size={20} aria-hidden="true" className={iconClass} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">Quarterly report.pdf</p>
        <p className="text-xs text-muted-foreground">2.4 MB</p>
      </div>
      <MenuTrigger>
        <Button iconOnly variant="ghost" aria-label="More actions">
          <DotsThreeIcon size={16} aria-hidden="true" />
        </Button>
        <MenuPopover placement="bottom end">
          <PopoverArrow />
          <MenuContent aria-label="File actions">
            <MenuItem>
              <PencilSimpleIcon
                size={16}
                aria-hidden="true"
                className={iconClass}
              />
              Rename
            </MenuItem>
            <MenuItem>
              <DownloadSimpleIcon
                size={16}
                aria-hidden="true"
                className={iconClass}
              />
              Download
            </MenuItem>
            <MenuItem>
              <LinkIcon size={16} aria-hidden="true" className={iconClass} />
              Copy link
            </MenuItem>
            <MenuItem>
              <TrashIcon size={16} aria-hidden="true" className={iconClass} />
              Delete
            </MenuItem>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
    </div>
  );
}
