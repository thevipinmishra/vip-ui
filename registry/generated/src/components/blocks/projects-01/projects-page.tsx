"use client";

import {
  ArchiveIcon,
  CopyIcon,
  DotsThreeIcon,
  FolderOpenIcon,
  ListBulletsIcon,
  PencilSimpleIcon,
  PlusIcon,
  SquaresFourIcon,
  StarIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Avatar, AvatarGroup } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../vip-ui/empty-state";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import { ProgressBar } from "../../vip-ui/progress-bar";
import { SearchField } from "../../vip-ui/search-field";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "../../vip-ui/segmented-control";
import { Select } from "../../vip-ui/select";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableHeader,
} from "../../vip-ui/table";
import { showToast } from "../../vip-ui/toast";
import { ToggleButton } from "../../vip-ui/toggle-button";
import { cn } from "../../vip-ui/utils";
import {
  formatDay,
  initialProjects,
  type Project,
  type ProjectStatus,
  statuses,
  today,
} from "./data";
import {
  CreateProjectDialog,
  type NewProject,
  RenameProjectDialog,
} from "./project-dialog";

type View = "grid" | "list";
type Sort = "updated" | "due" | "name";

const statusBadge = {
  "on-track": "success",
  "at-risk": "warning",
  "off-track": "error",
  completed: "neutral",
} as const satisfies Record<ProjectStatus, string>;

const tileColor = {
  1: "bg-(--chart-1)",
  2: "bg-(--chart-2)",
  3: "bg-(--chart-3)",
  4: "bg-(--chart-4)",
  5: "bg-(--chart-5)",
} satisfies Record<Project["color"], string>;

const sortOptions = [
  { id: "updated", name: "Last updated" },
  { id: "due", name: "Due date" },
  { id: "name", name: "Name" },
];

function statusName(status: ProjectStatus) {
  return statuses.find((item) => item.id === status)?.name ?? "";
}

function ProjectTile({ project }: { project: Project }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid size-9 shrink-0 place-items-center rounded-lg text-sm font-semibold text-background",
        tileColor[project.color],
      )}
    >
      {project.name[0]}
    </span>
  );
}

function DueDate({
  project,
  bare = false,
}: {
  project: Project;
  bare?: boolean;
}) {
  const late = project.status !== "completed" && project.due < today;
  const dueToday = project.status !== "completed" && project.due === today;
  return (
    <span
      className={cn(
        "tabular-nums text-muted-foreground",
        late && "font-medium text-destructive",
      )}
    >
      {!bare && (project.status === "completed" ? "Closed " : "Due ")}
      {dueToday ? (bare ? "Today" : "today") : formatDay(project.due)}
    </span>
  );
}

