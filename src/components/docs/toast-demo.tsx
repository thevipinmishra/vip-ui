"use client";

import { Save } from "reicon-react";
import { Button } from "@/components/ui/button";
import { showToast, ToastViewport } from "@/components/ui/toast";

export function ToastDemo() {
  return (
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
      <Save size={16} aria-hidden="true" /> Save draft
    </Button>
  );
}

// Put the viewport once near the app root. The docs page mounts it outside the previews.
export function ToastExample() {
  return (
    <>
      <ToastDemo />
      <ToastViewport />
    </>
  );
}
