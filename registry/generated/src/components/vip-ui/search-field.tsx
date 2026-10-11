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
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldInputStyles,
  fieldLabelStyles,
  fieldTriggerStyles,
} from "./field-styles";

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
              <MagnifyingGlassIcon
                size={17}
                aria-hidden="true"
                className="pointer-events-none absolute start-3.5 text-muted-foreground group-disabled:opacity-60"
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
      className={cn(fieldLabelStyles, className)}
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
          fieldInputStyles,
          "ps-10 pe-12 [&::-webkit-search-cancel-button]:hidden",
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
          "absolute inset-y-0 end-1 my-auto group-empty:hidden",
          className,
        ),
      )}
    >
      {children ?? <XIcon size={16} aria-hidden="true" />}
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
