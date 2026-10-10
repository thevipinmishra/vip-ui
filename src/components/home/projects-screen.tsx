"use client";

import {
  CaretDownIcon,
  FileCodeIcon,
  FolderPlusIcon,
  GearSixIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  RocketLaunchIcon,
  TextBIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { defineChart } from "@tanstack/charts";
import { pie, polar, radialArc, radialText } from "@tanstack/charts/polar";
import { Chart } from "@tanstack/charts/react/core";
import { scaleLinear } from "@tanstack/charts/scales/linear";
import { tooltip } from "@tanstack/charts/tooltip";
import { portal } from "@tanstack/charts/tooltip/portal";
import { useId, useState } from "react";
import type { Key } from "react-aria-components";
import { galleryRenderer, valueTooltip } from "@/components/charts/chart-plot";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Breadcrumb, Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { ChartCaption, ChartFrame, ChartTitle } from "@/components/ui/chart";
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
import { Screen, ScreenHeader } from "./screen";

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

function pathTo(key: string | null) {
  const path: string[] = [];
  for (let node = key; node; node = fileParents[node]) path.unshift(node);
  return path;
}

const codeIcon = <FileCodeIcon size={16} />;

function RepositoryCard() {
  const [selected, setSelected] = useState<string | null>("button.tsx");
  const [expanded, setExpanded] = useState<Set<Key>>(
    () => new Set(["src", "components"]),
  );
  const path = pathTo(selected);
  const crumb = useId();

  function open(key: string | null) {
    setSelected(key);
    setExpanded((current) => new Set([...current, ...pathTo(key)]));
  }

  return (
    <Block title="Files">
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
    </Block>
  );
}

const formats = [
  { id: "bold", label: "Bold", key: "B", icon: TextBIcon },
  { id: "italic", label: "Italic", key: "I", icon: TextItalicIcon },
  { id: "underline", label: "Underline", key: "U", icon: TextUnderlineIcon },
];

function EditorCard() {
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
                      className="px-2.5"
                    >
                      <format.icon size={16} aria-hidden="true" />
                    </ToggleButton>
                    <TooltipContent>
                      {format.label}{" "}
                      <Kbd className="ms-1 min-h-5">Ctrl {format.key}</Kbd>
                    </TooltipContent>
                  </TooltipTrigger>
                ))}
              </ToggleButtonGroup>
              <Separator
                orientation="vertical"
                className="mx-1 h-6 self-center"
              />
              <Button variant="ghost" size="sm" className="px-2.5">
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

function ChecklistCard() {
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

const sprintDone = 18;
const sprintTotal = 25;
const sprint = [
  { id: "Done", value: sprintDone },
  { id: "Open", value: sprintTotal - sprintDone },
];

const sprintChart = defineChart({
  marks: [
    polar({
      radiusRatio: 0.96,
      scales: {
        angle: { scale: scaleLinear().domain([0, 1]) },
        radius: { scale: scaleLinear().domain([0, 1]) },
      },
      marks: [
        radialArc(
          pie(sprint, {
            value: "value",
            startAngle: -Math.PI * 0.75,
            endAngle: Math.PI * 0.75,
          }),
          {
            innerRadius: ({ radius }) => radius * 0.78,
            cornerRadius: 999,
            color: "id",
            key: "id",
          },
        ),
        radialText([{ id: "reading", label: "72%" }], {
          angle: 0,
          radius: 0,
          text: "label",
          key: "id",
          fill: "var(--foreground)",
          fontSize: 17,
          fontWeight: 650,
        }),
      ],
    }),
  ],
  scales: { x: null, y: null },
  color: {
    domain: ["Done", "Open"],
    range: ["var(--ts-chart-4)", "var(--muted)"],
  },
  tooltip: {
    use: tooltip,
    portal,
    content: ([point]) =>
      valueTooltip(
        point.datum.id,
        "Tasks",
        "value" in point.datum
          ? `${point.datum.value} of ${sprintTotal}`
          : `${sprintDone} of ${sprintTotal}`,
        point.color,
      ),
  },
});

function SprintCard() {
  return (
    <Block title="Sprint 24">
      <BlockBody className="flex items-center gap-4">
        <Part
          name="Chart"
          slug="chart"
          href="/charts"
          className="w-24 shrink-0"
        >
          <ChartFrame className="bg-transparent p-0 sm:p-0">
            <ChartCaption className="sr-only">
              <ChartTitle>Sprint 24 tasks</ChartTitle>
            </ChartCaption>
            <Chart
              definition={sprintChart}
              renderer={galleryRenderer}
              height={96}
              initialWidth={96}
              ariaLabel={`${sprintDone} of ${sprintTotal} tasks are done`}
            />
          </ChartFrame>
        </Part>
        <div className="grid min-w-0 gap-1">
          <p className="text-sm font-medium">
            {sprintDone} of {sprintTotal} tasks done
          </p>
          <p className="text-xs leading-5 text-muted-foreground">
            4 days remain. The team is on schedule.
          </p>
        </div>
      </BlockBody>
    </Block>
  );
}

const activity = [
  { id: "a", title: "Maya merged #482", time: "2 minutes ago" },
  { id: "b", title: "Sam opened #483", time: "1 hour ago" },
  { id: "c", title: "Jo released 2.3", time: "Yesterday" },
];

function ActivityCard() {
  return (
    <Block title="Activity">
      <BlockBody className="pb-5">
        <Part slug="timeline">
          <Timeline>
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

const commands = [
  { id: "project", label: "New project", icon: FolderPlusIcon },
  { id: "invite", label: "Invite a teammate", icon: UserPlusIcon },
  { id: "deploy", label: "Deploy to production", icon: RocketLaunchIcon },
  { id: "theme", label: "Change the theme", icon: MoonIcon },
  { id: "settings", label: "Open settings", icon: GearSixIcon },
];

const people = ["Maya Chen", "Sam Rivera", "Jo Park"];

export function ProjectsScreen() {
  const [isOpen, setOpen] = useState(false);

  return (
    <Screen>
      <ScreenHeader
        title="acme-web"
        detail="Main branch"
        actions={
          <>
            <Part slug="avatar">
              <AvatarGroup
                aria-label="People in this project"
                className="-space-x-1.5"
              >
                {people.map((name) => (
                  <Avatar key={name} name={name} className="size-8 text-xs" />
                ))}
              </AvatarGroup>
            </Part>
            <Part slug="command-palette">
              <Button
                variant="outline"
                size="sm"
                className="min-w-40 justify-start text-muted-foreground"
                onPress={() => setOpen(true)}
              >
                <MagnifyingGlassIcon size={16} aria-hidden="true" />
                Search
              </Button>
            </Part>
          </>
        }
      />
      <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] xl:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_minmax(0,16rem)]">
        <RepositoryCard />
        <div className="grid min-w-0 gap-4">
          <EditorCard />
          <ChecklistCard />
        </div>
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:col-span-2 xl:col-span-1 xl:grid-cols-1">
          <SprintCard />
          <ActivityCard />
        </div>
      </div>
      <CommandPalette isOpen={isOpen} onOpenChange={setOpen} shortcut={false}>
        {commands.map((command) => (
          <CommandPaletteItem
            key={command.id}
            id={command.id}
            textValue={command.label}
            onAction={() =>
              showToast({
                title: command.label,
                description: "This is a preview. No data changed.",
              })
            }
          >
            <command.icon
              size={17}
              aria-hidden="true"
              className="text-muted-foreground"
            />
            {command.label}
          </CommandPaletteItem>
        ))}
      </CommandPalette>
    </Screen>
  );
}
