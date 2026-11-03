import { blocks } from "./blocks";
import { pageMetadata } from "./seo";

export function blockMetadata(name: string) {
  const block = blocks.find((item) => item.name === name);
  if (!block) throw new Error(`Unknown block: ${name}`);
  return pageMetadata({
    title: `${block.title} block`,
    description: `${block.description} Preview it full screen, copy the install command, or open it live in a new tab.`,
    path: `/blocks/${name}`,
    noIndex: true,
    canonical: false,
  });
}
