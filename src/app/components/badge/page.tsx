import type { Metadata } from "next";
import { BadgeDemo } from "@/components/docs/badge-demo";
import { BadgeQueueDemo } from "@/components/docs/badge-queue-demo";
import { ComponentPage } from "@/components/docs/component-page";

export const metadata: Metadata = {
  title: "Badge | vip/ui",
  description: "Compact labels for status and metadata.",
};

export default function BadgePage() {
  return (
    <ComponentPage
      name="Badge"
      description="A compact label for status or metadata. The optional dot reinforces status without relying on color alone."
      preview={<BadgeDemo />}
      previewHint="Compare neutral, accent, success, and warning styles."
      previewSourcePath="src/components/docs/badge-demo.tsx"
      examples={[
        {
          title: "Release queue",
          description:
            "Pair each badge with a readable status and keep the record details outside the label.",
          preview: <BadgeQueueDemo />,
          sourcePath: "src/components/docs/badge-queue-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/badge.tsx"
      previous={{ name: "Switch", href: "/components/switch" }}
      next={{ name: "Alert", href: "/components/alert" }}
    />
  );
}
