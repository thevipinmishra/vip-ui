import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { NativeSelectDemo } from "@/components/docs/native-select-demo";
import { NativeSelectDisabledDemo } from "@/components/docs/native-select-disabled-demo";
import { NativeSelectGroupsDemo } from "@/components/docs/native-select-groups-demo";
import { NativeSelectInvalidDemo } from "@/components/docs/native-select-invalid-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Native select | vip/ui",
  description: componentPageData["native-select"].description,
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
        <NativeSelectGroupsDemo key="groups" />,
        <NativeSelectDisabledDemo key="disabled" />,
        <NativeSelectInvalidDemo key="invalid-selection" />,
      ])}
      sourcePath="src/components/ui/native-select.tsx"
    />
  );
}
