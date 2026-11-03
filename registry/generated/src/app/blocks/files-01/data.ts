export type FileKind =
  | "image"
  | "pdf"
  | "document"
  | "sheet"
  | "video"
  | "design"
  | "archive"
  | "audio"
  | "markdown"
  | "presentation"
  | "vector";

export interface FileRecord {
  id: string;
  name: string;
  kind: FileKind;
  size: number;
  modifiedAt: string;
  owner: string;
  folderId: string;
}

export interface FolderNode {
  id: string;
  name: string;
  children?: FolderNode[];
}

export const owners = [
  "Maya Chen",
  "Leo Park",
  "Ana Souza",
  "Priya Raman",
  "Kwame Mensah",
];

export const folderTree: FolderNode[] = [
  { id: "brand", name: "Brand" },
  {
    id: "campaigns",
    name: "Campaigns",
    children: [
      { id: "autumn-launch", name: "Autumn launch" },
      { id: "product-tour", name: "Product tour" },
    ],
  },
  { id: "legal", name: "Legal" },
  { id: "research", name: "Research" },
  { id: "archive", name: "Archive" },
];

export const initialFiles: FileRecord[] = [
  {
    id: "brand-logo-primary",
    name: "logo-primary.svg",
    kind: "vector",
    size: 18_432,
    modifiedAt: "2026-09-12T10:14:00Z",
    owner: "Priya Raman",
    folderId: "brand",
  },
  {
    id: "brand-guide",
    name: "brand-guide.pdf",
    kind: "pdf",
    size: 6_800_000,
    modifiedAt: "2026-09-18T16:40:00Z",
    owner: "Priya Raman",
    folderId: "brand",
  },
  {
    id: "brand-wordmark",
    name: "wordmark-dark.svg",
    kind: "vector",
    size: 14_336,
    modifiedAt: "2026-09-12T10:18:00Z",
    owner: "Priya Raman",
    folderId: "brand",
  },
  {
    id: "brand-palette",
    name: "palette.png",
    kind: "image",
    size: 840_000,
    modifiedAt: "2026-09-20T09:05:00Z",
    owner: "Leo Park",
    folderId: "brand",
  },
  {
    id: "campaigns-hero",
    name: "hero-banner.png",
    kind: "image",
    size: 3_400_000,
    modifiedAt: "2026-10-29T14:32:00Z",
    owner: "Priya Raman",
    folderId: "campaigns",
  },
  {
    id: "campaigns-brief",
    name: "launch-brief.pdf",
    kind: "pdf",
    size: 1_240_000,
    modifiedAt: "2026-10-30T08:12:00Z",
    owner: "Maya Chen",
    folderId: "campaigns",
  },
  {
    id: "campaigns-pricing",
    name: "pricing-grid.fig",
    kind: "design",
    size: 8_600_000,
    modifiedAt: "2026-10-27T11:46:00Z",
    owner: "Leo Park",
    folderId: "campaigns",
  },
  {
    id: "campaigns-email",
    name: "email-sequence.docx",
    kind: "document",
    size: 284_000,
    modifiedAt: "2026-10-26T15:22:00Z",
    owner: "Ana Souza",
    folderId: "campaigns",
  },
  {
    id: "campaigns-budget",
    name: "budget-2026.xlsx",
    kind: "sheet",
    size: 96_000,
    modifiedAt: "2026-10-21T09:40:00Z",
    owner: "Kwame Mensah",
    folderId: "campaigns",
  },
  {
    id: "campaigns-testimonials",
    name: "testimonials.mp4",
    kind: "video",
    size: 48_200_000,
    modifiedAt: "2026-10-19T17:02:00Z",
    owner: "Tomás Herrera",
    folderId: "campaigns",
  },
  {
    id: "campaigns-press",
    name: "press-kit.zip",
    kind: "archive",
    size: 22_000_000,
    modifiedAt: "2026-10-12T12:26:00Z",
    owner: "Maya Chen",
    folderId: "campaigns",
  },
  {
    id: "campaigns-social",
    name: "social-carousel.zip",
    kind: "archive",
    size: 6_400_000,
    modifiedAt: "2026-10-24T10:08:00Z",
    owner: "Leo Park",
    folderId: "campaigns",
  },
  {
    id: "campaigns-webinar",
    name: "webinar-deck.key",
    kind: "presentation",
    size: 12_800_000,
    modifiedAt: "2026-10-23T13:51:00Z",
    owner: "Maya Chen",
    folderId: "campaigns",
  },
  {
    id: "autumn-plan",
    name: "campaign-plan.docx",
    kind: "document",
    size: 148_000,
    modifiedAt: "2026-10-22T08:30:00Z",
    owner: "Maya Chen",
    folderId: "autumn-launch",
  },
  {
    id: "autumn-hero",
    name: "hero-vertical.png",
    kind: "image",
    size: 2_200_000,
    modifiedAt: "2026-10-28T16:18:00Z",
    owner: "Priya Raman",
    folderId: "autumn-launch",
  },
  {
    id: "autumn-copy",
    name: "ad-copy.md",
    kind: "markdown",
    size: 12_000,
    modifiedAt: "2026-10-29T09:52:00Z",
    owner: "Ana Souza",
    folderId: "autumn-launch",
  },
  {
    id: "autumn-landing",
    name: "landing-screenshot.png",
    kind: "image",
    size: 1_700_000,
    modifiedAt: "2026-10-27T18:04:00Z",
    owner: "Leo Park",
    folderId: "autumn-launch",
  },
  {
    id: "autumn-checklist",
    name: "launch-checklist.md",
    kind: "markdown",
    size: 8_000,
    modifiedAt: "2026-10-30T07:44:00Z",
    owner: "Maya Chen",
    folderId: "autumn-launch",
  },
  {
    id: "tour-storyboard",
    name: "storyboard.pdf",
    kind: "pdf",
    size: 2_400_000,
    modifiedAt: "2026-10-24T11:20:00Z",
    owner: "Leo Park",
    folderId: "product-tour",
  },
  {
    id: "tour-narration",
    name: "tour-narration.mp3",
    kind: "audio",
    size: 9_800_000,
    modifiedAt: "2026-10-25T14:12:00Z",
    owner: "Tomás Herrera",
    folderId: "product-tour",
  },
  {
    id: "tour-script",
    name: "script-v3.docx",
    kind: "document",
    size: 64_000,
    modifiedAt: "2026-10-26T09:36:00Z",
    owner: "Ana Souza",
    folderId: "product-tour",
  },
  {
    id: "legal-dpa",
    name: "dpa-2026.pdf",
    kind: "pdf",
    size: 340_000,
    modifiedAt: "2026-09-28T15:10:00Z",
    owner: "Kwame Mensah",
    folderId: "legal",
  },
  {
    id: "legal-subprocessors",
    name: "subprocessors.xlsx",
    kind: "sheet",
    size: 48_000,
    modifiedAt: "2026-10-02T10:22:00Z",
    owner: "Kwame Mensah",
    folderId: "legal",
  },
  {
    id: "research-notes",
    name: "interview-notes.docx",
    kind: "document",
    size: 128_000,
    modifiedAt: "2026-10-08T13:55:00Z",
    owner: "Ana Souza",
    folderId: "research",
  },
  {
    id: "research-survey",
    name: "survey-results.csv",
    kind: "sheet",
    size: 2_100_000,
    modifiedAt: "2026-10-15T09:18:00Z",
    owner: "Priya Raman",
    folderId: "research",
  },
  {
    id: "research-personas",
    name: "personas.fig",
    kind: "design",
    size: 5_400_000,
    modifiedAt: "2026-10-17T16:30:00Z",
    owner: "Leo Park",
    folderId: "research",
  },
  {
    id: "archive-report",
    name: "q2-report.pdf",
    kind: "pdf",
    size: 4_600_000,
    modifiedAt: "2026-07-14T11:00:00Z",
    owner: "Maya Chen",
    folderId: "archive",
  },
  {
    id: "archive-pricing",
    name: "old-pricing.fig",
    kind: "design",
    size: 3_200_000,
    modifiedAt: "2026-06-03T15:42:00Z",
    owner: "Leo Park",
    folderId: "archive",
  },
  {
    id: "archive-logo",
    name: "logo-2024.svg",
    kind: "vector",
    size: 12_000,
    modifiedAt: "2026-01-18T08:20:00Z",
    owner: "Priya Raman",
    folderId: "archive",
  },
  {
    id: "archive-photos",
    name: "event-photos.zip",
    kind: "archive",
    size: 128_000_000,
    modifiedAt: "2026-05-22T17:48:00Z",
    owner: "Tomás Herrera",
    folderId: "archive",
  },
];

const shortDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const fullTime = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

const byteUnits = ["B", "KB", "MB", "GB"];

export function formatSize(bytes: number) {
  let value = bytes;
  let unit = 0;
  while (value >= 1000 && unit < byteUnits.length - 1) {
    value /= 1000;
    unit += 1;
  }
  const rounded =
    value >= 10 || unit === 0 ? Math.round(value) : value.toFixed(1);
  return `${rounded} ${byteUnits[unit]}`;
}

export function formatShortDate(iso: string) {
  return shortDate.format(new Date(iso));
}

export function formatFullDate(iso: string) {
  return fullDate.format(new Date(iso));
}

export function formatTime(iso: string) {
  return fullTime.format(new Date(iso));
}

export function fileTypeLabel(file: Pick<FileRecord, "kind" | "name">) {
  switch (file.kind) {
    case "image":
      return "Image";
    case "pdf":
      return "PDF document";
    case "document":
      return "Word document";
    case "sheet":
      return file.name.endsWith(".csv") ? "CSV file" : "Excel workbook";
    case "video":
      return "Video";
    case "design":
      return "Figma file";
    case "archive":
      return "Zip archive";
    case "audio":
      return "Audio";
    case "markdown":
      return "Markdown file";
    case "presentation":
      return "Keynote deck";
    case "vector":
      return "SVG vector";
  }
}

