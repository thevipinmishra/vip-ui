"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Edit } from "reicon-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { TextField } from "./text-field";

export interface InlineEditProps {
  label: string;
  value?: string;
  defaultValue?: string;
  onSave?: (value: string) => void | Promise<void>;
  isDisabled?: boolean;
  className?: string;
}

export function InlineEdit({
  label,
  value,
  defaultValue = "",
  onSave,
  isDisabled,
  className,
}: InlineEditProps) {
  const [localValue, setLocalValue] = useState(defaultValue);
  const [draft, setDraft] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const errorId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasOpened = useRef(false);
  const savingRef = useRef(false);
  const current = value === undefined ? localValue : value;

  useEffect(() => {
    if (!isEditing && hasOpened.current) triggerRef.current?.focus();
  }, [isEditing]);

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
    <div className={cn("grid w-full gap-2", className)} data-slot="inline-edit">
      {isEditing ? (
        <div data-slot="inline-edit-editor">
          <div className="flex flex-wrap items-end gap-2">
            <TextField
              label={label}
              value={draft}
              onChange={(next) => {
                setDraft(next);
                setError("");
              }}
              isDisabled={isSaving}
              isInvalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              autoFocus
              className="min-w-0 flex-[1_1_12rem]"
              onKeyDown={(event) => {
                if (isSaving || event.nativeEvent.isComposing) return;
                if (event.key === "Escape") {
                  event.preventDefault();
                  event.stopPropagation();
                  setIsEditing(false);
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  event.stopPropagation();
                  void save();
                }
              }}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                isDisabled={isSaving}
                onPress={() => void save()}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                isDisabled={isSaving}
                onPress={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
          {error && (
            <p
              id={errorId}
              role="alert"
              className="mt-2 text-sm text-destructive"
            >
              {error}
            </p>
          )}
        </div>
      ) : (
        <>
          <span className="text-sm font-medium text-foreground">{label}</span>
          <div className="flex min-w-0">
            <Button
              ref={triggerRef}
              type="button"
              variant="ghost"
              size="default"
              isDisabled={isDisabled}
              className="min-w-0 max-w-full"
              aria-label={`Edit ${label}: ${current || "Not set"}`}
              onPress={() => {
                setDraft(current);
                setError("");
                hasOpened.current = true;
                setIsEditing(true);
              }}
            >
              <span
                className={cn(
                  "min-w-0 truncate",
                  !current && "text-muted-foreground",
                )}
              >
                {current || "Not set"}
              </span>
              <Edit
                size={16}
                aria-hidden="true"
                className="shrink-0 text-muted-foreground"
              />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
