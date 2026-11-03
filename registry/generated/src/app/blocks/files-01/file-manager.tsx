"use client";

import {
  ArrowsDownUpIcon,
  CaretDownIcon,
  CaretRightIcon,
  CheckIcon,
  CloudArrowUpIcon,
  DotsSixVerticalIcon,
  DownloadSimpleIcon,
  FolderSimpleIcon,
  FolderSimplePlusIcon,
  GridFourIcon,
  InfoIcon,
  LinkIcon,
  ListIcon,
  PencilSimpleIcon,
  SquaresFourIcon,
  TrashIcon,
  UploadSimpleIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  Button as AriaButton,
  type DropItem,
  type FileDropItem,
  type Key,
  type Selection,
  useDragAndDrop,
} from "react-aria-components";
import { Avatar } from "../../../components/vip-ui/avatar";
import { Badge } from "../../../components/vip-ui/badge";
import { Breadcrumb, Breadcrumbs } from "../../../components/vip-ui/breadcrumbs";
import { Button } from "../../../components/vip-ui/button";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../../../components/vip-ui/context-menu";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/vip-ui/dialog";
import {
  DropZone,
  DropZoneDescription,
  DropZoneIcon,
  DropZoneLabel,
} from "../../../components/vip-ui/drop-zone";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../../components/vip-ui/empty-state";
import { FileTrigger } from "../../../components/vip-ui/file-trigger";
import { GridList, GridListItem } from "../../../components/vip-ui/grid-list";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "../../../components/vip-ui/menu";
import { ProgressBar } from "../../../components/vip-ui/progress-bar";
import { SearchField } from "../../../components/vip-ui/search-field";
import { Select } from "../../../components/vip-ui/select";
import { Separator } from "../../../components/vip-ui/separator";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from "../../../components/vip-ui/sheet";
import { showToast } from "../../../components/vip-ui/toast";
import { ToggleButton } from "../../../components/vip-ui/toggle-button";
import { ToggleButtonGroup } from "../../../components/vip-ui/toggle-button-group";
import { Toolbar } from "../../../components/vip-ui/toolbar";
import { Tree, TreeItem } from "../../../components/vip-ui/tree";
import { cn } from "../../../components/vip-ui/utils";
import {
  type FileRecord,
  type FolderNode,
  filesInFolder,
  fileTypeLabel,
  flattenFolders,
  folderChildren,
  folderCounts,
  folderName,
  folderPath,
  folderTree,
  formatShortDate,
  formatSize,
  initialFiles,
  kindFromName,
} from "./data";
import { FileDetailsSheet } from "./file-details-sheet";
import { FileGlyph } from "./file-glyph";
import { NameDialog } from "./name-dialog";

type ViewMode = "grid" | "list";
type SortMode = "modified" | "name" | "size" | "manual";
type DialogState =
  | { mode: "rename"; file: FileRecord }
  | { mode: "folder" }
  | null;

const folderId = () => crypto.randomUUID();

function DragHandle({ name }: { name: string }) {
  return (
    <AriaButton
      slot="drag"
      aria-label={`Drag ${name}`}
      className="grid size-6 shrink-0 cursor-grab place-items-center rounded-md text-muted-foreground opacity-0 outline-none transition-[opacity,color] duration-150 ease-out-quint hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring group-hover:opacity-100"
    >
      <DotsSixVerticalIcon size={16} weight="bold" aria-hidden="true" />
    </AriaButton>
  );
}

