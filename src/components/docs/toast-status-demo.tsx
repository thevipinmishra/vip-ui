"use client";

import { CheckCircleIcon, InfoIcon, WarningIcon } from "@phosphor-icons/react";
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
              title: "Update available",
              description: "Version 2.6 is ready to install.",
            },
            { timeout: 5000 },
          )
        }
      >
        <InfoIcon size={16} aria-hidden="true" /> Check for updates
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          showToast(
            {
              title: "Release published",
              description: "Version 2.6 is live.",
              variant: "success",
            },
            { timeout: 5000 },
          )
        }
      >
        <CheckCircleIcon size={16} aria-hidden="true" /> Publish release
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
        <WarningIcon size={16} aria-hidden="true" /> Review billing
      </Button>
    </div>
  );
}
