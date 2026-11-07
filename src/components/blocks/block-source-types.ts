export interface BlockSourceFile {
  path: string;
  code: string;
  html: string;
  lineDigits: number;
}

export interface BlockSource {
  files: BlockSourceFile[];
  command: string;
  entry: { component: string; path: string };
}
