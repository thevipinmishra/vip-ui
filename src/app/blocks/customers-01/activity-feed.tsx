"use client";

import {
  ArrowCounterClockwiseIcon,
  ArrowsClockwiseIcon,
  EnvelopeSimpleIcon,
  NoteIcon,
  PackageIcon,
  TrashIcon,
  UserPlusIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextArea } from "@/components/ui/text-area";
import { type Activity, type ActivityKind, formatStamp } from "./data";

const icons: Record<ActivityKind, typeof NoteIcon> = {
  note: NoteIcon,
  order: PackageIcon,
  refund: ArrowCounterClockwiseIcon,
  subscription: ArrowsClockwiseIcon,
  account: UserPlusIcon,
  email: EnvelopeSimpleIcon,
};

export function ActivityFeed({
  activity,
  onAddNote,
  onDeleteNote,
}: {
  activity: Activity[];
  onAddNote: (text: string) => void;
  onDeleteNote: (id: string) => void;
}) {
  const [note, setNote] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">Activity</CardTitle>
        <CardDescription>Notes are visible only to your team.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            onAddNote(note.trim());
            setNote("");
          }}
        >
          <TextArea
            aria-label="Note"
            placeholder="Add a note for your team"
            rows={2}
            value={note}
            onChange={setNote}
            isRequired
            validate={(value) => (value.trim() ? null : "Write a note first.")}
          />
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className="justify-self-end"
          >
            Add note
          </Button>
        </Form>
        <ol aria-label="Activity" className="grid">
          {activity.map((item) => {
            const Icon = icons[item.kind];
            return (
              <li
                key={item.id}
                className="group/activity relative flex gap-3 pb-5 before:absolute before:inset-s-3.5 before:top-8 before:bottom-1 before:w-px before:bg-border last:pb-0 last:before:hidden"
              >
                <span
                  aria-hidden="true"
                  className="grid size-7 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground ring-1 ring-border/70"
                >
                  <Icon size={14} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                  {item.kind === "note" ? (
                    <p className="rounded-lg bg-muted/60 px-3 py-2 text-sm leading-6 ring-1 ring-border/60">
                      {item.text}
                    </p>
                  ) : (
                    <p className="text-sm leading-6">{item.text}</p>
                  )}
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.author ? `${item.author} · ` : ""}
                    <time dateTime={item.at}>{formatStamp(item.at)}</time>
                  </p>
                </div>
                {item.kind === "note" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    iconOnly
                    aria-label="Delete note"
                    className="shrink-0"
                    onPress={() => onDeleteNote(item.id)}
                  >
                    <TrashIcon size={16} aria-hidden="true" />
                  </Button>
                ) : null}
              </li>
            );
          })}
        </ol>
      </CardContent>
    </Card>
  );
}
