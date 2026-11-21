"use client";

import { DotsSixVerticalIcon, PlusIcon } from "@phosphor-icons/react";
import { useState } from "react";
import {
  Button as AriaButton,
  DropIndicator,
  isTextDropItem,
  useDragAndDrop,
} from "react-aria-components";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { Form } from "../../vip-ui/form";
import { GridList, GridListItem } from "../../vip-ui/grid-list";
import { TextField } from "../../vip-ui/text-field";
import { cn } from "../../vip-ui/utils";
import { formatDay, type Status, type Task, today } from "./data";
import { labelName, PriorityIcon, priorityName } from "./task-parts";

const taskType = "application/x-fieldnote-task";

export interface DropTarget {
  key: string;
  position: "before" | "after";
}

export function BoardColumn({
  id,
  name,
  limit,
  count,
  tasks,
  isAdding,
  onAddingChange,
  onAdd,
  onMove,
  onOpen,
}: {
  id: Status;
  name: string;
  limit?: number;
  count: number;
  tasks: Task[];
  isAdding: boolean;
  onAddingChange: (adding: boolean) => void;
  onAdd: (title: string) => void;
  onMove: (ids: string[], status: Status, target?: DropTarget) => void;
  onOpen: (id: string) => void;
}) {
  const [draft, setDraft] = useState("");
  const overLimit = limit !== undefined && count > limit;
  const atLimit = limit !== undefined && count === limit;

  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) =>
      [...keys].map((key) => ({
        [taskType]: String(key),
        "text/plain":
          tasks.find((task) => task.id === String(key))?.title ?? "Task",
      })),
    acceptedDragTypes: [taskType],
    getDropOperation: () => "move",
    async onInsert(event) {
      const ids = await Promise.all(
        event.items
          .filter(isTextDropItem)
          .map((item) => item.getText(taskType)),
      );
      onMove(ids, id, {
        key: String(event.target.key),
        position: event.target.dropPosition === "after" ? "after" : "before",
      });
    },
    async onRootDrop(event) {
      const ids = await Promise.all(
        event.items
          .filter(isTextDropItem)
          .map((item) => item.getText(taskType)),
      );
      onMove(ids, id);
    },
    onReorder(event) {
      onMove([...event.keys].map(String), id, {
        key: String(event.target.key),
        position: event.target.dropPosition === "after" ? "after" : "before",
      });
    },
    renderDropIndicator: (target) => (
      <DropIndicator
        target={target}
        className="h-0.5 rounded-full bg-transparent drop-target:bg-primary"
      />
    ),
  });

  function submit() {
    const title = draft.trim();
    if (!title) {
      onAddingChange(false);
      return;
    }
    onAdd(title);
    setDraft("");
  }

  return (
    <section
      aria-labelledby={`column-${id}`}
      className="flex w-[17.5rem] shrink-0 snap-start flex-col gap-2 rounded-xl bg-muted/60 p-2 ring-1 ring-border/60 ring-inset lg:w-auto lg:min-w-0 lg:flex-1"
    >
      <header className="flex h-8 items-center gap-2 px-1.5">
        <h2 id={`column-${id}`} className="text-sm font-semibold">
          {name}
        </h2>
        <span
          className={cn(
            "text-xs tabular-nums text-muted-foreground",
            atLimit && "text-warning-foreground",
            overLimit && "text-destructive",
          )}
        >
          {limit === undefined ? count : `${count} / ${limit}`}
          {overLimit && <span className="sr-only">, over the limit</span>}
        </span>
      </header>

      <GridList
        aria-label={`${name} tasks`}
        items={tasks}
        dragAndDropHooks={dragAndDropHooks}
        onAction={(key) => onOpen(String(key))}
        renderEmptyState={() => (
          <p className="grid min-h-24 place-items-center rounded-lg border border-dashed border-border px-4 text-center text-xs text-muted-foreground">
            Drop tasks here
          </p>
        )}
        className="content-start gap-2 border-0 bg-transparent p-0 shadow-none data-[drop-target]:outline-2 data-[drop-target]:outline-solid data-[drop-target]:outline-primary/50 data-[drop-target]:outline-offset-2"
      >
        {(task) => {
          const overdue =
            task.due !== null && task.due < today && task.status !== "done";
          return (
            <GridListItem
              id={task.id}
              textValue={task.title}
              className="group relative grid min-h-0 gap-2.5 rounded-lg border border-border/70 bg-card p-3 shadow-(--shadow-card) hover:border-border dragging:opacity-50"
            >
              <div className="flex items-start gap-2">
                <p className="min-w-0 flex-1 text-sm leading-5 font-medium text-pretty">
                  {task.title}
                </p>
                <AriaButton
                  slot="drag"
                  aria-label={`Drag ${task.title}`}
                  className="-me-1 -mt-0.5 grid size-6 shrink-0 cursor-grab place-items-center rounded-md text-muted-foreground opacity-0 outline-none transition-[opacity,color] duration-150 ease-out-quint group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-ring pointer-coarse:opacity-100"
                >
                  <DotsSixVerticalIcon
                    size={16}
                    weight="bold"
                    aria-hidden="true"
                  />
                </AriaButton>
              </div>
              {task.labels.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {task.labels.map((label) => (
                    <Badge
                      key={label}
                      variant={label === "bug" ? "error" : "neutral"}
                    >
                      {labelName(label)}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <PriorityIcon priority={task.priority} />
                <span className="sr-only">
                  {priorityName(task.priority)} priority,
                </span>
                <span className="tabular-nums">{task.key}</span>
                {task.due && (
                  <span
                    className={cn(
                      "tabular-nums",
                      overdue && "font-medium text-destructive",
                    )}
                  >
                    <span aria-hidden="true">· </span>
                    {overdue && <span className="sr-only">Overdue, </span>}
                    Due {formatDay(task.due)}
                  </span>
                )}
                <span className="ms-auto">
                  {task.assignee ? (
                    <Avatar name={task.assignee} size="xs" />
                  ) : (
                    <span className="sr-only">Unassigned</span>
                  )}
                </span>
              </div>
            </GridListItem>
          );
        }}
      </GridList>

      {isAdding ? (
        <Form
          className="grid gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            submit();
          }}
        >
          <TextField
            aria-label={`New task in ${name}`}
            placeholder="Task title"
            size="sm"
            value={draft}
            onChange={setDraft}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Escape") {
                setDraft("");
                onAddingChange(false);
              }
            }}
          />
          <div className="flex gap-1.5">
            <Button type="submit" size="sm">
              Add task
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onPress={() => {
                setDraft("");
                onAddingChange(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </Form>
      ) : (
        <Button
          variant="minimal"
          size="sm"
          className="justify-start"
          onPress={() => onAddingChange(true)}
        >
          <PlusIcon data-icon="inline-start" size={16} aria-hidden="true" />
          Add task
        </Button>
      )}
    </section>
  );
}
