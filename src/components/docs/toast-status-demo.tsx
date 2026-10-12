"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastStatusDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onPress={() =>
          showToast({
            title: "Update available",
            description: "Version 2.6 is ready to install.",
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast({
            title: "Release published",
            description: "Version 2.6 is live.",
            variant: "success",
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast({
            title: "Billing needs attention",
            description: "Update the card on file before Friday.",
            variant: "warning",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast({
            title: "Upload failed",
            description: "Check the connection and try again.",
            variant: "error",
          })
        }
      >
        Error
      </Button>
    </div>
  );
}
