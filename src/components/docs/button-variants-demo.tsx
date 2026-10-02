"use client";

import { Plus, Trash } from "reicon-react";
import { Button } from "@/components/ui/button";

export function ButtonVariantsDemo() {
  return (
    <div className="grid w-full max-w-xl gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Publish</Button>
        <Button variant="secondary">Save draft</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="ghost">Cancel</Button>
        <Button variant="destructive">
          <Trash size={16} aria-hidden="true" /> Delete
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <Button size="sm">Invite member</Button>
        <Button size="lg" variant="outline">
          Start review
        </Button>
        <Button size="icon" variant="outline" aria-label="Add member">
          <Plus size={17} aria-hidden="true" />
        </Button>
        <Button isDisabled>Publishing</Button>
      </div>
    </div>
  );
}
