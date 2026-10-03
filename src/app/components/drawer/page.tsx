import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { DrawerBasicDemo } from "@/components/docs/drawer-basic-demo";
import { DrawerDemo } from "@/components/docs/drawer-demo";
import { DrawerLeftDemo } from "@/components/docs/drawer-left-demo";
import { DrawerSideDemo } from "@/components/docs/drawer-side-demo";
import { DrawerTopDemo } from "@/components/docs/drawer-top-demo";

export const metadata: Metadata = {
  title: "Drawer | vip/ui",
  description:
    "An accessible draggable drawer with snap points and a blurred backdrop.",
};

export default function DrawerPage() {
  return (
    <ComponentPage
      name="Drawer"
      description="Displays a panel that slides in from the edge of the screen."
      preview={<DrawerBasicDemo />}
      previewHint="Open the order summary, then close it with Close, Escape, or the backdrop."
      previewSourcePath="src/components/docs/drawer-basic-demo.tsx"
      examples={[
        {
          title: "Snap points",
          description:
            "Drag the handle or use Up, Down, Home, and End to resize the order summary.",
          preview: <DrawerDemo />,
          sourcePath: "src/components/docs/drawer-demo.tsx",
        },
        {
          title: "Right: project filters",
          description:
            "Filter a project list. Swipe the handle right to dismiss without dragging form controls.",
          preview: <DrawerSideDemo />,
          sourcePath: "src/components/docs/drawer-side-demo.tsx",
        },
        {
          title: "Left: workspace navigation",
          description:
            "Browse collections, then select one or swipe left to close.",
          preview: <DrawerLeftDemo />,
          sourcePath: "src/components/docs/drawer-left-demo.tsx",
        },
        {
          title: "Top: quick announcement",
          description:
            "Write a note, then pull the bottom handle up to dismiss.",
          preview: <DrawerTopDemo />,
          sourcePath: "src/components/docs/drawer-top-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/drawer.tsx"
      previous={{ name: "Dialog", href: "/components/dialog" }}
      next={{ name: "Popover", href: "/components/popover" }}
    />
  );
}
