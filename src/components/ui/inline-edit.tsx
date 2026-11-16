"use client";

import { CheckIcon, PencilSimpleIcon, XIcon } from "@phosphor-icons/react";
import * as editable from "@zag-js/editable";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/react";
import {
  createContext,
  type ReactNode,
  type Ref,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import {
  fieldErrorStyles,
  fieldHeight,
  fieldInnerHeight,
  fieldLabelStyles,
  fieldRadius,
  fieldText,
  fieldTriggerStyles,
} from "./field-styles";
import { InputGroup, InputGroupAddon } from "./input-group";
import { Spinner } from "./spinner";

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";
const swing = "cubic-bezier(0.37, 0, 0.63, 1)";

function stableId(value: string) {
  return value.replace(/[^a-zA-Z0-9_-]/g, "");
}

function stillMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface InlineEditContextValue {
  /** The connected editable machine. */
  api: editable.Api;
  /** The visible label, when rendered by `InlineEdit`. */
  label?: string;
  /** Resolved placeholder text. */
  placeholder: string;
  /** The committed value. */
  value: string;
  /** The save error, when a save rejected. */
  error: string;
  errorId: string;
  /** Whether a save is pending. */
  isSaving: boolean;
  /** The action that triggers submit in edit mode. */
  submitMode: editable.SubmitMode;
  /** Commits the draft through the same pipeline as the save button. */
  save: () => void | Promise<void>;
}

function submitsOnEnter(submitMode: editable.SubmitMode) {
  return submitMode === "enter" || submitMode === "both";
}

function submitsOnBlur(submitMode: editable.SubmitMode) {
  return submitMode === "blur" || submitMode === "both";
}

const InlineEditPartsContext = createContext<InlineEditContextValue | null>(
  null,
);

export function useInlineEdit(): InlineEditContextValue {
  const context = useContext(InlineEditPartsContext);
  if (!context)
    throw new Error("useInlineEdit must be used inside an <InlineEdit>.");
  return context;
}

export interface InlineEditContextProps {
  children: (api: editable.Api) => ReactNode;
}

export function InlineEditContext({ children }: InlineEditContextProps) {
  const { api } = useInlineEdit();
  return <>{children(api)}</>;
}

export interface InlineEditProps {
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string | { edit: string; preview: string };
  onSave?: (value: string) => void | Promise<void>;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isRequired?: boolean;
  autoComplete?: string;
  name?: string;
  form?: string;
  maxLength?: number;
  className?: string;
  children?: ReactNode;
  ref?: Ref<HTMLDivElement>;
  /** Whether the editable is in edit mode, controlled. */
  edit?: boolean;
  /** Whether the editable is in edit mode at first. */
  defaultEdit?: boolean;
  /** Called when the edit mode changes. */
  onEditChange?: (details: editable.EditChangeDetails) => void;
  /** The activation mode for the preview element. */
  activationMode?: editable.ActivationMode;
  /** The action that triggers submit in edit mode. */
  submitMode?: editable.SubmitMode;
  /** Selects the text in the input when it is focused. */
  selectOnFocus?: boolean;
  /** Marks the value as invalid. */
  isInvalid?: boolean;
  /** Overrides the accessible labels of the controls. */
  translations?: editable.IntlTranslations;
  /** The element that receives focus when the editable closes. */
  finalFocusEl?: () => HTMLElement | null;
  /** Grows the field with its content. */
  autoResize?: boolean;
  /** Reads the writing direction from `dir` or the document. */
  dir?: "ltr" | "rtl";
  /** The ids of the machine parts. Useful for composition. */
  ids?: editable.ElementIds;
  /** Resolves the document in custom environments such as iframes. */
  getRootNode?: () => ShadowRoot | Document | Node;
  /** Called when the value changes. */
  onValueChange?: (details: editable.ValueChangeDetails) => void;
  /** Called when the value is reverted. */
  onValueRevert?: (details: editable.ValueChangeDetails) => void;
  /** Called when the value is committed. */
  onValueCommit?: (details: editable.ValueChangeDetails) => void;
  /** Called on an interaction outside the field. */
  onInteractOutside?: (event: editable.InteractOutsideEvent) => void;
  /** Called when focus moves outside the field. */
  onFocusOutside?: (event: editable.FocusOutsideEvent) => void;
  /** Called when the pointer is pressed outside the field. */
  onPointerDownOutside?: (event: editable.PointerDownOutsideEvent) => void;
}

export function InlineEdit({
  label,
  value,
  defaultValue = "",
  placeholder = "Not set",
  onSave,
  isDisabled,
  isReadOnly,
  isRequired,
  autoComplete,
  name,
  form,
  maxLength,
  edit,
  defaultEdit,
  onEditChange,
  activationMode = "none",
  submitMode = "enter",
  selectOnFocus,
  isInvalid,
  translations,
  finalFocusEl,
  autoResize,
  dir,
  ids,
  getRootNode,
  onValueChange,
  onValueRevert,
  onValueCommit,
  onInteractOutside,
  onFocusOutside,
  onPointerDownOutside,
  className,
  children,
  ref,
}: InlineEditProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const [draft, setDraft] = useState(value ?? defaultValue);
  const [hasEdited, setHasEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [error, setError] = useState("");
  const generatedId = stableId(useId());
  const errorId = `inline-edit-${generatedId}`;
  const groupRef = useRef<HTMLDivElement>(null);
  const savingRef = useRef(false);
  const current = value === undefined ? localValue : value;
  const placeholderText =
    typeof placeholder === "string"
      ? placeholder
      : (placeholder?.preview ?? "");

  const service = useMachine(editable.machine, {
    id: `inline-edit-${generatedId}`,
    value: draft,
    edit,
    defaultEdit,
    activationMode,
    submitMode,
    selectOnFocus,
    disabled: isDisabled,
    readOnly: isReadOnly,
    required: isRequired,
    invalid: Boolean(error) || isInvalid,
    name,
    form,
    maxLength,
    placeholder,
    dir,
    ids,
    getRootNode,
    finalFocusEl,
    autoResize,
    translations: {
      edit:
        translations?.edit ?? `Edit ${label}: ${current || placeholderText}`,
      input: translations?.input ?? label,
      submit: translations?.submit ?? "Save",
      cancel: translations?.cancel ?? "Cancel",
    },
    onValueChange: (details) => {
      setDraft(details.value);
      setError("");
      onValueChange?.(details);
    },
    onValueRevert: (details) => {
      setDraft(details.value);
      onValueRevert?.(details);
    },
    onValueCommit: (details) => {
      if (value === undefined) setLocalValue(details.value);
      setSaved(Date.now());
      setAnnouncement(`${label} saved.`);
      onValueCommit?.(details);
    },
    onEditChange: (details) => {
      if (details.edit) {
        setHasEdited(true);
        setError("");
        setAnnouncement("");
        setSaved(0);
      }
      onEditChange?.(details);
    },
    onInteractOutside: (event) => {
      if (onInteractOutside) {
        onInteractOutside(event);
        return;
      }
      event.preventDefault();
    },
    onFocusOutside,
    onPointerDownOutside,
  });
  const api = editable.connect(service, normalizeProps);
  const editing = api.editing;

  useEffect(() => {
    // Leaving edit mode restores the committed value in the draft.
    // react-doctor-disable-next-line react-hooks-js/set-state-in-effect
    if (!editing) setDraft(current);
  }, [editing, current]);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(0), 1600);
    return () => window.clearTimeout(timer);
  }, [saved]);

  useEffect(() => {
    if (!error || stillMotion()) return;
    groupRef.current?.animate(
      {
        translate: ["0", "-0.25rem", "0.1875rem", "-0.125rem", "0"],
        easing: [ease, swing, swing, swing],
      },
      { duration: 320 },
    );
  }, [error]);

  const save = useCallback(async () => {
    if (savingRef.current) return;
    if (draft === current) {
      api.cancel();
      return;
    }
    savingRef.current = true;
    setIsSaving(true);
    setError("");
    try {
      await onSave?.(draft);
      api.submit();
    } catch (reason) {
      setError(
        reason instanceof Error && reason.message
          ? reason.message
          : "Could not save. Try again.",
      );
    }
    savingRef.current = false;
    setIsSaving(false);
  }, [api, current, draft, onSave]);

  const context: InlineEditContextValue = {
    api,
    label,
    placeholder: placeholderText,
    value: current,
    error,
    errorId,
    isSaving,
    submitMode,
    save,
  };

  return (
    <InlineEditPartsContext value={context}>
      <InlineEditRoot ref={ref} className={className}>
        {children ?? (
          <>
            <InlineEditLabel>{label}</InlineEditLabel>
            <InlineEditArea>
              {editing ? (
                <InlineEditEditing
                  autoComplete={autoComplete}
                  error={error}
                  errorId={errorId}
                  groupRef={groupRef}
                  isSaving={isSaving}
                />
              ) : (
                <InlineEditReading
                  current={current}
                  hasEdited={hasEdited}
                  placeholderText={placeholderText}
                  saved={saved}
                />
              )}
            </InlineEditArea>
            {editing && error ? (
              <p id={errorId} role="alert" className={fieldErrorStyles}>
                {error}
              </p>
            ) : null}
          </>
        )}
        <output className="sr-only" aria-live="polite">
          {announcement}
        </output>
      </InlineEditRoot>
    </InlineEditPartsContext>
  );
}

