import { Highlighter } from "@/components/ui/highlighter";

export function HighlighterDemo() {
  return (
    <p className="max-w-md text-xl leading-8 tracking-tight">
      Plan the launch, write the copy, and{" "}
      <Highlighter>ship on the same day</Highlighter>.
    </p>
  );
}
