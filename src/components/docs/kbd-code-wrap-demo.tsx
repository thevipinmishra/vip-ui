import { InlineCode } from "@/components/ui/kbd-code";

export function KbdCodeWrapDemo() {
  return (
    <p className="max-w-64 text-sm leading-7">
      Copy the file to{" "}
      <InlineCode>src/components/vip-ui/description-list.tsx</InlineCode> and
      update the imports.
    </p>
  );
}
