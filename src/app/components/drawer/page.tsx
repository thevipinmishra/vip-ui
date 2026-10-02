import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { DrawerDemo } from "@/components/docs/drawer-demo";
import {
  DrawerLeftDemo,
  DrawerSideDemo,
  DrawerTopDemo,
} from "@/components/docs/drawer-side-demo";

export const metadata: Metadata = {
  title: "Drawer | vip/ui",
  description:
    "An accessible draggable drawer with snap points and optional page scaling.",
};

export default function DrawerPage() {
  return (
    <ComponentPage
      name="Drawer"
      description="A modal sheet for details or a longer task. Open from any edge, drag the handle to dismiss, or use bottom snap points. Focus returns to the trigger on close."
      preview={<DrawerDemo />}
      previewHint="Watch the page shrink as the drawer opens. Drag the handle to resize it, or focus the handle and press Up, Down, Home, or End. Escape, the backdrop, and Close dismiss it."
      previewSourcePath="src/components/docs/drawer-demo.tsx"
      examples={[
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
          sourcePath: "src/components/docs/drawer-side-demo.tsx",
        },
        {
          title: "Top: quick announcement",
          description:
            "Write a note, then pull the bottom handle up to dismiss.",
          preview: <DrawerTopDemo />,
          sourcePath: "src/components/docs/drawer-side-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/drawer.tsx"
      previous={{ name: "Dialog", href: "/components/dialog" }}
      next={{ name: "Popover", href: "/components/popover" }}
    />
  );
}
