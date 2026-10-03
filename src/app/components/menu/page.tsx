import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { MenuDemo } from "@/components/docs/menu-demo";
import { MenuNestedDemo } from "@/components/docs/menu-nested-demo";
import { MenuSelectionDemo } from "@/components/docs/menu-selection-demo";
import { MenuSingleSelectionDemo } from "@/components/docs/menu-single-selection-demo";

export const metadata: Metadata = {
  title: "Menu | vip/ui",
  description: "A compact list of actions with keyboard navigation.",
};

export default function MenuPage() {
  return (
    <ComponentPage
      name="Menu"
      reactAriaDocsHref="https://react-aria.adobe.com/Menu"
      description="Displays a list of actions or choices from a trigger."
      preview={<MenuDemo />}
      previewHint="Open the menu, move with the arrow keys, and choose an action."
      previewSourcePath="src/components/docs/menu-demo.tsx"
      examples={[
        {
          title: "Nested menu",
          description:
            "Group related actions under a submenu. Open Share with using the pointer or Right Arrow; Left Arrow returns to the parent.",
          preview: <MenuNestedDemo />,
          sourcePath: "src/components/docs/menu-nested-demo.tsx",
        },
        {
          title: "Single selection",
          description:
            'Use selectionMode="single" to keep one view selected when the menu closes. Reopen the menu to change it.',
          preview: <MenuSingleSelectionDemo />,
          sourcePath: "src/components/docs/menu-single-selection-demo.tsx",
        },
        {
          title: "Multiple selection",
          description:
            "Keep view options selected across openings. Disabled items remain visible but cannot be chosen.",
          preview: <MenuSelectionDemo />,
          sourcePath: "src/components/docs/menu-selection-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/menu.tsx"
      previous={{ name: "Search field", href: "/components/search-field" }}
      next={{ name: "Combo box", href: "/components/combo-box" }}
    />
  );
}
