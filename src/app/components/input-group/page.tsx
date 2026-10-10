import type { Metadata } from "next";
import {
  ComponentPage,
  withExamplePreviews,
} from "@/components/docs/component-page";
import { InputGroupBasicDemo } from "@/components/docs/input-group-basic-demo";
import { InputGroupDemo } from "@/components/docs/input-group-demo";
import { InputGroupDisabledDemo } from "@/components/docs/input-group-disabled-demo";
import { InputGroupIconDemo } from "@/components/docs/input-group-icon-demo";
import { InputGroupInvalidDemo } from "@/components/docs/input-group-invalid-demo";
import { InputGroupNotesDemo } from "@/components/docs/input-group-notes-demo";
import { componentPageData } from "@/lib/component-examples";

export const metadata: Metadata = {
  title: "Input group | vip/ui",
  description: componentPageData["input-group"].description,
};

export default function InputGroupPage() {
  const page = componentPageData["input-group"];

  return (
    <ComponentPage
      name="Input group"
      description={page.description}
      preview={<InputGroupBasicDemo />}
      previewSourcePath={page.usage}
      examples={withExamplePreviews(page.examples, [
        <InputGroupIconDemo key="icon" />,
        <InputGroupDemo key="button" />,
        <InputGroupNotesDemo key="text-area" />,
        <InputGroupDisabledDemo key="disabled" />,
        <InputGroupInvalidDemo key="invalid" />,
      ])}
      sourcePath="src/components/ui/input-group.tsx"
    />
  );
}
