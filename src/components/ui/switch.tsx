"use client";

import type { ReactNode } from "react";
import {
  SwitchButton as AriaSwitchButton,
  type SwitchButtonProps as AriaSwitchButtonProps,
  SwitchField as AriaSwitchField,
  type SwitchFieldProps as AriaSwitchFieldProps,
  composeRenderProps,
  FieldError,
  Text,
  type ValidationResult,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

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

const switchControlFirst =
  "group-has-[[data-slot=switch-control]~[data-slot=switch-label]]/switch-field:col-span-1 group-has-[[data-slot=switch-control]~[data-slot=switch-label]]/switch-field:col-start-2 group-has-[[data-slot=switch-control]~[data-slot=switch-label]]/switch-field:ms-3 group-has-[[data-slot=switch-control]~[data-slot=switch-label]]/switch-field:me-0";

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
          "group/switch-field relative inline-grid min-h-11 min-w-0 max-w-full grid-cols-[minmax(0,1fr)_auto] content-center items-center py-1 text-sm text-foreground disabled:opacity-50 has-[[data-slot=switch-control]~[data-slot=switch-label]]:grid-cols-[auto_minmax(0,1fr)]",
          className,
        ),
      )}
    />
  );
}

export function SwitchButton({
  className,
  ...props
}: AriaSwitchButtonProps & React.RefAttributes<HTMLLabelElement>) {
  return (
    <AriaSwitchButton
      {...props}
      data-slot="switch-button"
      className={composeRenderProps(className, (className) =>
        cn(
          // Spans the label and description rows so the control centers on
          // both. The description stays outside the clickable area.
          "group/switch col-span-full row-[1/span_2] grid min-h-11 cursor-pointer grid-cols-subgrid grid-rows-subgrid items-center disabled:cursor-default read-only:cursor-default",
          className,
        ),
      )}
    />
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
        "me-4 min-w-0 font-medium [overflow-wrap:anywhere] [[data-slot=switch-control]+&]:ms-3 [[data-slot=switch-control]+&]:me-0",
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
        switchControlFirst,
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
      className={cn(
        fieldErrorStyles,
        "relative col-span-full row-start-3 mt-1",
        switchControlFirst,
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
        "row-span-2 flex h-6 w-10 shrink-0 items-center rounded-full bg-muted-foreground/75 p-0.5 shadow-[var(--shadow-inset)] outline-offset-4 outline-transparent transition-[background-color,outline-color,outline-offset] duration-200 ease-out-quint motion-reduce:outline-offset-2 group-hover/switch:bg-muted-foreground group-selected/switch:bg-primary group-selected/switch:group-hover/switch:bg-primary/90 group-invalid/switch:ring-2 group-invalid/switch:ring-destructive group-focus-visible/switch:outline-2 group-focus-visible/switch:outline-solid group-focus-visible/switch:outline-offset-2 group-focus-visible/switch:outline-ring forced-colors:border forced-colors:border-[ButtonText] forced-colors:p-px forced-colors:group-selected/switch:border-[Highlight] forced-colors:group-disabled/switch:border-[GrayText]",
        className,
      )}
    />
  );
}

export function SwitchThumb({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="switch-thumb"
      className={cn(
        "size-5 shrink-0 rounded-full bg-card shadow-[var(--shadow-card)] transition-[translate,width,background-color] duration-350 ease-spring group-pressed/switch:w-6 group-selected/switch:translate-x-4 group-selected/switch:bg-primary-foreground group-selected/switch:group-pressed/switch:translate-x-3 rtl:group-selected/switch:-translate-x-4 rtl:group-selected/switch:group-pressed/switch:-translate-x-3 motion-reduce:transition-none forced-colors:bg-[ButtonText] forced-colors:group-selected/switch:bg-[Highlight] forced-colors:group-disabled/switch:bg-[GrayText]",
        className,
      )}
    />
  );
}
