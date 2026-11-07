"use client";

import {
  DotsThreeIcon,
  EnvelopeSimpleIcon,
  PaperPlaneTiltIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Avatar } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../vip-ui/card";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../vip-ui/dialog";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "../../vip-ui/menu";
import { PresenceList } from "../../vip-ui/presence-list";
import { SearchField } from "../../vip-ui/search-field";
import { Select } from "../../vip-ui/select";
import { showToast } from "../../vip-ui/toast";
import {
  TagFieldValue,
  Token,
  TokenField,
  TokenFieldDescription,
  TokenFieldInput,
  TokenFieldLabel,
} from "../../vip-ui/token-field";
import { cn } from "../../vip-ui/utils";

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
  lastActive?: string;
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Maya Chen",
    email: "maya@northwind.com",
    role: "owner",
    lastActive: "Active now",
  },
  {
    id: "2",
    name: "Leo Park",
    email: "leo@northwind.com",
    role: "admin",
    lastActive: "Active 2 h ago",
  },
  {
    id: "3",
    name: "Ana Souza",
    email: "ana@northwind.com",
    role: "member",
    lastActive: "Active yesterday",
  },
  {
    id: "4",
    name: "Kwame Mensah",
    email: "kwame@northwind.com",
    role: "member",
    lastActive: "Active Oct 28",
  },
  { id: "5", email: "sam@contractor.dev", role: "viewer", invited: true },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function emailsIn(value: TagFieldValue) {
  return value.segments.map((segment) => segment.text.trim()).filter(Boolean);
}

