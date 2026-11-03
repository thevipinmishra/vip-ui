import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SheetBasicDemo } from "@/components/docs/sheet-basic-demo";
import { SheetDemo } from "@/components/docs/sheet-demo";
import { SheetFormDemo } from "@/components/docs/sheet-form-demo";
import { SheetInsetDemo } from "@/components/docs/sheet-inset-demo";
import { SheetNestedDemo } from "@/components/docs/sheet-nested-demo";
import { SheetPlacementDemo } from "@/components/docs/sheet-placement-demo";
import { SheetSizesDemo } from "@/components/docs/sheet-sizes-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sheet",
  description: `${componentPageData.sheet.description} Examples cover sizes, inset panels, snap points, edge placement, and forms.`,
  path: "/components/sheet",
});

export default function SheetPage() {
  const page = componentPageData.sheet;
  return (
    <ComponentPage
      name="Sheet"
      description={page.description}
      preview={<SheetBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <SheetSizesDemo key="sizes" />,
        <SheetInsetDemo key="inset" />,
        <SheetDemo key="snap-points" />,
        <SheetPlacementDemo key="edge-placement" />,
        <SheetFormDemo key="form" />,
        <SheetNestedDemo key="nested-sheets" />,
      ])}
      sourcePath="src/components/ui/sheet.tsx"
    />
  );
}
