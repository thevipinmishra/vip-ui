import { SignaturePad } from "@/components/ui/signature-pad";

export function SignaturePadDemo() {
  return (
    <SignaturePad
      label="Signature"
      description="Draw your signature above the line."
      name="signature"
      className="w-full max-w-md"
    />
  );
}
