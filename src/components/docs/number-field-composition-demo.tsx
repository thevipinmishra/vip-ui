"use client";

import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldDescription,
  NumberFieldError,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldLabel,
} from "@/components/ui/number-field";

export function NumberFieldCompositionDemo() {
  return (
    <NumberField
      defaultValue={50}
      minValue={10}
      maxValue={500}
      step={10}
      formatOptions={{
        style: "unit",
        unit: "gigabyte",
        unitDisplay: "short",
      }}
      className="w-full max-w-xs"
    >
      <NumberFieldLabel>Storage</NumberFieldLabel>
      <NumberFieldGroup>
        <NumberFieldInput className="text-start" />
        <NumberFieldDecrement />
        <NumberFieldIncrement />
      </NumberFieldGroup>
      <NumberFieldDescription>From 10 GB to 500 GB.</NumberFieldDescription>
      <NumberFieldError />
    </NumberField>
  );
}
