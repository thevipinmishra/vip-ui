"use client";

import { FloppyDiskIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function SpinnerUsageDemo() {
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex flex-col items-center gap-3">
      <Button
        isPending={isSaving}
        onPress={() => {
          setIsSaving(true);
          setSaved(false);
          setTimeout(() => {
            setIsSaving(false);
            setSaved(true);
          }, 1600);
        }}
      >
        {isSaving ? (
          <Spinner size="sm" decorative />
        ) : (
          <FloppyDiskIcon aria-hidden="true" />
        )}
        {isSaving ? "Saving" : "Save changes"}
      </Button>
      <output aria-live="polite" className="h-5 text-sm text-muted-foreground">
        {saved ? "Changes saved." : ""}
      </output>
    </div>
  );
}
