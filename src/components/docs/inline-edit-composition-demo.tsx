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

const editHint = "Double-click the name or select Edit.";

function CompositionStatus({ message }: { message: string }) {
  const { api, error, errorId } = useInlineEdit();
  const showsError = api.editing && Boolean(error);
  return (
    <p
      id={errorId}
      role={showsError ? "alert" : undefined}
      className={`text-xs leading-5 ${showsError ? "text-destructive" : "text-muted-foreground"}`}
    >
      {showsError ? error : message}
    </p>
  );
}

export function InlineEditCompositionDemo() {
  const [name, setName] = useState("Atlas");
  const [status, setStatus] = useState(editHint);

  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-card p-4 shadow-(--shadow-card)">
      <InlineEdit
        label="Project name"
        value={name}
        activationMode="dblclick"
        onSave={(next) => {
          if (!next.trim()) throw new Error("Add a project name.");
          setName(next.trim());
        }}
        onEditChange={({ edit }) => {
          if (edit) setStatus(editHint);
        }}
        onValueCommit={() => setStatus("Name saved.")}
      >
        <InlineEditLabel>Project name</InlineEditLabel>
        <InlineEditArea className="flex min-w-0 items-center gap-2">
          <InlineEditPreview className="font-medium" />
          <InlineEditInput className="rounded-(--field-radius) border border-input bg-card px-2 py-1" />
        </InlineEditArea>
        <InlineEditContext>
          {(api) => (
            <div className="flex min-h-9 items-center justify-between gap-3">
              <CompositionStatus
                message={api.editing ? "Editing the project name." : status}
              />
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
