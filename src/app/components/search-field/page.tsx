import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { SearchFieldBasicDemo } from "@/components/docs/search-field-basic-demo";
import { SearchFieldDemo } from "@/components/docs/search-field-demo";

export const metadata: Metadata = {
  title: "Search field | vip/ui",
  description: "A labeled search field with clear and submit behavior.",
};

export default function SearchFieldPage() {
  return (
    <ComponentPage
      name="Search field"
      reactAriaDocsHref="https://react-aria.adobe.com/SearchField"
      description="Find something in a collection. A visible label names the search, while the clear button gives you a quick way back to the full list."
      preview={<SearchFieldBasicDemo />}
      previewHint="Type a project name, then use the clear button to start over."
      previewSourcePath="src/components/docs/search-field-basic-demo.tsx"
      examples={[
        {
          title: "Filter projects",
          description:
            "Connect a controlled search field to a collection. Type a project or owner to filter, press Enter to submit, or clear the query to see every project again.",
          preview: <SearchFieldDemo />,
          sourcePath: "src/components/docs/search-field-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/search-field.tsx"
      previous={{ name: "Dialog", href: "/components/dialog" }}
      next={{ name: "Menu", href: "/components/menu" }}
    />
  );
}
