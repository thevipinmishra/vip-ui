"use client";

import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  composeRenderProps,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  Separator,
  type SeparatorProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Popover } from "./popover";

export { MenuTrigger };

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
  return (
    <Popover
      {...props}
      data-slot="menu-popover"
      placement={props.placement ?? "bottom start"}
      offset={props.offset ?? 7}
      className={composeRenderProps(className, (className) =>
        cn(
          "min-w-44 max-w-[calc(100vw-2rem)] rounded-lg border-0 p-1.5 ring-1 ring-border/70",
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
        cn("grid max-h-72 gap-1 overflow-y-auto outline-none", className),
      )}
    />
  );
}

export function MenuItem<T extends object>({
  className,
  ...props
}: MenuItemProps<T>) {
  return (
    <AriaMenuItem
      {...props}
      data-slot="menu-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-foreground outline-none hover:bg-muted focus:bg-muted focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
    />
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
