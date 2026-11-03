"use client";

import { CalendarDate } from "@internationalized/date";
import {
  ArrowsClockwiseIcon,
  CopyIcon,
  DotsThreeIcon,
  KeyIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "../../../components/vip-ui/alert";
import { Badge } from "../../../components/vip-ui/badge";
import { Button } from "../../../components/vip-ui/button";
import { Checkbox } from "../../../components/vip-ui/checkbox";
import { CheckboxGroup } from "../../../components/vip-ui/checkbox-group";
import { CopyButton } from "../../../components/vip-ui/copy-button";
import { DatePicker } from "../../../components/vip-ui/date-picker";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/vip-ui/dialog";
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateDescription,
  EmptyStateIcon,
  EmptyStateTitle,
} from "../../../components/vip-ui/empty-state";
import { Form } from "../../../components/vip-ui/form";
import { InlineCode } from "../../../components/vip-ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "../../../components/vip-ui/menu";
import { SearchField } from "../../../components/vip-ui/search-field";
import { Select } from "../../../components/vip-ui/select";
import { Spinner } from "../../../components/vip-ui/spinner";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "../../../components/vip-ui/table";
import { TextField } from "../../../components/vip-ui/text-field";
import { showToast } from "../../../components/vip-ui/toast";
import { SettingsShell } from "./settings-shell";

const scopes = [
  {
    id: "events:write",
    label: "Write events",
    detail: "Send events and properties.",
  },
  {
    id: "metrics:read",
    label: "Read metrics",
    detail: "Read usage and retention data.",
  },
  {
    id: "customers:read",
    label: "Read customers",
    detail: "Read profiles and segments.",
  },
  {
    id: "webhooks:manage",
    label: "Manage webhooks",
    detail: "Create and remove endpoints.",
  },
];

type KeyStatus = "active" | "expired" | "revoked";
type Environment = "live" | "test";

interface ApiKey {
  id: string;
  name: string;
  environment: Environment;
  prefix: string;
  scopes: string[];
  createdAt: string;
  lastUsed: string | null;
  expires: string;
  status: KeyStatus;
}

const initialKeys: ApiKey[] = [
  {
    id: "production-ingest",
    name: "Production ingest",
    environment: "live",
    prefix: "ksk_live_7f3a…c91b",
    scopes: ["events:write", "metrics:read"],
    createdAt: "2026-10-02",
    lastUsed: "2026-11-03T09:41:00Z",
    expires: "2027-11-02",
    status: "active",
  },
  {
    id: "warehouse-sync",
    name: "Warehouse sync",
    environment: "live",
    prefix: "ksk_live_2b8d…41aa",
    scopes: ["metrics:read", "customers:read"],
    createdAt: "2026-09-14",
    lastUsed: "2026-11-03T07:20:00Z",
    expires: "2027-01-31",
    status: "active",
  },
  {
    id: "zapier-bridge",
    name: "Zapier bridge",
    environment: "live",
    prefix: "ksk_live_9c14…7e02",
    scopes: ["events:write"],
    createdAt: "2026-08-21",
    lastUsed: "2026-10-29T15:05:00Z",
    expires: "2026-12-15",
    status: "active",
  },
  {
    id: "legacy-dashboard",
    name: "Legacy dashboard",
    environment: "test",
    prefix: "ksk_test_5a60…d3f8",
    scopes: ["metrics:read"],
    createdAt: "2026-06-01",
    lastUsed: "2026-08-14T11:32:00Z",
    expires: "2026-09-30",
    status: "expired",
  },
  {
    id: "mobile-beta",
    name: "Mobile beta",
    environment: "test",
    prefix: "ksk_test_c19e…8b57",
    scopes: ["events:write", "customers:read"],
    createdAt: "2026-10-27",
    lastUsed: null,
    expires: "2027-04-30",
    status: "active",
  },
  {
    id: "old-cli-token",
    name: "Old CLI token",
    environment: "live",
    prefix: "ksk_live_71bd…0c44",
    scopes: ["metrics:read"],
    createdAt: "2025-11-19",
    lastUsed: "2026-09-02T10:10:00Z",
    expires: "2026-11-19",
    status: "revoked",
  },
];

const dayFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const usedFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

function formatDay(value: string) {
  return dayFormat.format(new Date(`${value}T00:00:00Z`));
}

function formatUsed(value: string) {
  return usedFormat.format(new Date(value));
}

function makeSecret(environment: Environment) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
  const body = Array.from({ length: 32 }, () =>
    alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
  ).join("");
  return `ksk_${environment}_${body}`;
}

function prefixOf(secret: string) {
  const [, environment, body] = secret.split("_");
  return `ksk_${environment}_${body.slice(0, 4)}…${body.slice(-4)}`;
}

