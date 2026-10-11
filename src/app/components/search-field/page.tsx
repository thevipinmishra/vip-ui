import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SearchFieldBasicDemo } from "@/components/docs/search-field-basic-demo";
import { SearchFieldDemo } from "@/components/docs/search-field-demo";
import { SearchFieldDisabledDemo } from "@/components/docs/search-field-disabled-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Search field | vip/ui",
  description: componentPageData["search-field"].description,
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
        <SearchFieldDisabledDemo key="disabled" />,
        <SearchFieldDemo key="filtered-results" />,
      ])}
      sourcePath="src/components/ui/search-field.tsx"
    />
  );
}
