import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TooltipActionsDemo } from "@/components/docs/tooltip-actions-demo";
import { TooltipDemo } from "@/components/docs/tooltip-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Tooltip | vip/ui",
  description: "Short supplementary help on hover or focus.",
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
        <TooltipActionsDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/tooltip.tsx"
    />
  );
}
