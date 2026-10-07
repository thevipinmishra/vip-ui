import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { DrawerBasicDemo } from "@/components/docs/drawer-basic-demo";
import { DrawerDemo } from "@/components/docs/drawer-demo";
import { DrawerPlacementDemo } from "@/components/docs/drawer-placement-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Drawer | vip/ui",
  description:
    "An accessible draggable drawer with snap points and a blurred backdrop.",
};

export default function DrawerPage() {
  const page = componentPageData.drawer;
  return (
    <ComponentPage
      name="Drawer"
      description={page.description}
      preview={<DrawerBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <DrawerDemo key="example-1" />,
        <DrawerPlacementDemo key="example-2" />,
      ])}
      sourcePath="src/components/ui/drawer.tsx"
    />
  );
}
