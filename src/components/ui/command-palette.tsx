"use client";

import { type ReactNode, useEffect } from "react";
import { Search } from "reicon-react";
import { cn } from "@/lib/utils";
import { Autocomplete } from "./autocomplete";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import { Kbd } from "./kbd-code";
import { MenuContent, MenuItem } from "./menu";
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
} from "./search-field";

export { MenuItem as CommandPaletteItem };

export interface CommandPaletteProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  placeholder?: string;
  emptyMessage?: string;
  shortcut?: boolean;
  className?: string;
}

export function CommandPalette({
  isOpen,
  onOpenChange,
  children,
  title = "Commands",
  placeholder = "Search commands",
  emptyMessage = "No matching commands.",
  shortcut = true,
  className,
}: CommandPaletteProps) {
  useEffect(() => {
    if (!shortcut) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.key.toLowerCase() === "k" &&
        (event.metaKey || event.ctrlKey) &&
        !event.altKey &&
        !event.shiftKey
      ) {
        event.preventDefault();
        onOpenChange(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange, shortcut]);

  return (
    <Dialog isOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        modalSlot="command-palette"
        modalProps={{
          className: cn("max-w-lg overflow-hidden p-0 sm:p-0", className),
        }}
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <Autocomplete>
          <SearchField autoFocus aria-label={placeholder}>
            {({ isEmpty }) => (
              <div className="relative flex items-center border-b border-border/70 focus-within:border-ring">
                <Search
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute start-4 text-muted-foreground"
                />
                <SearchFieldInput
                  placeholder={placeholder}
                  className="min-h-14 rounded-none border-0 bg-transparent ps-11 shadow-none hover:border-transparent focus-visible:border-transparent focus-visible:ring-0"
                />
                {!isEmpty && <SearchFieldClear />}
              </div>
            )}
          </SearchField>
          <MenuContent
            aria-label={title}
            className="max-h-80 min-h-24 gap-1 p-2"
            renderEmptyState={() => (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            )}
            onAction={() => onOpenChange(false)}
          >
            {children}
          </MenuContent>
        </Autocomplete>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/70 px-4 py-2.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Kbd>↑</Kbd>
            <Kbd>↓</Kbd> Navigate
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Kbd>↵</Kbd> Select
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Kbd>Esc</Kbd> Close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
