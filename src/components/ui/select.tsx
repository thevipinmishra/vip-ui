"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useContext } from "react";
import {
  type Button as AriaButton,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  composeRenderProps,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  SelectStateContext,
  Text,
} from "react-aria-components";
import { ChevronDown } from "reicon-react";
import { cn } from "@/lib/utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
} from "./field-styles";
import { SelectionMark } from "./list-box";
import { Popover } from "./popover";
import { PressButton } from "./press-button";

const selectTriggerStyles =
  "relative flex min-h-12 w-full min-w-0 cursor-pointer items-center rounded-lg border border-input bg-card ps-3.5 pe-10 text-start text-base leading-6 text-foreground shadow-[var(--shadow-card)] hover:border-primary/45 hover:bg-muted/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring group-invalid:border-destructive group-invalid:ring-3 group-invalid:ring-destructive/20 disabled:cursor-default disabled:bg-muted disabled:opacity-50 sm:text-sm sm:leading-5";
const selectValueStyles =
  "min-w-0 flex-1 self-center truncate text-start data-[placeholder]:text-muted-foreground";
const selectItemStyles =
  "group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none hover:bg-muted focus:bg-muted selected:bg-accent selected:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50";
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
  className,
  children,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select an option",
  ...props
}: SelectProps) {
  const reduceMotion = useReducedMotion();
  return (
    <AriaSelect
      {...props}
      data-slot="select"
      selectedKey={value ?? props.selectedKey}
      defaultSelectedKey={defaultValue ?? props.defaultSelectedKey}
      onSelectionChange={(key) => {
        props.onSelectionChange?.(key);
        onValueChange?.(key === null ? "" : String(key));
      }}
      placeholder={placeholder}
      className={composeRenderProps(className, (className) =>
        cn("group flex w-full min-w-0 flex-col gap-2", className),
      )}
    >
      {children ??
        (({ isOpen }) => (
          <>
            {label && (
              <Label data-slot="select-label" className={fieldLabelStyles}>
                {label}
              </Label>
            )}
            <PressButton
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
                    : (options?.find(
                        (option) => option.id === state.selectedKey,
                      )?.name ?? selectedText)
                }
              </AriaSelectValue>
              <SelectChevron open={isOpen} reduceMotion={reduceMotion} />
            </PressButton>
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
                    {({ isSelected }) => (
                      <>
                        <span className="min-w-0">
                          <span className="block font-medium">
                            {option.name}
                          </span>
                          {option.description && (
                            <span className="mt-0.5 block text-xs text-muted-foreground group-selected/item:text-accent-foreground">
                              {option.description}
                            </span>
                          )}
                        </span>
                        <SelectionMark isSelected={isSelected} />
                      </>
                    )}
                  </ListBoxItem>
                )}
              </ListBox>
            </Popover>
          </>
        ))}
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
    <PressButton
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
    </PressButton>
  );
}

function SelectChevron({
  open,
  reduceMotion,
}: {
  open?: boolean;
  reduceMotion?: boolean | null;
}) {
  const contextOpen = useContext(SelectStateContext)?.isOpen;
  const prefersReducedMotion = useReducedMotion();
  const isOpen = open ?? contextOpen;
  const reduce = reduceMotion ?? prefersReducedMotion;
  return (
    <span
      aria-hidden="true"
      data-slot="select-chevron"
      className="pointer-events-none absolute inset-y-0 end-3.5 grid place-items-center text-muted-foreground"
    >
      <motion.span
        className="grid size-4 place-items-center"
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
      >
        <ChevronDown size={16} />
      </motion.span>
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
      <ListBox data-slot="select-list-box" className="grid gap-1 outline-none">
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
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          {content}
          <SelectionMark isSelected={isSelected} />
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
