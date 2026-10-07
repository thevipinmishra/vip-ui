"use client";

import { type ComponentProps, useId } from "react";
import { ChevronDown } from "reicon-react";
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
            "min-h-12 w-full cursor-pointer appearance-none rounded-lg border border-input bg-card ps-3.5 pe-10 text-base text-foreground shadow-[var(--shadow-card)] outline-none hover:border-primary/45 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 disabled:hover:border-input sm:text-sm",
            (isInvalid || error) &&
              "border-destructive ring-3 ring-destructive/20 hover:border-destructive focus-visible:border-destructive focus-visible:ring-destructive/30",
            className,
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
        <ChevronDown
          size={17}
          data-slot="native-select-chevron"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 end-3.5 -translate-y-1/2 text-muted-foreground"
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
