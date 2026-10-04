"use client";

import {
  MenuTrigger as AriaMenuTrigger,
  type MenuTriggerProps,
} from "react-aria-components";

export {
  Menu as ContextMenu,
  MenuContent as ContextMenuContent,
  MenuItem as ContextMenuItem,
  MenuPopover as ContextMenuPopover,
  MenuSeparator as ContextMenuSeparator,
} from "./menu";

export function ContextMenuTrigger(props: Omit<MenuTriggerProps, "trigger">) {
  return <AriaMenuTrigger {...props} trigger="contextMenu" />;
}
