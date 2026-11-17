import {
  OtpInput,
  OtpInputDescription,
  OtpInputLabel,
  OtpInputSlots,
} from "@/components/ui/otp-input";

export function OtpInputDemo() {
  return (
    <OtpInput className="max-w-sm">
      <OtpInputLabel>Verification code</OtpInputLabel>
      <OtpInputSlots />
      <OtpInputDescription>
        Enter the code we sent to your phone.
      </OtpInputDescription>
    </OtpInput>
  );
}
