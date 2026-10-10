import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { MenuBasicDemo } from "@/components/docs/menu-basic-demo";
import { MenuDemo } from "@/components/docs/menu-demo";
import { MenuNestedDemo } from "@/components/docs/menu-nested-demo";
import { MenuSelectionDemo } from "@/components/docs/menu-selection-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Menu | vip/ui",
  description: componentPageData.menu.description,
};

export default function MenuPage() {
  const page = componentPageData.menu;
  return (
    <ComponentPage
      name="Menu"
      description={page.description}
      preview={<MenuBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <MenuDemo key="example-1" />,
        <MenuNestedDemo key="example-2" />,
        <MenuSelectionDemo key="example-3" />,
      ])}
      sourcePath="src/components/ui/menu.tsx"
    />
  );
}
