"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastDemo() {
  return (
    <Button
      variant="outline"
      onPress={() =>
        showToast({
          title: "Draft saved",
          description: "Your changes are saved in this workspace.",
        })
      }
    >
      Save draft
    </Button>
  );
}
