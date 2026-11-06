"use client";

import { type Icon, StarIcon } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { springPop } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  RadioButton,
  RadioField,
  RadioGroup,
  type RadioGroupProps,
} from "./radio-group";
import { type Size, useSize } from "./size";

type RatingSize = Extract<Size, "sm" | "md" | "lg">;

function fillAt(rating: number, index: number) {
  return Math.min(Math.max(rating - index, 0), 1);
}

const ratingSizeStyles = {
  sm: { field: "min-h-7", button: "size-7", icon: "size-5" },
  md: { field: "min-h-8", button: "size-8", icon: "size-6" },
  lg: { field: "min-h-10", button: "size-10", icon: "size-8" },
} satisfies Record<RatingSize, Record<"field" | "button" | "icon", string>>;

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
  size?: RatingSize;
  value?: number;
  defaultValue?: number;
  onValueChange?: (value: number) => void;
}

export function RatingInput({
  label,
  icon: RatingIcon = StarIcon,
  max = 5,
  size: sizeProp,
  value,
  defaultValue = 0,
  onValueChange,
  ...props
}: RatingInputProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pop, setPop] = useState({ from: 0, to: 0, id: 0 });
  const reduceMotion = useReducedMotion();
  const inherited = useSize(sizeProp);
  const size: RatingSize =
    inherited === "xs" || inherited === "sm"
      ? "sm"
      : inherited === "lg" || inherited === "xl"
        ? "lg"
        : "md";
  const styles = ratingSizeStyles[size];
  const selected = value === undefined ? localValue : value;
  const checked = Math.round(selected);
  const interactive = !props.isDisabled && !props.isReadOnly;
  const shown = interactive && hovered !== null ? hovered : selected;

  return (
    <RadioGroup
      {...props}
      label={label}
      orientation="horizontal"
      data-size={size}
      value={checked > 0 ? String(checked) : null}
      onValueChange={(next) => {
        const rating = Number(next);
        setPop((current) => ({
          from: rating > selected ? Math.floor(selected) : rating - 1,
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
          const fill = fillAt(shown, index);
          const filled = fill === 1;
          const partial = fill > 0 && fill < 1;
          const pops = pop.id > 0 && rating > pop.from && rating <= pop.to;
          return (
            <RadioField
              key={rating}
              value={String(rating)}
              aria-label={`${rating} of ${max}`}
              className={cn("py-0", styles.field)}
            >
              <RadioButton
                onHoverStart={() => setHovered(rating)}
                onHoverEnd={() =>
                  setHovered((current) => (current === rating ? null : current))
                }
                data-preview={
                  hovered !== null &&
                  interactive &&
                  fill !== fillAt(selected, index)
                    ? ""
                    : undefined
                }
                className={cn(
                  "items-center justify-center rounded-md outline-offset-4 outline-transparent transition-[color,scale,outline-color,outline-offset] duration-150 ease-out-quint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-safe:pressed:scale-90 data-preview:text-primary/60 invalid:text-destructive/70 invalid:data-preview:text-destructive/50 motion-reduce:outline-offset-2 forced-colors:text-[ButtonText] forced-colors:data-preview:text-[Highlight]",
                  styles.button,
                  filled
                    ? "text-primary invalid:text-destructive forced-colors:text-[Highlight]"
                    : "text-muted-foreground",
                )}
              >
                <motion.span
                  key={pops ? `${rating}-${pop.id}` : rating}
                  className="relative grid place-items-center"
                  initial={pops && !reduceMotion ? { scale: 0.6 } : false}
                  animate={{ scale: 1 }}
                  transition={{
                    ...springPop,
                    delay: pops ? (rating - pop.from - 1) * 0.04 : 0,
                  }}
                >
                  <RatingIcon
                    weight={filled ? "fill" : "regular"}
                    aria-hidden="true"
                    className={styles.icon}
                  />
                  {partial && (
                    <RatingIcon
                      weight="fill"
                      aria-hidden="true"
                      data-slot="rating-input-partial"
                      style={
                        {
                          "--rating-fill": `${fill * 100}%`,
                        } as React.CSSProperties
                      }
                      className={cn(
                        "absolute inset-0 text-primary [clip-path:inset(0_calc(100%-var(--rating-fill))_0_0)] rtl:[clip-path:inset(0_0_0_calc(100%-var(--rating-fill)))] forced-colors:text-[Highlight]",
                        styles.icon,
                      )}
                    />
                  )}
                </motion.span>
              </RadioButton>
            </RadioField>
          );
        })}
      </div>
    </RadioGroup>
  );
}
