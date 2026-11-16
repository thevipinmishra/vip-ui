"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  OtpInput,
  OtpInputContext,
  OtpInputDescription,
  OtpInputGroup,
  OtpInputLabel,
  OtpInputSeparator,
  OtpInputSlot,
  OtpInputSlots,
} from "@/components/ui/otp-input";

export function OtpInputContextDemo() {
  const [status, setStatus] = useState("Enter the six digits.");

  return (
    <OtpInput
      className="max-w-sm"
      onChange={(value) =>
        setStatus(
          value
            ? `${value.length} of 6 digits entered.`
            : "Enter the six digits.",
        )
      }
      onComplete={(value) => setStatus(`Code ${value} is ready to submit.`)}
    >
      <OtpInputLabel>Verification code</OtpInputLabel>
      <OtpInputSlots>
        <OtpInputGroup>
          <OtpInputSlot index={0} />
          <OtpInputSlot index={1} />
          <OtpInputSlot index={2} />
        </OtpInputGroup>
        <OtpInputSeparator />
        <OtpInputGroup>
          <OtpInputSlot index={3} />
          <OtpInputSlot index={4} />
          <OtpInputSlot index={5} />
        </OtpInputGroup>
      </OtpInputSlots>
      <OtpInputDescription>Sent to ••• 0134.</OtpInputDescription>
      <OtpInputContext>
        {(api) => (
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs leading-5 text-muted-foreground">{status}</p>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              isDisabled={!api.valueAsString}
              onPress={api.clearValue}
            >
              Clear
            </Button>
          </div>
        )}
      </OtpInputContext>
    </OtpInput>
  );
}
