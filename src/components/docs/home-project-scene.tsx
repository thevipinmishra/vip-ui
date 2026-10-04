"use client";

import { useState } from "react";
import { Check, Save, Trash } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type ProjectStatus = "draft" | "published" | "archived";

const statusMeta = {
  draft: { label: "Draft", variant: "warning" },
  published: { label: "Published", variant: "success" },
  archived: { label: "Archived", variant: "neutral" },
} as const;

export function HomeProjectScene() {
  const [status, setStatus] = useState<ProjectStatus>("draft");
  const [revision, setRevision] = useState(3);

  const result =
    status === "archived"
      ? "Archived. Restore the draft to edit again."
      : status === "published"
        ? `Published at saved revision v${revision}.`
        : `Draft. Saved revision v${revision}.`;

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-sm font-semibold">Autumn campaign</span>
        <Badge variant={statusMeta[status].variant} dot>
          {statusMeta[status].label}
        </Badge>
      </div>
      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Owner</dt>
          <dd className="mt-0.5 font-medium">Maya Chen</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Saved revision</dt>
          <dd className="mt-0.5 font-medium tabular-nums">v{revision}</dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-2">
        {status === "archived" ? (
          <Button
            variant="secondary"
            size="sm"
            onPress={() => setStatus("draft")}
          >
            Restore draft
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              isDisabled={status === "published"}
              onPress={() => setStatus("published")}
            >
              <Check size={16} aria-hidden="true" />
              Publish
            </Button>
            <Button
              variant="outline"
              size="sm"
              onPress={() => setRevision((value) => value + 1)}
            >
              <Save size={16} aria-hidden="true" />
              Save revision
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onPress={() => setStatus("archived")}
            >
              <Trash size={16} aria-hidden="true" />
              Archive
            </Button>
          </>
        )}
      </div>
      <p aria-live="polite" className="min-h-5 text-sm text-muted-foreground">
        {result}
      </p>
    </div>
  );
}
