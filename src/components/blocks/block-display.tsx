import { CodeSnippet } from "@/components/docs/code-snippet";
import type { Block } from "@/lib/blocks";
import { getComponent } from "@/lib/catalog";
import { readRegistryItem, registryUrl } from "@/lib/registry-docs";
import { BlockViewer } from "./block-viewer";

export async function BlockDisplay({ block }: { block: Block }) {
  const item = await readRegistryItem(block.name);
  const files = item.files
    .filter((file) => file.target.startsWith(`src/app/blocks/${block.name}/`))
    .map((file) => ({
      path: file.target,
      code: file.content,
      highlighted: <CodeSnippet key={file.target} code={file.content} />,
    }));
  const components = item.files.flatMap((file) => {
    const slug = file.target.match(/^@components\/vip-ui\/(.+)\.tsx$/)?.[1];
    const component = slug ? getComponent(slug) : undefined;
    return component ? [{ slug: component.slug, name: component.name }] : [];
  });
  const installUrl = registryUrl(block.name);

  return (
    <BlockViewer
      name={block.name}
      description={block.description}
      height={block.height}
      files={files}
      command={installUrl ? `npx shadcn@latest add ${installUrl}` : null}
      components={components}
    />
  );
}
