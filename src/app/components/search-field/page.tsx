import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SearchFieldBasicDemo } from "@/components/docs/search-field-basic-demo";
import { SearchFieldDemo } from "@/components/docs/search-field-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Search field | vip/ui",
  description: "A labeled search field with clear and submit behavior.",
};

export default function SearchFieldPage() {
  const page = componentPageData["search-field"];
  return (
    <ComponentPage
      name="Search field"
      description={page.description}
      preview={<SearchFieldBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <SearchFieldDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/search-field.tsx"
    />
  );
}
