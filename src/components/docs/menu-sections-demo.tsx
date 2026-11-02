"use client";

import { SlidersHorizontalIcon } from "@phosphor-icons/react";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";

export function MenuSectionsDemo() {
  const [sort, setSort] = useState<Selection>(new Set(["modified"]));
  const [shown, setShown] = useState<Selection>(new Set(["extensions"]));

  return (
    <MenuTrigger>
      <Button variant="outline">
        <SlidersHorizontalIcon aria-hidden="true" />
        View options
      </Button>
      <MenuPopover>
        <MenuContent aria-label="View options">
          <MenuSection
            title="Sort by"
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={sort}
            onSelectionChange={setSort}
          >
            <MenuItem id="name">Name</MenuItem>
            <MenuItem id="modified">Last modified</MenuItem>
            <MenuItem id="size">Size</MenuItem>
          </MenuSection>
          <MenuSeparator />
          <MenuSection
            title="Show"
            selectionMode="multiple"
            selectedKeys={shown}
            onSelectionChange={setShown}
          >
            <MenuItem id="extensions">File extensions</MenuItem>
            <MenuItem id="hidden">Hidden files</MenuItem>
          </MenuSection>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}
