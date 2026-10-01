import { InlineCode, Kbd } from "@/components/ui/kbd-code";

export function KbdCodeDemo() {
  return (
    <div className="max-w-md space-y-4 text-sm leading-7">
      <p>
        Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open search.
      </p>
      <p>
        Set <InlineCode>aria-label</InlineCode> on icon-only controls.
      </p>
    </div>
  );
}
