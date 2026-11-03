import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { TooltipActionsDemo } from "@/components/docs/tooltip-actions-demo";
import { TooltipDemo } from "@/components/docs/tooltip-demo";
import { TooltipPlacementDemo } from "@/components/docs/tooltip-placement-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Tooltip",
  description: `${componentPageData.tooltip.description} Examples cover placement, arrows, and tooltips on icon buttons.`,
  path: "/components/tooltip",
});

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
