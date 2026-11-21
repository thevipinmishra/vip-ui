"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <ButtonGroup size="xs" aria-label="File actions">
        <Button variant="ghost">Copy</Button>
        <Button variant="ghost">Move</Button>
      </ButtonGroup>
      <ButtonGroup aria-label="File actions">
        <Button variant="ghost">Copy</Button>
        <Button variant="ghost">Move</Button>
      </ButtonGroup>
      <ButtonGroup size="xl" aria-label="File actions">
        <Button variant="ghost">Copy</Button>
        <Button variant="ghost">Move</Button>
      </ButtonGroup>
    </div>
  );
}
