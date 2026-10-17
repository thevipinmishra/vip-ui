import { TextArea } from "@/components/ui/text-area";

export function TextAreaSizesDemo() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <TextArea size="sm" aria-label="Comment" placeholder="Add a comment" />
      <TextArea aria-label="Comment" placeholder="Add a comment" />
      <TextArea size="xl" aria-label="Comment" placeholder="Add a comment" />
    </div>
  );
}
