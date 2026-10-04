import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { MenuDemo } from "@/components/docs/menu-demo";
import { MenuNestedDemo } from "@/components/docs/menu-nested-demo";
import { MenuSelectionDemo } from "@/components/docs/menu-selection-demo";
import { MenuSingleSelectionDemo } from "@/components/docs/menu-single-selection-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Menu | vip/ui",
  description: "A compact list of actions with keyboard navigation.",
};

export default function MenuPage() {
  const page = componentPageData.menu;
  return (
    <ComponentPage
      name="Menu"
      description={page.description}
      preview={<MenuDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <MenuNestedDemo key="example-1" />,
        <MenuSingleSelectionDemo key="example-2" />,
        <MenuSelectionDemo key="example-3" />,
      ])}
      sourcePath="src/components/ui/menu.tsx"
    />
  );
}
