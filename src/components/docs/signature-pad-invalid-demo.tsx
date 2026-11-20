import { SignaturePad } from "@/components/ui/signature-pad";

export function SignaturePadInvalidDemo() {
  return (
    <SignaturePad
      label="Signature"
      description="Draw your signature above the line."
      error="Add your signature before you continue."
      required
      invalid
      className="w-full max-w-md"
    />
  );
}
