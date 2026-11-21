"use client";

import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import {
  SignaturePadClearTrigger,
  SignaturePadContext,
  SignaturePadControl,
  SignaturePadDescription,
  SignaturePadGuide,
  SignaturePadHiddenInput,
  SignaturePadLabel,
  SignaturePadRoot,
  SignaturePadSegment,
} from "@/components/ui/signature-pad";

export function SignaturePadCompositionDemo() {
  const [dataUrl, setDataUrl] = useState("");

  return (
    <SignaturePadRoot
      name="signature"
      onValueChange={setDataUrl}
      className="w-full max-w-md"
    >
      <div className="flex min-w-0 items-center justify-between gap-3">
        <SignaturePadLabel>Signature</SignaturePadLabel>
        <SignaturePadContext>
          {(api) => (
            <span className="text-xs tabular-nums text-muted-foreground">
              {api.empty
                ? "No strokes"
                : `${api.paths.length} ${api.paths.length === 1 ? "stroke" : "strokes"}`}
            </span>
          )}
        </SignaturePadContext>
      </div>
      <SignaturePadControl>
        <SignaturePadContext>
          {(api) =>
            api.empty && !api.drawing ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center text-sm text-muted-foreground/80"
              >
                Sign above the line
              </span>
            ) : null
          }
        </SignaturePadContext>
        <SignaturePadGuide />
        <SignaturePadSegment />
        <SignaturePadClearTrigger className="absolute end-2 top-2" />
      </SignaturePadControl>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SignaturePadDescription>
          Draw with a mouse, finger, or pen.
        </SignaturePadDescription>
        <ButtonLink
          href={dataUrl || "#"}
          download="signature.png"
          variant="outline"
          size="sm"
          aria-disabled={!dataUrl || undefined}
          tabIndex={dataUrl ? undefined : -1}
          onClick={(event) => {
            if (!dataUrl) event.preventDefault();
          }}
          className={dataUrl ? undefined : "pointer-events-none opacity-50"}
        >
          <DownloadSimpleIcon data-icon="inline-start" aria-hidden="true" />
          Download PNG
        </ButtonLink>
      </div>
      <SignaturePadHiddenInput />
    </SignaturePadRoot>
  );
}
