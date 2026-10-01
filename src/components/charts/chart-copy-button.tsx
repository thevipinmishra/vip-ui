"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ChartCopyButton({
  code,
  label,
}: {
  code: string;
  label: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timeout = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timeout);
  }, [status]);

  const message =
    status === "copied"
      ? "Code copied"
      : status === "failed"
        ? "Copy failed. Try again"
        : label;

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        aria-label={message}
        onPress={async () => {
          try {
            await navigator.clipboard.writeText(code.trim());
            setStatus("copied");
          } catch {
            setStatus("failed");
          }
        }}
      >
        {status === "idle"
          ? "Copy code"
          : status === "copied"
            ? "Copied"
            : "Copy failed"}
      </Button>
      <output className="sr-only">{status === "idle" ? "" : message}</output>
    </>
  );
}
