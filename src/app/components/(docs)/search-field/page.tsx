import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { SearchFieldBasicDemo } from "@/components/docs/search-field-basic-demo";
import { SearchFieldDemo } from "@/components/docs/search-field-demo";
import { SearchFieldDisabledDemo } from "@/components/docs/search-field-disabled-demo";
import { SearchFieldSizesDemo } from "@/components/docs/search-field-sizes-demo";
import { componentPageData } from "@/lib/component-examples";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Search field",
  description: `${componentPageData["search-field"].description} Examples cover filtered results, sizes, and disabled fields, plus installation and the API reference.`,
  path: "/components/search-field",
});

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
        <SearchFieldSizesDemo key="sizes" />,
      ])}
      sourcePath="src/components/ui/search-field.tsx"
    />
  );
}
