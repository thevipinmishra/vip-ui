import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { TabsBasicDemo } from "@/components/docs/tabs-basic-demo";
import { TabsDemo } from "@/components/docs/tabs-demo";
import { TabsDisabledDemo } from "@/components/docs/tabs-disabled-demo";

export const metadata: Metadata = {
  title: "Tabs | vip/ui",
  description: "Switch between related panels.",
};

export default function TabsPage() {
  return (
    <ComponentPage
      name="Tabs"
      reactAriaDocsHref="https://react-aria.adobe.com/Tabs"
      description="Displays related content in switchable panels."
      preview={<TabsBasicDemo />}
      previewHint="Switch between Details and Activity with a pointer or the arrow keys."
      previewSourcePath="src/components/docs/tabs-basic-demo.tsx"
      examples={[
        {
          title: "Project workspace",
          description:
            "Use separate panels for a summary, activity, and team when each section has more content.",
          preview: <TabsDemo />,
          sourcePath: "src/components/docs/tabs-demo.tsx",
        },
        {
          title: "Unavailable tab",
          description:
            "Keep a destination visible without allowing selection until it becomes available.",
          preview: <TabsDisabledDemo />,
          sourcePath: "src/components/docs/tabs-disabled-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/tabs.tsx"
      previous={{ name: "Slider", href: "/components/slider" }}
      next={{ name: "Accordion", href: "/components/accordion" }}
    />
  );
}
