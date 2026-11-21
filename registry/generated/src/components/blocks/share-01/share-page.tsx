"use client";

import {
  BuildingsIcon,
  CaretDownIcon,
  FileTextIcon,
  GlobeHemisphereWestIcon,
  LockSimpleIcon,
  QrCodeIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Avatar, AvatarGroup } from "../../vip-ui/avatar";
import { Badge } from "../../vip-ui/badge";
import { Button } from "../../vip-ui/button";
import { CopyButton } from "../../vip-ui/copy-button";
import {
  DialogBody,
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
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "../../vip-ui/menu";
import {
  Popover,
  PopoverDescription,
  PopoverDialog,
  PopoverTitle,
  PopoverTrigger,
} from "../../vip-ui/popover";
import { QrCode } from "../../vip-ui/qr-code";
import { Select } from "../../vip-ui/select";
import { showToast } from "../../vip-ui/toast";
import {
  TagFieldValue,
  Token,
  TokenField,
  TokenFieldInput,
  TokenFieldLabel,
} from "../../vip-ui/token-field";
import { cn } from "../../vip-ui/utils";
import {
  currentUser,
  documentLink,
  documentTitle,
  type GeneralAccess,
  generalAccessOptions,
  initialPeople,
  type Person,
  type Role,
  roleName,
  roles,
} from "./data";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const accessIcons = {
  restricted: LockSimpleIcon,
  organization: BuildingsIcon,
  public: GlobeHemisphereWestIcon,
} satisfies Record<GeneralAccess, unknown>;

function RoleMenu({
  person,
  onRoleChange,
  onRemove,
}: {
  person: Person;
  onRoleChange: (role: Role) => void;
  onRemove: () => void;
}) {
  const label = person.name ?? person.email;
  return (
    <MenuTrigger>
      <Button
        variant="ghost"
        size="sm"
        aria-label={`Access for ${label}: ${roleName(person.role)}`}
        className="text-muted-foreground"
      >
        {roleName(person.role)}
        <CaretDownIcon data-icon="inline-end" size={14} aria-hidden="true" />
      </Button>
      <MenuPopover placement="bottom end">
        <MenuContent
          aria-label={`Access for ${label}`}
          onAction={(key) => {
            if (key === "remove") onRemove();
          }}
        >
          <MenuSection
            selectionMode="single"
            disallowEmptySelection
            selectedKeys={[person.role]}
            onSelectionChange={(keys: Selection) => {
              const [key] = keys === "all" ? [] : [...keys];
              if (key === "edit" || key === "comment" || key === "view") {
                onRoleChange(key);
              }
            }}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} id={role.id} textValue={role.name}>
                <span className="grid">
                  {role.name}
                  <span className="text-xs text-muted-foreground">
                    {role.description}
                  </span>
                </span>
              </MenuItem>
            ))}
          </MenuSection>
          <MenuSeparator />
          <MenuSection>
            <MenuItem id="remove" variant="destructive">
              Remove access
            </MenuItem>
          </MenuSection>
        </MenuContent>
      </MenuPopover>
    </MenuTrigger>
  );
}

