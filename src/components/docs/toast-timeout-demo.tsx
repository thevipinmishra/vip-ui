"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

export function ToastTimeoutDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Button
        variant="outline"
        onPress={() =>
          showToast(
            {
              title: "Link copied",
              description: "The share link is on your clipboard.",
              variant: "success",
            },
            { timeout: 10000 },
          )
        }
      >
        Copy share link
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast(
            {
              title: "Connection lost",
              description: "Changes sync when the connection returns.",
              variant: "warning",
            },
            { timeout: 0 },
          )
        }
      >
        Disconnect
      </Button>
    </div>
  );
}
