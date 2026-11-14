"use client";

import {
  DesktopIcon,
  DeviceMobileIcon,
  DeviceTabletIcon,
  DotsThreeIcon,
  LockKeyIcon,
  ShieldCheckIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CopyButton } from "@/components/ui/copy-button";
import {
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { InlineCode } from "@/components/ui/kbd-code";
import {
  MenuContent,
  MenuItem,
  MenuPopover,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu";
import { PasswordField } from "@/components/ui/password-field";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Cell,
  Column,
  Row,
  Table,
  TableBody,
  TableContainer,
  TableHeader,
} from "@/components/ui/table";
import { TextField } from "@/components/ui/text-field";
import { showToast } from "@/components/ui/toast";
import { SettingsShell } from "./settings-shell";

const authenticatorKey = "JBSW Y3DP EHPK 3PXP";

const initialRecoveryCodes = [
  "7Q4M-2K9P",
  "B8XR-5T1N",
  "F2WD-8J6C",
  "L9YA-3H7S",
  "P4NE-6V2R",
  "T6CU-9M3B",
  "X7GA-1D8K",
  "Z3HF-5W9L",
];

interface Session {
  id: string;
  device: string;
  browser: string;
  kind: "computer" | "phone" | "tablet";
  location: string;
  ip: string;
  lastActive: string | null;
  current?: boolean;
  isNew?: boolean;
}

const initialSessions: Session[] = [
  {
    id: "macbook",
    device: "MacBook Pro",
    browser: "Chrome 141 on macOS 15",
    kind: "computer",
    location: "Berlin, Germany",
    ip: "85.214.62.18",
    lastActive: null,
    current: true,
  },
  {
    id: "iphone",
    device: "iPhone 15",
    browser: "Safari on iOS 26",
    kind: "phone",
    location: "Berlin, Germany",
    ip: "85.214.62.40",
    lastActive: "2026-11-03T08:12:00Z",
  },
  {
    id: "dell",
    device: "Dell XPS 15",
    browser: "Edge 142 on Windows 11",
    kind: "computer",
    location: "Lagos, Nigeria",
    ip: "197.210.53.7",
    lastActive: "2026-10-30T21:08:00Z",
    isNew: true,
  },
  {
    id: "ipad",
    device: "iPad Air",
    browser: "Safari on iPadOS 26",
    kind: "tablet",
    location: "Lisbon, Portugal",
    ip: "89.152.18.204",
    lastActive: "2026-09-28T16:20:00Z",
  },
];

const sessionTime = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC",
});

function formatSessionTime(value: string) {
  return sessionTime.format(new Date(value));
}

const deviceIcons = {
  computer: DesktopIcon,
  phone: DeviceMobileIcon,
  tablet: DeviceTabletIcon,
};

function newRecoveryCodes() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () =>
      alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
    ).join(""),
  ).map((code) => `${code.slice(0, 4)}-${code.slice(4)}`);
}