function InlineEditEditing({
  autoComplete,
  error,
  errorId,
  groupRef,
  isSaving,
}: {
  autoComplete: string | undefined;
  error: string;
  errorId: string;
  groupRef: RefObject<HTMLDivElement | null>;
  isSaving: boolean;
}) {
  return (
    <InputGroup
      ref={groupRef}
      data-invalid={error ? true : undefined}
      className="transition-[background-color,border-color,box-shadow] duration-200 ease-out-quint starting:border-transparent starting:bg-transparent starting:shadow-none"
    >
      <InlineEditInput
        autoComplete={autoComplete}
        aria-describedby={error ? errorId : undefined}
      />
      <InputGroupAddon className="gap-0">
        <InlineEditSubmitTrigger
          data-pending={isSaving || undefined}
          className="transition-[color,background-color,scale,opacity] starting:opacity-0 motion-safe:starting:scale-75"
        >
          {isSaving ? (
            <Spinner size="sm" decorative />
          ) : (
            <CheckIcon weight="bold" aria-hidden="true" />
          )}
        </InlineEditSubmitTrigger>
        <InlineEditCancelTrigger
          disabled={isSaving || undefined}
          className="transition-[color,background-color,scale,opacity] starting:opacity-0 motion-safe:starting:scale-75"
        >
          <XIcon weight="bold" aria-hidden="true" />
        </InlineEditCancelTrigger>
      </InputGroupAddon>
    </InputGroup>
  );
}

