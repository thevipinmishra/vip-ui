"use client";

import {
  OtpInput,
  OtpInputDescription,
  OtpInputGroup,
  OtpInputLabel,
  OtpInputSeparator,
  OtpInputSlot,
  OtpInputSlots,
} from "@/components/ui/otp-input";

export function OtpInputAlphanumericDemo() {
  return (
    <OtpInput
      pattern="alphanumeric"
      length={8}
      defaultValue="4F7A2C9D"
      className="max-w-md"
    >
      <OtpInputLabel>Recovery code</OtpInputLabel>
      <OtpInputSlots>
        <OtpInputGroup>
          <OtpInputSlot index={0} />
          <OtpInputSlot index={1} />
          <OtpInputSlot index={2} />
          <OtpInputSlot index={3} />
        </OtpInputGroup>
        <OtpInputSeparator />
        <OtpInputGroup>
          <OtpInputSlot index={4} />
          <OtpInputSlot index={5} />
          <OtpInputSlot index={6} />
          <OtpInputSlot index={7} />
        </OtpInputGroup>
      </OtpInputSlots>
      <OtpInputDescription>Letters and numbers only.</OtpInputDescription>
    </OtpInput>
  );
}