export function SharePage() {
  const [open, setOpen] = useState(true);
  const [people, setPeople] = useState(initialPeople);
  const [invites, setInvites] = useState(() => new TagFieldValue([]));
  const [inviteRole, setInviteRole] = useState<Role>("edit");
  const [inviteError, setInviteError] = useState("");
  const [access, setAccess] = useState<GeneralAccess>("organization");
  const [linkRole, setLinkRole] = useState<Role>("view");

  const AccessIcon = accessIcons[access];
  const accessOption = generalAccessOptions.find((item) => item.id === access);
  const shared = people.filter((person) => person.role !== "owner");

  function invite() {
    const committed = invites.commit();
    const emails = committed.segments
      .map((segment) => segment.text.trim().toLowerCase())
      .filter(Boolean);
    if (emails.length === 0) {
      setInviteError("Enter an email address.");
      return;
    }
    const invalid = emails.filter((email) => !emailPattern.test(email));
    if (invalid.length > 0) {
      setInvites(committed);
      setInviteError(
        invalid.length === 1
          ? `${invalid[0]} is not a valid email address.`
          : `${invalid.length} addresses are not valid.`,
      );
      return;
    }
    const known = new Set(people.map((person) => person.email));
    const added = [...new Set(emails)].filter((email) => !known.has(email));
    setPeople((current) => [
      ...current,
      ...added.map((email) => ({ email, role: inviteRole, invited: true })),
    ]);
    setInvites(new TagFieldValue([]));
    setInviteError("");
    if (added.length === 0) {
      showToast({ title: "These people already have access" });
      return;
    }
    showToast({
      title:
        added.length === 1
          ? `${added[0]} invited`
          : `${added.length} people invited`,
      description: `They get an email with a link to ${documentTitle}.`,
      variant: "success",
    });
  }

  function setRole(email: string, role: Role) {
    setPeople((current) =>
      current.map((person) =>
        person.email === email ? { ...person, role } : person,
      ),
    );
  }

  function remove(person: Person) {
    const snapshot = people;
    setPeople((current) =>
      current.filter((item) => item.email !== person.email),
    );
    showToast({
      title: `${person.name ?? person.email} removed`,
      action: { label: "Undo", onAction: () => setPeople(snapshot) },
    });
  }

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b border-border/70 bg-card">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-2.5 px-4 sm:px-6">
          <FileTextIcon
            size={20}
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="truncate text-sm font-medium">{documentTitle}</span>
          <div className="ms-auto flex items-center gap-3">
            <AvatarGroup className="max-sm:hidden">
              {shared
                .filter((person) => person.name)
                .map((person) => (
                  <Avatar
                    key={person.email}
                    name={person.name ?? person.email}
                    size="xs"
                  />
                ))}
            </AvatarGroup>
            <Button size="sm" onPress={() => setOpen(true)}>
              <ShareNetworkIcon
                data-icon="inline-start"
                size={16}
                aria-hidden="true"
              />
              Share
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-2xl gap-4 px-4 py-12 text-pretty sm:px-6">
        <p className="text-sm text-muted-foreground">
          Edited by Amara Osei on Oct 27
        </p>
        <h1 className="text-3xl font-semibold tracking-[-0.04em]">
          {documentTitle}
        </h1>
        <p className="leading-7">
          We launch the new workspace plans on November 18. This plan lists the
          work for each team, the owners, and the dates we cannot move.
        </p>
        <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em]">Goals</h2>
        <ul className="grid list-disc gap-2 ps-5 leading-7">
          <li>Move 40% of current teams to a workspace plan by December 31.</li>
          <li>Keep support wait times below four hours during launch week.</li>
          <li>Publish the pricing page and help articles on launch day.</li>
        </ul>
        <h2 className="mt-4 text-lg font-semibold tracking-[-0.02em]">
          Timeline
        </h2>
        <p className="leading-7">
          Design freeze is on November 4. Sales training starts on November 10.
          The launch email goes out at 9:00 AM Eastern on November 18.
        </p>
      </main>

      <DialogContent
        size="md"
        overlayProps={{ isOpen: open, onOpenChange: setOpen }}
      >
        <DialogHeader>
          <DialogTitle>Share “{documentTitle}”</DialogTitle>
          <DialogDescription>
            {shared.length} {shared.length === 1 ? "person has" : "people have"}{" "}
            access.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid grid-cols-1 gap-6">
          <div className="grid gap-2">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 sm:grid-cols-[minmax(0,1fr)_9rem_auto] sm:items-start">
              <TokenField
                value={invites}
                onChange={(value) => {
                  setInvites(value);
                  setInviteError("");
                }}
                onSubmit={() => setInvites(invites.commit())}
                aria-describedby={inviteError ? "invite-error" : undefined}
                className="col-span-2 sm:col-span-1"
              >
                <TokenFieldLabel className="sr-only">
                  Email addresses
                </TokenFieldLabel>
                <TokenFieldInput placeholder="Add emails">
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
              </TokenField>
              <Select
                aria-label="Access for new people"
                options={roles.map((role) => ({
                  id: role.id,
                  name: role.name,
                }))}
                value={inviteRole}
                onChange={(key) => setInviteRole(key as Role)}
              />
              <Button onPress={invite}>Invite</Button>
            </div>
            {inviteError && (
              <p
                id="invite-error"
                role="alert"
                className="text-sm text-destructive"
              >
                {inviteError}
              </p>
            )}
          </div>

          <section
            aria-labelledby="share-people"
            className="grid grid-cols-1 gap-1"
          >
            <h3 id="share-people" className="text-sm font-medium">
              People with access
            </h3>
            <ul className="-mx-2 grid grid-cols-1">
              {people.map((person) => (
                <li
                  key={person.email}
                  className="flex items-center gap-3 rounded-md px-2 py-2"
                >
                  <Avatar name={person.name ?? person.email} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      <span className="truncate">
                        {person.name ?? person.email}
                        {person.email === currentUser && (
                          <span className="font-normal text-muted-foreground">
                            {" "}
                            (you)
                          </span>
                        )}
                      </span>
                      {person.invited && <Badge>Invited</Badge>}
                      {!person.email.endsWith("@lumendocs.app") && (
                        <Badge variant="warning">Guest</Badge>
                      )}
                    </p>
                    {person.name && (
                      <p className="truncate text-xs text-muted-foreground">
                        {person.email}
                      </p>
                    )}
                  </div>
                  {person.role === "owner" ? (
                    <span className="px-3 text-sm text-muted-foreground">
                      Owner
                    </span>
                  ) : (
                    <RoleMenu
                      person={person}
                      onRoleChange={(role) => setRole(person.email, role)}
                      onRemove={() => remove(person)}
                    />
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="share-general" className="grid gap-2.5">
            <h3 id="share-general" className="text-sm font-medium">
              General access
            </h3>
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full",
                  access === "restricted"
                    ? "bg-secondary text-muted-foreground"
                    : "bg-success-subtle text-success-foreground",
                )}
              >
                <AccessIcon size={16} aria-hidden="true" />
              </span>
              <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-[minmax(0,1fr)_9.5rem]">
                <Select
                  aria-label="Who can open the link"
                  size="sm"
                  options={generalAccessOptions.map((item) => ({
                    id: item.id,
                    name: item.name,
                  }))}
                  value={access}
                  onChange={(key) => setAccess(key as GeneralAccess)}
                />
                {access !== "restricted" && (
                  <Select
                    aria-label="Access for the link"
                    size="sm"
                    options={roles
                      .filter((role) => role.id !== "edit")
                      .map((role) => ({ id: role.id, name: role.name }))}
                    value={linkRole}
                    onChange={(key) => setLinkRole(key as Role)}
                  />
                )}
                <p className="text-xs text-muted-foreground sm:col-span-2">
                  {accessOption?.description}
                </p>
              </div>
            </div>
          </section>
        </DialogBody>
        <DialogFooter className="sm:justify-between">
          <div className="flex gap-2">
            <CopyButton value={documentLink} variant="outline">
              {(status) =>
                status === "copied"
                  ? "Link copied"
                  : status === "error"
                    ? "Copy failed"
                    : "Copy link"
              }
            </CopyButton>
            <PopoverTrigger>
              <Button variant="outline" iconOnly aria-label="Show QR code">
                <QrCodeIcon aria-hidden="true" />
              </Button>
              <Popover placement="top start" className="w-64">
                <PopoverDialog className="grid justify-items-center gap-3 text-center">
                  <div>
                    <PopoverTitle>Scan to open</PopoverTitle>
                    <PopoverDescription>
                      {access === "restricted"
                        ? "Only people with access can open it."
                        : accessOption?.name}
                    </PopoverDescription>
                  </div>
                  <QrCode
                    value={documentLink}
                    label={`QR code for ${documentTitle}`}
                    download={{ fileName: "q4-launch-plan-qr.png" }}
                  />
                </PopoverDialog>
              </Popover>
            </PopoverTrigger>
          </div>
          <DialogClose variant="default">Done</DialogClose>
        </DialogFooter>
      </DialogContent>
    </div>
  );
}
