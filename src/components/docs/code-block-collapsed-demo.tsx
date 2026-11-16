import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockBody,
  CodeBlockHeader,
  CodeBlockTitle,
} from "@/components/ui/code-block";

const CODE = `import { cookies } from "next/headers";

const SESSION_COOKIE = "atlas_session";

export async function getSession() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const response = await fetch(\`https://api.atlas.dev/v1/sessions/\${token}\`, {
    headers: { accept: "application/json" },
    cache: "no-store",
  });

  if (!response.ok) return null;

  const session = await response.json();
  if (session.expiresAt < Date.now()) return null;

  return {
    userId: session.userId,
    role: session.role,
    expiresAt: session.expiresAt,
  };
}`;

export function CodeBlockCollapsedDemo() {
  return (
    <CodeBlock
      code={CODE}
      language="ts"
      maxLines={9}
      className="w-full max-w-lg"
    >
      <CodeBlockHeader>
        <CodeBlockTitle>session.ts</CodeBlockTitle>
        <CodeBlockActions />
      </CodeBlockHeader>
      <CodeBlockBody />
    </CodeBlock>
  );
}
