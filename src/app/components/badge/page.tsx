import type { Metadata } from "next";
import { BadgeBasicDemo } from "@/components/docs/badge-basic-demo";
import { BadgeDemo } from "@/components/docs/badge-demo";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Badge | vip/ui",
  description: "Compact labels for status and metadata.",
};

export default function BadgePage() {
  const page = componentPageData.badge;
  return (
    <ComponentPage
      name="Badge"
      description={page.description}
      preview={<BadgeBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <BadgeDemo key="example-1" />,
      ])}
      sourcePath="src/components/ui/badge.tsx"
    />
  );
}
