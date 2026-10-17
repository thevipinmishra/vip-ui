"use client";

import {
  Toolbar as AriaToolbar,
  composeRenderProps,
  SeparatorContext,
  ToggleButtonGroupContext,
  type ToolbarProps,
} from "react-aria-components";
import { cn } from "./utils";
import { type Size, SizeProvider, useSize } from "./size";
import { groupFrameStyles } from "./toggle-button-group";

export function Toolbar({
  className,
  size: sizeProp,
  ...props
}: ToolbarProps & { size?: Size }) {
  const orientation = props.orientation ?? "horizontal";
  const size = useSize(sizeProp);
  return (
    <SizeProvider size={size}>
      <ToggleButtonGroupContext.Provider value={{ orientation }}>
        <SeparatorContext.Provider
          value={{
            orientation:
              orientation === "horizontal" ? "vertical" : "horizontal",
          }}
        >
          <AriaToolbar
            {...props}
            data-slot="toolbar"
            data-size={size}
            className={composeRenderProps(className, (className) =>
              cn(
                "flex w-fit max-w-full flex-wrap items-center gap-1 rounded-lg border border-border bg-card p-1 shadow-[var(--shadow-card)] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[orientation=vertical]:[--touch-target:calc(100%+0.25rem)] [&_[data-slot=toggle-button-group]]:border-0 [&_[data-slot=toggle-button-group]]:bg-transparent [&_[data-slot=toggle-button-group]]:p-0",
                "[&_[data-variant=segmented][data-hovered]:not([data-selected])]:bg-muted [&_[data-variant=segmented][data-pressed]:not([data-selected])]:bg-muted",
                size && groupFrameStyles[size],
                className,
              ),
            )}
          />
        </SeparatorContext.Provider>
      </ToggleButtonGroupContext.Provider>
    </SizeProvider>
  );
}
