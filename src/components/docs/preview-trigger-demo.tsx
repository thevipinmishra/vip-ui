"use client";

import { useState } from "react";
import { FileText, Message } from "reicon-react";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Form } from "@/components/ui/form";
import { Popover } from "@/components/ui/popover";
import { PreviewTrigger } from "@/components/ui/preview-trigger";
import { TextField } from "@/components/ui/text-field";

export function PreviewTriggerDemo() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState("");

  return (
    <div className="grid justify-items-start gap-3">
      <PreviewTrigger>
        <Button variant="outline">
          <FileText size={16} aria-hidden="true" />
          autumn-campaign.fig
        </Button>
        <Popover className="w-80">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <FileText size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">
                autumn-campaign.fig
              </p>
              <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                4.8 MB · Version 12
              </p>
              <p className="text-xs leading-5 text-muted-foreground">
                Updated 2 hours ago
              </p>
            </div>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Owner</dt>
              <dd className="mt-0.5 font-medium">Maya Chen</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Comments</dt>
              <dd className="mt-0.5 font-medium">8 open</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Status</dt>
              <dd className="mt-0.5 font-medium">In review</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Shared with</dt>
              <dd className="mt-0.5 font-medium">4 people</dd>
            </div>
          </dl>
          <Form
            className="mt-4 gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              const next = note.trim();
              setSaved(next ? `Note saved: ${next}` : "");
            }}
          >
            <TextField
              label="Review note"
              name="note"
              value={note}
              onChange={setNote}
              placeholder="Flag the hero crop"
            />
            <div className="flex flex-wrap items-center gap-2">
              <Button type="submit" size="sm">
                <Message size={16} aria-hidden="true" />
                Save note
              </Button>
              <ButtonLink href="/examples/studio" variant="outline" size="sm">
                Open file
              </ButtonLink>
            </div>
          </Form>
          {saved ? (
            <output className="mt-3 block text-xs leading-5 text-muted-foreground">
              {saved}
            </output>
          ) : null}
        </Popover>
      </PreviewTrigger>
    </div>
  );
}
