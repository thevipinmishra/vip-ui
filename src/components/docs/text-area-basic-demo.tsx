import { TextArea } from "@/components/ui/text-area";

export function TextAreaBasicDemo() {
  return (
    <TextArea
      label="Project description"
      placeholder="What is this project for?"
      className="w-full max-w-md"
    />
  );
}
