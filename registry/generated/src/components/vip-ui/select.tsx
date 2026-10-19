"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import {
  Button as AriaButton,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  composeRenderProps,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Text,
} from "react-aria-components";
import { cn } from "./utils";
import {
  fieldChevronStyles,
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldHeight,
  fieldIcon,
  fieldLabelStyles,
  fieldRadius,
  fieldSizeStyles,
  fieldText,
} from "./field-styles";
import { itemHighlightRing, withItemHighlight } from "./item-highlight";
import { SelectionMark } from "./list-box";
import { Popover } from "./popover";
import type { Size } from "./size";

const selectTriggerStyles = `${fieldHeight} ${fieldRadius} ${fieldText} group/trigger relative flex w-full min-w-0 cursor-pointer items-center border border-input bg-card ps-[var(--field-px,0.875rem)] pe-[calc(var(--field-px,0.875rem)+var(--field-icon,1rem)+0.625rem)] text-start leading-6 text-foreground shadow-[var(--shadow-card)] outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out-quint hover:border-primary/45 focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring group-invalid:border-destructive group-invalid:hover:border-destructive group-invalid:focus-visible:border-destructive group-invalid:focus-visible:ring-destructive disabled:cursor-default disabled:bg-muted disabled:opacity-60 sm:leading-5`;
const selectValueStyles =
  "min-w-0 flex-1 self-center truncate text-start data-[placeholder]:text-muted-foreground";
const selectItemStyles = `group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none transition-colors duration-150 ease-out-quint selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50 ${itemHighlightRing}`;
const selectPopoverStyles =
  "w-[var(--trigger-width)] rounded-lg border-0 p-1.5 ring-1 ring-border/70";

export interface SelectOption {
  id: string;
  name: string;
  description?: string;
}
export interface SelectProps
  extends Omit<AriaSelectProps<SelectOption>, "children" | "className"> {
  label?: string;
  description?: string;
  options?: SelectOption[];
  size?: Size;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaSelectProps<SelectOption>["className"];
  children?: AriaSelectProps<SelectOption>["children"];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Select({
  label,
  description,
  options,
  size,
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  ...props
}: SelectProps) {
  return (
    <AriaSelect
      {...props}
      data-slot="select"
      data-size={size}
      selectedKey={value ?? props.selectedKey}
      defaultSelectedKey={defaultValue ?? props.defaultSelectedKey}
      onSelectionChange={(key) => {
        props.onSelectionChange?.(key);
        onValueChange?.(key === null ? "" : String(key));
      }}
      placeholder={placeholder}
      className={composeRenderProps(className, (className) =>
        cn(
          "group flex w-full min-w-0 flex-col gap-2",
          size && fieldSizeStyles[size],
          className,
        ),
      )}
    >
      {children ?? (
        <>
          {label && (
            <Label data-slot="select-label" className={fieldLabelStyles}>
              {label}
            </Label>
          )}
          <AriaButton
            data-slot="select-trigger"
            className={selectTriggerStyles}
          >
            <AriaSelectValue
              data-slot="select-value"
              className={selectValueStyles}
            >
              {({ selectedText, isPlaceholder, state }) =>
                isPlaceholder
                  ? placeholder
                  : (options?.find((option) => option.id === state.selectedKey)
                      ?.name ?? selectedText)
              }
            </AriaSelectValue>
            <SelectChevron />
          </AriaButton>
          {description && (
            <Text
              slot="description"
              data-slot="select-description"
              className={fieldDescriptionStyles}
            >
              {description}
            </Text>
          )}
          <SelectError />
          <Popover
            data-slot="select-content"
            placement="bottom start"
            offset={7}
            maxHeight={268}
            className={selectPopoverStyles}
          >
            <ListBox
              data-slot="select-list-box"
              render={withItemHighlight(undefined, { ring: true })}
              items={options ?? []}
              className="grid gap-1 outline-none"
            >
              {(option) => (
                <ListBoxItem
                  data-slot="select-item"
                  id={option.id}
                  textValue={option.name}
                  className={selectItemStyles}
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{option.name}</span>
                    {option.description && (
                      <span className="mt-0.5 block text-xs text-muted-foreground group-selected/item:text-accent-foreground">
                        {option.description}
                      </span>
                    )}
                  </span>
                  <SelectionMark />
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </>
      )}
    </AriaSelect>
  );
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="select-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaButton>) {
  return (
    <AriaButton
      {...props}
      data-slot="select-trigger"
      className={composeRenderProps(className, (className) =>
        cn(selectTriggerStyles, className),
      )}
    >
      {children ?? (
        <>
          <SelectValue />
          <SelectChevron />
        </>
      )}
    </AriaButton>
  );
}

function SelectChevron() {
  return (
    <span
      aria-hidden="true"
      data-slot="select-chevron"
      className={cn(
        fieldIcon,
        "pointer-events-none absolute inset-y-0 end-[var(--field-px,0.875rem)] grid place-items-center text-muted-foreground",
      )}
    >
      <span className={fieldChevronStyles}>
        <CaretDownIcon />
      </span>
    </span>
  );
}

export function SelectValue({
  className,
  ...props
}: React.ComponentProps<typeof AriaSelectValue>) {
  return (
    <AriaSelectValue
      {...props}
      data-slot="select-value"
      className={composeRenderProps(className, (className) =>
        cn(selectValueStyles, className),
      )}
    >
      {props.children ??
        (({ isPlaceholder, selectedText, defaultChildren }) =>
          isPlaceholder ? defaultChildren : selectedText || defaultChildren)}
    </AriaSelectValue>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Popover>) {
  return (
    <Popover
      {...props}
      data-slot="select-content"
      placement={props.placement ?? "bottom start"}
      offset={props.offset ?? 7}
      maxHeight={props.maxHeight ?? 268}
      className={composeRenderProps(className, (className) =>
        cn(selectPopoverStyles, className),
      )}
    >
      <ListBox
        data-slot="select-list-box"
        render={withItemHighlight(undefined, { ring: true })}
        className="grid gap-1 outline-none"
      >
        {children}
      </ListBox>
    </Popover>
  );
}

export function SelectItem({
  className,
  children,
  textValue,
  ...props
}: Omit<React.ComponentProps<typeof ListBoxItem>, "children"> & {
  children: ReactNode;
}) {
  return (
    <ListBoxItem
      {...props}
      textValue={
        textValue ?? (typeof children === "string" ? children : undefined)
      }
      data-slot="select-item"
      className={composeRenderProps(className, (className) =>
        cn(selectItemStyles, className),
      )}
    >
      {composeRenderProps(children, (content) => (
        <>
          {content}
          <SelectionMark />
        </>
      ))}
    </ListBoxItem>
  );
}

export function SelectError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="select-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}

export function SelectDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="select-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}
