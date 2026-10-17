"use client";

import { motion, useReducedMotion } from "motion/react";
import { createContext, type ReactNode, useContext } from "react";
import {
  SwitchButton as AriaSwitchButton,
  type SwitchButtonProps as AriaSwitchButtonProps,
  SwitchField as AriaSwitchField,
  type SwitchFieldProps as AriaSwitchFieldProps,
  composeRenderProps,
  FieldError,
  Text,
  useLocale,
  type ValidationResult,
} from "react-aria-components";
import { springSnappy, transitionFor } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

const SwitchStateContext = createContext({
  isSelected: false,
  isPressed: false,
  isDisabled: false,
});

export interface SwitchProps extends Omit<AriaSwitchFieldProps, "children"> {
  ref?: React.Ref<HTMLDivElement>;
  /** The label. Omit it and pass aria-label when the switch has no visible label. */
  children?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function Switch({
  children,
  description,
  errorMessage,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: SwitchProps) {
  return (
    <SwitchField
      {...props}
      isSelected={checked ?? props.isSelected}
      defaultSelected={defaultChecked ?? props.defaultSelected}
      onChange={(isSelected) => {
        props.onChange?.(isSelected);
        onCheckedChange?.(isSelected);
      }}
    >
      <SwitchButton>
        {children != null && <SwitchLabel>{children}</SwitchLabel>}
        <SwitchControl>
          <SwitchThumb />
        </SwitchControl>
      </SwitchButton>
      {description != null && (
        <SwitchDescription>{description}</SwitchDescription>
      )}
      <SwitchError>{errorMessage}</SwitchError>
    </SwitchField>
  );
}

export function SwitchField({
  className,
  ...props
}: AriaSwitchFieldProps & React.RefAttributes<HTMLDivElement>) {
  return (
    <AriaSwitchField
      {...props}
      data-slot="switch"
      className={composeRenderProps(className, (className) =>
        cn(
          "relative inline-grid min-h-11 min-w-0 max-w-full grid-cols-[minmax(0,1fr)_auto] content-center items-center py-1 text-sm text-foreground disabled:opacity-50",
          className,
        ),
      )}
    />
  );
}

export function SwitchButton({
  className,
  children,
  ...props
}: AriaSwitchButtonProps & React.RefAttributes<HTMLLabelElement>) {
  return (
    <AriaSwitchButton
      {...props}
      data-slot="switch-button"
      className={composeRenderProps(className, (className) =>
        cn(
          // Spans the label and description rows so the control centers on
          // both. The ::after layer makes the whole field the hit area.
          "group/switch col-span-full row-[1/span_2] grid cursor-pointer grid-cols-subgrid grid-rows-subgrid items-center after:absolute after:inset-0 disabled:cursor-default read-only:cursor-default",
          className,
        ),
      )}
    >
      {composeRenderProps(children, (children, state) => (
        <SwitchStateContext.Provider value={state}>
          {children}
        </SwitchStateContext.Provider>
      ))}
    </AriaSwitchButton>
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
      className={cn(
        "me-4 min-w-0 font-medium [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function SwitchDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="switch-description"
      className={cn(
        fieldDescriptionStyles,
        "col-start-1 row-start-2 me-4 mt-1",
        className,
      )}
    />
  );
}

export function SwitchError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="switch-error"
      // relative keeps the message above the hit area layer.
      className={cn(
        fieldErrorStyles,
        "relative col-span-full row-start-3 mt-1",
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
        "row-span-2 flex h-6 w-10 shrink-0 items-center rounded-full bg-muted-foreground/75 p-0.5 shadow-[var(--shadow-inset)] outline-offset-4 outline-transparent transition-[background-color,outline-color,outline-offset] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:outline-offset-2 group-hover/switch:bg-muted-foreground group-selected/switch:bg-primary group-selected/switch:group-hover/switch:bg-primary/90 group-invalid/switch:ring-2 group-invalid/switch:ring-destructive group-focus-visible/switch:outline-2 group-focus-visible/switch:outline-solid group-focus-visible/switch:outline-offset-2 group-focus-visible/switch:outline-ring forced-colors:border forced-colors:border-[ButtonText] forced-colors:p-px forced-colors:group-selected/switch:border-[Highlight] forced-colors:group-disabled/switch:border-[GrayText]",
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
        className="size-5 shrink-0 rounded-full bg-card shadow-[var(--shadow-card)] transition-colors duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-selected/switch:bg-primary-foreground forced-colors:bg-[ButtonText] forced-colors:group-selected/switch:bg-[Highlight] forced-colors:group-disabled/switch:bg-[GrayText]"
      />
    </span>
  );
}
