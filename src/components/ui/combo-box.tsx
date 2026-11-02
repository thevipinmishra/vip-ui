"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  type ComboBoxProps as AriaComboBoxProps,
  ComboBoxValue as AriaComboBoxValue,
  composeRenderProps,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Text,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import {
  fieldChevronStyles,
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
import { itemHighlightRing, withItemHighlight } from "./item-highlight";
import { SelectionMark } from "./list-box";
import { Popover } from "./popover";
import type { Size } from "./size";
import { Tag, TagGroup, TagListView } from "./tag-group";

const comboBoxPopoverStyles =
  "w-[var(--trigger-width)] rounded-lg border-0 p-1.5 ring-1 ring-border/70";
const comboBoxItemStyles = `group/item flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-md px-2.5 py-2 text-sm outline-none transition-colors duration-150 ease-out-quint selected:bg-accent selected:text-accent-foreground disabled:cursor-default disabled:opacity-50 ${itemHighlightRing}`;

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
  size?: Size;
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
  size,
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
      allowsEmptyCollection={props.allowsEmptyCollection ?? true}
      data-slot="combo-box"
      data-size={size}
      selectedKey={value ?? props.selectedKey}
      defaultSelectedKey={defaultValue ?? props.defaultSelectedKey}
      onSelectionChange={(key) => {
        props.onSelectionChange?.(key);
        onValueChange?.(key === null ? "" : String(key));
      }}
      className={composeRenderProps(className, (className) =>
        cn(
          "group flex w-full min-w-0 flex-col gap-2",
          size && fieldSizeStyles[size],
          className,
        ),
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
  size,
  className,
  children,
  ...props
}: MultiSelectComboBoxProps) {
  return (
    <AriaComboBox
      {...props}
      allowsEmptyCollection={props.allowsEmptyCollection ?? true}
      data-slot="combo-box"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group flex w-full min-w-0 flex-col gap-2",
          size && fieldSizeStyles[size],
          className,
        ),
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
      <ComboBoxControl>
        <ComboBoxInput placeholder={placeholder} />
        <ComboBoxTrigger />
      </ComboBoxControl>
      {multiple && <ComboBoxTags />}
      {description && <ComboBoxDescription>{description}</ComboBoxDescription>}
      <ComboBoxError />
      <Popover
        data-slot="combo-box-content"
        placement="bottom start"
        offset={7}
        maxHeight={268}
        className={comboBoxPopoverStyles}
      >
        <ListBox
          data-slot="combo-box-list-box"
          render={withItemHighlight(undefined, { ring: true })}
          items={options ?? []}
          renderEmptyState={() => (
            <div className="px-3 py-3 text-sm text-muted-foreground">
              No matching options.
            </div>
          )}
          className="grid gap-1 outline-none"
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

export function ComboBoxControl({
  className,
  ...props
}: React.ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      data-slot="combo-box-control"
      className={cn(
        fieldIcon,
        "relative flex min-w-0 items-center has-[>[data-slot=combo-box-icon]]:[&>input]:ps-[calc(var(--field-px,0.875rem)+var(--field-icon,1rem)+0.625rem)]",
        className,
      )}
    />
  );
}

export function ComboBoxIcon({
  className,
  ...props
}: React.ComponentPropsWithRef<"span">) {
  return (
    <span
      aria-hidden="true"
      {...props}
      data-slot="combo-box-icon"
      className={cn(
        "pointer-events-none absolute start-[var(--field-px,0.875rem)] z-10 grid place-items-center text-muted-foreground transition-colors duration-150 ease-out-quint group-focus-within:text-foreground group-disabled:opacity-60",
        className,
      )}
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
        cn(
          fieldInputStyles,
          fieldTriggerInputPadding,
          "ps-[var(--field-px,0.875rem)]",
          className,
        ),
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
        cn(fieldTriggerStyles, fieldTriggerEndStyles, className),
      )}
    >
      {children ?? <ComboBoxChevron />}
    </AriaButton>
  );
}

function ComboBoxChevron() {
  return (
    <span aria-hidden="true" className={fieldChevronStyles}>
      <CaretDownIcon />
    </span>
  );
}

export function ComboBoxContent<T extends object>({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof Popover>, "children"> & {
  children?: ReactNode | ((item: T) => ReactNode);
}) {
  return (
    <Popover
      {...props}
      data-slot="combo-box-content"
      placement={props.placement ?? "bottom start"}
      offset={props.offset ?? 7}
      maxHeight={props.maxHeight ?? 268}
      className={composeRenderProps(className, (className) =>
        cn(comboBoxPopoverStyles, className),
      )}
    >
      <ListBox
        data-slot="combo-box-list-box"
        render={withItemHighlight(undefined, { ring: true })}
        className="grid gap-1 outline-none"
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
      {composeRenderProps(children, (content) => (
        <>
          {content}
          <SelectionMark />
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
