"use client";

import { CheckCircle, InfoCircle, Warning } from "reicon-react";
import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastStatusDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onPress={() =>
          showToast(
            {
              title: "Info notification",
              description: "An update is available.",
            },
            { timeout: 5000 },
          )
        }
      >
        <InfoCircle size={16} aria-hidden="true" /> Info
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast(
            { title: "Success notification", variant: "success" },
            { timeout: 5000 },
          )
        }
      >
        <CheckCircle size={16} aria-hidden="true" /> Success
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast({
            title: "Warning notification",
            description:
              "Dismiss this notification when you're done reading it.",
            variant: "warning",
          })
        }
      >
        <Warning size={16} aria-hidden="true" /> Warning
      </Button>
    </div>
  );
}
