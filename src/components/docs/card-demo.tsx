"use client";

import { useState } from "react";
import { Folder, Users } from "reicon-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

const members = [
  { name: "Maya Chen", role: "Project lead" },
  { name: "Sam Rivera", role: "Designer" },
  { name: "Jo Park", role: "Developer" },
];

export function CardDemo() {
  const [savedName, setSavedName] = useState("Studio North");
  const [draft, setDraft] = useState("Studio North");
  const [message, setMessage] = useState("Last saved today at 9:40 AM.");

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
              <Folder size={18} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <CardTitle className="truncate">{savedName}</CardTitle>
              <CardDescription>
                Website refresh · Due October 18
              </CardDescription>
            </div>
          </div>
          <Badge variant="accent" dot>
            In progress
          </Badge>
        </div>
      </CardHeader>
      <Form
        className="gap-0"
        onSubmit={(event) => {
          event.preventDefault();
          const name = draft.trim();
          if (!name) return;
          setSavedName(name);
          setMessage("Project name saved.");
        }}
      >
        <CardContent className="grid gap-5">
          <dl className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <dt className="text-xs text-muted-foreground">Budget</dt>
              <dd className="mt-1 font-semibold tabular-nums">$48,000</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Open tasks</dt>
              <dd className="mt-1 font-semibold tabular-nums">12</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Files</dt>
              <dd className="mt-1 font-semibold tabular-nums">36</dd>
            </div>
          </dl>
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium">
              <Users
                size={16}
                aria-hidden="true"
                className="text-muted-foreground"
              />
              Team
            </div>
            <ul className="divide-y divide-border/70 border-y border-border/70">
              {members.map((member) => (
                <li
                  key={member.name}
                  className="flex items-center justify-between gap-3 py-2.5 text-sm"
                >
                  <span className="font-medium">{member.name}</span>
                  <span className="text-muted-foreground">{member.role}</span>
                </li>
              ))}
            </ul>
          </div>
          <TextField
            label="Project name"
            name="project-name"
            value={draft}
            onChange={setDraft}
            isRequired
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" size="sm">
            Save changes
          </Button>
          <output className="text-xs text-muted-foreground">{message}</output>
        </CardFooter>
      </Form>
    </Card>
  );
}