function InlineEditReading({
  current,
  hasEdited,
  placeholderText,
  saved,
}: {
  current: string;
  hasEdited: boolean;
  placeholderText: string;
  saved: number;
}) {
  return (
    <InlineEditEditTrigger
      data-saved={saved ? true : undefined}
      className={cn(
        hasEdited &&
          "starting:border-input starting:bg-card starting:shadow-(--shadow-card)",
      )}
    >
      <span
        className={cn(
          "min-w-0 flex-1 truncate",
          !current && "text-muted-foreground",
        )}
      >
        {current || placeholderText}
      </span>
      <span
        aria-hidden="true"
        className="grid size-[calc(var(--field-h,2.5rem)-2px-2*var(--field-inset,0.25rem))] shrink-0 place-items-center text-muted-foreground *:col-start-1 *:row-start-1"
      >
        <PencilSimpleIcon
          size={16}
          className={cn(
            "transition-[opacity,scale,color] duration-200 ease-out-quint group-hover/read:text-foreground group-data-saved/read:scale-50 group-data-saved/read:opacity-0",
            hasEdited && "starting:scale-50 starting:opacity-0",
          )}
        />
        <CheckIcon
          size={16}
          weight="bold"
          className="scale-50 text-success opacity-0 transition-[opacity,scale] duration-350 ease-spring group-data-saved/read:scale-100 group-data-saved/read:opacity-100 starting:scale-50 starting:opacity-0 forced-colors:text-[CanvasText]"
        />
      </span>
    </InlineEditEditTrigger>
  );
}

export function InlineEditRoot({
  className,
  onBlurCapture,
  ...props
}: React.ComponentProps<"div">) {
  const { api, save, submitMode } = useInlineEdit();
  return (
    <div
      {...api.getRootProps()}
      {...props}
      data-slot="inline-edit"
      data-editing={api.editing || undefined}
      onBlurCapture={(event) => {
        onBlurCapture?.(event);
        if (event.defaultPrevented || !api.editing) return;
        if (!submitsOnBlur(submitMode)) return;
        if (event.currentTarget.contains(event.relatedTarget)) return;
        void save();
      }}
      className={cn("grid w-full min-w-0 grid-cols-1 gap-2", className)}
    />
  );
}

