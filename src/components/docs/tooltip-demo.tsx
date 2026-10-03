"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function TooltipDemo() {
  const [saved, setSaved] = useState(false);

  return (
    <TooltipTrigger>
      <Button
        variant="outline"
        isDisabled={saved}
        onPress={() => setSaved(true)}
      >
        {saved ? "Draft saved" : "Save draft"}
      </Button>
      <TooltipContent>Keep changes private until you publish.</TooltipContent>
    </TooltipTrigger>
  );
}
