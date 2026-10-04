import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { NativeSelectDemo } from "@/components/docs/native-select-demo";
import { NativeSelectGroupedDemo } from "@/components/docs/native-select-grouped-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Native select | vip/ui",
  description:
    "A labeled HTML select that uses the device's own option picker.",
};

export default function NativeSelectPage() {
  const page = componentPageData["native-select"];
  return (
    <ComponentPage
      name="Native select"
      description={page.description}
      preview={<NativeSelectDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <NativeSelectGroupedDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/native-select.tsx"
    />
  );
}
