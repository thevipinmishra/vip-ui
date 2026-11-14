"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { type ComponentProps, useId } from "react";
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldHeight,
  fieldLabelStyles,
  fieldRadius,
  fieldSizeStyles,
  fieldText,
} from "./field-styles";
import type { Size } from "./size";

export interface NativeSelectProps
  extends Omit<ComponentProps<"select">, "size"> {
  label: string;
  size?: Size;
  description?: string;
  error?: string;
  placeholder?: string;
  isInvalid?: boolean;
  containerClassName?: string;
}

export function NativeSelect({
  label,
  description,
  error,
  placeholder,
  isInvalid,
  size,
  containerClassName,
  className,
  children,
  id,
  "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: NativeSelectProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const descriptionId = description ? `${selectId}-description` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div
      data-slot="native-select"
      data-size={size}
      className={cn(
        "grid w-full min-w-0 grid-cols-1 gap-2",
        size && fieldSizeStyles[size],
        containerClassName,
      )}
    >
      <label
        htmlFor={selectId}
        data-slot="native-select-label"
        className={fieldLabelStyles}
      >
        {label}
      </label>
      <div className="relative min-w-0">
        <select
          {...props}
          id={selectId}
          data-slot="native-select-input"
          aria-invalid={
            ariaInvalid ?? (isInvalid || Boolean(error) || undefined)
          }
          aria-describedby={
            [describedBy, descriptionId, errorId].filter(Boolean).join(" ") ||
            undefined
          }
          className={cn(
            fieldHeight,
            fieldRadius,
            fieldText,
            "peer w-full min-w-0 cursor-pointer appearance-none truncate border border-input bg-card ps-(--field-px,0.875rem) pe-[calc(var(--field-px,0.875rem)+var(--field-icon,1rem)+0.625rem)] text-foreground shadow-(--shadow-card) outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out-quint hover:border-primary/45 focus:border-ring focus:ring-1 focus:ring-ring aria-invalid:border-destructive aria-invalid:hover:border-destructive aria-invalid:focus:border-destructive aria-invalid:focus:ring-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input",
            className,
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <CaretDownIcon
          data-slot="native-select-chevron"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 inset-e-(--field-px,0.875rem) size-(--field-icon,1rem) -translate-y-1/2 text-muted-foreground peer-disabled:opacity-60"
        />
      </div>
      {description && (
        <p
          id={descriptionId}
          data-slot="native-select-description"
          className={fieldDescriptionStyles}
        >
          {description}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          data-slot="native-select-error"
          className={fieldErrorStyles}
        >
          {error}
        </p>
      )}
    </div>
  );
}
