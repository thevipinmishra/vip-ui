import { TextArea } from "@/components/ui/text-area";

export function TextAreaDescriptionDemo() {
  return (
    <TextArea
      label="Feedback"
      description="Tell us what to change. We read every message."
      placeholder="What can we do better?"
      className="w-full max-w-md"
    />
  );
}
