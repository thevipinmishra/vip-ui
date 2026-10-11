"use client";

import { CaretRightIcon } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  composeRenderProps,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  PopoverContext,
  Separator,
  type SeparatorProps,
  SubmenuTrigger,
  useSlottedContext,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { SelectionMark } from "./list-box";
import { Popover } from "./popover";

export { MenuTrigger, SubmenuTrigger };

const narrowQuery = "(max-width: 639px)";

function subscribeToNarrow(onChange: () => void) {
  const media = window.matchMedia(narrowQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function isNarrowViewport() {
  return window.matchMedia(narrowQuery).matches;
}

export function Menu<T extends object>({ className, ...props }: MenuProps<T>) {
  return (
    <MenuPopover>
      <MenuContent {...props} className={className} />
    </MenuPopover>
  );
}

export function MenuPopover({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Popover>) {
  const context = useSlottedContext(PopoverContext, props.slot);
  const isSubmenu = context?.trigger === "SubmenuTrigger";
  const isNarrow = useSyncExternalStore(
    subscribeToNarrow,
    isNarrowViewport,
    () => false,
  );
  const stacked = isSubmenu && isNarrow;
  return (
    <Popover
      {...props}
      data-slot="menu-popover"
      placement={props.placement ?? (stacked ? "bottom end" : undefined)}
      offset={
        props.offset ?? context?.offset ?? (isSubmenu ? (stacked ? 4 : -2) : 7)
      }
      crossOffset={
        props.crossOffset ?? (isSubmenu && !stacked ? -6 : undefined)
      }
      maxHeight={props.maxHeight ?? 300}
      className={composeRenderProps(className, (className) =>
        cn(
          "min-w-[min(11rem,calc(100vw-2rem))] rounded-lg border-0 p-1.5 ring-1 ring-border/70",
          className,
        ),
      )}
    >
      {children}
    </Popover>
  );
}

export function MenuContent<T extends object>({
  className,
  ...props
}: MenuProps<T>) {
  return (
    <AriaMenu
      {...props}
      data-slot="menu-content"
      className={composeRenderProps(className, (className) =>
        cn("grid gap-1 outline-none", className),
      )}
    />
  );
}

export function MenuItem<T extends object>({
  className,
  children,
  ...props
}: MenuItemProps<T>) {
  return (
    <AriaMenuItem
      {...props}
      data-slot="menu-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground outline-none hover:bg-muted focus:bg-muted open:bg-muted focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>[data-slot=kbd]]:ms-auto",
          className,
        ),
      )}
    >
      {composeRenderProps(
        children,
        (content, { isSelected, selectionMode, hasSubmenu }) => (
          <>
            {content}
            {selectionMode !== "none" && !hasSubmenu && (
              <SelectionMark isSelected={isSelected} />
            )}
            {hasSubmenu && (
              <CaretRightIcon
                size={16}
                aria-hidden="true"
                className="ms-auto text-muted-foreground rtl:rotate-180"
              />
            )}
          </>
        ),
      )}
    </AriaMenuItem>
  );
}

export function MenuSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      {...props}
      data-slot="menu-separator"
      className={cn("border-t border-border/70", className)}
    />
  );
}
