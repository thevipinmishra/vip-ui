"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";
import {
  Collection,
  composeRenderProps,
  Header,
  Keyboard,
  MenuSection,
  type MenuSectionProps,
  Text,
} from "react-aria-components";
import { cn } from "./utils";
import { Autocomplete } from "./autocomplete";
import { DialogContent, DialogTitle } from "./dialog";
import { Kbd, kbdStyles } from "./kbd-code";
import { MenuContent, MenuItem, type MenuItemProps } from "./menu";
import {
  SearchField,
  SearchFieldClear,
  SearchFieldInput,
} from "./search-field";

export interface CommandPaletteItemProps<T extends object>
  extends MenuItemProps<T> {
  shortcut?: string;
}

export function CommandPaletteItem<T extends object>({
  shortcut,
  className,
  children,
  ...props
}: CommandPaletteItemProps<T>) {
  return (
    <MenuItem
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "[&_svg]:text-muted-foreground [&_svg:not([class*='size-'])]:size-4.5",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (content) =>
        shortcut ? (
          <>
            <Text
              slot="label"
              className="flex min-w-0 flex-1 items-center gap-2.5"
            >
              {content}
            </Text>
            <Keyboard
              data-slot="command-palette-shortcut"
              className={kbdStyles}
            >
              {shortcut}
            </Keyboard>
          </>
        ) : (
          content
        ),
      )}
    </MenuItem>
  );
}

function CommandPaletteList({
  title,
  emptyMessage,
  onAction,
  children,
}: {
  title: string;
  emptyMessage: string;
  onAction: () => void;
  children: ReactNode;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    const list = listRef.current;
    if (!frame || !list) return;

    // Mobile keeps the height of the first rendered list while filtering so the
    // search field stays put. The empty state can render before the collection
    // registers, so only let it grow the floor after the list has had items.
    let tallest = 0;
    const measure = () => {
      const height = list.offsetHeight;
      frame.style.setProperty("--palette-list-height", `${height}px`);
      if (list.hasAttribute("data-empty")) {
        if (tallest === 0) return;
      }
      tallest = Math.max(tallest, height);
      frame.style.setProperty("--palette-list-min-height", `${tallest}px`);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={frameRef}
      data-slot="command-palette-list"
      className="flex max-h-[min(20rem,calc(var(--visual-viewport-height,100dvh)-7rem))] min-h-0 shrink-0 flex-col overflow-clip transition-[height] duration-200 ease-out-quint max-sm:h-(--palette-list-min-height) max-sm:has-data-empty:justify-center sm:h-(--palette-list-height) motion-reduce:transition-none"
    >
      <MenuContent
        ref={listRef}
        aria-label={title}
        autoFocus="first"
        className="min-h-0 max-h-[min(20rem,calc(var(--visual-viewport-height,100dvh)-7rem))] shrink-0 content-start gap-1 overflow-y-auto overscroll-contain p-2 data-empty:content-center"
        renderEmptyState={() => (
          <div className="grid content-center justify-items-center gap-2 px-3 py-8 text-center text-sm text-muted-foreground">
            <MagnifyingGlassIcon
              size={20}
              aria-hidden="true"
              className="text-muted-foreground/70"
            />
            <p>{emptyMessage}</p>
          </div>
        )}
        onAction={onAction}
      >
        {children}
      </MenuContent>
    </div>
  );
}

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
      className="overflow-clip p-0 pb-[env(safe-area-inset-bottom)] sm:p-0"
      overlayProps={{
        isOpen,
        onOpenChange,
        className: "sm:items-start sm:pt-[12vh]",
      }}
      modalProps={{
        className: cn(
          "sm:max-w-lg",
          "sm:max-h-[calc(var(--visual-viewport-height,100dvh)-12vh-1rem)] sm:origin-top sm:duration-180 sm:exiting:duration-120 motion-safe:sm:entering:translate-y-0 motion-safe:sm:entering:scale-98 motion-safe:sm:exiting:translate-y-0 motion-safe:sm:exiting:scale-99",
          className,
        ),
      }}
    >
      <DialogTitle className="sr-only">{title}</DialogTitle>
      <Autocomplete>
        <SearchField autoFocus aria-label={placeholder} className="shrink-0">
          {({ isEmpty }) => (
            <div className="relative flex items-center border-b border-border/70">
              <MagnifyingGlassIcon
                size={18}
                aria-hidden="true"
                className="pointer-events-none absolute inset-s-4 text-muted-foreground"
              />
              <SearchFieldInput
                placeholder={placeholder}
                className="min-h-14 rounded-none border-0 bg-transparent ps-11 shadow-none hover:border-transparent focus-visible:border-transparent focus-visible:ring-0"
              />
              {!isEmpty && <SearchFieldClear />}
            </div>
          )}
        </SearchField>
        <CommandPaletteList
          title={title}
          emptyMessage={emptyMessage}
          onAction={() => onOpenChange(false)}
        >
          {children}
        </CommandPaletteList>
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
