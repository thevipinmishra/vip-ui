"use client";

import { Trash } from "reicon-react";
import { Button } from "@/components/ui/button";

export function ButtonVariantsDemo() {
  return (
    <div className="flex w-full max-w-xl flex-wrap items-center gap-3">
      <Button>Publish</Button>
      <Button variant="secondary">Save draft</Button>
      <Button variant="outline">Preview</Button>
      <Button variant="ghost">Cancel</Button>
      <Button variant="destructive">
        <Trash size={16} aria-hidden="true" /> Delete
      </Button>
    </div>
  );
}
