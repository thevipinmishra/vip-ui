"use client";

import * as pinInput from "@zag-js/pin-input";
import { normalizeProps, useMachine } from "@zag-js/react";
import {
  createContext,
  type ReactNode,
  type Ref,
  useCallback,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { mergeRefs } from "react-aria/mergeRefs";
import {
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  composeRenderProps,
  FieldError,
  FieldErrorContext,
  Text,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import {
  fieldDescriptionStyles,
  fieldErrorStyles,
  fieldLabelStyles,
  fieldSizeStyles,
} from "./field-styles";

export type OtpInputPattern = "digits" | "alphanumeric";

const machinePatterns: Record<OtpInputPattern, string> = {
  digits: "[0-9]",
  alphanumeric: "[a-zA-Z0-9]",
};

function filterValue(
  value: string,
  pattern: OtpInputPattern,
  length: number,
): string {
  const allowed =
    pattern === "digits"
      ? value.replace(/\D/g, "")
      : value.replace(/[^a-z0-9]/gi, "").toUpperCase();
  return allowed.slice(0, length);
}

function toChars(value: string, length: number) {
  return filterValue(value, "alphanumeric", length).split("");
}

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

export interface OtpInputContextValue {
  /** The connected pin-input machine. */
  api: pinInput.Api;
  /** The current value as a string. */
  value: string;
  /** The allowed characters. */
  pattern: OtpInputPattern;
  descriptionId: string;
  errorId: string;
  /** The accessible name of the input row, when set on the root. */
  ariaLabel?: string;
}

const OtpInputPartsContext = createContext<OtpInputContextValue | null>(null);

export function useOtpInput(): OtpInputContextValue {
  const context = useContext(OtpInputPartsContext);
  if (!context)
    throw new Error("useOtpInput must be used inside an <OtpInput>.");
  return context;
}

export interface OtpInputContextProps {
  children: (api: pinInput.Api) => ReactNode;
}

export function OtpInputContext({ children }: OtpInputContextProps) {
  const { api } = useOtpInput();
  return <>{children(api)}</>;
}

export interface OtpInputProps
  extends Omit<
    AriaTextFieldProps,
    "children" | "className" | "onChange" | "pattern" | "placeholder"
  > {
  /** The number of boxes. Maps to the machine `count`. */
  length?: number;
  /** Allowed characters. Maps to the machine `type` and `pattern`. */
  pattern?: OtpInputPattern;
  size?: "sm" | "md" | "lg";
  ref?: Ref<HTMLDivElement>;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: AriaTextFieldProps["className"];
  children?: ReactNode;
  /** The name of the hidden input, used for form submission. */
  name?: string;
  /** The form that the hidden input submits with. */
  form?: string;
  /** The placeholder of each box. */
  placeholder?: string;
  /** Signals `autocomplete="one-time-code"` to the inputs. */
  otp?: boolean;
  /** Masks each box like `type="password"`. */
  mask?: boolean;
  /** Focuses the first input on mount. */
  autoFocus?: boolean;
  /** Submits the owning form when the value is complete. */
  autoSubmit?: boolean;
  /** Blurs the input when the value is complete. */
  blurOnComplete?: boolean;
  /** Selects the value of a box when it receives focus. */
  selectOnFocus?: boolean;
  /** Strips formatting from pasted values before validation. */
  sanitizeValue?: (value: string) => string;
  /** Reads the writing direction from `dir` or the document. */
  dir?: "ltr" | "rtl";
  /** The ids of the machine parts. Useful for composition. */
  ids?: pinInput.ElementIds;
  /** Resolves the document in custom environments such as iframes. */
  getRootNode?: () => ShadowRoot | Document | Node;
  /** Localizes the accessible label of each box. */
  translations?: pinInput.IntlTranslations;
  /** Called when a value does not match the pattern. */
  onValueInvalid?: (details: pinInput.ValueInvalidDetails) => void;
}

export function OtpInput({
  length = 6,
  pattern = "digits",
  size = "lg",
  value,
  defaultValue,
  onChange,
  onComplete,
  onValueInvalid,
  sanitizeValue,
  translations,
  ids,
  getRootNode,
  dir,
  placeholder = "",
  otp = true,
  mask,
  autoSubmit,
  blurOnComplete,
  selectOnFocus = true,
  autoFocus,
  isDisabled,
  isReadOnly,
  isRequired,
  isInvalid,
  name,
  form,
  className,
  children,
  ref,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: OtpInputProps) {
  const [uncontrolled, setUncontrolled] = useState(() =>
    filterValue(defaultValue ?? "", pattern, length),
  );
  const [detectedDir, setDetectedDir] = useState<"ltr" | "rtl">("ltr");
  const rootRef = useRef<HTMLDivElement | null>(null);
  const current = filterValue(
    value === undefined ? uncontrolled : value,
    pattern,
    length,
  );
  const descriptionId = useId();
  const errorId = useId();

  useLayoutEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    setDetectedDir(getComputedStyle(node).direction === "rtl" ? "rtl" : "ltr");
  }, []);

  const commit = useCallback(
    (raw: string) => {
      const next = filterValue(raw, pattern, length);
      if (value === undefined) setUncontrolled(next);
      if (next !== current) onChange?.(next);
    },
    [current, length, onChange, pattern, value],
  );

  const complete = useCallback(
    (raw: string) => {
      const next = filterValue(raw, pattern, length);
      if (next.length === length) onComplete?.(next);
    },
    [length, onComplete, pattern],
  );

  return (
    <AriaTextField
      {...props}
      ref={mergeRefs(rootRef, ref)}
      value={current}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      isInvalid={isInvalid}
      aria-label={ariaLabel ?? (ariaLabelledBy ? undefined : "One-time code")}
      aria-labelledby={ariaLabelledBy}
      onChange={() => {}}
      data-slot="otp-input"
      data-size={size}
      className={composeRenderProps(className, (className) =>
        cn(
          "group/otp flex w-full min-w-0 flex-col gap-2",
          fieldSizeStyles[size],
          className,
        ),
      )}
    >
      <OtpInputField
        value={current}
        length={length}
        pattern={pattern}
        name={name}
        form={form}
        dir={dir ?? detectedDir}
        disabled={isDisabled}
        readOnly={isReadOnly}
        required={isRequired}
        placeholder={placeholder}
        otp={otp}
        mask={mask}
        autoFocus={autoFocus}
        autoSubmit={autoSubmit}
        blurOnComplete={blurOnComplete}
        selectOnFocus={selectOnFocus}
        sanitizeValue={sanitizeValue}
        translations={translations}
        ids={ids}
        getRootNode={getRootNode}
        onValueChange={(details) => commit(details.valueAsString)}
        onValueComplete={(details) => complete(details.valueAsString)}
        onValueInvalid={onValueInvalid}
        descriptionId={descriptionId}
        errorId={errorId}
        ariaLabel={ariaLabel}
      >
        {children}
      </OtpInputField>
    </AriaTextField>
  );
}

interface OtpInputFieldProps {
  value: string;
  length: number;
  pattern: OtpInputPattern;
  name?: string;
  form?: string;
  dir: "ltr" | "rtl";
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  placeholder: string;
  otp: boolean;
  mask?: boolean;
  autoFocus?: boolean;
  autoSubmit?: boolean;
  blurOnComplete?: boolean;
  selectOnFocus: boolean;
  sanitizeValue?: (value: string) => string;
  translations?: pinInput.IntlTranslations;
  ids?: pinInput.ElementIds;
  getRootNode?: () => ShadowRoot | Document | Node;
  onValueChange: (details: pinInput.ValueChangeDetails) => void;
  onValueComplete: (details: pinInput.ValueChangeDetails) => void;
  onValueInvalid?: (details: pinInput.ValueInvalidDetails) => void;
  descriptionId: string;
  errorId: string;
  ariaLabel?: string;
  children?: ReactNode;
}

function OtpInputField({
  value,
  length,
  pattern,
  name,
  form,
  dir,
  disabled,
  readOnly,
  required,
  placeholder,
  otp,
  mask,
  autoFocus,
  autoSubmit,
  blurOnComplete,
  selectOnFocus,
  sanitizeValue,
  translations,
  ids,
  getRootNode,
  onValueChange,
  onValueComplete,
  onValueInvalid,
  descriptionId,
  errorId,
  ariaLabel,
  children,
}: OtpInputFieldProps) {
  const id = `otp-input-${stableId(useId())}`;
  const field = useContext(FieldErrorContext);
  const invalidValue = Boolean(field?.isInvalid);
  const inputLabel =
    translations?.inputLabel ??
    ((index: number, total: number) => `Character ${index + 1} of ${total}`);

  const service = useMachine(pinInput.machine, {
    id,
    count: length,
    type: pattern === "digits" ? "numeric" : "alphanumeric",
    pattern: machinePatterns[pattern],
    otp,
    name,
    form,
    ids,
    dir,
    disabled,
    readOnly,
    required,
    invalid: invalidValue,
    placeholder,
    autoFocus,
    autoSubmit,
    blurOnComplete,
    selectOnFocus,
    mask,
    getRootNode,
    value: toChars(value, length),
    sanitizeValue: (raw) =>
      filterValue(sanitizeValue ? sanitizeValue(raw) : raw, pattern, length),
    translations: { ...translations, inputLabel },
    onValueChange,
    onValueComplete,
    onValueInvalid,
  });

  const api = pinInput.connect(service, normalizeProps);
  const context = useMemo<OtpInputContextValue>(
    () => ({
      api,
      value: api.value.map((char) => char ?? "").join(""),
      pattern,
      descriptionId,
      errorId,
      ariaLabel,
    }),
    [api, descriptionId, errorId, ariaLabel, pattern],
  );

  return (
    <OtpInputPartsContext value={context}>
      <OtpInputRoot>
        {children ?? <OtpInputSlots />}
        <OtpInputHiddenInput />
      </OtpInputRoot>
    </OtpInputPartsContext>
  );
}

function OtpInputRoot({ className, ...props }: React.ComponentProps<"div">) {
  const { api } = useOtpInput();
  return (
    <div
      {...api.getRootProps()}
      {...props}
      data-slot="otp-input-field"
      className={cn("contents", className)}
    />
  );
}

export interface OtpInputSlotsProps {
  className?: string;
  children?: ReactNode;
}

export function OtpInputSlots({ className, children }: OtpInputSlotsProps) {
  const { api, descriptionId, errorId, ariaLabel } = useOtpInput();
  const { "aria-labelledby": labelledBy, ...controlProps } =
    api.getControlProps();

  return (
    <div
      {...controlProps}
      {...(ariaLabel
        ? { "aria-label": ariaLabel }
        : { "aria-labelledby": labelledBy })}
      aria-describedby={descriptionId}
      aria-errormessage={errorId}
      data-slot="otp-input-slots"
      className={cn("flex min-w-0 items-center gap-2", className)}
    >
      {children ??
        api.items.map((item) => <OtpInputSlot key={item} index={item} />)}
    </div>
  );
}

function OtpInputHiddenInput({
  className,
  ...props
}: Omit<React.ComponentProps<"input">, "children">) {
  const { api } = useOtpInput();
  return (
    <input
      {...api.getHiddenInputProps()}
      {...props}
      data-slot="otp-input-value"
      className={className}
    />
  );
}

export function OtpInputLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  const { api } = useOtpInput();
  const labelProps = api.getLabelProps();
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: The machine ties the label to the hidden value input.
    <label
      {...labelProps}
      {...props}
      htmlFor={labelProps.htmlFor}
      data-slot="otp-input-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function OtpInputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="otp-input-group"
      className={cn("flex min-w-0 items-center gap-2", className)}
    />
  );
}

