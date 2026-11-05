"use client";

import { useState } from "react";
import { Block, BlockBody, BlockFooter } from "@/components/home/block";
import { Avatar, AvatarGroup } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ComboBox } from "@/components/ui/combo-box";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Kbd } from "@/components/ui/kbd-code";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { SearchField } from "@/components/ui/search-field";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";

const members = ["Maya Chen", "Sam Rivera", "Jo Park"];

export function VisibilityCard() {
  return (
    <Block
      title="Project visibility"
      description="Choose who can open this project."
    >
      <BlockBody className="gap-0 pt-2">
        <RadioGroup aria-label="Project visibility" defaultValue="workspace">
          <Radio value="private" description="Only you and invited people.">
            Private
          </Radio>
          <Radio value="workspace" description="Everyone in your workspace.">
            Workspace
          </Radio>
          <Radio value="public" description="Anyone with the link.">
            Public link
          </Radio>
        </RadioGroup>
      </BlockBody>
    </Block>
  );
}

export function ProjectCard() {
  return (
    <Block
      title="Website refresh"
      description="Marketing site and docs."
      action={
        <Badge variant="accent" dot>
          In progress
        </Badge>
      }
    >
      <BlockBody className="gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <AvatarGroup
            aria-label="Members"
            className="-space-x-1 [&_[data-slot=avatar]]:ring-card"
          >
            {members.map((name) => (
              <Avatar
                key={name}
                name={name}
                className="size-7 text-[0.625rem]"
              />
            ))}
          </AvatarGroup>
          <span className="truncate text-xs text-muted-foreground">
            3 members
          </span>
        </div>
        <p className="text-sm leading-6 text-muted-foreground">
          Pick up the new pages, review the copy, and publish when the team is
          ready.
        </p>
      </BlockBody>
      <BlockFooter className="justify-between border-t border-border/70 pt-4">
        <span className="text-xs text-muted-foreground">
          Updated 2 hours ago
        </span>
        <Button size="sm">Open project</Button>
      </BlockFooter>
    </Block>
  );
}

const shortcuts = [
  { label: "Open search", keys: "Ctrl K" },
  { label: "Show all commands", keys: "Ctrl J" },
  { label: "Close a panel", keys: "Esc" },
];

export function ShortcutsCard() {
  return (
    <Block
      title="Keyboard shortcuts"
      description="A few keys cover the basics."
    >
      <BlockBody className="gap-3">
        <p className="text-sm leading-6 text-muted-foreground">
          Search, move between pages, and close a panel without leaving the
          keyboard.
        </p>
      </BlockBody>
      <BlockFooter className="border-t border-border/70 pt-4">
        <Dialog>
          <DialogTrigger variant="outline" size="sm" className="w-full">
            View shortcuts
          </DialogTrigger>
          <DialogContent size="sm">
            <DialogHeader>
              <DialogTitle>Keyboard shortcuts</DialogTitle>
              <DialogClose />
            </DialogHeader>
            <DialogDescription>
              These work anywhere in the docs.
            </DialogDescription>
            <DialogBody>
              <dl className="grid gap-3">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.label}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <dt>{shortcut.label}</dt>
                    <dd>
                      <Kbd>{shortcut.keys}</Kbd>
                    </dd>
                  </div>
                ))}
              </dl>
            </DialogBody>
            <DialogFooter>
              <DialogClose variant="outline">Close</DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </BlockFooter>
    </Block>
  );
}

