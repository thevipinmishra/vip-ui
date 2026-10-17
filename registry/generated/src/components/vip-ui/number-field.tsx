"use client";

import { MinusIcon, PlusIcon } from "@phosphor-icons/react";
import {
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
  Button,
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
  fieldInnerHeight,
  fieldLabelStyles,
  fieldSizeStyles,
  fieldText,
  fieldTriggerStyles,
  segmentedFieldStyles,
} from "./field-styles";
import type { Size } from "./size";

const stepperButtonStyles = cn(
  fieldTriggerStyles,
  "bg-muted/70 text-foreground hover:bg-accent hover:text-accent-foreground pressed:bg-accent pressed:text-accent-foreground motion-safe:pressed:scale-[0.96] disabled:opacity-40",
);

export interface NumberFieldProps
  extends Omit<AriaNumberFieldProps, "className" | "children"> {
  label?: string;
  description?: string;
  size?: Size;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaNumberFieldProps["className"];
  children?: AriaNumberFieldProps["children"];
}

export function NumberField({
  label,
  description,
  size,
  className,
  children,
  ...props
}: NumberFieldProps) {
  return (
    <AriaNumberField
      {...props}
      data-slot="number-field"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group grid w-full min-w-0 grid-cols-1 gap-2",
          size && fieldSizeStyles[size],
          className,
        ),
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
            <Button
              slot="decrement"
              data-slot="number-field-decrement"
              aria-label="Decrease"
              className={stepperButtonStyles}
            >
              <MinusIcon aria-hidden="true" />
            </Button>
            <Input
              data-slot="number-field-input"
              className={cn(
                fieldInnerHeight,
                fieldText,
                "min-w-0 flex-1 cursor-text bg-transparent px-2 text-center font-medium tabular-nums outline-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed",
              )}
            />
            <Button
              slot="increment"
              data-slot="number-field-increment"
              aria-label="Increase"
              className={stepperButtonStyles}
            >
              <PlusIcon aria-hidden="true" />
            </Button>
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
