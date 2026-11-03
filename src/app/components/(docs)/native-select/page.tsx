import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { NativeSelectDemo } from "@/components/docs/native-select-demo";
import { NativeSelectDisabledDemo } from "@/components/docs/native-select-disabled-demo";
import { NativeSelectGroupsDemo } from "@/components/docs/native-select-groups-demo";
import { NativeSelectInvalidDemo } from "@/components/docs/native-select-invalid-demo";
import { NativeSelectSizesDemo } from "@/components/docs/native-select-sizes-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Native select",
  description: `${componentPageData["native-select"].description} Examples cover groups, sizes, and disabled or invalid fields, with the API reference.`,
  path: "/components/native-select",
});

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
        <NativeSelectSizesDemo key="sizes" />,
      ])}
      sourcePath="src/components/ui/native-select.tsx"
    />
  );
}
