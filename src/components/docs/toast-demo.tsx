"use client";

import { Button } from "@/components/ui/button";
import { showToast, ToastViewport } from "@/components/ui/toast";

export function ToastDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        onPress={() =>
          showToast(
            {
              title: "Draft saved",
              description: "Studio North is ready for your next edit.",
              variant: "success",
            },
            { timeout: 5000 },
          )
        }
      >
        Save draft
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast({
            title: "Upload paused",
            description: "Check your connection, then try again.",
            variant: "warning",
          })
        }
      >
        Show upload warning
      </Button>
      <ToastViewport />
    </div>
  );
}
