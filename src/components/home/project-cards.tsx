"use client";

import {
  CaretDownIcon,
  FileCodeIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
} from "@phosphor-icons/react";
import { useId, useState } from "react";
import type { Key } from "react-aria-components";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxGroup } from "@/components/ui/checkbox-group";
import {
  CommandPalette,
  CommandPaletteItem,
} from "@/components/ui/command-palette";
import { InlineEdit } from "@/components/ui/inline-edit";
import { Kbd } from "@/components/ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Separator } from "@/components/ui/separator";
import { Timeline, TimelineItem, TimelineTime } from "@/components/ui/timeline";
import { showToast } from "@/components/ui/toast";
import { ToggleButton } from "@/components/ui/toggle-button";
import { ToggleButtonGroup } from "@/components/ui/toggle-button-group";
import { Toolbar } from "@/components/ui/toolbar";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Tree, TreeItem } from "@/components/ui/tree";
import { cn } from "@/lib/utils";
import { Block, BlockBody } from "./block";
import { Part } from "./part";

const fileParents: Record<string, string | null> = {
  src: null,
  app: "src",
  "layout.tsx": "app",
  "page.tsx": "app",
  components: "src",
  "button.tsx": "components",
  "dialog.tsx": "components",
  "package.json": null,
};

const files = ["button.tsx", "dialog.tsx", "layout.tsx", "page.tsx"];

function pathTo(key: string | null) {
  const path: string[] = [];
  for (let node = key; node; node = fileParents[node]) path.unshift(node);
  return path;
}

const codeIcon = <FileCodeIcon size={16} />;

export function FilesCard() {
  const [selected, setSelected] = useState<string | null>("button.tsx");
  const [expanded, setExpanded] = useState<Set<Key>>(
    () => new Set(["src", "components"]),
  );
  const [searching, setSearching] = useState(false);
  const path = pathTo(selected);
  const crumb = useId();

  function open(key: string | null) {
    setSelected(key);
    setExpanded((current) => new Set([...current, ...pathTo(key)]));
  }

  return (
    <Block
      title="Files"
      action={
        <Part slug="command-palette" className="shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="text-muted-foreground"
            onPress={() => setSearching(true)}
          >
            <MagnifyingGlassIcon size={16} aria-hidden="true" />
            Go to file
          </Button>
        </Part>
      }
    >
      <BlockBody className="gap-3 pt-3">
        <Part slug="breadcrumbs">
          <Breadcrumbs
            aria-label="File path"
            className="min-h-6 flex-wrap gap-1.5"
            onAction={(key) => {
              const segment = String(key).slice(crumb.length);
              open(segment === "root" ? null : segment);
            }}
          >
            <Breadcrumb id={`${crumb}root`}>acme-web</Breadcrumb>
            {path.map((segment) => (
              <Breadcrumb key={segment} id={`${crumb}${segment}`}>
                {segment}
              </Breadcrumb>
            ))}
          </Breadcrumbs>
        </Part>
        <Part slug="tree">
          <Tree
            aria-label="Files"
            selectionMode="single"
            selectedKeys={selected ? [selected] : []}
            onSelectionChange={(keys) => {
              const [key] = keys;
              setSelected(key == null ? null : String(key));
            }}
            expandedKeys={expanded}
            onExpandedChange={setExpanded}
            className="-mx-2 max-h-none border-0 bg-transparent p-0 shadow-none"
          >
            <TreeItem id="src" title="src">
              <TreeItem id="app" title="app">
                <TreeItem id="layout.tsx" title="layout.tsx" icon={codeIcon} />
                <TreeItem id="page.tsx" title="page.tsx" icon={codeIcon} />
              </TreeItem>
              <TreeItem id="components" title="components">
                <TreeItem id="button.tsx" title="button.tsx" icon={codeIcon} />
                <TreeItem id="dialog.tsx" title="dialog.tsx" icon={codeIcon} />
              </TreeItem>
            </TreeItem>
            <TreeItem id="package.json" title="package.json" />
          </Tree>
        </Part>
      </BlockBody>
      <CommandPalette
        isOpen={searching}
        onOpenChange={setSearching}
        title="Files"
        placeholder="Search files"
        emptyMessage="No matching files."
        shortcut={false}
      >
        {files.map((file) => (
          <CommandPaletteItem
            key={file}
            id={file}
            textValue={file}
            onAction={() => open(file)}
          >
            <FileCodeIcon
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            {file}
            <span className="ms-auto text-xs text-muted-foreground">
              {pathTo(fileParents[file]).join("/")}
            </span>
          </CommandPaletteItem>
        ))}
      </CommandPalette>
    </Block>
  );
}

const formats = [
  { id: "bold", label: "Bold", key: "B", icon: TextBIcon },
  { id: "italic", label: "Italic", key: "I", icon: TextItalicIcon },
  { id: "underline", label: "Underline", key: "U", icon: TextUnderlineIcon },
];

