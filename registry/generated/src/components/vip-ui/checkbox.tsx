"use client";

import { motion, useReducedMotion } from "motion/react";
import { createContext, useContext, useState } from "react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
  composeRenderProps,
} from "react-aria-components";
import { Check, Minus } from "reicon-react";
import { cn } from "./utils";

const CheckboxStateContext = createContext({
  isSelected: false,
  isIndeterminate: false,
});

export interface CheckboxProps
  extends Omit<AriaCheckboxProps, "className" | "children"> {
  ref?: React.Ref<HTMLLabelElement>;
  className?: AriaCheckboxProps["className"];
  description?: string;
  children?: AriaCheckboxProps["children"];
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  children,
  description,
  className,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const [initialIndeterminate, setInitialIndeterminate] = useState(
    defaultChecked === "indeterminate",
  );
  return (
    <AriaCheckbox
      {...props}
      isSelected={checked === undefined ? props.isSelected : checked === true}
      defaultSelected={
        defaultChecked === undefined
          ? props.defaultSelected
          : defaultChecked === true
      }
      isIndeterminate={
        checked === undefined
          ? initialIndeterminate || props.isIndeterminate
          : checked === "indeterminate"
      }
      onChange={(value) => {
        setInitialIndeterminate(false);
        props.onChange?.(value);
        onCheckedChange?.(value);
      }}
      data-slot="checkbox"
      className={composeRenderProps(className, (className) =>
        cn(
          "group inline-flex min-h-11 cursor-pointer items-start gap-3 rounded-md text-sm text-foreground data-[disabled]:cursor-default data-[disabled]:opacity-50 data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2 data-[focus-visible]:outline-ring",
          typeof children === "string" && !description && "items-center",
          className,
        ),
      )}
    >
      {(state) => (
        <CheckboxStateContext.Provider value={state}>
          {typeof children === "function" ? (
            children(state)
          ) : typeof children === "string" || children == null ? (
            <>
              <CheckboxIndicator />
              {(children || description) && (
                <span className="pt-0.5">
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
            </>
          ) : (
            children
          )}
        </CheckboxStateContext.Provider>
      )}
    </AriaCheckbox>
  );
}

export function CheckboxIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const { isSelected, isIndeterminate } = useContext(CheckboxStateContext);
  const reduceMotion = useReducedMotion();
  const isChecked = isSelected || isIndeterminate;
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="checkbox-indicator"
      className={cn(
        "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-input bg-card shadow-[var(--shadow-inset)] group-hover:border-primary/60 group-data-[selected]:border-primary group-data-[selected]:bg-primary group-data-[indeterminate]:border-primary group-data-[indeterminate]:bg-primary",
        className,
      )}
    >
      <motion.span
        initial={false}
        animate={{
          scale: isChecked ? 1 : 0.25,
          opacity: isChecked ? 1 : 0,
          filter: isChecked ? "blur(0px)" : "blur(4px)",
        }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", duration: 0.3, bounce: 0 }
        }
        className="text-primary-foreground"
      >
        {isIndeterminate ? (
          <Minus size={13} strokeWidth={2.5} />
        ) : (
          <Check size={13} strokeWidth={2.5} />
        )}
      </motion.span>
    </span>
  );
}

export function CheckboxLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="checkbox-label"
      className={cn("block font-medium", className)}
    />
  );
}

export function CheckboxDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="checkbox-description"
      className={cn(
        "mt-1 block text-xs leading-5 text-muted-foreground",
        className,
      )}
    />
  );
}
