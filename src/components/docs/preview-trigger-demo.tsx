"use client";

import { FileText } from "reicon-react";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PreviewTrigger } from "@/components/ui/preview-trigger";

export function PreviewTriggerDemo() {
  return (
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
      </Popover>
    </PreviewTrigger>
  );
}
