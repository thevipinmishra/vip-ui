import catalog from "./blocks.json";

export interface Block {
  name: string;
  title: string;
  description: string;
  category: string;
  height: number;
}

export interface BlockCategory {
  slug: string;
  label: string;
}

export const blockCategories: BlockCategory[] = catalog.categories;
export const blocks: Block[] = catalog.blocks;

export function blocksIn(category: string | null) {
  return category
    ? blocks.filter((block) => block.category === category)
    : blocks;
}
