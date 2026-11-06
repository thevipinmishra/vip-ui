"use client";

import { CheckIcon, CloudArrowUpIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconSwap } from "@/components/ui/icon-swap";
import { Spinner } from "@/components/ui/spinner";

type Status = "idle" | "saving" | "saved";

export function IconSwapLoadingDemo() {
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(
      () => setStatus(status === "saving" ? "saved" : "idle"),
      status === "saving" ? 1400 : 1800,
    );
    return () => window.clearTimeout(timer);
  }, [status]);

  return (
    <Button
      variant="secondary"
      isDisabled={status !== "idle"}
      onPress={() => setStatus("saving")}
    >
      <IconSwap contentKey={status}>
        {status === "saving" ? (
          <Spinner size="sm" decorative />
        ) : status === "saved" ? (
          <CheckIcon />
        ) : (
          <CloudArrowUpIcon />
        )}
      </IconSwap>
      {status === "saving" ? "Saving" : status === "saved" ? "Saved" : "Save"}
    </Button>
  );
}
