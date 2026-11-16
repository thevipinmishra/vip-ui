"use client";

import { useState } from "react";
import {
  OtpInput,
  OtpInputDescription,
  OtpInputLabel,
  OtpInputSlots,
} from "@/components/ui/otp-input";

export function OtpInputDemo() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [completions, setCompletions] = useState(0);

  return (
    <div className="grid w-full max-w-sm gap-3">
      <OtpInput
        value={code}
        onChange={(value) => {
          setCode(value);
          setStatus("");
        }}
        onComplete={(value) => {
          setCompletions((count) => count + 1);
          setStatus(`Code ${value} received. Checking it now.`);
        }}
      >
        <OtpInputLabel>Verification code</OtpInputLabel>
        <OtpInputSlots />
        <OtpInputDescription>
          Enter the code we sent to your phone.
        </OtpInputDescription>
      </OtpInput>
      <p
        className="text-xs leading-5 text-muted-foreground"
        aria-live="polite"
        data-completions={completions}
      >
        {status || "The code expires in 10 minutes."}
      </p>
    </div>
  );
}
