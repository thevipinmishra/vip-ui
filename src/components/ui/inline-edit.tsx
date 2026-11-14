"use client";

import { CheckIcon, PencilSimpleIcon, XIcon } from "@phosphor-icons/react";
import { useEffect, useId, useRef, useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  fieldErrorStyles,
  fieldHeight,
  fieldLabelStyles,
  fieldRadius,
  fieldText,
  fieldTriggerStyles,
} from "./field-styles";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { Spinner } from "./spinner";
import { TextField, TextFieldLabel } from "./text-field";

export interface InlineEditProps {
  label: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onSave?: (value: string) => void | Promise<void>;
  isDisabled?: boolean;
  className?: string;
}

const ease = "cubic-bezier(0.23, 1, 0.32, 1)";

function stillMotion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function InlineEdit({
  label,
  value,
  defaultValue = "",
  placeholder = "Not set",
  onSave,
  isDisabled,
  className,
}: InlineEditProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const [draft, setDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(0);
  const [announcement, setAnnouncement] = useState("");
  const [error, setError] = useState("");
  const errorId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const savingRef = useRef(false);
  const current = value === undefined ? localValue : value;

  useEffect(() => {
    if (isEditing) inputRef.current?.select();
    else if (hasEdited) triggerRef.current?.focus();
  }, [isEditing, hasEdited]);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(0), 1600);
    return () => window.clearTimeout(timer);
  }, [saved]);

  useEffect(() => {
    if (!error || stillMotion()) return;
    groupRef.current?.animate(
      { translate: ["0", "-0.25rem", "0.1875rem", "-0.125rem", "0"] },
      { duration: 320, easing: ease },
    );
  }, [error]);

  function open() {
    setDraft(current);
    setError("");
    setAnnouncement("");
    setSaved(0);
    setHasEdited(true);
    setIsEditing(true);
  }

  async function save() {
    if (savingRef.current) return;
    if (draft === current) {
      setIsEditing(false);
      return;
    }
    savingRef.current = true;
    setIsSaving(true);
    setError("");
    try {
      await onSave?.(draft);
      if (value === undefined) setLocalValue(draft);
      setIsEditing(false);
      setSaved(Date.now());
      setAnnouncement(`${label} saved.`);
    } catch (reason) {
      setError(
        reason instanceof Error && reason.message
          ? reason.message
          : "Could not save. Try again.",
      );
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  }

  return (
    <div
      className={cn("grid w-full min-w-0 grid-cols-1 gap-2", className)}
      data-slot="inline-edit"
      data-editing={isEditing || undefined}
    >
      {isEditing ? (
        <TextField
          value={draft}
          onChange={(next) => {
            setDraft(next);
            setError("");
          }}
          isReadOnly={isSaving}
          isInvalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onKeyDown={(event) => {
            if (isSaving || event.nativeEvent.isComposing) return;
            if (event.key === "Escape") {
              event.preventDefault();
              setIsEditing(false);
            } else if (event.key === "Enter") {
              event.preventDefault();
              void save();
            }
          }}
        >
          <TextFieldLabel>{label}</TextFieldLabel>
          <InputGroup
            ref={groupRef}
            className="transition-[background-color,border-color,box-shadow] duration-200 ease-out-quint starting:border-transparent starting:bg-transparent starting:shadow-none"
          >
            <InputGroupInput
              ref={inputRef}
              autoFocus
              placeholder={placeholder}
            />
            <InputGroupAddon className="gap-0">
              <Button
                type="button"
                variant="ghost"
                iconOnly
                isPending={isSaving}
                aria-label="Save"
                className={cn(
                  fieldTriggerStyles,
                  "transition-[color,background-color,scale,opacity] starting:scale-75 starting:opacity-0",
                )}
                onPress={() => void save()}
              >
                {isSaving ? (
                  <Spinner size="sm" decorative />
                ) : (
                  <CheckIcon weight="bold" aria-hidden="true" />
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                iconOnly
                isDisabled={isSaving}
                aria-label="Cancel"
                className={cn(
                  fieldTriggerStyles,
                  "transition-[color,background-color,scale,opacity] starting:scale-75 starting:opacity-0",
                )}
                onPress={() => setIsEditing(false)}
              >
                <XIcon weight="bold" aria-hidden="true" />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          {error && (
            <p id={errorId} role="alert" className={fieldErrorStyles}>
              {error}
            </p>
          )}
        </TextField>
      ) : (
        <>
          <span className={fieldLabelStyles}>{label}</span>
          <AriaButton
            ref={triggerRef}
            isDisabled={isDisabled}
            data-slot="inline-edit-trigger"
            data-saved={saved ? true : undefined}
            aria-label={`Edit ${label}: ${current || placeholder}`}
            onPress={open}
            className={cn(
              fieldHeight,
              fieldRadius,
              fieldText,
              "group/read flex w-full min-w-0 cursor-pointer items-center gap-2 border border-transparent ps-(--field-px,0.875rem) pe-(--field-inset,0.25rem) text-start text-foreground outline-offset-4 outline-transparent transition-[background-color,border-color,box-shadow,outline-color,outline-offset] duration-200 ease-out-quint hover:bg-muted pressed:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-default disabled:opacity-60 disabled:hover:bg-transparent motion-reduce:outline-offset-2 forced-colors:border-[ButtonBorder]",
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
              {current || placeholder}
            </span>
            <span
              aria-hidden="true"
              className="grid size-[calc(var(--field-h,3rem)-2px-2*var(--field-inset,0.25rem))] shrink-0 place-items-center text-muted-foreground *:col-start-1 *:row-start-1"
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
          </AriaButton>
        </>
      )}
      <output className="sr-only" aria-live="polite">
        {announcement}
      </output>
    </div>
  );
}