export function TeamMembers() {
  const [members, setMembers] = useState(initialMembers);
  const [invites, setInvites] = useState(() => new TagFieldValue([]));
  const [role, setRole] = useState("member");
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [removing, setRemoving] = useState<Member | null>(null);
  const shown = members.filter((member) =>
    `${member.name ?? ""} ${member.email}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  function invite() {
    const emails = [...new Set(emailsIn(invites))];
    if (emails.length === 0) {
      setError("Enter at least one email address.");
      return;
    }
    const invalid = emails.filter((email) => !emailPattern.test(email));
    if (invalid.length > 0) {
      setError(`Check ${invalid.join(", ")}. It is not an email address.`);
      return;
    }
    const existing = emails.filter((email) =>
      members.some((member) => member.email === email),
    );
    if (existing.length > 0) {
      setError(`${existing.join(", ")} is already on the team.`);
      return;
    }
    setMembers((current) => [
      ...current,
      ...emails.map((email) => ({
        id: crypto.randomUUID(),
        email,
        role,
        invited: true,
      })),
    ]);
    setInvites(new TagFieldValue([]));
    setError("");
    showToast({
      title:
        emails.length === 1
          ? `We sent an invite to ${emails[0]}`
          : `We sent ${emails.length} invites`,
      variant: "success",
    });
  }

  function remove(member: Member) {
    setMembers((current) => current.filter((item) => item.id !== member.id));
    showToast({
      title: member.invited
        ? `The invite to ${member.email} is canceled`
        : `${member.name} is removed from the team`,
      action: {
        label: "Undo",
        onAction: () =>
          setMembers((current) =>
            current.some((item) => item.id === member.id)
              ? current
              : [...current, member],
          ),
      },
    });
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
        <div className="grid items-start gap-3 sm:grid-cols-[minmax(0,1fr)_10rem_auto]">
          <TokenField
            value={invites}
            onChange={(value) => {
              setInvites(value);
              setError("");
            }}
            onSubmit={() => setInvites(invites.commit())}
          >
            <TokenFieldLabel className="sr-only">
              Email addresses
            </TokenFieldLabel>
            <TokenFieldInput placeholder="name@company.com, …">
              {(segment) => (
                <Token
                  className={cn(
                    !emailPattern.test(segment.text) &&
                      "bg-destructive/10 text-destructive",
                  )}
                >
                  {segment.text}
                </Token>
              )}
            </TokenFieldInput>
            <TokenFieldDescription className={cn(error && "text-destructive")}>
              {error || "Press Enter or type a comma after each address."}
            </TokenFieldDescription>
          </TokenField>
          <Select
            aria-label="Role for new members"
            options={roles.filter((item) => item.id !== "owner")}
            value={role}
            onValueChange={setRole}
          />
          <Button onPress={invite}>
            <PaperPlaneTiltIcon size={16} aria-hidden="true" />
            Invite
          </Button>
        </div>
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-medium">
              {members.length} {members.length === 1 ? "person" : "people"}
            </h2>
            <SearchField
              aria-label="Search members"
              placeholder="Search members"
              value={query}
              onChange={setQuery}
              className="w-full sm:w-64"
            />
          </div>
          <div className="-mx-5 border-t border-border/70">
            {shown.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                No members match “{query.trim()}”.
              </p>
            ) : (
              <PresenceList
                items={shown}
                getKey={(member) => member.id}
                aria-label="Members"
                className="gap-0 divide-y divide-border/70"
              >
                {(member) => (
                  <MemberRow
                    member={member}
                    onRoleChange={(next) =>
                      setMembers((current) =>
                        current.map((item) =>
                          item.id === member.id
                            ? { ...item, role: next }
                            : item,
                        ),
                      )
                    }
                    onResend={() =>
                      showToast({
                        title: `We sent the invite to ${member.email} again`,
                      })
                    }
                    onRemove={() =>
                      member.invited ? remove(member) : setRemoving(member)
                    }
                  />
                )}
              </PresenceList>
            )}
          </div>
        </div>
      </CardContent>
      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{
          isOpen: removing !== null,
          onOpenChange: (open) => {
            if (!open) setRemoving(null);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle>Remove {removing?.name}?</DialogTitle>
          <DialogDescription>
            They lose access to the workspace now. Their projects and comments
            stay.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline">Cancel</DialogClose>
          <Button
            variant="destructive"
            onPress={() => {
              if (removing) remove(removing);
              setRemoving(null);
            }}
          >
            Remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Card>
  );
}

function MemberRow({
  member,
  onRoleChange,
  onResend,
  onRemove,
}: {
  member: Member;
  onRoleChange: (role: string) => void;
  onResend: () => void;
  onRemove: () => void;
}) {
  const label = member.name ?? member.email;
  const owner = member.role === "owner";

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-3 bg-card px-5 py-3">
      {member.invited ? (
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground ring-1 ring-border/70"
        >
          <EnvelopeSimpleIcon size={18} />
        </span>
      ) : (
        <Avatar name={label} />
      )}
      <div className="min-w-[9rem] flex-1">
        <p className="flex min-w-0 items-center gap-2 text-sm font-medium">
          <span className="truncate">{label}</span>
          {member.invited && (
            <Badge variant="warning" className="min-h-5 shrink-0 py-0">
              Invited
            </Badge>
          )}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {member.name
            ? `${member.email} · ${member.lastActive}`
            : "Invite sent. It expires in 7 days."}
        </p>
      </div>
      <Select
        aria-label={`Role for ${label}`}
        options={roles}
        value={member.role}
        isDisabled={owner}
        onValueChange={onRoleChange}
        className="w-36 max-sm:ms-14 [&_[data-slot=select-trigger]]:min-h-10"
      />
      <MenuTrigger>
        <Button
          variant="ghost"
          iconOnly
          aria-label={`Actions for ${label}`}
          isDisabled={owner}
          className="size-10"
        >
          <DotsThreeIcon size={20} weight="bold" aria-hidden="true" />
        </Button>
        <MenuPopover placement="bottom end">
          <MenuContent aria-label={`Actions for ${label}`}>
            {member.invited && (
              <MenuItem onAction={onResend}>
                <PaperPlaneTiltIcon size={16} aria-hidden="true" />
                Send invite again
              </MenuItem>
            )}
            <MenuItem variant="destructive" onAction={onRemove}>
              <TrashIcon size={16} aria-hidden="true" />
              {member.invited ? "Cancel invite" : "Remove from team"}
            </MenuItem>
          </MenuContent>
        </MenuPopover>
      </MenuTrigger>
    </div>
  );
}
