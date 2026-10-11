import { InlineCode, Kbd } from "@/components/ui/kbd-code";

export function KbdCodeDemo() {
  return (
    <div className="max-w-md space-y-4 text-sm leading-7">
      <p>
        Press <Kbd>Esc</Kbd> to close the dialog.
      </p>
      <p>
        Set <InlineCode>aria-label</InlineCode> on icon-only controls.
      </p>
    </div>
  );
}
