"use client";

import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  composeRenderProps,
  FieldError,
  Group,
  Input,
  Label,
  Text,
} from "react-aria-components";
import { Minus, Plus } from "reicon-react";
import { cn } from "./utils";
import { PressButton } from "./press-button";

export interface NumberFieldProps
  extends Omit<AriaNumberFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaNumberFieldProps["className"];
  children?: AriaNumberFieldProps["children"];
}

export function NumberField({
  label,
  description,
  className,
  children,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      data-slot="number-field"
      className={composeRenderProps(className, (className) =>
        cn("group grid w-full gap-2", className),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label
              data-slot="number-field-label"
              className="text-[13px] font-medium"
            >
              {label}
            </Label>
          )}
          <Group
            data-slot="number-field-group"
            className="flex min-h-12 items-center gap-1 rounded-lg border border-input bg-card p-1 shadow-[var(--shadow-card)] has-[[data-focus-visible]]:border-ring has-[[data-focus-visible]]:ring-3 has-[[data-focus-visible]]:ring-ring/50 group-data-[invalid]:border-destructive group-data-[invalid]:has-[[data-focus-visible]]:ring-destructive/20 group-data-[disabled]:bg-muted group-data-[disabled]:opacity-60"
          >
            <PressButton
              slot="decrement"
              data-slot="number-field-decrement"
              aria-label="Decrease"
              className="grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-md bg-muted/70 text-foreground hover:bg-accent hover:text-accent-foreground data-[focus-visible]:outline-2 data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-ring data-[disabled]:cursor-default data-[disabled]:opacity-40 motion-safe:transition-[background-color,color,scale] motion-safe:duration-150 motion-safe:active:scale-[0.96]"
            >
              <Minus size={16} aria-hidden="true" />
            </PressButton>
            <Input
              data-slot="number-field-input"
              className="min-h-11 min-w-0 flex-1 cursor-text bg-transparent px-2 text-center text-sm font-medium tabular-nums outline-none data-[disabled]:cursor-not-allowed"
            />
            <PressButton
              slot="increment"
              data-slot="number-field-increment"
              aria-label="Increase"
              className="grid min-h-11 min-w-11 cursor-pointer place-items-center rounded-md bg-muted/70 text-foreground hover:bg-accent hover:text-accent-foreground data-[focus-visible]:outline-2 data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-ring data-[disabled]:cursor-default data-[disabled]:opacity-40 motion-safe:transition-[background-color,color,scale] motion-safe:duration-150 motion-safe:active:scale-[0.96]"
            >
              <Plus size={16} aria-hidden="true" />
            </PressButton>
          </Group>
          {description && (
            <Text
              slot="description"
              data-slot="number-field-description"
              className="text-xs text-muted-foreground"
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="number-field-error"
            className="text-xs text-destructive"
          />
        </>
      )}
    </AriaNumberField>
  );
}
