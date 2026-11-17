"use client";

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
  return (
    <OtpInput className="max-w-sm">
      <OtpInputLabel>Verification code</OtpInputLabel>
      <div className="flex items-center gap-3">
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
        <OtpInputContext>
          {(api) => (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              isDisabled={!api.valueAsString}
              onPress={api.clearValue}
            >
              Clear
            </Button>
          )}
        </OtpInputContext>
      </div>
      <OtpInputDescription>Sent to ••• 0134.</OtpInputDescription>
    </OtpInput>
  );
}
