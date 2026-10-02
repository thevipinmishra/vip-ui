"use client";

import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext } from "react";
import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
  composeRenderProps,
  useLocale,
} from "react-aria-components";
import { cn } from "./utils";

const SwitchStateContext = createContext({ isSelected: false });

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
          "group inline-flex min-h-11 cursor-pointer items-center justify-between gap-4 rounded-md text-sm text-foreground data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring",
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
        "flex h-7 w-11 shrink-0 items-center rounded-full bg-muted p-1 shadow-[var(--shadow-inset)] ring-1 ring-input group-hover:bg-secondary group-data-[selected]:bg-primary group-data-[selected]:ring-primary/70 group-data-[selected]:hover:bg-primary/90 forced-colors:border forced-colors:border-[ButtonText] motion-safe:transition-[background-color,box-shadow] motion-safe:duration-150",
        className,
      )}
    />
  );
}

export function SwitchThumb({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { isSelected } = useContext(SwitchStateContext);
  const { direction } = useLocale();
  const reduceMotion = useReducedMotion();
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="switch-thumb"
      className={cn("contents", className)}
    >
      <motion.span
        initial={false}
        animate={{ x: isSelected ? (direction === "rtl" ? -16 : 16) : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", duration: 0.24, bounce: 0 }
        }
        className="size-5 rounded-full bg-card shadow-[var(--shadow-float)] ring-1 ring-border/50 motion-safe:group-data-[pressed]:scale-95 forced-colors:bg-[ButtonText]"
      />
    </span>
  );
}
