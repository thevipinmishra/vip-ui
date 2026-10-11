import { TextField } from "@/components/ui/text-field";

export function TextFieldDisabledDemo() {
  return (
    <TextField
      label="Workspace URL"
      defaultValue="vip-ui.app/studio"
      isDisabled
      className="w-full max-w-sm"
    />
  );
}
