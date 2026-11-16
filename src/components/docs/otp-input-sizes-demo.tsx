"use client";

import { OtpInput, OtpInputSlots } from "@/components/ui/otp-input";

export function OtpInputSizesDemo() {
  return (
    <div className="grid gap-3">
      <OtpInput size="sm" aria-label="Verification code" defaultValue="482913">
        <OtpInputSlots />
      </OtpInput>
      <OtpInput size="md" aria-label="Verification code" defaultValue="482913">
        <OtpInputSlots />
      </OtpInput>
      <OtpInput aria-label="Verification code" defaultValue="482913">
        <OtpInputSlots />
      </OtpInput>
    </div>
  );
}
