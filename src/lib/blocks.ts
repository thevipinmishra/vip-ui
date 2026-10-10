import catalog from "./blocks.json";

export interface Block {
  name: string;
  description: string;
  category: string;
  height: number;
  featured?: boolean;
}

export interface BlockCategory {
  slug: string;
  label: string;
}

export const blockCategories: BlockCategory[] = catalog.categories;
export const blocks: Block[] = catalog.blocks;

export function blocksIn(category: string | null) {
  return blocks.filter((block) =>
    category ? block.category === category : block.featured,
  );
}
