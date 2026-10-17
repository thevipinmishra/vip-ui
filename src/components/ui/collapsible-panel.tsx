"use client";

import {
  DisclosurePanel as AriaDisclosurePanel,
  composeRenderProps,
  type DisclosurePanelProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export const collapsibleChevronStyles =
  "shrink-0 text-muted-foreground transition-transform duration-250 ease-out-quint group-aria-expanded/trigger:rotate-180 motion-reduce:transition-none";

export function CollapsiblePanel({
  className,
  ...props
}: DisclosurePanelProps) {
  return (
    <AriaDisclosurePanel
      data-slot="collapsible-panel"
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          "h-(--disclosure-panel-height) overflow-clip transition-[height,opacity] duration-250 ease-out-quint aria-hidden:opacity-0 motion-reduce:transition-none",
          className,
        ),
      )}
    />
  );
}
