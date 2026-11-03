import {
  FigmaLogoIcon,
  FileAudioIcon,
  FileDocIcon,
  FileMdIcon,
  FilePdfIcon,
  FilePptIcon,
  FileSvgIcon,
  FileVideoIcon,
  FileXlsIcon,
  FileZipIcon,
  type Icon,
  ImageIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import type { FileKind } from "./data";

const glyphs: Record<FileKind, { icon: Icon; tone: string; label: string }> = {
  image: { icon: ImageIcon, tone: "text-success", label: "Image" },
  pdf: { icon: FilePdfIcon, tone: "text-destructive", label: "PDF" },
  document: { icon: FileDocIcon, tone: "text-primary", label: "DOCX" },
  sheet: { icon: FileXlsIcon, tone: "text-success", label: "XLSX" },
  video: { icon: FileVideoIcon, tone: "text-warning-foreground", label: "MP4" },
  design: { icon: FigmaLogoIcon, tone: "text-primary", label: "FIG" },
  archive: { icon: FileZipIcon, tone: "text-muted-foreground", label: "ZIP" },
  audio: { icon: FileAudioIcon, tone: "text-warning-foreground", label: "MP3" },
  markdown: { icon: FileMdIcon, tone: "text-foreground", label: "MD" },
  presentation: {
    icon: FilePptIcon,
    tone: "text-warning-foreground",
    label: "KEY",
  },
  vector: { icon: FileSvgIcon, tone: "text-primary", label: "SVG" },
};

export function FileGlyph({
  kind,
  className,
  iconSize = 22,
}: {
  kind: FileKind;
  className?: string;
  iconSize?: number;
}) {
  const glyph = glyphs[kind];
  const GlyphIcon = glyph.icon;
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-lg bg-muted/70 ring-1 ring-border/60",
        className,
      )}
    >
      <GlyphIcon size={iconSize} className={glyph.tone} />
    </span>
  );
}

export function fileKindLabel(kind: FileKind) {
  return glyphs[kind].label;
}
