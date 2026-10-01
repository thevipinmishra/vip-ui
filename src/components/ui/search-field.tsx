"use client";

import {
  Button as AriaButton,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  Text,
} from "react-aria-components";
import { Search, X } from "reicon-react";
import { cn } from "@/lib/utils";

export interface SearchFieldProps
  extends Omit<AriaSearchFieldProps, "children" | "className"> {
  label?: string;
  description?: string;
  placeholder?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaSearchFieldProps["className"];
  children?: AriaSearchFieldProps["children"];
}

export function SearchField({
  label,
  description,
  placeholder,
  className,
  children,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      data-slot="search-field"
      className={composeRenderProps(className, (className) =>
        cn("group flex w-full flex-col gap-2", className),
      )}
    >
      {children ??
        (({ isEmpty }) => (
          <>
            {label && <SearchFieldLabel>{label}</SearchFieldLabel>}
            <div className="relative flex items-center">
              <Search
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute start-3.5 text-muted-foreground"
              />
              <SearchFieldInput placeholder={placeholder} />
              {!isEmpty && <SearchFieldClear />}
            </div>
            {description && (
              <SearchFieldDescription>{description}</SearchFieldDescription>
            )}
            <SearchFieldError />
          </>
        ))}
    </AriaSearchField>
  );
}

export function SearchFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="search-field-label"
      className={cn("text-[13px] font-medium text-foreground", className)}
    />
  );
}

export function SearchFieldInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      data-slot="search-field-input"
      className={composeRenderProps(className, (className) =>
        cn(
          "min-h-12 w-full cursor-text rounded-lg border border-input bg-card ps-10 pe-12 text-base text-foreground shadow-[var(--shadow-card)] outline-none placeholder:text-muted-foreground/80 hover:border-primary/45 motion-safe:transition-[border-color,box-shadow] motion-safe:duration-150 focus-visible:border-primary focus-visible:ring-3 focus-visible:ring-accent invalid:border-destructive disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-60 sm:text-sm [&::-webkit-search-cancel-button]:hidden",
          className,
        ),
      )}
    />
  );
}

export function SearchFieldClear({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaButton>) {
  return (
    <AriaButton
      {...props}
      data-slot="search-field-clear"
      aria-label={props["aria-label"] ?? "Clear search"}
      className={composeRenderProps(className, (className) =>
        cn(
          "absolute end-1 grid size-11 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none disabled:cursor-default disabled:opacity-50 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring group-empty:hidden",
          className,
        ),
      )}
    >
      {children ?? <X size={16} aria-hidden="true" />}
    </AriaButton>
  );
}

export function SearchFieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="search-field-description"
      className={cn("text-xs leading-5 text-muted-foreground", className)}
    />
  );
}

export function SearchFieldError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="search-field-error"
      className={cn("text-xs leading-5 text-destructive", className)}
    />
  );
}
