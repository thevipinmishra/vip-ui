import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { TooltipActionsDemo } from "@/components/docs/tooltip-actions-demo";
import { TooltipDemo } from "@/components/docs/tooltip-demo";

export const metadata: Metadata = {
  title: "Tooltip | vip/ui",
  description: "Short supplementary help on hover or focus.",
};

export default function TooltipPage() {
  return (
    <ComponentPage
      name="Tooltip"
      reactAriaDocsHref="https://react-aria.adobe.com/Tooltip"
      description="Add a brief hint to a control. It appears on hover or keyboard focus, so the hint can be found without a mouse."
      preview={<TooltipDemo />}
      previewHint="Hover over a control or focus it with Tab to read its hint."
      previewSourcePath="src/components/docs/tooltip-demo.tsx"
      examples={[
        {
          title: "Review actions",
          description:
            "Keep icon-only buttons named without the tooltip. Hover or focus for extra context, then try the actions.",
          preview: <TooltipActionsDemo />,
          sourcePath: "src/components/docs/tooltip-actions-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/tooltip.tsx"
      previous={{ name: "Combo box", href: "/components/combo-box" }}
      next={{ name: "Toast", href: "/components/toast" }}
    />
  );
}
