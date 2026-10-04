import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { DrawerBasicDemo } from "@/components/docs/drawer-basic-demo";
import { DrawerDemo } from "@/components/docs/drawer-demo";
import { DrawerLeftDemo } from "@/components/docs/drawer-left-demo";
import { DrawerSideDemo } from "@/components/docs/drawer-side-demo";
import { DrawerTopDemo } from "@/components/docs/drawer-top-demo";
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
        <DrawerSideDemo key="example-2" />,
        <DrawerLeftDemo key="example-3" />,
        <DrawerTopDemo key="example-4" />,
      ])}
      sourcePath="src/components/ui/drawer.tsx"
    />
  );
}
