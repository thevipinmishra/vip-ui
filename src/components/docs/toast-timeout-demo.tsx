"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastTimeoutDemo() {
  return (
    <Button
      variant="outline"
      onPress={() =>
        showToast(
          {
            title: "Link copied",
            description: "The share link is on your clipboard.",
            variant: "success",
          },
          { timeout: 5000 },
        )
      }
    >
      Copy share link
    </Button>
  );
}