export function InlineEditArea({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { api } = useInlineEdit();
  return (
    <div
      {...api.getAreaProps()}
      {...props}
      data-slot="inline-edit-area"
      className={cn("min-w-0", className)}
    />
  );
}

export function InlineEditLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  const { api } = useInlineEdit();
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: The machine sets htmlFor through getLabelProps.
    <label
      {...api.getLabelProps()}
      {...props}
      data-slot="inline-edit-label"
      className={cn(fieldLabelStyles, className)}
    />
  );
}

export function InlineEditInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const { api, save, submitMode } = useInlineEdit();
  return (
    <input
      {...mergeProps(
        api.getInputProps(),
        {
          onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.defaultPrevented) return;
            if (!submitsOnEnter(submitMode)) return;
            if (event.key !== "Enter") return;
            if (
              event.shiftKey ||
              event.metaKey ||
              event.nativeEvent.isComposing
            )
              return;
            event.preventDefault();
            void save();
          },
        },
        props,
      )}
      data-slot="inline-edit-input"
      className={cn(
        fieldInnerHeight,
        fieldText,
        "min-w-0 flex-1 cursor-text bg-transparent leading-6 text-foreground outline-none placeholder:text-muted-foreground/80 disabled:cursor-not-allowed",
        className,
      )}
    />
  );
}

export function InlineEditPreview({
  className,
  children,
  ...props
}: React.ComponentProps<"span">) {
  const { api } = useInlineEdit();
  return (
    <span
      {...api.getPreviewProps()}
      {...props}
      data-slot="inline-edit-preview"
      className={cn(
        "min-w-0 flex-1 cursor-text truncate outline-none data-[placeholder-shown]:text-muted-foreground",
        className,
      )}
    >
      {children ?? api.valueText}
    </span>
  );
}

export function InlineEditEditTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<"button">) {
  const { api } = useInlineEdit();
  return (
    <button
      {...api.getEditTriggerProps()}
      {...props}
      type="button"
      data-slot="inline-edit-trigger"
      className={cn(
        fieldHeight,
        fieldRadius,
        fieldText,
        "group/read flex w-full min-w-0 cursor-pointer items-center gap-2 border border-transparent ps-(--field-px,0.75rem) pe-(--field-inset,0.25rem) text-start text-foreground outline-offset-4 outline-transparent transition-[background-color,border-color,box-shadow,outline-color,outline-offset] duration-200 ease-out-quint hover:bg-muted pressed:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-60 disabled:hover:bg-transparent aria-disabled:cursor-default aria-disabled:opacity-60 aria-disabled:hover:bg-transparent motion-reduce:outline-offset-2 forced-colors:border-[ButtonBorder]",
        className,
      )}
    >
      {children ?? (
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            api.empty && "text-muted-foreground",
          )}
        >
          {api.valueText}
        </span>
      )}
    </button>
  );
}

export function InlineEditControl({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { api } = useInlineEdit();
  return (
    <div
      {...api.getControlProps()}
      {...props}
      data-slot="inline-edit-control"
      className={cn(
        fieldHeight,
        fieldRadius,
        "flex w-full min-w-0 items-center gap-x-2 border border-input bg-card ps-(--field-px,0.75rem) pe-(--field-px,0.75rem) text-foreground shadow-(--shadow-card)",
        className,
      )}
    />
  );
}

export function InlineEditSubmitTrigger({
  className,
  children,
  onClick,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  const { api, isSaving, save } = useInlineEdit();
  const triggerProps = api.getSubmitTriggerProps();
  return (
    <button
      {...triggerProps}
      {...props}
      type="button"
      disabled={triggerProps.disabled || disabled}
      aria-busy={isSaving || undefined}
      data-slot="inline-edit-submit-trigger"
      className={cn(fieldTriggerStyles, className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        event.preventDefault();
        void save();
      }}
    >
      {children ?? <CheckIcon weight="bold" aria-hidden="true" />}
    </button>
  );
}

export function InlineEditCancelTrigger({
  className,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button">) {
  const { api } = useInlineEdit();
  const triggerProps = api.getCancelTriggerProps();
  return (
    <button
      {...triggerProps}
      {...props}
      type="button"
      disabled={triggerProps.disabled || disabled}
      data-slot="inline-edit-cancel-trigger"
      className={cn(fieldTriggerStyles, className)}
    >
      {children ?? <XIcon weight="bold" aria-hidden="true" />}
    </button>
  );
}
