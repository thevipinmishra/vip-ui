"use client";

import {
  createContext,
  type HTMLAttributes,
  type ReactNode,
  useContext,
} from "react";
import {
  RadioButton as AriaRadioButton,
  type RadioButtonProps as AriaRadioButtonProps,
  RadioField as AriaRadioField,
  type RadioFieldProps as AriaRadioFieldProps,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
  composeRenderProps,
  FieldError,
  Label,
  Text,
  type ValidationResult,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "./utils";
import { fieldDescriptionStyles, fieldErrorStyles } from "./field-styles";

const radioFieldStyles = tv({
  base: "relative flex min-h-11 min-w-0 flex-col justify-center gap-1 py-1 text-sm text-foreground disabled:opacity-50",
  variants: {
    variant: {
      default: "",
      card: "min-h-12 rounded-lg bg-card px-3.5 py-2.5 shadow-[var(--shadow-card)] ring-1 ring-border outline-offset-4 outline-transparent transition-[background-color,box-shadow,outline-color,outline-offset] duration-150 ease-out-quint has-[[data-hovered]]:bg-muted has-[[data-focus-visible]]:outline-2 has-[[data-focus-visible]]:outline-offset-2 has-[[data-focus-visible]]:outline-ring motion-reduce:outline-offset-2 selected:bg-accent selected:ring-primary/40 invalid:ring-destructive/60 forced-colors:border forced-colors:selected:border-[Highlight]",
    },
  },
  defaultVariants: { variant: "default" },
});

type RadioVariant = NonNullable<
  VariantProps<typeof radioFieldStyles>["variant"]
>;

const RadioVariantContext = createContext<RadioVariant>("default");

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, "children"> {
  ref?: React.Ref<HTMLDivElement>;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode;
  onValueChange?: (value: string) => void;
}

export function RadioGroup({
  label,
  description,
  errorMessage,
  className,
  children,
  onValueChange,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      data-slot="radio-group"
      onChange={(value) => {
        props.onChange?.(value);
        onValueChange?.(value);
      }}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/radio-group flex min-w-0 flex-col gap-1 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:flex-wrap data-[orientation=horizontal]:gap-x-6",
          className,
        ),
      )}
    >
      {label != null && <RadioGroupLabel>{label}</RadioGroupLabel>}
      {description != null && (
        <RadioGroupDescription>{description}</RadioGroupDescription>
      )}
      {children}
      {(label != null || description != null || errorMessage != null) && (
        <RadioGroupError>{errorMessage}</RadioGroupError>
      )}
    </AriaRadioGroup>
  );
}

export function RadioGroupLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="radio-group-label"
      className={cn(
        "w-full pb-1 text-sm font-semibold text-foreground [overflow-wrap:anywhere]",
        className,
      )}
    />
  );
}

export function RadioGroupDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="radio-group-description"
      className={cn(
        fieldDescriptionStyles,
        "w-full pb-1 [[data-slot=radio-group-label]+&]:-mt-1",
        className,
      )}
    />
  );
}

export function RadioGroupItems({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      data-slot="radio-group-items"
      className={cn(
        "flex w-full flex-col gap-1 group-data-[orientation=horizontal]/radio-group:flex-row group-data-[orientation=horizontal]/radio-group:flex-wrap group-data-[orientation=horizontal]/radio-group:gap-x-6",
        className,
      )}
    />
  );
}

export function RadioGroupError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  return (
    <FieldError
      {...props}
      data-slot="radio-group-error"
      className={cn(fieldErrorStyles, "w-full", className)}
    />
  );
}

export interface RadioProps extends Omit<RadioFieldProps, "children"> {
  /** The label. Omit it and pass aria-label when the option has no visible label. */
  children?: ReactNode;
  description?: ReactNode;
}

export function Radio({ children, description, ...props }: RadioProps) {
  return (
    <RadioField {...props}>
      <RadioButton>
        <RadioIndicator />
        {children != null && <RadioLabel>{children}</RadioLabel>}
      </RadioButton>
      {description != null && (
        <RadioDescription>{description}</RadioDescription>
      )}
    </RadioField>
  );
}

export interface RadioFieldProps extends AriaRadioFieldProps {
  ref?: React.Ref<HTMLDivElement>;
  variant?: RadioVariant;
}

export function RadioField({
  variant = "default",
  className,
  ...props
}: RadioFieldProps) {
  return (
    <RadioVariantContext.Provider value={variant}>
      <AriaRadioField
        {...props}
        data-slot="radio"
        data-variant={variant}
        className={composeRenderProps(className, (className) =>
          radioFieldStyles({ variant, className }),
        )}
      />
    </RadioVariantContext.Provider>
  );
}

export function RadioButton({
  className,
  ...props
}: AriaRadioButtonProps & React.RefAttributes<HTMLLabelElement>) {
  return (
    <AriaRadioButton
      {...props}
      data-slot="radio-button"
      className={composeRenderProps(className, (className) =>
        cn(
          // The ::after layer stretches the hit area over the whole field,
          // so the description and card padding select the option too.
          "group/radio flex min-w-0 cursor-pointer items-start gap-3 after:absolute after:inset-0 disabled:cursor-default read-only:cursor-default",
          className,
        ),
      )}
    />
  );
}

export function RadioIndicator({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  const variant = useContext(RadioVariantContext);
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="radio-indicator"
      className={cn(
        "grid size-5 shrink-0 place-items-center rounded-full border border-muted-foreground/75 bg-card shadow-[var(--shadow-inset)] transition-[border-color,outline-color,outline-offset,scale] duration-150 ease-out-quint group-hover/radio:border-primary motion-safe:group-pressed/radio:scale-90 group-selected/radio:border-primary group-invalid/radio:border-destructive group-invalid/radio:group-hover/radio:border-destructive forced-colors:border-[ButtonText] forced-colors:group-selected/radio:border-[Highlight] forced-colors:group-disabled/radio:border-[GrayText]",
        // Card radios show the focus ring around the whole card instead.
        variant === "default" &&
          "outline-offset-4 outline-transparent group-focus-visible/radio:outline-2 group-focus-visible/radio:outline-offset-2 group-focus-visible/radio:outline-ring motion-reduce:outline-offset-2",
        className,
      )}
    >
      <span className="size-2 scale-0 rounded-full bg-primary transition-[scale] duration-350 ease-spring group-selected/radio:scale-100 motion-reduce:transition-none forced-colors:bg-[Highlight] forced-colors:group-disabled/radio:bg-[GrayText]" />
    </span>
  );
}

export function RadioLabel({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      {...props}
      data-slot="radio-label"
      className={cn("min-w-0 font-medium [overflow-wrap:anywhere]", className)}
    />
  );
}

export function RadioDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="radio-description"
      className={cn(fieldDescriptionStyles, "ps-8", className)}
    />
  );
}

export const RadioGroupItem = Radio;
