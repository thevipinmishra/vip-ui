"use client";

import { type Icon, StarIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { springPop } from "./motion";
import { cn } from "./utils";
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
  /** The visible label. Without it, pass aria-label. */
  label?: RadioGroupProps["label"];
  /** The icon for each step. It is filled up to the rating. */
  icon?: Icon;
  max?: number;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

export function RatingInput({
  label,
  icon: RatingIcon = StarIcon,
  max = 5,
  value,
  defaultValue = 0,
  onValueChange,
  ...props
}: RatingInputProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pop, setPop] = useState({ from: 0, to: 0, id: 0 });
  const reduceMotion = useReducedMotion();
  const selected = value === undefined ? localValue : value;
  const interactive = !props.isDisabled && !props.isReadOnly;
  const shown = interactive && hovered !== null ? hovered : selected;

  return (
    <RadioGroup
      {...props}
      label={label}
      orientation="horizontal"
      value={selected > 0 ? String(selected) : null}
      onValueChange={(next) => {
        const rating = Number(next);
        setPop((current) => ({
          from: rating > selected ? selected : rating - 1,
          to: rating,
          id: current.id + 1,
        }));
        if (value === undefined) setLocalValue(rating);
        onValueChange?.(rating);
      }}
    >
      <div className="-ms-1 flex flex-wrap" data-slot="rating-input-options">
        {Array.from({ length: max }, (_, index) => {
          const rating = index + 1;
          const filled = rating <= shown;
          const pops = pop.id > 0 && rating > pop.from && rating <= pop.to;
          return (
            <RadioField
              key={rating}
              value={String(rating)}
              aria-label={`${rating} of ${max}`}
              className="min-h-8 py-0"
            >
              <RadioButton
                onHoverStart={() => setHovered(rating)}
                onHoverEnd={() =>
                  setHovered((current) => (current === rating ? null : current))
                }
                data-preview={
                  hovered !== null &&
                  interactive &&
                  filled !== rating <= selected
                    ? ""
                    : undefined
                }
                className={cn(
                  "size-8 items-center justify-center rounded-md outline-offset-4 outline-transparent transition-[color,outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-preview:text-primary/60 motion-reduce:outline-offset-2",
                  filled ? "text-primary" : "text-muted-foreground",
                )}
              >
                <motion.span
                  key={pops ? `${rating}-${pop.id}` : rating}
                  className="grid place-items-center"
                  initial={pops && !reduceMotion ? { scale: 0.6 } : false}
                  animate={{ scale: 1 }}
                  transition={{
                    ...springPop,
                    delay: pops ? (rating - pop.from - 1) * 0.04 : 0,
                  }}
                >
                  <RatingIcon
                    size={24}
                    weight={filled ? "fill" : "regular"}
                    aria-hidden="true"
                  />
                </motion.span>
              </RadioButton>
            </RadioField>
          );
        })}
      </div>
    </RadioGroup>
  );
}
