"use client";

import {
  ChartLineUpIcon,
  DownloadSimpleIcon,
  MagnifyingGlassIcon,
  PackageIcon,
  PlusIcon,
  ReceiptIcon,
  TagIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  CommandPalette,
  CommandPaletteItem,
  CommandPaletteSection,
} from "@/components/ui/command-palette";
import { Kbd, KbdGroup } from "@/components/ui/kbd-code";

const subscribe = () => () => {};

export function SearchCommand({ onExport }: { onExport: () => void }) {
  const [isOpen, setOpen] = useState(false);
  const isMac = useSyncExternalStore(
    subscribe,
    () => /Mac|iPhone|iPad/.test(navigator.platform),
    () => false,
  );

  return (
    <>
      <Button
        variant="outline"
        onPress={() => setOpen(true)}
        aria-label="Search"
        aria-keyshortcuts="Control+K Meta+K"
        className="hidden w-full max-w-xs justify-start gap-2 px-3 font-normal text-muted-foreground shadow-none sm:inline-flex"
      >
        <MagnifyingGlassIcon size={16} aria-hidden="true" />
        <span className="flex-1 text-start">Search</span>
        <KbdGroup aria-hidden="true">
          <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
      <Button
        variant="ghost"
        iconOnly
        aria-label="Search"
        onPress={() => setOpen(true)}
        className="sm:hidden"
      >
        <MagnifyingGlassIcon size={19} aria-hidden="true" />
      </Button>
      <CommandPalette
        isOpen={isOpen}
        onOpenChange={setOpen}
        title="Search"
        placeholder="Search pages and actions"
        emptyMessage="No results."
      >
        <CommandPaletteSection title="Pages">
          <CommandPaletteItem textValue="Orders" href="#">
            <ReceiptIcon aria-hidden="true" />
            Orders
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Customers" href="#">
            <UsersIcon aria-hidden="true" />
            Customers
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Products" href="#">
            <PackageIcon aria-hidden="true" />
            Products
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Reports" href="#">
            <ChartLineUpIcon aria-hidden="true" />
            Reports
          </CommandPaletteItem>
        </CommandPaletteSection>
        <CommandPaletteSection title="Actions">
          <CommandPaletteItem textValue="Add a product">
            <PlusIcon aria-hidden="true" />
            Add a product
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Make a discount code">
            <TagIcon aria-hidden="true" />
            Make a discount code
          </CommandPaletteItem>
          <CommandPaletteItem textValue="Export orders" onAction={onExport}>
            <DownloadSimpleIcon aria-hidden="true" />
            Export orders
          </CommandPaletteItem>
        </CommandPaletteSection>
      </CommandPalette>
    </>
  );
}
