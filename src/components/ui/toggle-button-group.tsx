"use client";

import { LayoutGroup } from "motion/react";
import { useId } from "react";
import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  composeRenderProps,
  type ToggleButtonGroupProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { withItemHighlight } from "./item-highlight";
import { type Size, SizeProvider, useSize } from "./size";

export const groupFrameStyles = {
  xs: "gap-0.5 rounded-md p-0.5",
  sm: "",
  md: "",
  lg: "",
  xl: "rounded-xl",
} satisfies Record<Size, string>;

export function ToggleButtonGroup({
  className,
  render,
  size: sizeProp,
  ...props
}: ToggleButtonGroupProps & { size?: Size }) {
  const groupId = useId();
  const size = useSize(sizeProp);
  return (
    <SizeProvider size={size}>
      <LayoutGroup id={groupId}>
        <AriaToggleButtonGroup
          {...props}
          data-slot="toggle-button-group"
          data-size={size}
          render={withItemHighlight(render, {
            placement: "under",
            items: "[data-slot=toggle-button]",
          })}
          className={composeRenderProps(className, (className) =>
            cn(
              "inline-flex w-fit max-w-full flex-wrap gap-1 rounded-lg border border-border bg-secondary p-1 orientation-vertical:flex-col orientation-vertical:[--touch-target:calc(100%+0.25rem)] has-data-[variant=segmented]:*:data-[slot=item-highlight]:bg-card/70",
              size && groupFrameStyles[size],
              className,
            ),
          )}
        />
      </LayoutGroup>
    </SizeProvider>
  );
}
