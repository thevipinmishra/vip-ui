"use client";

import { LayoutGroup } from "motion/react";
import { createContext, useId } from "react";
import {
  ToggleButtonGroup as AriaToggleButtonGroup,
  composeRenderProps,
  type ToggleButtonGroupProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";

export const SingleToggleGroupContext = createContext(false);

export function ToggleButtonGroup({
  className,
  ...props
}: ToggleButtonGroupProps) {
  const groupId = useId();
  return (
    <LayoutGroup id={groupId}>
      <SingleToggleGroupContext.Provider
        value={props.selectionMode !== "multiple"}
      >
        <AriaToggleButtonGroup
          {...props}
          data-slot="toggle-button-group"
          className={composeRenderProps(className, (className) =>
            cn(
              "inline-flex w-fit max-w-full flex-wrap gap-1 rounded-lg border border-border bg-secondary p-1 data-[orientation=vertical]:flex-col",
              className,
            ),
          )}
        />
      </SingleToggleGroupContext.Provider>
    </LayoutGroup>
  );
}
