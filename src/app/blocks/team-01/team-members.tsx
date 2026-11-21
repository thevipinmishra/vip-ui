"use client";

import {
  DotsThreeIcon,
  EnvelopeSimpleIcon,
  PaperPlaneTiltIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
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
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuTrigger,
} from "@/components/ui/menu";
import { PresenceList } from "@/components/ui/presence-list";
import { SearchField } from "@/components/ui/search-field";
import { Select } from "@/components/ui/select";
import { showToast } from "@/components/ui/toast";
import {
  TagFieldValue,
  Token,
  TokenField,
  TokenFieldDescription,
  TokenFieldInput,
  TokenFieldLabel,
} from "@/components/ui/token-field";
import { cn } from "@/lib/utils";

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
  title?: string;
  invited?: boolean;
  invitedOn?: string;
  expires?: string;
  twoStep?: boolean;
  lastActive?: string;
}

const seatLimit = 20;

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Maya Chen",
    email: "maya@northwind.com",
    role: "owner",
    title: "Head of Product",
    twoStep: true,
    lastActive: "Active now",
  },
  {
    id: "2",
    name: "Leo Park",
    email: "leo@northwind.com",
    role: "admin",
    title: "Engineering Manager",
    twoStep: true,
    lastActive: "Active 2 h ago",
  },
  {
    id: "3",
    name: "Ana Souza",
    email: "ana@northwind.com",
    role: "admin",
    title: "Operations",
    twoStep: true,
    lastActive: "Active 20 min ago",
  },
  {
    id: "4",
    name: "Kwame Mensah",
    email: "kwame@northwind.com",
    role: "member",
    title: "Staff Engineer",
    twoStep: true,
    lastActive: "Active now",
  },
  {
    id: "5",
    name: "Priya Raman",
    email: "priya@northwind.com",
    role: "member",
    title: "Product Designer",
    twoStep: true,
    lastActive: "Active 1 h ago",
  },
  {
    id: "6",
    name: "Tomás Herrera",
    email: "tomas@northwind.com",
    role: "member",
    title: "Frontend Engineer",
    twoStep: false,
    lastActive: "Active 3 h ago",
  },
  {
    id: "7",
    name: "Hannah Weber",
    email: "hannah@northwind.com",
    role: "member",
    title: "Backend Engineer",
    twoStep: true,
    lastActive: "Active yesterday",
  },
  {
    id: "8",
    name: "Jun Watanabe",
    email: "jun@northwind.com",
    role: "member",
    title: "Data Analyst",
    twoStep: true,
    lastActive: "Active yesterday",
  },
  {
    id: "9",
    name: "Grace Okafor",
    email: "grace@northwind.com",
    role: "member",
    title: "Support Lead",
    twoStep: false,
    lastActive: "Active Oct 27",
  },
  {
    id: "10",
    name: "Elif Demir",
    email: "elif@northwind.com",
    role: "member",
    title: "QA Engineer",
    twoStep: true,
    lastActive: "Active Oct 26",
  },
  {
    id: "11",
    name: "Marco Bianchi",
    email: "marco@agency.studio",
    role: "viewer",
    title: "Brand contractor",
    twoStep: false,
    lastActive: "Active Oct 14",
  },
  {
    id: "12",
    name: "Nadia Haddad",
    email: "nadia@northwind.com",
    role: "viewer",
    title: "Finance",
    twoStep: true,
    lastActive: "Active Oct 9",
  },
  {
    id: "13",
    email: "sam@contractor.dev",
    role: "viewer",
    invited: true,
    invitedOn: "Oct 28",
    expires: "Nov 4",
  },
  {
    id: "14",
    email: "olu@northwind.com",
    role: "member",
    invited: true,
    invitedOn: "Oct 29",
    expires: "Nov 5",
  },
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
  const [roleFilter, setRoleFilter] = useState("all");
  const [removing, setRemoving] = useState<Member | null>(null);
  const shown = members.filter(
    (member) =>
      (roleFilter === "all" || member.role === roleFilter) &&
      `${member.name ?? ""} ${member.email} ${member.title ?? ""}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  const active = members.filter((member) => !member.invited);
  const pending = members.length - active.length;
  const protectedCount = active.filter((member) => member.twoStep).length;
  const admins = active.filter(
    (member) => member.role === "owner" || member.role === "admin",
  ).length;

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
    if (members.length + emails.length > seatLimit) {
      setError(
        `Your plan has ${seatLimit} seats. Remove a person or add seats first.`,
      );
      return;
    }
    setMembers((current) => [
      ...current,
      ...emails.map((email) => ({
        id: crypto.randomUUID(),
        email,
        role,
        invited: true,
        invitedOn: "Oct 30",
        expires: "Nov 6",
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
        <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-lg bg-muted/50 p-4 ring-1 ring-border/70 ring-inset sm:grid-cols-4">
          <div className="grid gap-2">
            <dt className="text-xs text-muted-foreground">Seats</dt>
            <dd className="grid gap-2">
              <span className="text-sm font-medium tabular-nums">
                {members.length} of {seatLimit} used
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 overflow-hidden rounded-full bg-secondary"
              >
                <span
                  className="block h-full rounded-full bg-primary"
                  style={{ width: `${(members.length / seatLimit) * 100}%` }}
                />
              </span>
            </dd>
          </div>
          <div className="grid gap-1">
            <dt className="text-xs text-muted-foreground">Admins</dt>
            <dd className="text-sm font-medium tabular-nums">
              {admins} of {active.length} people
            </dd>
          </div>
          <div className="grid gap-1">
            <dt className="text-xs text-muted-foreground">Pending invites</dt>
            <dd className="text-sm font-medium tabular-nums">{pending}</dd>
          </div>
          <div className="grid gap-1">
            <dt className="text-xs text-muted-foreground">Two-step sign-in</dt>
            <dd className="text-sm font-medium tabular-nums">
              {protectedCount} of {active.length} people
            </dd>
          </div>
        </dl>
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
            onChange={(key) => setRole(String(key))}
          />
          <Button onPress={invite}>
            <PaperPlaneTiltIcon
              data-icon="inline-start"
              size={16}
              aria-hidden="true"
            />
            Invite
          </Button>
        </div>
        <div className="grid gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-sm font-medium">
              {members.length} {members.length === 1 ? "person" : "people"}
            </h2>
            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <Select
                aria-label="Filter by role"
                options={[{ id: "all", name: "All roles" }, ...roles]}
                value={roleFilter}
                onChange={(key) => setRoleFilter(String(key))}
                className="w-36"
              />
              <SearchField
                aria-label="Search members"
                placeholder="Name, email, or title"
                value={query}
                onChange={setQuery}
                className="min-w-0 flex-1 sm:w-64 sm:flex-none"
              />
            </div>
          </div>
          <div className="-mx-5 border-t border-border/70">
            {shown.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-muted-foreground">
                No members match these filters.
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
          {!member.invited && !member.twoStep && (
            <Badge variant="outline" className="min-h-5 shrink-0 py-0">
              No two-step
            </Badge>
          )}
        </p>
        <p className="truncate text-xs text-muted-foreground">
          {member.name
            ? `${member.title} · ${member.email} · ${member.lastActive}`
            : `Invited ${member.invitedOn} · Expires ${member.expires}`}
        </p>
      </div>
      <Select
        aria-label={`Role for ${label}`}
        options={roles}
        value={member.role}
        isDisabled={owner}
        onChange={(key) => onRoleChange(String(key))}
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
