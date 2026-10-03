"use client";

import type { ReactNode } from "react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Text,
} from "react-aria-components";
import { Check, ChevronDown } from "reicon-react";
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldInputStyles,
  fieldLabelStyles,
} from "./field-styles";
import { Popover } from "./popover";

const comboBoxPopoverStyles =
  "w-[var(--trigger-width)] rounded-lg border-0 p-1.5 ring-1 ring-border/70";
const comboBoxItemStyles =
  "group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none hover:bg-muted data-[focused]:bg-muted data-[focus-visible]:-outline-offset-2 data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring data-[selected]:bg-accent data-[selected]:text-accent-foreground data-[disabled]:cursor-default data-[disabled]:opacity-50";

export interface ComboBoxOption {
  id: string;
  name: string;
  description?: string;
}

export interface ComboBoxProps
  extends Omit<AriaComboBoxProps<ComboBoxOption>, "children" | "className"> {
  label?: string;
  description?: string;
  options?: ComboBoxOption[];
  placeholder?: string;
  ref?: React.Ref<HTMLDivElement>;
  className?: AriaComboBoxProps<ComboBoxOption>["className"];
  children?: AriaComboBoxProps<ComboBoxOption>["children"];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function ComboBox({
  label,
  description,
  options,
  placeholder = "Search options",
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  ...props
}: ComboBoxProps) {
  return (
    <AriaComboBox
      {...props}
      data-slot="combo-box"
      selectedKey={value ?? props.selectedKey}
      defaultSelectedKey={defaultValue ?? props.defaultSelectedKey}
      onSelectionChange={(key) => {
        props.onSelectionChange?.(key);
        onValueChange?.(key === null ? "" : String(key));
      }}
      className={composeRenderProps(className, (className) =>
        cn("flex w-full flex-col gap-2", className),
      )}
    >
      {children ?? (
        <>
          {label && <ComboBoxLabel>{label}</ComboBoxLabel>}
          <div className="relative flex items-center">
            <ComboBoxInput placeholder={placeholder} />
            <ComboBoxTrigger />
          </div>
          {description && (
            <ComboBoxDescription>{description}</ComboBoxDescription>
          )}
          <ComboBoxError />
          <Popover
            data-slot="combo-box-content"
            placement="bottom start"
            offset={7}
            className={comboBoxPopoverStyles}
          >
            <ListBox
              data-slot="combo-box-list-box"
              items={options ?? []}
              renderEmptyState={() => (
                <div className="px-3 py-3 text-sm text-muted-foreground">
                  No matching options.
                </div>
              )}
              className="grid max-h-64 gap-1 overflow-y-auto outline-none"
            >
              {(option) => (
                <ListBoxItem
                  data-slot="combo-box-item"
                  id={option.id}
                  textValue={option.name}
                  className={comboBoxItemStyles}
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{option.name}</span>
                    {option.description && (
                      <span className="mt-0.5 block text-xs text-muted-foreground group-data-[selected]/item:text-accent-foreground">
                        {option.description}
                      </span>
                    )}
                  </span>
                  <Check
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 opacity-0 group-data-[selected]/item:opacity-100"
                  />
                </ListBoxItem>
              )}
            </ListBox>
          </Popover>
        </>
      )}
    </AriaComboBox>
  );
}

export function ComboBoxLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="combo-box-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function ComboBoxInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      {...props}
      data-slot="combo-box-input"
      className={composeRenderProps(className, (className) =>
        cn(fieldInputStyles, "ps-3.5 pe-12", className),
      )}
    />
  );
}

export function ComboBoxTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AriaButton>) {
  return (
    <AriaButton
      {...props}
      data-slot="combo-box-trigger"
      aria-label={props["aria-label"] ?? "Show options"}
      className={composeRenderProps(className, (className) =>
        cn(
          "absolute inset-y-0 end-1 my-auto grid size-11 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none data-[disabled]:cursor-default data-[disabled]:opacity-50 hover:bg-muted hover:text-foreground data-[focus-visible]:outline-2 data-[focus-visible]:outline-ring",
          className,
        ),
      )}
    >
      {children ?? <ChevronDown size={16} aria-hidden="true" />}
    </AriaButton>
  );
}

export function ComboBoxContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Popover>) {
  return (
    <Popover
      {...props}
      data-slot="combo-box-content"
      placement={props.placement ?? "bottom start"}
      offset={props.offset ?? 7}
      className={composeRenderProps(className, (className) =>
        cn(comboBoxPopoverStyles, className),
      )}
    >
      <ListBox
        data-slot="combo-box-list-box"
        className="grid max-h-64 gap-1 overflow-y-auto outline-none"
        renderEmptyState={() => (
          <div className="px-3 py-3 text-sm text-muted-foreground">
            No matching options.
          </div>
        )}
      >
        {children}
      </ListBox>
    </Popover>
  );
}

export function ComboBoxItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ListBoxItem>, "children"> & {
  children: ReactNode;
}) {
  return (
    <ListBoxItem
      {...props}
      data-slot="combo-box-item"
      className={composeRenderProps(className, (className) =>
        cn(comboBoxItemStyles, className),
      )}
    >
      {children}
      <Check
        size={15}
        aria-hidden="true"
        className="ms-auto shrink-0 opacity-0 group-data-[selected]/item:opacity-100"
      />
    </ListBoxItem>
  );
}

export function ComboBoxDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="combo-box-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function ComboBoxError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="combo-box-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}
