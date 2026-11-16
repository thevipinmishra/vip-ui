import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";

const CODE = `curl --request POST "https://api.atlas.dev/v2/projects/atlas-2026/events?include=members,invites,activity&expand=owner,plan" --header "Authorization: Bearer $ATLAS_TOKEN" --data '{"name":"Invite sent","source":"dashboard"}'`;

export function CodeBlockWrapDemo() {
  return (
    <CodeBlock
      code={CODE}
      language="bash"
      lineNumbers={false}
      defaultWrap
      className="w-full max-w-lg"
    >
      <CodeBlockHeader>
        <CodeBlockTitle>request.sh</CodeBlockTitle>
        <CodeBlockActions />
      </CodeBlockHeader>
      <CodeBlockBody />
    </CodeBlock>
  );
}
