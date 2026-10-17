"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupSizesDemo() {
  return (
    <div className="flex flex-col items-start gap-3">
      <ButtonGroup size="xs" aria-label="Publish">
        <Button variant="ghost">Publish</Button>
        <Button variant="ghost" iconOnly aria-label="More publish options">
          <CaretDownIcon aria-hidden="true" />
        </Button>
      </ButtonGroup>
      <ButtonGroup size="sm" aria-label="Publish">
        <Button variant="ghost">Publish</Button>
        <Button variant="ghost" iconOnly aria-label="More publish options">
          <CaretDownIcon aria-hidden="true" />
        </Button>
      </ButtonGroup>
      <ButtonGroup aria-label="Publish">
        <Button variant="ghost">Publish</Button>
        <Button variant="ghost" iconOnly aria-label="More publish options">
          <CaretDownIcon aria-hidden="true" />
        </Button>
      </ButtonGroup>
    </div>
  );
}
