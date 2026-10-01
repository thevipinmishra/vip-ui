"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  type Button as AriaButton,
  Select as AriaSelect,
  type SelectProps as AriaSelectProps,
  SelectValue as AriaSelectValue,
  composeRenderProps,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
} from "react-aria-components";
import { Check, ChevronDown } from "reicon-react";
import { cn } from "@/lib/utils";
import { PressButton } from "./press-button";

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
        cn("group flex w-full flex-col gap-2", className),
      )}
    >
      {children ??
        (({ isOpen }) => (
          <>
            {label && (
              <Label className="text-[13px] font-medium text-foreground">
                {label}
              </Label>
            )}
            <PressButton
              data-slot="select-trigger"
              className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-input bg-card px-3.5 text-start text-sm text-foreground shadow-[var(--shadow-card)] hover:border-primary/45 hover:bg-muted/60 motion-safe:transition-[border-color,background-color,box-shadow] motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50"
            >
              <AriaSelectValue
                data-slot="select-value"
                className="min-w-0 flex-1 truncate text-start placeholder:text-muted-foreground"
              >
                {({ selectedText, isPlaceholder, state }) =>
                  isPlaceholder
                    ? placeholder
                    : (options?.find(
                        (option) => option.id === state.selectedKey,
                      )?.name ?? selectedText)
                }
              </AriaSelectValue>
              <motion.span
                animate={{ rotate: isOpen && !reduceMotion ? 180 : 0 }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                className="shrink-0 text-muted-foreground"
              >
                <ChevronDown size={16} aria-hidden="true" />
              </motion.span>
            </PressButton>
            {description && (
              <Text
                slot="description"
                className="text-xs leading-5 text-muted-foreground"
              >
                {description}
              </Text>
            )}
            <Popover
              data-slot="select-content"
              placement="bottom start"
              offset={7}
              className="w-[var(--trigger-width)] motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out motion-safe:data-[exiting]:opacity-0 rounded-lg bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70 outline-none"
            >
              <motion.div
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -6, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <ListBox
                  data-slot="select-list-box"
                  items={options ?? []}
                  className="grid max-h-64 gap-1 overflow-y-auto outline-none"
                >
                  {(option) => (
                    <ListBoxItem
                      data-slot="select-item"
                      id={option.id}
                      textValue={option.name}
                      className="group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none hover:bg-muted focus:bg-muted selected:bg-accent selected:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50"
                    >
                      <span className="min-w-0">
                        <span className="block font-medium">{option.name}</span>
                        {option.description && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </span>
                      <Check
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 opacity-0 group-selected/item:opacity-100"
                      />
                    </ListBoxItem>
                  )}
                </ListBox>
              </motion.div>
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
      className={cn("text-[13px] font-medium text-foreground", className)}
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
        cn(
          "flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border border-input bg-card px-3.5 text-start text-sm text-foreground shadow-[var(--shadow-card)] hover:border-primary/45 hover:bg-muted/60 motion-safe:transition-[border-color,background-color,box-shadow] motion-safe:duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
    >
      {children ?? (
        <>
          <SelectValue />
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="shrink-0 text-muted-foreground"
          />
        </>
      )}
    </PressButton>
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
        cn(
          "min-w-0 flex-1 truncate text-start placeholder:text-muted-foreground",
          className,
        ),
      )}
    >
      {props.children ??
        (({ selectedText, defaultChildren }) =>
          selectedText || defaultChildren)}
    </AriaSelectValue>
  );
}

export function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Popover>) {
  const reduceMotion = useReducedMotion();
  return (
    <Popover
      {...props}
      data-slot="select-content"
      placement={props.placement ?? "bottom start"}
      offset={props.offset ?? 7}
      className={composeRenderProps(className, (className) =>
        cn(
          "w-[var(--trigger-width)] motion-safe:transition-opacity motion-safe:duration-150 motion-safe:ease-out motion-safe:data-[exiting]:opacity-0 rounded-lg bg-popover p-1.5 text-popover-foreground shadow-[var(--shadow-float)] ring-1 ring-border/70 outline-none",
          className,
        ),
      )}
    >
      <motion.div
        initial={
          reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.18, ease: "easeOut" }}
      >
        <ListBox
          data-slot="select-list-box"
          className="grid max-h-64 gap-1 overflow-y-auto outline-none"
        >
          {children}
        </ListBox>
      </motion.div>
    </Popover>
  );
}

export function SelectItem({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof ListBoxItem>, "children"> & {
  children: ReactNode;
}) {
  return (
    <ListBoxItem
      {...props}
      data-slot="select-item"
      className={composeRenderProps(className, (className) =>
        cn(
          "group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none hover:bg-muted focus:bg-muted selected:bg-accent selected:text-accent-foreground focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-50",
          className,
        ),
      )}
    >
      {children}
      <Check
        size={15}
        aria-hidden="true"
        className="ms-auto shrink-0 opacity-0 group-selected/item:opacity-100"
      />
    </ListBoxItem>
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
      className={cn("text-xs leading-5 text-muted-foreground", className)}
    />
  );
}
