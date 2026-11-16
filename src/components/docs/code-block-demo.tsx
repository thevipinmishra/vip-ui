import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";

const CODE = `import { Button } from "@/components/vip-ui/button";

export function SaveButton() {
  const save = () => saveChanges();
  return <Button onPress={save}>Save changes</Button>;
}`;

export function CodeBlockDemo() {
  return (
    <CodeBlock code={CODE} language="tsx" className="w-full max-w-lg">
      <CodeBlockHeader>
        <CodeBlockTitle>button.tsx</CodeBlockTitle>
        <CodeBlockActions />
      </CodeBlockHeader>
      <CodeBlockBody />
    </CodeBlock>
  );
}
