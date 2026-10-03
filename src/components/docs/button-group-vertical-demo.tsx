"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";

export function ButtonGroupVerticalDemo() {
  const [status, setStatus] = useState("Draft");

  return (
    <div className="grid justify-items-center gap-3">
      <ButtonGroup orientation="vertical" aria-label="Draft actions">
        <Button
          variant="ghost"
          isDisabled={status === "Ready for review"}
          onPress={() => setStatus("Ready for review")}
        >
          Mark for review
        </Button>
        <Button
          variant="ghost"
          isDisabled={status === "Archived"}
          onPress={() => setStatus("Archived")}
        >
          Archive draft
        </Button>
      </ButtonGroup>
      <output className="text-sm text-muted-foreground">
        Status: {status}
      </output>
    </div>
  );
}
