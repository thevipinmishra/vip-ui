"use client";

import { useState } from "react";
import { Folder } from "reicon-react";
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

export function CardDemo() {
  const [name, setName] = useState("Studio North");
  const [savedName, setSavedName] = useState("Studio North");

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
            <Folder size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <CardTitle className="truncate">{savedName}</CardTitle>
            <CardDescription>Website refresh · Due October 18</CardDescription>
          </div>
        </div>
      </CardHeader>
      <Form
        className="gap-0"
        onSubmit={(event) => {
          event.preventDefault();
          const next = name.trim();
          if (!next) return;
          setSavedName(next);
        }}
      >
        <CardContent>
          <TextField
            label="Project name"
            name="project-name"
            value={name}
            onChange={setName}
            isRequired
          />
        </CardContent>
        <CardFooter>
          <Button type="submit" size="sm">
            Save changes
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
