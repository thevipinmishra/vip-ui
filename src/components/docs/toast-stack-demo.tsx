"use client";

import { Button } from "@/components/ui/button";
import { showToast } from "@/components/ui/toast";

const invites = ["Ana Ruiz", "Kenji Sato", "Lena Fischer"];

export function ToastStackDemo() {
  return (
    <Button
      variant="outline"
      onPress={() => {
        invites.forEach((name, index) => {
          window.setTimeout(
            () =>
              showToast({
                title: `Invite sent to ${name}`,
                description: "The invite link expires in 7 days.",
                variant: "success",
              }),
            index * 160,
          );
        });
      }}
    >
      Send 3 invites
    </Button>
  );
}
