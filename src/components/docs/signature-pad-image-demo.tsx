"use client";

import { useState } from "react";
import { SignaturePad } from "@/components/ui/signature-pad";

export function SignaturePadImageDemo() {
  const [signature, setSignature] = useState("");

  return (
    <div className="grid w-full max-w-md gap-4">
      <SignaturePad
        label="Signature"
        description="Draw your signature above the line."
        onValueChange={setSignature}
      />
      <div className="grid gap-2 rounded-xl bg-white p-3 ring-1 ring-border/70">
        <span className="text-xs font-medium text-neutral-500">
          Captured image
        </span>
        {signature ? (
          // biome-ignore lint/performance/noImgElement: The capture is a data URL.
          <img
            src={signature}
            alt="Captured signature"
            className="h-20 w-full object-contain"
          />
        ) : (
          <span className="grid h-20 place-items-center text-sm text-neutral-500">
            No signature yet
          </span>
        )}
      </div>
    </div>
  );
}
