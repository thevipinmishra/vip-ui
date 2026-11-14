"use client";

import type { ReactNode } from "react";
import {
  Token as AriaToken,
  TokenField as AriaTokenField,
  type TokenFieldProps as AriaTokenFieldProps,
  TokenInput as AriaTokenInput,
  composeRenderProps,
  Label,
  Text,
  TokenFieldValue,
  type TokenInputProps,
  type TokenProps,
} from "react-aria-components";
import type { TokenFieldSegment } from "react-aria-components/TokenField";
import { cn } from "./utils";
import {
  fieldDescriptionStyles,
  fieldHeight,
  fieldLabelStyles,
  fieldPaddingX,
  fieldRadius,
  fieldSizeStyles,
  fieldText,
} from "./field-styles";
import type { Size } from "./size";

export { TokenFieldValue };

export class TagFieldValue extends TokenFieldValue {
  commit(): this {
    return this.replaceRange(this.caretPosition, this.caretPosition, ",");
  }

  protected createFieldValue(segments: readonly TokenFieldSegment[]): this {
    const Constructor = this.constructor as new (
      segments: readonly TokenFieldSegment[],
    ) => this;
    return new Constructor(segments);
  }

  protected tokenize(text: string): TokenFieldSegment[] {
    const segments: TokenFieldSegment[] = [];
    const parts = text.split(/([,\n])/);
    for (let index = 0; index < parts.length; index += 2) {
      const part = parts[index];
      if (index + 1 < parts.length) {
        if (part.trim()) segments.push({ type: "token", text: part.trim() });
      } else {
        segments.push({ type: "text", text: part.replace(/^\s+/, "") });
      }
    }
    return segments;
  }
}

export interface TokenFieldProps<T extends TokenFieldValue = TokenFieldValue>
  extends Omit<AriaTokenFieldProps<T>, "children"> {
  ref?: React.Ref<HTMLDivElement>;
  label?: string;
  description?: string;
  placeholder?: string;
  size?: Size;
  children?: ReactNode | TokenInputProps<T>["children"];
}

export function TokenField<T extends TokenFieldValue = TokenFieldValue>({
  label,
  description,
  placeholder,
  size,
  children,
  className,
  ...props
}: TokenFieldProps<T>) {
  return (
    <AriaTokenField
      {...props}
      data-slot="token-field"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "grid min-w-0 grid-cols-1 gap-2 text-sm text-foreground",
          size && fieldSizeStyles[size],
          className,
        ),
      )}
    >
      {children != null && typeof children !== "function" ? (
        children
      ) : (
        <>
          {label && <TokenFieldLabel>{label}</TokenFieldLabel>}
          <TokenFieldInput placeholder={placeholder}>
            {typeof children === "function" ? children : undefined}
          </TokenFieldInput>
          {description && (
            <TokenFieldDescription>{description}</TokenFieldDescription>
          )}
        </>
      )}
    </AriaTokenField>
  );
}

export function TokenFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="token-field-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function TokenFieldInput<T extends TokenFieldValue = TokenFieldValue>({
  className,
  children,
  placeholder,
  ...props
}: Omit<TokenInputProps<T>, "children"> & {
  children?: TokenInputProps<T>["children"];
  placeholder?: string;
}) {
  return (
    <AriaTokenInput
      {...props}
      data-slot="token-field-input"
      data-placeholder={placeholder}
      className={composeRenderProps(
        className,
        (className, { isHovered, isDisabled, isReadOnly }) =>
          cn(
            fieldHeight,
            fieldRadius,
            fieldPaddingX,
            fieldText,
            "cursor-text border border-input bg-card py-[max(0px,calc((var(--field-h,3rem)-1.75rem-2px)/2))] leading-[min(1.75rem,calc(var(--field-h,3rem)-2px))] text-foreground shadow-(--shadow-card) outline-none wrap-anywhere transition-[color,background-color,border-color,box-shadow] duration-150 ease-out-quint [&:empty]:before:pointer-events-none [&:empty]:before:text-muted-foreground/80 [&:empty]:before:content-[attr(data-placeholder)] data-focused:border-ring data-focused:ring-1 data-focused:ring-ring data-readonly:bg-muted/40 data-disabled:cursor-not-allowed data-disabled:bg-muted data-disabled:opacity-60",
            isHovered && !isDisabled && !isReadOnly && "border-primary/45",
            className,
          ),
      )}
    >
      {children ?? ((segment) => <Token>{segment.text}</Token>)}
    </AriaTokenInput>
  );
}

export function TokenFieldDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      {...props}
      slot="description"
      data-slot="token-field-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function Token({ className, ...props }: TokenProps) {
  return (
    <AriaToken
      {...props}
      data-slot="token"
      className={composeRenderProps(className, (className) =>
        cn(
          "mx-0.5 inline-block max-w-full rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground transition-[color,background-color] duration-150 ease-out-quint selected:bg-primary selected:text-primary-foreground",
          className,
        ),
      )}
    />
  );
}
