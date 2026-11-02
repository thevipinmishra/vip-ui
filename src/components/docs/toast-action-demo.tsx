"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastActionDemo() {
  return (
    <Button
      variant="outline"
      onPress={() =>
        showToast({
          title: "Conversation archived",
          action: {
            label: "Undo",
            onAction: () =>
              showToast({ title: "Conversation restored", variant: "success" }),
          },
        })
      }
    >
      Archive
    </Button>
  );
}
