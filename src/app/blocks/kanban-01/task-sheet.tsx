"use client";

import { parseDate } from "@internationalized/date";
import { TrashIcon } from "@phosphor-icons/react";
import { useRef } from "react";
import type { Selection } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Select } from "@/components/ui/select";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tag,
  TagGroup,
  TagGroupLabel,
  TagListView,
} from "@/components/ui/tag-group";
import { TextArea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import {
  columns,
  type Label,
  labels,
  members,
  type Priority,
  priorities,
  type Status,
  type Task,
} from "./data";

const statusOptions = columns.map((column) => ({
  id: column.id,
  name: column.name,
}));

const assigneeOptions = [
  { id: "none", name: "Unassigned" },
  ...members.map((name) => ({ id: name, name })),
];

export function TaskSheet({
  task,
  onOpenChange,
  onChange,
  onDelete,
}: {
  task: Task | null;
  onOpenChange: (open: boolean) => void;
  onChange: (task: Task) => void;
  onDelete: (task: Task) => void;
}) {
  const last = useRef<Task | null>(null);
  if (task) last.current = task;
  const shown = task ?? last.current;

  function update(patch: Partial<Task>) {
    if (task) onChange({ ...task, ...patch });
  }

  return (
    <Sheet
      position="right"
      size="md"
      isOpen={task !== null}
      onOpenChange={onOpenChange}
    >
      {shown && (
        <>
          <SheetHeader>
            <SheetTitle>{shown.key}</SheetTitle>
            <SheetDescription>Changes save automatically.</SheetDescription>
            <SheetClose />
          </SheetHeader>
          <SheetBody className="grid content-start gap-5 pb-5">
            <TextField
              label="Title"
              value={shown.title}
              onChange={(title) => update({ title })}
              onBlur={() => {
                if (task && !task.title.trim()) update({ title: "Untitled" });
              }}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Select
                label="Status"
                options={statusOptions}
                value={shown.status}
                onChange={(key) => update({ status: key as Status })}
              />
              <Select
                label="Priority"
                options={priorities}
                value={shown.priority}
                onChange={(key) => update({ priority: key as Priority })}
              />
              <Select
                label="Assignee"
                options={assigneeOptions}
                value={shown.assignee ?? "none"}
                onChange={(key) =>
                  update({ assignee: key === "none" ? null : String(key) })
                }
              />
              <DatePicker
                label="Due date"
                value={shown.due ? parseDate(shown.due) : null}
                onChange={(value) =>
                  update({ due: value ? value.toString() : null })
                }
              />
            </div>
            <TagGroup
              selectionMode="multiple"
              selectedKeys={new Set(shown.labels)}
              onSelectionChange={(keys: Selection) =>
                update({
                  labels:
                    keys === "all"
                      ? labels.map((label) => label.id)
                      : labels
                          .map((label) => label.id)
                          .filter((id): id is Label => keys.has(id)),
                })
              }
            >
              <TagGroupLabel>Labels</TagGroupLabel>
              <TagListView items={labels}>
                {(label) => <Tag id={label.id}>{label.name}</Tag>}
              </TagListView>
            </TagGroup>
            <TextArea
              label="Description"
              value={shown.description}
              onChange={(description) => update({ description })}
              rows={5}
            />
          </SheetBody>
          <SheetFooter>
            <Button
              variant="ghost"
              className="text-destructive sm:me-auto"
              onPress={() => onDelete(shown)}
            >
              <TrashIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Delete task
            </Button>
            <SheetClose variant="outline">Done</SheetClose>
          </SheetFooter>
        </>
      )}
    </Sheet>
  );
}
