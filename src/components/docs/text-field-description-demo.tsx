import { TextField } from "@/components/ui/text-field";

export function TextFieldDescriptionDemo() {
  return (
    <TextField
      label="Username"
      description="Use 3 to 20 letters or numbers."
      placeholder="maya"
      className="w-full max-w-sm"
    />
  );
}
