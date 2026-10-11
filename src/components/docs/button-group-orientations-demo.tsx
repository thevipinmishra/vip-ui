"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupOrientationsDemo() {
  return (
    <div className="grid justify-items-center gap-4">
      <ButtonGroup aria-label="Save actions">
        <Button variant="ghost">Save</Button>
        <Button variant="ghost">Discard</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" aria-label="Review actions">
        <Button variant="ghost">Approve</Button>
        <Button variant="ghost">Request changes</Button>
      </ButtonGroup>
    </div>
  );
}
