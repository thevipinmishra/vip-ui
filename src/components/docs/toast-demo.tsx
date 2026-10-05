"use client";

import { InfoCircle } from "reicon-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastDemo() {
  return (
    <Button
      onPress={() =>
        showToast(
          {
            title: "Update available",
            description: "A new version is ready to install.",
          },
          { timeout: 5000 },
        )
      }
    >
      <InfoCircle size={16} aria-hidden="true" /> Show notification
    </Button>
  );
}

// Mount <ToastViewport /> once in your app layout, outside the demos.
