"use client";

import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PreviewTrigger } from "@/components/ui/preview-trigger";

export function PreviewTriggerDemo() {
  return (
    <PreviewTrigger>
      <Button variant="outline">Preview project</Button>
      <Popover className="w-64">
        <p className="text-sm font-semibold">Studio North</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Brand assets and design files for the next release.
        </p>
        <a
          href="/components"
          className="mt-3 inline-block rounded-sm text-sm font-medium text-primary underline underline-offset-4"
        >
          Browse components
        </a>
      </Popover>
    </PreviewTrigger>
  );
}
