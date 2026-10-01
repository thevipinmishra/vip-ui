"use client";

import Link from "next/link";
import { useState } from "react";
import {
  type DropItem,
  type FileDropItem,
  parseColor,
} from "react-aria-components";
import { Button } from "../../../components/vip-ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/vip-ui/card";
import { ColorPicker } from "../../../components/vip-ui/color-picker";
import {
  CommandPalette,
  CommandPaletteItem,
} from "../../../components/vip-ui/command-palette";
import { DropZone, DropZoneLabel } from "../../../components/vip-ui/drop-zone";
import { FileTrigger } from "../../../components/vip-ui/file-trigger";
import { TagFieldValue, TokenField } from "../../../components/vip-ui/token-field";
import { Tree, TreeItem } from "../../../components/vip-ui/tree";
import { ThemeToggle } from "./theme-toggle";

const acceptedTypes = ["image/png", "image/jpeg", "application/pdf"];

export function StudioWorkspace() {
  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState("cover");
  const [files, setFiles] = useState<{ id: string; name: string }[]>([]);
  const [accent, setAccent] = useState(() => parseColor("#4169bd"));
  const [tags, setTags] = useState(
    () =>
      new TagFieldValue([
        { type: "token", text: "Campaign" },
        { type: "token", text: "Launch" },
      ]),
  );
  const selectionLabels: Record<string, string> = {
    campaign: "Campaign",
    cover: "Cover.png",
    brief: "Brief.pdf",
    inbox: "Inbox",
  };
  files.forEach((file) => {
    selectionLabels[file.id] = file.name;
  });
  const currentTags = tags.segments
    .filter((segment) => segment.type === "token")
    .map((segment) => segment.text);
  const addFiles = (incoming: File[]) => {
    setFiles((current) => [
      ...current,
      ...incoming
        .filter((file) => acceptedTypes.includes(file.type))
        .map((file) => ({ id: crypto.randomUUID(), name: file.name })),
    ]);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only fixed start-4 top-4 z-50 rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <header className="border-b border-border bg-card">
        <nav
          aria-label="Site navigation"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
        >
          <Link href="/" className="text-lg font-semibold tracking-[-0.05em]">
            vip<span className="text-primary">/</span>ui
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/examples"
              className="text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              Examples
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </header>
      <main id="main" className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h1 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
            Asset studio
          </h1>
          <Button variant="outline" onPress={() => setOpen(true)}>
            Find an action{" "}
            <span className="ms-3 text-xs text-muted-foreground">
              ⌘K / Ctrl+K
            </span>
          </Button>
        </div>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground">
          Browse the campaign files, add local assets, and adjust its tags and
          preview color. Files stay in your browser; nothing is uploaded.
        </p>
        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <Card className="lg:self-start">
            <CardHeader>
              <CardTitle as="h2">Files</CardTitle>
            </CardHeader>
            <CardContent>
              <Tree
                aria-label="Studio files"
                selectionMode="single"
                selectedKeys={new Set([selected])}
                onSelectionChange={(keys) => {
                  if (keys !== "all") {
                    const next = [...keys][0];
                    if (next != null) setSelected(String(next));
                  }
                }}
                defaultExpandedKeys={["campaign", "inbox"]}
              >
                <TreeItem id="campaign" title="Campaign">
                  <TreeItem id="cover" title="Cover.png" />
                  <TreeItem id="brief" title="Brief.pdf" />
                </TreeItem>
                <TreeItem id="inbox" title="Inbox">
                  {files.length > 0
                    ? files.map((file) => (
                        <TreeItem
                          key={file.id}
                          id={file.id}
                          title={file.name}
                        />
                      ))
                    : null}
                </TreeItem>
              </Tree>
              <p
                aria-live="polite"
                className="mt-4 text-xs text-muted-foreground"
              >
                Selected: {selectionLabels[selected] ?? "No file"}
              </p>
            </CardContent>
          </Card>
          <div className="grid gap-5">
            <Card>
              <CardHeader>
                <CardTitle as="h2">Add assets</CardTitle>
              </CardHeader>
              <CardContent>
                <DropZone
                  getDropOperation={(types) =>
                    acceptedTypes.some((type) => types.has(type))
                      ? "copy"
                      : "cancel"
                  }
                  onDrop={async ({ items }) => {
                    const incoming = await Promise.all(
                      items
                        .filter(
                          (item: DropItem): item is FileDropItem =>
                            item.kind === "file" &&
                            acceptedTypes.includes(item.type),
                        )
                        .map((item) => item.getFile()),
                    );
                    addFiles(incoming);
                  }}
                >
                  <DropZoneLabel>Drop a PNG, JPEG, or PDF</DropZoneLabel>
                  <FileTrigger
                    label="Browse files"
                    acceptedFileTypes={acceptedTypes}
                    allowsMultiple
                    onSelect={(chosen) => {
                      if (chosen) addFiles(Array.from(chosen));
                    }}
                  />
                </DropZone>
                <p
                  aria-live="polite"
                  className="mt-3 text-xs text-muted-foreground"
                >
                  {files.length === 0
                    ? "No local files added."
                    : `${files.length} local ${files.length === 1 ? "file" : "files"} in Inbox.`}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle as="h2">Campaign details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <TokenField
                  allowsNewlines
                  label="Tags"
                  description="Type a tag and press comma or Enter."
                  placeholder="Add a tag"
                  value={tags}
                  onChange={setTags}
                  onSubmit={() => setTags(tags.commit())}
                />
                <p aria-live="polite" className="text-xs text-muted-foreground">
                  {currentTags.length
                    ? `Tags: ${currentTags.join(", ")}`
                    : "No tags."}
                </p>
                <div className="grid gap-3">
                  <ColorPicker
                    label="Preview color"
                    value={accent}
                    onChange={setAccent}
                  />
                  <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 p-3">
                    <span
                      aria-hidden="true"
                      className="size-10 shrink-0 rounded-md"
                      style={{ backgroundColor: accent.toString("css") }}
                    />
                    <span className="text-sm">
                      Campaign accent:{" "}
                      <span className="font-mono">
                        {accent.toString("hex")}
                      </span>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <CommandPalette
          isOpen={isOpen}
          onOpenChange={setOpen}
          title="Studio actions"
        >
          <CommandPaletteItem onAction={() => setSelected("brief")}>
            Select project brief
          </CommandPaletteItem>
          <CommandPaletteItem onAction={() => setSelected("cover")}>
            Select cover image
          </CommandPaletteItem>
          <CommandPaletteItem onAction={() => setSelected("inbox")}>
            Open inbox
          </CommandPaletteItem>
          <CommandPaletteItem onAction={() => setTags(new TagFieldValue([]))}>
            Clear tags
          </CommandPaletteItem>
        </CommandPalette>
      </main>
    </div>
  );
}
