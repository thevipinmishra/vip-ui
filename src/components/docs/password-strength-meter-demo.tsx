import { PasswordStrengthMeter } from "@/components/ui/password-strength-meter";

export function PasswordStrengthMeterDemo() {
  return (
    <PasswordStrengthMeter
      password="longer-demo-passphrase"
      className="max-w-sm"
    />
  );
}
