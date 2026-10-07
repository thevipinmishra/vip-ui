"use client";

import { useState } from "react";
import {
  Archive,
  Copy,
  Edit,
  Eye,
  Link as LinkIcon,
  More,
  UserAdd,
} from "reicon-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Kbd } from "@/components/ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { TextField } from "@/components/ui/text-field";

const iconClass = "shrink-0 text-muted-foreground";

export function MenuDemo() {
  const [name, setName] = useState("Autumn campaign");
  const [renaming, setRenaming] = useState(false);
  const [status, setStatus] = useState("Draft · Not reviewed");

  return (
    <div className="flex w-full min-w-0 max-w-sm flex-col items-start gap-3">
      <div className="flex w-full min-w-0 flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground" aria-live="polite">
            {status}
          </p>
        </div>
        <MenuTrigger>
          <Button variant="outline">
            <More size={16} aria-hidden="true" />
            Project actions
          </Button>
          <MenuPopover>
            <MenuContent aria-label="Project actions">
              <MenuItem href="/examples/repository">
                <Eye size={16} aria-hidden="true" className={iconClass} />
                View project
              </MenuItem>
              <MenuItem onAction={() => setRenaming(true)}>
                <Edit size={16} aria-hidden="true" className={iconClass} />
                Rename
              </MenuItem>
              <MenuItem
                onAction={() =>
                  setStatus(`Duplicated "${name}" as a new draft`)
                }
              >
                <Copy size={16} aria-hidden="true" className={iconClass} />
                <span className="min-w-0 flex-1">Duplicate</span>
                <Kbd>Ctrl D</Kbd>
              </MenuItem>
              <MenuItem
                onAction={() => setStatus("Link copied for Autumn campaign")}
              >
                <LinkIcon size={16} aria-hidden="true" className={iconClass} />
                <span className="min-w-0 flex-1">Copy link</span>
                <Kbd>Ctrl L</Kbd>
              </MenuItem>
              <MenuItem href="/examples/business">
                <UserAdd size={16} aria-hidden="true" className={iconClass} />
                Invite teammate
              </MenuItem>
              <MenuSeparator />
              <MenuItem
                onAction={() => {
                  setRenaming(false);
                  setStatus("Archived. Restore it from the project list.");
                }}
              >
                <Archive size={16} aria-hidden="true" className={iconClass} />
                Archive
              </MenuItem>
            </MenuContent>
          </MenuPopover>
        </MenuTrigger>
      </div>
      {renaming ? (
        <Form
          className="w-full gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            const next = name.trim();
            if (!next) return;
            setName(next);
            setRenaming(false);
            setStatus("Name saved");
          }}
        >
          <TextField
            label="Project name"
            name="name"
            value={name}
            onChange={setName}
            isRequired
          />
          <Button type="submit" size="sm">
            Save name
          </Button>
        </Form>
      ) : null}
    </div>
  );
}
