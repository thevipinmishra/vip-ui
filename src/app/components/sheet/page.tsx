import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SheetBasicDemo } from "@/components/docs/sheet-basic-demo";
import { SheetDemo } from "@/components/docs/sheet-demo";
import { SheetPlacementDemo } from "@/components/docs/sheet-placement-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Sheet | vip/ui",
  description: componentPageData.sheet.description,
};

export default function SheetPage() {
  const page = componentPageData.sheet;
  return (
    <ComponentPage
      name="Sheet"
      description={page.description}
      preview={<SheetBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <SheetDemo key="example-1" />,
        <SheetPlacementDemo key="example-2" />,
      ])}
      sourcePath="src/components/ui/sheet.tsx"
    />
  );
}
