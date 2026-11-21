import { SignaturePad } from "@/components/ui/signature-pad";

const signedPaths = [
  "M38 135C52 109 61 87 72 87C83 87 75 106 71 120C82 104 93 94 101 96C110 98 103 112 108 115C115 119 125 102 134 101C143 100 136 114 145 115C158 117 179 98 205 101L204 104C179 101 159 121 144 119C133 117 139 105 134 105C126 106 117 124 107 119C99 115 106 102 100 100C94 98 82 110 71 126C69 130 65 128 66 124C70 107 80 91 72 91C64 91 54 113 41 137Z",
];

export function SignaturePadReadOnlyDemo() {
  return (
    <SignaturePad
      label="Signed by Maya Chen"
      description="Signed on October 18, 2026."
      defaultPaths={signedPaths}
      readOnly
      className="w-full max-w-sm"
    />
  );
}
