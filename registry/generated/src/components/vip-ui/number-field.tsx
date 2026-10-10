"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
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
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  fieldTriggerStyles,
  segmentedFieldStyles,
} from "./field-styles";
import { PressButton } from "./press-button";

const stepperButtonStyles = cn(
  fieldTriggerStyles,
  "bg-muted/70 text-foreground hover:bg-accent hover:text-accent-foreground pressed:bg-accent pressed:text-accent-foreground disabled:opacity-40",
);

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
            <Label data-slot="number-field-label" className={fieldLabelStyles}>
              {label}
            </Label>
          )}
          <Group
            data-slot="number-field-group"
            className={cn(segmentedFieldStyles, "gap-1 px-1")}
          >
            <PressButton
              slot="decrement"
              data-slot="number-field-decrement"
              aria-label="Decrease"
              className={stepperButtonStyles}
            >
              <MinusIcon size={16} aria-hidden="true" />
            </PressButton>
            <Input
              data-slot="number-field-input"
              className="min-h-11 min-w-0 flex-1 cursor-text bg-transparent px-2 text-center text-base font-medium tabular-nums outline-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed sm:text-sm"
            />
            <PressButton
              slot="increment"
              data-slot="number-field-increment"
              aria-label="Increase"
              className={stepperButtonStyles}
            >
              <PlusIcon size={16} aria-hidden="true" />
            </PressButton>
          </Group>
          {description && (
            <Text
              slot="description"
              data-slot="number-field-description"
              className={fieldDescriptionStyles}
            >
              {description}
            </Text>
          )}
          <FieldError
            data-slot="number-field-error"
            className={fieldErrorStyles}
          />
        </>
      )}
    </AriaNumberField>
  );
}
