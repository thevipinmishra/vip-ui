"use client";

import {
  KanbanIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Button } from "../../vip-ui/button";
import { ProgressBar } from "../../vip-ui/progress-bar";
import { SearchField } from "../../vip-ui/search-field";
import { Select } from "../../vip-ui/select";
import { showToast } from "../../vip-ui/toast";
import { BoardColumn, type DropTarget } from "./board-column";
import {
  columns,
  currentUser,
  formatDay,
  initialTasks,
  members,
  type Status,
  sprint,
  type Task,
} from "./data";
import { labelName } from "./task-parts";
import { TaskSheet } from "./task-sheet";

const assigneeFilters = [
  { id: "all", name: "Everyone" },
  { id: "me", name: "Assigned to me" },
  { id: "none", name: "Unassigned" },
  ...members.map((name) => ({ id: name, name })),
];

function nextKey(tasks: Task[]) {
  const top = Math.max(...tasks.map((task) => Number(task.key.slice(3))));
  return `FN-${top + 1}`;
}

export function ProjectBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [query, setQuery] = useState("");
  const [assignee, setAssignee] = useState("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [addingIn, setAddingIn] = useState<Status | null>(null);

  const terms = query.trim().toLowerCase();
  const visible = tasks.filter((task) => {
    if (assignee === "me" && task.assignee !== currentUser) return false;
    if (assignee === "none" && task.assignee !== null) return false;
    if (
      !["all", "me", "none"].includes(assignee) &&
      task.assignee !== assignee
    ) {
      return false;
    }
    if (!terms) return true;
    return [task.key, task.title, ...task.labels.map(labelName)]
      .join(" ")
      .toLowerCase()
      .includes(terms);
  });
  const done = tasks.filter((task) => task.status === "done").length;
  const openTask = tasks.find((task) => task.id === openId) ?? null;
  const filtered = terms !== "" || assignee !== "all";

  function move(ids: string[], status: Status, target?: DropTarget) {
    setTasks((current) => {
      const moving = ids
        .map((id) => current.find((task) => task.id === id))
        .filter((task): task is Task => Boolean(task))
        .map((task) => ({ ...task, status }));
      const rest = current.filter((task) => !ids.includes(task.id));
      let index = rest.length;
      if (target) {
        const at = rest.findIndex((task) => task.id === target.key);
        if (at !== -1) index = target.position === "after" ? at + 1 : at;
      } else {
        const last = rest.map((task) => task.status).lastIndexOf(status);
        if (last !== -1) index = last + 1;
      }
      return [...rest.slice(0, index), ...moving, ...rest.slice(index)];
    });
  }

  function add(status: Status, title: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      key: nextKey(tasks),
      title,
      status,
      priority: "medium",
      assignee: assignee === "me" ? currentUser : null,
      labels: [],
      due: null,
      description: "",
    };
    setTasks((current) => {
      const last = current.map((item) => item.status).lastIndexOf(status);
      const index = last === -1 ? current.length : last + 1;
      return [...current.slice(0, index), task, ...current.slice(index)];
    });
  }

  function change(next: Task) {
    const previous = tasks.find((task) => task.id === next.id);
    if (!previous) return;
    if (previous.status === next.status) {
      setTasks((current) =>
        current.map((task) => (task.id === next.id ? next : task)),
      );
      return;
    }
    setTasks((current) => {
      const rest = current.filter((task) => task.id !== next.id);
      const last = rest.map((task) => task.status).lastIndexOf(next.status);
      const index = last === -1 ? rest.length : last + 1;
      return [...rest.slice(0, index), next, ...rest.slice(index)];
    });
  }

  function remove(task: Task) {
    const snapshot = tasks;
    setTasks((current) => current.filter((item) => item.id !== task.id));
    setOpenId(null);
    showToast({
      title: `${task.key} deleted`,
      action: { label: "Undo", onAction: () => setTasks(snapshot) },
    });
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-14 max-w-360 items-center gap-2.5 px-4 sm:px-6">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <KanbanIcon size={17} weight="fill" aria-hidden="true" />
          </span>
          <span className="text-sm font-semibold tracking-[-0.02em]">
            Fieldnote
          </span>
          <span aria-hidden="true" className="text-muted-foreground/60">
            /
          </span>
          <span className="truncate text-sm text-muted-foreground">
            Mobile app
          </span>
          <div className="ms-auto flex items-center gap-2">
            <Button size="sm" onPress={() => setAddingIn("backlog")}>
              <PlusIcon data-icon="inline-start" size={16} aria-hidden="true" />
              New task
            </Button>
            <Avatar name={currentUser} size="sm" />
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-360 flex-1 content-start gap-5 py-6">
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4 px-4 sm:px-6">
          <div className="grid min-w-0 gap-1">
            <h1 className="text-2xl font-semibold tracking-[-0.04em]">
              {sprint.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              {formatDay(sprint.start)} – {formatDay(sprint.end)} · 2 days left
            </p>
          </div>
          <ProgressBar
            label={`${done} of ${tasks.length} done`}
            value={done}
            maxValue={Math.max(tasks.length, 1)}
            className="w-full max-w-56"
          />
          <div className="ms-auto grid w-full gap-3 sm:w-auto sm:grid-cols-[14rem_11rem]">
            <SearchField
              aria-label="Search tasks"
              placeholder="Search tasks"
              size="sm"
              value={query}
              onChange={setQuery}
            />
            <Select
              aria-label="Assignee"
              size="sm"
              options={assigneeFilters}
              value={assignee}
              onChange={(key) => setAssignee(String(key))}
            />
          </div>
        </div>

        {filtered && visible.length === 0 ? (
          <div className="mx-4 grid min-h-72 place-items-center rounded-xl border border-dashed border-border px-6 text-center sm:mx-6">
            <div className="grid justify-items-center gap-2">
              <MagnifyingGlassIcon
                size={24}
                className="text-muted-foreground"
                aria-hidden="true"
              />
              <p className="text-sm font-medium">No tasks match</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-1"
                onPress={() => {
                  setQuery("");
                  setAssignee("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex snap-x snap-mandatory scroll-px-4 items-start gap-3 overflow-x-auto px-4 pb-2 sm:scroll-px-6 sm:px-6 lg:snap-none">
            {columns.map((column) => (
              <BoardColumn
                key={column.id}
                id={column.id}
                name={column.name}
                limit={column.limit}
                count={tasks.filter((task) => task.status === column.id).length}
                tasks={visible.filter((task) => task.status === column.id)}
                isAdding={addingIn === column.id}
                onAddingChange={(adding) =>
                  setAddingIn(adding ? column.id : null)
                }
                onAdd={(title) => add(column.id, title)}
                onMove={move}
                onOpen={setOpenId}
              />
            ))}
          </div>
        )}
      </main>

      <TaskSheet
        task={openTask}
        onOpenChange={(open) => {
          if (!open) setOpenId(null);
        }}
        onChange={change}
        onDelete={remove}
      />
    </div>
  );
}
