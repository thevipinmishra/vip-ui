"use client";

import { WarningIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastDemo() {
  return (
    <Button
      onPress={() =>
        showToast({
          title: "Upload paused",
          description:
            "The connection dropped. Retry when you are back online.",
          variant: "warning",
        })
      }
    >
      <WarningIcon size={16} aria-hidden="true" /> Show upload warning
    </Button>
  );
}
