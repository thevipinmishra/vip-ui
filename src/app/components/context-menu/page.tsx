import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { ContextMenuDemo } from "@/components/docs/context-menu-demo";
import { ContextMenuGroupedDemo } from "@/components/docs/context-menu-grouped-demo";

export const metadata: Metadata = {
  title: "Context menu | vip/ui",
  description: "Open actions beside a file with pointer, touch, or keyboard.",
};

export default function ContextMenuPage() {
  return (
    <ComponentPage
      name="Context menu"
      reactAriaDocsHref="https://react-aria.adobe.com/Menu"
      description="Actions available beside the item you are working with."
      preview={<ContextMenuDemo />}
      previewHint="Right-click or long-press the file. For the keyboard, use Shift+F10 on Windows/Linux or Control+Enter on macOS. A regular press opens the file."
      previewSourcePath="src/components/docs/context-menu-demo.tsx"
      examples={[
        {
          title: "Grouped actions",
          description:
            "Compose the popover and menu when you need separators or disabled actions. The trigger keeps the same keyboard and touch behavior.",
          preview: <ContextMenuGroupedDemo />,
          sourcePath: "src/components/docs/context-menu-grouped-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/context-menu.tsx"
      previous={{ name: "Menu", href: "/components/menu" }}
      next={{ name: "Combo box", href: "/components/combo-box" }}
    />
  );
}
