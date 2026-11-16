"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InlineEdit,
  InlineEditArea,
  InlineEditCancelTrigger,
  InlineEditContext,
  InlineEditControl,
  InlineEditInput,
  InlineEditLabel,
  InlineEditPreview,
  InlineEditSubmitTrigger,
  useInlineEdit,
} from "@/components/ui/inline-edit";
import { cn } from "@/lib/utils";

function CompositionStatus({ message }: { message: string }) {
  const { api, error, errorId } = useInlineEdit();
  const showsError = api.editing && Boolean(error);
  return (
    <p
      id={errorId}
      role={showsError ? "alert" : undefined}
      className={cn(
        "text-xs leading-5",
        showsError ? "text-destructive" : "text-muted-foreground",
      )}
    >
      {showsError ? error : message}
    </p>
  );
}

export function InlineEditCompositionDemo() {
  const [name, setName] = useState("Atlas");
  const [status, setStatus] = useState("Double-click the name to edit it.");

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4 shadow-(--shadow-card)">
      <InlineEdit
        label="Project name"
        value={name}
        activationMode="dblclick"
        onSave={async (next) => {
          if (!next.trim()) throw new Error("Add a project name.");
          setName(next.trim());
        }}
        onEditChange={({ edit }) =>
          setStatus(edit ? "Editing the project name." : "Name saved.")
        }
      >
        <InlineEditLabel>Project name</InlineEditLabel>
        <InlineEditArea className="flex min-w-0 items-center gap-2">
          <InlineEditPreview className="font-medium" />
          <InlineEditInput className="rounded-(--field-radius) border border-input bg-card px-2 py-1" />
        </InlineEditArea>
        <InlineEditContext>
          {(api) => (
            <div className="flex min-h-9 items-center justify-between gap-3">
              <CompositionStatus message={status} />
              {api.editing ? (
                <InlineEditControl className="min-h-0 w-auto gap-1 border-0 bg-transparent p-0 shadow-none">
                  <InlineEditCancelTrigger />
                  <InlineEditSubmitTrigger />
                </InlineEditControl>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onPress={api.edit}
                >
                  Edit
                </Button>
              )}
            </div>
          )}
        </InlineEditContext>
      </InlineEdit>
    </div>
  );
}
