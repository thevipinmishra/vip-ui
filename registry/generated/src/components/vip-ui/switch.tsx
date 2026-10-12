"use client";

import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext } from "react";
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
  composeRenderProps,
  useLocale,
} from "react-aria-components";
import { springSnappy, transitionFor } from "./motion";
import { cn } from "./utils";

const SwitchStateContext = createContext({
  isSelected: false,
  isPressed: false,
  isDisabled: false,
});

export interface SwitchProps
  extends Omit<AriaSwitchProps, "className" | "children"> {
  ref?: React.Ref<HTMLLabelElement>;
  className?: AriaSwitchProps["className"];
  description?: string;
  children?: AriaSwitchProps["children"];
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  children,
  description,
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      isSelected={checked ?? props.isSelected}
      defaultSelected={defaultChecked ?? props.defaultSelected}
      onChange={(value) => {
        props.onChange?.(value);
        onCheckedChange?.(value);
      }}
      data-slot="switch"
      className={composeRenderProps(className, (className) =>
        cn(
          "group inline-flex min-h-11 cursor-pointer items-center justify-between gap-4 text-sm text-foreground outline-none disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
    >
      {(state) => (
        <SwitchStateContext.Provider value={state}>
          {typeof children === "function" ? (
            children(state)
          ) : typeof children === "string" || children == null ? (
            <>
              {(children || description) && (
                <span className="min-w-0">
                  {children && (
                    <span className="block font-medium">{children}</span>
                  )}
                  {description && (
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      {description}
                    </span>
                  )}
                </span>
              )}
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
            </>
          ) : (
            children
          )}
        </SwitchStateContext.Provider>
      )}
    </AriaSwitch>
  );
}

export function SwitchLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="switch-label"
      className={cn("block font-medium", className)}
    />
  );
}

export function SwitchDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="switch-description"
      className={cn(
        "mt-1 block text-xs leading-5 text-muted-foreground",
        className,
      )}
    />
  );
}

export function SwitchControl({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="switch-control"
      className={cn(
        "flex h-6 w-10 shrink-0 items-center rounded-full bg-muted-foreground/75 p-0.5 shadow-[var(--shadow-inset)] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:bg-muted-foreground group-selected:bg-primary group-selected:group-hover:bg-primary/90 group-focus-visible:outline-2 group-focus-visible:outline-solid group-focus-visible:outline-offset-2 group-focus-visible:outline-ring forced-colors:border forced-colors:border-[ButtonText] forced-colors:p-px forced-colors:group-selected:border-[Highlight]",
        className,
      )}
    />
  );
}

export function SwitchThumb({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { isSelected, isPressed, isDisabled } = useContext(SwitchStateContext);
  const { direction } = useLocale();
  const reduceMotion = useReducedMotion();
  const width = !isDisabled && isPressed ? 24 : 20;
  const travel = 36 - width;
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="switch-thumb"
      className={cn("contents", className)}
    >
      <motion.span
        initial={false}
        animate={{
          x: isSelected ? (direction === "rtl" ? -travel : travel) : 0,
          width,
        }}
        transition={transitionFor(reduceMotion, springSnappy)}
        className="size-5 shrink-0 rounded-full bg-card shadow-[var(--shadow-card)] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-selected:bg-primary-foreground forced-colors:bg-[ButtonText] forced-colors:group-selected:bg-[Highlight]"
      />
    </span>
  );
}
