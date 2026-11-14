"use client";

import {
  ArrowDownIcon,
  PaperPlaneRightIcon,
  StopIcon,
} from "@phosphor-icons/react";
import {
  type ComponentProps,
  createContext,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  TextArea as AriaTextArea,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
  composeRenderProps,
  Label,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  fieldLabelStyles,
  fieldPaddingX,
  fieldSizeStyles,
  fieldText,
} from "./field-styles";
import type { Size } from "./size";
import { SizeProvider } from "./size";

export type PromptInputSubmitKey = "enter" | "mod+enter";

interface PromptInputContextValue {
  submit: () => void;
  stop?: () => void;
  isPending: boolean;
  hasValue: boolean;
  submitKey: PromptInputSubmitKey;
  textAreaRef: React.RefObject<HTMLTextAreaElement | null>;
}

const PromptInputContext = createContext<PromptInputContextValue | null>(null);

function usePromptInputContext() {
  const context = useContext(PromptInputContext);
  if (!context)
    throw new Error(
      "PromptInput parts must render inside a PromptInput. Use the parts as the children of PromptInput.",
    );
  return context;
}

export interface PromptInputProps
  extends Omit<AriaTextFieldProps, "children" | "className" | "onSubmit"> {
  children?: ReactNode;
  className?: AriaTextFieldProps["className"];
  size?: Size;
  label?: string;
  placeholder?: string;
  submitKey?: PromptInputSubmitKey;
  isPending?: boolean;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  onFilesDropped?: (files: File[]) => void;
  dropLabel?: string;
  ref?: React.Ref<HTMLDivElement>;
}

interface PromptInputDropOverlayProps {
  label: string;
}

export function PromptInput({
  children,
  className,
  size,
  label,
  placeholder,
  submitKey = "enter",
  isPending = false,
  onSubmit,
  onStop,
  onFilesDropped,
  dropLabel = "Drop files to attach",
  value,
  defaultValue = "",
  onChange,
  ref,
  ...props
}: PromptInputProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dragDepthRef = useRef(0);
  const onFilesDroppedRef = useRef(onFilesDropped);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;
  const hasValue = currentValue.trim().length > 0;
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    onFilesDroppedRef.current = onFilesDropped;
  }, [onFilesDropped]);

  const submit = useCallback(() => {
    if (!hasValue || isPending) return;
    onSubmit?.(currentValue);
    if (!isControlled) setUncontrolledValue("");
    textAreaRef.current?.focus();
  }, [currentValue, hasValue, isControlled, isPending, onSubmit]);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const handleDragEnter = (event: globalThis.DragEvent) => {
      if (!onFilesDroppedRef.current) return;
      if (!event.dataTransfer?.types.includes("Files")) return;
      event.preventDefault();
      dragDepthRef.current += 1;
      setIsDragging(true);
    };
    const handleDragOver = (event: globalThis.DragEvent) => {
      if (!onFilesDroppedRef.current) return;
      if (!event.dataTransfer?.types.includes("Files")) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "copy";
    };
    const handleDragLeave = () => {
      if (!onFilesDroppedRef.current) return;
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) setIsDragging(false);
    };
    const handleDrop = (event: globalThis.DragEvent) => {
      if (!onFilesDroppedRef.current) return;
      dragDepthRef.current = 0;
      setIsDragging(false);
      const files = Array.from(event.dataTransfer?.files ?? []);
      if (files.length === 0) return;
      event.preventDefault();
      onFilesDroppedRef.current(files);
    };
    element.addEventListener("dragenter", handleDragEnter);
    element.addEventListener("dragover", handleDragOver);
    element.addEventListener("dragleave", handleDragLeave);
    element.addEventListener("drop", handleDrop);
    return () => {
      element.removeEventListener("dragenter", handleDragEnter);
      element.removeEventListener("dragover", handleDragOver);
      element.removeEventListener("dragleave", handleDragLeave);
      element.removeEventListener("drop", handleDrop);
    };
  }, []);

  const setRootRef = useCallback(
    (element: HTMLDivElement | null) => {
      rootRef.current = element;
      if (typeof ref === "function") ref(element);
      else if (ref && ref.current !== element) ref.current = element;
    },
    [ref],
  );

  return (
    <AriaTextField
      {...props}
      ref={setRootRef}
      value={currentValue}
      onChange={(next) => {
        if (!isControlled) setUncontrolledValue(next);
        onChange?.(next);
      }}
      data-slot="prompt-input"
      data-size={size}
      data-dragging={isDragging || undefined}
      className={composeRenderProps(className, (className) =>
        cn(
          "relative flex w-full min-w-0 flex-col rounded-(--field-radius,var(--radius-lg)) border border-input bg-card text-foreground shadow-(--shadow-card) outline-none transition-[color,background-color,border-color,box-shadow] duration-150 ease-out-quint [&:hover]:border-primary/45 [&:focus-within]:border-ring [&:focus-within]:ring-1 [&:focus-within]:ring-ring [&:focus-within:hover]:border-ring data-invalid:border-destructive [&[data-invalid]:hover]:border-destructive [&[data-invalid]:focus-within]:border-destructive [&[data-invalid]:focus-within]:ring-destructive data-readonly:bg-muted/40 [&[data-readonly]:hover]:border-input data-disabled:bg-muted data-disabled:opacity-60 [&[data-disabled]:hover]:border-input dragging:border-primary/60",
          size && fieldSizeStyles[size],
          className,
        ),
      )}
    >
      <PromptInputContext
        value={{
          submit,
          stop: onStop,
          isPending,
          hasValue,
          submitKey,
          textAreaRef,
        }}
      >
        <SizeProvider size={size}>
          {label && <PromptInputLabel>{label}</PromptInputLabel>}
          {children ?? (
            <>
              <PromptInputTextArea
                placeholder={placeholder}
                aria-label={label ? undefined : "Message"}
              />
              <PromptInputFooter>
                <PromptInputSubmit className="ms-auto" />
              </PromptInputFooter>
            </>
          )}
          {isDragging && onFilesDropped && (
            <PromptInputDropOverlay label={dropLabel} />
          )}
        </SizeProvider>
      </PromptInputContext>
    </AriaTextField>
  );
}

