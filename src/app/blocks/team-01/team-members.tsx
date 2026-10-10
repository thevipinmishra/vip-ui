"use client";

import {
  DotsThreeIcon,
  EnvelopeSimpleIcon,
  PaperPlaneTiltIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";
import { Select } from "@/components/ui/select";
import { TextField } from "@/components/ui/text-field";

const roles = [
  { id: "owner", name: "Owner", description: "Full access and billing" },
  { id: "admin", name: "Admin", description: "Manage people and settings" },
  { id: "member", name: "Member", description: "Create and edit work" },
  { id: "viewer", name: "Viewer", description: "Read only" },
];

interface Member {
  id: string;
  name?: string;
  email: string;
  role: string;
  invited?: boolean;
}

const initialMembers: Member[] = [
  { id: "1", name: "Maya Chen", email: "maya@northwind.com", role: "owner" },
  { id: "2", name: "Leo Park", email: "leo@northwind.com", role: "admin" },
  { id: "3", name: "Ana Souza", email: "ana@northwind.com", role: "member" },
  { id: "4", email: "sam@contractor.dev", role: "viewer", invited: true },
];

export function TeamMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [notice, setNotice] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  function remove(member: Member) {
    setMembers((current) => current.filter((item) => item.id !== member.id));
    setNotice(
      member.invited
        ? `The invite to ${member.email} is canceled.`
        : `${member.name} is removed from the team.`,
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h1" className="text-xl">
          Team members
        </CardTitle>
        <CardDescription>
          Invite people and set what each person can do.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Form
            ref={formRef}
            className="grid items-start gap-3 sm:grid-cols-[minmax(0,1fr)_10rem_auto]"
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const email = String(data.get("email"));
              if (members.some((member) => member.email === email)) {
                setNotice(`${email} is already on the team.`);
                return;
              }
              setMembers((current) => [
                ...current,
                {
                  id: crypto.randomUUID(),
                  email,
                  role: String(data.get("role") || "member"),
                  invited: true,
                },
              ]);
              setNotice(`We sent an invite to ${email}.`);
              formRef.current?.reset();
            }}
          >
            <TextField
              aria-label="Email address"
              name="email"
              type="email"
              placeholder="name@company.com"
              isRequired
            />
            <Select
              aria-label="Role"
              name="role"
              options={roles.filter((role) => role.id !== "owner")}
              defaultValue="member"
            />
            <Button type="submit">
              <PaperPlaneTiltIcon size={16} aria-hidden="true" />
              Invite
            </Button>
          </Form>
          <output className="block min-h-5 text-sm text-muted-foreground">
            {notice}
          </output>
        </div>
        <ul className="-mx-6 divide-y divide-border/70 border-t border-border/70">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex flex-wrap items-center gap-x-4 gap-y-3 px-6 py-4"
            >
              {member.invited ? (
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground ring-1 ring-border/70"
                >
                  <EnvelopeSimpleIcon size={18} />
                </span>
              ) : (
                <Avatar name={member.name ?? member.email} />
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 truncate text-sm font-medium">
                  {member.name ?? member.email}
                  {member.invited && (
                    <Badge variant="warning" className="min-h-5 py-0">
                      Invited
                    </Badge>
                  )}
                </p>
                {member.name && (
                  <p className="truncate text-xs text-muted-foreground">
                    {member.email}
                  </p>
                )}
              </div>
              <Select
                aria-label={`Role for ${member.name ?? member.email}`}
                options={roles}
                value={member.role}
                isDisabled={member.role === "owner"}
                onValueChange={(role) =>
                  setMembers((current) =>
                    current.map((item) =>
                      item.id === member.id ? { ...item, role } : item,
                    ),
                  )
                }
                className="w-36 [&_[data-slot=select-trigger]]:min-h-10"
              />
              <MenuTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Actions for ${member.name ?? member.email}`}
                  isDisabled={member.role === "owner"}
                  className="size-10"
                >
                  <DotsThreeIcon size={20} weight="bold" aria-hidden="true" />
                </Button>
                <MenuPopover placement="bottom end">
                  <MenuContent aria-label="Member actions">
                    {member.invited && (
                      <MenuItem
                        onAction={() =>
                          setNotice(
                            `We sent the invite to ${member.email} again.`,
                          )
                        }
                      >
                        <PaperPlaneTiltIcon size={16} aria-hidden="true" />
                        Send invite again
                      </MenuItem>
                    )}
                    <MenuItem
                      onAction={() => remove(member)}
                      className="text-destructive"
                    >
                      <TrashIcon size={16} aria-hidden="true" />
                      {member.invited ? "Cancel invite" : "Remove from team"}
                    </MenuItem>
                  </MenuContent>
                </MenuPopover>
              </MenuTrigger>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
