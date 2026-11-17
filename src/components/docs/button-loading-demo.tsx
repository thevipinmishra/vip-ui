"use client";

import { FloppyDiskIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export function ButtonLoadingDemo() {
  const [isSaving, setSaving] = useState(false);

  return (
    <Button
      isPending={isSaving}
      onPress={() => {
        setSaving(true);
        window.setTimeout(() => setSaving(false), 2000);
      }}
    >
      {isSaving ? (
        <Spinner data-icon="inline-start" size="sm" decorative />
      ) : (
        <FloppyDiskIcon data-icon="inline-start" aria-hidden="true" />
      )}
      Save changes
    </Button>
  );
}
