"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  composeRenderProps,
  type MenuItemProps,
  type MenuProps,
  MenuTrigger,
  Popover,
  Separator,
  type SeparatorProps,
} from "react-aria-components";
import { cn } from "./utils";

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
  const reduceMotion = useReducedMotion();
  return (
    <Popover
      {...props}
      data-slot="menu-popover"
      placement={props.placement ?? "bottom start"}
      offset={props.offset ?? 7}
      className={composeRenderProps(className, (className) =>
        cn(
          "min-w-44 motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out motion-safe:data-[exiting]:opacity-0 max-w-[calc(100vw-2rem)] rounded-lg bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70 outline-none",
          className,
        ),
      )}
    >
      {(renderProps) => (
        <motion.div
          initial={
            reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }
          }
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
        >
          {typeof children === "function" ? children(renderProps) : children}
        </motion.div>
      )}
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
          "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-md px-3 py-2 text-[13px] text-foreground outline-none hover:bg-muted data-[focused]:bg-muted data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[disabled]:cursor-default data-[disabled]:opacity-50",
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
