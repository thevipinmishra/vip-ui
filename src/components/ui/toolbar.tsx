"use client";

import {
  Toolbar as AriaToolbar,
  composeRenderProps,
  SeparatorContext,
  ToggleButtonGroupContext,
  type ToolbarProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export function Toolbar({ className, ...props }: ToolbarProps) {
  const orientation = props.orientation ?? "horizontal";
  return (
    <ToggleButtonGroupContext.Provider value={{ orientation }}>
      <SeparatorContext.Provider
        value={{
          orientation: orientation === "horizontal" ? "vertical" : "horizontal",
        }}
      >
        <AriaToolbar
          {...props}
          data-slot="toolbar"
          className={composeRenderProps(className, (className) =>
            cn(
              "flex w-fit max-w-full flex-wrap items-center gap-1.5 rounded-lg border border-border bg-card p-1.5 shadow-[var(--shadow-card)] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch [&_[data-slot=toggle-button-group]]:border-0 [&_[data-slot=toggle-button-group]]:bg-transparent [&_[data-slot=toggle-button-group]]:p-0",
              className,
            ),
          )}
        />
      </SeparatorContext.Provider>
    </ToggleButtonGroupContext.Provider>
  );
}
