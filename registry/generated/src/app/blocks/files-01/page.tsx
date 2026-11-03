import { FileManager } from "./file-manager";

export const metadata = {
  title: "File manager",
  description: "File manager with folders, uploads, and file details.",
};

export default function FilesBlockPage() {
  return <FileManager />;
}
