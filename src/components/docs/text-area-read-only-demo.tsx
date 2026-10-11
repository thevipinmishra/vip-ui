import { TextArea } from "@/components/ui/text-area";

export function TextAreaReadOnlyDemo() {
  return (
    <TextArea
      label="Release note"
      defaultValue="Version 2.4 adds keyboard shortcuts to the editor."
      isReadOnly
      rows={3}
      className="w-full max-w-md"
    />
  );
}
