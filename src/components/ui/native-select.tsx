"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { type ComponentProps, useId } from "react";
import { cn } from "@/lib/utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
} from "./field-styles";

export interface NativeSelectProps extends ComponentProps<"select"> {
  label: string;
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
      className={cn("grid w-full gap-2", containerClassName)}
    >
      <label
        htmlFor={selectId}
        data-slot="native-select-label"
        className={fieldLabelStyles}
      >
        {label}
      </label>
      <div className="relative">
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
            "peer min-h-12 w-full cursor-pointer appearance-none rounded-lg border border-input bg-card ps-3.5 pe-10 text-base text-foreground shadow-[var(--shadow-card)] outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/45 focus:border-ring focus:ring-3 focus:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:hover:border-destructive aria-invalid:focus:border-destructive aria-invalid:focus:ring-destructive/30 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input sm:text-sm",
            className,
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <CaretDownIcon
          size={17}
          data-slot="native-select-chevron"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 end-3.5 -translate-y-1/2 text-muted-foreground peer-disabled:opacity-60"
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