const statusOptions = [
  { id: "all", name: "All statuses" },
  { id: "active", name: "Active" },
  { id: "expired", name: "Expired" },
  { id: "revoked", name: "Revoked" },
];

const statusBadge = {
  active: "success",
  expired: "warning",
  revoked: "neutral",
} as const;

function scopeLabel(id: string) {
  return scopes.find((scope) => scope.id === id)?.label ?? id;
}

export function ApiKeysSettings() {
  const [keys, setKeys] = useState(initialKeys);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [selectedScopes, setSelectedScopes] = useState<string[]>([
    "events:write",
  ]);
  const [expiry, setExpiry] = useState<CalendarDate | null>(
    new CalendarDate(2027, 1, 31),
  );
  const [formError, setFormError] = useState("");
  const [pending, setPending] = useState(false);
  const [secret, setSecret] = useState<string | null>(null);
  const [secretScopes, setSecretScopes] = useState<string[]>([]);
  const [secretMode, setSecretMode] = useState<"created" | "rotated">(
    "created",
  );
  const [secretName, setSecretName] = useState("");
  const [revokeTarget, setRevokeTarget] = useState<ApiKey | null>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const copyKeyRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!(dialogOpen && secret)) return;
    const frame = requestAnimationFrame(() => copyKeyRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [dialogOpen, secret]);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const shown = keys.filter((key) => {
    if (status !== "all" && key.status !== status) return false;
    if (terms.length === 0) return true;
    const text = [key.name, key.prefix, key.environment, ...key.scopes]
      .join(" ")
      .toLowerCase();
    return terms.every((term) => text.includes(term));
  });
  const hasFilters = query.trim().length > 0 || status !== "all";

  function openCreate() {
    setName("");
    setSelectedScopes(["events:write"]);
    setExpiry(new CalendarDate(2027, 1, 31));
    setFormError("");
    setSecret(null);
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setFormError("");
    setPending(false);
  }

  function finishSecret() {
    if (secretMode === "rotated") {
      showToast({
        title: "Key rotated",
        description: `${secretName} uses a new secret.`,
        variant: "success",
      });
    } else {
      showToast({
        title: "API key created",
        description: `${secretName} is ready to use.`,
        variant: "success",
      });
    }
  }

  function createKey() {
    const keyName = name.trim();
    if (!keyName) {
      setFormError("Enter a name for the key.");
      nameRef.current?.querySelector("input")?.focus();
      return;
    }
    if (selectedScopes.length === 0) {
      setFormError("Select at least one scope.");
      return;
    }
    if (!expiry) {
      setFormError("Choose an expiry date.");
      return;
    }
    setFormError("");
    setPending(true);
    window.setTimeout(() => {
      const generated = makeSecret("live");
      setKeys((current) => [
        {
          id: crypto.randomUUID(),
          name: keyName,
          environment: "live",
          prefix: prefixOf(generated),
          scopes: selectedScopes,
          createdAt: "2026-11-03",
          lastUsed: null,
          expires: expiry.toString(),
          status: "active",
        },
        ...current,
      ]);
      setSecret(generated);
      setSecretScopes(selectedScopes);
      setSecretMode("created");
      setSecretName(keyName);
      setPending(false);
    }, 600);
  }

  function rotate(key: ApiKey) {
    const generated = makeSecret(key.environment);
    setKeys((current) =>
      current.map((item) =>
        item.id === key.id
          ? {
              ...item,
              prefix: prefixOf(generated),
              createdAt: "2026-11-03",
              lastUsed: null,
              status: "active",
            }
          : item,
      ),
    );
    setSecret(generated);
    setSecretScopes(key.scopes);
    setSecretMode("rotated");
    setSecretName(key.name);
    setDialogOpen(true);
  }

  function revoke() {
    if (!revokeTarget) return;
    const snapshot = keys;
    setKeys((current) =>
      current.map((item) =>
        item.id === revokeTarget.id ? { ...item, status: "revoked" } : item,
      ),
    );
    setRevokeTarget(null);
    showToast({
      title: `${revokeTarget.name} is revoked`,
      description: "Requests with this key now fail.",
      action: { label: "Undo", onAction: () => setKeys(snapshot) },
    });
  }

  async function copyPrefix(key: ApiKey) {
    try {
      await navigator.clipboard.writeText(key.prefix);
      showToast({ title: "Key prefix copied" });
    } catch {
      showToast({
        title: "Copy failed",
        description: "Select the prefix in the table.",
        variant: "error",
      });
    }
  }

  function clearFilters() {
    setQuery("");
    setStatus("all");
    requestAnimationFrame(() =>
      searchRef.current?.querySelector("input")?.focus(),
    );
  }

  return (
    <SettingsShell
      current="api-keys"
      title="API keys"
      description="Create keys and copy each new key when it appears."
      actions={
        <Button size="sm" onPress={openCreate}>
          <PlusIcon size={16} aria-hidden="true" />
          Create key
        </Button>
      }
    >
      <div className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div ref={searchRef} className="w-full sm:max-w-xs">
            <SearchField
              size="sm"
              label="Search"
              placeholder="Name, prefix, or scope"
              value={query}
              onChange={setQuery}
            />
          </div>
          <Select
            size="sm"
            label="Status"
            options={statusOptions}
            value={status}
            onValueChange={setStatus}
            className="w-full sm:w-40"
          />
          <div className="flex items-center gap-2 sm:ms-auto sm:pb-2">
            {hasFilters ? (
              <>
                <p className="text-xs text-muted-foreground">
                  {shown.length} of {keys.length} keys
                </p>
                {shown.length > 0 && (
                  <Button variant="minimal" size="xs" onPress={clearFilters}>
                    Clear filters
                  </Button>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">
                {keys.length} keys ·{" "}
                {keys.filter((key) => key.status === "active").length} active
              </p>
            )}
          </div>
        </div>

        {shown.length === 0 ? (
          <EmptyState className="bg-card py-10">
            <EmptyStateIcon>
              <MagnifyingGlassIcon aria-hidden="true" />
            </EmptyStateIcon>
            <EmptyStateTitle as="h2">
              No keys match these filters
            </EmptyStateTitle>
            <EmptyStateDescription>
              Change the search or status filter.
            </EmptyStateDescription>
            <EmptyStateActions>
              <Button variant="outline" size="sm" onPress={clearFilters}>
                Clear filters
              </Button>
            </EmptyStateActions>
          </EmptyState>
        ) : (
          <TableContainer>
            <Table
              aria-label="API keys"
              className="min-w-[52rem] text-[13px] [width:100%]!"
            >
              <TableHeader>
                <Column isRowHeader width={240}>
                  Name
                </Column>
                <Column width={230}>Scopes</Column>
                <Column width={145}>Last used</Column>
                <Column width={125}>Expires</Column>
                <Column width={105}>Status</Column>
                <Column width={56}>
                  <span className="sr-only">Actions</span>
                </Column>
              </TableHeader>
              <TableBody items={shown}>
                {(key) => (
                  <Row id={key.id}>
                    <Cell>
                      <div className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border/60"
                        >
                          <KeyIcon size={15} />
                        </span>
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-2 font-medium">
                            {key.name}
                            <Badge
                              variant={
                                key.environment === "live"
                                  ? "accent"
                                  : "neutral"
                              }
                              className="min-h-5 py-0 text-[11px] capitalize"
                            >
                              {key.environment}
                            </Badge>
                          </p>
                          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
                            {key.prefix}
                          </p>
                        </div>
                      </div>
                    </Cell>
                    <Cell>
                      <div className="flex max-w-full flex-wrap gap-1">
                        {key.scopes.map((scope) => (
                          <Badge
                            key={scope}
                            variant="outline"
                            className="min-h-5 px-2 py-0 text-[11px] shadow-none"
                          >
                            {scopeLabel(scope)}
                          </Badge>
                        ))}
                      </div>
                    </Cell>
                    <Cell className="tabular-nums text-muted-foreground">
                      {key.lastUsed ? formatUsed(key.lastUsed) : "Never"}
                    </Cell>
                    <Cell className="tabular-nums text-muted-foreground">
                      {formatDay(key.expires)}
                    </Cell>
                    <Cell>
                      <Badge
                        variant={statusBadge[key.status]}
                        className="min-h-5 py-0 capitalize"
                        dot={key.status === "active"}
                      >
                        {key.status}
                      </Badge>
                    </Cell>
                    <Cell className="text-end">
                      <MenuTrigger>
                        <Button
                          variant="ghost"
                          iconOnly
                          size="xs"
                          aria-label={`Actions for ${key.name}`}
                        >
                          <DotsThreeIcon
                            size={16}
                            weight="bold"
                            aria-hidden="true"
                          />
                        </Button>
                        <MenuPopover placement="bottom end">
                          <MenuContent aria-label={`Actions for ${key.name}`}>
                            <MenuItem onAction={() => void copyPrefix(key)}>
                              <CopyIcon size={16} aria-hidden="true" />
                              Copy prefix
                            </MenuItem>
                            <MenuItem
                              isDisabled={key.status === "revoked"}
                              onAction={() => rotate(key)}
                            >
                              <ArrowsClockwiseIcon
                                size={16}
                                aria-hidden="true"
                              />
                              Rotate key
                            </MenuItem>
                            <MenuSeparator />
                            <MenuItem
                              variant="destructive"
                              isDisabled={key.status === "revoked"}
                              onAction={() => setRevokeTarget(key)}
                            >
                              <TrashIcon size={16} aria-hidden="true" />
                              Revoke key
                            </MenuItem>
                          </MenuContent>
                        </MenuPopover>
                      </MenuTrigger>
                    </Cell>
                  </Row>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </div>

      <DialogContent
        size="lg"
        overlayProps={{
          isOpen: dialogOpen,
          onOpenChange: (open) => {
            if (!open) closeDialog();
          },
        }}
      >
        {secret ? (
          <>
            <DialogHeader>
              <DialogTitle level={2}>
                {secretMode === "rotated"
                  ? "Copy your new key"
                  : "Copy your key"}
              </DialogTitle>
              <DialogDescription>
                {secretMode === "rotated"
                  ? `${secretName} uses a new secret. The old secret stopped working.`
                  : `${secretName} is ready to use.`}
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <DialogBody className="grid content-start gap-4">
              <Alert variant="warning" title="Copy this key now">
                Store it in a secret manager. You cannot see it again.
              </Alert>
              <div className="rounded-lg bg-muted/60 p-4 ring-1 ring-border/70">
                <p className="text-xs font-medium text-muted-foreground">
                  Secret key
                </p>
                <div className="mt-2 flex min-w-0 items-start gap-2">
                  <InlineCode className="min-w-0 flex-1 px-2.5 py-1.5 text-xs">
                    {secret}
                  </InlineCode>
                  <CopyButton
                    value={secret}
                    iconOnly
                    size="sm"
                    variant="ghost"
                    aria-label="Copy secret key"
                  />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {secretScopes.map((scope) => (
                  <Badge
                    key={scope}
                    variant="outline"
                    className="min-h-5 px-2 py-0 text-[11px] shadow-none"
                  >
                    {scopeLabel(scope)}
                  </Badge>
                ))}
              </div>
              <p className="text-xs leading-5 text-muted-foreground">
                Send the key in an Authorization header as{" "}
                <InlineCode>Bearer {secret.slice(0, 12)}…</InlineCode>
              </p>
            </DialogBody>
            <DialogFooter>
              <CopyButton
                ref={copyKeyRef}
                value={secret}
                variant="default"
                size="sm"
              >
                Copy key
              </CopyButton>
              <DialogClose variant="outline" size="sm" onPress={finishSecret}>
                Done
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <Form
            className="contents"
            onSubmit={(event) => {
              event.preventDefault();
              createKey();
            }}
          >
            <DialogHeader>
              <DialogTitle level={2}>Create API key</DialogTitle>
              <DialogDescription>
                Name the key and select the data it can read or change.
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <DialogBody className="grid content-start gap-4">
              <div
                ref={nameRef}
                className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_13rem]"
              >
                <TextField
                  size="sm"
                  label="Name"
                  placeholder="Production ingest"
                  value={name}
                  onChange={(value) => {
                    setName(value);
                    setFormError("");
                  }}
                  autoFocus
                />
                <DatePicker
                  size="sm"
                  label="Expiry"
                  value={expiry}
                  onChange={setExpiry}
                  minValue={new CalendarDate(2026, 11, 3)}
                  presets={[
                    {
                      label: "In 30 days",
                      value: new CalendarDate(2026, 12, 3),
                    },
                    {
                      label: "In 90 days",
                      value: new CalendarDate(2027, 2, 1),
                    },
                    {
                      label: "In 1 year",
                      value: new CalendarDate(2027, 11, 3),
                    },
                  ]}
                />
              </div>
              <CheckboxGroup
                label="Scopes"
                description="The key can do only these actions."
                value={selectedScopes}
                onChange={(value: string[]) => {
                  setSelectedScopes(value);
                  setFormError("");
                }}
              >
                <div className="grid gap-2 sm:grid-cols-2">
                  {scopes.map((scope) => (
                    <Checkbox
                      key={scope.id}
                      value={scope.id}
                      description={scope.detail}
                    >
                      {scope.label}
                    </Checkbox>
                  ))}
                </div>
              </CheckboxGroup>
              {formError && (
                <p role="alert" className="text-xs leading-5 text-destructive">
                  {formError}
                </p>
              )}
            </DialogBody>
            <DialogFooter>
              <DialogClose variant="outline" size="sm">
                Cancel
              </DialogClose>
              <Button type="submit" size="sm" isDisabled={pending}>
                {pending && <Spinner size="sm" decorative />}
                Create key
              </Button>
            </DialogFooter>
          </Form>
        )}
      </DialogContent>

      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{
          isOpen: revokeTarget !== null,
          onOpenChange: (open) => {
            if (!open) setRevokeTarget(null);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Revoke {revokeTarget?.name}?</DialogTitle>
          <DialogDescription>
            Requests with this key fail immediately.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline" size="sm">
            Cancel
          </DialogClose>
          <Button variant="destructive" size="sm" onPress={revoke}>
            Revoke key
          </Button>
        </DialogFooter>
      </DialogContent>
    </SettingsShell>
  );
}