export interface OtpInputSlotProps
  extends Omit<React.ComponentProps<"input">, "value"> {
  index: number;
}

export function OtpInputSlot({
  index,
  className,
  ...props
}: OtpInputSlotProps) {
  const { api, value, pattern } = useOtpInput();
  const filled = Boolean(value[index]);

  return (
    <input
      {...api.getInputProps({ index })}
      inputMode={pattern === "digits" ? "numeric" : "text"}
      {...props}
      data-slot="otp-input-slot"
      data-index={index}
      data-filled={filled || undefined}
      className={cn(
        "h-(--field-h) w-(--field-h) min-h-0 min-w-0 basis-(--field-h) shrink rounded-(--field-radius) border border-input bg-card text-center font-mono text-lg font-medium text-foreground uppercase tabular-nums shadow-(--shadow-card) outline-none transition-[border-color,box-shadow,background-color] duration-150 ease-out-quint forced-colors:border-[CanvasText]",
        "focus:border-ring focus:ring-1 focus:ring-ring",
        "group-invalid/otp:border-destructive group-invalid/otp:focus:border-destructive group-invalid/otp:focus:ring-destructive",
        "group-read-only/otp:bg-muted/40",
        "group-disabled/otp:border-input group-disabled/otp:bg-muted group-disabled/otp:opacity-60",
        className,
      )}
    />
  );
}

export function OtpInputSeparator({
  className,
  children = "-",
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="otp-input-separator"
      className={cn(
        "mx-1 shrink-0 font-mono text-lg text-muted-foreground select-none",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function OtpInputDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  const { descriptionId } = useOtpInput();
  return (
    <Text
      {...props}
      id={props.id ?? descriptionId}
      slot="description"
      data-slot="otp-input-description"
      className={cn(fieldDescriptionStyles, className)}
    />
  );
}

export function OtpInputError({
  className,
  ...props
}: React.ComponentProps<typeof FieldError>) {
  const { errorId } = useOtpInput();
  return (
    <FieldError
      {...props}
      id={props.id ?? errorId}
      data-slot="otp-input-error"
      className={cn(fieldErrorStyles, className)}
    />
  );
}
