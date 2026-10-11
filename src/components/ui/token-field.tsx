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
import { cn } from "@/lib/utils";
import { fieldDescriptionStyles, fieldLabelStyles } from "./field-styles";

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
  children?: ReactNode | TokenInputProps<T>["children"];
}

export function TokenField<T extends TokenFieldValue = TokenFieldValue>({
  label,
  description,
  placeholder,
  children,
  className,
  ...props
}: TokenFieldProps<T>) {
  return (
    <AriaTokenField
      {...props}
      data-slot="token-field"
      className={composeRenderProps(className, (className) =>
        cn("grid gap-2 text-sm text-foreground", className),
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
            "min-h-12 cursor-text rounded-lg border border-input bg-card px-3.5 py-2.5 text-base leading-7 text-foreground shadow-[var(--shadow-card)] outline-none [overflow-wrap:anywhere] transition-[color,background-color,border-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [&:empty]:before:pointer-events-none [&:empty]:before:text-muted-foreground/80 [&:empty]:before:content-[attr(data-placeholder)] data-[focused]:border-ring data-[focused]:ring-3 data-[focused]:ring-ring/50 data-[readonly]:bg-muted/40 data-[disabled]:cursor-not-allowed data-[disabled]:bg-muted data-[disabled]:opacity-60 sm:text-sm",
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
          "mx-0.5 inline-block max-w-full rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground transition-[color,background-color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[selected]:bg-primary data-[selected]:text-primary-foreground",
          className,
        ),
      )}
    />
  );
}
