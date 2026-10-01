"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { Check, Copy } from "reicon-react";

export function CopyButton({
  code,
  label = "Copy code",
}: {
  code: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setFailed(false);
    } catch {
      setCopied(false);
      setFailed(true);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={copy}
        aria-label={
          copied ? "Code copied" : failed ? "Copy failed. Try again" : label
        }
        whileTap={reduceMotion ? undefined : { scale: 0.96 }}
        className="inline-flex min-h-9 items-center gap-1.5 rounded-md bg-card px-2.5 text-[11px] font-medium text-foreground shadow-[var(--shadow-card)] ring-1 ring-border/70 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        {copied ? (
          <Check size={13} aria-hidden="true" />
        ) : (
          <Copy size={13} aria-hidden="true" />
        )}
        {copied ? "Copied" : failed ? "Retry copy" : "Copy"}
      </motion.button>
      <output className="sr-only">
        {copied ? "Code copied" : failed ? "Copy failed. Try again." : ""}
      </output>
    </>
  );
}
