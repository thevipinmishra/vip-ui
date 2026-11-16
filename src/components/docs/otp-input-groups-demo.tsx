"use client";

import {
  OtpInput,
  OtpInputGroup,
  OtpInputLabel,
  OtpInputSeparator,
  OtpInputSlot,
  OtpInputSlots,
} from "@/components/ui/otp-input";

export function OtpInputGroupsDemo() {
  return (
    <OtpInput className="max-w-sm">
      <OtpInputLabel>Sign-in code</OtpInputLabel>
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
    </OtpInput>
  );
}
