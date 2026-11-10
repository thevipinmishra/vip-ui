"use client";

import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
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
import { cn } from "@/lib/utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldIcon,
  fieldInputStyles,
  fieldLabelStyles,
  fieldSizeStyles,
  fieldTriggerEndStyles,
  fieldTriggerInputPadding,
  fieldTriggerStyles,
} from "./field-styles";
import type { Size } from "./size";

export interface SearchFieldProps
  extends Omit<AriaSearchFieldProps, "children" | "className"> {
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaSearchFieldProps["className"];
  children?: AriaSearchFieldProps["children"];
}

export function SearchField({
  label,
  description,
  placeholder,
  size,
  className,
  children,
  ...props
}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      data-slot="search-field"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group flex w-full min-w-0 flex-col gap-2",
          size && fieldSizeStyles[size],
          className,
        ),
      )}
    >
      {children ??
        (({ isEmpty }) => (
          <>
            {label && <SearchFieldLabel>{label}</SearchFieldLabel>}
            <SearchFieldControl>
              <SearchFieldInput placeholder={placeholder} />
              {!isEmpty && <SearchFieldClear />}
            </SearchFieldControl>
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
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function SearchFieldControl({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      data-slot="search-field-control"
      className={cn("relative flex min-w-0 items-center", fieldIcon, className)}
    >
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="pointer-events-none absolute start-[var(--field-px,0.875rem)] text-muted-foreground transition-colors duration-150 ease-out-quint group-focus-within:text-foreground group-disabled:opacity-60"
      />
      {children}
    </div>
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
          fieldInputStyles,
          fieldTriggerInputPadding,
          "ps-[calc(var(--field-px,0.875rem)+var(--field-icon,1rem)+0.625rem)] [&::-webkit-search-cancel-button]:hidden",
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
          fieldTriggerStyles,
          fieldTriggerEndStyles,
          "group-empty:hidden starting:scale-75 starting:opacity-0",
          className,
        ),
      )}
    >
      {children ?? <XIcon aria-hidden="true" />}
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
      className={cn(fieldDescriptionStyles, className)}
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
      className={cn(fieldErrorStyles, className)}
    />
  );
}
