import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TooltipActionsDemo } from "@/components/docs/tooltip-actions-demo";
import { TooltipDemo } from "@/components/docs/tooltip-demo";
import { TooltipPlacementDemo } from "@/components/docs/tooltip-placement-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Tooltip | vip/ui",
  description: componentPageData.tooltip.description,
};

export default function TooltipPage() {
  const page = componentPageData.tooltip;
  return (
    <ComponentPage
      name="Tooltip"
      description={page.description}
      preview={<TooltipDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <TooltipPlacementDemo key="example-1" />,
        <TooltipActionsDemo key="example-2" />,
      ])}
      sourcePath="src/components/ui/tooltip.tsx"
    />
  );
}
