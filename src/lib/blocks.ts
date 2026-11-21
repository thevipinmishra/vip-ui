import catalog from "./blocks.json";

export interface BlockTheme {
  color: string;
  font: string;
  radius: string;
}

export interface Block {
  name: string;
  title: string;
  description: string;
  category: string;
  height: number;
  added?: string;
  theme?: BlockTheme;
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

export function findBlock(name: string | null) {
  return blocks.find((block) => block.name === name);
}