export function EditorCard() {
  const [styles, setStyles] = useState(() => new Set<Key>(["bold"]));

  return (
    <Block
      title="Release notes"
      description="Draft. Saved 2 minutes ago."
      action={
        <Part slug="button-group" className="shrink-0">
          <ButtonGroup aria-label="Publish actions">
            <Button
              variant="outline"
              size="sm"
              onPress={() =>
                showToast({
                  title: "Release notes published",
                  variant: "success",
                })
              }
            >
              Publish
            </Button>
            <MenuTrigger>
              <Button
                variant="outline"
                size="sm"
                className="px-2"
                aria-label="More publish actions"
              >
                <CaretDownIcon size={16} aria-hidden="true" />
              </Button>
              <MenuPopover placement="bottom end">
                <MenuContent aria-label="More publish actions">
                  <MenuItem>Schedule for later</MenuItem>
                  <MenuItem>Copy as Markdown</MenuItem>
                  <MenuSeparator />
                  <MenuItem className="text-destructive">Delete draft</MenuItem>
                </MenuContent>
              </MenuPopover>
            </MenuTrigger>
          </ButtonGroup>
        </Part>
      }
    >
      <BlockBody className="gap-4">
        <Part slug="inline-edit">
          <InlineEdit
            label="Title"
            defaultValue="Version 2.4"
            onSave={(next) => {
              if (next.trim().length < 3) {
                throw new Error("Use 3 characters or more.");
              }
            }}
          />
        </Part>
        <div className="rounded-lg border border-border">
          <Part slug="toolbar" className="rounded-b-none">
            <Toolbar
              aria-label="Text format"
              className="w-full max-w-none gap-1 rounded-none rounded-t-lg border-0 border-b border-border bg-muted/50 p-1 shadow-none"
            >
              <ToggleButtonGroup
                aria-label="Text style"
                selectionMode="multiple"
                selectedKeys={styles}
                onSelectionChange={setStyles}
              >
                {formats.map((format) => (
                  <TooltipTrigger key={format.id}>
                    <ToggleButton
                      id={format.id}
                      variant="segmented"
                      aria-label={format.label}
                    >
                      <format.icon size={16} aria-hidden="true" />
                    </ToggleButton>
                    <TooltipContent>
                      {format.label}{" "}
                      <Kbd className="ms-1">Ctrl {format.key}</Kbd>
                    </TooltipContent>
                  </TooltipTrigger>
                ))}
              </ToggleButtonGroup>
              <Separator
                orientation="vertical"
                className="mx-1 h-6 self-center"
              />
              <Button variant="ghost" size="sm">
                <LinkIcon size={16} aria-hidden="true" />
                Link
              </Button>
            </Toolbar>
          </Part>
          <p
            className={cn(
              "px-4 py-3 text-sm leading-6",
              styles.has("bold") && "font-semibold",
              styles.has("italic") && "italic",
              styles.has("underline") && "underline underline-offset-4",
            )}
          >
            Sheet replaces Drawer. A sheet opens from any edge and closes when
            you swipe it away.
          </p>
        </div>
      </BlockBody>
    </Block>
  );
}

const tasks = [
  { id: "docs", label: "Update the docs" },
  { id: "tests", label: "Run the tests" },
  { id: "notes", label: "Write the release notes" },
];

export function ChecklistCard() {
  const [done, setDone] = useState(["docs", "tests"]);

  return (
    <Block title="Release checklist">
      <BlockBody className="gap-4">
        <Part slug="progress-bar">
          <ProgressBar
            label="Done"
            value={done.length}
            maxValue={tasks.length}
            valueLabel={`${done.length} of ${tasks.length}`}
          />
        </Part>
        <Part slug="checkbox-group">
          <CheckboxGroup aria-label="Tasks" value={done} onChange={setDone}>
            {tasks.map((task) => (
              <Checkbox key={task.id} value={task.id}>
                {task.label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </Part>
      </BlockBody>
    </Block>
  );
}

const activity = [
  { id: "a", title: "Maya merged #482", time: "2 minutes ago" },
  { id: "b", title: "Sam opened #483", time: "1 hour ago" },
  { id: "c", title: "Jo released 2.3", time: "Yesterday" },
];

export function ActivityCard() {
  return (
    <Block title="Activity">
      <BlockBody className="pb-5">
        <Part slug="timeline">
          <Timeline aria-label="Activity">
            {activity.map((item, index) => (
              <TimelineItem
                key={item.id}
                status={index === 0 ? "latest" : "complete"}
                className="pb-5"
              >
                <p className="text-sm font-semibold leading-6">{item.title}</p>
                <TimelineTime className="mt-0">{item.time}</TimelineTime>
              </TimelineItem>
            ))}
          </Timeline>
        </Part>
      </BlockBody>
    </Block>
  );
}
