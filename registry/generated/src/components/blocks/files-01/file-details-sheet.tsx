"use client";

import {
  DownloadSimpleIcon,
  LinkIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useRef } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Button } from "../../vip-ui/button";
import {
  DescriptionDetail,
  DescriptionList,
  DescriptionTerm,
} from "../../vip-ui/description-list";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../vip-ui/sheet";
import {
  type FileRecord,
  fileTypeLabel,
  formatFullDate,
  formatSize,
  formatTime,
} from "./data";

export function FileDetailsSheet({
  file,
  folderName,
  onOpenChange,
  onDownload,
  onRename,
  onDelete,
  onCopyLink,
}: {
  file: FileRecord | null;
  folderName: string;
  onOpenChange: (open: boolean) => void;
  onDownload: (file: FileRecord) => void;
  onRename: (file: FileRecord) => void;
  onDelete: (file: FileRecord) => void;
  onCopyLink: (file: FileRecord) => void;
}) {
  const lastFile = useRef<FileRecord | null>(null);
  if (file) lastFile.current = file;
  const shown = file ?? lastFile.current;

  return (
    <Sheet
      position="right"
      size="md"
      isOpen={file !== null}
      onOpenChange={onOpenChange}
    >
      {shown && (
        <>
          <SheetHeader>
            <SheetTitle level={2}>{shown.name}</SheetTitle>
            <SheetDescription>
              {fileTypeLabel(shown)} · {formatSize(shown.size)} in {folderName}
            </SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody className="grid content-start gap-5 pb-5">
            <DescriptionList aria-label="File details">
              <DescriptionTerm>Owner</DescriptionTerm>
              <DescriptionDetail>
                <span className="flex items-center gap-2">
                  <Avatar name={shown.owner} size="xs" />
                  {shown.owner}
                </span>
              </DescriptionDetail>
              <DescriptionTerm>Modified</DescriptionTerm>
              <DescriptionDetail>
                {formatFullDate(shown.modifiedAt)} at{" "}
                {formatTime(shown.modifiedAt)}
              </DescriptionDetail>
              <DescriptionTerm>Shared with</DescriptionTerm>
              <DescriptionDetail>
                <span className="flex items-center gap-2">
                  <span className="flex -space-x-1.5">
                    <Avatar name="Leo Park" size="xs" />
                    <Avatar name="Ana Souza" size="xs" />
                    <Avatar name="Priya Raman" size="xs" />
                  </span>
                  Campaign team
                </span>
              </DescriptionDetail>
              <DescriptionTerm>Link</DescriptionTerm>
              <DescriptionDetail>
                <Button
                  variant="minimal"
                  size="xs"
                  onPress={() => onCopyLink(shown)}
                  aria-label={`Copy link to ${shown.name}`}
                >
                  <LinkIcon size={14} aria-hidden="true" />
                  Copy link
                </Button>
              </DescriptionDetail>
            </DescriptionList>

            <section aria-labelledby="file-activity" className="grid gap-2.5">
              <h3 id="file-activity" className="text-sm font-semibold">
                Activity
              </h3>
              <ul className="grid gap-2 text-xs">
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Avatar name="Priya Raman" size="xs" />
                  <span className="min-w-0 flex-1">
                    <span className="font-medium text-foreground">
                      Priya Raman
                    </span>{" "}
                    added a version
                  </span>
                  <span className="shrink-0">Oct 29</span>
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <Avatar name="Maya Chen" size="xs" />
                  <span className="min-w-0 flex-1">
                    <span className="font-medium text-foreground">
                      Maya Chen
                    </span>{" "}
                    shared with Campaign team
                  </span>
                  <span className="shrink-0">Oct 27</span>
                </li>
              </ul>
            </section>
          </SheetBody>
          <SheetFooter>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => onDelete(shown)}
              className="text-destructive sm:me-auto"
            >
              <TrashIcon size={16} aria-hidden="true" />
              Delete
            </Button>
            <Button variant="outline" size="sm" onPress={() => onRename(shown)}>
              <PencilSimpleIcon size={16} aria-hidden="true" />
              Rename
            </Button>
            <Button size="sm" onPress={() => onDownload(shown)}>
              <DownloadSimpleIcon size={16} aria-hidden="true" />
              Download
            </Button>
          </SheetFooter>
        </>
      )}
    </Sheet>
  );
}
