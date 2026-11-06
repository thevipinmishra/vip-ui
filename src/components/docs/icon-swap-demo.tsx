"use client";

import { CheckIcon, LinkIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { IconSwap } from "@/components/ui/icon-swap";

export function IconSwapDemo() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timer);
  }, [copied]);

  return (
    <Button
      variant="outline"
      iconOnly
      aria-label={copied ? "Link copied" : "Copy link"}
      onPress={() => setCopied(true)}
    >
      <IconSwap contentKey={copied ? "copied" : "copy"}>
        {copied ? <CheckIcon /> : <LinkIcon />}
      </IconSwap>
    </Button>
  );
}
