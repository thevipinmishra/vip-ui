"use client";

import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Popover } from "@/components/ui/popover";
import { PreviewTrigger } from "@/components/ui/preview-trigger";

export function PreviewTriggerDemo() {
  return (
    <PreviewTrigger>
      <Button variant="outline">Preview workspace</Button>
      <Popover className="w-64">
        <p className="text-sm font-semibold">Studio workspace</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Browse campaign files, add local assets, and edit tags.
        </p>
        <div className="mt-3">
          <ButtonLink href="/examples/studio" variant="secondary" size="sm">
            Open workspace
          </ButtonLink>
        </div>
      </Popover>
    </PreviewTrigger>
  );
}
