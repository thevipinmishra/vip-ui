"use client";

import { StarIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  RadioButton,
  RadioField,
  RadioGroup,
  type RadioGroupProps,
} from "./radio-group";

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
      <div className="flex flex-wrap" data-slot="rating-input-options">
        {Array.from({ length: max }, (_, index) => {
          const rating = index + 1;
          return (
            <RadioField
              key={rating}
              value={String(rating)}
              aria-label={`${rating} of ${max} stars`}
            >
              <RadioButton
                className={cn(
                  "size-11 items-center justify-center rounded-md hover:bg-muted/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  rating <= selected ? "text-primary" : "text-muted-foreground",
                )}
              >
                <StarIcon
                  size={34}
                  weight={rating <= selected ? "fill" : "regular"}
                  aria-hidden="true"
                />
              </RadioButton>
            </RadioField>
          );
        })}
      </div>
    </RadioGroup>
  );
}
