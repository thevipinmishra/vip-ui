"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useContext } from "react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue as AriaComboBoxValue,
  ComboBoxStateContext,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Text,
} from "react-aria-components";
import { ChevronDown } from "reicon-react";
import { cn } from "@/lib/utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldInputStyles,
  fieldLabelStyles,
} from "./field-styles";
import { SelectionMark } from "./list-box";
import { Popover } from "./popover";
import { Tag, TagGroup, TagListView } from "./tag-group";

const comboBoxPopoverStyles =
  "w-[var(--trigger-width)] rounded-lg border-0 p-1.5 ring-1 ring-border/70";
const comboBoxItemStyles =
  "group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none hover:bg-muted focus:bg-muted focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-ring selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50";

export interface ComboBoxOption {
  id: string;
  name: string;
  description?: string;
}

type ComboBoxBaseProps<M extends "single" | "multiple"> = Omit<
  AriaComboBoxProps<ComboBoxOption, M>,
  "children" | "className"
> & {
  label?: string;
  description?: string;
  options?: ComboBoxOption[];
  placeholder?: string;
  className?: AriaComboBoxProps<ComboBoxOption, M>["className"];
  children?: AriaComboBoxProps<ComboBoxOption, M>["children"];
};

export interface ComboBoxProps extends ComboBoxBaseProps<"single"> {
  selectionMode?: "single";
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface MultiSelectComboBoxProps
  extends ComboBoxBaseProps<"multiple"> {
  selectionMode: "multiple";
}

export function ComboBox(props: ComboBoxProps): React.ReactElement;
export function ComboBox(props: MultiSelectComboBoxProps): React.ReactElement;
export function ComboBox(props: ComboBoxProps | MultiSelectComboBoxProps) {
  if (props.selectionMode === "multiple") {
    return <MultipleComboBox {...props} />;
  }
  return <SingleComboBox {...props} />;
}

function SingleComboBox({
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
        cn("group flex w-full flex-col gap-2", className),
      )}
    >
      {children ?? (
        <ComboBoxDefaults
          label={label}
          description={description}
          options={options}
          placeholder={placeholder}
        />
      )}
    </AriaComboBox>
  );
}

function MultipleComboBox({
  label,
  description,
  options,
  placeholder = "Search options",
  className,
  children,
  ...props
}: MultiSelectComboBoxProps) {
  return (
    <AriaComboBox
      {...props}
      data-slot="combo-box"
      className={composeRenderProps(className, (className) =>
        cn("group flex w-full flex-col gap-2", className),
      )}
    >
      {children ?? (
        <ComboBoxDefaults
          label={label}
          description={description}
          options={options}
          placeholder={placeholder}
          multiple
        />
      )}
    </AriaComboBox>
  );
}

function ComboBoxDefaults({
  label,
  description,
  options,
  placeholder,
  multiple = false,
}: {
  label?: string;
  description?: string;
  options?: ComboBoxOption[];
  placeholder: string;
  multiple?: boolean;
}) {
  return (
    <>
      {label && <ComboBoxLabel>{label}</ComboBoxLabel>}
      <div className="relative flex items-center">
        <ComboBoxInput placeholder={placeholder} />
        <ComboBoxTrigger />
      </div>
      {multiple && <ComboBoxTags />}
      {description && <ComboBoxDescription>{description}</ComboBoxDescription>}
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
              {({ isSelected }) => (
                <>
                  <span className="min-w-0">
                    <span className="block font-medium">{option.name}</span>
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
  );
}

export function ComboBoxTags({
  className,
  label = "Selected options",
  emptyText = "No options selected.",
}: {
  className?: string;
  label?: string;
  emptyText?: string;
}) {
  return (
    <AriaComboBoxValue<ComboBoxOption>
      data-slot="combo-box-tags"
      className={cn("min-w-0", className)}
    >
      {({ state }) => (
        <TagGroup
          aria-label={label}
          onRemove={(keys) => {
            if (Array.isArray(state.value)) {
              state.setValue(state.value.filter((key) => !keys.has(key)));
            }
          }}
        >
          <TagListView
            items={state.selectedItems.map((item) => ({
              id: item.key,
              name: item.textValue,
            }))}
            renderEmptyState={() => (
              <span className="text-sm text-muted-foreground">{emptyText}</span>
            )}
          >
            {(item) => (
              <Tag id={item.id} textValue={item.name}>
                {item.name}
              </Tag>
            )}
          </TagListView>
        </TagGroup>
      )}
    </AriaComboBoxValue>
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
          "absolute inset-y-0 end-1 my-auto grid size-11 cursor-pointer place-items-center rounded-md text-muted-foreground outline-none disabled:cursor-default disabled:opacity-50 hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
          className,
        ),
      )}
    >
      {children ?? <ComboBoxChevron />}
    </AriaButton>
  );
}

function ComboBoxChevron() {
  const isOpen = useContext(ComboBoxStateContext)?.isOpen;
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
    >
      <ChevronDown size={16} />
    </motion.span>
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
      {composeRenderProps(children, (content, { isSelected }) => (
        <>
          {content}
          <SelectionMark isSelected={isSelected} />
        </>
      ))}
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
