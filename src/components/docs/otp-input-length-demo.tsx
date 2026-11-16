"use client";

import {
  OtpInput,
  OtpInputDescription,
  OtpInputLabel,
  OtpInputSlots,
} from "@/components/ui/otp-input";

export function OtpInputLengthDemo() {
  return (
    <OtpInput length={4} className="max-w-sm">
      <OtpInputLabel>Card PIN</OtpInputLabel>
      <OtpInputSlots />
      <OtpInputDescription>
        Enter the 4-digit PIN for your card.
      </OtpInputDescription>
    </OtpInput>
  );
}
