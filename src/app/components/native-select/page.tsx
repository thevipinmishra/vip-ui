import type { Metadata } from "next";
import { ComponentPage } from "@/components/docs/component-page";
import { NativeSelectDemo } from "@/components/docs/native-select-demo";
import { NativeSelectGroupedDemo } from "@/components/docs/native-select-grouped-demo";

export const metadata: Metadata = {
  title: "Native select | vip/ui",
  description:
    "A labeled HTML select that uses the device's own option picker.",
};

export default function NativeSelectPage() {
  return (
    <ComponentPage
      name="Native select"
      description="Chooses one option with a native HTML select."
      preview={<NativeSelectDemo />}
      previewHint="Open the picker on a phone to use the device's own selection controls."
      previewSourcePath="src/components/docs/native-select-demo.tsx"
      examples={[
        {
          title: "Grouped choices and validation",
          description:
            "Group teams under their departments, leave a full team disabled, and explain an empty required choice beside the field.",
          preview: <NativeSelectGroupedDemo />,
          sourcePath: "src/components/docs/native-select-grouped-demo.tsx",
        },
      ]}
      sourcePath="src/components/ui/native-select.tsx"
      previous={{ name: "Attachment", href: "/components/attachment" }}
      next={{ name: "Message", href: "/components/message" }}
    />
  );
}
