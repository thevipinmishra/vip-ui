import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { MenuBasicDemo } from "@/components/docs/menu-basic-demo";
import { MenuDemo } from "@/components/docs/menu-demo";
import { MenuNestedDemo } from "@/components/docs/menu-nested-demo";
import { MenuPlacementDemo } from "@/components/docs/menu-placement-demo";
import { MenuSectionsDemo } from "@/components/docs/menu-sections-demo";
import { MenuSelectionDemo } from "@/components/docs/menu-selection-demo";
import { componentPageData, getComponentUsage } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menu",
  description:
    "Opens a list of actions from a trigger. Examples cover icons, selection, sections, nested menus, and placement.",
  path: "/components/menu",
});

export default function MenuPage() {
  const page = componentPageData.menu;
  return (
    <ComponentPage
      name="Menu"
      description={page.description}
      preview={<MenuBasicDemo />}
      previewSourcePath={page.usage}
      usage={getComponentUsage("menu")}
      examples={withExamplePreviews(page.examples, [
        <MenuDemo key="example-1" />,
        <MenuSelectionDemo key="example-2" />,
        <MenuSectionsDemo key="example-3" />,
        <MenuNestedDemo key="example-4" />,
        <MenuPlacementDemo key="example-5" />,
      ])}
      sourcePath="src/components/ui/menu.tsx"
    />
  );
}
