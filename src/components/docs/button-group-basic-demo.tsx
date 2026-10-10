"use client";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupBasicDemo() {
  return (
    <ButtonGroup aria-label="Message actions">
      <Button variant="ghost">Archive</Button>
      <Button variant="ghost">Report</Button>
      <Button variant="ghost">Snooze</Button>
    </ButtonGroup>
  );
}
