export interface BlockSourceToken {
  content: string;
  light: string;
  dark: string;
}

export interface BlockSourceFile {
  path: string;
  code: string;
  tokens: BlockSourceToken[][];
}

export interface BlockSource {
  files: BlockSourceFile[];
  command: string;
}