export function kindFromName(name: string): FileKind {
  const extension = name.split(".").pop()?.toLowerCase() ?? "";
  if (["png", "jpg", "jpeg", "gif", "webp", "avif"].includes(extension))
    return "image";
  if (extension === "pdf") return "pdf";
  if (["doc", "docx", "txt", "rtf"].includes(extension)) return "document";
  if (["xls", "xlsx", "csv"].includes(extension)) return "sheet";
  if (["mp4", "mov", "webm"].includes(extension)) return "video";
  if (["fig", "sketch"].includes(extension)) return "design";
  if (["zip", "rar", "7z"].includes(extension)) return "archive";
  if (["mp3", "wav", "m4a"].includes(extension)) return "audio";
  if (["md", "mdx"].includes(extension)) return "markdown";
  if (["key", "ppt", "pptx"].includes(extension)) return "presentation";
  if (extension === "svg") return "vector";
  return "document";
}

export function filesInFolder(files: FileRecord[], folderId: string) {
  if (folderId === "all") return files;
  return files.filter((file) => file.folderId === folderId);
}

export function folderPath(tree: FolderNode[], id: string): FolderNode[] {
  for (const node of tree) {
    if (node.id === id) return [node];
    if (node.children) {
      const path = folderPath(node.children, id);
      if (path.length > 0) return [node, ...path];
    }
  }
  return [];
}

export function flattenFolders(
  tree: FolderNode[],
  depth = 0,
): { id: string; name: string; depth: number }[] {
  return tree.flatMap((node) => [
    { id: node.id, name: node.name, depth },
    ...flattenFolders(node.children ?? [], depth + 1),
  ]);
}

export function folderCounts(tree: FolderNode[], files: FileRecord[]) {
  const counts = new Map<string, number>();
  const count = (nodes: FolderNode[]): number => {
    let total = 0;
    for (const node of nodes) {
      const direct = files.filter((file) => file.folderId === node.id).length;
      const nested = count(node.children ?? []);
      counts.set(node.id, direct);
      total += direct + nested;
    }
    return total;
  };
  count(tree);
  counts.set("all", files.length);
  return counts;
}

export function folderChildren(tree: FolderNode[], id: string): FolderNode[] {
  if (id === "all") return [];
  for (const node of tree) {
    if (node.id === id) return node.children ?? [];
    const found = folderChildren(node.children ?? [], id);
    if (found.length > 0) return found;
  }
  return [];
}

export function folderName(tree: FolderNode[], id: string) {
  if (id === "all") return "All files";
  return folderPath(tree, id).at(-1)?.name ?? "Files";
}
