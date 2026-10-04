import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { InputGroupBasicDemo } from "@/components/docs/input-group-basic-demo";
import { InputGroupDemo } from "@/components/docs/input-group-demo";
import { InputGroupNotesDemo } from "@/components/docs/input-group-notes-demo";
import { InputGroupStatesDemo } from "@/components/docs/input-group-states-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Input group | vip/ui",
  description: "Combine a text field with a prefix, suffix, or action.",
};

export default function InputGroupPage() {
  const page = componentPageData["input-group"];
  return (
    <ComponentPage
      name="Input group"
      description={page.description}
      preview={<InputGroupBasicDemo />}
      previewSourcePath={page.usage}
      sourcePath="src/components/ui/input-group.tsx"
      examples={withExamplePreviews(page.examples, [
        <InputGroupDemo key="example-1" />,
        <InputGroupNotesDemo key="example-2" />,
        <InputGroupStatesDemo key="example-3" />,
      ])}
    />
  );
}