export function OrderCard() {
  return (
    <Block
      title="Order 2048"
      description="Canvas notebook and gel pen."
      action={
        <Badge variant="success" dot>
          Paid
        </Badge>
      }
    >
      <BlockBody className="gap-3">
        <p className="text-sm leading-6 text-muted-foreground">
          Ships Monday to 14 Oak Street.
        </p>
        <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
          <dt className="text-muted-foreground">Delivery</dt>
          <dd className="text-end">Standard</dd>
          <dt className="text-muted-foreground">Arrives</dt>
          <dd className="text-end">Monday</dd>
        </dl>
      </BlockBody>
      <BlockFooter className="justify-between border-t border-border/70 pt-4">
        <span className="text-xs text-muted-foreground">
          Updated 2 hours ago
        </span>
        <SheetTrigger>
          <Button variant="outline" size="sm">
            View details
          </Button>
          <Sheet position="right" size="sm">
            <SheetHeader>
              <SheetTitle>Order 2048</SheetTitle>
              <SheetDescription>Paid on October 28.</SheetDescription>
              <SheetClose />
            </SheetHeader>
            <SheetBody>
              <dl className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-3 text-sm">
                <dt>Canvas notebook</dt>
                <dd className="text-end tabular-nums">$18.00</dd>
                <dt>Gel pen</dt>
                <dd className="text-end tabular-nums">$4.00</dd>
                <dt className="border-t border-border pt-3 font-semibold">
                  Total
                </dt>
                <dd className="border-t border-border pt-3 text-end font-semibold tabular-nums">
                  $22.00
                </dd>
              </dl>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Ships Monday to 14 Oak Street.
              </p>
            </SheetBody>
            <SheetFooter>
              <SheetClose variant="outline">Close</SheetClose>
            </SheetFooter>
          </Sheet>
        </SheetTrigger>
      </BlockFooter>
    </Block>
  );
}

const docs = [
  { name: "Dialog", group: "Overlay" },
  { name: "Combo box", group: "Form" },
  { name: "Table", group: "Data display" },
  { name: "Switch", group: "Form" },
];

export function SearchCard() {
  const [query, setQuery] = useState("");
  const matches = docs.filter((doc) =>
    `${doc.name} ${doc.group}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <Block title="Search the docs" description="Find a component by name.">
      <BlockBody className="gap-3">
        <SearchField
          aria-label="Search the docs"
          placeholder="Search components"
          value={query}
          onChange={setQuery}
        />
        <p className="sr-only" aria-live="polite">
          {matches.length} {matches.length === 1 ? "result" : "results"}
        </p>
        <ul aria-label="Components" className="grid">
          {matches.map((doc) => (
            <li
              key={doc.name}
              className="flex min-h-9 items-center justify-between gap-3 border-b border-border/60 py-1.5 text-sm last:border-0"
            >
              <span className="truncate font-medium">{doc.name}</span>
              <span className="shrink-0 text-xs text-muted-foreground">
                {doc.group}
              </span>
            </li>
          ))}
          {matches.length === 0 && (
            <li className="py-6 text-center text-sm text-muted-foreground">
              No components match.
            </li>
          )}
        </ul>
      </BlockBody>
    </Block>
  );
}

const templates = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Stats, charts, and tables",
  },
  {
    id: "marketing",
    name: "Marketing site",
    description: "Landing pages and pricing",
  },
  { id: "docs", name: "Docs", description: "Guides and API reference" },
];

export function CreateProjectCard() {
  return (
    <Block
      title="Create a project"
      description="Start with a name and a template."
    >
      <Form
        className="contents"
        onSubmit={(event) => {
          event.preventDefault();
          showToast({
            title: "Project created",
            description: "Your new project is ready to edit.",
            variant: "success",
          });
        }}
      >
        <BlockBody>
          <TextField
            label="Name"
            name="project-name"
            placeholder="Acme website"
            autoComplete="off"
          />
          <ComboBox
            label="Template"
            name="template"
            options={templates}
            defaultValue="dashboard"
          />
          <Switch defaultChecked description="They get access right away.">
            Invite the team
          </Switch>
        </BlockBody>
        <BlockFooter className="justify-end border-t border-border/70 pt-4">
          <Button type="submit">Create project</Button>
        </BlockFooter>
      </Form>
    </Block>
  );
}
