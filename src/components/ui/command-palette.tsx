"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect } from "react";
import {
  Collection,
  Header,
  MenuSection,
  type MenuSectionProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Autocomplete } from "./autocomplete";
import { DialogContent, DialogTitle } from "./dialog";
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
        !event.shiftKey &&
        !event.repeat &&
        !event.defaultPrevented
      ) {
        event.preventDefault();
        onOpenChange(!isOpen);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onOpenChange, shortcut]);

  return (
    <DialogContent
      modalSlot="command-palette"
      className="flex min-h-0 flex-col"
      overlayProps={{
        isOpen,
        onOpenChange,
        className: "sm:items-start sm:pt-[12vh]",
      }}
      modalProps={{
        className: cn(
          "flex flex-col p-0 pb-[env(safe-area-inset-bottom)] sm:max-w-lg sm:p-0",
          "sm:max-h-[calc(var(--visual-viewport-height,100dvh)-12vh-1rem)] sm:origin-top sm:duration-180 sm:exiting:duration-120 motion-safe:sm:entering:translate-y-0 motion-safe:sm:entering:scale-98 motion-safe:sm:exiting:translate-y-0 motion-safe:sm:exiting:scale-99",
          className,
        ),
      }}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <Autocomplete>
        <SearchField autoFocus aria-label={placeholder} className="shrink-0">
          {({ isEmpty }) => (
            <div className="relative flex items-center border-b border-border/70 focus-within:border-ring">
              <MagnifyingGlassIcon
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
          autoFocus="first"
          className="min-h-0 max-h-80 flex-1 max-sm:min-h-80 gap-1 overflow-y-auto overscroll-contain p-2"
          renderEmptyState={() => (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          )}
          onAction={() => onOpenChange(false)}
        >
          {children}
        </MenuContent>
      </Autocomplete>
      <div
        aria-hidden="true"
        className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/70 px-4 py-2.5 text-xs text-muted-foreground pointer-coarse:hidden"
      >
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
  );
}

export interface CommandPaletteSectionProps<T extends object>
  extends MenuSectionProps<T> {
  title: string;
}

export function CommandPaletteSection<T extends object>({
  title,
  items,
  dependencies,
  className,
  children,
  ...props
}: CommandPaletteSectionProps<T>) {
  return (
    <MenuSection
      {...props}
      data-slot="command-palette-section"
      className={cn("grid gap-1 not-first:mt-2", className)}
    >
      <Header className="px-3 pt-1 pb-0.5 text-xs font-medium text-muted-foreground">
        {title}
      </Header>
      <Collection items={items} dependencies={dependencies}>
        {children}
      </Collection>
    </MenuSection>
  );
}
