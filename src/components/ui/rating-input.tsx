"use client";

import { useState } from "react";
import { Star } from "reicon-react";
import { Radio, RadioGroup, type RadioGroupProps } from "./radio-group";

export interface RatingInputProps
  extends Omit<
    RadioGroupProps,
    | "children"
    | "label"
    | "value"
    | "defaultValue"
    | "onChange"
    | "onValueChange"
    | "orientation"
  > {
  label: string;
  max?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

export function RatingInput({
  label,
  max = 5,
  value,
  defaultValue = 0,
  onValueChange,
  ...props
}: RatingInputProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const selected = value === undefined ? localValue : value;

  return (
    <RadioGroup
      {...props}
      label={label}
      orientation="horizontal"
      value={selected > 0 ? String(selected) : null}
      onValueChange={(next) => {
        const rating = Number(next);
        if (value === undefined) setLocalValue(rating);
        onValueChange?.(rating);
      }}
    >
      <div
        className="flex flex-wrap gap-x-0 gap-y-1"
        data-slot="rating-input-options"
      >
        {Array.from({ length: max }, (_, index) => {
          const rating = index + 1;
          return (
            <Radio
              key={rating}
              value={String(rating)}
              aria-label={`${rating} of ${max} stars`}
              className={`size-11 justify-center p-0 ${rating <= selected ? "text-primary" : "text-muted-foreground"}`}
            >
              <Star
                size={34}
                weight={rating <= selected ? "Filled" : "Outline"}
                aria-hidden="true"
              />
            </Radio>
          );
        })}
      </div>
    </RadioGroup>
  );
}
