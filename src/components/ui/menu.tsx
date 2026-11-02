"use client";

import { CaretRightIcon } from "@phosphor-icons/react";
import { useSyncExternalStore } from "react";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  MenuSection as AriaMenuSection,
  type MenuSectionProps as AriaMenuSectionProps,
  Collection,
  composeRenderProps,
  Header,
  type MenuProps,
  MenuTrigger,
  PopoverContext,
  Separator,
  type SeparatorProps,
  SubmenuTrigger,
  useSlottedContext,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { itemHighlightRing, withItemHighlight } from "./item-highlight";
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
  render,
  ...props
}: MenuProps<T> & React.RefAttributes<HTMLDivElement>) {
  return (
    <AriaMenu
      {...props}
      data-slot="menu-content"
      render={withItemHighlight(render, { ring: true })}
      className={composeRenderProps(className, (className) =>
        cn("grid gap-1 outline-none [overflow-wrap:anywhere]", className),
      )}
    />
  );
}

export interface MenuItemProps<T extends object> extends AriaMenuItemProps<T> {
  variant?: "default" | "destructive";
}

export function MenuItem<T extends object>({
  className,
  children,
  variant = "default",
  ...props
}: MenuItemProps<T>) {
  return (
    <AriaMenuItem
      {...props}
      textValue={
        props.textValue ?? (typeof children === "string" ? children : undefined)
      }
      data-slot="menu-item"
      data-variant={variant}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/item flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-sm text-foreground outline-none transition-colors duration-150 ease-out-quint open:bg-muted selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&>[data-slot=kbd]]:ms-auto",
          variant === "destructive" &&
            "text-destructive [&>svg]:text-destructive",
          itemHighlightRing,
          className,
        ),
      )}
    >
      {composeRenderProps(
        children,
        (content, { selectionMode, hasSubmenu }) => (
          <>
            {content}
            {selectionMode !== "none" && !hasSubmenu && <SelectionMark />}
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

export interface MenuSectionProps<T extends object>
  extends AriaMenuSectionProps<T> {
  title?: string;
}

export function MenuSection<T extends object>({
  title,
  items,
  dependencies,
  className,
  children,
  ...props
}: MenuSectionProps<T>) {
  return (
    <AriaMenuSection
      {...props}
      data-slot="menu-section"
      className={cn("grid gap-1", className)}
    >
      {title && (
        <Header
          data-slot="menu-header"
          className="px-3 pt-1.5 pb-0.5 text-xs font-medium text-muted-foreground"
        >
          {title}
        </Header>
      )}
      <Collection items={items} dependencies={dependencies}>
        {children}
      </Collection>
    </AriaMenuSection>
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
