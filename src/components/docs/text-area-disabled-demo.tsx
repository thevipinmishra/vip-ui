import { TextArea } from "@/components/ui/text-area";

export function TextAreaDisabledDemo() {
  return (
    <TextArea
      label="Comments"
      defaultValue="Comments are closed for this project."
      isDisabled
      rows={3}
      className="w-full max-w-md"
    />
  );
}
