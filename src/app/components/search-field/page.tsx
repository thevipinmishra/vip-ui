import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
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
      preview={<SearchFieldDemo />}
      previewHint="Type to filter the projects, press Enter to submit, or clear the query."
      previewSourcePath="src/components/docs/search-field-demo.tsx"
      sourcePath="src/components/ui/search-field.tsx"
      previous={{ name: "Dialog", href: "/components/dialog" }}
      next={{ name: "Menu", href: "/components/menu" }}
    />
  );
}
