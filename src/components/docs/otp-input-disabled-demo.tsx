"use client";

import {
  OtpInput,
  OtpInputDescription,
  OtpInputLabel,
  OtpInputSlots,
} from "@/components/ui/otp-input";

export function OtpInputDisabledDemo() {
  return (
    <OtpInput isDisabled defaultValue="482913" className="max-w-sm">
      <OtpInputLabel>Verification code</OtpInputLabel>
      <OtpInputSlots />
      <OtpInputDescription>
        This phone number is managed by your organization.
      </OtpInputDescription>
    </OtpInput>
  );
}
