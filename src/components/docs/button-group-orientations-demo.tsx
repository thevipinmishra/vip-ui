"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupOrientationsDemo() {
  return (
    <ButtonGroup orientation="vertical" aria-label="Review actions">
      <Button variant="ghost">Approve</Button>
      <Button variant="ghost">Request changes</Button>
    </ButtonGroup>
  );
}