export function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | ProjectStatus>("all");
  const [starredOnly, setStarredOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("updated");
  const [view, setView] = useState<View>("grid");
  const [createOpen, setCreateOpen] = useState(false);
  const [createKey, setCreateKey] = useState(0);
  const [renaming, setRenaming] = useState<{
    key: number;
    project: Project;
  } | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);

  const terms = query.trim().toLowerCase();
  const visible = projects
    .filter((project) => {
      if (status !== "all" && project.status !== status) return false;
      if (starredOnly && !project.starred) return false;
      return `${project.name} ${project.client}`.toLowerCase().includes(terms);
    })
    .sort((a, b) => {
      if (a.starred !== b.starred) return a.starred ? -1 : 1;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "due") return a.due.localeCompare(b.due);
      return b.updatedAt.localeCompare(a.updatedAt);
    });
  const active = projects.filter((project) => project.status !== "completed");
  const atRisk = projects.filter(
    (project) => project.status === "at-risk" || project.status === "off-track",
  );
  const filtered = terms !== "" || status !== "all" || starredOnly;
  const names = projects.map((project) => project.name);
  const clients = [...new Set(projects.map((project) => project.client))].sort(
    (a, b) => a.localeCompare(b),
  );

  function openCreate() {
    setCreateKey((key) => key + 1);
    setCreateOpen(true);
  }

  function update(id: string, patch: Partial<Project>) {
    setProjects((current) =>
      current.map((project) =>
        project.id === id ? { ...project, ...patch } : project,
      ),
    );
  }

  function create(input: NewProject) {
    const project: Project = {
      id: crypto.randomUUID(),
      name: input.name,
      client: input.client,
      status: "on-track",
      done: 0,
      total: input.tasks,
      due: input.due,
      updatedAt: new Date().toISOString(),
      members: ["Elena Ruiz"],
      starred: false,
      color: ((projects.length % 5) + 1) as Project["color"],
    };
    setProjects((current) => [project, ...current]);
    setCreateOpen(false);
    setQuery("");
    setStatus("all");
    setStarredOnly(false);
    setSort("updated");
    showToast({
      title: `${project.name} created`,
      description:
        input.tasks > 0
          ? `The template added ${input.tasks} tasks.`
          : "Add the first task from the project board.",
      variant: "success",
    });
  }

  function duplicate(project: Project) {
    let name = `${project.name} copy`;
    let index = 2;
    while (names.includes(name)) {
      name = `${project.name} copy ${index}`;
      index += 1;
    }
    const copy: Project = {
      ...project,
      id: crypto.randomUUID(),
      name,
      status: "on-track",
      done: 0,
      starred: false,
      updatedAt: new Date().toISOString(),
    };
    setProjects((current) => [copy, ...current]);
    showToast({ title: `${name} created` });
  }

  function archive(project: Project) {
    const snapshot = projects;
    setProjects((current) => current.filter((item) => item.id !== project.id));
    showToast({
      title: `${project.name} archived`,
      action: { label: "Undo", onAction: () => setProjects(snapshot) },
    });
  }

  function actions(project: Project) {
    return (
      <MenuTrigger>
        <Button
          variant="ghost"
          size="sm"
          iconOnly
          aria-label={`Actions for ${project.name}`}
        >
          <DotsThreeIcon size={20} weight="bold" aria-hidden="true" />
        </Button>
        <MenuPopover placement="bottom end">
          <MenuContent aria-label={`Actions for ${project.name}`}>
            <MenuItem
              onAction={() => {
                setRenaming((current) => ({
                  key: (current?.key ?? 0) + 1,
                  project,
                }));
                setRenameOpen(true);
              }}
            >
              <PencilSimpleIcon size={16} aria-hidden="true" />
              Rename
            </MenuItem>
            <MenuItem onAction={() => duplicate(project)}>
              <CopyIcon size={16} aria-hidden="true" />
              Duplicate
            </MenuItem>
            <MenuSeparator />
            <MenuItem variant="destructive" onAction={() => archive(project)}>
              <ArchiveIcon size={16} aria-hidden="true" />
              Archive
            </MenuItem>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
    );
  }

  function star(project: Project) {
    return (
      <ToggleButton
        variant="ghost"
        size="sm"
        iconOnly
        aria-label={`Star ${project.name}`}
        isSelected={project.starred}
        onChange={(starred) => update(project.id, { starred })}
        className="selected:bg-transparent selected:hover:bg-muted"
      >
        <StarIcon
          weight={project.starred ? "fill" : "regular"}
          aria-hidden="true"
          className={cn(project.starred && "text-warning")}
        />
      </ToggleButton>
    );
  }

  return (
    <div className="min-h-svh bg-muted/40 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto grid w-full max-w-[1180px] gap-6">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-1">
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">
              Projects
            </h1>
            <p className="text-sm text-muted-foreground">
              {active.length} active · {atRisk.length} need attention
            </p>
          </div>
          <Button onPress={openCreate}>
            <PlusIcon data-icon="inline-start" size={16} aria-hidden="true" />
            New project
          </Button>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          <SearchField
            aria-label="Search projects"
            placeholder="Project or client"
            size="sm"
            value={query}
            onChange={setQuery}
            className="w-full sm:w-64"
          />
          <Select
            aria-label="Status"
            size="sm"
            options={[{ id: "all", name: "All statuses" }, ...statuses]}
            value={status}
            onChange={(key) => setStatus(key as "all" | ProjectStatus)}
            className="w-[calc(50%-0.25rem)] sm:w-40"
          />
          <Select
            aria-label="Sort by"
            size="sm"
            options={sortOptions}
            value={sort}
            onChange={(key) => setSort(key as Sort)}
            className="w-[calc(50%-0.25rem)] sm:w-40"
          />
          <ToggleButton
            size="sm"
            isSelected={starredOnly}
            onChange={setStarredOnly}
          >
            <StarIcon
              data-icon="inline-start"
              weight={starredOnly ? "fill" : "regular"}
              aria-hidden="true"
            />
            Starred
          </ToggleButton>
          <SegmentedControl
            aria-label="Layout"
            size="sm"
            value={view}
            onValueChange={(details) => {
              if (details.value === "grid" || details.value === "list") {
                setView(details.value);
              }
            }}
            className="ms-auto"
          >
            <SegmentedControlItem value="grid">
              <SquaresFourIcon aria-hidden="true" />
              <span className="sr-only">Grid</span>
            </SegmentedControlItem>
            <SegmentedControlItem value="list">
              <ListBulletsIcon aria-hidden="true" />
              <span className="sr-only">List</span>
            </SegmentedControlItem>
          </SegmentedControl>
        </div>

        {visible.length === 0 ? (
          <div className="rounded-xl bg-card p-4 ring-1 ring-border/70 sm:p-6">
            <EmptyState className="border-0">
              <EmptyStateIcon>
                <FolderOpenIcon />
              </EmptyStateIcon>
              <EmptyStateTitle>
                {starredOnly && !terms && status === "all"
                  ? "No starred projects"
                  : filtered
                    ? "No projects match"
                    : "No projects yet"}
              </EmptyStateTitle>
              <EmptyStateDescription>
                {starredOnly && !terms && status === "all"
                  ? "Star a project to keep it at the top of the list."
                  : filtered
                    ? "Change the search or clear the filters."
                    : "Create a project to plan work with your team."}
              </EmptyStateDescription>
              <EmptyStateActions>
                {filtered ? (
                  <Button
                    variant="outline"
                    onPress={() => {
                      setQuery("");
                      setStatus("all");
                      setStarredOnly(false);
                    }}
                  >
                    Clear filters
                  </Button>
                ) : (
                  <Button onPress={openCreate}>New project</Button>
                )}
              </EmptyStateActions>
            </EmptyState>
          </div>
        ) : view === "grid" ? (
          <ul
            aria-label="Projects"
            className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((project) => (
              <li
                key={project.id}
                className="grid gap-4 rounded-xl bg-card p-4 shadow-(--shadow-card) ring-1 ring-border/70"
              >
                <div className="flex items-start gap-3">
                  <ProjectTile project={project} />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-semibold">
                      {project.name}
                    </h2>
                    <p className="truncate text-sm text-muted-foreground">
                      {project.client}
                    </p>
                  </div>
                  <div className="-me-1.5 -mt-1 flex items-center">
                    {star(project)}
                    {actions(project)}
                  </div>
                </div>
                <ProgressBar
                  label={
                    project.total === 0
                      ? "No tasks"
                      : `${project.done} of ${project.total} tasks`
                  }
                  value={project.done}
                  maxValue={Math.max(project.total, 1)}
                  className="[&_[data-slot=progress-bar-label]]:font-normal [&_[data-slot=progress-bar-label]]:text-muted-foreground"
                />
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant={statusBadge[project.status]} dot>
                    {statusName(project.status)}
                  </Badge>
                  <DueDate project={project} />
                  <AvatarGroup className="ms-auto">
                    {project.members.slice(0, 3).map((name) => (
                      <Avatar key={name} name={name} size="xs" />
                    ))}
                  </AvatarGroup>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="overflow-x-auto rounded-xl bg-card shadow-(--shadow-card) ring-1 ring-border/70">
            <Table aria-label="Projects" className="min-w-[46rem]">
              <TableHeader>
                <Column isRowHeader>Project</Column>
                <Column>Status</Column>
                <Column>Progress</Column>
                <Column>Due</Column>
                <Column>Team</Column>
                <Column>
                  <span className="sr-only">Actions</span>
                </Column>
              </TableHeader>
              <TableBody items={visible}>
                {(project) => (
                  <Row id={project.id}>
                    <Cell>
                      <div className="flex items-center gap-3">
                        <ProjectTile project={project} />
                        <div className="min-w-0">
                          <p className="truncate font-medium">{project.name}</p>
                          <p className="truncate text-muted-foreground">
                            {project.client}
                          </p>
                        </div>
                      </div>
                    </Cell>
                    <Cell>
                      <Badge variant={statusBadge[project.status]} dot>
                        {statusName(project.status)}
                      </Badge>
                    </Cell>
                    <Cell>
                      <ProgressBar
                        aria-label={`${project.name} progress`}
                        value={project.done}
                        maxValue={Math.max(project.total, 1)}
                        className="w-36"
                      />
                    </Cell>
                    <Cell>
                      <DueDate project={project} bare />
                    </Cell>
                    <Cell>
                      <AvatarGroup>
                        {project.members.slice(0, 3).map((name) => (
                          <Avatar key={name} name={name} size="xs" />
                        ))}
                      </AvatarGroup>
                    </Cell>
                    <Cell>
                      <div className="flex items-center justify-end">
                        {star(project)}
                        {actions(project)}
                      </div>
                    </Cell>
                  </Row>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <CreateProjectDialog
        key={`create-${createKey}`}
        isOpen={createOpen}
        onOpenChange={setCreateOpen}
        clients={clients}
        names={names}
        onCreate={create}
      />
      {renaming && (
        <RenameProjectDialog
          key={`rename-${renaming.key}`}
          isOpen={renameOpen}
          onOpenChange={setRenameOpen}
          initialName={renaming.project.name}
          names={names}
          onRename={(name) => {
            update(renaming.project.id, { name });
            setRenameOpen(false);
            showToast({ title: "Project renamed" });
          }}
        />
      )}
    </div>
  );
}