export function FileManager() {
  const [tree, setTree] = useState<FolderNode[]>(folderTree);
  const [files, setFiles] = useState<FileRecord[]>(initialFiles);
  const [currentFolder, setCurrentFolder] = useState("campaigns");
  const [expandedKeys, setExpandedKeys] = useState<Selection>(
    new Set<Key>(["campaigns"]),
  );
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set<Key>());
  const [view, setView] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortMode>("modified");
  const [query, setQuery] = useState("");
  const [detailsId, setDetailsId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<DialogState>(null);
  const [moveOpen, setMoveOpen] = useState(false);
  const [moveTarget, setMoveTarget] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  const counts = folderCounts(tree, files);
  const path = [
    { id: "all", name: "All files" },
    ...folderPath(tree, currentFolder),
  ];
  const inFolder = filesInFolder(files, currentFolder);
  const filtered = inFolder.filter((file) =>
    `${file.name} ${file.owner}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const visibleFiles = [...filtered].sort((a, b) => {
    if (sort === "manual") {
      return (
        files.findIndex((file) => file.id === a.id) -
        files.findIndex((file) => file.id === b.id)
      );
    }
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "size") return b.size - a.size;
    return Date.parse(b.modifiedAt) - Date.parse(a.modifiedAt);
  });
  const childFolders = folderChildren(tree, currentFolder);
  const selectedIdSet = new Set(
    selectedKeys === "all" ? files.map((file) => file.id) : [...selectedKeys],
  );
  const selectedFiles = [...selectedIdSet]
    .map((key) => files.find((file) => file.id === String(key)))
    .filter((file): file is FileRecord => Boolean(file));
  const detailsFile = files.find((file) => file.id === detailsId) ?? null;
  const totalSize = inFolder.reduce((sum, file) => sum + file.size, 0);
  const latest = inFolder.reduce(
    (value, file) => Math.max(value, Date.parse(file.modifiedAt)),
    0,
  );

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        "text/plain":
          files.find((file) => file.id === String(key))?.name ?? "File",
      })),
    onReorder(event) {
      const moving = [...event.keys].map(String);
      setFiles((current) => {
        const items = moving
          .map((id) => current.find((file) => file.id === id))
          .filter((file): file is FileRecord => Boolean(file));
        const rest = current.filter((file) => !moving.includes(file.id));
        const targetIndex = rest.findIndex(
          (file) => file.id === String(event.target.key),
        );
        const insert =
          event.target.dropPosition === "after" ? targetIndex + 1 : targetIndex;
        return [
          ...rest.slice(0, Math.max(0, insert)),
          ...items,
          ...rest.slice(Math.max(0, insert)),
        ];
      });
      setSort("manual");
      showToast({
        title: "Order updated",
        description: "The new order is saved for this folder.",
        variant: "success",
      });
    },
  });

  function navigate(next: string) {
    setCurrentFolder(next);
    setSelectedKeys(new Set<Key>());
    setQuery("");
    setNavOpen(false);
  }

  function uniqueName(name: string, folder: string) {
    const taken = files
      .filter((file) => file.folderId === folder)
      .map((file) => file.name.toLowerCase());
    if (!taken.includes(name.toLowerCase())) return name;
    const dot = name.lastIndexOf(".");
    const base = dot > 0 ? name.slice(0, dot) : name;
    const extension = dot > 0 ? name.slice(dot) : "";
    let index = 2;
    while (taken.includes(`${base} (${index})${extension}`.toLowerCase())) {
      index += 1;
    }
    return `${base} (${index})${extension}`;
  }

  function addFiles(fileList: File[], destination = currentFolder) {
    const folder = destination === "all" ? "campaigns" : destination;
    setFiles((current) => {
      const next = [...current];
      for (const file of fileList) {
        next.push({
          id: crypto.randomUUID(),
          name: uniqueName(file.name, folder),
          kind: kindFromName(file.name),
          size: file.size,
          modifiedAt: new Date().toISOString(),
          owner: "Maya Chen",
          folderId: folder,
        });
      }
      return next;
    });
    if (fileList.length > 0) {
      showToast({
        title: `${fileList.length} ${fileList.length === 1 ? "file" : "files"} uploaded`,
        description: `Added to ${folderName(tree, folder)}.`,
        variant: "success",
      });
    }
  }

  function download(selection: FileRecord[]) {
    showToast({
      title:
        selection.length === 1
          ? "Download started"
          : `${selection.length} files are ready`,
      description:
        selection.length === 1
          ? `${selection[0].name} is in your downloads folder.`
          : "The zip file is in your downloads folder.",
      variant: "success",
    });
  }

  function remove(targets: FileRecord[]) {
    const ids = targets.map((file) => file.id);
    setFiles((current) => current.filter((file) => !ids.includes(file.id)));
    setSelectedKeys(new Set<Key>());
    setDetailsId(null);
    requestAnimationFrame(() => document.getElementById("file-grid")?.focus());
    showToast({
      title: `${targets.length} ${targets.length === 1 ? "file" : "files"} moved to trash`,
      description: targets.map((file) => file.name).join(", "),
      variant: "success",
      action: {
        label: "Undo",
        onAction: () => {
          setFiles((current) => [...current, ...targets]);
          showToast({
            title: "Files restored",
            description: `${targets.length} ${targets.length === 1 ? "file is" : "files are"} back in place.`,
          });
        },
      },
    });
  }

  function duplicate(file: FileRecord) {
    const copy = {
      ...file,
      id: crypto.randomUUID(),
      name: uniqueName(
        file.name.replace(/(\.[^.]+)$/, " copy$1"),
        file.folderId,
      ),
      modifiedAt: new Date().toISOString(),
      owner: "Maya Chen",
    };
    setFiles((current) => [...current, copy]);
    showToast({
      title: "File duplicated",
      description: `${copy.name} is in ${folderName(tree, file.folderId)}.`,
      variant: "success",
    });
  }

  async function copyLink(file: FileRecord) {
    try {
      await navigator.clipboard.writeText(
        `https://kestrel.app/files/${file.id}`,
      );
      showToast({
        title: "Link copied",
        description: "Anyone on the Campaign team can open it.",
        variant: "success",
      });
    } catch {
      showToast({
        title: "Could not copy the link",
        description: "Allow clipboard access and try again.",
        variant: "error",
      });
    }
  }

  function menuAction(key: Key) {
    if (selectedFiles.length === 0) return;
    if (key === "details" && selectedFiles[0]) {
      setDetailsId(selectedFiles[0].id);
      return;
    }
    if (key === "download") {
      download(selectedFiles);
      return;
    }
    if (key === "rename" && selectedFiles[0]) {
      setDialog({ mode: "rename", file: selectedFiles[0] });
      return;
    }
    if (key === "duplicate" && selectedFiles[0]) {
      duplicate(selectedFiles[0]);
      return;
    }
    if (key === "link" && selectedFiles[0]) {
      void copyLink(selectedFiles[0]);
      return;
    }
    if (key === "move") {
      const destinations = flattenFolders(tree).filter(
        (folder) => folder.id !== currentFolder,
      );
      setMoveTarget(destinations[0]?.id ?? "");
      setMoveOpen(true);
      return;
    }
    if (key === "delete") {
      remove(selectedFiles);
    }
  }

  function validateName(name: string) {
    if (!name) return "Enter a name.";
    if (/[\\/:*?"<>|]/.test(name)) return "Remove the special characters.";
    const existing = files
      .filter((file) => file.folderId === currentFolder)
      .some(
        (file) =>
          file.name.toLowerCase() === name.toLowerCase() &&
          !(dialog?.mode === "rename" && file.id === dialog.file.id),
      );
    if (existing) return "A file with this name already exists.";
    const folders =
      currentFolder === "all" ? tree : folderChildren(tree, currentFolder);
    if (
      folders.some((folder) => folder.name.toLowerCase() === name.toLowerCase())
    )
      return "A folder with this name already exists.";
    return null;
  }

  function submitName(name: string) {
    if (!dialog) return;
    if (dialog.mode === "rename") {
      setFiles((current) =>
        current.map((file) =>
          file.id === dialog.file.id
            ? { ...file, name, kind: kindFromName(name) }
            : file,
        ),
      );
      setDialog(null);
      showToast({
        title: "Name saved",
        description: `The file is now ${name}.`,
        variant: "success",
      });
      return;
    }
    const nextFolder: FolderNode = { id: folderId(), name };
    setTree((current) => {
      if (currentFolder === "all") return [...current, nextFolder];
      const insert = (nodes: FolderNode[]): FolderNode[] =>
        nodes.map((node) =>
          node.id === currentFolder
            ? {
                ...node,
                children: [...(node.children ?? []), nextFolder],
              }
            : {
                ...node,
                children: node.children ? insert(node.children) : undefined,
              },
        );
      return insert(current);
    });
    setDialog(null);
    showToast({
      title: "Folder created",
      description: `${name} is in ${folderName(tree, currentFolder)}.`,
      variant: "success",
    });
  }

  function moveSelection() {
    if (!moveTarget) return;
    const ids = selectedFiles.map((file) => file.id);
    setFiles((current) =>
      current.map((file) =>
        ids.includes(file.id) ? { ...file, folderId: moveTarget } : file,
      ),
    );
    setMoveOpen(false);
    setSelectedKeys(new Set<Key>());
    requestAnimationFrame(() => document.getElementById("file-grid")?.focus());
    showToast({
      title: `${ids.length} ${ids.length === 1 ? "file" : "files"} moved`,
      description: `The destination is ${folderName(tree, moveTarget)}.`,
      variant: "success",
    });
  }

  function renderFolders(nodes: FolderNode[]) {
    return nodes.map((node) => (
      <TreeItem
        key={node.id}
        id={node.id}
        title={node.name}
        content={
          <span className="flex min-w-0 flex-1 items-center gap-2">
            <span className="truncate">{node.name}</span>
            <span className="ms-auto text-xs tabular-nums text-muted-foreground">
              {counts.get(node.id) ?? 0}
            </span>
          </span>
        }
        icon={<FolderSimpleIcon size={16} />}
      >
        {node.children ? renderFolders(node.children) : null}
      </TreeItem>
    ));
  }

  const treeItems: FolderNode[] = [{ id: "all", name: "All files" }, ...tree];
  const treeVersion = files
    .map((file) => `${file.id}:${file.folderId}`)
    .join("|");

  const treeView = (
    <Tree
      key={treeVersion}
      aria-label="Folders"
      items={treeItems}
      selectionMode="single"
      selectedKeys={[currentFolder]}
      expandedKeys={expandedKeys}
      onExpandedChange={setExpandedKeys}
      onSelectionChange={(keys) => {
        const next = [...keys][0];
        if (next) navigate(String(next));
      }}
      className="max-h-none border-0 bg-transparent p-0 text-[13px] shadow-none [&_[data-slot=tree-item-content]]:min-h-9"
    >
      {(node) =>
        node.id === "all" ? (
          <TreeItem
            id="all"
            title="All files"
            hasChildItems={false}
            content={
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span className="truncate">All files</span>
                <span className="ms-auto text-xs tabular-nums text-muted-foreground">
                  {files.length}
                </span>
              </span>
            }
          />
        ) : (
          <TreeItem
            id={node.id}
            title={node.name}
            content={
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <span className="truncate">{node.name}</span>
                <span className="ms-auto text-xs tabular-nums text-muted-foreground">
                  {counts.get(node.id) ?? 0}
                </span>
              </span>
            }
            icon={<FolderSimpleIcon size={16} />}
          >
            {(node as FolderNode).children &&
              renderFolders((node as FolderNode).children ?? [])}
          </TreeItem>
        )
      }
    </Tree>
  );

  const currentName = folderName(tree, currentFolder);
  const selectableFiles = visibleFiles.length > 0;

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-2.5 px-4 sm:px-6">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <GridFourIcon size={17} weight="fill" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">
            Kestrel
          </span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            /
          </span>
          <span className="text-sm text-muted-foreground">Files</span>
          <div className="ms-auto flex items-center gap-2">
            <span className="hidden text-xs text-muted-foreground sm:block">
              Campaign workspace
            </span>
            <Avatar name="Maya Chen" size="sm" />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[236px_minmax(0,1fr)] lg:py-7">
        <aside className="hidden lg:block">
          <div className="sticky top-7 grid gap-5">
            <div>
              <p className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                Folders
              </p>
              {treeView}
            </div>
            <div className="rounded-xl bg-card p-3.5 ring-1 ring-border/70">
              <ProgressBar
                label="Storage"
                value={68}
                maxValue={200}
                aria-valuetext="68 GB of 200 GB used"
                className="[&_[data-slot=progress-bar-label]]:text-xs [&_[data-slot=progress-bar-value]]:text-[11px]"
              />
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                Each file can be up to 25 MB.
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0">
          <nav aria-label="Breadcrumbs" className="mb-4">
            <Breadcrumbs items={path} onAction={(key) => navigate(String(key))}>
              {(folder) => (
                <Breadcrumb id={folder.id}>{folder.name}</Breadcrumb>
              )}
            </Breadcrumbs>
          </nav>

          <div className="flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconOnly
                  aria-label="Open folders"
                  className="-ms-2 lg:hidden"
                  onPress={() => setNavOpen(true)}
                >
                  <ListIcon size={18} aria-hidden="true" />
                </Button>
                <h1 className="text-2xl font-semibold tracking-[-0.04em]">
                  {currentName}
                </h1>
                <Badge variant="outline">
                  {inFolder.length} {inFolder.length === 1 ? "file" : "files"}
                </Badge>
              </div>
              {inFolder.length > 0 && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {formatSize(totalSize)} · Updated{" "}
                  {formatShortDate(new Date(latest).toISOString())}
                </p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onPress={() => setDialog({ mode: "folder" })}
            >
              <FolderSimplePlusIcon size={16} aria-hidden="true" />
              New folder
            </Button>
          </div>

          <Toolbar
            aria-label="File actions"
            size="xs"
            className="mt-4 w-full flex-wrap gap-2"
          >
            <ToggleButtonGroup
              aria-label="View"
              selectionMode="single"
              disallowEmptySelection
              selectedKeys={[view]}
              onSelectionChange={(keys) => {
                const next = [...keys][0];
                if (next === "grid" || next === "list") setView(next);
              }}
            >
              <ToggleButton
                id="grid"
                iconOnly
                aria-label="Grid view"
                variant="segmented"
              >
                <SquaresFourIcon size={16} aria-hidden="true" />
              </ToggleButton>
              <ToggleButton
                id="list"
                iconOnly
                aria-label="List view"
                variant="segmented"
              >
                <ListIcon size={16} aria-hidden="true" />
              </ToggleButton>
            </ToggleButtonGroup>

            <MenuTrigger>
              <Button variant="outline" size="xs">
                <ArrowsDownUpIcon size={16} aria-hidden="true" />
                {sort === "name"
                  ? "Name"
                  : sort === "size"
                    ? "Size"
                    : sort === "manual"
                      ? "Custom order"
                      : "Last modified"}
                <CaretDownIcon size={12} aria-hidden="true" />
              </Button>
              <MenuPopover placement="bottom start">
                <MenuContent
                  aria-label="Sort files"
                  selectionMode="single"
                  selectedKeys={[sort]}
                  onSelectionChange={(keys) => {
                    const next = [...keys][0];
                    if (
                      next === "name" ||
                      next === "modified" ||
                      next === "size" ||
                      next === "manual"
                    )
                      setSort(next);
                  }}
                >
                  <MenuItem id="name">Name</MenuItem>
                  <MenuItem id="modified">Last modified</MenuItem>
                  <MenuItem id="size">Size</MenuItem>
                  <MenuItem id="manual">Custom order</MenuItem>
                </MenuContent>
              </MenuPopover>
            </MenuTrigger>

            <Separator
              orientation="vertical"
              className="mx-1 hidden h-7 self-center sm:block"
            />

            <SearchField
              aria-label="Search files"
              placeholder="Search files"
              size="xs"
              value={query}
              onChange={setQuery}
              className="w-full sm:w-52"
            />

            <div className="ms-auto flex items-center gap-2">
              <FileTrigger
                acceptedFileTypes={[
                  "image/*",
                  "application/pdf",
                  "text/*",
                  "application/zip",
                ]}
                allowsMultiple
                onSelect={(list) => {
                  if (list) addFiles(Array.from(list));
                }}
              >
                <Button size="sm">
                  <UploadSimpleIcon size={16} aria-hidden="true" />
                  Upload
                </Button>
              </FileTrigger>
            </div>
          </Toolbar>

          {selectedFiles.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2 rounded-lg bg-accent px-3 py-2 text-sm text-accent-foreground">
              <span className="font-medium">
                {selectedFiles.length} selected
              </span>
              <Button
                size="xs"
                variant="minimal"
                onPress={() => setSelectedKeys(new Set<Key>())}
              >
                Clear
              </Button>
              <div className="ms-auto flex flex-wrap items-center gap-1">
                {selectedFiles.length === 1 && (
                  <Button
                    size="xs"
                    variant="ghost"
                    onPress={() => setDetailsId(selectedFiles[0].id)}
                  >
                    <InfoIcon size={14} aria-hidden="true" />
                    Details
                  </Button>
                )}
                <Button
                  size="xs"
                  variant="ghost"
                  onPress={() => download(selectedFiles)}
                >
                  <DownloadSimpleIcon size={14} aria-hidden="true" />
                  Download
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  onPress={() => {
                    const destinations = flattenFolders(tree).filter(
                      (folder) => folder.id !== currentFolder,
                    );
                    setMoveTarget(destinations[0]?.id ?? "");
                    setMoveOpen(true);
                  }}
                >
                  <FolderSimpleIcon size={14} aria-hidden="true" />
                  Move
                </Button>
                <Button
                  size="xs"
                  variant="ghost"
                  className="text-destructive"
                  onPress={() => remove(selectedFiles)}
                >
                  <TrashIcon size={14} aria-hidden="true" />
                  Delete
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 grid gap-4">
            {childFolders.length > 0 && query === "" && (
              <section
                aria-labelledby="folders-in-folder"
                className="grid gap-2"
              >
                <h2
                  id="folders-in-folder"
                  className="text-xs font-semibold text-muted-foreground"
                >
                  Folders
                </h2>
                <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {childFolders.map((folder) => {
                    const count = filesInFolder(files, folder.id).length;
                    return (
                      <button
                        key={folder.id}
                        type="button"
                        onClick={() => navigate(folder.id)}
                        className="group flex min-w-0 items-center gap-3 rounded-lg border border-border/70 bg-card px-3 py-2.5 text-left shadow-[var(--shadow-card)] outline-offset-4 outline-transparent transition-[background-color,outline-color] duration-150 ease-out-quint hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        <span className="grid size-9 shrink-0 place-items-center rounded-md bg-muted text-muted-foreground">
                          <FolderSimpleIcon size={19} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            {folder.name}
                          </span>
                          <span className="block text-xs text-muted-foreground">
                            {count} {count === 1 ? "file" : "files"}
                          </span>
                        </span>
                        <CaretRightIcon
                          size={14}
                          aria-hidden="true"
                          className="shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5"
                        />
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {visibleFiles.length === 0 ? (
              <EmptyState>
                <EmptyStateIcon>
                  {query ? (
                    <InfoIcon size={24} />
                  ) : (
                    <FolderSimpleIcon size={24} />
                  )}
                </EmptyStateIcon>
                <EmptyStateTitle as="h2">
                  {query
                    ? "No files match your search"
                    : "This folder is empty"}
                </EmptyStateTitle>
                <EmptyStateDescription>
                  {query
                    ? `No file in ${currentName} contains “${query}”.`
                    : "Upload a file, or drop one below."}
                </EmptyStateDescription>
                <EmptyStateActions>
                  {query ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onPress={() => setQuery("")}
                    >
                      Clear search
                    </Button>
                  ) : (
                    <FileTrigger
                      acceptedFileTypes={[
                        "image/*",
                        "application/pdf",
                        "text/*",
                        "application/zip",
                      ]}
                      allowsMultiple
                      onSelect={(list) => {
                        if (list) addFiles(Array.from(list));
                      }}
                    >
                      <Button size="sm">
                        <UploadSimpleIcon size={16} aria-hidden="true" />
                        Upload files
                      </Button>
                    </FileTrigger>
                  )}
                </EmptyStateActions>
              </EmptyState>
            ) : (
              <ContextMenuTrigger>
                <GridList
                  id="file-grid"
                  key={view}
                  aria-label={`Files in ${currentName}`}
                  items={visibleFiles}
                  selectionMode="multiple"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                  dragAndDropHooks={dragAndDropHooks}
                  layout={view === "grid" ? "grid" : "stack"}
                  className={cn(
                    "border-0 bg-transparent p-0 shadow-none",
                    view === "grid"
                      ? "grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4"
                      : "gap-1",
                    !selectableFiles && "hidden",
                  )}
                >
                  {(file) => (
                    <GridListItem
                      id={file.id}
                      textValue={file.name}
                      onDoubleClick={() => setDetailsId(file.id)}
                      onContextMenu={() => {
                        if (!selectedIdSet.has(file.id)) {
                          setSelectedKeys(new Set<Key>([file.id]));
                        }
                      }}
                      className={cn(
                        "group relative outline-offset-0",
                        view === "grid"
                          ? "min-h-30 flex-col items-stretch justify-start gap-2.5 rounded-lg border border-border/60 bg-card p-3 shadow-[var(--shadow-card)] hover:bg-card data-[selected]:border-primary/40 data-[selected]:bg-accent data-[selected]:ring-1 data-[selected]:ring-primary/30"
                          : "min-h-14 rounded-md border border-transparent px-3 hover:bg-muted data-[selected]:border-primary/20",
                      )}
                    >
                      {view === "grid" ? (
                        <>
                          <div className="flex w-full items-start justify-between gap-2">
                            <FileGlyph kind={file.kind} className="size-11" />
                            <div className="flex items-center gap-1">
                              {!selectedIdSet.has(file.id) && (
                                <span className="text-[10px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
                                  {fileTypeLabel(file).split(" ")[0]}
                                </span>
                              )}
                              <DragHandle name={file.name} />
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {file.name}
                            </p>
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {formatShortDate(file.modifiedAt)} · {file.owner}
                            </p>
                          </div>
                          {selectedIdSet.has(file.id) && (
                            <span
                              aria-hidden="true"
                              className="absolute end-2.5 top-2.5 grid size-5 place-items-center rounded-full bg-primary text-primary-foreground"
                            >
                              <CheckIcon size={12} weight="bold" />
                            </span>
                          )}
                        </>
                      ) : (
                        <>
                          <FileGlyph kind={file.kind} className="size-10" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {file.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {fileTypeLabel(file)} · {formatSize(file.size)}
                            </p>
                          </div>
                          <div className="hidden w-32 shrink-0 items-center gap-2 text-xs text-muted-foreground sm:flex">
                            <Avatar name={file.owner} size="xs" />
                            <span className="truncate">{file.owner}</span>
                          </div>
                          <span className="w-20 shrink-0 text-end text-xs text-muted-foreground">
                            {formatShortDate(file.modifiedAt)}
                          </span>
                          <DragHandle name={file.name} />
                        </>
                      )}
                    </GridListItem>
                  )}
                </GridList>
                <ContextMenu aria-label="File actions" onAction={menuAction}>
                  {selectedFiles.length === 0 ? (
                    <ContextMenuItem id="empty" isDisabled>
                      Select a file first
                    </ContextMenuItem>
                  ) : (
                    <>
                      <ContextMenuItem id="details">
                        <InfoIcon size={16} aria-hidden="true" />
                        Details
                      </ContextMenuItem>
                      <ContextMenuItem
                        id="rename"
                        isDisabled={selectedFiles.length !== 1}
                      >
                        <PencilSimpleIcon size={16} aria-hidden="true" />
                        Rename
                      </ContextMenuItem>
                      <ContextMenuItem
                        id="duplicate"
                        isDisabled={selectedFiles.length !== 1}
                      >
                        <GridFourIcon size={16} aria-hidden="true" />
                        Duplicate
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem id="download">
                        <DownloadSimpleIcon size={16} aria-hidden="true" />
                        Download
                      </ContextMenuItem>
                      <ContextMenuItem id="link">
                        <LinkIcon size={16} aria-hidden="true" />
                        Copy link
                      </ContextMenuItem>
                      <ContextMenuItem id="move">
                        <FolderSimpleIcon size={16} aria-hidden="true" />
                        Move to folder
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem id="delete" variant="destructive">
                        <TrashIcon size={16} aria-hidden="true" />
                        Move to trash
                      </ContextMenuItem>
                    </>
                  )}
                </ContextMenu>
              </ContextMenuTrigger>
            )}
          </div>

          <div className="mt-5">
            <DropZone
              getDropOperation={() => "copy"}
              onDrop={async ({ items }) => {
                const list = await Promise.all(
                  items
                    .filter(
                      (item: DropItem): item is FileDropItem =>
                        item.kind === "file",
                    )
                    .map((item) => item.getFile()),
                );
                addFiles(
                  list,
                  currentFolder === "all" ? "campaigns" : currentFolder,
                );
              }}
              className="min-h-25 flex-row gap-4 border-border/80 bg-card/60 px-4 py-3 text-left"
            >
              <DropZoneIcon className="size-10">
                <CloudArrowUpIcon size={20} aria-hidden="true" />
              </DropZoneIcon>
              <div className="min-w-0 flex-1">
                <DropZoneLabel>
                  Drop files into{" "}
                  {currentName === "All files" ? "Campaigns" : currentName}
                </DropZoneLabel>
                <DropZoneDescription>Up to 25 MB per file.</DropZoneDescription>
              </div>
              <FileTrigger
                acceptedFileTypes={[
                  "image/*",
                  "application/pdf",
                  "text/*",
                  "application/zip",
                ]}
                allowsMultiple
                onSelect={(list) => {
                  if (list) addFiles(Array.from(list));
                }}
              >
                <Button variant="outline" size="sm" className="shrink-0">
                  Browse
                </Button>
              </FileTrigger>
            </DropZone>
          </div>
        </main>
      </div>

      <Sheet
        isOpen={navOpen}
        onOpenChange={setNavOpen}
        position="left"
        size="sm"
      >
        <SheetHeader>
          <SheetTitle level={2}>Folders</SheetTitle>
          <SheetClose />
        </SheetHeader>
        <SheetBody className="pb-6">{treeView}</SheetBody>
      </Sheet>

      <FileDetailsSheet
        file={detailsFile}
        folderName={
          detailsFile ? folderName(tree, detailsFile.folderId) : currentName
        }
        onOpenChange={(open) => {
          if (!open) setDetailsId(null);
        }}
        onDownload={(file) => download([file])}
        onRename={(file) => {
          setDetailsId(null);
          setDialog({ mode: "rename", file });
        }}
        onDelete={(file) => remove([file])}
        onCopyLink={copyLink}
      />

      <NameDialog
        open={dialog !== null}
        mode={dialog?.mode ?? "folder"}
        initialName={dialog?.mode === "rename" ? dialog.file.name : ""}
        onOpenChange={(open) => {
          if (!open) setDialog(null);
        }}
        validate={validateName}
        onSubmit={submitName}
      />

      <DialogContent
        size="sm"
        overlayProps={{ isOpen: moveOpen, onOpenChange: setMoveOpen }}
      >
        <DialogHeader>
          <DialogTitle level={2}>
            Move {selectedFiles.length}{" "}
            {selectedFiles.length === 1 ? "file" : "files"}
          </DialogTitle>
          <DialogDescription>
            {selectedFiles.length === 1
              ? "The file moves to the folder you select."
              : "The files move to the folder you select."}
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <div className="mt-5">
          <Select
            label="Destination"
            options={flattenFolders(tree)
              .filter((folder) => folder.id !== currentFolder)
              .map((folder) => ({
                id: folder.id,
                name:
                  folderPath(tree, folder.id)
                    .map((node) => node.name)
                    .join(" / ") || folder.name,
              }))}
            value={moveTarget}
            onValueChange={setMoveTarget}
          />
        </div>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button onPress={moveSelection} isDisabled={!moveTarget}>
            {selectedFiles.length === 1 ? "Move file" : "Move files"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