export function PromptInputLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      {...props}
      data-slot="prompt-input-label"
      className={cn(fieldLabelStyles, "sr-only", className)}
    />
  );
}

function PromptInputDropOverlay({ label }: PromptInputDropOverlayProps) {
  return (
    <div
      data-slot="prompt-input-drop-overlay"
      role="presentation"
      className="pointer-events-none absolute inset-0 z-10 grid place-items-center rounded-(--field-radius,var(--radius-lg)) border-2 border-dashed border-primary/60 bg-card/90 text-sm font-medium text-foreground transition-[opacity,scale] duration-150 ease-out-quint starting:scale-[0.98] starting:opacity-0 motion-reduce:transition-none"
    >
      <span className="flex items-center gap-2">
        <ArrowDownIcon size={16} aria-hidden="true" />
        {label}
      </span>
    </div>
  );
}

export interface PromptInputTextAreaProps
  extends Omit<ComponentProps<typeof AriaTextArea>, "rows"> {
  minRows?: number;
  maxRows?: number;
}

export function PromptInputTextArea({
  className,
  minRows = 1,
  maxRows = 8,
  onKeyDown,
  ...props
}: PromptInputTextAreaProps) {
  const { submitKey, submit, textAreaRef } = usePromptInputContext();
  const localRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    const element = localRef.current;
    if (!element) return;
    const styles = getComputedStyle(element);
    const lineHeight = Number.parseFloat(styles.lineHeight) || 24;
    const vertical =
      Number.parseFloat(styles.paddingTop) +
      Number.parseFloat(styles.paddingBottom) +
      Number.parseFloat(styles.borderTopWidth) +
      Number.parseFloat(styles.borderBottomWidth);
    const maxHeight = maxRows * lineHeight + vertical;
    element.style.height = "auto";
    const height = Math.min(element.scrollHeight, maxHeight);
    element.style.height = `${height}px`;
    element.style.overflowY =
      element.scrollHeight > maxHeight ? "auto" : "hidden";
    if (minRows > 1) {
      const minHeight = minRows * lineHeight + vertical;
      element.style.minHeight = `${minHeight}px`;
    }
  }, [maxRows, minRows]);

  useLayoutEffect(() => {
    resize();
  });

  useEffect(() => {
    const element = localRef.current;
    if (!element) return;
    let width = element.clientWidth;
    const observer = new ResizeObserver((entries) => {
      const nextWidth = entries[0]?.contentRect.width ?? 0;
      if (nextWidth === 0 || nextWidth === width) return;
      width = nextWidth;
      resize();
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [resize]);

  const setTextAreaRef = useCallback(
    (element: HTMLTextAreaElement | null) => {
      localRef.current = element;
      textAreaRef.current = element;
    },
    [textAreaRef],
  );

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.key !== "Enter") return;
    const native = event.nativeEvent;
    if (native.isComposing || native.keyCode === 229) return;
    const modified = event.metaKey || event.ctrlKey;
    const shouldSubmit =
      submitKey === "mod+enter"
        ? modified && !event.shiftKey
        : !modified && !event.shiftKey;
    if (!shouldSubmit) return;
    event.preventDefault();
    submit();
  };

  return (
    <AriaTextArea
      {...props}
      ref={setTextAreaRef}
      onKeyDown={handleKeyDown}
      rows={minRows}
      data-slot="prompt-input-textarea"
      className={cn(
        fieldText,
        fieldPaddingX,
        "min-h-[calc(var(--field-h,3rem)-0.5rem)] w-full min-w-0 cursor-text resize-none overflow-y-hidden rounded-[calc(var(--field-radius,var(--radius-lg))-0.125rem)] bg-transparent py-3 leading-6 text-foreground outline-none transition-[color] duration-150 placeholder:text-muted-foreground/80 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
    />
  );
}

export function PromptInputFooter({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="prompt-input-footer"
      className={cn(
        "flex min-w-0 flex-wrap items-center gap-1 px-[calc(var(--field-px,0.875rem)-0.5rem)] pb-[calc(var(--field-px,0.875rem)-0.5rem)]",
        className,
      )}
    />
  );
}

export interface PromptInputSubmitProps
  extends Omit<ComponentProps<typeof Button>, "children" | "onPress"> {}

export function PromptInputSubmit({
  className,
  isDisabled,
  size = "sm",
  ...props
}: PromptInputSubmitProps) {
  const { submit, stop, isPending, hasValue } = usePromptInputContext();
  const label = props["aria-label"] ?? (isPending && stop ? "Stop" : "Send");
  const stopping = Boolean(isPending && stop);

  return (
    <Button
      {...props}
      data-slot={stopping ? "prompt-input-stop" : "prompt-input-submit"}
      type="button"
      variant={stopping ? "outline" : "default"}
      size={size}
      iconOnly
      aria-label={label}
      onPress={stopping ? stop : submit}
      isDisabled={isDisabled || (isPending ? !stop : !hasValue)}
      className={className}
    >
      <span
        aria-hidden="true"
        className="grid shrink-0 place-items-center *:col-start-1 *:row-start-1"
      >
        <PaperPlaneRightIcon
          weight="fill"
          data-slot="prompt-input-send-icon"
          data-active={!stopping || undefined}
          className="transition-[opacity,scale] duration-150 ease-out-quint data-active:opacity-100 motion-reduce:transition-none not-data-active:scale-75 not-data-active:opacity-0"
        />
        <StopIcon
          weight="fill"
          data-slot="prompt-input-stop-icon"
          data-active={stopping || undefined}
          className="transition-[opacity,scale] duration-150 ease-out-quint data-active:opacity-100 motion-reduce:transition-none not-data-active:scale-75 not-data-active:opacity-0"
        />
      </span>
    </Button>
  );
}
