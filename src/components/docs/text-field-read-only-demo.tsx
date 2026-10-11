import { TextField } from "@/components/ui/text-field";

export function TextFieldReadOnlyDemo() {
  return (
    <TextField
      label="Reference ID"
      defaultValue="VIP-204"
      isReadOnly
      className="w-full max-w-sm"
    />
  );
}