export function SecuritySettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordPending, setPasswordPending] = useState(false);
  const [lastChanged, setLastChanged] = useState("Oct 12, 2026");

  const [twoStep, setTwoStep] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupStep, setSetupStep] = useState(1);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [recoveryCodes, setRecoveryCodes] = useState(initialRecoveryCodes);
  const [codesOpen, setCodesOpen] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);

  const [sessions, setSessions] = useState(initialSessions);
  const sessionsHeadingRef = useRef<HTMLSpanElement>(null);
  const passwordHeadingRef = useRef<HTMLSpanElement>(null);
  const copyCodesRef = useRef<HTMLButtonElement>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [deleted, setDeleted] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const deleteButtonRef = useRef<HTMLButtonElement>(null);

  const otherSessions = sessions.filter((session) => !session.current);

  useEffect(() => {
    if (!(setupOpen && setupStep === 2)) return;
    const frame = requestAnimationFrame(() => copyCodesRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [setupOpen, setupStep]);

  function updatePassword() {
    if (!currentPassword) {
      setPasswordError("Enter your current password.");
      return;
    }
    if (newPassword.length < 12) {
      setPasswordError("The new password must have at least 12 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("The new passwords do not agree.");
      return;
    }
    if (newPassword === currentPassword) {
      setPasswordError("The new password must be different.");
      return;
    }
    setPasswordError("");
    setPasswordPending(true);
    window.setTimeout(() => {
      setPasswordPending(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLastChanged("Nov 3, 2026");
      showToast({
        title: "Password updated",
        description: "Other sessions stay signed in.",
        variant: "success",
      });
      requestAnimationFrame(() => passwordHeadingRef.current?.focus());
    }, 700);
  }

  function changeTwoStep(next: boolean) {
    if (next) {
      setSetupStep(1);
      setCode("");
      setCodeError("");
      setSetupOpen(true);
      return;
    }
    setDisableOpen(true);
  }

  function verifyCode() {
    const digits = code.replace(/\D/g, "");
    if (digits.length !== 6) {
      setCodeError("Enter the 6-digit code from your app.");
      return;
    }
    if (digits === "000000") {
      setCodeError("That code is not correct. Wait for the next code.");
      return;
    }
    setCodeError("");
    setSetupStep(2);
  }

  function finishSetup() {
    setTwoStep(true);
    setSetupOpen(false);
    setSetupStep(1);
    setCode("");
    showToast({
      title: "Two-step sign-in is on",
      description: "You need a code from your authenticator app.",
      variant: "success",
    });
  }

  function regenerateCodes() {
    setRecoveryCodes(newRecoveryCodes());
    showToast({
      title: "New recovery codes generated",
      description: "The old codes no longer work.",
      variant: "warning",
    });
  }

  function signOut(session: Session) {
    const snapshot = sessions;
    setSessions((current) => current.filter((item) => item.id !== session.id));
    showToast({
      title: `${session.device} is signed out`,
      action: { label: "Undo", onAction: () => setSessions(snapshot) },
    });
    requestAnimationFrame(() => sessionsHeadingRef.current?.focus());
  }

  function signOutOthers() {
    const snapshot = sessions;
    const count = otherSessions.length;
    setSessions((current) => current.filter((session) => session.current));
    showToast({
      title: `${count} ${count === 1 ? "session" : "sessions"} signed out`,
      action: { label: "Undo", onAction: () => setSessions(snapshot) },
    });
    requestAnimationFrame(() => sessionsHeadingRef.current?.focus());
  }

  async function copyIp(session: Session) {
    try {
      await navigator.clipboard.writeText(session.ip);
      showToast({ title: "IP address copied" });
    } catch {
      showToast({
        title: "Copy failed",
        description: "Select the address in the table.",
        variant: "error",
      });
    }
  }

  function scheduleDeletion() {
    setDeleteOpen(false);
    setDeleted(true);
    setConfirmText("");
    showToast({
      title: "Deletion scheduled",
      description: "Your account closes on Nov 10, 2026.",
      variant: "warning",
    });
    window.setTimeout(() => alertRef.current?.focus(), 80);
  }

  function cancelDeletion() {
    setDeleted(false);
    showToast({
      title: "Deletion canceled",
      description: "Your account stays active.",
      variant: "success",
    });
    requestAnimationFrame(() => deleteButtonRef.current?.focus());
  }

  return (
    <SettingsShell
      current="security"
      title="Security"
      description="Manage your password, two-step sign-in, and sessions."
    >
      <div className="grid gap-5">
        {deleted && (
          <div
            ref={alertRef}
            tabIndex={-1}
            className="outline-none [&>div]:outline-none"
          >
            <h2 className="sr-only">Account status</h2>
            <Alert
              variant="warning"
              title="Account deletion is scheduled"
              action={
                <Button size="sm" variant="outline" onPress={cancelDeletion}>
                  Cancel deletion
                </Button>
              }
            >
              We delete Kestrel Insights and all workspace data on Nov 10, 2026.
            </Alert>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle as="h2">
              <span
                ref={passwordHeadingRef}
                tabIndex={-1}
                className="outline-none"
              >
                Password
              </span>
            </CardTitle>
            <CardDescription className="text-xs leading-5">
              Last changed {lastChanged}.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <PasswordField
              size="sm"
              label="Current password"
              autoComplete="current-password"
              value={currentPassword}
              onChange={(value) => {
                setCurrentPassword(value);
                setPasswordError("");
              }}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <PasswordField
                size="sm"
                label="New password"
                autoComplete="new-password"
                description="Use at least 12 characters."
                value={newPassword}
                onChange={(value) => {
                  setNewPassword(value);
                  setPasswordError("");
                }}
              />
              <PasswordField
                size="sm"
                label="Confirm new password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(value) => {
                  setConfirmPassword(value);
                  setPasswordError("");
                }}
              />
            </div>
            {passwordError && (
              <p role="alert" className="text-xs leading-5 text-destructive">
                {passwordError}
              </p>
            )}
            <div className="flex justify-end border-t border-border/70 pt-4">
              <Button
                size="sm"
                onPress={updatePassword}
                className="max-sm:w-full"
                isDisabled={
                  passwordPending ||
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
              >
                {passwordPending && <Spinner size="sm" decorative />}
                Update password
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle as="h2">Two-step sign-in</CardTitle>
            <CardDescription className="text-xs leading-5">
              Use a 6-digit code from an authenticator app.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border/70"
                >
                  <LockKeyIcon size={18} />
                </span>
                <p className="text-sm font-medium">Authenticator app</p>
              </div>
              <Switch
                aria-label="Authenticator app"
                checked={twoStep}
                onCheckedChange={changeTwoStep}
              />
            </div>
            {twoStep && (
              <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-muted/60 px-3.5 py-3 ring-1 ring-border/70">
                <div className="min-w-0">
                  <p className="text-sm font-medium">Recovery codes</p>
                  <p className="text-xs leading-5 text-muted-foreground">
                    {recoveryCodes.length} codes left. Each code works one time.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => setCodesOpen(true)}
                >
                  View codes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle as="h2">
                  <span
                    ref={sessionsHeadingRef}
                    tabIndex={-1}
                    className="outline-none"
                  >
                    Active sessions
                  </span>
                </CardTitle>
                <CardDescription className="text-xs leading-5">
                  {sessions.length}{" "}
                  {sessions.length === 1 ? "device" : "devices"} signed in.
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="outline"
                isDisabled={otherSessions.length === 0}
                onPress={signOutOthers}
              >
                <ShieldCheckIcon size={16} aria-hidden="true" />
                Sign out others
              </Button>
            </div>
          </CardHeader>
          <CardContent className="px-0 pb-0 sm:px-0">
            <TableContainer className="rounded-none border-x-0 border-b-0">
              <Table
                aria-label="Active sessions"
                className="min-w-3xl text-[13px] w-full!"
              >
                <TableHeader>
                  <Column isRowHeader width={280}>
                    Device
                  </Column>
                  <Column width={220}>Location</Column>
                  <Column width={170}>Last active</Column>
                  <Column width={130}>IP address</Column>
                  <Column width={56}>
                    <span className="sr-only">Actions</span>
                  </Column>
                </TableHeader>
                <TableBody items={sessions}>
                  {(session) => {
                    const DeviceIcon = deviceIcons[session.kind];
                    return (
                      <Row id={session.id}>
                        <Cell>
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden="true"
                              className="grid size-9 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground ring-1 ring-border/60"
                            >
                              <DeviceIcon size={18} />
                            </span>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="min-w-0 truncate font-medium">
                                  {session.device}
                                </span>
                                {session.current && (
                                  <Badge
                                    variant="accent"
                                    className="min-h-5 py-0 text-[11px]"
                                  >
                                    This device
                                  </Badge>
                                )}
                              </div>
                              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                                {session.browser}
                              </span>
                            </div>
                          </div>
                        </Cell>
                        <Cell>
                          <div className="flex flex-wrap items-center gap-2">
                            <span>{session.location}</span>
                            {session.isNew && (
                              <Badge
                                variant="warning"
                                className="min-h-5 py-0 text-[11px]"
                              >
                                New location
                              </Badge>
                            )}
                          </div>
                        </Cell>
                        <Cell className="tabular-nums text-muted-foreground">
                          {session.lastActive
                            ? formatSessionTime(session.lastActive)
                            : "Active now"}
                        </Cell>
                        <Cell className="font-mono text-xs text-muted-foreground">
                          {session.ip}
                        </Cell>
                        <Cell className="text-end">
                          {!session.current && (
                            <MenuTrigger>
                              <Button
                                variant="ghost"
                                iconOnly
                                size="xs"
                                aria-label={`Actions for ${session.device}`}
                              >
                                <DotsThreeIcon
                                  size={16}
                                  weight="bold"
                                  aria-hidden="true"
                                />
                              </Button>
                              <MenuPopover placement="bottom end">
                                <MenuContent
                                  aria-label={`Actions for ${session.device}`}
                                >
                                  <MenuItem
                                    onAction={() => void copyIp(session)}
                                  >
                                    Copy IP address
                                  </MenuItem>
                                  <MenuSeparator />
                                  <MenuItem
                                    variant="destructive"
                                    onAction={() => signOut(session)}
                                  >
                                    <TrashIcon size={16} aria-hidden="true" />
                                    Sign out
                                  </MenuItem>
                                </MenuContent>
                              </MenuPopover>
                            </MenuTrigger>
                          )}
                        </Cell>
                      </Row>
                    );
                  }}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Card className="ring-destructive/25">
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <CardTitle as="h2" className="text-destructive">
                  Delete account
                </CardTitle>
                <CardDescription className="text-xs leading-5">
                  Delete the workspace and all data after a 7-day wait.
                </CardDescription>
              </div>
              <Button
                ref={deleteButtonRef}
                size="sm"
                variant="outline"
                className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive max-sm:w-full"
                isDisabled={deleted}
                onPress={() => {
                  setConfirmText("");
                  setDeleteOpen(true);
                }}
              >
                Delete account
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>

      <DialogContent
        size="md"
        overlayProps={{
          isOpen: setupOpen,
          onOpenChange: (open) => {
            if (!open) {
              setSetupOpen(false);
              setSetupStep(1);
              setCode("");
              setCodeError("");
            }
          },
        }}
      >
        {setupStep === 1 ? (
          <Form
            className="contents"
            onSubmit={(event) => {
              event.preventDefault();
              verifyCode();
            }}
          >
            <DialogHeader>
              <DialogTitle level={2}>Set up two-step sign-in</DialogTitle>
              <DialogDescription>
                Step 1 of 2. Add the key to your authenticator app.
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <DialogBody className="grid content-start gap-4">
              <div className="rounded-lg bg-muted/60 p-4 ring-1 ring-border/70">
                <p className="text-sm font-medium">Authenticator key</p>
                <div className="mt-2 flex min-w-0 items-center gap-2">
                  <InlineCode className="min-w-0 flex-1 px-2.5 py-1.5 text-sm tracking-[0.14em]">
                    {authenticatorKey}
                  </InlineCode>
                  <CopyButton
                    value={authenticatorKey}
                    iconOnly
                    size="sm"
                    variant="ghost"
                    aria-label="Copy authenticator key"
                  />
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">
                  Spaces do not matter.
                </p>
              </div>
              <TextField
                size="sm"
                label="6-digit code"
                value={code}
                onChange={(value) => {
                  setCode(value.replace(/[^\d]/g, "").slice(0, 6));
                  setCodeError("");
                }}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                placeholder="123456"
                isInvalid={Boolean(codeError)}
                autoFocus
                description="Codes change every 30 seconds."
              />
              {codeError && (
                <p role="alert" className="text-xs leading-5 text-destructive">
                  {codeError}
                </p>
              )}
            </DialogBody>
            <DialogFooter>
              <DialogClose variant="outline" size="sm">
                Cancel
              </DialogClose>
              <Button type="submit" size="sm" isDisabled={code.length !== 6}>
                Verify code
              </Button>
            </DialogFooter>
          </Form>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle level={2}>Save your recovery codes</DialogTitle>
              <DialogDescription>
                Step 2 of 2. Each code signs you in one time.
              </DialogDescription>
              <DialogClose />
            </DialogHeader>
            <DialogBody className="grid content-start gap-4">
              <Alert variant="warning" title="Store the codes now">
                You cannot see them again.
              </Alert>
              <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/60 p-4 font-mono text-sm tracking-wide ring-1 ring-border/70">
                {recoveryCodes.map((recoveryCode) => (
                  <span key={recoveryCode}>{recoveryCode}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <CopyButton
                  ref={copyCodesRef}
                  value={recoveryCodes.join("\n")}
                  variant="outline"
                  size="sm"
                  aria-label="Copy recovery codes"
                >
                  Copy codes
                </CopyButton>
                <CopyButton
                  value={authenticatorKey}
                  variant="ghost"
                  size="sm"
                  aria-label="Copy authenticator key"
                >
                  Copy key
                </CopyButton>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button variant="outline" size="sm" onPress={finishSetup}>
                Finish setup
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>

      <DialogContent
        size="md"
        overlayProps={{
          isOpen: codesOpen,
          onOpenChange: (open) => {
            if (!open) setCodesOpen(false);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Recovery codes</DialogTitle>
          <DialogDescription>
            {recoveryCodes.length} codes left. Each code works one time.
          </DialogDescription>
          <DialogClose />
        </DialogHeader>
        <DialogBody className="grid content-start gap-4">
          <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/60 p-4 font-mono text-sm tracking-wide ring-1 ring-border/70">
            {recoveryCodes.map((recoveryCode) => (
              <span key={recoveryCode}>{recoveryCode}</span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <CopyButton
              value={recoveryCodes.join("\n")}
              variant="outline"
              size="sm"
              aria-label="Copy recovery codes"
            >
              Copy codes
            </CopyButton>
            <Button variant="ghost" size="sm" onPress={regenerateCodes}>
              Generate new codes
            </Button>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            New codes replace all current codes.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline" size="sm">
            Done
          </DialogClose>
        </DialogFooter>
      </DialogContent>

      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{
          isOpen: disableOpen,
          onOpenChange: (open) => {
            if (!open) setDisableOpen(false);
          },
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Turn off two-step sign-in?</DialogTitle>
          <DialogDescription>
            Your account will use only your password. The current recovery codes
            stop working.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose variant="outline" size="sm">
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            size="sm"
            onPress={() => {
              setTwoStep(false);
              setDisableOpen(false);
              showToast({
                title: "Two-step sign-in is off",
                description: "Your password is the only sign-in step.",
                variant: "warning",
              });
            }}
          >
            Turn off
          </Button>
        </DialogFooter>
      </DialogContent>

      <DialogContent
        role="alertdialog"
        size="sm"
        overlayProps={{
          isOpen: deleteOpen,
          onOpenChange: (open) => {
            if (!open) {
              setDeleteOpen(false);
              setConfirmText("");
            }
          },
        }}
      >
        <DialogHeader>
          <DialogTitle level={2}>Delete your account?</DialogTitle>
          <DialogDescription>
            We delete Kestrel Insights and all data on Nov 10, 2026. You cannot
            undo this action after that date.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <TextField
            size="sm"
            label="Type DELETE to confirm"
            value={confirmText}
            onChange={setConfirmText}
            autoComplete="off"
            placeholder="DELETE"
          />
        </DialogBody>
        <DialogFooter>
          <DialogClose variant="outline" size="sm">
            Cancel
          </DialogClose>
          <Button
            variant="destructive"
            size="sm"
            isDisabled={confirmText !== "DELETE"}
            onPress={scheduleDeletion}
          >
            Schedule deletion
          </Button>
        </DialogFooter>
      </DialogContent>
    </SettingsShell>
  );
}
