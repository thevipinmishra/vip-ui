"use client";

import { Warning } from "reicon-react";
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
      <Warning size={16} aria-hidden="true" /> Show upload warning
    </Button>
  );
}

// Mount <ToastViewport /> once in your app layout, outside the demos.
